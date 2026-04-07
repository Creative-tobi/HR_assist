# TalentDecode 🚀
**Building the core, decoding the data.**

TalentDecode is an AI-powered HR Co-Pilot designed for professional services and enterprise hiring teams. It eliminates the manual friction of resume screening by instantly cross-referencing candidate profiles against job descriptions to extract validated strengths, identify critical skill gaps, and generate strategic interview questions.

## ✨ Enterprise Features
* **Lightning-Fast AI Analysis:** Powered by the Groq API and Llama 3 for near-instantaneous data decoding.
* **In-Memory File Processing:** Zero-disk-write PDF parsing using `multer` memory storage ensures the server remains lightweight, secure, and blazing fast.
* **Smart Skill Matching:** Deterministic JSON output forces the AI to provide a rigid, quantifiable "Match Score."
* **Strategic Co-Pilot:** Automatically generates highly targeted interview questions designed specifically to test a candidate's identified weak spots.
* **Glassmorphism UI:** Built with React, Vite, and the brand new Tailwind CSS v4 for a premium, tactile user experience.

## 🛠️ Tech Stack
**Frontend:**
* React (Vite)
* Tailwind CSS v4
* React-Dropzone
* Lucide React Icons

**Backend:**
* Node.js & Express
* Groq SDK (Llama-3-8b-8192)
* Multer (In-Memory Storage)
* PDF-Parse

---

## ⚙️ Local Setup & Installation

### Prerequisites
* Node.js (v18+ recommended)
* A free [Groq Cloud API Key](https://console.groq.com/)

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/Creative-tobi/HR_assist
cd talent-decode
\`\`\`

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and configure your environment variables.
\`\`\`bash
cd backend
npm install
\`\`\`
Create a `.env` file in the `backend` folder:
\`\`\`env
PORT=5000
GROQ_API_KEY=your_actual_groq_api_key_here
\`\`\`
Start the core engine:
\`\`\`bash
npm run dev
# or: node server.js
\`\`\`

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and start the Vite server.
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### 4. Run the App
Open your browser and navigate to `http://localhost:5173`. 
1. Drag and drop a sample PDF resume into the dropzone.
2. Paste a target Job Description into the text area.
3. Click **Analyze Candidate Match** to decode the data.

---
*Developed by Creaive-tobi (Geek).*