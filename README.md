# Arslan Ali — AI Engineer & Python Developer Portfolio

A futuristic, high-performance portfolio featuring an interactive AI-powered resume chatbot, showcasing machine learning systems, automated ETL pipelines, and demographic data science research.

---

## ⚡ Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React
- **Backend:** Node.js, Express, Server-Sent Events (SSE)
- **AI & Reasoning:** Google Gemini API (`@google/genai`), intelligent offline resume knowledge engine fallback
- **Bundler & Tooling:** Vite 6, tsx

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/arslanali-ai/arslan-ali-portfolio.git
cd arslan-ali-portfolio
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/):
```env
GEMINI_API_KEY="your_actual_gemini_api_key"
GEMINI_MODEL="gemini-2.5-flash"
PORT=3000
```
*(Note: If no API key is provided, the chatbot automatically operates in offline fallback mode using verified portfolio knowledge!)*

### 3. Run Locally

- **Full-stack dev server (Vite + Express API):**
  ```bash
  npm run dev
  ```
  Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Frontend-only build & preview:**
  ```bash
  npm run build
  npm run preview
  ```

---

## 📂 Project Architecture

```
arslan-ali-portfolio/
├── api/                  # Vercel serverless function (/api/chat)
│   └── chat.ts
├── public/               # Static assets & Resume PDF
│   ├── Arslan-Ali-Resume.pdf
│   └── favicon.svg
├── src/
│   ├── assets/           # Profile images
│   ├── components/       # UI sections (Hero, About, Skills, Projects, Contact, Chatbot, Navbar, Footer)
│   ├── services/         # Client-side AI service & offline knowledge engine
│   ├── constants.ts      # Structured resume data & portfolio content
│   ├── index.css         # Tailwind v4 themes, cyber-glow & glassmorphism
│   └── main.tsx
├── server.ts             # Express server with Vite middleware & Gemini API endpoint
├── vercel.json           # Vercel deployment configuration
└── vite.config.ts        # Vite configuration with Tailwind CSS v4
```

Portfolio Link: https://arslan-ai-portfolio.vercel.app


## 📬 Contact
- **Email:** panhwararslan100@gmail.com
- **Phone:** 03055899070
- **LinkedIn:** [linkedin.com/in/arslan-ali-ai-ml](https://www.linkedin.com/in/arslan-ali-ai-ml)
- **GitHub:** [github.com/arslanali-ai](https://github.com/arslanali-ai)
