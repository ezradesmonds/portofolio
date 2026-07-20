import type { Project } from "../types";
import { PORTFOLIO_FACTS } from "./facts";

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
      "Mayar",
      "OpenRouter",
      "Zod",
      "Recharts",
    ],
    status: "in-development",
    statusLabel: "In Development",
    outcome:
      "Pre-launch: built the core accounting workflow, financial reports, AI assistant, a receipt-OCR prototype, and Mayar subscription surfaces.",
    screenshot: "/assets/case-studies/akun-ai-dashboard.webp",
    githubUrl: "https://github.com/ezradesmonds/SaaS_akun.ai",
    githubLabel: "GitHub Repo",
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
        src: "/assets/case-studies/akun-ai-journal.webp",
        alt: "Akun.AI transaction journal with balanced debit and credit entries and an expanded journal detail panel.",
        caption:
          "Double-entry journal workspace with balanced debit-credit validation and traceable transaction detail.",
      },
      {
        src: "/assets/case-studies/akun-ai-profit-loss.webp",
        alt: "Akun.AI profit and loss report with revenue, expenses, net profit, monthly chart, and AI insight panel.",
        caption:
          "Profit and loss report turns ledger records into a printable performance view with contextual AI insights.",
      },
      {
        src: "/assets/case-studies/akun-ai-balance-sheet.webp",
        alt: "Akun.AI balance sheet showing assets, liabilities, equity composition, and financial health indicators.",
        caption:
          "Balance sheet surfaces the accounting equation, asset composition, and financial-health indicators in one view.",
      },
      {
        src: "/assets/case-studies/akun-ai-receipt-ocr.webp",
        alt: "Akun.AI receipt scanning prototype with OCR extraction, item details, accounting category, and a draft journal entry.",
        caption:
          "Receipt-OCR prototype converts extracted merchant and line-item data into a reviewable draft transaction.",
      },
      {
        src: "/assets/case-studies/akun-ai-assistant.webp",
        alt: "Akun.AI assistant answering a monthly profit question using workspace data and preparing a transaction draft for confirmation.",
        caption:
          "Context-grounded AI assistant explains financial results and prepares drafts that still require user confirmation.",
      },
      {
        src: "/assets/case-studies/akun-ai-pricing.webp",
        alt: "Akun.AI pricing section with Free, Starter, and Pro plans.",
        caption:
          "Pricing model designed around transaction limits, AI chat limits, team access, and inventory needs.",
      },
    ],
    featured: true,
    sortOrder: 4,
    detail: {
      overview:
        "Akun.AI is a pre-launch, AI-assisted accounting SaaS for Indonesian SMEs. It combines bookkeeping workflows, an accounting assistant, automated financial reporting, and a receipt-OCR prototype that still requires production validation.",
      mySpecificBuilds: [
        "Designed the accounting workspace architecture, including chart of accounts, ledger flows, reporting surfaces, and tenant-aware data boundaries.",
        "Built the full-stack SaaS flow across onboarding, dashboard, transactions, invoices, inventory, reports, AI assistant, and subscription surfaces.",
        "Integrated the AI assistant as a grounded finance helper that reads workspace context while deterministic validation still protects saved accounting actions.",
      ],
      keyFeatures: [
        "Business onboarding and chart of accounts",
        "Double-entry accounting with validation",
        "Profit and loss reports and balance sheets",
        "CSV export and printable reports",
        "AI accounting assistant via OpenRouter",
        "Receipt OCR prototype for assisted transaction entry",
        "Team access and subscription management with Mayar",
        "Row-Level Security for data isolation",
      ],
      featureStatus: [
        {
          name: "Core bookkeeping and financial reports",
          status: "working",
          note: "Implemented across the current pre-launch workspace; production accounting and compliance behavior still need validation.",
        },
        {
          name: "AI accounting assistant",
          status: "prototype",
          note: "Connected to workspace context with deterministic validation around saved accounting actions.",
        },
        {
          name: "Receipt OCR",
          status: "prototype",
          note: "The extraction flow exists, but accuracy and failure handling are not yet production-validated.",
        },
        {
          name: "Mayar billing",
          status: "unvalidated",
          note: "Mayar is the configured billing provider; end-to-end payment and webhook reliability are not claimed here.",
        },
      ],
      challenges: [
        "Designing accounting workflows that are accessible to non-accountants",
        "Implementing double-entry validation logic that catches common errors",
        "Building AI prompts that produce reliable, audit-ready accounting responses",
      ],
      aiSystem: {
        provider: "OpenRouter-configurable LLM layer with prototype OCR ingestion for receipt capture.",
        pipeline: [
          "Business transactions, invoices, inventory changes, and prototype receipt-OCR outputs enter the ledger workspace.",
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
        "Mayar billing integration requires explicit webhook and failure-path validation",
      ],
    },
  },
  {
    slug: "tokokaret",
    title: "TokoKaret.com",
    category: "E-Commerce / Guided Product Recommendation",
    description:
      "A live commerce platform for rubber and industrial products with a guided, symptom-based consultation flow.",
    problem:
      "Industrial and rubber product buyers need guided product selection and consultation, but traditional e-commerce lacks the expertise to recommend products based on symptoms and use cases.",
    targetUsers:
      "Industrial buyers, workshops, and businesses needing rubber and industrial products",
    role: "Product builder and designer",
    contribution:
      "Designed and built the landing experience, consultation journey, marketplace pathways, and client-side symptom-to-category recommendation helper.",
    technologies: ["Astro", "TypeScript", "Tailwind CSS", "Rule-Based Recommendation"],
    status: "live",
    statusLabel: "Live",
    outcome:
      `Built for Puka Mobil, a marketplace seller that has served ${PORTFOLIO_FACTS.tokokaret.historicalCustomers.toLocaleString("en-US")}+ customers and sold approximately ${PORTFOLIO_FACTS.tokokaret.historicalMarketplaceItems.toLocaleString("en-US")} items across Shopee and Tokopedia; website-attributed conversion remains unmeasured.`,
    screenshot: "/assets/case-studies/tokokaret-landing.webp",
    liveUrl: "https://www.tokokaret.com",
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
        alt: "TokoKaret.com client-side rule and keyword recommendation form for car model and product symptom intake.",
        caption:
          "Rule-based recommendation flow: users describe symptoms and receive an initial product-category direction.",
      },
      {
        src: "/assets/case-studies/tokokaret-products.webp",
        alt: "TokoKaret.com product section showing commonly searched rubber parts.",
        caption:
          "Product discovery section connecting problem labels to specific catalog categories.",
      },
    ],
    featured: true,
    sortOrder: 1,
    detail: {
      overview:
        "TokoKaret.com is a live commerce platform bridging industrial product catalogs and informed purchase decisions. Its client-side symptom matcher gives an initial rubber-part category direction before human WhatsApp confirmation; it is not presented as a retrieval or model-backed AI system.",
      mySpecificBuilds: [
        "Built the live Astro storefront, product-first landing sections, consultation CTAs, and mobile-first buyer journey.",
        "Built the structured intake flow that maps car model and symptom keywords to a constrained product-category direction.",
        "Connected the guidance flow to WhatsApp so final compatibility confirmation still uses human review and photo evidence.",
      ],
      keyFeatures: [
        "Conversion-focused landing experience",
        "Client-side symptom-to-category recommendation helper",
        "WhatsApp and marketplace sales pathway integration",
        "Customer consultation journey with structured intake",
        "Responsive design optimized for mobile-first Indonesian users",
      ],
      challenges: [
        "Translating technical industrial product specifications into accessible user-facing recommendations",
        "Constraining recommendations to product categories without overclaiming exact part compatibility",
        "Integrating guided recommendations with offline sales workflows",
      ],
      aiSystem: {
        provider: "Client-side keyword and category matching; no active retrieval backend or model call is claimed.",
        pipeline: [
          "User enters car model plus complaint or use case in a structured form.",
          "The browser matches the input against constrained symptom and category keywords.",
          "The helper maps symptoms to likely product categories instead of claiming a guaranteed SKU match.",
          "Sales follow-up uses the suggestion plus photo verification for final product matching.",
        ],
        dataFlow:
          "Form input stays in the client-side flow: model and symptom keywords guide a category suggestion and WhatsApp handoff.",
        validation:
          "The helper is intentionally positioned as initial guidance; final size/type confirmation happens through human consultation and photo evidence.",
        failureHandling:
          "When no constrained match is available, the interface pushes the user to continue consultation rather than overclaiming a product fit.",
        limitations:
          "The keyword helper recommends categories, not guaranteed part compatibility. Physical photo confirmation remains necessary, and website-attributed conversion is not yet measured.",
      },
      results:
        `The storefront supports Puka Mobil, a marketplace seller that has served ${PORTFOLIO_FACTS.tokokaret.historicalCustomers.toLocaleString("en-US")}+ customers and sold approximately ${PORTFOLIO_FACTS.tokokaret.historicalMarketplaceItems.toLocaleString("en-US")} items across Shopee and Tokopedia. These are business-history figures, not website-attributed results.`,
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
    featured: false,
    sortOrder: 3,
    detail: {
      overview:
        "FinanceOS is a financial research terminal for systematic market analysis using public Binance data. It supports scheduled scanning, signal generation, dry-run trade execution, and performance analytics — all in a structured research environment. This is a research and analysis system, not a live trading platform.",
      mySpecificBuilds: [
        "Designed the terminal interface for active signals, detail panels, provider status, news ingestion, and paper lifecycle tracking.",
        "Built the research-only signal workflow around public market data, scoring factors, invalidation notes, and dry-run execution states.",
        "Kept the system deliberately disconnected from wallets, brokers, exchange keys, and live orders so it remains analysis-only.",
      ],
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
          "Research-only, dry-run, no live trading, no exchange keys, not financial advice. No wallet, broker, exchange key, or live financial execution is connected.",
      },
    },
  },
  {
    slug: "tailor-cooperative-system",
    title: "SAKTI — ML-Assisted Tailor Allocation & Cooperative Management System",
    category: "ML-Assisted Decision Support / Cooperative Operations",
    description:
      "A data-driven decision-support platform designed to improve workload allocation, inventory visibility, and operational coordination for a tailor cooperative.",
    problem:
      "Administrators distributed orders across a large tailor network using memory, personal familiarity, and manual communication, creating uneven workloads, limited inventory visibility, and pressure during bulk orders.",
    targetUsers: "Cooperative administrators and managers; member tailors are the primary beneficiaries",
    role: "ML workflow, allocation logic, full-stack development, data visualization, and presentation",
    contribution:
      "Translated the operational problem into a functional decision-support prototype spanning ML-assisted profiling, adaptive allocation logic, integrated operational data, Streamlit interfaces, and visual analytics.",
    technologies: ["Python", "Streamlit", "Scikit-learn", "Pandas", "NumPy", "SQLite"],
    status: "competition",
    statusLabel: "Competition — 2nd Place",
    outcome:
      "2nd Place — PCU × SUTD GEO 2026; functional prototype presented with Koperasi Sumber Mulia Barokah as the industry partner.",
    screenshot: "/assets/case-studies/tailor-allocation.webp",
    githubUrl: "https://github.com/ezradesmonds/SAKTIkoperasiapp",
    githubLabel: "Canonical Project Repo",
    githubLinks: [
      {
        label: "Canonical Project Repo",
        url: "https://github.com/ezradesmonds/SAKTIkoperasiapp",
      },
      {
        label: "ML Component Repo",
        url: "https://github.com/ezradesmonds/AI_tailor_smart_allocator",
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
    sortOrder: 2,
    detail: {
      overview:
        "SAKTI is an ML-assisted tailor allocation and cooperative management platform developed during GEO 2026, a collaborative program between Petra Christian University and the Singapore University of Technology and Design. Created with Koperasi Sumber Mulia Barokah, the functional prototype combines tailor profiling, context-aware recommendation logic, live workload checks, inventory management, project tracking, purchasing, production monitoring, wages, and operational analytics.",
      metrics: [
        { value: "2nd", label: "Place at GEO 2026" },
        { value: "100+", label: "Tailor partner network" },
        { value: "3", label: "Recommendation layers" },
        { value: "6", label: "Multidisciplinary students" },
      ],
      mySpecificBuilds: [
        "Prepared and processed tailor performance data for the ML-assisted profiling workflow.",
        "Developed the adaptive allocation and workload-balancing logic, then integrated recommendations with operational project data.",
        "Built prototype interfaces and operational visualizations using Python and Streamlit.",
        "Created the persona, journey map, storyboard, Value Proposition Canvas, and Business Model Canvas that shaped the product direction.",
        "Translated the technical logic into a business-oriented presentation and defended the solution during final evaluation.",
      ],
      productDiscovery: {
        problemStatement:
          "How might we distribute each project across available tailors so the cooperative can improve production efficiency while responding to order urgency and quantity?",
        hypothesis:
          "If the system combines historical performance profiles with order context and current workload, admins can move from memory-based assignment toward faster, fairer, and more explainable decisions.",
        persona: {
          name: "Primary User",
          role: "Cooperative Operations Administrator",
          context:
            "Responsible for incoming orders, tailor allocation, inventory visibility, production monitoring, and deadline coordination across a large partner network.",
          pains: [
            "Unfair workload distribution and bottlenecks around favorite tailors",
            "Difficulty remembering individual speed, neatness, and availability",
            "No integrated view of active work and leftover material",
            "Missed deadlines and high manual coordination overhead",
          ],
          goals: [
            "Efficient and fair allocation",
            "Data-driven decision support",
            "Real-time production and inventory visibility",
            "Less manual managerial work",
          ],
        },
        journey: [
          {
            stage: "Receive a bulk order",
            friction: "The admin accepts a high-volume request without an immediate capacity view.",
            response: "Capture category, quantity, and deadline as structured allocation inputs.",
          },
          {
            stage: "Check material readiness",
            friction: "Leftover fabric is tracked manually and may become ghost inventory.",
            response: "Surface stock, purchases, and material requirements in the same management system.",
          },
          {
            stage: "Distribute the workload",
            friction: "The admin must remember who is fast, neat, nearby, and currently free.",
            response: "Rank tailors through profiling, context-aware weights, logistics rules, and live status.",
          },
          {
            stage: "Track production",
            friction: "Active jobs and deadlines are scattered across messages and manual notes.",
            response: "Connect assignments to progress, status, and operational dashboards.",
          },
          {
            stage: "Close and recycle capacity",
            friction: "Finished work and leftover material are difficult to reconcile for the next order.",
            response: "Return completed tailors to the available pool and update remaining stock.",
          },
        ],
        valueProposition: {
          customerJobs: ["Manage bulk orders", "Control inventory", "Distribute workloads", "Monitor progress"],
          pains: ["Human-memory dependency", "Uneven assignments", "Ghost inventory", "Production bottlenecks"],
          gains: ["Fair allocation", "Faster decisions", "Visible capacity", "Managerial automation"],
          productsAndServices: ["Smart Tailor Allocation System", "Integrated cooperative dashboard"],
          painRelievers: ["ML-based tailor profiling", "Live workload checks", "Inventory and progress records"],
          gainCreators: ["Specialization-aware matching", "Adaptive scoring", "System-driven operations"],
        },
        businessModel: [
          {
            label: "Customer segments",
            items: ["Tailor cooperatives", "Cooperative admins and managers", "Member tailors", "Bulk uniform buyers"],
          },
          {
            label: "Value propositions",
            items: ["Fair workload distribution", "Deadline-adaptive recommendations", "Integrated production and stock visibility"],
          },
          {
            label: "Key resources",
            items: ["Curated tailor profiles", "Allocation logic", "Python, Streamlit, SQLite, and scikit-learn"],
          },
          {
            label: "Key activities",
            items: ["Tailor profiling", "Algorithmic assignment", "Inventory tracking", "Production and wage monitoring"],
          },
          {
            label: "Partners & channels",
            items: ["Fabric suppliers", "Tailor communities", "Institutions placing bulk orders", "Web-based office dashboard"],
          },
          {
            label: "Cost structure",
            items: ["Hosting and maintenance", "Tailor skill-data updates", "Operational inventory data entry"],
          },
        ],
      },
      featureStatus: [
        {
          name: "Smart tailor profiling",
          status: "prototype",
          note: "Historical speed, neatness, punctuality, distance, and related attributes inform operational clusters.",
        },
        {
          name: "Context-aware allocation scoring",
          status: "prototype",
          note: "Urgent orders weight speed at 70%; relaxed orders shift emphasis toward neatness at 40%.",
        },
        {
          name: "Distance-aware logistics",
          status: "prototype",
          note: "Small orders under 20 pieces favor nearby tailors, while orders over 50 pieces tolerate more distance for production efficiency.",
        },
        {
          name: "Real-time load balancing",
          status: "prototype",
          note: "Busy tailors remain visible but receive a strong ranking penalty so idle candidates rise first.",
        },
        {
          name: "Split-order fallback",
          status: "prototype",
          note: "The system can simulate splitting work when one tailor cannot safely meet the required capacity.",
        },
      ],
      keyFeatures: [
        "Smart tailor-allocation workflow",
        "Operational dashboard for cooperative managers",
        "Tailor, stock, supplier, and purchase management modules",
        "Cooperative operational workflow automation",
        "User persona, journey, and value-proposition artifacts",
      ],
      challenges: [
        "Cleaning and structuring cooperative tailor data before feature engineering",
        "Integrating clustering output into practical work-allocation workflows",
        "Coordinating across multidisciplinary team members (Business, Architecture, International Business)",
      ],
      aiSystem: {
        provider:
          "A three-layer decision system: unsupervised tailor profiling, adaptive rule-based scoring, and database-backed workload balancing inside a Streamlit prototype.",
        pipeline: [
          "Layer 1 - Smart profiling: clean historical data and cluster tailors by speed, neatness, punctuality, distance, specialty, and related performance patterns.",
          "Layer 2 - Adaptive scoring: translate category, quantity, and deadline into changing weights; urgent work emphasizes speed, while relaxed work gives neatness more influence.",
          "Layer 2 - Logistics context: favor nearby tailors for small jobs and accept more distance for large-volume work where transport can be consolidated.",
          "Layer 3 - Load balancing: check active assignments in operational data and apply a strong busy penalty without hiding candidates.",
          "Rank the complete candidate list, calculate target output per day, and simulate split-order alternatives when single-tailor capacity is unsafe.",
        ],
        dataFlow:
          "Tailor history produces reusable profiles; the current order adds urgency, quantity, category, and logistics context; live assignment data then adjusts the final ranking shown in the cooperative dashboard.",
        validation:
          "Recommendations are checked against deadline math, required daily output, capacity, current status, specialty, distance, and cluster-based feasibility signals. The ranked list stays visible so an admin can review the reasoning rather than accept a hidden decision.",
        failureHandling:
          "Busy tailors are deprioritized rather than deleted, preserving admin override options. When no single tailor is enough, the system proposes a custom split order instead of forcing one assignment.",
        limitations:
          "Competition prototype using an academic dataset whose raw, cleaned, and model-used row counts are not claimed here. The allocation logic needs real-world feedback before it can claim production-grade accuracy.",
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
    featured: false,
    sortOrder: 5,
    detail: {
      overview:
        "FinLend is an academic AI credit-intelligence project built with a Laravel interface and a FastAPI AI engine. It turns 25 structured applicant signals into a credit-risk recommendation using a feedforward neural network and fuzzy logic decision layer.",
      mySpecificBuilds: [
        "Built the Laravel multi-step credit application interface and connected it to the FastAPI AI engine.",
        "Mapped the 25-feature dataset structure into a web form, request payload, risk model input, and readable recommendation output.",
        "Combined neural-network risk scoring with fuzzy logic so the product can explain credit decisions as limit and interest recommendations.",
      ],
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
    category: "Interactive Health Education Platform",
    description:
      "A live, cinematic bone-health education platform built with Vite, Three.js, GSAP, and custom WebGL shaders, with an adapted OKAT quiz, persistent habit tracking, and embedded campaign media.",
    problem:
      "The pharmacy student client needed a clear, interactive platform to communicate a bone-health intervention design instead of relying on static tables or slides.",
    targetUsers: "Pharmacy students, academic supervisors, and health-promotion presentation audiences",
    role: "Client project developer",
    contribution:
      "Rebuilt the original static microsite as a modular Vite application, authored the Three.js particle scene and custom GLSL shaders, orchestrated cinematic scroll scenes with GSAP, and implemented the quiz, persistent habit trackers, simulator, and campaign-media workflows.",
    technologies: ["Vite", "Three.js", "GSAP", "GLSL Shaders", "Modular JavaScript", "LocalStorage"],
    status: "live",
    statusLabel: "Live Client Project",
    outcome:
      "Delivered a live, responsive educational platform that combines campaign storytelling, a working 12-item assessment, on-device habit tracking, simulation, and multimedia resources without requiring a backend.",
    screenshot: "/assets/case-studies/bank-tulang-landing-2026.png",
    liveUrl: "https://ezradesmonds.github.io/BankTulang/",
    githubUrl: "https://github.com/ezradesmonds/BankTulang",
    githubLabel: "GitHub Repo",
    proofStatus: "available",
    proofArtifacts: [
      {
        src: "/assets/case-studies/bank-tulang-landing-2026.png",
        alt: "Bank Tulang live landing page with a particle-rendered spine and bone-health campaign call to action.",
        caption:
          "Cinematic landing experience with a real-time Three.js particle spine and direct paths into the assessment and simulator.",
      },
      {
        src: "/assets/case-studies/bank-tulang-simulator-2026.png",
        alt: "Bank Tulang simulator showing knowledge, calcium, and activity controls beside a calculated index.",
        caption:
          "Interactive simulator that combines the user's current quiz score and saved habits with adjustable what-if controls.",
      },
      {
        src: "/assets/case-studies/bank-tulang-activity-2026.png",
        alt: "Bank Tulang activity signal section with an animated particle bone scene and weekly session count.",
        caption:
          "Scroll-directed Three.js storytelling connects each health signal to live data stored on the user's device.",
      },
      {
        src: "/assets/case-studies/bank-tulang-education-2026.png",
        alt: "Bank Tulang education library with booklet, audio, video, infographic, and event poster media.",
        caption:
          "Responsive media library previews the campaign booklet, infographic, poster, audio, and educational video.",
      },
      {
        src: "/assets/case-studies/bank-tulang-quiz-2026.png",
        alt: "Bank Tulang adapted OKAT assessment with twelve true, false, and don't know questions.",
        caption:
          "Working 12-item adapted OKAT assessment with saved answers and automatic educational score interpretation.",
      },
    ],
    featured: false,
    sortOrder: 12,
    detail: {
      overview:
        "Bank Tulang is a live educational campaign platform rebuilt from a simple static microsite into a modular Vite application. Custom GLSL shaders render its Three.js particle bones while GSAP coordinates the cinematic scroll scenes; the same application delivers a working assessment, persistent habit logs, a what-if simulator, and the client's multimedia education materials.",
      keyFeatures: [
        "Three.js particle-bone renderer using custom GLSL vertex and fragment shaders",
        "Cinematic health-signal scenes synchronized with GSAP ScrollTrigger",
        "Modular ES-module architecture for scenes, state, tools, simulator, modal, and media",
        "12-item adapted OKAT assessment with automatic interpretation",
        "Calcium intake and weight-bearing activity logs persisted in localStorage",
        "What-if simulator combining knowledge, calcium, and activity inputs",
        "Embedded booklet, infographic, poster, campaign audio, and educational video",
      ],
      challenges: [
        "Turning academic intervention tables into a website that feels credible and readable",
        "Keeping the product educational without implying medical diagnosis",
        "Balancing a GPU-rendered cinematic experience with responsive performance, healthcare clarity, and accessibility",
      ],
      results:
        "Shipped the redesigned experience to the existing public URL as a backend-free Vite application with device-local persistence.",
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
      `A full-stack event platform supporting ${PORTFOLIO_FACTS.innofashion.competitionRegistrations} competition registrations, ${PORTFOLIO_FACTS.innofashion.competitionApproved} approved competition participants, and ${PORTFOLIO_FACTS.innofashion.eventParticipants} event participants.`,
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
      `Supported ${PORTFOLIO_FACTS.innofashion.competitionRegistrations} competition registrations, ${PORTFOLIO_FACTS.innofashion.competitionApproved} approved competition participants, and ${PORTFOLIO_FACTS.innofashion.eventParticipants} event participants; QR attendance recorded ${PORTFOLIO_FACTS.innofashion.eventCheckIns.join(", ")} check-ins across three events.`,
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
    sortOrder: 3,
    detail: {
      overview:
        "A custom full-stack event management platform built for the Innofashion Show 8, a major student-run event. The system handled participant registration, QR-based ticketing, admin dashboards, and real-time event operations.",
      mySpecificBuilds: [
        "Led the IT division and coordinated technical delivery across registration, dashboard, validation, and event-day workflows.",
        "Built and integrated participant registration, competition/event flows, QR ticketing, admin statistics, and validation surfaces.",
        "Managed deployment and event-day support across competition, registration, validation, and QR attendance workflows.",
      ],
      metrics: [
        { value: String(PORTFOLIO_FACTS.innofashion.competitionRegistrations), label: "Competition registrations" },
        { value: String(PORTFOLIO_FACTS.innofashion.competitionApproved), label: "Approved competition participants" },
        { value: String(PORTFOLIO_FACTS.innofashion.eventParticipants), label: "Event participants" },
        {
          value: PORTFOLIO_FACTS.innofashion.eventCheckIns.join(" / "),
          label: "QR check-ins by event",
          context: "Attendance records across three events; not a unique-person total.",
        },
      ],
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
        `The platform recorded ${PORTFOLIO_FACTS.innofashion.competitionRegistrations} competition registrations, ${PORTFOLIO_FACTS.innofashion.competitionApproved} approvals, and ${PORTFOLIO_FACTS.innofashion.eventParticipants} event participants. QR attendance logs recorded ${PORTFOLIO_FACTS.innofashion.eventCheckIns.join(", ")} check-ins across three events.`,
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
    role: "Backend-Focused Full-Stack Developer, Product Designer & Business Architect",
    contribution:
      "Owned the Laravel backend, contributed to the React Native frontend, and co-created the product and business design with the group, including user personas, customer journeys, competitor analysis, Figma prototyping, the Business Model Canvas, financial modelling, and IRR validation.",
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
    featured: false,
    sortOrder: 8,
    detail: {
      overview:
        "Servisin is a mobile marketplace MVP connecting customers with home-appliance repair technicians. The platform handles customer requests, technician matching, service tracking, and administrative workflows.",
      mySpecificBuilds: [
        "Designed the marketplace flow from customer onboarding, service discovery, booking navigation, technician profile, transaction detail, and subscription surface.",
        "Planned backend/admin architecture, technician workflow, and service-operation process for the MVP.",
        "Built the business model, financial assumptions, and IRR validation used in the Technopreneur final project.",
      ],
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
    category: "Laravel Full-Stack / Web Framework Deployment Final Project",
    description:
      "A Laravel personal finance tracking and management web application built with modern deployment practices. Built as a Web Framework Deployment course final project.",
    problem:
      "Personal finance data becomes scattered across accounts, subscriptions, budgets, and due dates without a single control surface.",
    targetUsers: "Individual users managing personal finances",
    role: "Developer",
    contribution:
      "Designed and built the Laravel full-stack finance tracking application including deployment pipeline, database design, Blade views, and responsive frontend.",
    technologies: ["Laravel", "PHP", "Blade", "Tailwind CSS", "MySQL"],
    status: "academic",
    statusLabel: "Academic Final Project",
    screenshot: "/assets/case-studies/finance-tracker-landing.webp",
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
    sortOrder: 6,
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
