import { projects, additionalProjects } from './projects';
import type { Project, ProjectArtifact } from '../types';

// This collection is the only boundary used by pages and interactive islands.
export const publicProjects = [...projects, ...additionalProjects].filter(p => !p.isPrivate);
export const selectedSlugs = ['tokokaret', 'tailor-cooperative-system', 'innofashion-show-8', 'akun-ai', 'market-district', 'rekapflow'];
export const displayName = (p: Project) => ({'akun-ai':'Akun.AI','market-district':'Market District','wgg-2026-realtime-voting-game':'WGG','tokokaret':'TokoKaret','tailor-cooperative-system':'SAKTI','innofashion-show-8':'Innofashion'}[p.slug] ?? p.title);
export function artifacts(p: Project): ProjectArtifact[] {
  const items = [...(p.screenshot ? [{src:p.screenshot,alt:p.title,caption:p.description}] : []), ...(p.proofArtifacts ?? [])];
  return items.filter((a,i) => items.findIndex(b => a.src === b.src) === i);
}
export {studioCopy} from '../i18n/studio';

export function deploymentLabel(p: Project, lang: "en" | "id") {
  if (p.slug === "wedding-dress-rental") return lang === "id" ? "Pernah live · trial Odoo berakhir" : "Previously live · Odoo trial expired";
  if (p.liveUrl || p.liveLinks?.length) return p.slug === "rekapflow" ? "Live prototype" : p.slug === "akun-ai" ? "Live · In development" : "Live website";
  return "";
}
