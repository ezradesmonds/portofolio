import type { Award, CapabilityGroup, Experience, Project, ProjectDetail } from "../types";
import type { Lang } from "./translations";

type ProjectLocale = Partial<
  Pick<
    Project,
    | "title"
    | "category"
    | "description"
    | "problem"
    | "targetUsers"
    | "role"
    | "contribution"
    | "statusLabel"
    | "outcome"
  >
> & {
  detail?: Partial<ProjectDetail>;
};

const projectIdLocales: Record<string, ProjectLocale> = {
  "akun-ai": {
    category: "SaaS Akuntansi AI / FinTech",
    description:
      "Platform akuntansi berbantuan AI yang membuat pembukuan dan laporan keuangan lebih mudah dipakai oleh bisnis Indonesia.",
    problem:
      "Banyak bisnis Indonesia masih kesulitan menjalankan pembukuan yang rapi, sementara alat akuntansi yang mudah dipahami dan sesuai kebutuhan lokal masih terbatas.",
    targetUsers: "Pemilik bisnis dan operator bisnis Indonesia",
    role: "Pembangun produk solo",
    contribution:
      "Perencanaan produk, arsitektur sistem, frontend, backend, alur akuntansi, integrasi AI, laporan keuangan, dan pengalaman pengguna.",
    statusLabel: "Dalam Pengembangan",
    outcome:
      "Pra-peluncuran: alur akuntansi penuh sudah dibangun, termasuk chart of accounts, validasi double-entry, laporan keuangan, asisten AI, OCR struk, dan manajemen langganan.",
    detail: {
      overview:
        "Akun.AI adalah SaaS akuntansi berbantuan AI untuk bisnis Indonesia. Sistem ini menggabungkan pembukuan modern dengan asisten akuntansi, OCR struk, dan laporan keuangan otomatis.",
      keyFeatures: [
        "Onboarding bisnis dan chart of accounts",
        "Akuntansi double-entry dengan validasi",
        "Laporan laba rugi dan neraca",
        "Ekspor CSV dan laporan siap cetak",
        "Asisten akuntansi AI melalui OpenRouter",
        "OCR struk untuk input transaksi otomatis",
        "Akses tim dan manajemen langganan dengan Stripe",
        "Row-Level Security untuk isolasi data",
      ],
      challenges: [
        "Merancang alur akuntansi yang tetap mudah dipahami non-akuntan",
        "Membangun validasi double-entry yang bisa menangkap kesalahan umum",
        "Mendesain prompt AI yang menghasilkan jawaban akuntansi yang dapat diaudit",
      ],
      lessonsLearned: [
        "Pemodelan domain akuntansi butuh pemahaman kuat terhadap standar dan kebiasaan lokal",
        "Integrasi AI untuk data keuangan harus diberi grounding dan validasi yang ketat",
        "Integrasi pembayaran untuk use case bisnis Indonesia punya pertimbangan tersendiri",
      ],
    },
  },
  tokokaret: {
    category: "E-Commerce / Rekomendasi Produk AI",
    description:
      "Platform commerce live untuk produk karet dan industri dengan pengalaman konsultasi berbantuan AI.",
    problem:
      "Pembeli produk karet dan industri sering butuh arahan teknis, sementara e-commerce biasa tidak cukup pintar untuk memberi rekomendasi berdasarkan gejala dan kebutuhan pemakaian.",
    targetUsers: "Pembeli industri, bengkel, dan bisnis yang membutuhkan produk karet atau industri",
    role: "Pembangun produk dan desainer",
    contribution:
      "Merancang dan membangun landing experience, alur konsultasi, jalur penjualan, dan flow rekomendasi berbantuan AI.",
    statusLabel: "Sudah Live",
    outcome:
      "Landing experience berfokus konversi untuk bisnis dengan 4.000+ pelanggan dan 50.000+ item yang direpresentasikan.",
    detail: {
      overview:
        "TokoKaret.com adalah platform commerce yang menjembatani katalog produk industri dengan keputusan pembelian yang lebih terarah. Mesin rekomendasi berbasis Gemini membantu pelanggan menemukan produk karet yang tepat dari gejala dan kebutuhan mereka.",
      keyFeatures: [
        "Landing experience berfokus konversi",
        "Rekomendasi dari gejala ke produk berbasis AI (Google Gemini)",
        "Integrasi jalur penjualan WhatsApp dan marketplace",
        "Alur konsultasi pelanggan dengan intake terstruktur",
        "Desain responsif untuk pengguna Indonesia yang mobile-first",
      ],
      challenges: [
        "Menerjemahkan spesifikasi teknis produk industri menjadi rekomendasi yang mudah dipahami pelanggan",
        "Membangun pipeline prompt Gemini yang bisa memetakan gejala ke produk dengan konsisten",
        "Menghubungkan rekomendasi AI dengan alur penjualan offline",
      ],
      results:
        "Platform ini menjadi storefront digital untuk bisnis dengan 4.000+ pelanggan dan mendukung discovery produk dari katalog 50.000+ item.",
    },
  },
  financeos: {
    category: "Riset Kuantitatif / FinTech / AI",
    description:
      "Terminal riset finansial privat untuk analisis market, pemindaian sinyal algoritmik, dan evaluasi trade secara terstruktur tanpa modal nyata.",
    problem:
      "Trader dan peneliti kuantitatif butuh lingkungan yang sistematis dan dapat diaudit untuk backtesting strategi serta evaluasi ide trade tanpa mempertaruhkan modal nyata.",
    targetUsers: "Peneliti kuantitatif, trader, dan analis finansial",
    role: "Arsitek produk dan developer",
    contribution:
      "Arsitektur produk, integrasi market data, desain workflow riset, perencanaan backend, arsitektur persistence, dan pengalaman terminal frontend.",
    statusLabel: "Sistem Riset",
    outcome:
      "Terminal dry-run trading dengan pemindaian market terjadwal, generasi sinyal, pelacakan siklus trade, dan visualisasi equity curve.",
    detail: {
      overview:
        "FinanceOS adalah terminal riset finansial untuk analisis market sistematis menggunakan data publik Binance. Sistem ini mendukung pemindaian terjadwal, generasi sinyal, eksekusi dry-run, dan analitik performa dalam lingkungan riset terstruktur. Ini sistem riset dan analisis, bukan platform live trading.",
      keyFeatures: [
        "Integrasi data market publik Binance",
        "Pemindaian market terjadwal",
        "Generasi sinyal algoritmik",
        "Eksekusi dry-run dan pelacakan siklus trade",
        "Visualisasi equity curve",
        "Metrik performa dalam persentase profit dan R",
      ],
      challenges: [
        "Merancang pipeline sinyal yang reliabel di atas data market publik",
        "Membangun pelacakan siklus trade yang merepresentasikan posisi paper dengan akurat",
        "Membangun frontend kelas riset yang tetap cepat dengan data real-time",
      ],
    },
  },
  "tailor-cooperative-system": {
    title: "Sistem Prediksi Efisiensi Penjahit & Manajemen Koperasi",
    category: "Machine Learning / Sistem Operasional",
    description:
      "Sistem prediksi efisiensi tenaga kerja berbasis machine learning yang digabungkan dengan platform manajemen koperasi untuk keputusan operasional.",
    problem:
      "Manajer koperasi kekurangan alat berbasis data untuk membagi pekerjaan ke penjahit paling efisien dan mengelola berbagai fungsi operasional.",
    targetUsers: "Manajer koperasi dan staf operasional",
    role: "Anggota tim lintas fungsi",
    contribution:
      "Terlibat dalam proses produk, memimpin validasi model finansial dan IRR, berkontribusi pada arsitektur sistem, desain backend dan administrasi, serta mengembangkan interface operasional.",
    statusLabel: "Kompetisi - Juara 2",
    outcome:
      "Juara 2 - SUTD x Petra Christian University International Hackathon, Januari 2026.",
    detail: {
      overview:
        "Sistem dua modul yang menggabungkan machine learning untuk prediksi efisiensi tenaga kerja dengan platform manajemen koperasi. Modulnya mencakup prediksi efisiensi penjahit, dashboard operasional, manajemen penjahit, stok, supplier, dan pembelian.",
      keyFeatures: [
        "Model prediksi efisiensi penjahit berbasis ML",
        "Dashboard operasional untuk manajer koperasi",
        "Modul manajemen penjahit, stok, supplier, dan pembelian",
        "Otomatisasi alur kerja operasional koperasi",
        "Validasi model finansial dan IRR",
      ],
      challenges: [
        "Melatih model prediksi yang reliabel dengan data operasional terbatas",
        "Mengintegrasikan prediksi ML ke workflow operasional yang praktis",
        "Berkoordinasi dengan anggota tim multidisiplin dari bisnis, arsitektur, dan bisnis internasional",
      ],
      results:
        "Mendapat Juara 2 di SUTD x Petra Christian University International Hackathon karena menggabungkan kedalaman teknis dengan kegunaan operasional.",
    },
  },
  "innofashion-show-8": {
    title: "Platform Event Innofashion Show 8",
    category: "Teknologi Event Full-Stack",
    description:
      "Platform event full-stack untuk registrasi peserta, administrasi, ticketing berbasis QR, dan operasi acara untuk 100+ peserta.",
    problem:
      "Event mahasiswa berskala besar butuh sistem registrasi dan administrasi custom yang reliabel, sementara solusi umum tidak selalu bisa diadaptasi cepat.",
    targetUsers: "Peserta event, administrator, dan staf operasional",
    role: "Kepala / Koordinator Divisi IT",
    contribution:
      "Memimpin divisi teknis, merancang arsitektur sistem dan interface produk, mengimplementasikan banyak bagian frontend dan backend, mengoordinasikan kontributor teknis, mengelola deployment, dan menjaga reliabilitas saat event berlangsung.",
    statusLabel: "Terkirim",
    outcome:
      "Berhasil mendukung 100+ peserta dalam registrasi, ticketing, dan operasi hari-H.",
    detail: {
      overview:
        "Platform manajemen event custom untuk Innofashion Show 8, event besar yang dijalankan mahasiswa. Sistem ini menangani registrasi peserta, ticketing berbasis QR, dashboard admin, dan operasi event real-time.",
      keyFeatures: [
        "Registrasi peserta dan manajemen data",
        "Sistem ticketing berbasis QR",
        "Dashboard administrasi",
        "Alur registrasi kompetisi dan talkshow",
        "Sistem autentikasi dan otorisasi",
        "Dukungan reliabilitas saat event berlangsung",
      ],
      challenges: [
        "Mengirim sistem reliabel di bawah deadline event yang ketat",
        "Mengoordinasikan anggota teknis dan non-teknis",
        "Menjaga stabilitas sistem saat operasi live event",
      ],
      results:
        "Platform memproses 100+ peserta dan berjalan reliabel sepanjang event. Tim teknis mengirim sistem di bawah koordinasi kepala divisi IT.",
    },
  },
  "bizxray-ai": {
    category: "Konsultasi Bisnis AI",
    description:
      "Platform konsultasi bisnis berbantuan AI dengan enam modul analisis untuk evaluasi dan rekomendasi bisnis yang terstruktur.",
    problem:
      "Bisnis kecil sering tidak mampu membayar konsultasi tradisional, tetapi tetap butuh evaluasi bisnis yang analitis untuk menemukan area perbaikan dan peluang pertumbuhan.",
    targetUsers: "Pemilik dan operator bisnis kecil",
    role: "Pembangun produk",
    contribution:
      "Merancang workflow analisis multi-modul, mengintegrasikan LLM berbasis OpenRouter untuk analisis bisnis, dan membangun sistem laporan serta rekomendasi.",
    statusLabel: "Prototipe",
    detail: {
      overview:
        "BizXRay AI menyediakan enam modul analisis untuk berbagai aspek evaluasi bisnis. Setiap modul memakai prompting terstruktur dan analisis LLM untuk menghasilkan insight serta rekomendasi yang bisa ditindaklanjuti.",
      keyFeatures: [
        "Framework analisis bisnis enam modul",
        "Integrasi LLM berbasis OpenRouter",
        "Prompting dan pelaporan berorientasi bisnis",
        "Generasi rekomendasi terstruktur",
      ],
      challenges: [
        "Merancang prompt yang menghasilkan analisis bisnis konsisten dan terstruktur",
        "Menyeimbangkan insight dari AI dengan penilaian bisnis manusia",
      ],
    },
  },
  servisin: {
    category: "Marketplace Jasa / Aplikasi Mobile / Tugas Akhir Technopreneur",
    description:
      "MVP marketplace mobile yang menghubungkan pelanggan dengan layanan perbaikan peralatan rumah. Dibangun sebagai tugas akhir mata kuliah Technopreneur.",
    problem:
      "Pelanggan sulit menemukan teknisi perbaikan peralatan rumah yang reliabel, sementara teknisi kekurangan kanal digital untuk menjangkau klien baru.",
    targetUsers: "Pemilik rumah yang butuh perbaikan alat dan teknisi layanan",
    role: "Arsitek produk dan bisnis",
    contribution:
      "Desain produk dan proses bisnis, arsitektur backend dan administrasi, workflow untuk teknisi, model finansial dan validasi IRR, serta alur pelanggan dan operasi layanan.",
    statusLabel: "MVP",
    detail: {
      overview:
        "Servisin adalah MVP marketplace mobile yang menghubungkan pelanggan dengan teknisi perbaikan peralatan rumah. Platform menangani request pelanggan, matching teknisi, tracking layanan, dan workflow administrasi.",
      keyFeatures: [
        "Alur request layanan pelanggan",
        "Matching dan dispatch teknisi",
        "Tracking layanan dan update status",
        "Dashboard administrasi",
        "Model finansial dan validasi IRR",
      ],
      challenges: [
        "Merancang model marketplace yang menyeimbangkan kebutuhan pelanggan dan teknisi",
        "Membangun pengalaman mobile lintas platform dengan resource terbatas",
      ],
    },
  },
  "wedding-dress-rental": {
    title: "Platform Rental Gaun Pengantin",
    category: "Sistem Enterprise / Odoo",
    description:
      "Sistem e-commerce rental berbasis Odoo untuk bisnis gaun pengantin, termasuk tracking inventori dan manajemen booking.",
    problem: "Bisnis rental butuh cara yang lebih rapi untuk mengelola ketersediaan gaun, booking, dan transaksi.",
    targetUsers: "Pelanggan dan operator bisnis gaun pengantin",
    role: "Developer",
    contribution:
      "Mengonfigurasi dan menyesuaikan modul e-commerce serta rental Odoo untuk mendukung booking, ketersediaan, dan manajemen transaksi.",
    statusLabel: "Studi Kasus",
  },
  "quantitative-stock-prediction": {
    title: "Prediksi Saham Kuantitatif",
    category: "Financial Technology / Machine Learning",
    description:
      "Sistem prediksi finansial berbasis machine learning yang menggabungkan indikator teknikal dan dashboard analitik interaktif.",
    problem: "Peneliti kuantitatif butuh eksperimen prediksi dan backtesting yang lebih terstruktur untuk mengevaluasi sinyal market.",
    targetUsers: "Peneliti kuantitatif",
    role: "Developer",
    contribution:
      "Membangun sinyal trading menggunakan indikator MACD, RSI, EMA, dan Z-Score. Membuat engine backtesting Python dan dashboard analitik Streamlit.",
    statusLabel: "Akademik",
  },
  "tower-defense-game": {
    title: "Game Tower Defense",
    category: "Game Development / Tugas Akhir OOP",
    description:
      "Game 2D tower defense yang menerapkan prinsip object-oriented programming dan desain logika game. Dibangun sebagai tugas akhir mata kuliah Pemrograman Berbasis Obyek.",
    problem: "Proyek akademik ini berfokus pada penerapan OOP ke sistem game yang punya state, musuh, tower, dan progresi wave.",
    targetUsers: "Pemain kasual",
    role: "Developer",
    contribution:
      "Mengimplementasikan mekanik inti seperti pathfinding musuh, penempatan tower, logika serangan, dan progresi wave menggunakan Java dan LibGDX.",
    statusLabel: "Akademik",
  },
  "ppdb-school-info-system": {
    title: "Sistem Informasi PPDB Sekolah",
    category: "Full-Stack / Pendidikan / Tugas Akhir Teknologi Web",
    description:
      "Sistem pendaftaran dan informasi siswa untuk proses penerimaan sekolah. Dibangun sebagai tugas akhir mata kuliah Teknologi Web.",
    problem: "Proses penerimaan siswa membutuhkan sistem yang membantu admin mengelola data pendaftar dengan lebih rapi.",
    targetUsers: "Administrator sekolah dan calon siswa",
    role: "Developer",
    contribution:
      "Membangun sistem web untuk pendaftaran, pengelolaan data, dan alur informasi penerimaan siswa.",
    statusLabel: "Akademik",
  },
  "finance-tracker": {
    title: "Pelacak Keuangan",
    category: "Full-Stack / Tugas Akhir Deployment Web Framework",
    description:
      "Aplikasi web untuk tracking dan manajemen keuangan pribadi yang dibangun dengan praktik deployment modern.",
    problem: "Pengguna individu butuh cara sederhana untuk mencatat dan memahami arus keuangan pribadi.",
    targetUsers: "Pengguna individu yang mengelola keuangan pribadi",
    role: "Developer",
    contribution:
      "Merancang dan membangun aplikasi finance tracker full-stack, termasuk pipeline deployment, desain database, dan frontend responsif.",
    statusLabel: "Tugas Akhir Akademik",
  },
};

const experienceIdLocales: Partial<Experience>[] = [
  {
    role: "Kepala / Koordinator Divisi IT",
    period: "2024 - 2025",
    description:
      "Memimpin perencanaan teknis, arsitektur, development, dan deployment platform event full-stack.",
    highlights: [
      "Memimpin perencanaan teknis, arsitektur, desain interface, development, deployment, dan reliabilitas saat event",
      "Mengoordinasikan kontributor teknis dan divisi event non-teknis",
      "Mengimplementasikan banyak bagian frontend dan backend",
      "Mengelola operasi teknis on-site saat event berlangsung",
    ],
  },
  {
    role: "Ketua Event",
    description:
      "Memimpin perencanaan dan eksekusi talkshow edukasi finansial.",
    highlights: [
      "Memimpin perencanaan dan eksekusi talkshow edukasi finansial",
      "Mengoordinasikan tim, operasi event, evaluasi, dan pengalaman peserta",
      "Mengelola budgeting dan alokasi resource",
    ],
  },
  {
    role: "Sekretaris dan Bendahara",
    description:
      "Mengelola budgeting, operasi finansial, dan dokumentasi administratif untuk kompetisi desain UI/UX.",
    highlights: [
      "Mengelola budgeting, operasi finansial, tracking pengeluaran, dan laporan keuangan",
      "Menyiapkan dokumen administratif, surat izin, dan korespondensi resmi",
      "Mendukung logistik event dan koordinasi lintas tim",
    ],
  },
  {
    role: "Anggota Organisasi",
    period: "2024 - Sekarang",
    description:
      "Anggota aktif himpunan mahasiswa Informatika di Universitas Kristen Petra.",
    highlights: [
      "Berkontribusi dalam aktivitas organisasi dan event",
      "Berkolaborasi dengan mahasiswa lain dalam inisiatif teknis dan komunitas",
    ],
  },
];

const awardIdLocales: Partial<Award>[] = [
  {
    title: "Juara 2",
    event: "SUTD x Petra Christian University International Hackathon",
    description:
      "Membangun sistem prediksi efisiensi tenaga kerja berbasis machine learning yang digabungkan dengan platform manajemen koperasi. Berkompetisi dengan tim multidisiplin dari engineering, bisnis, arsitektur, dan international business.",
  },
  {
    title: "Juara 1",
    description:
      "Tampil sebagai bagian dari ensemble musik, menunjukkan kolaborasi kreatif dan persiapan yang disiplin.",
  },
  {
    title: "Juara 1",
    description:
      "Meraih juara pertama dalam kompetisi band pelajar tingkat kota yang diselenggarakan PDAM Surabaya.",
  },
  {
    title: "Juara 1",
    description:
      "Meraih juara pertama dalam kompetisi band antar sekolah Invalesco.",
  },
  {
    title: "Juara 3",
    description:
      "Meraih juara ketiga dalam kompetisi band tingkat nasional di Universitas Negeri Surabaya.",
  },
  {
    title: "Juara 1",
    description:
      "Meraih juara pertama dalam kompetisi band Manafesto di Fakultas Ekonomi dan Bisnis UNESA.",
  },
  {
    description:
      "Mendapat penghargaan Harapan 2 dalam kompetisi Indonesia Rookie Guest List.",
  },
  {
    title: "Favorit",
    description:
      "Mendapat likes terbanyak dan penghargaan favorit audiens untuk produksi film pendek.",
  },
  {
    title: "Juara 1",
    description:
      "Memproduksi dan menyutradarai film pendek yang diakui karena storytelling dan eksekusi kreatif.",
  },
  {
    title: "Juara 1",
    description:
      "Berkompetisi dalam tantangan strategi dan eksekusi bisnis, menunjukkan pemikiran analitis dan kolaborasi tim.",
  },
];

const capabilityIdLocales: {
  name: string;
  items: string[];
}[] = [
  {
    name: "Engineering Produk",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Astro",
      "Tailwind CSS",
      "Engineering UI responsif",
      "Arsitektur komponen",
    ],
  },
  {
    name: "Backend & Data",
    items: [
      "Laravel",
      "PHP",
      "Supabase",
      "PostgreSQL",
      "SQL",
      "REST APIs",
      "Autentikasi & otorisasi",
      "Row-Level Security",
    ],
  },
  {
    name: "AI & Data",
    items: [
      "Python",
      "Machine learning",
      "Integrasi LLM",
      "OpenRouter",
      "Integrasi Google Gemini",
      "Workflow OCR",
      "Analisis data",
    ],
  },
  {
    name: "Tools Engineering",
    items: ["Git", "GitHub", "Docker", "Vercel", "Workflow deployment"],
  },
  {
    name: "Bahasa Lain & Fondasi Akademik",
    items: ["Java", "C++", "R"],
  },
];

function mergeDetail(base: ProjectDetail | undefined, localized: Partial<ProjectDetail> | undefined) {
  if (!localized) return base;

  return {
    ...(base ?? { overview: "", keyFeatures: [] }),
    ...localized,
    keyFeatures: localized.keyFeatures ?? base?.keyFeatures ?? [],
    challenges: localized.challenges ?? base?.challenges,
    lessonsLearned: localized.lessonsLearned ?? base?.lessonsLearned,
    relatedProjects: localized.relatedProjects ?? base?.relatedProjects,
  };
}

export function localizeProject(project: Project, lang: Lang): Project {
  if (lang !== "id") return project;

  const localized = projectIdLocales[project.slug];
  if (!localized) return project;

  return {
    ...project,
    ...localized,
    detail: mergeDetail(project.detail, localized.detail),
  };
}

export function localizeProjects(projects: Project[], lang: Lang): Project[] {
  return projects.map((project) => localizeProject(project, lang));
}

export function localizeExperiences(experiences: Experience[], lang: Lang): Experience[] {
  if (lang !== "id") return experiences;

  return experiences.map((experience, index) => ({
    ...experience,
    ...experienceIdLocales[index],
    highlights: experienceIdLocales[index]?.highlights ?? experience.highlights,
  }));
}

export function localizeAwards(awards: Award[], lang: Lang): Award[] {
  if (lang !== "id") return awards;

  return awards.map((award, index) => ({
    ...award,
    ...awardIdLocales[index],
  }));
}

export function localizeCapabilities(groups: CapabilityGroup[], lang: Lang): CapabilityGroup[] {
  if (lang !== "id") return groups;

  return groups.map((group, index) => {
    const localized = capabilityIdLocales[index];
    if (!localized) return group;

    return {
      ...group,
      name: localized.name,
      items: group.items.map((item, itemIndex) => ({
        ...item,
        name: localized.items[itemIndex] ?? item.name,
      })),
    };
  });
}
