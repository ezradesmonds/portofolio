import * as THREE from 'three';

// A continuous ribbon: depth and bank are functions of world x, so neighbouring
// cards share the same surface rather than behaving like separate tilted boxes.
const vertexShader = `
uniform float uWidth;
uniform float uVelocity;
uniform float uHover;
uniform float uHeight;
varying vec2 vUv;
varying float vShade;
void main() {
  vUv = uv;
  vec4 p = modelMatrix * vec4(position, 1.0);
  float q = p.x / uWidth;
  float wave = sin(q * 3.14159);
  float tail = exp(-q * q * 0.9);
  float bank = -0.16 * cos(q * 3.14159) + uVelocity * 0.003;
  float localY = p.y;
  p.y = localY * cos(bank) + p.x * 0.03;
  p.z += -wave * tail * uWidth * 0.15 + localY * sin(bank);
  float dome = sin(uv.x * 3.14159) * sin(uv.y * 3.14159);
  p.z -= dome * uHover * uHeight * 0.13;
  p.y += sin(q * 5.0) * uVelocity * 0.45;
  vShade = 0.88 - abs(wave) * 0.12 - dome * uHover * 0.13;
  gl_Position = projectionMatrix * viewMatrix * p;
}`;
const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uSize;
varying vec2 vUv;
varying float vShade;
void main() {
  vec2 p = (vUv - 0.5) * uSize;
  vec2 d = abs(p) - uSize * 0.5 + 18.0;
  float corner = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - 18.0;
  if (corner > 0.0) discard;
  vec4 color = texture2D(uTexture, vUv);
  gl_FragColor = vec4(color.rgb * vShade, color.a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export function setupProjectGallery(root: HTMLElement, signal: AbortSignal) {
  const stage = root.querySelector<HTMLElement>('.journey-gallery-stage')!;
  const canvas = root.querySelector<HTMLCanvasElement>('canvas')!;
  const links = [...root.querySelectorAll<HTMLAnchorElement>('[data-gallery-card]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !links.length) return;
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false }); }
  catch (error) { console.warn('Project gallery WebGL unavailable:', error); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 1, 10000);
  const geometry = new THREE.PlaneGeometry(1, 1, 40, 20);
  const grid = new THREE.GridHelper(10000, 70, 0x252525, 0x181818);
  grid.position.set(0, -250, -1800);
  scene.add(grid);
  let width = 1, height = 1, cardWidth = 1, cardHeight = 1, stride = 1;
  let target = 0, position = 0, previous = 0, lastTime = 0, frame = 0;
  let visible = false, ready = false, dragging = false, dragStart = 0, dragPosition = 0;
  let disposed = false, hovered = -1, paused = false, dragged = false;
  const cards = links.map((link, index) => {
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader,
      uniforms: { uTexture: { value: null }, uWidth: { value: 1 }, uVelocity: { value: 0 },
        uHover: { value: 0 }, uHeight: { value: 1 }, uSize: { value: new THREE.Vector2() } },
      transparent: true, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);
    link.addEventListener('pointerenter', () => { hovered = index; paused = true; }, { signal });
    link.addEventListener('pointerleave', () => { hovered = -1; paused = false; }, { signal });
    link.addEventListener('focus', () => {
      const total = stride * cards.length;
      target = position + THREE.MathUtils.euclideanModulo(index * stride - position + total / 2, total) - total / 2;
      paused = true;
    }, { signal });
    link.addEventListener('blur', () => { paused = false; }, { signal });
    link.addEventListener('click', event => { if (dragged) event.preventDefault(); }, { signal });
    return { mesh, material, link };
  });
  const resize = () => {
    const oldStride = stride;
    width = stage.clientWidth; height = stage.clientHeight;
    cardWidth = width < 700 ? width * 0.8 : Math.min(width * 0.46, 850);
    cardHeight = cardWidth * 0.64; stride = cardWidth + Math.max(18, width * 0.012);
    position = position / oldStride * stride; target = target / oldStride * stride;
    camera.aspect = width / height;
    camera.position.z = height / (2 * Math.tan(THREE.MathUtils.degToRad(21)));
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    grid.position.y = -cardHeight / 2 - 38;
    cards.forEach(({ mesh, material }) => {
      mesh.scale.set(cardWidth, cardHeight, 1);
      material.uniforms.uWidth.value = width * 0.62;
      material.uniforms.uHeight.value = cardHeight;
      material.uniforms.uSize.value.set(cardWidth, cardHeight);
    });
  };
  const render = (time: number) => {
    frame = 0;
    if (disposed || !visible || !ready || document.hidden) { lastTime = 0; return; }
    const dt = Math.min((time - (lastTime || time)) / 1000, 0.05); lastTime = time;
    if (!dragging && !paused) target += dt * 16;
    position += (target - position) * (1 - Math.exp(-dt * 8));
    const velocity = dt ? (position - previous) / dt / 60 : 0; previous = position;
    const total = stride * cards.length;
    // Rebase the whole ribbon to avoid growing coordinates after long sessions.
    if (Math.abs(position) > total * 2) { const cycles = Math.trunc(position / total) * total; position -= cycles; target -= cycles; previous -= cycles; }
    cards.forEach(({ mesh, material, link }, index) => {
      const x = THREE.MathUtils.euclideanModulo(index * stride - position + total / 2, total) - total / 2;
      mesh.position.set(x, 12, 0);
      mesh.visible = Math.abs(x) < width * 1.4;
      material.uniforms.uVelocity.value = THREE.MathUtils.clamp(velocity, -55, 55);
      material.uniforms.uHover.value += ((hovered === index ? 1 : 0) - material.uniforms.uHover.value) * 0.08;
      // DOM anchors preserve keyboard and touch navigation over the canvas.
      link.style.transform = `translate(${width / 2 + x - cardWidth / 2}px, ${height / 2 - cardHeight / 2 + 12}px)`;
      link.style.width = `${cardWidth}px`; link.style.height = `${cardHeight}px`;
    });
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };
  const resume = () => { if (!frame && visible && ready && !disposed && !document.hidden) frame = requestAnimationFrame(render); };
  const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; resume(); });
  observer.observe(stage);
  const resizeObserver = new ResizeObserver(() => { resize(); resume(); }); resizeObserver.observe(stage);
  document.addEventListener('visibilitychange', resume, { signal });
  stage.addEventListener('wheel', event => {
    if (!ready || event.ctrlKey) return;
    // Preserve vertical page navigation; horizontal wheel gestures steer the reel.
    target += (event.deltaX || event.deltaY) * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1) * 0.85;
  }, { passive: true, signal });
  stage.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    dragging = true; dragged = false; dragStart = event.clientX; dragPosition = target;
  }, { signal });
  window.addEventListener('pointermove', event => {
    if (!dragging) return;
    if (Math.abs(event.clientX - dragStart) > 6) dragged = true;
    target = dragPosition - (event.clientX - dragStart) * 1.3;
  }, { signal });
  window.addEventListener('pointerup', () => { dragging = false; }, { signal });
  window.addEventListener('pointercancel', () => { dragging = false; dragged = false; }, { signal });
  window.addEventListener('blur', () => { dragging = false; dragged = false; }, { signal });
  root.querySelector('[data-gallery-prev]')?.addEventListener('click', () => { target -= stride; }, { signal });
  root.querySelector('[data-gallery-next]')?.addEventListener('click', () => { target += stride; }, { signal });
  const destroy = () => {
    if (disposed) return;
    disposed = true; cancelAnimationFrame(frame); observer.disconnect(); resizeObserver.disconnect();
    cards.forEach(({ material, link }) => { material.uniforms.uTexture.value?.dispose(); material.dispose(); link.removeAttribute('style'); });
    geometry.dispose(); grid.geometry.dispose();
    (grid.material as THREE.Material).dispose(); renderer.dispose(); root.classList.remove('gallery-enhanced');
  };
  signal.addEventListener('abort', destroy, { once: true });
  reduced.addEventListener('change', destroy, { once: true, signal });
  canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); destroy(); }, { signal });
  Promise.all(cards.map(async ({ material, link }) => {
    const image = link.querySelector('img')!;
    await image.decode();
    if (disposed) return;
    const surface = document.createElement('canvas'); surface.width = 1200; surface.height = 768;
    const ctx = surface.getContext('2d')!;
    const scale = Math.max(surface.width / image.naturalWidth, surface.height / image.naturalHeight);
    ctx.drawImage(image, (surface.width - image.naturalWidth * scale) / 2, (surface.height - image.naturalHeight * scale) / 2, image.naturalWidth * scale, image.naturalHeight * scale);
    const shade = ctx.createLinearGradient(0, 500, 0, 768); shade.addColorStop(0, 'transparent'); shade.addColorStop(1, 'rgba(0,0,0,.8)');
    ctx.fillStyle = shade; ctx.fillRect(0, 500, 1200, 268);
    ctx.fillStyle = '#fff'; ctx.font = '500 42px sans-serif'; ctx.fillText(link.dataset.title!, 40, 718, 1050); ctx.fillText('↗', 1120, 718);
    const texture = new THREE.CanvasTexture(surface); texture.colorSpace = THREE.SRGBColorSpace;
    material.uniforms.uTexture.value = texture;
  })).then(() => {
    if (disposed) return;
    resize(); root.classList.add('gallery-enhanced'); ready = true; resume();
  }).catch(destroy);
}
