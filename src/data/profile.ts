import certGenAi from "@/assets/cert-genai-microsoft-linkedin.png";
import certPromptEngineering from "@/assets/cert-prompt-engineering-udemy.png";
import certDataViz from "@/assets/cert-data-visualization-slu.png";
import certDataScience from "@/assets/cert-datascience-masterclass-pantech.png";
import certAppreciation from "@/assets/cert-appreciation-mouritech.png";
import certDataAnalytics from "@/assets/cert-data-analytics-pantech.png";
import leaderboard from "@/assets/leaderboard.png";

export const profile = {
  name: "Bhanu Prakash Reddy",
  fullName: "Bhanu Prakash Reddy Vellala Linga",
  title: "Technical Consultant",
  subtitle: "Agentic AI, RAG and LLM systems",
  tagline:
    "I build enterprise AI that actually ships: LLM agents, multi-agent systems and RAG pipelines that let people ask questions of their own company data.",
  location: "Hyderabad, Telangana, India",
  email: "vellalabhanuprakashreddy@gmail.com",
  phone: "+91 99850 02532",
  linkedin: "https://www.linkedin.com/in/bhanu-prakash-reddy-vellala-linga",
  github: "https://github.com/Bhanuvellala",
  /** No personal site right now. Empty hides the Site link in the contact row and footer. */
  personalSite: "",
  /** Add your public profile URL when ready; left empty so the site does not link to someone else's handle. */
  instagram: "",
  /** Hosted PDF in `public/`. If empty, the Resume control falls back to email. */
  resumeUrl: "/resume.pdf",
  bio: `I'm a Generative AI engineer with just over two years spent building enterprise AI applications that run in production rather than in notebooks. Most of that work has been LLM agents, RAG and multi-agent systems in Python and FastAPI, on Azure OpenAI with Semantic Kernel and LangChain. Day to day that means vector embeddings, hybrid search, prompt engineering, the occasional fine-tune, and enough observability to notice when a model starts drifting. So far it has shipped for content, finance, manufacturing and medical teams, covering about a million digital assets and roughly a hundred business users who can now query their own data without writing SQL.`,
  metrics: [
    { value: "2+", label: "Years in Applied AI" },
    { value: "6", label: "Production AI Apps" },
    { value: "100+", label: "Business Users Served" },
  ],
};

export const skills = [
  {
    category: "Generative AI & LLMs",
    items: [
      "Azure OpenAI",
      "OpenAI GPT-4",
      "AWS Bedrock",
      "Gemini",
      "RAG",
      "Agentic RAG",
      "Multi-Agent Systems",
      "LLM Fine-tuning",
      "Prompt Engineering",
    ],
  },
  {
    category: "AI Frameworks",
    items: ["Semantic Kernel", "LangChain", "Google ADK", "PromptFlow"],
  },
  {
    category: "Programming & APIs",
    items: ["Python", "FastAPI", "REST APIs", "Async Processing", "Pydantic", "ReactJS", "TypeScript"],
  },
  {
    category: "Databases & Vector Stores",
    items: [
      "SQL Server",
      "PostgreSQL",
      "MongoDB",
      "Azure Cosmos DB",
      "Pinecone",
      "ChromaDB",
      "Vector Embeddings",
    ],
  },
  {
    category: "Search & Cloud",
    items: [
      "Azure AI Search",
      "AWS OpenSearch",
      "Elasticsearch",
      "Azure Functions",
      "Logic Apps",
      "Azure AI Foundry",
      "Docker",
      "CI/CD",
    ],
  },
  {
    category: "Observability & Tools",
    items: [
      "PromptFlow",
      "Azure Monitor",
      "LLM Evaluation",
      "Token Optimization",
      "Git",
      "GitHub Copilot",
      "VS Code",
    ],
  },
];

export const projects = [
  {
    title: "Multi-Legal Alt Text Generation Platform",
    domain: "Content",
    description:
      "Connects Azure OpenAI to Bynder DAM to write legally compliant alt-text for over a million enterprise images in 10+ languages. The heavy lifting is a FastAPI batch pipeline with async job queuing, which is what keeps throughput sane at that volume. Content teams get a React and TypeScript dashboard to watch the queue, read what the model wrote and approve it before anything goes back to the DAM.",
    stack: ["FastAPI", "ReactJS", "Azure OpenAI", "Cosmos DB", "Docker", "Bynder DAM"],
    impact: "Saves roughly 2,500 hours of manual tagging a year. Review cycles got 60% shorter.",
    accent: "from-primary to-secondary",
  },
  {
    title: "Finance AI Agent",
    domain: "Finance",
    description:
      "A chat agent on Semantic Kernel and Azure OpenAI that writes the SQL so the finance team does not have to. Over a hundred non-technical users ask about revenue, invoices and payments in plain English. It holds context across a conversation and builds queries against both SQL Server and PostgreSQL, which covers invoice tracking, payment monitoring and the reporting that used to land on an analyst's desk.",
    stack: ["Semantic Kernel", "FastAPI", "Azure OpenAI", "SQL Server", "PostgreSQL", "Cosmos DB"],
    impact: "Financial reporting went from several hours to under two minutes.",
    accent: "from-secondary to-accent",
  },
  {
    title: "AI Sales Cross-Reference Copilot",
    domain: "Manufacturing",
    description:
      "Sales reps had to cross-reference thousands of SKUs and price them sensibly. This compares products, finds substitutes and suggests pricing, using Azure AI Search for semantic retrieval over a Snowflake feed of live catalog data. The React dashboard takes plain-language searches and shows what is behind each suggestion.",
    stack: ["Semantic Kernel", "Azure OpenAI", "Azure AI Search", "Snowflake", "React"],
    impact: "Cut product lookup time in half for the sales team.",
    accent: "from-accent to-primary",
  },
  {
    title: "Handwriting Extraction Automation",
    domain: "Medical",
    description:
      "Clinical notes arrive handwritten, as email attachments and scans. This reads them with Azure OpenAI multimodal models and writes structured, EHR-ready records to Blob Storage. Logic Apps and Function Apps handle ingestion on a trigger, so nobody has to start a job by hand.",
    stack: ["Azure OpenAI", "Logic Apps", "Function App", "Blob Storage"],
    impact: "Cut manual data entry by about 80%.",
    accent: "from-primary to-accent",
  },
  {
    title: "Smart Gen AI Studio",
    domain: "AI COE",
    description:
      "A RAG platform that points hybrid semantic search at SharePoint and the other places enterprise knowledge ends up. Azure OpenAI and AWS Bedrock are swappable backends, and simple questions get routed to the cheaper model instead of the expensive one.",
    stack: ["Azure OpenAI", "AWS Bedrock", "Azure AI Search", "AWS OpenSearch", "FastAPI"],
    impact: "Knowledge retrieval precision up 38%.",
    accent: "from-secondary to-primary",
  },
  {
    title: "AI Document Summarization",
    domain: "Marketing",
    description:
      "A small async microservice on Azure AI Foundry that summarizes long business documents the moment they are uploaded, so whoever has to read them does not start with the full report.",
    stack: ["Azure AI Foundry", "FastAPI", "Azure Function App"],
    impact: "Report review time down 70%.",
    accent: "from-accent to-secondary",
  },
];

export type ExperienceEntry = {
  role: string;
  company: string;
  location: string;
  period: string;
  type: "work" | "education";
  highlights: string[];
  /** Internal org placement, shown on the featured current role only. */
  department?: string;
  practice?: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Technical Consultant",
    company: "MOURI Tech Ltd (client: Stanley Black & Decker, USA)",
    location: "Hyderabad, India",
    period: "May 2024 - Present",
    type: "work",
    department: "Applied AI",
    practice: "Enterprise AI",
    highlights: [
      "Designed and shipped six AI applications now running in production, built on LLMs, agentic RAG and multi-agent systems with Azure OpenAI, for content, finance, manufacturing and medical teams.",
      "Built the RAG pipelines behind them using hybrid search over vector embeddings, which pushed retrieval accuracy up 42% and brought inference latency down 35%.",
      "Got compute costs down 28% by tightening token usage, moving work to async processing and caching what did not need recomputing.",
      "Added PromptFlow and Azure Monitor so we could evaluate the models properly and watch workflows in real time instead of guessing.",
    ],
  },
  {
    role: "Chief Executive Committee Member",
    company: "We Are with You Charitable Trust",
    location: "YSR Kadapa, Andhra Pradesh, India",
    period: "Mar 2023 - Present",
    type: "work",
    highlights: [
      "Help run strategy and day-to-day operations for the trust's community programs.",
      "Build the partnerships that let those programs reach more people and keep going.",
    ],
  },
  {
    role: "Data Analyst (winter internship)",
    company: "PrepInsta",
    location: "Noida, Uttar Pradesh, India",
    period: "Jan 2024 - Mar 2024",
    type: "work",
    highlights: [
      "Cleaned and restructured messy datasets with Python and SQL so they were usable for analysis.",
      "Worked through projects turning raw exports into something a team could actually query.",
    ],
  },
  {
    role: "AI & Data Analysis Intern",
    company: "Pantech ProEd Pvt Ltd",
    location: "Chennai, Tamil Nadu, India",
    period: "Nov 2023 - Apr 2024",
    type: "work",
    highlights: [
      "Training program covering AI fundamentals, machine learning and neural networks.",
      "A lot of Python and data analysis practice on projects that changed scope often.",
    ],
  },
  {
    role: "Data Analyst Intern",
    company: "Excelerate",
    location: "Remote (United States)",
    period: "Aug 2023 - Sep 2023",
    type: "work",
    highlights: [
      "Dug through Facebook ad campaign data to find where spend was being wasted.",
      "Reported what I found as dashboards the campaign team could check themselves.",
    ],
  },
  {
    role: "Former President",
    company: "We Are with You Charitable Trust",
    location: "YSR Kadapa, Andhra Pradesh, India",
    period: "Nov 2021 - Mar 2023",
    type: "work",
    highlights: [
      "Organized events and pulled together resources for projects the area actually needed.",
      "Grew the volunteer base and set up the collaborations that kept projects running.",
    ],
  },
  {
    role: "B.Tech, Electrical & Electronics Engineering",
    company: "Annamacharya Institute of Technology & Sciences",
    location: "YSR Kadapa, Andhra Pradesh, India",
    period: "2019 - 2023",
    type: "education",
    highlights: [
      "Bachelor of Technology in Electrical & Electronics Engineering.",
      "Taught myself Python, machine learning and cloud development alongside the coursework.",
    ],
  },
  {
    role: "Intermediate, MPC",
    company: "Sri Chaitanya College of Education",
    location: "Andhra Pradesh, India",
    period: "Jun 2017 - Apr 2019",
    type: "education",
    highlights: [
      "Mathematics, Physics and Chemistry, the standard track into engineering.",
    ],
  },
  {
    role: "High School",
    company: "Indus English Medium High School",
    location: "Andhra Pradesh, India",
    period: "Jun 2016 - Mar 2017",
    type: "education",
    highlights: [
      "Finished secondary school with a focus on maths and science.",
    ],
  },
];

export const achievements = [
  {
    title: "42% better retrieval accuracy",
    detail: "From moving the production RAG pipelines to hybrid search over vector embeddings. Inference latency dropped 35% at the same time.",
  },
  {
    title: "28% lower compute cost",
    detail: "Token usage, async processing and caching, tuned across every enterprise deployment.",
  },
  {
    title: "A million assets tagged",
    detail: "Alt-text in 10+ languages, replacing about 2,500 hours of manual tagging a year.",
  },
  {
    title: "100+ people off SQL",
    detail: "The finance agent writes the query now. Reporting that took hours takes under two minutes.",
  },
];


export const certifications = [
  {
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    date: "Nov 2024",
    detail: "Learning path on generative AI, applied AI and computer ethics.",
    image: certGenAi,
  },
  {
    title: "Prompt Engineering for Developers",
    issuer: "Udemy",
    date: "Jan 2025",
    detail: "Prompt design and evaluation patterns for building on top of LLMs.",
    image: certPromptEngineering,
  },
  {
    title: "Certificate of Appreciation, Q1 2025",
    issuer: "MOURI Tech",
    date: "May 2025",
    detail: "Recognition for exemplary contribution to Advanced Analytics.",
    image: certAppreciation,
  },
  {
    title: "Data Visualization Virtual Internship",
    issuer: "Saint Louis University & Excelerate",
    date: "Sep 2023",
    detail: "Four-week program turning raw campaign data into reportable dashboards.",
    image: certDataViz,
  },
  {
    title: "Internship on Data Analytics",
    issuer: "Pantech Prolabs India",
    date: "Jan 2024",
    detail: "Thirty-day applied analytics internship in Python and SQL.",
    image: certDataAnalytics,
  },
  {
    title: "30 Days Masterclass on Data Science",
    issuer: "Pantech e-Learning",
    date: "Apr 2023",
    detail: "Masterclass covering the data science workflow end to end.",
    image: certDataScience,
  },
];

/**
 * Six-week competition finish. The screenshot is redacted: the other
 * participants' photos and names are blurred in the image file itself.
 */
export const competition = {
  title: "3rd place, six-week competition",
  rank: 3,
  points: 381,
  prize: "₹3,000",
  detail:
    "Placed third out of the full cohort with 381 points across a six-week competition, and took home a ₹3,000 prize.",
  image: leaderboard,
};
