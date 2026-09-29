import { projects, additionalProjects } from './projects';
import type { Project, ProjectArtifact } from '../types';

// This collection is the only boundary used by pages and interactive islands.
export const publicProjects = [...projects, ...additionalProjects].filter(p => !p.isPrivate);
export const selectedSlugs = ['akun-ai', 'market-district', 'tokokaret', 'tailor-cooperative-system', 'innofashion-show-8'];
export const displayName = (p: Project) => ({'akun-ai':'Akun.AI','market-district':'Market District','wgg-2026-realtime-voting-game':'WGG','tokokaret':'TokoKaret','tailor-cooperative-system':'SAKTI','innofashion-show-8':'Innofashion'}[p.slug] ?? p.title);
export function artifacts(p: Project): ProjectArtifact[] {
  const items = [...(p.screenshot ? [{src:p.screenshot,alt:p.title,caption:p.description}] : []), ...(p.proofArtifacts ?? [])];
  return items.filter((a,i) => items.findIndex(b => a.src === b.src) === i);
}
export {studioCopy} from '../i18n/studio';
