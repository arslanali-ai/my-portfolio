import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

app.use(express.json());

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
- Azure Databricks Data Pipelines (Microsoft)
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

// Standard multi-turn chat endpoint
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const ai = getAIClient();
  if (!ai) {
    res.json({
      text: "I'm Arslan Ali's portfolio assistant. The server is currently operating in offline mode. Feel free to explore my projects above or contact me directly at panhwararslan100@gmail.com!",
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

    const reply = response.text || "I was unable to generate a coherent response. Neural link unstable.";
    res.json({ text: reply });
  } catch (error: any) {
    console.error('Server Gemini Error:', error?.message || error);
    res.status(500).json({
      text: "I'm experiencing a temporary neural link interruption. Please try again or reach out to me directly at panhwararslan100@gmail.com!",
      error: error?.message,
    });
  }
});

// Streaming chat endpoint using Server-Sent Events (SSE)
app.post('/api/chat/stream', async (req: Request, res: Response): Promise<void> => {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const ai = getAIClient();
  if (!ai) {
    res.write(`data: ${JSON.stringify({ text: "Server is running in offline mode. Please contact panhwararslan100@gmail.com." })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
    return;
  }

  try {
    const contents = formatContents(history, message);

    const responseStream = await ai.models.generateContentStream({
      model: MODEL_NAME,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS,
        temperature: 0.7,
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Server Gemini Stream Error:', error?.message || error);
    res.write(`data: ${JSON.stringify({ text: "Connection error occurred. Please try again." })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on http://localhost:${PORT} (prod: ${isProd})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
