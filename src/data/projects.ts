import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "akun-ai",
    title: "Akun.AI",
    category: "AI Accounting SaaS / FinTech",
    description:
      "An AI-assisted accounting platform designed to make bookkeeping and financial reporting more accessible to Indonesian SMEs.",
    problem:
      "Indonesian small and medium businesses struggle with bookkeeping complexity and lack accessible, AI-assisted accounting tools tailored to local requirements.",
    targetUsers: "Indonesian SME owners and operators",
    role: "Solo product builder",
    contribution:
      "Product planning, system architecture, frontend and backend development, accounting workflows, AI integration, reporting, and user experience.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe",
      "OpenRouter",
      "Zod",
      "Recharts",
    ],
    status: "in-development",
    statusLabel: "In Development",
    outcome:
      "Pre-launch: built full accounting workflow including chart of accounts, double-entry validation, financial reports, AI assistant, receipt OCR, and subscription management.",
    githubUrl: "https://github.com/ezradesmonds",
    featured: true,
    sortOrder: 1,
    detail: {
      overview:
        "Akun.AI is an AI-assisted accounting SaaS built for Indonesian SMEs. It combines modern bookkeeping with AI capabilities including an accounting assistant, receipt OCR, and automated financial reporting.",
      keyFeatures: [
        "Business onboarding and chart of accounts",
        "Double-entry accounting with validation",
        "Profit and loss reports and balance sheets",
        "CSV export and printable reports",
        "AI accounting assistant via OpenRouter",
        "Receipt OCR for automatic transaction entry",
        "Team access and subscription management with Stripe",
        "Row-Level Security for data isolation",
      ],
      challenges: [
        "Designing accounting workflows that are accessible to non-accountants",
        "Implementing double-entry validation logic that catches common errors",
        "Building AI prompts that produce reliable, audit-ready accounting responses",
      ],
      lessonsLearned: [
        "Accounting domain modeling requires deep understanding of Indonesian accounting standards",
        "AI integration for financial data needs careful grounding and validation",
        "Stripe integration with Indonesian business use cases has unique considerations",
      ],
    },
  },
  {
    slug: "tokokaret",
    title: "TokoKaret.com",
    category: "E-Commerce / AI Product Recommendation",
    description:
      "A live commerce platform for rubber and industrial products with an AI-assisted consultation experience.",
    problem:
      "Industrial and rubber product buyers need guided product selection and consultation, but traditional e-commerce lacks the expertise to recommend products based on symptoms and use cases.",
    targetUsers:
      "Industrial buyers, workshops, and businesses needing rubber and industrial products",
    role: "Product builder and designer",
    contribution:
      "Designed and built the landing experience, consultation journey, sales pathways, and AI-assisted recommendation flow.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Google Gemini"],
    status: "live",
    statusLabel: "Live",
    outcome:
      "Conversion-focused landing experience serving a business with over 4,000 customers and 50,000+ items represented.",
    liveUrl: "https://www.tokokaret.com",
    featured: true,
    sortOrder: 2,
    detail: {
      overview:
        "TokoKaret.com is a commerce platform bridging the gap between industrial product catalogs and informed purchase decisions. The Gemini-powered recommendation engine helps customers find the right rubber products based on their symptoms and requirements.",
      keyFeatures: [
        "Conversion-focused landing experience",
        "AI-powered symptom-to-product recommendation (Google Gemini)",
        "WhatsApp and marketplace sales pathway integration",
        "Customer consultation journey with structured intake",
        "Responsive design optimized for mobile-first Indonesian users",
      ],
      challenges: [
        "Translating technical industrial product specifications into accessible user-facing recommendations",
        "Building a Gemini prompt pipeline that reliably maps symptoms to products",
        "Integrating AI recommendations with offline sales workflows",
      ],
      results:
        "The platform serves as the digital storefront for a business with over 4,000 customers and supports product discovery across a catalog of 50,000+ items.",
    },
  },
  {
    slug: "financeos",
    title: "FinanceOS",
    category: "Quantitative Research / FinTech / AI",
    description:
      "A private financial research and dry-run trading terminal for market analysis, algorithmic signal scanning, and structured trade evaluation.",
    problem:
      "Traders and quantitative researchers need a systematic, auditable environment for backtesting strategies and evaluating trade ideas without risking real capital.",
    targetUsers: "Quantitative researchers, traders, and financial analysts",
    role: "Product architect and developer",
    contribution:
      "Product architecture, market-data integration, research workflow design, backend planning, persistence architecture, and frontend terminal experience.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Python",
      "Binance API",
      "PostgreSQL",
    ],
    status: "prototype",
    statusLabel: "Research System",
    outcome:
      "Dry-run trading terminal with scheduled market scanning, signal generation, trade lifecycle tracking, and equity curve visualization.",
    githubUrl: "https://github.com/ezradesmonds",
    featured: true,
    sortOrder: 3,
    detail: {
      overview:
        "FinanceOS is a financial research terminal for systematic market analysis using public Binance data. It supports scheduled scanning, signal generation, dry-run trade execution, and performance analytics — all in a structured research environment. This is a research and analysis system, not a live trading platform.",
      keyFeatures: [
        "Public Binance market data integration",
        "Scheduled market scanning",
        "Algorithmic signal generation",
        "Dry-run trade execution and lifecycle tracking",
        "Equity curve visualization",
        "Performance metrics (profit in percentage and R)",
      ],
      challenges: [
        "Designing a reliable signal pipeline over public market data",
        "Implementing trade lifecycle tracking that accurately represents paper positions",
        "Building a research-grade frontend that remains fast with real-time data",
      ],
    },
  },
  {
    slug: "tailor-cooperative-system",
    title: "Tailor Efficiency Prediction & Cooperative Management System",
    category: "Machine Learning / Operational System",
    description:
      "A machine-learning workforce efficiency prediction system combined with a cooperative management platform for operational decision-making.",
    problem:
      "Cooperative managers lack data-driven tools to assign work to the most efficient tailors and manage operations across multiple business functions.",
    targetUsers: "Cooperative managers and operational staff",
    role: "Cross-functional team member",
    contribution:
      "Worked across the product process, led financial-model and IRR validation, contributed to system architecture, backend and administration design, and developed the operational interface.",
    technologies: ["Python", "Machine Learning", "Laravel", "MySQL"],
    status: "competition",
    statusLabel: "Competition — 2nd Place",
    outcome:
      "2nd Place — SUTD × Petra Christian University International Hackathon, January 2026.",
    githubUrl: "https://github.com/ezradesmonds",
    featured: true,
    sortOrder: 4,
    detail: {
      overview:
        "A dual-module system combining machine learning for workforce efficiency prediction with a full cooperative management platform. Modules include tailor efficiency prediction, operational dashboard, tailor management, stock management, supplier management, and purchase management.",
      keyFeatures: [
        "ML-based tailor efficiency prediction model",
        "Operational dashboard for cooperative managers",
        "Tailor, stock, supplier, and purchase management modules",
        "Cooperative operational workflow automation",
        "Financial model and IRR validation",
      ],
      challenges: [
        "Training reliable prediction models with limited operational data",
        "Integrating ML predictions into practical operational workflows",
        "Coordinating across multidisciplinary team members (Business, Architecture, International Business)",
      ],
      results:
        "Awarded 2nd Place at the SUTD × Petra Christian University International Hackathon, recognized for combining technical depth with operational practicality.",
    },
  },
  {
    slug: "innofashion-show-8",
    title: "Innofashion Show 8 Event Platform",
    category: "Full-Stack Event Technology",
    description:
      "A full-stack event platform supporting participant registration, administration, QR-based ticketing, and event operations for 100+ participants.",
    problem:
      "Large-scale student events need reliable, custom-built registration and administration tools that off-the-shelf solutions cannot adapt to quickly.",
    targetUsers: "Event participants, administrators, and operations staff",
    role: "Head / Coordinator of IT Division",
    contribution:
      "Led the technical division, designed the system architecture and product interface, implemented a substantial portion of the frontend and backend, coordinated technical contributors, managed deployment, and supported live-event reliability.",
    technologies: ["Next.js", "Laravel", "Tailwind CSS", "MySQL"],
    status: "live",
    statusLabel: "Delivered",
    outcome:
      "Successfully supported 100+ participants across registration, ticketing, and event-day operations.",
    liveUrl: "https://innofashionshow.petra.ac.id",
    githubUrl: "https://github.com/ezradesmonds",
    featured: true,
    sortOrder: 5,
    detail: {
      overview:
        "A custom full-stack event management platform built for the Innofashion Show 8, a major student-run event. The system handled participant registration, QR-based ticketing, admin dashboards, and real-time event operations.",
      keyFeatures: [
        "Participant registration and data management",
        "QR-based ticketing system",
        "Administrative dashboard",
        "Competition and talkshow registration workflows",
        "Authentication and authorization system",
        "Live-event reliability and support",
      ],
      challenges: [
        "Delivering a reliable system under tight event deadlines",
        "Coordinating technical and non-technical team members",
        "Ensuring system stability during live event operations",
      ],
      results:
        "The platform processed 100+ participants and ran reliably throughout the event. The technical team delivered under the coordination of the IT division head.",
    },
  },
  {
    slug: "bizxray-ai",
    title: "BizXRay AI",
    category: "AI Business Consulting",
    description:
      "An AI-assisted business consulting platform composed of six analytical modules for structured business evaluation and recommendations.",
    problem:
      "Small businesses cannot afford traditional consulting but need structured, analytical business evaluation to identify improvement areas and growth opportunities.",
    targetUsers: "Small business owners and operators",
    role: "Product builder",
    contribution:
      "Designed the multi-module analysis workflow, integrated OpenRouter-based LLM for business analysis, and built the reporting and recommendation system.",
    technologies: ["Next.js", "TypeScript", "OpenRouter", "Python"],
    status: "prototype",
    statusLabel: "Prototype",
    githubUrl: "https://github.com/ezradesmonds",
    featured: false,
    sortOrder: 6,
    detail: {
      overview:
        "BizXRay AI provides six analytical modules covering different aspects of business evaluation. Each module uses structured prompting and LLM analysis to generate actionable business insights and recommendations.",
      keyFeatures: [
        "Six-module business analysis framework",
        "OpenRouter-based LLM integration",
        "Business-oriented prompting and reporting",
        "Structured recommendation generation",
      ],
      challenges: [
        "Designing prompts that produce structured, consistent business analysis",
        "Balancing AI-generated insights with human business judgment",
      ],
    },
  },
  {
    slug: "servisin",
    title: "Servisin",
    category: "Service Marketplace / Mobile Application / Technopreneur Final Project",
    description:
      "A marketplace MVP connecting customers with home-appliance repair services through a mobile application. Built as a Technopreneur course final project.",
    problem:
      "Finding reliable home-appliance repair technicians is difficult for customers, and technicians lack digital channels to reach new clients.",
    targetUsers:
      "Homeowners needing appliance repair and service technicians",
    role: "Product and business architect",
    contribution:
      "Product and business-process design, backend and administrative architecture, technician-facing workflow, financial modelling and IRR validation, customer and service-operation flows.",
    technologies: ["React Native", "Laravel 11", "MySQL"],
    status: "prototype",
    statusLabel: "MVP",
    githubUrl: "https://github.com/ezradesmonds",
    featured: true,
    sortOrder: 6,
    detail: {
      overview:
        "Servisin is a mobile marketplace MVP connecting customers with home-appliance repair technicians. The platform handles customer requests, technician matching, service tracking, and administrative workflows.",
      keyFeatures: [
        "Customer service request flow",
        "Technician matching and dispatch",
        "Service tracking and status updates",
        "Administrative dashboard",
        "Financial modelling and IRR validation",
      ],
      challenges: [
        "Designing a marketplace model that balances customer and technician needs",
        "Building cross-platform mobile experience with limited resources",
      ],
    },
  },
];

export const additionalProjects: Project[] = [
  {
    slug: "wedding-dress-rental",
    title: "Wedding Dress Rental Platform",
    category: "Enterprise System / Odoo",
    description:
      "An Odoo-based rental e-commerce system for a wedding dress business including inventory tracking and booking management.",
    problem: "TODO: Add specific problem context",
    targetUsers: "Wedding dress business customers and operators",
    role: "Developer",
    contribution:
      "Configured and customized Odoo e-commerce and rental modules to support booking, availability tracking, and transaction management.",
    technologies: ["Odoo ERP", "E-Commerce"],
    status: "case-study",
    statusLabel: "Case Study",
    liveUrl: "https://byribkachyntya1.odoo.com/",
    featured: false,
    sortOrder: 8,
  },
  {
    slug: "quantitative-stock-prediction",
    title: "Quantitative Stock Prediction",
    category: "Financial Technology / Machine Learning",
    description:
      "A machine learning-based financial prediction system integrating technical indicators and an interactive analytics dashboard.",
    problem: "TODO: Add specific problem context",
    targetUsers: "Quantitative researchers",
    role: "Developer",
    contribution:
      "Engineered trading signals using MACD, RSI, EMA, and Z-Score indicators. Built a Python backtesting engine and Streamlit analytics dashboard.",
    technologies: ["Python", "Pandas", "Streamlit", "NumPy"],
    status: "academic",
    statusLabel: "Academic",
    featured: false,
    sortOrder: 9,
  },
  {
    slug: "tower-defense-game",
    title: "Tower Defense Game",
    category: "Game Development / OOP Final Project",
    description:
      "A 2D tower defense game applying object-oriented programming principles and game logic design. Built as a Pemrograman Berbasis Obyek (Object-Oriented Programming) course final project.",
    problem: "TODO: Add specific problem context",
    targetUsers: "Casual gamers",
    role: "Developer",
    contribution:
      "Implemented core mechanics including enemy pathfinding, tower placement, attack logic, and wave progression using Java and LibGDX.",
    technologies: ["Java", "LibGDX", "OOP"],
    status: "academic",
    statusLabel: "Academic",
    featured: false,
    sortOrder: 10,
  },
  {
    slug: "ppdb-school-info-system",
    title: "PPDB School Information System",
    category: "Full-Stack / Education / Web Technology Final Project",
    description:
      "A student registration and information system for school admissions processing. Built as a Teknologi Web course final project.",
    problem: "TODO: Add specific problem context",
    targetUsers: "School administrators and prospective students",
    role: "Developer",
    contribution: "TODO: Add specific contributions",
    technologies: ["Laravel", "MySQL", "PHP"],
    status: "academic",
    statusLabel: "Academic",
    featured: false,
    sortOrder: 11,
  },
  {
    slug: "finance-tracker",
    title: "Finance Tracker",
    category: "Full-Stack / Web Framework Deployment Final Project",
    description:
      "A personal finance tracking and management web application built with modern deployment practices. Built as a Web Framework Deployment course final project.",
    problem: "TODO: Add specific problem context",
    targetUsers: "Individual users managing personal finances",
    role: "Developer",
    contribution:
      "Designed and built the full-stack finance tracking application including deployment pipeline, database design, and responsive frontend.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Vercel"],
    status: "academic",
    statusLabel: "Academic Final Project",
    featured: false,
    sortOrder: 12,
  },
];
