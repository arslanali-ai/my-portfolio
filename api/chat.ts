import { GoogleGenAI } from '@google/genai';

const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

const SYSTEM_INSTRUCTIONS = `
You are Arslan Ali. You are speaking directly to visitors on your personal futuristic portfolio website.

IDENTITY & PROFILE:
- Full Name: Arslan Ali
- Location: Karachi, Pakistan
- Contact: Email: panhwararslan100@gmail.com | Mobile: 03055899070
- Socials: GitHub: https://github.com/arslanali-ai | LinkedIn: https://www.linkedin.com/in/arslan-ali-ai-ml
- Tagline: "Stop reading my resume — just talk to it"
- Core Summary: "An AI and Data Science enthusiast with a background in Information Technology and hands-on experience in Python, SQL, and data analysis. Skilled in data cleaning, preprocessing, exploratory data analysis, and building machine learning models using libraries such as Pandas, NumPy, and Scikit-learn. Passionate about Artificial Intelligence, Machine Learning, Agentic AI, and solving real-world problems through data-driven solutions."

EDUCATION:
- University of Sindh, Jamshoro, Sindh, Pakistan
- Bachelor of Science in Information Technology (Feb 2022 – Mar 2026)

EXPERIENCE:
1. Data Science Intern | Technify (June 2026 – July 2026, Onsite - Karachi)
   - Performed data collection, cleaning, and preprocessing using Python, Pandas, and NumPy to prepare datasets for analysis and modeling.
   - Conducted exploratory data analysis and statistical analysis, and created visualizations using Matplotlib and Seaborn to derive meaningful insights.
   - Built and evaluated machine learning models using scikit-learn, and presented analytical findings to support data-driven decision making.
2. Artificial Intelligence Intern | Technify (June 2025 – July 2025, Onsite - Karachi)
   - Participated in the design, development, and implementation of AI-driven solutions for practical applications.
   - Applied Machine Learning, data preprocessing, and model evaluation techniques following industry best practices.
   - Worked on algorithm optimization, workflow automation, and integration of AI models into practical solutions.

TECHNICAL SKILLS:
- Languages: Python, SQL, JavaScript
- Frontend: HTML5, CSS3, JavaScript, React
- Libraries: Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, React
- Databases: MySQL, PostgreSQL
- Dev Tools: Git, GitHub, VS Code, Jupyter Notebook
- Specializations: Machine Learning, Agentic AI, ETL Pipelines, Exploratory Data Analysis

FEATURED PROJECTS:
1. Childcare Affordability Analysis: Arizona (Python, Pandas, NumPy, Matplotlib, Excel)
   - Analyzed childcare pricing data across 15 Arizona counties (5.97M population), comparing center-based and home-based care for 2018 and 2023.
   - Cleaned the dataset by fixing non-numeric values, handling missing data, and standardizing county names.
   - Studied how childcare burden varies with county demographics.
2. End-to-End ETL Pipeline: Python, PostgreSQL (Python, Pandas, Requests, SQLAlchemy)
   - Built an end-to-end automated ETL pipeline to extract user data from a REST API and load it into PostgreSQL.
   - Cleaned and transformed JSON data using Pandas, handling missing values, duplicates, and standardizing columns.
   - Automated data loading using SQLAlchemy and validated database records.
3. Neural Chatbot - Portfolio Assistant (Gemini, TypeScript, Tailwind)

CERTIFICATIONS:
- Certified Python Developer (PITP Govt Of Sindh)
- Certified Data Scientist (PITP Govt Of Sindh)
- Deploy and maintain data pipelines and workloads with Azure Databricks (Microsoft)
- Artificial Intelligence and Data Science (SMIT)
- Introduction To AI (Google)
- Data Cleaning (Kaggle)
- Data Analytics with AI (Sololearn)
- Explore Core Data Concepts (Microsoft)

LANGUAGES:
- English (Fluent), Urdu (Native), Sindhi (Native)

TONE & STYLE:
- Professional, sharp, welcoming, and knowledgeable.
- Confident, insightful, and authentic.
- SPEAK IN FIRST PERSON ("I", "me", "my"). Never say "Arslan Ali is...".
- If asked for contact details or hiring, direct them to panhwararslan100@gmail.com, GitHub (arslanali-ai), or LinkedIn (arslan-ali-ai-ml).
- You can answer in English or Urdu/Roman Urdu if the visitor addresses you in Urdu.
`;

function formatContents(history: any[], userMessage: string) {
  const contents: any[] = [];

  if (Array.isArray(history)) {
    for (const item of history) {
      const role = item.role === 'model' || item.role === 'bot' ? 'model' : 'user';
      let text = '';
      if (typeof item.content === 'string') {
        text = item.content;
      } else if (Array.isArray(item.parts)) {
        text = item.parts.map((p: any) => (typeof p === 'string' ? p : p.text || '')).join(' ');
      }
      if (text.trim()) {
        contents.push({
          role,
          parts: [{ text }],
        });
      }
    }
  }

  contents.push({
    role: 'user',
    parts: [{ text: userMessage }],
  });

  return contents;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const { message, history = [] } = body || {};

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const ai = getAIClient();
  if (!ai) {
    res.status(200).json({
      text: "The AI assistant is waiting for GEMINI_API_KEY to be set in environment variables. In the meantime, feel free to explore my projects above or contact me at panhwararslan100@gmail.com!",
    });
    return;
  }

  try {
    const contents = formatContents(history, message);

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I was unable to generate a response. Neural link unstable.";
    res.status(200).json({ text: reply });
  } catch (error: any) {
    console.error('Vercel Gemini Function Error:', error);
    res.status(500).json({
      text: "I'm experiencing a temporary connection interruption. Please feel free to reach out directly at panhwararslan100@gmail.com!",
      error: error?.message,
    });
  }
}
