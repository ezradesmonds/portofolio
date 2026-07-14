import type { Award, CapabilityGroup, Experience, Project, ProjectDetail } from "../types";
import type { Lang } from "./translations";
import { PORTFOLIO_FACTS } from "../data/facts";

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
    | "githubUrl"
    | "githubLabel"
    | "githubLinks"
    | "githubIsGeneric"
    | "proofArtifacts"
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
      "Pra-peluncuran: alur inti akuntansi, laporan keuangan, asisten AI, prototype OCR struk, dan surface langganan Mayar sudah dibangun.",
    githubLabel: "Repo GitHub",
    detail: {
      overview:
        "Akun.AI adalah SaaS akuntansi berbantuan AI berstatus pre-launch untuk bisnis Indonesia. Sistem ini menggabungkan pembukuan, asisten akuntansi, laporan otomatis, dan prototype OCR struk yang masih memerlukan validasi produksi.",
      mySpecificBuilds: [
        "Merancang arsitektur workspace akuntansi, termasuk chart of accounts, flow ledger, laporan, dan batas data per tenant.",
        "Membangun flow SaaS full-stack untuk onboarding, dashboard, transaksi, invoice, inventory, laporan, asisten AI, dan surface langganan.",
        "Mengintegrasikan asisten AI sebagai helper finansial berbasis konteks workspace, sementara aksi akuntansi yang disimpan tetap dijaga validasi deterministik.",
      ],
      keyFeatures: [
        "Onboarding bisnis dan chart of accounts",
        "Akuntansi double-entry dengan validasi",
        "Laporan laba rugi dan neraca",
        "Ekspor CSV dan laporan siap cetak",
        "Asisten akuntansi AI melalui OpenRouter",
        "Prototype OCR struk untuk membantu input transaksi",
        "Akses tim dan manajemen langganan dengan Mayar",
        "Row-Level Security untuk isolasi data",
      ],
      featureStatus: [
        {
          name: "Pembukuan inti dan laporan keuangan",
          status: "working",
          note: "Sudah diimplementasikan di workspace pre-launch; perilaku akuntansi dan compliance produksi masih perlu divalidasi.",
        },
        {
          name: "Asisten akuntansi AI",
          status: "prototype",
          note: "Terhubung ke konteks workspace dengan validasi deterministik untuk aksi akuntansi yang disimpan.",
        },
        {
          name: "OCR struk",
          status: "prototype",
          note: "Flow ekstraksi tersedia, tetapi akurasi dan failure handling belum tervalidasi untuk produksi.",
        },
        {
          name: "Billing Mayar",
          status: "unvalidated",
          note: "Mayar adalah provider billing yang dikonfigurasi; reliabilitas pembayaran dan webhook end-to-end belum diklaim.",
        },
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
      aiSystem: {
        provider: "Layer LLM melalui OpenRouter, dengan ingestion OCR berstatus prototype untuk membaca struk.",
        pipeline: [
          "Transaksi, invoice, perubahan stok, dan hasil prototype OCR struk masuk ke workspace ledger.",
          "Data transaksi terstruktur divalidasi terhadap aturan chart of accounts sebelum masuk laporan.",
          "Asisten AI menjawab dari konteks workspace dan merangkum kondisi finansial, bukan chatbot bebas tanpa batas.",
          "Laporan, ekspor CSV, dan kartu dashboard dibuat dari catatan akuntansi yang tersimpan.",
        ],
        dataFlow:
          "Supabase/PostgreSQL menyimpan data bisnis terisolasi per tenant; RLS menjaga batas workspace sebelum konteks AI disusun.",
        validation:
          "Validasi double-entry, kategori, dan query berbasis permission menjaga jawaban finansial tetap terikat ke data ledger.",
        failureHandling:
          "Output AI diposisikan sebagai bantuan; aksi akuntansi tetap melewati validasi deterministik sebelum disimpan atau dilaporkan.",
        limitations:
          "Sistem masih pre-launch. Pajak, akurasi OCR, dan compliance lokal masih butuh validasi produksi lebih dalam.",
      },
    },
    proofArtifacts: [
      {
        src: "/assets/case-studies/akun-ai-dashboard.webp",
        alt: "Dashboard Akun.AI dengan saldo kas, pendapatan, pengeluaran, asisten AI, laporan, invoice, inventory, dan integrasi.",
        caption:
          "Dashboard utama dengan KPI finansial, asisten AI, laporan, invoice, inventory, dan kartu integrasi.",
      },
      {
        src: "/assets/case-studies/akun-ai-landing.webp",
        alt: "Landing page Akun.AI dengan positioning akuntansi AI untuk bisnis Indonesia.",
        caption:
          "Landing page publik yang memosisikan Akun.AI sebagai workspace akuntansi yang bisa diajak ngobrol.",
      },
      {
        src: "/assets/case-studies/akun-ai-ledger.webp",
        alt: "Preview ledger Akun.AI dengan grafik kas, asisten AI, dan baris transaksi.",
        caption:
          "Preview ledger: transaksi, saldo, dan ringkasan AI dalam satu permukaan finansial.",
      },
      {
        src: "/assets/case-studies/akun-ai-pricing.webp",
        alt: "Section harga Akun.AI dengan paket Free, Starter, dan Pro.",
        caption:
          "Model harga berbasis limit transaksi, limit chat AI, akses tim, dan kebutuhan inventory.",
      },
    ],
  },
  tokokaret: {
    category: "E-Commerce / Rekomendasi Produk Terarah",
    description:
      "Platform commerce live untuk produk karet dan industri dengan flow konsultasi berbasis gejala yang terarah.",
    problem:
      "Pembeli produk karet dan industri sering butuh arahan teknis, sementara e-commerce biasa tidak cukup pintar untuk memberi rekomendasi berdasarkan gejala dan kebutuhan pemakaian.",
    targetUsers: "Pembeli industri, bengkel, dan bisnis yang membutuhkan produk karet atau industri",
    role: "Pembangun produk dan desainer",
    contribution:
      "Merancang dan membangun landing experience, alur konsultasi, jalur marketplace, dan helper rekomendasi gejala-ke-kategori di sisi client.",
    statusLabel: "Sudah Live",
    outcome:
      `Dibangun untuk Puka Mobil, seller marketplace yang telah melayani ${PORTFOLIO_FACTS.tokokaret.historicalCustomers.toLocaleString("id-ID")}+ pelanggan dan menjual sekitar ${PORTFOLIO_FACTS.tokokaret.historicalMarketplaceItems.toLocaleString("id-ID")} item melalui Shopee dan Tokopedia; konversi yang berasal dari website belum diukur.`,
    detail: {
      overview:
        "TokoKaret.com adalah platform commerce live yang menjembatani katalog produk industri dengan keputusan pembelian yang lebih terarah. Matcher gejala di sisi client memberi arahan awal kategori part karet sebelum konfirmasi manusia melalui WhatsApp; sistem aktif tidak diklaim memakai retrieval atau model AI.",
      mySpecificBuilds: [
        "Membangun storefront Astro live, section product-first, CTA konsultasi, dan buyer journey mobile-first.",
        "Membangun flow intake terstruktur yang memetakan model mobil dan keyword gejala ke arahan kategori produk yang dibatasi.",
        "Menghubungkan helper rekomendasi ke WhatsApp agar kecocokan akhir tetap dikonfirmasi manusia melalui bukti foto.",
      ],
      keyFeatures: [
        "Landing experience berfokus konversi",
        "Helper rekomendasi gejala-ke-kategori berbasis aturan",
        "Integrasi jalur penjualan WhatsApp dan marketplace",
        "Alur konsultasi pelanggan dengan intake terstruktur",
        "Desain responsif untuk pengguna Indonesia yang mobile-first",
      ],
      challenges: [
        "Menerjemahkan spesifikasi teknis produk industri menjadi rekomendasi yang mudah dipahami pelanggan",
        "Membatasi arahan ke kategori yang tersedia tanpa mengklaim kecocokan SKU pasti",
        "Menghubungkan rekomendasi terarah dengan alur penjualan offline",
      ],
      aiSystem: {
        provider: "Pencocokan keyword dan kategori di sisi client; tidak ada backend retrieval atau model aktif yang diklaim.",
        pipeline: [
          "User memasukkan model mobil dan keluhan atau kebutuhan lewat form terstruktur.",
          "Browser mencocokkan input dengan keyword gejala dan kategori yang dibatasi.",
          "Helper memetakan gejala ke kategori produk yang mungkin, bukan mengarang SKU pasti.",
          "Follow-up penjualan memakai hasil arahan plus verifikasi foto untuk finalisasi kecocokan produk.",
        ],
        dataFlow:
          "Input form tetap di flow client-side: model dan keyword gejala mengarahkan saran kategori dan handoff WhatsApp.",
        validation:
          "Helper diposisikan sebagai arahan awal; ukuran dan tipe final tetap dikonfirmasi lewat konsultasi manusia dan bukti foto.",
        failureHandling:
          "Saat tidak ada kecocokan yang dibatasi, interface mendorong user lanjut konsultasi alih-alih memaksakan rekomendasi produk.",
        limitations:
          "Helper keyword merekomendasikan kategori, bukan menjamin kecocokan part. Konfirmasi foto fisik tetap diperlukan dan konversi website belum diukur.",
      },
      results:
        `Storefront ini mendukung Puka Mobil, seller marketplace yang telah melayani ${PORTFOLIO_FACTS.tokokaret.historicalCustomers.toLocaleString("id-ID")}+ pelanggan dan menjual sekitar ${PORTFOLIO_FACTS.tokokaret.historicalMarketplaceItems.toLocaleString("id-ID")} item melalui Shopee dan Tokopedia. Angka tersebut adalah riwayat bisnis, bukan hasil yang diatribusikan ke website.`,
    },
    proofArtifacts: [
      {
        src: "/assets/case-studies/tokokaret-landing.webp",
        alt: "Landing page TokoKaret.com untuk produk karet otomotif dan industri.",
        caption:
          "Hero storefront live: halaman commerce product-first dengan jalur konsultasi WhatsApp.",
      },
      {
        src: "/assets/case-studies/tokokaret-ai-check.webp",
        alt: "Form helper rekomendasi TokoKaret.com untuk input model mobil dan gejala produk.",
        caption:
          "Flow konsultasi terarah: user menjelaskan gejala dan mendapat arahan kategori produk awal.",
      },
      {
        src: "/assets/case-studies/tokokaret-products.webp",
        alt: "Section produk TokoKaret.com yang menampilkan part karet yang sering dicari.",
        caption:
          "Section discovery produk yang menghubungkan label masalah ke kategori katalog spesifik.",
      },
    ],
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
      aiSystem: {
        provider:
          "Pipeline sinyal algoritmik dengan pemrosesan berita/sentimen; tidak terhubung ke eksekusi broker live.",
        pipeline: [
          "Data market publik dan feed berita masuk ke workspace riset.",
          "Rules menilai trend, momentum, liquidity, regime BTC, risk/reward, dan freshness sinyal.",
          "Kartu sinyal menampilkan entry, stop, TP, kriteria invalidasi, dan status lifecycle dry-run.",
          "Worker dry-run melacak posisi paper untuk evaluasi tanpa mengirim order live.",
        ],
        dataFlow:
          "Data market Binance/publik, provider RSS/berita, dan simulator fallback mengisi terminal serta record lifecycle paper.",
        validation:
          "Sinyal memiliki scoring, regime filter, catatan invalidasi, dan label research-only yang eksplisit.",
        failureHandling:
          "Status provider menampilkan feed yang disabled/fallback, dan live order tetap dimatikan by design.",
        limitations:
          "Sistem hanya untuk riset. Tidak ada wallet, broker, exchange key, atau eksekusi finansial live yang terhubung.",
      },
    },
    proofArtifacts: [
      {
        src: "/assets/case-studies/financeos-terminal.webp",
        alt: "Terminal FinanceOS dengan sinyal crypto aktif dan panel detail sinyal.",
        caption:
          "Terminal riset: kartu sinyal aktif, konteks chart live, metrik risiko, dan status dry-run.",
      },
      {
        src: "/assets/case-studies/financeos-signal.webp",
        alt: "Tampilan detail sinyal FinanceOS dengan trend, momentum, liquidity, risk reward, dan aksi dry-run.",
        caption:
          "Detail sinyal: faktor terstruktur, risk/reward, catatan invalidasi, dan aksi dry-run.",
      },
      {
        src: "/assets/case-studies/financeos-worker.webp",
        alt: "Worker dry-run otomatis FinanceOS dan tracking lifecycle paper trade.",
        caption:
          "Worker dry-run otomatis yang melacak paper trade tanpa live order atau exchange key.",
      },
      {
        src: "/assets/case-studies/financeos-news.webp",
        alt: "Market headlines FinanceOS dan panel status provider.",
        caption:
          "News engine dengan status provider, fallback mode, jumlah dedupe, dan tag sentimen headline.",
      },
    ],
  },
  "tailor-cooperative-system": {
    title: "SAKTI — Alokasi Penjahit Berbantuan ML & Sistem Manajemen Koperasi",
    category: "Decision Support Berbantuan ML / Operasi Koperasi",
    description:
      "Platform decision support berbasis data untuk meningkatkan alokasi workload, visibilitas inventori, dan koordinasi operasional koperasi penjahit.",
    problem:
      "Admin membagi order ke jaringan penjahit dengan mengandalkan ingatan, kedekatan personal, dan komunikasi manual sehingga workload tidak merata, inventori sulit dipantau, dan bulk order menambah tekanan operasional.",
    targetUsers: "Admin dan manajer koperasi; mitra penjahit sebagai penerima manfaat utama",
    role: "ML workflow, logika alokasi, full-stack development, visualisasi data, dan presentasi",
    contribution:
      "Menerjemahkan masalah operasional menjadi prototype decision support yang menggabungkan profiling berbantuan ML, logika alokasi adaptif, data operasional, interface Streamlit, dan analitik visual.",
    statusLabel: "Kompetisi - Juara 2",
    outcome:
      "Juara 2 — PCU × SUTD GEO 2026; prototype fungsional dipresentasikan bersama Koperasi Sumber Mulia Barokah sebagai industry partner.",
    githubLabel: "Repo Proyek Utama",
    githubLinks: [
      {
        label: "Repo Proyek Utama",
        url: "https://github.com/ezradesmonds/SAKTIkoperasiapp",
      },
      {
        label: "Repo Komponen ML",
        url: "https://github.com/ezradesmonds/AI_tailor_smart_allocator",
      },
    ],
      detail: {
      overview:
        "SAKTI adalah platform alokasi penjahit berbantuan ML dan manajemen koperasi yang dikembangkan pada GEO 2026, program kolaborasi Petra Christian University dan Singapore University of Technology and Design. Dibuat bersama Koperasi Sumber Mulia Barokah, prototype ini menggabungkan profiling penjahit, rekomendasi kontekstual, pemeriksaan workload aktif, inventori, project tracking, pembelian, monitoring produksi, upah, dan analitik operasional.",
      metrics: [
        { value: "Juara 2", label: "GEO 2026" },
        { value: "100+", label: "Jaringan mitra penjahit" },
        { value: "3", label: "Layer rekomendasi" },
        { value: "6", label: "Mahasiswa multidisiplin" },
      ],
      mySpecificBuilds: [
        "Menyiapkan dan memproses data performa penjahit untuk workflow profiling berbantuan ML.",
        "Mengembangkan logika alokasi adaptif dan workload balancing, lalu mengintegrasikan rekomendasi dengan data project operasional.",
        "Membangun interface prototype dan visualisasi operasional menggunakan Python dan Streamlit.",
        "Menyusun persona, journey map, storyboard, Value Proposition Canvas, dan Business Model Canvas yang membentuk arah produk.",
        "Menerjemahkan logika teknis ke presentasi bisnis dan mempertahankan solusi saat evaluasi final.",
      ],
      productDiscovery: {
        problemStatement:
          "Bagaimana membagi setiap project ke penjahit yang tersedia agar koperasi dapat meningkatkan efisiensi produksi sesuai urgensi dan jumlah order?",
        hypothesis:
          "Jika sistem menggabungkan profil performa historis, konteks order, dan workload aktif, admin dapat beralih dari keputusan berbasis ingatan ke keputusan yang lebih cepat, adil, dan dapat dijelaskan.",
        persona: {
          name: "Pengguna Utama",
          role: "Administrator Operasional Koperasi",
          context:
            "Bertanggung jawab atas order masuk, alokasi penjahit, visibilitas inventori, monitoring produksi, dan koordinasi deadline pada jaringan mitra yang besar.",
          pains: [
            "Distribusi kerja tidak merata dan bottleneck pada penjahit favorit",
            "Sulit mengingat speed, kerapian, dan ketersediaan setiap penjahit",
            "Tidak ada tampilan terintegrasi untuk pekerjaan aktif dan sisa material",
            "Risiko deadline terlewat dan koordinasi manual yang tinggi",
          ],
          goals: [
            "Alokasi yang efisien dan adil",
            "Decision support berbasis data",
            "Visibilitas produksi dan inventori secara real-time",
            "Mengurangi pekerjaan manajerial manual",
          ],
        },
        journey: [
          {
            stage: "Menerima order besar",
            friction: "Admin menerima order volume tinggi tanpa gambaran kapasitas langsung.",
            response: "Mencatat kategori, jumlah, dan deadline sebagai input alokasi terstruktur.",
          },
          {
            stage: "Memeriksa kesiapan material",
            friction: "Sisa kain dilacak manual dan dapat menjadi ghost inventory.",
            response: "Menampilkan stok, pembelian, dan kebutuhan material dalam sistem manajemen yang sama.",
          },
          {
            stage: "Membagi workload",
            friction: "Admin harus mengingat siapa yang cepat, rapi, dekat, dan sedang tersedia.",
            response: "Meranking penjahit lewat profiling, bobot adaptif, aturan logistik, dan status aktif.",
          },
          {
            stage: "Memantau produksi",
            friction: "Pekerjaan aktif dan deadline tersebar di pesan dan catatan manual.",
            response: "Menghubungkan assignment dengan progress, status, dan dashboard operasional.",
          },
          {
            stage: "Menutup dan memakai ulang kapasitas",
            friction: "Pekerjaan selesai dan sisa material sulit direkonsiliasi untuk order berikutnya.",
            response: "Mengembalikan penjahit selesai ke pool tersedia dan memperbarui sisa stok.",
          },
        ],
        valueProposition: {
          customerJobs: ["Mengelola bulk order", "Mengontrol inventori", "Membagi workload", "Memantau progress"],
          pains: ["Ketergantungan pada ingatan", "Assignment tidak merata", "Ghost inventory", "Bottleneck produksi"],
          gains: ["Alokasi adil", "Keputusan lebih cepat", "Kapasitas terlihat", "Otomatisasi manajerial"],
          productsAndServices: ["Smart Tailor Allocation System", "Dashboard koperasi terintegrasi"],
          painRelievers: ["Profiling penjahit berbasis ML", "Pemeriksaan workload aktif", "Catatan inventori dan progress"],
          gainCreators: ["Matching berbasis spesialisasi", "Adaptive scoring", "Operasi berbasis sistem"],
        },
        businessModel: [
          {
            label: "Customer segments",
            items: ["Koperasi penjahit", "Admin dan manajer koperasi", "Mitra penjahit", "Pemesan seragam skala besar"],
          },
          {
            label: "Value propositions",
            items: ["Distribusi kerja adil", "Rekomendasi adaptif terhadap deadline", "Visibilitas produksi dan stok terintegrasi"],
          },
          {
            label: "Key resources",
            items: ["Profil penjahit terkurasi", "Logika alokasi", "Python, Streamlit, SQLite, dan scikit-learn"],
          },
          {
            label: "Key activities",
            items: ["Profiling penjahit", "Assignment algoritmis", "Tracking inventori", "Monitoring produksi dan upah"],
          },
          {
            label: "Partners & channels",
            items: ["Supplier kain", "Komunitas penjahit", "Institusi pemesan bulk order", "Dashboard web di browser kantor"],
          },
          {
            label: "Cost structure",
            items: ["Hosting dan maintenance", "Pembaruan data skill penjahit", "Input data inventori operasional"],
          },
        ],
      },
      featureStatus: [
        {
          name: "Smart profiling penjahit",
          status: "prototype",
          note: "Data speed, kerapian, ketepatan waktu, jarak, dan atribut terkait membentuk cluster operasional.",
        },
        {
          name: "Context-aware allocation scoring",
          status: "prototype",
          note: "Order urgent memberi bobot speed 70%; order relaxed menggeser fokus ke kerapian sebesar 40%.",
        },
        {
          name: "Logistik berbasis jarak",
          status: "prototype",
          note: "Order di bawah 20 pcs memprioritaskan penjahit terdekat, sedangkan order di atas 50 pcs mengizinkan jarak lebih jauh demi efisiensi produksi.",
        },
        {
          name: "Load balancing real-time",
          status: "prototype",
          note: "Penjahit busy tetap terlihat tetapi mendapat penalti ranking besar agar kandidat idle naik lebih dulu.",
        },
        {
          name: "Fallback split order",
          status: "prototype",
          note: "Sistem mensimulasikan pembagian pekerjaan saat satu penjahit tidak aman menanggung seluruh kapasitas.",
        },
      ],
      keyFeatures: [
        "Workflow smart allocation untuk penjahit",
        "Dashboard operasional untuk manajer koperasi",
        "Modul manajemen penjahit, stok, supplier, dan pembelian",
        "Otomatisasi alur kerja operasional koperasi",
        "Artifact user persona, journey, dan value proposition",
      ],
      challenges: [
        "Membersihkan dataset koperasi dan membentuk fitur operasional yang cukup bermakna untuk clustering",
        "Mengintegrasikan output clustering ke workflow alokasi kerja yang praktis",
        "Berkoordinasi dengan anggota tim multidisiplin dari bisnis, arsitektur, dan bisnis internasional",
      ],
      aiSystem: {
        provider:
          "Sistem keputusan tiga layer: profiling penjahit unsupervised, adaptive scoring berbasis rule, dan load balancing berbasis database dalam prototype Streamlit.",
        pipeline: [
          "Layer 1 - Smart profiling: membersihkan data historis dan mengelompokkan penjahit berdasarkan speed, kerapian, ketepatan waktu, jarak, spesialisasi, dan pola performa terkait.",
          "Layer 2 - Adaptive scoring: menerjemahkan kategori, jumlah, dan deadline menjadi bobot yang berubah; pekerjaan urgent menekankan speed, sementara pekerjaan relaxed memberi pengaruh lebih besar pada kerapian.",
          "Layer 2 - Konteks logistik: memprioritaskan penjahit dekat untuk order kecil dan menerima jarak lebih jauh pada order volume besar yang dapat mengonsolidasikan transportasi.",
          "Layer 3 - Load balancing: memeriksa assignment aktif dan memberi busy penalty besar tanpa menyembunyikan kandidat.",
          "Meranking seluruh kandidat, menghitung target output per hari, dan mensimulasikan split order saat kapasitas satu penjahit tidak aman.",
        ],
        dataFlow:
          "Riwayat penjahit menghasilkan profil yang dapat dipakai ulang; order aktif menambahkan konteks urgensi, jumlah, kategori, dan logistik; data assignment aktif kemudian menyesuaikan ranking final di dashboard koperasi.",
        validation:
          "Rekomendasi dicek terhadap deadline math, target produksi harian, kapasitas, status aktif, spesialisasi, jarak, dan sinyal kelayakan berbasis cluster. Daftar ranking tetap terlihat agar admin dapat meninjau alasan, bukan menerima keputusan tersembunyi.",
        failureHandling:
          "Penjahit busy diturunkan prioritasnya alih-alih dihapus, sehingga opsi override tetap ada. Saat satu penjahit tidak cukup, sistem menawarkan custom split order alih-alih memaksa satu assignment.",
        limitations:
          "Prototype kompetisi memakai dataset akademik yang jumlah raw, cleaned, dan model-used row-nya tidak diklaim di sini. Logika alokasi masih butuh feedback deployment nyata sebelum bisa mengklaim akurasi produksi.",
      },
      results:
        "Mendapat Juara 2 di SUTD x Petra Christian University International Hackathon karena menggabungkan kedalaman teknis dengan kegunaan operasional.",
    },
    proofArtifacts: [
      {
        src: "/assets/case-studies/tailor-dashboard.webp",
        alt: "Dashboard manajerial koperasi penjahit dengan metrik profit, pengeluaran, project aktif, penjahit ready, dan stok menipis.",
        caption:
          "Dashboard manajerial: sinyal bisnis, produksi, dan stok dalam satu tampilan operasional.",
      },
      {
        src: "/assets/case-studies/tailor-analytics.webp",
        alt: "Dashboard analitik penjahit dengan total mitra, rata-rata speed, status idle, bar chart, dan distribusi spesialisasi.",
        caption:
          "Analitik performa penjahit untuk memahami kapasitas, speed, status idle, dan komposisi spesialisasi.",
      },
      {
        src: "/assets/case-studies/tailor-data.webp",
        alt: "Tabel manajemen data penjahit dengan jarak, speed, spesialisasi, status, dan kontak.",
        caption:
          "Tabel data operasional yang mendukung keputusan assignment dan workflow manajemen.",
      },
      {
        src: "/assets/case-studies/tailor-allocation.webp",
        alt: "Form AI Smart Allocation yang merekomendasikan penjahit berdasarkan deadline, kategori, dan jumlah order.",
        caption:
          "Flow smart allocation: deadline, kategori, quantity, target speed, dan rekomendasi penjahit.",
      },
      {
        src: "/assets/case-studies/tailor-split-order.webp",
        alt: "Simulasi custom split order penjahit dengan kapasitas, estimasi selesai, dan tabel pembagian tugas.",
        caption:
          "Simulasi split-order fallback ketika satu penjahit tidak aman membawa seluruh beban kerja.",
      },
    ],
  },
  finlend: {
    category: "AI Credit Intelligence / Tugas Akhir AIML",
    description:
      "Sistem simulasi risiko kredit berbasis AI yang menggabungkan model neural network dengan fuzzy logic untuk merekomendasikan keputusan kredit, limit, dan bunga.",
    problem:
      "Evaluasi kredit membutuhkan intake data pemohon yang terstruktur, sinyal risiko yang bisa dijelaskan, dan dukungan keputusan yang menghubungkan output model ke rekomendasi yang mudah dibaca.",
    targetUsers: "Analis kredit, builder fintech, dan evaluator akademik AIML",
    role: "AI dan full-stack developer",
    contribution:
      "Membangun interface Laravel, menghubungkannya ke AI engine FastAPI, merancang alur input 25 fitur, dan membentuk pipeline ML plus fuzzy decision menjadi pengalaman simulasi kredit yang polished.",
    statusLabel: "Tugas Akhir AIML",
    outcome:
      "Menghasilkan flow simulasi kredit end-to-end yang memproses data pemohon, finansial, pinjaman, dan jaminan menjadi rekomendasi risiko, approval, limit, dan bunga.",
    githubLabel: "Repo GitHub",
    detail: {
      overview:
        "FinLend adalah proyek akademik AI credit intelligence yang dibangun dengan interface Laravel dan AI engine FastAPI. Sistem ini mengubah 25 sinyal pemohon menjadi rekomendasi risiko kredit memakai feedforward neural network dan fuzzy logic.",
      keyFeatures: [
        "Flow pengajuan kredit 5 tahap",
        "Input 25 fitur pemohon dan pinjaman",
        "Integrasi AI engine FastAPI",
        "Risk scoring dengan feedforward neural network",
        "Fuzzy logic untuk rekomendasi limit dan bunga",
        "Interface Laravel untuk output disetujui atau ditolak",
      ],
      challenges: [
        "Menjaga struktur input model tetap selaras antara Laravel dan FastAPI",
        "Menyajikan output model sebagai rekomendasi kredit yang terbaca, bukan skor black-box",
        "Menghadapi batasan dataset akademik sambil menjaga demo tetap believable",
      ],
      aiSystem: {
        provider: "AI engine Python FastAPI memakai MLPClassifier plus layer fuzzy logic.",
        pipeline: [
          "User mengisi 25 sinyal pemohon, finansial, pinjaman, dan jaminan lewat form Laravel.",
          "Laravel mengirim payload terstruktur ke endpoint FastAPI /hitung-kredit.",
          "Model neural network memperkirakan risiko gagal bayar dari feature set yang sudah diskalakan.",
          "Fuzzy logic menerjemahkan risiko dan konteks finansial menjadi rekomendasi limit dan bunga.",
          "Laravel menampilkan output keputusan sebagai simulasi approval atau rejection dengan konteks yang mudah dibaca.",
        ],
        dataFlow:
          "Laravel menangani flow web dan mengirim request terstruktur ke FastAPI; service Python mengembalikan output risiko dan fuzzy decision ke halaman hasil.",
        validation:
          "Input dibatasi ke 25 fitur model, lalu diskalakan dan diproses sebelum output rekomendasi.",
        failureHandling:
          "Flow web bergantung pada service FastAPI di port 8000; masalah koneksi diperlakukan sebagai dependency runtime demo, bukan hasil palsu.",
        limitations:
          "Simulasi akademik memakai data loan-default dan asumsi skala USD. Ini bukan sistem approval kredit produksi dan masih butuh validasi fairness, kalibrasi, dan compliance.",
      },
      results:
        "Dibangun sebagai tugas akhir mata kuliah AIML dengan pipeline Laravel-ke-FastAPI yang bekerja dan interface analisis kredit yang polished.",
    },
    proofArtifacts: [
      {
        src: "/assets/case-studies/finlend-landing.webp",
        alt: "Landing page FinLend dengan positioning AI credit intelligence, pipeline ML plus fuzzy, dan flow pengajuan bertahap.",
        caption:
          "Permukaan landing dan workflow: positioning ML + fuzzy decision dengan flow pengajuan kredit 5 tahap.",
      },
      {
        src: "/assets/case-studies/finlend-form.webp",
        alt: "Form profil pemohon FinLend dengan catatan analisis berlapis dan indikator risk model aktif.",
        caption:
          "Form intake pemohon: profil, skor kredit, biro kredit, dan eligibility dikirim ke AI engine.",
      },
      {
        src: "/assets/case-studies/finlend-demo.mp4",
        poster: "/assets/case-studies/finlend-landing.webp",
        kind: "video",
        alt: "Video demo FinLend yang menunjukkan flow analisis kredit.",
        caption:
          "Artifact video demo untuk pengalaman pengajuan dan analisis kredit end-to-end.",
      },
    ],
  },
  "bank-tulang": {
    category: "Client Project / Platform Edukasi Kesehatan",
    description:
      "Prototype promosi kesehatan tulang berbasis web untuk mahasiswa farmasi, dengan modul edukasi, kuis adaptasi OKAT, konsep tracking kalsium/aktivitas, dan simulasi kesiapan interaktif.",
    problem:
      "Client mahasiswa farmasi membutuhkan platform interaktif yang jelas untuk mengomunikasikan rancangan intervensi kesehatan tulang, bukan sekadar tabel atau slide statis.",
    targetUsers: "Mahasiswa farmasi, dosen pembimbing, dan audiens presentasi akademik",
    role: "Developer client project",
    contribution:
      "Membangun microsite interaktif, menyusun delapan modul intervensi, merancang permukaan kuis dan simulasi, serta menerjemahkan evidence akademik menjadi pengalaman web yang siap dipresentasikan.",
    statusLabel: "Client Project",
    outcome:
      "Menghasilkan prototype siap presentasi yang menjelaskan intervensi 8 komponen, kuis adaptasi OKAT 12 item, dan simulasi kesiapan kesehatan dalam format web-native.",
    githubLabel: "Repo GitHub",
    detail: {
      overview:
        "Bank Tulang adalah microsite client untuk mahasiswa farmasi yang perlu mempresentasikan platform intervensi kesehatan tulang. Produk ini membingkai asesmen, skor, tracking, edukasi, target, gamification, dan social challenge dalam prototype web yang jelas.",
      keyFeatures: [
        "Landing page promosi kesehatan tulang",
        "Delapan kartu modul intervensi",
        "Modal kuis adaptasi OKAT 12 item",
        "Simulasi kesiapan dengan parameter yang bisa diubah",
        "Arsitektur konten berbasis evidence",
        "Mode presentasi responsif untuk review akademik",
      ],
      challenges: [
        "Mengubah tabel intervensi akademik menjadi website yang kredibel dan mudah dibaca",
        "Menjaga produk tetap edukatif tanpa memberi kesan diagnosis medis",
        "Menyeimbangkan visual yang energik dengan kejelasan dan aksesibilitas kesehatan",
      ],
      results:
        "Membuat prototype web-native yang membantu audiens memahami struktur intervensi dengan cepat saat presentasi akademik.",
      lessonsLearned: [
        "Client akademik membutuhkan translasi dari evidence dan modul menjadi cerita yang bisa diikuti audiens non-teknis",
        "Produk terkait kesehatan harus hati-hati dalam klaim, label, dan framing diagnosis",
      ],
    },
    proofArtifacts: [
      {
        src: "/assets/case-studies/bank-tulang-landing.webp",
        alt: "Landing page Bank Tulang dengan positioning pemantauan kesehatan tulang dan visual tulang belakang.",
        caption:
          "Landing experience untuk platform promosi kesehatan tulang dan framing intervensi akademik.",
      },
      {
        src: "/assets/case-studies/bank-tulang-quiz.webp",
        alt: "Modal kuis Bank Tulang dengan pertanyaan adaptasi OKAT dan opsi benar, salah, tidak tahu.",
        caption:
          "Interface kuis adaptasi OKAT 12 item dengan konsep interpretasi skor otomatis.",
      },
      {
        src: "/assets/case-studies/bank-tulang-modules.webp",
        alt: "Delapan kartu modul intervensi Bank Tulang untuk kuis, skor, tracking kalsium, catatan aktivitas, edukasi, target, gamification, dan social challenge.",
        caption:
          "Delapan modul intervensi yang diterjemahkan dari rencana akademik menjadi kartu web yang mudah dibaca.",
      },
      {
        src: "/assets/case-studies/bank-tulang-simulation.webp",
        alt: "Simulasi kesiapan Bank Tulang dengan slider jawaban OKAT, kalsium, aktivitas, dan indikator kesiapan.",
        caption:
          "Simulasi interaktif untuk kesiapan pengetahuan, kalsium, dan aktivitas. Edukatif saja, bukan diagnosis medis.",
      },
    ],
  },
  "innofashion-show-8": {
    title: "Platform Event Innofashion Show 8",
    category: "Teknologi Event Full-Stack",
    description:
      `Platform event full-stack untuk ${PORTFOLIO_FACTS.innofashion.competitionRegistrations} registrasi kompetisi, ${PORTFOLIO_FACTS.innofashion.competitionApproved} peserta kompetisi yang disetujui, dan ${PORTFOLIO_FACTS.innofashion.eventParticipants} peserta event.`,
    problem:
      "Event mahasiswa berskala besar butuh sistem registrasi dan administrasi custom yang reliabel, sementara solusi umum tidak selalu bisa diadaptasi cepat.",
    targetUsers: "Peserta event, administrator, dan staf operasional",
    role: "Kepala / Koordinator Divisi IT",
    contribution:
      "Memimpin divisi teknis, merancang arsitektur sistem dan interface produk, mengimplementasikan banyak bagian frontend dan backend, mengoordinasikan kontributor teknis, mengelola deployment, dan menjaga reliabilitas saat event berlangsung.",
    statusLabel: "Terkirim",
    outcome:
      `Mendukung ${PORTFOLIO_FACTS.innofashion.competitionRegistrations} registrasi kompetisi, ${PORTFOLIO_FACTS.innofashion.competitionApproved} peserta kompetisi yang disetujui, dan ${PORTFOLIO_FACTS.innofashion.eventParticipants} peserta event; presensi QR mencatat ${PORTFOLIO_FACTS.innofashion.eventCheckIns.join(", ")} check-in di tiga event.`,
    githubLabel: "Repo Frontend",
    githubLinks: [
      {
        label: "Repo Frontend",
        url: "https://github.com/innofashion-8/frontend",
      },
      {
        label: "Repo Backend",
        url: "https://github.com/innofashion-8/backend",
      },
    ],
    detail: {
      overview:
        "Platform manajemen event custom untuk Innofashion Show 8, event besar yang dijalankan mahasiswa. Sistem ini menangani registrasi peserta, ticketing berbasis QR, dashboard admin, dan operasi event real-time.",
      mySpecificBuilds: [
        "Memimpin divisi IT dan mengoordinasikan pengiriman teknis untuk registrasi, dashboard, validasi, dan workflow hari-H.",
        "Membangun dan mengintegrasikan registrasi peserta, flow kompetisi/event, ticketing QR, statistik admin, dan surface validasi.",
        "Mengelola deployment dan dukungan hari-H untuk workflow kompetisi, registrasi, validasi, dan presensi QR.",
      ],
      metrics: [
        { value: String(PORTFOLIO_FACTS.innofashion.competitionRegistrations), label: "Registrasi kompetisi" },
        { value: String(PORTFOLIO_FACTS.innofashion.competitionApproved), label: "Peserta kompetisi disetujui" },
        { value: String(PORTFOLIO_FACTS.innofashion.eventParticipants), label: "Peserta event" },
        {
          value: PORTFOLIO_FACTS.innofashion.eventCheckIns.join(" / "),
          label: "Check-in QR per event",
          context: "Catatan presensi dari tiga event; bukan total orang unik.",
        },
      ],
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
        `Platform mencatat ${PORTFOLIO_FACTS.innofashion.competitionRegistrations} registrasi kompetisi, ${PORTFOLIO_FACTS.innofashion.competitionApproved} approval, dan ${PORTFOLIO_FACTS.innofashion.eventParticipants} peserta event. Log presensi QR mencatat ${PORTFOLIO_FACTS.innofashion.eventCheckIns.join(", ")} check-in di tiga event.`,
    },
    proofArtifacts: [
      {
        src: "/assets/case-studies/innofashion-dashboard.webp",
        alt: "Dashboard peserta Innofashion dengan status registrasi, upload submission, join WhatsApp, dan badge verified.",
        caption:
          "Dashboard peserta untuk status registrasi, upload submission, koordinasi WhatsApp, dan verifikasi.",
      },
      {
        src: "/assets/case-studies/innofashion-admin.webp",
        alt: "Dashboard admin Innofashion dengan statistik kompetisi dan event.",
        caption:
          "Dashboard admin yang menampilkan metrik validasi peserta dan statistik event.",
      },
      {
        src: "/assets/case-studies/innofashion-landing.webp",
        alt: "Landing page Innofashion Show 8 dengan call to action register now.",
        caption:
          "Landing page publik untuk discovery event, registrasi, dan onboarding peserta.",
      },
    ],
  },
  servisin: {
    category: "Marketplace Jasa / Aplikasi Mobile / Tugas Akhir Technopreneur",
    description:
      "MVP marketplace mobile yang menghubungkan pelanggan dengan layanan perbaikan peralatan rumah. Dibangun sebagai tugas akhir mata kuliah Technopreneur.",
    problem:
      "Pelanggan sulit menemukan teknisi perbaikan peralatan rumah yang reliabel, sementara teknisi kekurangan kanal digital untuk menjangkau klien baru.",
    targetUsers: "Pemilik rumah yang butuh perbaikan alat dan teknisi layanan",
    role: "Full-Stack Developer Berfokus Backend, Product Designer & Business Architect",
    contribution:
      "Mengerjakan penuh backend Laravel, berkontribusi pada frontend React Native, serta bersama kelompok menyusun desain produk dan bisnis, termasuk user persona, customer journey, analisis kompetitor, prototype Figma, Business Model Canvas, model finansial, dan validasi IRR.",
    githubLabel: "Repo Frontend",
    githubLinks: [
      {
        label: "Repo Frontend",
        url: "https://github.com/ezradesmonds/servisin-front",
      },
      {
        label: "Repo Backend",
        url: "https://github.com/ezradesmonds/servisin-backend",
      },
    ],
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
    proofArtifacts: [
      {
        src: "/assets/case-studies/servisin-home.webp",
        alt: "Home screen mobile Servisin dengan search, kategori layanan, recent service, dan bottom navigation.",
        caption:
          "Flow home pelanggan dengan search, kategori layanan, recent service, dan navigasi booking.",
      },
      {
        src: "/assets/case-studies/servisin-signup.webp",
        alt: "Screen sign-up mobile Servisin dengan Google sign-in dan akses mode teknisi.",
        caption: "Entry autentikasi untuk pelanggan dan teknisi.",
      },
      {
        src: "/assets/case-studies/servisin-detail.webp",
        alt: "Screen detail layanan Servisin dengan portfolio dan recent reviews.",
        caption: "Permukaan detail teknisi/layanan dengan bukti portfolio dan review.",
      },
      {
        src: "/assets/case-studies/servisin-transaction.webp",
        alt: "Screen transaction detail Servisin dengan service completed dan kartu teknisi.",
        caption:
          "Flow detail transaksi dengan service completion, protection card, dan aksi teknisi.",
      },
      {
        src: "/assets/case-studies/servisin-subscription.webp",
        alt: "Screen subscription Servisin dengan silver plan aktif dan sisa manfaat.",
        caption:
          "Screen model subscription untuk manfaat layanan berulang dan upgrade plan.",
      },
    ],
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
    detail: {
      overview:
        "Implementasi Odoo rental-commerce untuk bisnis gaun pengantin. Fokusnya adalah mengubah inventori produk menjadi storefront rental yang bisa dijelajahi pelanggan, lengkap dengan booking dan dukungan back-office inventory.",
      keyFeatures: [
        "Storefront e-commerce Odoo",
        "Katalog produk rental",
        "Flow booking rentang tanggal",
        "Status publikasi inventori",
        "Halaman detail produk untuk pelanggan",
      ],
      challenges: [
        "Mengadaptasi setup commerce umum Odoo menjadi workflow rental",
        "Membuat ketersediaan dan booking mudah dipahami pelanggan",
      ],
    },
    proofArtifacts: [
      {
        src: "/assets/case-studies/wedding-rental-landing.webp",
        alt: "Landing page storefront Odoo rental gaun pengantin.",
        caption:
          "Storefront publik yang dikonfigurasi untuk discovery gaun, browsing produk, dan appointment scheduling.",
      },
      {
        src: "/assets/case-studies/wedding-rental-booking.webp",
        alt: "Halaman produk rental gaun pengantin dengan kalender booking rentang tanggal.",
        caption:
          "Flow booking rental dengan pilihan rentang tanggal dan kalender ketersediaan di halaman detail produk.",
      },
      {
        src: "/assets/case-studies/wedding-rental-products.webp",
        alt: "Daftar produk backend Odoo untuk inventori rental gaun pengantin.",
        caption:
          "Tampilan back-office inventory untuk mengelola item rental yang dipublikasikan dan status stok.",
      },
    ],
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
    githubLabel: "Repo GitHub",
    detail: {
      overview:
        "Game tower defense Java/LibGDX yang dibangun untuk tugas akhir pemrograman berorientasi objek. Proyek ini menunjukkan manajemen state game, perilaku entity, dan desain class reusable melalui gameplay tower-defense yang bisa dimainkan.",
      keyFeatures: [
        "Path musuh dan progresi wave",
        "Penempatan tower dan logika serangan",
        "Perilaku projectile dan collision",
        "State money, score, health, dan sisa musuh",
        "Kontrol pause, speed, reset, dan upgrade",
      ],
      challenges: [
        "Menjaga entity game tetap modular untuk evaluasi OOP",
        "Mengelola update state real-time antara musuh, tower, projectile, dan HUD",
      ],
    },
    proofArtifacts: [
      {
        src: "/assets/case-studies/tower-defense-wave.webp",
        alt: "Screen countdown wave game tower defense.",
        caption:
          "Screen awal wave yang menampilkan map, HUD, health, money, dan timing wave berikutnya.",
      },
      {
        src: "/assets/case-studies/tower-defense-gameplay.webp",
        alt: "Gameplay tower defense dengan tower menyerang musuh di jalur.",
        caption:
          "Gameplay loop dengan penempatan tower, serangan projectile, score, money, health, dan jumlah musuh tersisa.",
      },
      {
        src: "/assets/case-studies/tower-defense-map.webp",
        alt: "Map game tower defense dengan kontrol UI dan pilihan pembelian tower.",
        caption:
          "Permukaan map dan HUD untuk membeli tower, pause, speed up, reset, dan upgrade atribut.",
      },
    ],
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
    githubLabel: "Repo GitHub",
    detail: {
      overview:
        "Sistem penerimaan siswa full-stack untuk tugas akhir Teknologi Web. Sistem mencakup landing page PPDB, login, registrasi pendaftar, dan upload dokumen.",
      keyFeatures: [
        "Landing page penerimaan siswa",
        "Countdown dan CTA pendaftaran",
        "Flow login pendaftar",
        "Form data siswa dan orang tua",
        "Pilihan akademik dan upload dokumen",
      ],
      challenges: [
        "Menyusun form pendaftaran panjang agar tetap rapi",
        "Memisahkan halaman informasi publik dari workflow pendaftar yang login",
      ],
    },
    proofArtifacts: [
      {
        src: "/assets/case-studies/ppdb-landing.webp",
        alt: "Landing page PPDB sekolah dengan countdown dan call to action pendaftaran.",
        caption:
          "Landing page penerimaan siswa dengan countdown, CTA utama pendaftaran, dan navigasi informasi.",
      },
      {
        src: "/assets/case-studies/ppdb-login.webp",
        alt: "Halaman login PPDB sekolah.",
        caption:
          "Permukaan login untuk akun pendaftar sebelum masuk ke workflow registrasi.",
      },
      {
        src: "/assets/case-studies/ppdb-registration.webp",
        alt: "Form pendaftaran PPDB dengan data siswa, orang tua, pilihan akademik, dan upload dokumen.",
        caption:
          "Form registrasi untuk data pendaftar, detail orang tua, pilihan akademik, dan upload dokumen.",
      },
    ],
  },
  "finance-tracker": {
    title: "Pelacak Keuangan",
    category: "Laravel Full-Stack / Tugas Akhir Deployment Web Framework",
    description:
      "Aplikasi Laravel untuk tracking dan manajemen keuangan pribadi yang dibangun dengan praktik deployment modern.",
    problem: "Pengguna individu butuh cara sederhana untuk mencatat dan memahami arus keuangan pribadi.",
    targetUsers: "Pengguna individu yang mengelola keuangan pribadi",
    role: "Developer",
    contribution:
      "Merancang dan membangun aplikasi finance tracker full-stack berbasis Laravel, termasuk pipeline deployment, desain database, Blade views, dan frontend responsif.",
    statusLabel: "Tugas Akhir Akademik",
    githubLabel: "Repo GitHub",
    detail: {
      overview:
        "Aplikasi web keuangan pribadi yang dibangun sebagai tugas akhir Web Framework Deployment. Sistem ini memusatkan budget, expense, income, rekening, subscription, dan tanggal jatuh tempo.",
      keyFeatures: [
        "Ringkasan budget dan pengeluaran",
        "Form pemasukan dan pengeluaran",
        "Kartu rekening bergaya connected bank",
        "Tracking subscription",
        "Kalender jatuh tempo",
        "Dashboard keuangan responsif",
      ],
      challenges: [
        "Merancang beberapa mode keuangan tanpa membuat produk terasa terpecah",
        "Menjaga form, chart, dan kalender tetap terbaca di berbagai ukuran layar",
      ],
    },
    proofArtifacts: [
      {
        src: "/assets/case-studies/finance-tracker-landing.webp",
        alt: "Landing page Finance Tracker dengan preview budget, transaksi, subscription, dan dashboard.",
        caption:
          "Landing page publik yang membingkai produk di sekitar budget, transaksi, subscription, dan dashboard terpadu.",
      },
      {
        src: "/assets/case-studies/finance-tracker-dashboard.webp",
        alt: "Dashboard Finance Tracker dengan budget, pengeluaran, subscription, kalender jatuh tempo, dan tagihan berikutnya.",
        caption:
          "Overview dashboard dengan budget bulanan, progres pengeluaran, subscription aktif, kalender jatuh tempo, dan tagihan berikutnya.",
      },
      {
        src: "/assets/case-studies/finance-tracker-entry.webp",
        alt: "Screen input pengeluaran dan pemasukan Finance Tracker dengan kartu bank terhubung.",
        caption:
          "Permukaan tracking untuk kartu bank, input pengeluaran, input pemasukan, sumber dana, dan kategori.",
      },
      {
        src: "/assets/case-studies/finance-tracker-subscriptions.webp",
        alt: "Halaman manajemen subscription Finance Tracker.",
        caption:
          "Halaman manajemen subscription dengan pembayaran recurring aktif dan rekomendasi quick-add.",
      },
      {
        src: "/assets/case-studies/finance-tracker-calendar.webp",
        alt: "Kalender jatuh tempo Finance Tracker dengan tanggal pembayaran subscription.",
        caption:
          "Tampilan kalender untuk memantau jatuh tempo tagihan recurring serta item upcoming/overdue.",
      },
    ],
  },
};

const experienceIdLocalesByKey: Record<string, Partial<Experience>> = {
  "Equipment Coordinator - AI & Machine Learning Academic Event::Equipment Coordinator": {
    organization: "Academic Event AI & Machine Learning",
    role: "Koordinator Perlengkapan",
    description:
      "Acara akademik AI dan Machine Learning yang diselenggarakan Departemen Informatika, menghadirkan dosen tamu dari Jepang dan diikuti 200+ mahasiswa Informatika dari seluruh angkatan.",
    highlights: [
      "Memimpin perencanaan dan koordinasi perlengkapan serta logistik venue untuk acara",
      "Berkoordinasi dengan panitia untuk memastikan sesi teknis dan presentasi berjalan lancar",
      "Mendukung keberhasilan acara yang dihadiri 200+ mahasiswa dan dosen tamu internasional",
    ],
    skills: ["Operasi Event", "Manajemen Logistik", "Koordinasi Tim"],
  },
  "Petra Fun Run x Royal Residence::Coordinator of Equipment Division": {
    organization: "Petra Fun Run x Royal Residence",
    role: "Koordinator Divisi Perlengkapan",
    description:
      "Event lari komunitas berskala besar yang diselenggarakan Petra Christian University bersama Royal Residence, dihadiri 500-1.000+ peserta termasuk Wali Kota Surabaya, Presiden Direktur Royal Residence, dan Rektor Petra Christian University.",
    highlights: [
      "Memimpin Divisi Perlengkapan dalam perencanaan dan koordinasi logistik operasional acara",
      "Mengelola persiapan perlengkapan, distribusi, dan setup venue bersama panitia lintas divisi",
      "Membantu memastikan kelancaran event publik berskala besar yang melibatkan pejabat pemerintah, pimpinan universitas, dan peserta komunitas",
    ],
    skills: ["Leadership", "Logistik Event", "Manajemen Operasi"],
  },
  "Welcome Grateful Generation 2026::Member of IT Division": {
    organization: "Welcome Grateful Generation 2026",
    role: "Anggota Divisi IT",
    description:
      "Program orientasi untuk mahasiswa baru Informatika di Petra Christian University.",
    highlights: [
      "Mengembangkan platform rekrutmen online yang digunakan 100+ calon panitia selama proses rekrutmen tim penyelenggara",
      "Membangun dashboard administratif untuk manajemen panitia dan operasi rekrutmen",
      "Mengembangkan website landing resmi berisi informasi dan resource onboarding untuk 1.000+ mahasiswa baru",
    ],
    skills: ["Web Development", "Laravel", "Full-Stack Development", "Manajemen Database"],
  },
  "Innofashion Show 8::Head / Coordinator of IT Division": {
    role: "Kepala / Koordinator Divisi IT",
    period: "November 2025 - Sekarang",
    description:
      "Memimpin perencanaan teknis, arsitektur, development, dan deployment platform event full-stack.",
    highlights: [
      "Berkembang dari Web Developer Innofashion Show 7 (2024–2025), ketika saya membangun flow showcase dan voting karya angkatan serta mengintegrasikan API GET/POST milik tim",
      "Memimpin perencanaan teknis, arsitektur, desain interface, development, deployment, dan reliabilitas saat event",
      "Mengoordinasikan kontributor teknis dan divisi event non-teknis",
      "Mengimplementasikan banyak bagian frontend dan backend",
      "Mengelola operasi teknis on-site saat event berlangsung",
    ],
    skills: ["Leadership Teknis", "Full-Stack Development", "Teknologi Event", "Deployment"],
  },
  "Investalk Talkshow::Event Chair": {
    role: "Ketua Event",
    period: "Desember 2025 - Mei 2026",
    description:
      "Memimpin perencanaan dan eksekusi talkshow edukasi finansial.",
    highlights: [
      "Memimpin perencanaan dan eksekusi talkshow edukasi finansial",
      "Mengoordinasikan tim, operasi event, evaluasi, dan pengalaman peserta",
      "Mengelola budgeting dan alokasi resource",
    ],
    skills: ["Leadership Event", "Budgeting", "Edukasi Finansial", "Operasi Tim"],
  },
  "DigiComp 2026 UI/UX Competition::Secretary and Treasurer": {
    role: "Sekretaris dan Bendahara",
    description:
      "Mengelola budgeting, operasi finansial, dan dokumentasi administratif untuk kompetisi desain UI/UX.",
    highlights: [
      "Mengelola budgeting, operasi finansial, tracking pengeluaran, dan laporan keuangan",
      "Menyiapkan dokumen administratif, surat izin, dan korespondensi resmi",
      "Mendukung logistik event dan koordinasi lintas tim",
    ],
    skills: ["Budgeting", "Operasi Finansial", "Administrasi", "Koordinasi Lintas Tim"],
  },
  "HIMAINFRA::Organizational Member": {
    role: "Anggota Organisasi",
    period: "2024 - Sekarang",
    description:
      "Anggota aktif himpunan mahasiswa Informatika di Universitas Kristen Petra.",
    highlights: [
      "Berkontribusi dalam aktivitas organisasi dan event",
      "Berkolaborasi dengan mahasiswa lain dalam inisiatif teknis dan komunitas",
    ],
    skills: ["Organisasi Mahasiswa", "Inisiatif Komunitas", "Kolaborasi"],
  },
};

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
      "Meraih Harapan 2 dalam kompetisi rally berbasis logika yang memadukan permainan, soal pemecahan masalah, dan babak cerdas cermat.",
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
    proofArtifacts: localized.proofArtifacts ?? project.proofArtifacts,
  };
}

export function localizeProjects(projects: Project[], lang: Lang): Project[] {
  return projects.map((project) => localizeProject(project, lang));
}

export function localizeExperiences(experiences: Experience[], lang: Lang): Experience[] {
  if (lang !== "id") return experiences;

  return experiences.map((experience) => {
    const localized =
      experienceIdLocalesByKey[`${experience.organization}::${experience.role}`] ??
      experienceIdLocalesByKey[experience.organization];

    if (!localized) return experience;

    return {
      ...experience,
      ...localized,
      highlights: localized.highlights ?? experience.highlights,
      skills: localized.skills ?? experience.skills,
    };
  });
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
