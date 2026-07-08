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
    screenshot: "/assets/case-studies/akun-ai-dashboard.webp",
    githubUrl: "https://github.com/ezradesmonds",
    githubLabel: "GitHub Profile",
    githubIsGeneric: true,
    proofStatus: "available",
    proofArtifacts: [
      {
        src: "/assets/case-studies/akun-ai-dashboard.webp",
        alt: "Akun.AI dashboard showing cash balance, revenue, expenses, AI assistant, reports, invoice, inventory, and integrations.",
        caption:
          "Main dashboard with finance KPIs, AI assistant, reports, invoice, inventory, and integration cards.",
      },
      {
        src: "/assets/case-studies/akun-ai-landing.webp",
        alt: "Akun.AI landing page with accounting AI positioning for Indonesian businesses.",
        caption:
          "Public landing page positioning Akun.AI as a conversational accounting workspace.",
      },
      {
        src: "/assets/case-studies/akun-ai-ledger.webp",
        alt: "Akun.AI ledger preview with cash chart, AI assistant, and transaction rows.",
        caption:
          "Ledger preview: transactions, balances, and AI summary in one finance surface.",
      },
      {
        src: "/assets/case-studies/akun-ai-pricing.webp",
        alt: "Akun.AI pricing section with Free, Starter, and Pro plans.",
        caption:
          "Pricing model designed around transaction limits, AI chat limits, team access, and inventory needs.",
      },
    ],
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
      aiSystem: {
        provider: "OpenRouter-configurable LLM layer with planned OCR ingestion for receipt capture.",
        pipeline: [
          "Business transactions, invoices, inventory changes, and receipt OCR outputs enter the ledger workspace.",
          "Structured transaction data is validated against chart-of-accounts rules before it reaches reports.",
          "The AI assistant answers from workspace context and summarizes financial state instead of acting as an unconstrained chatbot.",
          "Reports, CSV exports, and dashboard cards are generated from persisted accounting records.",
        ],
        dataFlow:
          "Supabase/PostgreSQL stores tenant-isolated business data; RLS boundaries protect workspace records before AI context is assembled.",
        validation:
          "Double-entry checks, category validation, and permission-aware queries keep financial answers tied to stored ledger data.",
        failureHandling:
          "AI output is treated as advisory; accounting actions still pass through deterministic validation before being saved or reported.",
        limitations:
          "Pre-launch system. Tax, OCR accuracy, and local compliance behavior still need deeper production validation.",
      },
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
    technologies: ["Astro", "TypeScript", "Tailwind CSS", "RAG", "AI Recommendation"],
    status: "live",
    statusLabel: "Live",
    outcome:
      "Conversion-focused landing experience serving a business with over 4,000 customers and 50,000+ items represented.",
    screenshot: "/assets/case-studies/tokokaret-landing.webp",
    liveUrl: "https://www.tokokaret.com",
    githubUrl: "https://github.com/ezradesmonds/Tokokaretastro",
    githubLabel: "Current Live Repo",
    githubLinks: [
      {
        label: "Current Live Repo",
        url: "https://github.com/ezradesmonds/Tokokaretastro",
      },
    ],
    proofStatus: "available",
    proofArtifacts: [
      {
        src: "/assets/case-studies/tokokaret-landing.webp",
        alt: "TokoKaret.com landing page for automotive and industrial rubber products.",
        caption:
          "Live storefront hero: product-first commerce page with WhatsApp consultation path.",
      },
      {
        src: "/assets/case-studies/tokokaret-ai-check.webp",
        alt: "TokoKaret.com AI assistant form for car model and product symptom intake.",
        caption:
          "AI consultation flow: users describe symptoms and receive an initial product category direction.",
      },
      {
        src: "/assets/case-studies/tokokaret-products.webp",
        alt: "TokoKaret.com product section showing commonly searched rubber parts.",
        caption:
          "Product discovery section connecting problem labels to specific catalog categories.",
      },
    ],
    featured: true,
    sortOrder: 2,
    detail: {
      overview:
        "TokoKaret.com is a commerce platform bridging the gap between industrial product catalogs and informed purchase decisions. Its RAG-assisted recommendation flow helps customers turn car symptoms or product needs into an initial rubber-part direction before human WhatsApp confirmation.",
      keyFeatures: [
        "Conversion-focused landing experience",
        "RAG-assisted symptom-to-product recommendation",
        "WhatsApp and marketplace sales pathway integration",
        "Customer consultation journey with structured intake",
        "Responsive design optimized for mobile-first Indonesian users",
      ],
      challenges: [
        "Translating technical industrial product specifications into accessible user-facing recommendations",
        "Grounding recommendations in product/category context so the AI does not overclaim exact part compatibility",
        "Integrating AI recommendations with offline sales workflows",
      ],
      aiSystem: {
        provider: "RAG-assisted recommendation layer for symptom-to-category guidance.",
        pipeline: [
          "User enters car model plus complaint or use case in a structured form.",
          "The system retrieves relevant product/category context before producing a constrained recommendation.",
          "The answer maps symptoms to likely product categories instead of claiming a guaranteed SKU match.",
          "Sales follow-up uses the AI result plus photo verification for final product matching.",
        ],
        dataFlow:
          "Form input stays lightweight: model, symptom, retrieved category context, and recommendation output are used to guide WhatsApp handoff.",
        validation:
          "AI is intentionally positioned as initial guidance; final size/type confirmation still happens through human consultation and photo evidence.",
        failureHandling:
          "When uncertainty is high, the interface pushes the user to continue consultation rather than overclaiming a product fit.",
        limitations:
          "The AI flow recommends categories, not guaranteed part compatibility. Physical photo confirmation remains necessary.",
      },
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
    screenshot: "/assets/case-studies/financeos-terminal.webp",
    githubUrl: "https://github.com/ezradesmonds",
    githubLabel: "GitHub Profile",
    githubIsGeneric: true,
    proofStatus: "available",
    proofArtifacts: [
      {
        src: "/assets/case-studies/financeos-terminal.webp",
        alt: "FinanceOS terminal showing active crypto signals and signal detail panel.",
        caption:
          "Research terminal: active signal cards, live chart context, risk metrics, and dry-run status.",
      },
      {
        src: "/assets/case-studies/financeos-signal.webp",
        alt: "FinanceOS signal detail view with trend, momentum, liquidity, risk reward, and dry-run action.",
        caption:
          "Signal detail: structured factors, risk/reward, invalidation notes, and dry-run action.",
      },
      {
        src: "/assets/case-studies/financeos-worker.webp",
        alt: "FinanceOS autonomous dry-run worker and paper lifecycle tracking.",
        caption:
          "Autonomous dry-run worker tracking paper trades without live orders or exchange keys.",
      },
      {
        src: "/assets/case-studies/financeos-news.webp",
        alt: "FinanceOS market headlines and provider status panel.",
        caption:
          "News engine with provider status, fallback mode, dedupe count, and headline sentiment tags.",
      },
    ],
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
      aiSystem: {
        provider:
          "Algorithmic signal pipeline with news/sentiment processing; not connected to live brokerage execution.",
        pipeline: [
          "Public market data and news feeds are ingested into a research workspace.",
          "Rules score trend, momentum, liquidity, BTC regime, risk/reward, and signal freshness.",
          "Signal cards expose entry, stop, TP levels, invalidation criteria, and dry-run lifecycle state.",
          "A dry-run worker tracks paper positions for evaluation without sending live orders.",
        ],
        dataFlow:
          "Binance/public market data, RSS/news providers, and fallback simulators feed the terminal and paper lifecycle records.",
        validation:
          "Signals include scoring, regime filters, invalidation notes, and explicit research-only labeling.",
        failureHandling:
          "Provider status surfaces disabled/fallback feeds, and live orders stay disabled by design.",
        limitations:
          "Research-only system. No wallet, broker, exchange key, or live financial execution is connected.",
      },
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
    screenshot: "/assets/case-studies/tailor-allocation.webp",
    githubUrl: "https://github.com/ezradesmonds/AI_tailor_smart_allocator",
    githubLabel: "AIML Repo",
    githubLinks: [
      {
        label: "AIML Repo",
        url: "https://github.com/ezradesmonds/AI_tailor_smart_allocator",
      },
      {
        label: "Management System Repo",
        url: "https://github.com/ezradesmonds/koperasi_app",
      },
    ],
    proofStatus: "available",
    proofArtifacts: [
      {
        src: "/assets/case-studies/tailor-dashboard.webp",
        alt: "Tailor cooperative managerial dashboard with profit, expense, active project, ready tailor, and stock warning metrics.",
        caption:
          "Managerial dashboard: business, production, and stock signals in one operational view.",
      },
      {
        src: "/assets/case-studies/tailor-analytics.webp",
        alt: "Tailor analytics dashboard with total partners, average speed, idle status, bar chart, and specialization distribution.",
        caption:
          "Tailor performance analytics used to understand capacity, speed, idle status, and specialization mix.",
      },
      {
        src: "/assets/case-studies/tailor-data.webp",
        alt: "Tailor data management table with distance, speed, specialty, status, and contact fields.",
        caption:
          "Operational data table powering tailor assignment decisions and management workflows.",
      },
      {
        src: "/assets/case-studies/tailor-allocation.webp",
        alt: "AI Smart Allocation form recommending a tailor based on deadline, category, and order size.",
        caption:
          "Smart allocation flow: deadline, category, quantity, target speed, and recommended tailor.",
      },
      {
        src: "/assets/case-studies/tailor-split-order.webp",
        alt: "Tailor custom split order simulation with capacity, estimated completion, and task split table.",
        caption:
          "Fallback split-order simulation when one tailor cannot safely carry the full workload alone.",
      },
    ],
    featured: true,
    sortOrder: 4,
    detail: {
      overview:
        "A dual-module system combining machine learning for workforce efficiency prediction with a full cooperative management platform. Modules include tailor efficiency prediction, operational dashboard, tailor management, stock management, supplier management, and purchase management.",
      keyFeatures: [
        "Unsupervised clustering workflow over 200 cooperative tailor records",
        "Operational dashboard for cooperative managers",
        "Tailor, stock, supplier, and purchase management modules",
        "Cooperative operational workflow automation",
        "Financial model and IRR validation",
      ],
      challenges: [
        "Cleaning and structuring cooperative tailor data before feature engineering",
        "Integrating clustering output into practical work-allocation workflows",
        "Coordinating across multidisciplinary team members (Business, Architecture, International Business)",
      ],
      aiSystem: {
        provider:
          "Unsupervised machine-learning clustering plus a rule-based allocation layer over 200 cooperative tailor records.",
        pipeline: [
          "Raw cooperative tailor data is cleaned to remove inconsistent, incomplete, or unusable operational records.",
          "Feature engineering transforms tailor attributes into allocation-ready signals such as speed, status, distance, specialty, and capacity.",
          "Unsupervised clustering groups tailors by operational profile so similar working patterns can be compared.",
          "Order inputs define category, quantity, and deadline pressure, then the allocation layer ranks feasible candidates.",
          "If single-tailor capacity is unsafe, the system simulates split-order alternatives.",
        ],
        dataFlow:
          "The AIML workflow produces clustering/allocation signals, while the cooperative management system uses those signals inside dashboards, tailor management, and smart allocation flows.",
        validation:
          "Recommendations are checked against deadline math, capacity, current status, specialty, distance, and cluster-based feasibility signals.",
        failureHandling:
          "When no single tailor is enough, the system proposes a custom split order instead of forcing one assignment.",
        limitations:
          "Competition prototype using 200 cooperative tailor records. The clustering logic needs longer real-world feedback loops before it can claim production-grade allocation accuracy.",
      },
      results:
        "Awarded 2nd Place at the SUTD × Petra Christian University International Hackathon, recognized for combining technical depth with operational practicality.",
    },
  },
  {
    slug: "finlend",
    title: "FinLend",
    category: "AI Credit Intelligence / AIML Final Project",
    description:
      "An AI credit-risk simulation system that combines a neural-network risk model with fuzzy logic to recommend credit decisions, limits, and interest.",
    problem:
      "Credit evaluation needs structured applicant intake, explainable risk signals, and decision support that can connect model output to a readable recommendation.",
    targetUsers: "Credit analysts, fintech builders, and academic AIML evaluators",
    role: "AI and full-stack developer",
    contribution:
      "Built the Laravel web interface, connected it to a FastAPI AI engine, designed the 25-feature intake flow, and shaped the ML plus fuzzy decision pipeline into a polished credit simulation experience.",
    technologies: ["Laravel", "Python", "FastAPI", "Machine Learning", "Fuzzy Logic", "Tailwind CSS"],
    status: "academic",
    statusLabel: "AIML Final Project",
    outcome:
      "Delivered an end-to-end credit simulation flow where applicant, finance, loan, and collateral data are processed into risk, approval, limit, and interest recommendations.",
    screenshot: "/assets/case-studies/finlend-landing.webp",
    githubUrl: "https://github.com/ezradesmonds/Finlend",
    githubLabel: "GitHub Repo",
    proofStatus: "available",
    proofArtifacts: [
      {
        src: "/assets/case-studies/finlend-landing.webp",
        alt: "FinLend landing page showing AI credit intelligence positioning, ML plus fuzzy pipeline, and multi-step application flow.",
        caption:
          "Landing and workflow surface: ML + fuzzy decision positioning with a 5-step credit application flow.",
      },
      {
        src: "/assets/case-studies/finlend-form.webp",
        alt: "FinLend applicant profile form with layered credit analysis notes and active risk model indicators.",
        caption:
          "Applicant intake form: structured profile, credit score, bureau, and eligibility inputs sent to the AI engine.",
      },
      {
        src: "/assets/case-studies/finlend-demo.mp4",
        poster: "/assets/case-studies/finlend-landing.webp",
        kind: "video",
        alt: "FinLend demo video showing the credit analysis flow.",
        caption:
          "Demo video artifact for the end-to-end credit application and analysis experience.",
      },
    ],
    featured: true,
    sortOrder: 5,
    detail: {
      overview:
        "FinLend is an academic AI credit-intelligence project built with a Laravel interface and a FastAPI AI engine. It turns 25 structured applicant signals into a credit-risk recommendation using a feedforward neural network and fuzzy logic decision layer.",
      keyFeatures: [
        "Five-step credit application flow",
        "25-feature applicant and loan intake",
        "FastAPI AI engine integration",
        "Feedforward neural-network risk scoring",
        "Fuzzy logic for credit limit and interest recommendation",
        "Laravel result interface for approval or rejection output",
      ],
      challenges: [
        "Keeping the model input structure aligned between Laravel and FastAPI",
        "Presenting model output as a readable credit recommendation rather than a black-box score",
        "Handling academic dataset constraints while keeping the demo believable",
      ],
      aiSystem: {
        provider: "Python FastAPI AI engine using MLPClassifier plus a fuzzy logic decision layer.",
        pipeline: [
          "User enters 25 applicant, financial, loan, and collateral signals in the Laravel form.",
          "Laravel sends the structured payload to the FastAPI /hitung-kredit endpoint.",
          "The neural-network model estimates default risk from the scaled feature set.",
          "Fuzzy logic translates risk and financial context into limit and interest recommendations.",
          "Laravel renders the decision output as an approval or rejection simulation with readable context.",
        ],
        dataFlow:
          "Laravel handles the web flow and sends a structured request to FastAPI; the Python service returns risk and fuzzy decision outputs to the result page.",
        validation:
          "Inputs are constrained to the 25 model features, then scaled and processed before recommendation output.",
        failureHandling:
          "The web flow depends on the FastAPI service being available on port 8000; connection issues are surfaced as a demo/runtime dependency rather than silently faking a result.",
        limitations:
          "Academic simulation using loan-default data and USD-scale assumptions. It is not a production credit approval system and would need fairness, calibration, and compliance validation.",
      },
      results:
        "Built as the final AIML course project with a working Laravel-to-FastAPI AI pipeline and a polished credit-analysis interface.",
    },
  },
  {
    slug: "bank-tulang",
    title: "Bank Tulang",
    category: "Client Project / Health Education Platform",
    description:
      "A web-based bone-health promotion prototype for pharmacy students, featuring education modules, an OKAT-adapted quiz, calcium/activity tracking concepts, and an interactive readiness simulation.",
    problem:
      "The pharmacy student client needed a clear, interactive platform to communicate a bone-health intervention design instead of relying on static tables or slides.",
    targetUsers: "Pharmacy students, academic supervisors, and health-promotion presentation audiences",
    role: "Client project developer",
    contribution:
      "Built the interactive microsite, structured the eight intervention modules, designed the quiz and simulation surfaces, and translated academic evidence into a presentation-ready web experience.",
    technologies: ["JavaScript", "HTML", "CSS", "Responsive UI", "Accessibility"],
    status: "case-study",
    statusLabel: "Client Project",
    outcome:
      "Delivered a presentation-ready prototype that explains the eight-component intervention, 12-item adapted OKAT quiz, and health-readiness simulation in a web-native format.",
    screenshot: "/assets/case-studies/bank-tulang-landing.webp",
    liveUrl: "https://ezradesmonds.github.io/BankTulang/",
    githubUrl: "https://github.com/ezradesmonds/BankTulang",
    githubLabel: "GitHub Repo",
    proofStatus: "available",
    proofArtifacts: [
      {
        src: "/assets/case-studies/bank-tulang-landing.webp",
        alt: "Bank Tulang landing page showing bone health monitoring positioning and spine visual.",
        caption:
          "Landing experience for the bone-health promotion platform and academic intervention framing.",
      },
      {
        src: "/assets/case-studies/bank-tulang-quiz.webp",
        alt: "Bank Tulang quiz modal showing adapted OKAT questions with true, false, and don't know options.",
        caption:
          "12-item adapted OKAT quiz interface with automatic score interpretation concept.",
      },
      {
        src: "/assets/case-studies/bank-tulang-modules.webp",
        alt: "Bank Tulang eight intervention module cards for quiz, score, calcium tracking, activity notes, education, targets, gamification, and social challenge.",
        caption:
          "Eight intervention modules translated from academic planning into readable web cards.",
      },
      {
        src: "/assets/case-studies/bank-tulang-simulation.webp",
        alt: "Bank Tulang readiness simulation with sliders for OKAT answers, calcium, activity, and readiness indicators.",
        caption:
          "Interactive simulation for knowledge, calcium, and activity readiness. Educational only, not medical diagnosis.",
      },
    ],
    featured: true,
    sortOrder: 6,
    detail: {
      overview:
        "Bank Tulang is a client microsite built for pharmacy students who needed to present a bone-health intervention platform. The product frames assessment, scoring, tracking, education, goals, gamification, and social challenge mechanics in a clear web prototype.",
      keyFeatures: [
        "Bone-health promotion landing page",
        "Eight intervention module cards",
        "12-item adapted OKAT quiz modal",
        "Readiness simulation with adjustable parameters",
        "Evidence-forward content architecture",
        "Responsive presentation mode for academic review",
      ],
      challenges: [
        "Turning academic intervention tables into a website that feels credible and readable",
        "Keeping the product educational without implying medical diagnosis",
        "Balancing visual energy with healthcare clarity and accessibility",
      ],
      results:
        "Created a web-native prototype that helps audiences understand the intervention structure quickly during academic presentation.",
      lessonsLearned: [
        "Academic client work needs translation from evidence and modules into a story that non-technical audiences can follow",
        "Health-related products must be careful with claims, labels, and diagnostic framing",
      ],
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
    screenshot: "/assets/case-studies/innofashion-dashboard.webp",
    liveUrl: "https://innofashionshow.petra.ac.id",
    githubUrl: "https://github.com/innofashion-8/frontend",
    githubLabel: "Frontend Repo",
    githubLinks: [
      {
        label: "Frontend Repo",
        url: "https://github.com/innofashion-8/frontend",
      },
      {
        label: "Backend Repo",
        url: "https://github.com/innofashion-8/backend",
      },
    ],
    proofStatus: "available",
    proofArtifacts: [
      {
        src: "/assets/case-studies/innofashion-dashboard.webp",
        alt: "Innofashion participant dashboard with registration status, upload submission, WhatsApp join, and verified badge.",
        caption:
          "Participant dashboard for registration status, submission upload, WhatsApp coordination, and verification.",
      },
      {
        src: "/assets/case-studies/innofashion-admin.webp",
        alt: "Innofashion admin dashboard with competition and event statistics.",
        caption:
          "Admin dashboard showing participant validation metrics and event statistics.",
      },
      {
        src: "/assets/case-studies/innofashion-landing.webp",
        alt: "Innofashion Show 8 landing page with register now call to action.",
        caption:
          "Public landing page for event discovery, registration, and participant onboarding.",
      },
    ],
    featured: true,
    sortOrder: 7,
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
    githubUrl: "https://github.com/ezradesmonds/servisin-front",
    githubLabel: "Frontend Repo",
    githubLinks: [
      {
        label: "Frontend Repo",
        url: "https://github.com/ezradesmonds/servisin-front",
      },
      {
        label: "Backend Repo",
        url: "https://github.com/ezradesmonds/servisin-backend",
      },
    ],
    proofStatus: "available",
    screenshot: "/assets/case-studies/servisin-home.webp",
    proofArtifacts: [
      {
        src: "/assets/case-studies/servisin-home.webp",
        alt: "Servisin mobile home screen with search, service categories, recent service, and bottom navigation.",
        caption:
          "Customer home flow with search, service categories, recent service, and booking navigation.",
      },
      {
        src: "/assets/case-studies/servisin-signup.webp",
        alt: "Servisin mobile sign-up screen with Google sign-in and technician mode entry.",
        caption: "Authentication entry for customers and technicians.",
      },
      {
        src: "/assets/case-studies/servisin-detail.webp",
        alt: "Servisin service detail screen with portfolio and recent reviews.",
        caption: "Technician/service detail surface with portfolio proof and reviews.",
      },
      {
        src: "/assets/case-studies/servisin-transaction.webp",
        alt: "Servisin transaction detail screen with completed service and technician card.",
        caption:
          "Transaction detail flow with service completion, protection card, and technician actions.",
      },
      {
        src: "/assets/case-studies/servisin-subscription.webp",
        alt: "Servisin subscription screen with active silver plan and remaining benefits.",
        caption:
          "Subscription model screen for recurring service benefits and plan upgrade.",
      },
    ],
    featured: true,
    sortOrder: 8,
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
    problem:
      "A rental business needs a clearer way to publish products, track availability, and prevent booking conflicts across dress inventory.",
    targetUsers: "Wedding dress business customers and operators",
    role: "Developer",
    contribution:
      "Configured and customized Odoo e-commerce and rental modules to support booking, availability tracking, and transaction management.",
    technologies: ["Odoo ERP", "E-Commerce"],
    status: "case-study",
    statusLabel: "Case Study",
    liveUrl: "https://byribkachyntya1.odoo.com/",
    screenshot: "/assets/case-studies/wedding-rental-landing.webp",
    proofStatus: "available",
    proofArtifacts: [
      {
        src: "/assets/case-studies/wedding-rental-landing.webp",
        alt: "Wedding dress rental Odoo storefront landing page.",
        caption:
          "Public storefront configured for dress discovery, product browsing, and appointment scheduling.",
      },
      {
        src: "/assets/case-studies/wedding-rental-booking.webp",
        alt: "Wedding dress rental product page with date-range booking calendar.",
        caption:
          "Rental booking flow with date-range selection and availability calendar inside the product detail page.",
      },
      {
        src: "/assets/case-studies/wedding-rental-products.webp",
        alt: "Odoo backend product list for wedding dress rental inventory.",
        caption:
          "Back-office product inventory view used to manage published rental items and stock status.",
      },
    ],
    featured: false,
    sortOrder: 9,
    detail: {
      overview:
        "An Odoo rental-commerce implementation for a wedding dress business. The project focused on turning product inventory into a browsable rental storefront with booking and back-office inventory support.",
      keyFeatures: [
        "Odoo e-commerce storefront",
        "Rental product catalog",
        "Date-range booking flow",
        "Inventory publication status",
        "Customer-facing product detail pages",
      ],
      challenges: [
        "Adapting a general Odoo commerce setup into a rental-specific workflow",
        "Making availability and booking behavior understandable for customers",
      ],
    },
  },
  {
    slug: "tower-defense-game",
    title: "Tower Defense Game",
    category: "Game Development / OOP Final Project",
    description:
      "A 2D tower defense game applying object-oriented programming principles and game logic design. Built as a Pemrograman Berbasis Obyek (Object-Oriented Programming) course final project.",
    problem:
      "The academic challenge was to apply object-oriented programming to a stateful game with enemies, towers, upgrades, scoring, and wave progression.",
    targetUsers: "Casual gamers",
    role: "Developer",
    contribution:
      "Implemented core mechanics including enemy pathfinding, tower placement, attack logic, and wave progression using Java and LibGDX.",
    technologies: ["Java", "LibGDX", "OOP"],
    status: "academic",
    statusLabel: "Academic",
    screenshot: "/assets/case-studies/tower-defense-gameplay.webp",
    githubUrl: "https://github.com/ezradesmonds/towerdefensejava",
    githubLabel: "GitHub Repo",
    proofStatus: "available",
    proofArtifacts: [
      {
        src: "/assets/case-studies/tower-defense-wave.webp",
        alt: "Tower defense game wave countdown screen.",
        caption:
          "Wave start screen showing the map, HUD, health, money, and upcoming wave timing.",
      },
      {
        src: "/assets/case-studies/tower-defense-gameplay.webp",
        alt: "Tower defense game with towers attacking enemies on the path.",
        caption:
          "Gameplay loop with tower placement, projectile attacks, score, money, health, and remaining enemy count.",
      },
      {
        src: "/assets/case-studies/tower-defense-map.webp",
        alt: "Tower defense game map with UI controls and tower purchase options.",
        caption:
          "Map and HUD surface for placing towers, pausing, speeding up, resetting, and upgrading attributes.",
      },
    ],
    featured: false,
    sortOrder: 10,
    detail: {
      overview:
        "A Java/LibGDX tower defense game built for an object-oriented programming final project. The project demonstrates game state management, entity behavior, and reusable class design through a playable tower-defense loop.",
      keyFeatures: [
        "Enemy path and wave progression",
        "Tower placement and attack logic",
        "Projectile and collision behavior",
        "Money, score, health, and remaining enemy state",
        "Pause, speed, reset, and upgrade controls",
      ],
      challenges: [
        "Keeping game entities modular enough for OOP evaluation",
        "Managing real-time state updates across enemies, towers, projectiles, and HUD",
      ],
    },
  },
  {
    slug: "ppdb-school-info-system",
    title: "PPDB School Information System",
    category: "Full-Stack / Education / Web Technology Final Project",
    description:
      "A student registration and information system for school admissions processing. Built as a Teknologi Web course final project.",
    problem:
      "Manual school admissions workflows make it hard to collect applicant data, manage accounts, and organize registration documents in one place.",
    targetUsers: "School administrators and prospective students",
    role: "Developer",
    contribution:
      "Built the admissions landing page, authentication flow, applicant registration form, and document upload interface.",
    technologies: ["Laravel", "MySQL", "PHP"],
    status: "academic",
    statusLabel: "Academic",
    screenshot: "/assets/case-studies/ppdb-landing.webp",
    githubUrl: "https://github.com/ezradesmonds/ppdbsekolah",
    githubLabel: "GitHub Repo",
    proofStatus: "available",
    proofArtifacts: [
      {
        src: "/assets/case-studies/ppdb-landing.webp",
        alt: "PPDB school admissions landing page with countdown and registration call to action.",
        caption:
          "Admissions landing page with countdown, primary registration CTA, and information navigation.",
      },
      {
        src: "/assets/case-studies/ppdb-login.webp",
        alt: "PPDB school admissions login page.",
        caption:
          "Login surface for applicant accounts before entering the registration workflow.",
      },
      {
        src: "/assets/case-studies/ppdb-registration.webp",
        alt: "PPDB school admissions registration form with student, parent, academic, and document upload sections.",
        caption:
          "Registration form for applicant data, parent details, academic choices, and document uploads.",
      },
    ],
    featured: false,
    sortOrder: 11,
    detail: {
      overview:
        "A full-stack school admissions system created for a web technology final project. It covers the public admissions landing page, login, applicant registration, and document upload flow.",
      keyFeatures: [
        "Public admissions landing page",
        "Countdown and registration CTA",
        "Applicant login flow",
        "Student and parent data form",
        "Academic choice and document upload sections",
      ],
      challenges: [
        "Structuring a long registration form without making it feel chaotic",
        "Separating public information pages from authenticated applicant workflows",
      ],
    },
  },
  {
    slug: "finance-tracker",
    title: "Finance Tracker",
    category: "Full-Stack / Web Framework Deployment Final Project",
    description:
      "A personal finance tracking and management web application built with modern deployment practices. Built as a Web Framework Deployment course final project.",
    problem:
      "Personal finance data becomes scattered across accounts, subscriptions, budgets, and due dates without a single control surface.",
    targetUsers: "Individual users managing personal finances",
    role: "Developer",
    contribution:
      "Designed and built the full-stack finance tracking application including deployment pipeline, database design, and responsive frontend.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Vercel"],
    status: "academic",
    statusLabel: "Academic Final Project",
    screenshot: "/assets/case-studies/finance-tracker-landing.webp",
    githubUrl: "https://github.com/ezradesmonds/FinanceTracker",
    githubLabel: "GitHub Repo",
    proofStatus: "available",
    proofArtifacts: [
      {
        src: "/assets/case-studies/finance-tracker-landing.webp",
        alt: "Finance Tracker landing page showing budget, transactions, subscriptions, and dashboard preview.",
        caption:
          "Public landing page framing the product around budgets, transactions, subscriptions, and a unified dashboard.",
      },
      {
        src: "/assets/case-studies/finance-tracker-dashboard.webp",
        alt: "Finance Tracker dashboard showing budget, expense, subscriptions, due date calendar, and upcoming bills.",
        caption:
          "Dashboard overview with monthly budget, expense progress, active subscriptions, due-date calendar, and upcoming bills.",
      },
      {
        src: "/assets/case-studies/finance-tracker-entry.webp",
        alt: "Finance Tracker expense and income entry screen with connected bank cards.",
        caption:
          "Tracking surface for connected bank cards, expense entry, income entry, payment source, and categories.",
      },
      {
        src: "/assets/case-studies/finance-tracker-subscriptions.webp",
        alt: "Finance Tracker subscription management page.",
        caption:
          "Subscription management page with active recurring payment and quick-add recommendations.",
      },
      {
        src: "/assets/case-studies/finance-tracker-calendar.webp",
        alt: "Finance Tracker due-date calendar showing subscription payment date.",
        caption:
          "Calendar view for tracking recurring bill due dates and overdue/upcoming items.",
      },
    ],
    featured: false,
    sortOrder: 12,
    detail: {
      overview:
        "A personal finance web app built as a web framework deployment final project. It centralizes budgets, expenses, income, bank-account surfaces, subscriptions, and recurring due dates.",
      keyFeatures: [
        "Budget and expense overview",
        "Income and expense entry forms",
        "Connected-bank style account cards",
        "Subscription tracking",
        "Due-date calendar",
        "Responsive finance dashboard",
      ],
      challenges: [
        "Designing multiple finance modes without making the product feel fragmented",
        "Keeping forms, charts, and calendar views readable across screen sizes",
      ],
    },
  },
];
