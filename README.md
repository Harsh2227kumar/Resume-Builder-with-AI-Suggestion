# 🚀 Smart Resume Builder

<p align="center">
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react" alt="React" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js" alt="Node.js" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/TailwindCSS-UI-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google" alt="Gemini" /></a>
</p>

<p align="center">
  Build modern, ATS-friendly resumes with a guided editor, live preview, AI suggestions, and one-click PDF export.
</p>

---

## ✨ Overview

Smart Resume Builder is a full-stack web application that helps users:
- Register and securely log in
- Build resumes section-by-section with a guided form flow
- Preview changes in real time
- Improve content using AI suggestions (Experience + Summary)
- Save, update, and manage multiple resumes
- Export resumes as print-ready PDF

---

## 🎯 Core Features

### 🔐 Authentication
- Email/password registration and login
- JWT-based protected API routes
- Client-side auth persistence via local storage

### 🧩 Resume Builder
- Multi-step form flow:
  - Personal Info
  - Education
  - Experience
  - Skills
  - Projects
  - Summary
- Centralized global state via React Context
- Save new resumes or update existing ones

### 👀 Live Preview + Export
- Real-time resume preview while editing
- Scale control for preview readability
- One-click PDF export using print-optimized rendering

### 🤖 AI Assistant
- Gemini-powered suggestions for:
  - `experience`
  - `summary`
- Structured JSON response handling
- Prompt templates focused on ATS optimization and quantified impact

### 🗂️ Resume Dashboard
- View all saved resumes
- Edit an existing resume
- Delete a resume
- Card-style dashboard with thumbnail preview

---

## 🛠 Tech Stack

### Frontend
- ⚛️ React 18
- ▲ Next.js 14 (App Router)
- 🎨 Tailwind CSS
- 🎞 Framer Motion
- 🔔 react-hot-toast
- 🧩 Lucide React icons
- 🖨 react-to-print
- 🌐 Axios

### Backend
- 🟢 Node.js + Express
- 🍃 MongoDB + Mongoose
- 🔐 JWT authentication
- 🔒 bcrypt password hashing
- 🛡 helmet, rate limiting, mongo sanitize, validation middleware
- 🧠 Google Gemini (`@google/genai`)

---

## 📸 Screenshots

> Replace these placeholder images with real app screenshots for a strong portfolio presentation.

| Landing Page | Resume Builder |
|---|---|
| ![Landing Page](https://placehold.co/1200x700/111827/ffffff?text=Landing+Page+Screenshot) | ![Resume Builder](https://placehold.co/1200x700/1f2937/ffffff?text=Resume+Builder+Screenshot) |

| AI Suggestions | My Resumes Dashboard |
|---|---|
| ![AI Suggestions](https://placehold.co/1200x700/374151/ffffff?text=AI+Suggestions+Screenshot) | ![My Resumes Dashboard](https://placehold.co/1200x700/4b5563/ffffff?text=My+Resumes+Dashboard+Screenshot) |

Recommended image names (store in `client/public/screenshots/`):
- `landing-page.png`
- `resume-builder.png`
- `ai-suggestions.png`
- `my-resumes-dashboard.png`

Then update the markdown image paths to:
- `/screenshots/landing-page.png`
- `/screenshots/resume-builder.png`
- `/screenshots/ai-suggestions.png`
- `/screenshots/my-resumes-dashboard.png`

---

## 🧱 Architecture

```text
smart-resume-builder/
├── client/                # Next.js frontend
│   ├── app/               # Route groups: (auth), (main)
│   ├── components/        # UI, builder, preview, AI assistant
│   ├── context/           # ResumeContext (auth + resume state)
│   ├── hooks/             # PDF export, AI suggestions
│   ├── services/          # API/auth/AI service layer
│   └── utils/             # Constants and helper values
└── server/                # Express backend
    ├── config/            # env config + DB connection
    ├── controllers/       # Route logic
    ├── middleware/        # auth, validation, error handler
    ├── models/            # User and Resume schemas
    ├── routes/            # auth, resumes, ai endpoints
    ├── services/          # Gemini service
    └── utils/             # prompt templates, token helper
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

Create a `.env.local` file inside the `client/` directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

> `OPENAI_API_KEY` exists in server config but current AI flow uses Gemini service.

---

## 🚀 Getting Started

### 1) Install dependencies
From the project root:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

### 2) Run backend
In one terminal:

```bash
cd server
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3) Run frontend
In second terminal:

```bash
cd client
npm run dev
```

Frontend runs on: `http://localhost:3000`

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

### Auth
- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and get JWT token

### Resumes (Protected)
- `POST /resumes` — Create resume
- `GET /resumes` — Get all resumes for current user
- `GET /resumes/:id` — Get resume by ID
- `PUT /resumes/:id` — Update resume
- `DELETE /resumes/:id` — Delete resume

### AI (Protected)
- `POST /ai/suggestions` — Get AI suggestions for a section
  - Required body fields: `section`, `content`
  - Supported sections: `experience`, `summary`

---

## 🗃 Data Model

### User
- `name` (String)
- `email` (String, unique)
- `password` (hashed)
- Timestamps

### Resume
- `userId` (ObjectId -> User)
- `title`
- `personalInfo`:
  - `fullName`, `email`, `phone`, `linkedin`, `portfolio`
- `summary`
- `experience[]`
- `education[]`
- `skills[]`
- `projects[]`
- `template` (`Classic | Modern | Minimal`)
- Timestamps

---

## 🔄 User Flow

1. User signs up / logs in
2. User creates or opens a resume
3. User fills each section in guided steps
4. Live preview updates instantly
5. User requests AI improvements for summary/experience
6. User saves resume to database
7. User manages resumes from dashboard
8. User exports final PDF

---

## 🔐 Security Notes

Backend includes:
- `helmet` for secure HTTP headers
- `express-rate-limit` on `/api`
- `express-mongo-sanitize` against NoSQL injection vectors
- `express-validator` for request validation
- JWT route protection middleware
- Password hashing with `bcryptjs`

---

## 📜 Available Scripts

### Client (`client/package.json`)
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

### Server (`server/package.json`)
- `npm run dev`
- `npm start`

---

## 🧪 Current Implementation Notes

- AI suggestions are currently wired for **Experience** and **Summary** sections.
- Resume preview currently renders the **Classic** template component.
- Dashboard action icons for Download/Duplicate are present in UI; full backend logic for duplicate/download card actions may require extension based on your preferred behavior.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📌 Summary

Smart Resume Builder is a production-style MERN + Next.js application focused on creating high-quality resumes with AI-assisted writing, real-time preview, secure persistence, and polished export workflow.
