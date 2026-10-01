import assert from 'node:assert/strict';
import { galleryOffset, galleryPosition, ribbonPoint, waterDisplacement } from '../src/components/portfolio/projectGallery.ts';

// A finite sequence clamps at the first and last project, in either direction.
const count = 14, stride = 550, end = (count - 1) * stride;
for (const position of [-1e8, -1, 0, 1, end - 1, end, 1e8]) {
  const offsets = Array.from({ length: count }, (_, i) => galleryOffset(i, position, stride, count)).sort((a, b) => a - b);
  assert.ok(offsets[0] === -galleryPosition(position, stride, count));
  assert.equal(offsets.at(-1), end - galleryPosition(position, stride, count));
  for (let i = 1; i < count; i++) assert.ok(Math.abs(offsets[i] - offsets[i - 1] - stride) < 1e-6);
  assert.ok(offsets.some(x => Math.abs(x) <= stride / 2));
}
assert.equal(galleryPosition(1e8, stride, 1), 0);
assert.equal(galleryPosition(1e8, stride, 0), 0);
assert.equal(galleryOffset(0, end, stride, count), -end);
assert.equal(galleryOffset(count - 1, 0, stride, count), end);

// Water follows the pointer, fades with distance/time, and stays finite on phones.
const dent = waterDisplacement(.2, .7, 510, 300, 1, .2, .7, 0, 0);
assert.equal(dent, -22.5);
assert.ok(Math.abs(waterDisplacement(.9, .1, 510, 300, 1, .2, .7, 0, 0)) < .01);
const wave = age => waterDisplacement(.4, .7, 510, 300, 0, .2, .7, age, 1);
assert.ok(Math.abs(wave(3)) < Math.abs(wave(0)) * .01);
for (const width of [195, 640, 960]) {
  for (const curve of [0, 1]) {
    for (const velocity of [0, 0.5, 1]) {
      const point = (u, v, hover) => ribbonPoint((u - 0.5) * width, (v - 0.5) * 300, u, v, width, width * 0.2, curve, velocity, hover, 300);
      for (const [u, v] of [[0, 0], [1, 1], [0, 0.5], [0.5, 1]]) assert.ok(point(u, v, 1).every(Number.isFinite));
      const flat = point(0.5, 0.5, 0), bent = point(0.5, 0.5, 1);
      assert.ok(bent.every(Number.isFinite));
      assert.ok(bent[2] < flat[2] - 22);
    }
  }
}
console.log('Project gallery: finite boundaries, pointer-local water and ribbon deformation passed.');
