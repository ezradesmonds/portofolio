import * as THREE from 'three';

// A shared world-space ribbon with smooth normals and pointer-local water.
const surfaceShader = `
uniform float uWidth, uDepth, uSpan, uCurve, uDoor, uVelocity, uHover;
uniform vec2 uSize;
uniform vec2 uPointer;
uniform float uRippleAge, uRipple;
const float PI = 3.14159265359;
float profile(float q) { return mix(1.0-q*q,sin(PI*q),uCurve)*exp(-q*q); }
float slope(float q) { return mix(-2.0*q*(2.0-q*q),PI*cos(PI*q)-2.0*q*sin(PI*q),uCurve)*exp(-q*q); }
float depth(float x) { return -uDepth*profile(x/uWidth*uSpan-0.2); }
float bank(float x) { return -0.16*slope(x/uWidth*uSpan-0.2)/PI*uCurve; }
float water(vec2 uv) {
  float r=length((uv-uPointer)*uSize/uSize.y);
  float dent=-0.075*uHover*exp(-r*r*14.0);
  float wave=0.022*uRipple*sin(r*26.0-uRippleAge*10.0)*exp(-r*4.5-uRippleAge*2.2);
  return uSize.y*(dent+wave);
}
float door(float x) { float q=clamp(x/uWidth,-1.0,1.0); return uDoor*q*(1.5-0.5*q*q); }
vec3 surface(vec3 p, vec2 uv) {
  p.z += water(uv);
  float q=p.x/uWidth;
  float a=bank(p.x)+1.8*uVelocity*smoothstep(0.3,0.9,abs(q))*sign(q);
  p.yz=mat2(cos(a),sin(a),-sin(a),cos(a))*p.yz;
  p.z += depth(p.x)+door(p.x);
  p.y += p.x*0.03*uCurve;
  float rear=1.0-smoothstep(-1.0,0.3,q);
  p.y += 0.1*uWidth*uVelocity*rear;
  p.z += 0.2*uWidth*uVelocity*rear;
  return p;
}
vec3 surfaceNormal(float x, vec2 uv) {
  float q=min(abs(x/uWidth),1.0);
  float dx=-uDepth*slope(x/uWidth*uSpan-0.2)*uSpan/uWidth+uDoor/uWidth*1.5*(1.0-q*q);
  dx += (water(uv+vec2(0.002,0.0))-water(uv-vec2(0.002,0.0)))/(0.004*uSize.x);
  float dy=(water(uv+vec2(0.0,0.002))-water(uv-vec2(0.0,0.002)))/(0.004*uSize.y);
  vec3 n=normalize(vec3(-dx,-dy,1.0));
  float a=bank(x);
  n.yz=mat2(cos(a),sin(a),-sin(a),cos(a))*n.yz;
  return n;
}`;
const vertexShader = `
${surfaceShader}
uniform float uReflection,uFloor;
varying vec2 vUv;
varying vec3 vFlat;
void main() {
  vUv=uv;
  vFlat=(modelMatrix*vec4(position,1.0)).xyz;
  vec3 p=surface(vFlat,uv);
  if (uReflection>0.5) p.y=2.0*uFloor-p.y;
  gl_Position=projectionMatrix*viewMatrix*vec4(p,1.0);
}`;
const fragmentShader = `
${surfaceShader}
uniform sampler2D uTexture;
uniform float uReflection,uFocus,uRadius;
varying vec2 vUv;
varying vec3 vFlat;
void main() {
  vec2 p=(vUv-0.5)*uSize;
  vec2 d=abs(p)-uSize*0.5+uRadius;
  float corner=length(max(d,0.0))+min(max(d.x,d.y),0.0)-uRadius;
  float aa=max(fwidth(corner),0.001);
  float alpha=1.0-smoothstep(-aa,aa,corner);
  if (alpha<0.01) discard;
  vec2 delta=(vUv-uPointer)*uSize/uSize.y;
  float r=length(delta);
  float ripple=uRipple*sin(r*26.0-uRippleAge*10.0)*exp(-r*4.5-uRippleAge*2.2);
  vec2 refraction=delta*(0.06*uHover*exp(-r*r*14.0)+0.035*ripple);
  vec3 color=texture2D(uTexture,clamp(vUv+refraction,vec2(0.001),vec2(0.999))).rgb;
  float haze=clamp((uDepth-depth(vFlat.x)-water(vUv))/(2.0*uDepth),0.0,1.0);
  color=mix(color,vec3(0.059),0.8*haze);
  vec3 n=surfaceNormal(vFlat.x,vUv);
  vec3 light=normalize(vec3(-0.4,0.5,1.0));
  vec3 view=normalize(cameraPosition-(vFlat+vec3(0.0,0.0,depth(vFlat.x)+door(vFlat.x)+water(vUv))));
  color *= 1.0-0.12*(1.0-(dot(n,light)*0.5+0.5));
  color += pow(max(dot(n,normalize(light+view)),0.0),48.0)*0.35;
  color=mix(color,vec3(1.0),uFocus*smoothstep(-3.0,-1.0,corner));
  if (uReflection>0.5) alpha *= 0.13*pow(vUv.y,3.0);
  gl_FragColor=vec4(color,alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export function galleryOffset(index: number, position: number, stride: number, count: number) {
  return index*stride-galleryPosition(position,stride,count);
}

export function galleryPosition(position: number, stride: number, count: number) {
  return THREE.MathUtils.clamp(position,0,Math.max(0,(count-1)*stride));
}

export function waterDisplacement(u: number, v: number, cardWidth: number, cardHeight: number, hover: number, pointerU: number, pointerV: number, age: number, ripple: number) {
  const r=Math.hypot((u-pointerU)*cardWidth/cardHeight,v-pointerV);
  return cardHeight*(-0.075*hover*Math.exp(-r*r*14)+0.022*ripple*Math.sin(r*26-age*10)*Math.exp(-r*4.5-age*2.2));
}

// Mirrors the shader for projected DOM hit areas. Hover and links follow the
// curved silhouette rather than an invisible flat rectangle.
export function ribbonPoint(x: number, y: number, u: number, v: number, width: number, depth: number, curve: number, velocity: number, hover: number, cardHeight: number, cardWidth=cardHeight*1.7, pointerU=0.5, pointerV=0.5, age=0, ripple=0) {
  const span=curve ? 1.15 : 1, q=x/width*span-0.2;
  const wave=((1-q*q)*(1-curve)+Math.sin(Math.PI*q)*curve)*Math.exp(-q*q);
  const slope=((-2*q*(2-q*q))*(1-curve)+(Math.PI*Math.cos(Math.PI*q)-2*q*Math.sin(Math.PI*q))*curve)*Math.exp(-q*q);
  const edge=THREE.MathUtils.smoothstep(Math.abs(x/width),0.3,0.9);
  const angle=-0.16*slope/Math.PI*curve+1.8*velocity*edge*Math.sign(x);
  const dent=waterDisplacement(u,v,cardWidth,cardHeight,hover,pointerU,pointerV,age,ripple);
  const bankedY=y*Math.cos(angle)-dent*Math.sin(angle);
  const bankedZ=y*Math.sin(angle)+dent*Math.cos(angle);
  const doorQ=THREE.MathUtils.clamp(x/width,-1,1);
  const rear=1-THREE.MathUtils.smoothstep(x/width,-1,0.3);
  return [x,bankedY+x*0.03*curve+0.1*width*velocity*rear,bankedZ-depth*wave-0.12*width*curve*doorQ*(1.5-0.5*doorQ*doorQ)+0.2*width*velocity*rear];
}

export function setupProjectGallery(root: HTMLElement, signal: AbortSignal, scrollTo=(top: number) => window.scrollTo({ top,behavior: 'instant' })) {
  const stage=root.querySelector<HTMLElement>('.journey-gallery-stage')!;
  const canvas=root.querySelector<HTMLCanvasElement>('canvas')!;
  const links=[...root.querySelectorAll<HTMLAnchorElement>('[data-gallery-card]')];
  const previous=root.querySelector<HTMLButtonElement>('[data-gallery-prev]')!;
  const next=root.querySelector<HTMLButtonElement>('[data-gallery-next]')!;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !links.length) return;
  const events=new AbortController();
  const listen={ signal: events.signal };
  let renderer: THREE.WebGLRenderer;
  try { renderer=new THREE.WebGLRenderer({ canvas,antialias: true,alpha: true }); }
  catch (error) { console.warn('Project gallery WebGL unavailable:',error); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.setClearColor(0x000000,0);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(53.4,1,1,20000);
  const geometry=new THREE.PlaneGeometry(1,1,32,24);
  const floorMaterial=new THREE.ShaderMaterial({
    uniforms: { uCell: { value: 1 },uRun: { value: 1 } },
    vertexShader: `varying vec3 vWorld; void main() { vWorld=(modelMatrix*vec4(position,1.0)).xyz; gl_Position=projectionMatrix*viewMatrix*vec4(vWorld,1.0); }`,
    fragmentShader: `uniform float uCell,uRun; varying vec3 vWorld; void main() {
      vec2 p=vWorld.xz/uCell;
      vec2 grid=abs(fract(p-0.5)-0.5)/max(fwidth(p),vec2(0.0001));
      float line=1.0-min(min(grid.x,grid.y),1.0);
      float fade=1.0-smoothstep(0.0,uRun,-vWorld.z);
      gl_FragColor=vec4(vec3(0.32),line*fade*0.5);
    }`,transparent: true,depthWrite: false,side: THREE.DoubleSide,
  });
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(1,1),floorMaterial);
  floor.rotation.x=-Math.PI/2; floor.renderOrder=-1; scene.add(floor);
  let width=1,height=1,cardWidth=1,cardHeight=1,stride=1,curve=1;
  let target=0,position=0,velocity=0,lastTime=0,frame=0;
  let visible=false,ready=false,disposed=false,dragging=false,dragged=false;
  let pinned=false;
  let dragStart=0,dragY=0,dragPosition=0,hovered=-1,focused=-1;
  const cards=links.map((link,index) => {
    const material=new THREE.ShaderMaterial({ vertexShader,fragmentShader,
      uniforms: { uTexture: { value: null },uWidth: { value: 1 },uDepth: { value: 1 },uSpan: { value: 1.15 },
        uCurve: { value: 1 },uDoor: { value: 1 },uVelocity: { value: 0 },uHover: { value: 0 },
        uPointer: { value: new THREE.Vector2(0.5,0.5) },uRippleAge: { value: 10 },uRipple: { value: 0 },
        uSize: { value: new THREE.Vector2() },uRadius: { value: 20 },uFocus: { value: 0 },uReflection: { value: 0 },uFloor: { value: 0 } },
      transparent: true,side: THREE.DoubleSide,depthTest: false,depthWrite: false });
    const mesh=new THREE.Mesh(geometry,material);
    const reflectionMaterial=material.clone(); reflectionMaterial.uniforms.uReflection.value=1;
    const reflection=new THREE.Mesh(geometry,reflectionMaterial); reflection.renderOrder=-2;
    mesh.frustumCulled=reflection.frustumCulled=false;
    scene.add(mesh,reflection);
    link.addEventListener('pointerenter',() => { hovered=index; resume(); },listen);
    link.addEventListener('pointerleave',() => { hovered=-1; resume(); },listen);
    let rippleAt=-10000;
    link.addEventListener('pointermove',event => {
      if (event.pointerType!=='mouse' || dragging) return;
      const rect=link.getBoundingClientRect();
      material.uniforms.uPointer.value.set(THREE.MathUtils.clamp((event.clientX-rect.left)/rect.width,0,1),THREE.MathUtils.clamp(1-(event.clientY-rect.top)/rect.height,0,1));
      if (performance.now()-rippleAt>140) rippleAt=performance.now();
      resume();
    },listen);
    link.addEventListener('focus',() => {
      focused=index;
      if (link.matches(':focus-visible')) moveTo(index*stride);
      resume();
    },listen);
    link.addEventListener('blur',() => { focused=-1; resume(); },listen);
    link.addEventListener('click',event => { if (dragged) event.preventDefault(); },listen);
    return { mesh,material,reflection,reflectionMaterial,link,get rippleAt() { return rippleAt; } };
  });
  // Native vertical travel drives a finite horizontal sequence. Nothing captures
  // vertical wheel events, so either end naturally releases to the adjacent section.
  const syncScroll=() => {
    if (!ready) return;
    const rect=root.getBoundingClientRect();
    pinned=rect.top<=0 && rect.bottom>=height;
    target=galleryPosition(-rect.top,stride,cards.length);
    previous.disabled=target<1;
    next.disabled=target>=(cards.length-1)*stride-1;
    resume();
  };
  const moveTo=(value: number) => {
    const start=scrollY+root.getBoundingClientRect().top;
    scrollTo(start+galleryPosition(value,stride,cards.length));
    syncScroll();
  };
  const resize=() => {
    const oldStride=stride;
    const keepProgress=ready && pinned;
    width=Math.max(stage.clientWidth,1); height=Math.max(stage.clientHeight,1);
    curve=width<700 ? 0 : 1;
    cardHeight=Math.min(height*0.435,width*(curve ? 0.32 : 0.65)); cardWidth=cardHeight*1.7;
    stride=cardWidth+width*0.0067;
    position=position/oldStride*stride; target=target/oldStride*stride;
    if (ready) {
      root.style.height=`${height+(cards.length-1)*stride}px`;
      if (keepProgress) moveTo(target); else syncScroll();
    }
    camera.aspect=width/height;
    camera.position.z=height/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2)));
    camera.updateProjectionMatrix(); renderer.setSize(width,height,false);
    const floorY=-cardHeight/2-height*0.03,run=height*3;
    const front=Math.min(camera.position.z*(1-Math.abs(floorY)/(height/2))+height*0.1,camera.position.z*0.8);
    floor.scale.set(width*4,front+run,1); floor.position.set(0,floorY,(front-run)/2);
    floorMaterial.uniforms.uCell.value=height*0.11; floorMaterial.uniforms.uRun.value=run;
    cards.forEach(({mesh,material,reflection,reflectionMaterial}) => {
      mesh.scale.set(cardWidth,cardHeight,1); reflection.scale.copy(mesh.scale);
      for (const item of [material,reflectionMaterial]) {
        item.uniforms.uWidth.value=width/2; item.uniforms.uCurve.value=curve;
        item.uniforms.uSpan.value=curve ? 1.15 : 1; item.uniforms.uDoor.value=-width*0.06*curve;
        item.uniforms.uSize.value.set(cardWidth,cardHeight); item.uniforms.uFloor.value=floorY;
        item.uniforms.uRadius.value=width*0.0133;
      }
    });
  };
  const outline: [number,number][]=[];
  for (let i=0;i<=16;i++) outline.push([i/16,1]);
  for (let i=1;i<=8;i++) outline.push([1,1-i/8]);
  for (let i=1;i<=16;i++) outline.push([1-i/16,0]);
  for (let i=1;i<8;i++) outline.push([0,i/8]);
  const render=(time: number) => {
    frame=0;
    if (disposed || !visible || !ready || document.hidden) { lastTime=0; return; }
    const dt=Math.min((time-(lastTime || time))/1000,0.05) || 1/60; lastTime=time;
    const before=position;
    position += (target-position)*(1-Math.exp(-dt*7));
    const speed=Math.tanh(Math.abs(position-before)/dt/550)**2;
    velocity += (speed-velocity)*(1-Math.exp(-dt*10));
    const depth=width/2*(curve ? 0.2 : 0.18)*(1+1.1*velocity);
    let moving=Math.abs(target-position)>0.05 || velocity>0.001 || dragging;
    const keyboardFocus=focused>=0 && links[focused].matches(':focus-visible');
    cards.forEach(({mesh,material,reflection,reflectionMaterial,link,rippleAt},index) => {
      const x=galleryOffset(index,position,stride,cards.length);
      mesh.position.set(x,0,0); reflection.position.copy(mesh.position);
      mesh.visible=reflection.visible=Math.abs(x)<width*1.5;
      const hoverTarget=hovered===index || keyboardFocus && focused===index ? 1 : 0;
      material.uniforms.uHover.value += (hoverTarget-material.uniforms.uHover.value)*(1-Math.exp(-dt*9));
      moving ||= Math.abs(hoverTarget-material.uniforms.uHover.value)>0.001;
      const age=(time-rippleAt)/1000;
      moving ||= mesh.visible && age<3;
      for (const item of [material,reflectionMaterial]) {
        item.uniforms.uVelocity.value=velocity; item.uniforms.uDepth.value=depth;
        item.uniforms.uHover.value=material.uniforms.uHover.value;
        item.uniforms.uFocus.value=keyboardFocus && focused===index ? 1 : 0;
        item.uniforms.uPointer.value.copy(material.uniforms.uPointer.value);
        item.uniforms.uRippleAge.value=age; item.uniforms.uRipple.value=age<3 ? 1 : 0;
      }
      link.style.visibility=mesh.visible ? 'visible' : 'hidden';
      if (!mesh.visible) return;
      const points=outline.map(([u,v]) => {
        const pointer=material.uniforms.uPointer.value;
        const [px,py,pz]=ribbonPoint(x+(u-0.5)*cardWidth,(v-0.5)*cardHeight,u,v,width/2,depth,curve,velocity,material.uniforms.uHover.value,cardHeight,cardWidth,pointer.x,pointer.y,age,age<3 ? 1 : 0);
        const scale=camera.position.z/(camera.position.z-pz);
        return [width/2+px*scale,height/2-py*scale];
      });
      const left=Math.min(...points.map(p=>p[0])),top=Math.min(...points.map(p=>p[1]));
      const right=Math.max(...points.map(p=>p[0])),bottom=Math.max(...points.map(p=>p[1]));
      link.style.transform=`translate(${left}px,${top}px)`;
      link.style.width=`${right-left}px`; link.style.height=`${bottom-top}px`;
      link.style.clipPath=`polygon(${points.map(p=>`${p[0]-left}px ${p[1]-top}px`).join(',')})`;
    });
    renderer.render(scene,camera);
    if (moving) frame=requestAnimationFrame(render); else lastTime=0;
  };
  const resume=() => { if (!frame && visible && ready && !disposed && !document.hidden) frame=requestAnimationFrame(render); };
  const observer=new IntersectionObserver(entries => { visible=entries[0].isIntersecting; resume(); }); observer.observe(stage);
  const resizeObserver=new ResizeObserver(() => { resize(); resume(); }); resizeObserver.observe(stage);
  document.addEventListener('visibilitychange',resume,listen);
  window.addEventListener('scroll',syncScroll,{ passive: true,...listen });
  stage.addEventListener('wheel',event => {
    if (!ready || event.ctrlKey || Math.abs(event.deltaX)<=Math.abs(event.deltaY)) return;
    const value=galleryPosition(target+event.deltaX*(event.deltaMode===1 ? 16 : event.deltaMode===2 ? width : 1),stride,cards.length);
    if (value===target) return;
    event.preventDefault();
    moveTo(value);
  },{ passive: false,...listen });
  stage.addEventListener('pointerdown',event => {
    if (!ready || event.button!==0) return;
    dragging=true; dragged=false; dragStart=event.clientX; dragY=event.clientY; dragPosition=target;
    resume();
  },listen);
  stage.addEventListener('dragstart',event => event.preventDefault(),listen);
  window.addEventListener('pointermove',event => {
    if (!dragging) return;
    const dx=event.clientX-dragStart;
    if (event.pointerType==='touch' && Math.abs(event.clientY-dragY)>Math.abs(dx)+8) { dragging=false; return; }
    if (Math.abs(dx)>6) dragged=true;
    moveTo(dragPosition-dx*1.3);
  },listen);
  window.addEventListener('pointerup',() => { dragging=false; resume(); },listen);
  window.addEventListener('pointercancel',() => { dragging=false; dragged=false; resume(); },listen);
  window.addEventListener('blur',() => { dragging=false; dragged=false; hovered=-1; resume(); },listen);
  root.addEventListener('keydown',event => {
    if (!ready || !['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) return;
    const value=galleryPosition(target+(['ArrowLeft','ArrowUp'].includes(event.key) ? -stride : stride),stride,cards.length);
    if (value===target) return;
    event.preventDefault(); moveTo(value);
  },listen);
  previous.addEventListener('click',() => moveTo(target-stride),listen);
  next.addEventListener('click',() => moveTo(target+stride),listen);
  const destroy=() => {
    if (disposed) return;
    disposed=true; events.abort(); cancelAnimationFrame(frame); observer.disconnect(); resizeObserver.disconnect();
    cards.forEach(({material,reflectionMaterial,link}) => {
      material.uniforms.uTexture.value?.dispose(); material.dispose(); reflectionMaterial.dispose(); link.removeAttribute('style');
    });
    geometry.dispose(); floor.geometry.dispose(); floorMaterial.dispose(); renderer.dispose(); root.classList.remove('gallery-enhanced'); root.style.removeProperty('height');
    previous.disabled=next.disabled=false;
  };
  signal.addEventListener('abort',destroy,{ once: true });
  reduced.addEventListener('change',destroy,{ once: true,...listen });
  canvas.addEventListener('webglcontextlost',event => { event.preventDefault(); destroy(); },listen);
  Promise.all(cards.map(async ({material,reflectionMaterial,link}) => {
    const image=link.querySelector('img')!;
    await image.decode(); if (disposed) return;
    const surface=document.createElement('canvas'); surface.width=1200; surface.height=706;
    const ctx=surface.getContext('2d')!;
    const scale=Math.max(surface.width/image.naturalWidth,surface.height/image.naturalHeight);
    ctx.drawImage(image,(surface.width-image.naturalWidth*scale)/2,(surface.height-image.naturalHeight*scale)/2,image.naturalWidth*scale,image.naturalHeight*scale);
    const scrim=ctx.createLinearGradient(0,480,0,706); scrim.addColorStop(0,'transparent'); scrim.addColorStop(1,'rgba(0,0,0,.7)');
    ctx.fillStyle=scrim; ctx.fillRect(0,480,1200,226);
    ctx.fillStyle='#fff'; ctx.font='500 38px sans-serif'; ctx.fillText(link.dataset.title!,42,660,990);
    ctx.fillStyle='#050505'; ctx.beginPath(); ctx.arc(1130,648,27,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#fff'; ctx.font='24px sans-serif'; ctx.fillText('→',1118,656);
    const texture=new THREE.CanvasTexture(surface); texture.colorSpace=THREE.SRGBColorSpace;
    texture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
    material.uniforms.uTexture.value=reflectionMaterial.uniforms.uTexture.value=texture;
  })).then(() => {
    if (disposed) return;
    ready=true; root.classList.add('gallery-enhanced'); resize(); position=target; resume();
  }).catch(error => { console.warn('Project gallery images unavailable:',error); destroy(); });
}
