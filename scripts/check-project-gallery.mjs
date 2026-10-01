import assert from 'node:assert/strict';
import { galleryOffset, ribbonPoint } from '../src/components/portfolio/projectGallery.ts';

// Every viewport must stay filled when crossing either end of the project ring.
const count = 14, stride = 550, cycle = count * stride;
for (const position of [-1e8, -cycle, -1, 0, 1, cycle - 1, cycle, 1e8]) {
  const offsets = Array.from({ length: count }, (_, i) => galleryOffset(i, position, stride, count)).sort((a, b) => a - b);
  assert.ok(offsets[0] >= -cycle / 2 && offsets.at(-1) < cycle / 2);
  for (let i = 1; i < count; i++) assert.ok(Math.abs(offsets[i] - offsets[i - 1] - stride) < 1e-6);
  assert.ok(offsets.some(x => Math.abs(x) <= stride / 2));
  assert.ok(Math.abs(galleryOffset(3, position + cycle, stride, count) - galleryOffset(3, position, stride, count)) < 1e-6);
}

// Hover bends the interior, keeps the silhouette joined, and stays finite on phones.
for (const width of [195, 640, 960]) {
  for (const curve of [0, 1]) {
    for (const velocity of [0, 0.5, 1]) {
      const point = (u, v, hover) => ribbonPoint((u - 0.5) * width, (v - 0.5) * 300, u, v, width, width * 0.2, curve, velocity, hover, 300);
      for (const [u, v] of [[0, 0], [1, 1], [0, 0.5], [0.5, 1]]) assert.deepEqual(point(u, v, 0), point(u, v, 1));
      const flat = point(0.5, 0.5, 0), bent = point(0.5, 0.5, 1);
      assert.ok(bent.every(Number.isFinite));
      assert.ok(bent[2] < flat[2] - 29);
    }
  }
}
console.log('Project gallery: bidirectional infinite loop and ribbon deformation passed.');
