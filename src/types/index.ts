export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  problem: string;
  targetUsers: string;
  role: string;
  contribution: string;
  technologies: string[];
  status: "live" | "in-development" | "prototype" | "academic" | "competition" | "case-study";
  statusLabel: string;
  outcome?: string;
  screenshot?: string;
  liveUrl?: string;
  githubUrl?: string;
  githubLabel?: string;
  githubLinks?: ProjectLink[];
  githubIsGeneric?: boolean;
  proofStatus?: "available" | "partial" | "pending";
  proofArtifacts?: ProjectArtifact[];
  featured: boolean;
  sortOrder: number;
  detail?: ProjectDetail;
}

export interface ProjectLink {
  url: string;
  label: string;
  isGeneric?: boolean;
}

export interface ProjectArtifact {
  src: string;
  alt: string;
  caption: string;
  kind?: "image" | "video";
  poster?: string;
}

export interface ProjectDetail {
  overview: string;
  mySpecificBuilds?: string[];
  metrics?: ProjectMetric[];
  featureStatus?: ProjectFeatureStatus[];
  constraints?: string;
  productStrategy?: string;
  userFlow?: string;
  systemArchitecture?: string;
  productDiscovery?: ProjectProductDiscovery;
  aiSystem?: ProjectAiSystem;
  keyFeatures: string[];
  implementation?: string;
  challenges?: string[];
  results?: string;
  lessonsLearned?: string[];
  relatedProjects?: string[];
}

export interface ProjectProductDiscovery {
  problemStatement: string;
  hypothesis: string;
  persona: {
    name: string;
    role: string;
    context: string;
    pains: string[];
    goals: string[];
  };
  journey: Array<{
    stage: string;
    friction: string;
    response: string;
  }>;
  valueProposition: {
    customerJobs: string[];
    pains: string[];
    gains: string[];
    productsAndServices: string[];
    painRelievers: string[];
    gainCreators: string[];
  };
  businessModel: Array<{
    label: string;
    items: string[];
  }>;
}

export interface ProjectMetric {
  value: string;
  label: string;
  context?: string;
}

export interface ProjectFeatureStatus {
  name: string;
  status: "working" | "prototype" | "planned" | "unvalidated";
  note?: string;
}

export interface ProjectAiSystem {
  pipeline: string[];
  provider?: string;
  dataFlow?: string;
  validation?: string;
  failureHandling?: string;
  limitations?: string;
}

export interface Experience {
  organization: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  skills?: string[];
}

export interface Award {
  title: string;
  event: string;
  year: string;
  description: string;
  category: "engineering" | "creative" | "academic";
}

export interface CapabilityGroup {
  name: string;
  items: {
    name: string;
    description?: string;
  }[];
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
  cvUrl: string;
  headline: string;
  subheadline: string;
  availabilityMessage: string;
}
