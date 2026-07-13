import { FORMATTED_FACTS, PORTFOLIO_FACTS } from "../data/facts";

export type Lang = "en" | "id";

export const translations = {
  en: {
    "nav.work": "Work",
    "nav.play": "Play",
    "nav.experience": "Experience",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.getInTouch": "Get in Touch",
    "nav.downloadCv": "Download CV",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",

    "hero.headline": "Ezra Desmond Sutanto",
    "hero.role": "Informatics Student · AI & Full-Stack Builder",
    "hero.subheadline":
      "I build practical AI-assisted and full-stack products that turn messy workflows into clearer decisions and usable systems.",
    "hero.availability": "Open for internships and work.",
    "hero.ctaPrimary": "View 4 Flagship Projects",
    "hero.ctaSecondary": "Get in Touch",
    "hero.ctaCv": "Download CV",
    "hero.github": "GitHub",
    "hero.linkedin": "LinkedIn",
    "hero.instagram": "Instagram",
    "hero.codeBlock.title": "ezra.ts",
    "hero.codeBlock.focus": "Execution Systems",
    "hero.codeBlock.stacks": ["Full-Stack Web", "AI & ML Integration", "Product Engineering"],
    "hero.codeBlock.approach": "Think clearer.\n       Ship faster.",

    "proof.hackathon": "2nd Place International<br />Hackathon 2026",
    "proof.products": `${PORTFOLIO_FACTS.portfolio.documentedBuilds} documented AI/full-stack<br />builds`,
    "proof.gpa": `Official cumulative GPA<br />${FORMATTED_FACTS.cumulativeGpa} / ${FORMATTED_FACTS.gpaScale}`,
    "proof.local": "Students, Builders<br />& Early Founders",
    "proof.availability": "Open for internships and work<br />Surabaya, Indonesia",

    "about.title": "About Ezra",
    "about.education.label": "Education",
    "about.education.school": "Petra Christian University, Surabaya",
    "about.education.detail": `Informatics, 4th Semester · GPA ${FORMATTED_FACTS.cumulativeGpa} / ${FORMATTED_FACTS.gpaScale}`,

    "work.title": "Selected Work",
    "work.subtitle":
      "Case files from the systems, products, and experiments behind the positioning.",
    "work.moreProjects": "Explore More Builds",

    "experience.title": "Experience & Leadership",
    "experience.subtitle":
      "Roles where I led technical delivery, managed teams, and connected engineering with execution.",

    "awards.title": "Awards & Achievements",

    "capabilities.title": "Technical Capabilities",
    "capabilities.subtitle": "Grouped by domain, not ranked as equally proficient.",

    "contact.heading": "Have an idea or messy workflow?",
    "contact.subtitle":
      "I'm open to internships, collaborations, and opportunities to build AI-powered systems for ambitious students, builders, and early-stage entrepreneurs.",
    "contact.sendEmail": "Send an Email",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",

    "contact.form.name": "Your Name",
    "contact.form.namePlaceholder": "John Doe",
    "contact.form.email": "Email Address",
    "contact.form.emailPlaceholder": "you@example.com",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Tell me about your project or idea...",
    "contact.form.submit": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.form.success": "Message sent! I'll get back to you within 24 hours.",
    "contact.form.error": "Something went wrong. Please email me directly at ezradesmonds@gmail.com.",
    "contact.form.or": "or reach me via",

    "footer.tagline":
      "Informatics student building practical AI-assisted and full-stack products across SaaS, decision support, events, and automation.",
    "footer.navigation": "Navigation",
    "footer.links": "Links",
    "footer.email": "Email",
    "footer.builtWith": "Built with Astro · TypeScript · Three.js",

    "skipLink": "Skip to main content",

    "seo.title": "Ezra Desmond Sutanto - Informatics Student & AI/Full-Stack Builder",
    "seo.description":
      "Portfolio of Ezra Desmond Sutanto, an Informatics student building practical AI-assisted and full-stack products.",
  },

  id: {
    "nav.work": "Karya",
    "nav.play": "Main",
    "nav.experience": "Pengalaman",
    "nav.about": "Tentang",
    "nav.contact": "Kontak",
    "nav.getInTouch": "Hubungi Saya",
    "nav.downloadCv": "Unduh CV",
    "nav.openMenu": "Buka menu",
    "nav.closeMenu": "Tutup menu",

    "hero.headline": "Ezra Desmond Sutanto",
    "hero.role": "Mahasiswa Informatika · AI & Full-Stack Builder",
    "hero.subheadline":
      "Saya membangun produk AI-assisted dan full-stack yang mengubah workflow berantakan menjadi keputusan yang lebih jelas dan sistem yang bisa dipakai.",
    "hero.availability": "Terbuka untuk magang dan kerja.",
    "hero.ctaPrimary": "Lihat 4 Proyek Unggulan",
    "hero.ctaSecondary": "Hubungi Saya",
    "hero.ctaCv": "Unduh CV",
    "hero.github": "GitHub",
    "hero.linkedin": "LinkedIn",
    "hero.instagram": "Instagram",
    "hero.codeBlock.title": "ezra.ts",
    "hero.codeBlock.focus": "Execution Systems",
    "hero.codeBlock.stacks": ["Full-Stack Web", "AI & ML Integration", "Product Engineering"],
    "hero.codeBlock.approach": "Berpikir jernih.\n       Bergerak cepat.",

    "proof.hackathon": "Juara 2 International<br />Hackathon 2026",
    "proof.products": `${PORTFOLIO_FACTS.portfolio.documentedBuilds} build AI/full-stack<br />terdokumentasi`,
    "proof.gpa": `IPK kumulatif resmi<br />${FORMATTED_FACTS.cumulativeGpa} / ${FORMATTED_FACTS.gpaScale}`,
    "proof.local": "Mahasiswa, Builder<br />& Founder Awal",
    "proof.availability": "Terbuka untuk magang dan kerja<br />Surabaya, Indonesia",

    "about.title": "Tentang Ezra",
    "about.education.label": "Pendidikan",
    "about.education.school": "Universitas Kristen Petra, Surabaya",
    "about.education.detail": `Informatika, Semester 4 · IPK ${FORMATTED_FACTS.cumulativeGpa} / ${FORMATTED_FACTS.gpaScale}`,

    "work.title": "Karya Pilihan",
    "work.subtitle":
      "Case file dari sistem, produk, dan eksperimen yang membentuk positioning ini.",
    "work.moreProjects": "Jelajahi Build Lainnya",

    "experience.title": "Pengalaman & Kepemimpinan",
    "experience.subtitle":
      "Peran di mana saya memimpin pengiriman teknis, mengelola tim, dan menghubungkan rekayasa dengan eksekusi.",

    "awards.title": "Penghargaan & Prestasi",

    "capabilities.title": "Kemampuan Teknis",
    "capabilities.subtitle":
      "Dikelompokkan berdasarkan domain, tidak diurutkan berdasarkan tingkat mahir.",

    "contact.heading": "Punya ide atau workflow berantakan?",
    "contact.subtitle":
      "Saya terbuka untuk magang, kolaborasi, dan peluang membangun sistem bertenaga AI untuk mahasiswa ambisius, builder, dan entrepreneur tahap awal.",
    "contact.sendEmail": "Kirim Email",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",

    "contact.form.name": "Nama Anda",
    "contact.form.namePlaceholder": "John Doe",
    "contact.form.email": "Alamat Email",
    "contact.form.emailPlaceholder": "anda@contoh.com",
    "contact.form.message": "Pesan",
    "contact.form.messagePlaceholder": "Ceritakan tentang proyek atau ide Anda...",
    "contact.form.submit": "Kirim Pesan",
    "contact.form.sending": "Mengirim...",
    "contact.form.success": "Pesan terkirim! Saya akan membalas dalam 24 jam.",
    "contact.form.error": "Terjadi kesalahan. Silakan email saya langsung di ezradesmonds@gmail.com.",
    "contact.form.or": "atau hubungi via",

    "footer.tagline":
      "Mahasiswa Informatika yang membangun produk AI-assisted dan full-stack untuk SaaS, decision support, event, dan otomasi.",
    "footer.navigation": "Navigasi",
    "footer.links": "Tautan",
    "footer.email": "Email",
    "footer.builtWith": "Dibangun dengan Astro · TypeScript · Three.js",

    "skipLink": "Langsung ke konten utama",

    "seo.title": "Ezra Desmond Sutanto - Mahasiswa Informatika & AI/Full-Stack Builder",
    "seo.description":
      "Portofolio Ezra Desmond Sutanto, mahasiswa Informatika yang membangun produk AI-assisted dan full-stack yang praktis.",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];
