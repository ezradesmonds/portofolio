import type { Project } from "../types";

export const beresEvent: Project = {
  "slug": "beresevent",
  "title": "BeresEvent",
  "category": "AI Workflow / Event Data Review",
  "description": "A Langflow prototype that checks registration and payment CSVs, traces discrepancies to source rows, and prepares neutral clarification drafts for event organizers.",
  "problem": "Before event day, organizers need to reconcile separate registration and payment records without treating missing or ambiguous data as proof of non-payment. The frequency and user impact of this problem still need field validation.",
  "targetUsers": "Campus event registration coordinators and treasurers",
  "role": "Solo builder",
  "contribution": "Defined the review workflow, built the Python audit component and Langflow integration, tested deterministic rules, and prepared synthetic fixtures, documentation and the hackathon submission.",
  "technologies": [
    "Langflow",
    "Python",
    "Google Gemini",
    "CSV",
    "unittest"
  ],
  "status": "competition",
  "statusLabel": "IBM SkillsBuild National Hackathon 2026 × Hacktiv8 · Submitted prototype",
  "outcome": "Submitted to IBM SkillsBuild National Hackathon 2026 × Hacktiv8. One synthetic live baseline returned five review cases; the AI draft preserved all case IDs, participant IDs, codes and evidence. Seven local unit tests passed. Competition results and real-user impact are not claimed.",
  "screenshot": "/assets/case-studies/beresevent-workflow.png",
  "proofStatus": "available",
  "proofArtifacts": [
    {
      "src": "/assets/case-studies/beresevent-workflow.png",
      "alt": "BeresEvent final Langflow workflow with CSV readers, audit and language model.",
      "caption": "Actual final workflow: deterministic audit and AI clarification drafts take separate output paths."
    },
    {
      "src": "/assets/case-studies/beresevent-audit.png",
      "alt": "BeresEvent JSON audit with five cases and row evidence from synthetic CSV inputs.",
      "caption": "Synthetic baseline: six registration rows, six payment rows and five review cases."
    },
    {
      "src": "/assets/case-studies/beresevent-clarification.png",
      "alt": "AI summary preserving five case IDs, participant IDs, finding codes and row evidence.",
      "caption": "AI explanation preserves the baseline cases and marks all communication as drafts for human review."
    }
  ],
  "githubLinks": [
    {
      "url": "/assets/documents/beresevent-documentation.pdf",
      "label": "Project documentation (PDF)"
    }
  ],
  "featured": false,
  "sortOrder": 13,
  "detail": {
    "overview": "BeresEvent is a registration and payment review prototype submitted to IBM SkillsBuild National Hackathon 2026 × Hacktiv8. It combines deterministic discrepancy checks with SOP-grounded AI clarification drafts. The published evidence uses synthetic data; a working demo is separate from validated user benefit.",
    "mySpecificBuilds": [
      "Built CSV schema, ID, reference and integer-rupiah validation in a custom Python component.",
      "Implemented discrepancy rules and versioned input price checks, case IDs, source-row evidence and a snapshot hash.",
      "Connected two CSV readers, chat input, the audit component, a Google language model and two outputs in Langflow."
    ],
    "keyFeatures": [
      "Registration and payment CSV input validation",
      "Duplicate registration, repeated payment and reference checks",
      "Unmatched IDs, missing payment rows and amount mismatches",
      "Versioned price-table checks and unknown ticket-category review",
      "Case IDs, row evidence and deterministic JSON output",
      "SOP-based explanations and neutral clarification drafts"
    ],
    "constraints": "Prototype limited to 500 records per CSV. Price inputs are not independently verified official policies. No bank verification, automatic participant decisions, refunds or message sending.",
    "productStrategy": "Use code for factual checks and a model for language. Keep ambiguous IDs unresolved until a person reviews them. The goal is a traceable review packet; improved review time remains a hypothesis.",
    "userFlow": "Upload registration and payment CSVs → supply versioned prices and SOP → request an audit → compare deterministic JSON with AI drafts → manually review and decide the next action.",
    "systemArchitecture": "Seven nodes and six edges: two Read File nodes and Chat Input feed BeresEvent Audit; the audit report goes directly to Chat Output; a separate prompt feeds Language Model and the clarification Chat Output. Prices and SOP are text inputs to the audit component.",
    "results": "The final synthetic baseline had six registration rows and six payment rows, five findings and five affected participant IDs. AI output retained CASE-001 through CASE-005 with matching codes and row evidence. This is one observed baseline, not a general accuracy or time-saving benchmark.",
    "metrics": [
      {
        "value": "5",
        "label": "Baseline review cases",
        "context": "One synthetic dataset with 6 registration and 6 payment rows."
      },
      {
        "value": "7",
        "label": "Local unit tests passed",
        "context": "Code-level validation; not seven live Langflow runs."
      }
    ],
    "featureStatus": [
      {
        "name": "Deterministic audit and evidence",
        "status": "working",
        "note": "Final baseline demonstrated in Langflow; local tests cover input validation and audit rules."
      },
      {
        "name": "AI clarification drafts",
        "status": "prototype",
        "note": "Baseline case identifiers and evidence preserved; every draft still needs review."
      },
      {
        "name": "Real-user impact",
        "status": "unvalidated",
        "note": "No user pilot, measured time savings or paying customers claimed."
      }
    ],
    "aiSystem": {
      "provider": "Google Gemini via Langflow; the final workflow screenshot records the selected model.",
      "pipeline": [
        "Read and validate CSV snapshots and input price rules.",
        "Produce factual review cases with source evidence in Python.",
        "Supply cases, registration notes and SOP as context to the language model.",
        "Display JSON and AI drafts separately for human review."
      ],
      "dataFlow": "Registration notes, findings and SOP enter the model prompt. Published fixtures and screenshots are synthetic; uploaded files and Playground history can persist locally.",
      "validation": "Strict CSV headers, required identifiers, integer-rupiah amounts, unique price categories and version labels. Audit code determines findings; the reviewer compares AI output against JSON.",
      "failureHandling": "Malformed inputs stop the workflow with an error. Ambiguous matches remain unresolved; AI drafts never change source data or send messages.",
      "limitations": "No automatic draft verifier, review-decision audit trail, production access controls or scheduled deletion. Prompt instructions alone do not guarantee resistance to all model errors."
    },
    "lessonsLearned": [
      "Missing snapshot data is not proof of non-payment.",
      "Case count and affected participant count describe different things.",
      "A correct demo does not establish demand, time savings or production readiness."
    ],
    "relatedProjects": [
      "innofashion-show-8",
      "rekapflow",
      "akun-ai"
    ]
  }
};

export const beresEventId: Project = {
  "slug": "beresevent",
  "title": "BeresEvent",
  "category": "Workflow AI / Review Data Acara",
  "description": "Prototipe Langflow untuk memeriksa CSV registrasi dan pembayaran, menelusuri ketidaksesuaian ke bukti baris, dan menyusun draft klarifikasi netral bagi panitia.",
  "problem": "Sebelum hari H, panitia perlu mencocokkan rekap registrasi dan pembayaran tanpa menganggap data hilang atau ambigu sebagai bukti belum membayar. Frekuensi dan dampak masalah ini masih perlu divalidasi di lapangan.",
  "targetUsers": "Koordinator registrasi dan bendahara acara kampus",
  "role": "Pembangun proyek solo",
  "contribution": "Merancang alur review, membangun komponen audit Python dan integrasi Langflow, menguji aturan deterministik, serta menyiapkan fixture sintetis, dokumentasi dan submission hackathon.",
  "technologies": [
    "Langflow",
    "Python",
    "Google Gemini",
    "CSV",
    "unittest"
  ],
  "status": "competition",
  "statusLabel": "IBM SkillsBuild National Hackathon 2026 × Hacktiv8 · Prototipe dikumpulkan",
  "outcome": "Disubmit ke IBM SkillsBuild National Hackathon 2026 × Hacktiv8. Satu baseline sintetis live menghasilkan lima kasus; draft AI mempertahankan seluruh ID kasus, ID peserta, kode dan bukti. Tujuh unit test lokal lolos. Hasil lomba dan dampak pengguna nyata belum diklaim.",
  "screenshot": "/assets/case-studies/beresevent-workflow.png",
  "proofStatus": "available",
  "proofArtifacts": [
    {
      "src": "/assets/case-studies/beresevent-workflow.png",
      "alt": "Workflow final BeresEvent di Langflow dengan pembaca CSV, audit dan model bahasa.",
      "caption": "Workflow aktual: audit deterministik dan draft klarifikasi AI mempunyai jalur output terpisah."
    },
    {
      "src": "/assets/case-studies/beresevent-audit.png",
      "alt": "Audit JSON BeresEvent dengan lima kasus serta bukti baris dari input CSV sintetis.",
      "caption": "Baseline sintetis: enam baris registrasi, enam baris pembayaran dan lima kasus review."
    },
    {
      "src": "/assets/case-studies/beresevent-clarification.png",
      "alt": "Ringkasan AI mempertahankan lima ID kasus, ID peserta, kode dan bukti baris.",
      "caption": "Penjelasan AI mempertahankan kasus baseline dan menandai komunikasi sebagai draft untuk review manusia."
    }
  ],
  "githubLinks": [
    {
      "url": "/assets/documents/beresevent-documentation.pdf",
      "label": "Dokumentasi proyek (PDF)"
    }
  ],
  "featured": false,
  "sortOrder": 13,
  "detail": {
    "overview": "BeresEvent adalah prototipe submission IBM SkillsBuild National Hackathon 2026 × Hacktiv8 yang sudah selesai untuk review snapshot registrasi dan pembayaran. Pemeriksaan ketidaksesuaian deterministik dipadukan dengan draft klarifikasi AI berdasarkan SOP. Bukti publik memakai data sintetis; demo yang berjalan berbeda dari manfaat pengguna yang tervalidasi.",
    "mySpecificBuilds": [
      "Membangun validasi schema CSV, ID, referensi dan nominal rupiah integer dalam komponen Python.",
      "Mengimplementasikan aturan audit, pemeriksaan harga input berversi, ID kasus, bukti baris dan hash snapshot.",
      "Menghubungkan dua pembaca CSV, Chat Input, komponen audit, model Google dan dua output di Langflow."
    ],
    "keyFeatures": [
      "Validasi input CSV registrasi dan pembayaran",
      "Deteksi registrasi, pembayaran dan referensi berulang",
      "Review ID tidak cocok, baris pembayaran hilang dan nominal berbeda",
      "Pemeriksaan harga berversi dan kategori tiket tidak dikenal",
      "ID kasus, bukti baris dan laporan JSON deterministik",
      "Penjelasan berbasis SOP dan draft klarifikasi netral"
    ],
    "constraints": "Maksimal 500 record per CSV. Harga input bukan kebijakan resmi yang diverifikasi sistem. Tidak ada verifikasi bank, keputusan peserta, refund atau pengiriman pesan otomatis.",
    "productStrategy": "Kode menentukan pemeriksaan faktual; model membantu bahasa. ID ambigu tetap perlu review manusia. Nilai yang ditawarkan adalah paket review yang dapat ditelusuri; penghematan waktu masih merupakan hipotesis.",
    "userFlow": "Upload CSV registrasi dan pembayaran → sediakan harga berversi serta SOP → minta audit → bandingkan JSON deterministik dengan draft AI → review dan putuskan tindak lanjut secara manual.",
    "systemArchitecture": "Tujuh node dan enam koneksi: dua Read File dan Chat Input masuk ke BeresEvent Audit; laporan audit langsung ke Chat Output; prompt terpisah masuk ke Language Model lalu Chat Output klarifikasi. Harga dan SOP adalah input teks komponen audit.",
    "results": "Baseline final sintetis berisi enam baris registrasi dan enam baris pembayaran, menghasilkan lima temuan dan lima ID peserta terdampak. Output AI mempertahankan CASE-001 hingga CASE-005 dengan kode dan bukti yang cocok. Ini satu baseline yang diamati, bukan benchmark akurasi umum atau penghematan waktu.",
    "metrics": [
      {
        "value": "5",
        "label": "Kasus review baseline",
        "context": "Satu dataset sintetis: 6 baris registrasi dan 6 pembayaran."
      },
      {
        "value": "7",
        "label": "Unit test lokal lolos",
        "context": "Pengujian kode, bukan tujuh run live Langflow."
      }
    ],
    "featureStatus": [
      {
        "name": "Audit deterministik dan bukti",
        "status": "working",
        "note": "Baseline final ditunjukkan di Langflow; tes lokal mencakup validasi dan aturan audit."
      },
      {
        "name": "Draft klarifikasi AI",
        "status": "prototype",
        "note": "Identitas kasus dan bukti baseline dipertahankan; semua draft tetap perlu review."
      },
      {
        "name": "Dampak pengguna nyata",
        "status": "unvalidated",
        "note": "Belum ada pilot pengguna, penghematan waktu terukur atau pelanggan berbayar yang diklaim."
      }
    ],
    "aiSystem": {
      "provider": "Google Gemini melalui Langflow; screenshot workflow final merekam model yang dipilih.",
      "pipeline": [
        "Baca dan validasi snapshot CSV serta aturan harga input.",
        "Hasilkan kasus faktual dengan bukti sumber melalui Python.",
        "Berikan kasus, catatan registrasi dan SOP sebagai konteks model bahasa.",
        "Tampilkan JSON dan draft AI secara terpisah untuk review manusia."
      ],
      "dataFlow": "Catatan registrasi, temuan dan SOP masuk ke prompt model. Fixture dan screenshot publik sintetis; upload serta history Playground dapat tersimpan lokal.",
      "validation": "Header CSV wajib, ID terisi, nominal rupiah integer, kategori harga unik dan versi aturan. Kode menentukan temuan; reviewer mencocokkan draft AI dengan JSON.",
      "failureHandling": "Input salah menghentikan workflow dengan error. Pencocokan ambigu tetap perlu klarifikasi; draft AI tidak mengubah data atau mengirim pesan.",
      "limitations": "Belum ada verifier draft otomatis, audit trail keputusan review, kontrol akses produksi atau penghapusan terjadwal. Instruksi prompt bukan jaminan terhadap semua kesalahan model."
    },
    "lessonsLearned": [
      "Data snapshot yang hilang bukan bukti belum membayar.",
      "Jumlah kasus dan jumlah peserta terdampak adalah ukuran berbeda.",
      "Demo yang benar belum membuktikan kebutuhan, penghematan waktu atau kesiapan produksi."
    ],
    "relatedProjects": [
      "innofashion-show-8",
      "rekapflow",
      "akun-ai"
    ]
  }
};
