import { projects, additionalProjects } from './projects';
import type { Project, ProjectArtifact } from '../types';
import { PORTFOLIO_FACTS } from './facts';

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
  if (p.slug === "tailor-cooperative-system") return lang === "id" ? "Prototipe hackathon · Juara 2" : "Hackathon prototype · 2nd place";
  if (p.slug === "market-district") return lang === "id" ? "Beta live · Pembayaran belum dibuka" : "Live beta · Payments not open";
  if (p.slug === "wgg-2026-realtime-voting-game") return lang === "id" ? "Selesai · Agustus 2026" : "Delivered · August 2026";
  if (p.liveUrl || p.liveLinks?.length) {
    if (p.slug === "rekapflow") return lang === "id" ? "Prototipe live" : "Live prototype";
    if (p.slug === "akun-ai") return lang === "id" ? "Live · Dalam pengembangan" : "Live · In development";
    return lang === "id" ? "Situs live" : "Live website";
  }
  return p.statusLabel;
}

// Short presentation copy derived from the project records; evidence stays in projects.ts.
const cardCopy: Record<string, Record<'en' | 'id', { category: string; summary?: string }>> = {
  tokokaret: {
    en: { category: 'Online store', summary: 'Built a storefront and guided product consultation for a rubber-parts business.' },
    id: { category: 'Toko online', summary: 'Membangun toko online dan konsultasi produk untuk bisnis suku cadang karet.' },
  },
  'tailor-cooperative-system': {
    en: { category: 'ML & cooperative operations', summary: 'Built tailor profiling and work-allocation tools for a cooperative prototype.' },
    id: { category: 'ML & operasional koperasi', summary: 'Membangun profil penjahit dan alat pembagian kerja dalam prototipe koperasi.' },
  },
  'innofashion-show-8': {
    en: { category: 'Event platform', summary: `Led IT delivery for registration, admin, and QR attendance. Supported ${PORTFOLIO_FACTS.innofashion.competitionRegistrations} competition registrations.` },
    id: { category: 'Platform event', summary: `Memimpin IT untuk registrasi, admin, dan absensi QR. Mendukung ${PORTFOLIO_FACTS.innofashion.competitionRegistrations} pendaftaran kompetisi.` },
  },
  'akun-ai': {
    en: { category: 'AI-assisted accounting', summary: 'Building bookkeeping, financial reports, and an AI assistant for Indonesian businesses.' },
    id: { category: 'Akuntansi berbantuan AI', summary: 'Mengembangkan pembukuan, laporan keuangan, dan asisten AI untuk bisnis Indonesia.' },
  },
  'market-district': {
    en: { category: 'Multiplayer board game', summary: 'Built a live Classic/Team negotiation game with Google sign-in, a bilingual landing, and Premium Host workflows.' },
    id: { category: 'Board game multiplayer', summary: 'Membangun game negosiasi Classic/Team dengan login Google, landing bilingual, dan flow Premium Host dalam beta live.' },
  },
  rekapflow: {
    en: { category: 'Spreadsheet review tool', summary: 'Built a prototype that checks spreadsheets and exports reviewed reports, without uploading files.' },
    id: { category: 'Alat review spreadsheet', summary: 'Membangun prototipe untuk memeriksa spreadsheet dan mengekspor laporan hasil review, tanpa upload file.' },
  },
  'wgg-2026-realtime-voting-game': { en: { category: 'Realtime voting' }, id: { category: 'Voting realtime' } },
  finlend: { en: { category: 'Credit risk simulation' }, id: { category: 'Simulasi risiko kredit' } },
  'bank-tulang': { en: { category: 'Health education' }, id: { category: 'Edukasi kesehatan' } },
  servisin: { en: { category: 'Service marketplace' }, id: { category: 'Marketplace jasa' } },
  'wedding-dress-rental': { en: { category: 'Dress rental & ERP' }, id: { category: 'Sewa gaun & ERP' } },
  'tower-defense-game': { en: { category: 'Tower defense game' }, id: { category: 'Game tower defense' } },
  'ppdb-school-info-system': { en: { category: 'School admissions' }, id: { category: 'Penerimaan siswa' } },
  'finance-tracker': { en: { category: 'Finance tracker' }, id: { category: 'Pencatat keuangan' } },
};

export function projectCardCopy(p: Project, lang: 'en' | 'id') {
  const copy = cardCopy[p.slug]?.[lang];
  return { category: copy?.category ?? p.category, summary: copy?.summary ?? p.description };
}
