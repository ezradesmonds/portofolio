import * as THREE from "three";

/**
 * Custom hologram material for the portrait plane.
 *
 * Renders the photo as projected light rather than a flat image:
 *   · cyan/blue tint of the luminance
 *   · horizontal scanlines that drift upward over time
 *   · subtle flicker + occasional glitch band (cheap hash-based noise)
 *   · fresnel edge glow
 *   · in-shader chromatic aberration (so it only affects the hologram, not
 *     the whole frame via post-processing)
 *   · luminance-masked alpha so dark pixels read as transparent light
 *
 * The `uOpacity` uniform is driven every frame by the scroll progress.
 */
export interface HologramUniforms {
  uMap: { value: THREE.Texture | null };
  uTime: { value: number };
  uColor: { value: THREE.Color };
  uOpacity: { value: number };
  uScanDensity: { value: number };
  uFlicker: { value: number };
  uAberration: { value: number };
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(cameraPosition - worldPosition.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uScanDensity;
  uniform float uFlicker;
  uniform float uAberration;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    // --- chromatic aberration: offset R/B samples by distance from center ---
    vec2 ca = vec2(uAberration) * (vUv.x - 0.5) * 0.03;
    float r = texture2D(uMap, vUv + ca).r;
    float g = texture2D(uMap, vUv).g;
    float b = texture2D(uMap, vUv - ca).b;
    vec3 tex = vec3(r, g, b);

    // luminance used as the alpha mask (bright pixels = projected light)
    float lum = dot(tex, vec3(0.299, 0.587, 0.114));

    // --- tint the photo toward the hologram color ---
    vec3 color = mix(tex, uColor, 0.55);

    // --- drifting scanlines (move upward over time) ---
    float scan = sin((vUv.y + uTime * 0.12) * uScanDensity);
    scan = 0.82 + 0.18 * scan;
    // a single thicker "refresh" band sweeping down for extra depth
    float band = smoothstep(0.02, 0.0, abs(fract(vUv.y + uTime * 0.08) - 0.5));
    color *= scan + band * 0.6;

    // --- flicker / glitch ---
    float flick = 1.0;
    if (uFlicker > 0.0) {
      float n = hash(vec2(floor(uTime * 14.0), 7.0));
      float glitch = step(0.9, n);
      // occasional horizontal displacement band on glitch frames
      float bandGlitch = step(0.98, hash(vec2(floor(uTime * 14.0), floor(vUv.y * 40.0))));
      vec2 uvGlitch = vUv;
      uvGlitch.x += (glitch * bandGlitch) * (n - 0.5) * 0.04;
      float gr = texture2D(uMap, uvGlitch + ca).r;
      float gg = texture2D(uMap, uvGlitch).g;
      float gb = texture2D(uMap, uvGlitch - ca).b;
      color = mix(color, vec3(gr, gg, gb), glitch * 0.35);
      flick = mix(1.0, 0.55 + n * 0.7, glitch * uFlicker);
    }

    // --- fresnel edge glow ---
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), 2.5);
    color += uColor * fresnel * 1.4;

    // --- alpha: luminance + fresnel, faded at top/bottom edges, scaled by opacity ---
    float alpha = (lum * 0.85 + fresnel) * uOpacity;
    alpha *= smoothstep(0.0, 0.16, vUv.y) * smoothstep(1.0, 0.84, vUv.y);

    gl_FragColor = vec4(color * flick, alpha);
  }
`;

export function createHologramMaterial(texture: THREE.Texture): THREE.ShaderMaterial {
  const uniforms: HologramUniforms = {
    uMap: { value: texture },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#4db8ff") },
    uOpacity: { value: 0 },
    uScanDensity: { value: 140 },
    uFlicker: { value: 0.6 },
    uAberration: { value: 1.0 },
  };

  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: uniforms as unknown as Record<string, THREE.IUniform>,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}
