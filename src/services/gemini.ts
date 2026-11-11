import { RESUME_DATA } from '../constants';

export interface ChatMessage {
  role: 'bot' | 'user';
  content: string;
}

/**
 * Intelligent local knowledge responder for offline mode or when backend Gemini API is unavailable.
 */
function getOfflineKnowledgeReply(userMessage: string): string {
  const q = userMessage.toLowerCase().trim();

  // Contact / Hire
  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('call') || q.includes('whatsapp') || q.includes('reach')) {
    return `You can reach me directly via email at ${RESUME_DATA.email}, call or WhatsApp at ${RESUME_DATA.phone}, or connect on LinkedIn (linkedin.com/in/arslan-ali-ai-ml). I'm always open to discussing new opportunities and collaborations!`;
  }

  // Skills & Tech Stack
  if (q.includes('skill') || q.includes('stack') || q.includes('technolog') || q.includes('python') || q.includes('sql') || q.includes('html') || q.includes('css') || q.includes('javascript') || q.includes('react') || q.includes('frontend') || q.includes('tool')) {
    return `My technical capabilities span AI, Machine Learning, Data Engineering, and Modern Web Development:\n\n• Frontend: HTML5 (92%), CSS3 (88%), JavaScript (90%), React (86%)\n• Languages: Python (95%), SQL (90%), JavaScript (90%)\n• Libraries: Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, React\n• Databases: PostgreSQL, MySQL\n• Core Competencies: Machine Learning, Agentic AI, End-to-End ETL Pipelines, and Exploratory Data Analysis (EDA)\n• Dev Tools: Git, GitHub, VS Code, Jupyter Notebook`;
  }

  // Experience / Internships
  if (q.includes('experience') || q.includes('intern') || q.includes('technify') || q.includes('work') || q.includes('job')) {
    return `I have hands-on experience through two internships at Technify (Karachi):\n\n1. Data Science Intern (June–July 2026): Data collection, cleaning with Pandas/NumPy, exploratory analysis, visualization with Seaborn, and building ML models with Scikit-learn.\n2. Artificial Intelligence Intern (June–July 2025): Designed practical AI-driven applications, algorithm optimization, and workflow automation.`;
  }

  // Projects
  if (q.includes('project') || q.includes('childcare') || q.includes('etl') || q.includes('pipeline') || q.includes('portfolio') || q.includes('neural')) {
    return `Here are my top featured projects:\n\n1. Childcare Affordability Analysis (Arizona): Demographic and pricing study across 15 counties (5.97M population) comparing home vs center-based childcare costs.\n2. End-to-End ETL Pipeline: Automated streaming REST API ingestion, Pandas JSON transformation, and PostgreSQL loading with SQLAlchemy.\n3. Neural Portfolio Chatbot: Interactive AI assistant powered by Gemini and TypeScript.`;
  }

  // Education
  if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('college') || q.includes('sindh') || q.includes('study')) {
    return `I am pursuing my Bachelor of Science in Information Technology at the University of Sindh, Jamshoro (Feb 2022 – Mar 2026). My coursework and self-study focus extensively on Data Science, Machine Learning, and Software Architecture.`;
  }

  // Certifications
  if (q.includes('certif') || q.includes('course') || q.includes('credential')) {
    return `I have earned 8+ certifications including:\n\n• Certified Python Developer (PITP Govt of Sindh)\n• Certified Data Scientist (PITP Govt of Sindh)\n• Azure Databricks Data Pipelines (Microsoft)\n• Artificial Intelligence & Data Science (SMIT)\n• Introduction to AI (Google)\n• Data Cleaning (Kaggle)`;
  }

  // Roman Urdu queries
  if (q.includes('kaun') || q.includes('kya karte') || q.includes('tajurba') || q.includes('kaam') || q.includes('kahan') || q.includes('namaste') || q.includes('salam')) {
    return `Walekum Assalam! Main Arslan Ali hoon, Karachi se aik AI aur Data Science enthusiast. Main Python, SQL, Machine Learning models aur automated ETL pipelines par kaam karta hoon. Aap mere projects, Technify ki internships, ya certifications ke baray me pooch saktay hain!`;
  }

  // Who are you / General summary
  if (q.includes('who are you') || q.includes('about') || q.includes('yourself') || q.includes('introduce') || q.includes('hello') || q.includes('hi')) {
    return `Hello! I'm Arslan Ali, an AI and Data Science enthusiast based in Karachi, Pakistan. I hold a background in Information Technology from the University of Sindh, with practical experience in Python, SQL, machine learning, and ETL pipelines. What specific area of my background would you like to explore?`;
  }

  // Default response
  return `I'm Arslan Ali's portfolio AI assistant. I can help you learn about my machine learning projects, Technify internships, technical skills in Python and SQL, or education. You can also reach out to me directly at ${RESUME_DATA.email}!`;
}

/**
 * Sends a message along with conversation history to the server-side Gemini agent.
 * Falls back seamlessly to offline knowledge engine if the server is offline or unconfigured.
 */
export async function askResumeAgent(userMessage: string, history: any[] = []): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        history,
      }),
    });

    if (!response.ok) {
      return getOfflineKnowledgeReply(userMessage);
    }

    const data = await response.json();
    if (data.text) {
      return data.text;
    }

    return getOfflineKnowledgeReply(userMessage);
  } catch (error) {
    // If backend server is unreachable (static deploy or local vite dev), provide offline knowledge
    return getOfflineKnowledgeReply(userMessage);
  }
}
