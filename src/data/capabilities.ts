import type { CapabilityGroup } from "../types";

export const capabilities: CapabilityGroup[] = [
  {
    name: "Product Engineering",
    items: [
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Astro", icon: "astro" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Responsive UI engineering", icon: "css3" },
      { name: "Component architecture", icon: "react" },
    ],
  },
  {
    name: "Backend & Data",
    items: [
      { name: "Laravel", icon: "laravel" },
      { name: "PHP", icon: "php" },
      { name: "Supabase", icon: "supabase" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "SQL", icon: "postgresql" },
      { name: "REST APIs", icon: "postman" },
      { name: "Authentication & authorization", icon: "auth0" },
      { name: "Row-Level Security", icon: "supabase" },
    ],
  },
  {
    name: "AI & Data",
    items: [
      { name: "Python", icon: "python" },
      { name: "Machine learning", icon: "scikitlearn" },
      { name: "LLM integration", icon: "openai" },
      { name: "OpenRouter", icon: "openrouter" },
      { name: "Google Gemini integration", icon: "googlegemini" },
      { name: "OCR workflows", icon: "googlecloud" },
      { name: "Data analysis", icon: "pandas" },
    ],
  },
  {
    name: "Engineering Tools",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Docker", icon: "docker" },
      { name: "Vercel", icon: "vercel" },
      { name: "Deployment workflows", icon: "githubactions" },
    ],
  },
  {
    name: "Other Languages & Academic Foundations",
    items: [
      { name: "Java", icon: "openjdk" },
      { name: "C++", icon: "cplusplus" },
      { name: "R", icon: "r" },
    ],
  },
];
