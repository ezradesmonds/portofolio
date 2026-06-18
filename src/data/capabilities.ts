import type { CapabilityGroup } from "../types";

export const capabilities: CapabilityGroup[] = [
  {
    name: "Product Engineering",
    items: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Astro" },
      { name: "Tailwind CSS" },
      { name: "Responsive UI engineering" },
      { name: "Component architecture" },
    ],
  },
  {
    name: "Backend & Data",
    items: [
      { name: "Laravel" },
      { name: "PHP" },
      { name: "Supabase" },
      { name: "PostgreSQL" },
      { name: "SQL" },
      { name: "REST APIs" },
      { name: "Authentication & authorization" },
      { name: "Row-Level Security" },
    ],
  },
  {
    name: "AI & Data",
    items: [
      { name: "Python" },
      { name: "Machine learning" },
      { name: "LLM integration" },
      { name: "OpenRouter" },
      { name: "Google Gemini integration" },
      { name: "OCR workflows" },
      { name: "Data analysis" },
    ],
  },
  {
    name: "Engineering Tools",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "Vercel" },
      { name: "Deployment workflows" },
    ],
  },
  {
    name: "Other Languages & Academic Foundations",
    items: [{ name: "Java" }, { name: "C++" }, { name: "R" }],
  },
];
