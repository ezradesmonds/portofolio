import assert from 'node:assert/strict';
import { galleryImages } from '../src/components/portfolio/projectGallery.ts';

// At most three distinct stills per project; private work and videos stay out.
const images = galleryImages([
  { slug: 'public', screenshot: '/cover.webp', proofArtifacts: [
    { src: '/cover.webp' }, { src: '/detail.png' }, { src: '/demo.mp4', kind: 'video' },
    { src: '/diagram.svg' }, { src: '/third.jpg' }, { src: '/fourth.png' },
  ] },
  { slug: 'private', screenshot: '/secret.png', isPrivate: true },
  { slug: 'empty' },
  { slug: 'other', screenshot: '/other.webp', proofArtifacts: [{ src: '/detail.png' }, { src: '/fourth.png' }] },
]);
assert.deepEqual(images, [
  { slug: 'public', src: '/cover.webp' }, { slug: 'public', src: '/detail.png' },
  { slug: 'public', src: '/third.jpg' }, { slug: 'other', src: '/other.webp' },
  { slug: 'other', src: '/fourth.png' },
]);
assert.deepEqual(galleryImages([]), []);
assert.equal(galleryImages([{ slug: 'innofashion-show-8', screenshot: '/old.png' }])[0].src,
  '/assets/case-studies/innofashion-menu-landing.webp');
console.log('Project gallery: balanced image curation, deduplication and public visibility passed.');
