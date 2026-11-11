import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import profileImage from './assets/images/arslan_profile.png';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const RESUME_DATA = {
  name: "Arslan Ali",
  role: "AI & Data Science Enthusiast | Machine Learning | Python Developer",
  tagline: "Stop reading my resume — just talk to it",
  about: "An AI and Data Science enthusiast with a background in Information Technology and hands-on experience in Python, SQL, and data analysis. Skilled in data cleaning, preprocessing, exploratory data analysis, and building machine learning models using libraries such as Pandas, NumPy, and Scikit-learn. Passionate about Artificial Intelligence, Machine Learning, Agentic AI, and solving real-world problems through data-driven solutions.",
  profileImage: profileImage,
  resumePdf: "/Arslan-Ali-Resume.pdf",
  location: "Karachi, Pakistan",
  phone: "03055899070",
  email: "panhwararslan100@gmail.com",
  education: {
    institution: "University of Sindh",
    location: "Jamshoro, Sindh, Pakistan",
    degree: "Bachelor of Science in Information Technology",
    period: "Feb 2022 – Mar 2026"
  },
  experience: [
    {
      company: "Technify",
      role: "Data Science Intern",
      period: "June 2026 – July 2026",
      type: "Onsite • Karachi",
      description: "Performed data collection, cleaning, and preprocessing using Python, Pandas, and NumPy to prepare datasets for analysis and modeling. Conducted exploratory data analysis, created visualizations using Matplotlib & Seaborn, and evaluated machine learning models with scikit-learn for data-driven decisions."
    },
    {
      company: "Technify",
      role: "Artificial Intelligence Intern",
      period: "June 2025 – July 2025",
      type: "Onsite • Karachi",
      description: "Participated in design and development of AI-driven solutions for practical applications. Applied machine learning, data preprocessing, model evaluation techniques, algorithm optimization, and workflow automation."
    }
  ],
  skills: [
    { name: "Python", level: 95, category: "Languages" },
    { name: "SQL", level: 90, category: "Languages" },
    { name: "JavaScript", level: 90, category: "Frontend" },
    { name: "React", level: 86, category: "Frontend" },
    { name: "HTML5", level: 92, category: "Frontend" },
    { name: "CSS3", level: 88, category: "Frontend" },
    { name: "Pandas & NumPy", level: 94, category: "Libraries" },
    { name: "Scikit-Learn", level: 88, category: "Libraries" },
    { name: "Matplotlib & Seaborn", level: 90, category: "Libraries" },
    { name: "PostgreSQL", level: 88, category: "Databases" },
    { name: "MySQL", level: 85, category: "Databases" },
    { name: "Agentic AI & LLMs", level: 89, category: "Specialization" },
    { name: "ETL Pipelines", level: 91, category: "Specialization" },
    { name: "Exploratory Data Analysis", level: 94, category: "Specialization" },
    { name: "Git & GitHub", level: 90, category: "Dev Tools" },
    { name: "VS Code & Jupyter", level: 92, category: "Dev Tools" }
  ],
  certifications: [
    { title: "Certified Python Developer", issuer: "PITP Govt Of Sindh" },
    { title: "Certified Data Scientist", issuer: "PITP Govt Of Sindh" },
    { title: "Azure Databricks Data Pipelines", issuer: "Microsoft" },
    { title: "Artificial Intelligence and Data Science", issuer: "SMIT" },
    { title: "Introduction To AI", issuer: "Google" },
    { title: "Data Cleaning", issuer: "Kaggle" },
    { title: "Data Analytics with AI", issuer: "Sololearn" },
    { title: "Explore Core Data Concepts", issuer: "Microsoft" }
  ],
  languages: [
    { language: "English", proficiency: "Fluent" },
    { language: "Urdu", proficiency: "Native" },
    { language: "Sindhi", proficiency: "Native" }
  ],
  projects: [
    {
      id: "childcare-affordability",
      title: "Childcare Affordability Analysis: Arizona",
      category: "Data Science & Demographic Analytics",
      description: "Analyzed childcare pricing data across 15 Arizona counties (5.97M population), comparing center-based and home-based care for 2018 and 2023. Cleaned dataset fixing non-numeric values and missing data, and identified county demographic disparities.",
      tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Excel"],
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
      github: "https://github.com/arslanali-ai",
      demo: "https://github.com/arslanali-ai",
      featured: true,
      technologies: [
        { name: "Python 3.11", category: "Core Language", description: "Primary environment used for automated data ingestion, cleaning, and statistical processing." },
        { name: "Pandas", category: "Data Manipulation", description: "Dataframe transformations, normalization of irregular string values, handling nulls, and aggregations." },
        { name: "NumPy", category: "Numerical Computing", description: "Vectorized array calculations for affordability indices and statistical comparisons." },
        { name: "Matplotlib & Seaborn", category: "Visualization", description: "Generated multi-variable distribution charts, demographic comparisons, and cost trend plots." },
        { name: "Excel / OpenPyXL", category: "Spreadsheet Analytics", description: "Structured spreadsheet data validation, cross-referencing census indicators, and tabular exports." }
      ],
      documentation: {
        overview: "An extensive data science research project exploring the economic burden of infant, toddler, and preschool childcare on families across all 15 Arizona counties from 2018 through 2023.",
        problemStatement: "Childcare expenses in the US have rapidly outpaced median family income. County-level discrepancies, variations between center-based and home-based care, and the disproportionate economic pressure on minority demographics remained undocumented at granular scale.",
        methodology: [
          "Data Ingestion & Cleaning: Fixed inconsistent string encodings, converted currency strings to float types, handled missing survey records using median imputation, and standardized county naming conventions.",
          "Comparative Cost Modeling: Analyzed pricing inflation between 2018 and 2023 for infant, toddler, and school-age childcare in center-based vs. home-based facilities.",
          "Demographic Cross-Referencing: Mapped county cost burdens against U.S. Census racial and income demographics across Arizona's 5.97M population.",
          "Insight Generation: Discovered that Gila County experienced the highest economic burden, with disproportionate impacts on Black families."
        ],
        keyFeatures: [
          "Coverage of 15 counties representing ~5.97 million Arizona residents",
          "Dual facility comparison: Licensed Childcare Centers vs. Family Child Care Homes",
          "Standardized longitudinal price tracking between 2018 and 2023",
          "Demographic correlation identifying acute regional affordability gaps",
          "Clean visual reports ready for policy review and data-backed advocacy"
        ],
        outcomes: [
          "Identified Gila County as having the highest cost-to-income ratio for childcare.",
          "Demonstrated that infant center-based care increased by over 24% between 2018 and 2023.",
          "Created modular, reproducible Python notebooks enabling similar analyses for other states."
        ]
      }
    },
    {
      id: "etl-pipeline",
      title: "End-to-End ETL Pipeline: Python, PostgreSQL",
      category: "Data Engineering & Pipeline Automation",
      description: "Built an end-to-end automated ETL pipeline to extract user data from a REST API, clean and transform JSON data with Pandas, and load it into PostgreSQL using SQLAlchemy.",
      tags: ["Python", "PostgreSQL", "Pandas", "SQLAlchemy", "REST API"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop",
      github: "https://github.com/arslanali-ai",
      demo: "https://github.com/arslanali-ai",
      featured: true,
      technologies: [
        { name: "Python", category: "Orchestration", description: "Automated extraction scripts, exception handling, logging, and scheduled execution logic." },
        { name: "PostgreSQL", category: "Relational Database", description: "Production schema design, relational constraints, foreign keys, and indexing." },
        { name: "SQLAlchemy", category: "ORM & Connection", description: "Database connection pooling, transactional commit/rollback management, and upsert handling." },
        { name: "Pandas", category: "Transformation", description: "JSON flattening, deduplication, schema alignment, and null/anomaly remediation." },
        { name: "Requests", category: "HTTP & Networking", description: "REST API interaction with authentication headers, retry policies, and status code handling." }
      ],
      documentation: {
        overview: "A resilient, production-ready Extract, Transform, Load (ETL) pipeline engineered to continuously stream raw API payloads, normalize hierarchical structures into tabular dataframes, and reliably upsert them into a relational PostgreSQL database.",
        problemStatement: "Consuming raw third-party REST API feeds often suffers from unannounced schema changes, nested payloads, duplicate records, and sporadic connection timeouts. A resilient pipeline was needed to ensure data purity and guaranteed database persistence.",
        methodology: [
          "Extraction: Developed resilient HTTP fetching using Requests with timeout handling and pagination support to extract complete remote entity records.",
          "Transformation: Utilized Pandas to unnest multidimensional JSON responses, standardize column schemas, strip duplicated records, and sanitize email/telephone fields.",
          "Validation: Applied schema constraints and validation checks before loading to prevent downstream database corruption.",
          "Loading: Leveraged SQLAlchemy ORM with transactional boundaries to load clean datasets into PostgreSQL, validating successful insertion and idempotency."
        ],
        keyFeatures: [
          "Automated polling and ingestion from external REST endpoints",
          "Zero-loss JSON normalization and type-casting pipeline",
          "Transactional database commits with automatic rollback on error",
          "Comprehensive logging for each pipeline phase: Extracted, Transformed, Loaded",
          "PostgreSQL table integrity with foreign key enforcement and primary keys"
        ],
        outcomes: [
          "Achieved 100% data fidelity across extracted records with zero duplicate insertions.",
          "Structured modular Python classes separating extractors, transformers, and database loaders.",
          "Established automated verification queries confirming accurate data loading in PostgreSQL."
        ]
      }
    },
    {
      id: "neural-chatbot",
      title: "Neural Chatbot - AI Portfolio Assistant",
      category: "Generative AI & Full-Stack Systems",
      description: "Interactive AI assistant powered by Gemini 3.8 and RAG principles, allowing visitors to converse directly with Arslan Ali's background, projects, and technical skills.",
      tags: ["Gemini 3.8", "FastAPI", "Express", "TypeScript", "Tailwind"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
      github: "https://github.com/arslanali-ai",
      demo: "#",
      featured: true,
      technologies: [
        { name: "Google Gemini 3.8 Flash", category: "LLM & AI Engine", description: "High-speed reasoning model powering the resume question-answering assistant." },
        { name: "@google/genai SDK", category: "Official AI SDK", description: "Server-side TypeScript SDK used for system instructions, conversation state, and streaming." },
        { name: "Express & Node.js", category: "Backend Server", description: "Secure API proxy ensuring zero API key exposure to client browsers." },
        { name: "Server-Sent Events (SSE)", category: "Streaming Protocol", description: "Real-time token streaming enabling responsive typewriter chat output." },
        { name: "React 19 & TypeScript", category: "Frontend Framework", description: "Component-driven UI with strict typing and responsive chat widget state." },
        { name: "Framer Motion", category: "Animation Engine", description: "Physics-based modal transitions, chat drawer animations, and message appearance." }
      ],
      documentation: {
        overview: "A state-of-the-art AI-powered portfolio assistant that transforms a static resume into an engaging, multi-turn conversational agent representing Arslan Ali in real-time.",
        problemStatement: "Traditional PDF resumes are static and passive. Recruiters and engineering managers often struggle to quickly ascertain specific tech stack depths or project nuances without lengthy reading. A dynamic conversational agent bridges this gap instantly.",
        methodology: [
          "Architecture Design: Engineered a strict server-side proxy pattern where client browsers never see the GEMINI_API_KEY.",
          "Prompt Engineering: Embedded Arslan Ali's verified background, Technify internships, university degree, and project highlights into a tailored system persona.",
          "Streaming Implementation: Added Server-Sent Events (SSE) endpoints (`/api/chat/stream`) allowing real-time text streaming as tokens are generated.",
          "Conversational State: Implemented history serialization maintaining multi-turn context throughout the conversation."
        ],
        keyFeatures: [
          "Multi-turn conversational memory preserving query context",
          "Direct grounding in verified resume data, internships, and certifications",
          "Secure server-side API proxy with zero client credential exposure",
          "Support for both English and Roman Urdu queries",
          "Real-time token streaming with fallback recovery"
        ],
        outcomes: [
          "Provides instantaneous, 24/7 technical responses to prospective employers and collaborators.",
          "Reduced recruiter time-to-insight from minutes to seconds.",
          "Demonstrates practical full-stack deployment of modern Generative AI."
        ]
      }
    }
  ],
  socials: [
    { platform: "GitHub", url: "https://github.com/arslanali-ai" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/arslan-ali-ai-ml" },
    { platform: "Email", url: "mailto:panhwararslan100@gmail.com" },
    { platform: "Instagram", url: "https://instagram.com/arslanali" }
  ]
};
