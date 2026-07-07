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
      aiSystem: {
        provider: "Layer LLM melalui OpenRouter, dengan rencana OCR untuk membaca struk.",
        pipeline: [
          "Transaksi, invoice, perubahan stok, dan hasil OCR struk masuk ke workspace ledger.",
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
      aiSystem: {
        provider: "Google Gemini untuk rekomendasi dari gejala ke kategori produk.",
        pipeline: [
          "User memasukkan model mobil dan keluhan atau kebutuhan lewat form terstruktur.",
          "Prompt membatasi Gemini untuk memetakan gejala ke kategori produk yang mungkin, bukan mengarang SKU pasti.",
          "Jawaban menjadi arahan awal yang dilanjutkan ke konsultasi WhatsApp.",
          "Follow-up penjualan memakai hasil AI plus verifikasi foto untuk finalisasi kecocokan produk.",
        ],
        dataFlow:
          "Input form dibuat ringan: model, gejala, dan hasil kategori dipakai untuk mengarahkan handoff ke WhatsApp.",
        validation:
          "AI sengaja diposisikan sebagai arahan awal; ukuran dan tipe final tetap dikonfirmasi lewat konsultasi manusia dan bukti foto.",
        failureHandling:
          "Saat ketidakpastian tinggi, interface mendorong user lanjut konsultasi alih-alih memaksakan rekomendasi produk.",
        limitations:
          "Flow AI merekomendasikan kategori, bukan menjamin kecocokan part. Konfirmasi foto fisik tetap diperlukan.",
      },
      results:
        "Platform ini menjadi storefront digital untuk bisnis dengan 4.000+ pelanggan dan mendukung discovery produk dari katalog 50.000+ item.",
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
        alt: "Form asisten AI TokoKaret.com untuk input model mobil dan gejala produk.",
        caption:
          "Flow konsultasi AI: user menjelaskan gejala dan mendapat arahan kategori produk awal.",
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
      aiSystem: {
        provider:
          "Prediksi machine learning dan allocation layer berbasis rule di atas data operasional koperasi.",
        pipeline: [
          "Data penjahit menyimpan speed, status, jarak, spesialisasi, dan kapasitas tersedia.",
          "Input order mendefinisikan kategori, jumlah pcs, dan tekanan deadline.",
          "Layer alokasi menghitung kebutuhan produksi harian dan meranking penjahit yang feasible.",
          "Jika kapasitas satu penjahit tidak aman, sistem mensimulasikan opsi split order.",
        ],
        dataFlow:
          "Tabel operasional mengisi dashboard, manajemen penjahit, dan rekomendasi alokasi di sistem koperasi.",
        validation:
          "Rekomendasi dicek terhadap deadline math, kapasitas, status saat ini, spesialisasi, dan jarak.",
        failureHandling:
          "Saat satu penjahit tidak cukup, sistem menawarkan custom split order alih-alih memaksa satu assignment.",
        limitations:
          "Prototype kompetisi dengan data operasional terbatas; confidence model perlu data deployment nyata sebelum produksi.",
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
    category: "Full-Stack / Tugas Akhir Deployment Web Framework",
    description:
      "Aplikasi web untuk tracking dan manajemen keuangan pribadi yang dibangun dengan praktik deployment modern.",
    problem: "Pengguna individu butuh cara sederhana untuk mencatat dan memahami arus keuangan pribadi.",
    targetUsers: "Pengguna individu yang mengelola keuangan pribadi",
    role: "Developer",
    contribution:
      "Merancang dan membangun aplikasi finance tracker full-stack, termasuk pipeline deployment, desain database, dan frontend responsif.",
    statusLabel: "Tugas Akhir Akademik",
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
    period: "2024 - 2025",
    description:
      "Memimpin perencanaan teknis, arsitektur, development, dan deployment platform event full-stack.",
    highlights: [
      "Memimpin perencanaan teknis, arsitektur, desain interface, development, deployment, dan reliabilitas saat event",
      "Mengoordinasikan kontributor teknis dan divisi event non-teknis",
      "Mengimplementasikan banyak bagian frontend dan backend",
      "Mengelola operasi teknis on-site saat event berlangsung",
    ],
    skills: ["Leadership Teknis", "Full-Stack Development", "Teknologi Event", "Deployment"],
  },
  "Investalk Talkshow::Event Chair": {
    role: "Ketua Event",
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
