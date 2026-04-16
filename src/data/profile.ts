export const profile = {
  name: "Bhanu Prakash Reddy",
  fullName: "Bhanu Prakash Reddy Vellala Linga",
  title: "Applied AI Engineer",
  subtitle: "Generative AI · LLM Systems · RAG Architecture",
  tagline:
    "I architect intelligent systems that turn enterprise data into conversation — shipping production-grade Generative AI on Azure.",
  location: "YSR Kadapa, Andhra Pradesh, India",
  email: "vellalabhanuprakashreddy@gmail.com",
  phone: "+91 99850 02532",
  linkedin: "https://www.linkedin.com/in/bhanu-prakash-reddy-vellala-linga",
  github: "https://github.com/Bhanuvellala",
  personalSite: "https://sites.google.com/view/vellalabhanu/vellala-linga-bhanu-prakash-reddy",
  /** Add your public profile URL when ready; left empty so the site does not link to someone else's handle. */
  instagram: "",
  /** Optional: hosted PDF (e.g. `/resume.pdf` in `public/`). If empty, the Resume control uses email. */
  resumeUrl: "",
  bio: `Applied AI Engineer with 2+ years building Generative AI and LLM-based applications across finance, manufacturing, healthcare and HR. I specialize in turning complex enterprise data into natural-language experiences using Azure AI Foundry, Semantic Kernel, the Google ADK Framework, and the modern Python stack. From RAG pipelines to autonomous agents, I focus on systems that are scalable, explainable, and genuinely useful.`,
  metrics: [
    { value: "2+", label: "Years in Applied AI" },
    { value: "9+", label: "AI Systems Shipped" },
    { value: "6", label: "Industry Domains" },
    { value: "100%", label: "Production Focus" },
  ],
};

export const skills = [
  {
    category: "Generative AI & LLMs",
    items: ["Azure OpenAI", "LLaMA", "Gemini", "Cohere", "Semantic Kernel", "Google ADK", "RAG", "Prompt Engineering"],
  },
  {
    category: "Azure & Cloud",
    items: ["Azure AI Foundry", "Function Apps", "Azure AI Search", "Blob Storage", "Cosmos DB", "Containers"],
  },
  {
    category: "Backend & Languages",
    items: ["Python", "FastAPI", "REST APIs", "Async Pipelines", "Microservices"],
  },
  {
    category: "Data & Storage",
    items: ["SQL Server", "PostgreSQL", "Snowflake", "Vector Databases", "Embeddings"],
  },
  {
    category: "Tools & DevX",
    items: ["Git", "GitHub Copilot", "Cursor AI", "VS Code", "Power BI", "Selenium", "Playwright"],
  },
];

export const projects = [
  {
    title: "Finance AI Agent — NL Data Access",
    domain: "Finance",
    description:
      "Conversational AI chatbot enabling non-technical users to query SQL Server & PostgreSQL in plain English. Generates SQL on-the-fly for revenue analysis, invoice tracking and accounts receivable insights.",
    stack: ["FastAPI", "Azure OpenAI", "SQL Server", "PostgreSQL"],
    impact: "Real-time financial analytics for non-technical teams",
    accent: "from-primary to-secondary",
  },
  {
    title: "AI Sales Cross-Reference Copilot",
    domain: "Manufacturing",
    description:
      "Generative AI engine for product comparison and dynamic pricing recommendations powered by context-aware retrieval over enterprise catalogs and pricing histories.",
    stack: ["Semantic Kernel", "Azure AI Search", "Cosmos DB", "Snowflake"],
    impact: "Optimized pricing strategy in real time",
    accent: "from-secondary to-accent",
  },
  {
    title: "Smart Gen AI Studio — RAG Platform",
    domain: "AI COE",
    description:
      "End-to-end Retrieval-Augmented Generation platform unifying multiple enterprise data sources with LLMs for context-aware document understanding and summarization.",
    stack: ["RAG", "Vector DB", "Azure OpenAI", "Python"],
    impact: "Improved response accuracy & enterprise scalability",
    accent: "from-accent to-primary",
  },
  {
    title: "Handwriting Extraction Automation",
    domain: "Healthcare",
    description:
      "Automated pipeline that extracts handwritten data from email attachments and converts unstructured medical content into structured, searchable records.",
    stack: ["Azure OpenAI", "Logic Apps", "Function Apps", "Blob Storage"],
    impact: "Unstructured → structured medical data, end-to-end",
    accent: "from-primary to-accent",
  },
  {
    title: "Sales Data Extraction with LLMs",
    domain: "Marketing",
    description:
      "Document-to-data pipeline turning scanned sales documents into clean structured outputs using advanced prompt engineering with hosted and locally run LLMs (e.g. Ollama).",
    stack: ["FastAPI", "Logic Apps", "Ollama", "Prompt Eng."],
    impact: "Hands-off data ingestion from unstructured docs",
    accent: "from-secondary to-primary",
  },
  {
    title: "ITSM Automation — Azure AI Foundry",
    domain: "IT Operations",
    description:
      "AI-driven ITSM solution that creates, prioritizes and summarizes tickets automatically — streamlining workflow and reducing manual triage.",
    stack: ["Azure AI Foundry", "Function Apps", "Python"],
    impact: "Faster ticket resolution & smarter triage",
    accent: "from-accent to-secondary",
  },
  {
    title: "HR AI Document Summarizer",
    domain: "Human Resources",
    description:
      "Summarization engine for HR reports and visual data — concise, accurate summaries that accelerate executive decision-making.",
    stack: ["Azure OpenAI", "Python", "FastAPI"],
    impact: "Faster decisions through concise insights",
    accent: "from-primary to-secondary",
  },
  {
    title: "Manufacturing Data Dashboard",
    domain: "Analytics",
    description:
      "Interactive Power BI dashboard backed by Cosmos DB & FastAPI for tracking team activity, workflow execution and operational bottlenecks in real time.",
    stack: ["Power BI", "Cosmos DB", "FastAPI", "Python"],
    impact: "KPI-driven productivity & anomaly detection",
    accent: "from-secondary to-accent",
  },
];

export const experience = [
  {
    role: "Technical Consultant — Applied AI",
    company: "MOURI Tech",
    location: "Hyderabad, Telangana, India",
    period: "Feb 2026 — Present",
    type: "work",
    highlights: [
      "Consulting on scalable AI and data solutions — from requirements through deployment across enterprise clients.",
      "LLM applications, advanced RAG, AI agents for automation, and cloud-native architectures on Azure and AWS.",
      "Advisory on GenAI adoption, performance, cost efficiency, and multimodal integration.",
    ],
  },
  {
    role: "Data Science & GenAI Associate Software Engineer",
    company: "MOURI Tech",
    location: "Hyderabad, Telangana, India",
    period: "Nov 2024 — Feb 2026",
    type: "work",
    highlights: [
      "End-to-end RAG pipelines, prompt engineering, and intelligent agents for decision support and automation.",
      "Deployments on Azure, AWS, and GCP; multimodal work across text, images, and structured data.",
      "Text extraction and data processing for reliable retrieval from diverse sources.",
    ],
  },
  {
    role: "Data Science & GenAI Associate Trainee",
    company: "MOURI Tech",
    location: "Hyderabad, Telangana, India",
    period: "May 2024 — Nov 2024",
    type: "work",
    highlights: [
      "Data analysis and visualization using Power BI, Tableau, and Excel alongside foundational GenAI work.",
      "Collaborative delivery in a global team focused on learning and high-quality outcomes.",
    ],
  },
  {
    role: "Chief Executive Committee Member",
    company: "We Are with You Charitable Trust",
    location: "YSR Kadapa, Andhra Pradesh, India",
    period: "Mar 2023 — Present",
    type: "work",
    highlights: [
      "Leadership on strategy and operations for community programs aligned with social upliftment.",
      "Partnerships and initiatives that expand reach and long-term impact for beneficiaries.",
    ],
  },
  {
    role: "Former President",
    company: "We Are with You Charitable Trust",
    location: "YSR Kadapa, Andhra Pradesh, India",
    period: "Nov 2021 — Mar 2023",
    type: "work",
    highlights: [
      "Organized events, mobilized resources, and drove projects addressing critical local needs.",
      "Built collaborations to scale community development and volunteer engagement.",
    ],
  },
  {
    role: "Data Analyst — Winter Internship",
    company: "PrepInsta",
    location: "Noida, Uttar Pradesh, India",
    period: "Jan 2024 — Mar 2024",
    type: "work",
    highlights: [
      "Data cleaning and structuring with Python and SQL to prepare datasets for analysis.",
      "Hands-on projects turning raw data into organized, analysis-ready foundations.",
    ],
  },
  {
    role: "Intern — AI & Data Analysis",
    company: "Pantech ProEd Pvt Ltd",
    location: "Chennai, Tamil Nadu, India",
    period: "Nov 2023 — Apr 2024",
    type: "work",
    highlights: [
      "Program covering AI fundamentals, machine learning concepts, and neural networks.",
      "Data analysis and Python practice on projects requiring adaptability and problem-solving.",
    ],
  },
  {
    role: "Data Analyst — Intern",
    company: "Excelerate",
    location: "Remote (United States)",
    period: "Aug 2023 — Sep 2023",
    type: "work",
    highlights: [
      "Analyzed Facebook ad campaign data to find optimization opportunities.",
      "Delivered insights through interactive dashboards and reports for campaign performance.",
    ],
  },
  {
    role: "B.E. — Electrical & Electronics Engineering",
    company: "Annamacharya Institute of Technology & Sciences (Autonomous)",
    location: "New Bowenpally, Rajampet, India",
    period: "Aug 2019 — Apr 2023",
    type: "education",
    highlights: [
      "Bachelor of Engineering (EEE) with a strong analytical and systems-oriented foundation.",
      "Parallel growth into AI/ML, Python, and cloud-native development through self-driven learning.",
    ],
  },
  {
    role: "Intermediate — MPC",
    company: "Sri Chaitanya College of Education",
    location: "Andhra Pradesh, India",
    period: "Jun 2017 — Apr 2019",
    type: "education",
    highlights: [
      "Mathematics, Physics & Chemistry — core preparation for engineering admissions.",
    ],
  },
  {
    role: "High School",
    company: "Indus English Medium High School",
    location: "Andhra Pradesh, India",
    period: "Jun 2016 — Mar 2017",
    type: "education",
    highlights: [
      "Completed secondary education with emphasis on mathematics and science fundamentals.",
    ],
  },
];

export const achievements = [
  { title: "Production GenAI at scale", detail: "Shipped LLM systems serving real enterprise users across 6 industries." },
  { title: "Azure AI Foundry expert", detail: "Deep specialization in Microsoft's enterprise AI stack." },
  { title: "RAG architect", detail: "Designed multi-source retrieval pipelines with measurable accuracy gains." },
  { title: "Full-stack AI delivery", detail: "From data ingestion → embeddings → agents → dashboards." },
];
