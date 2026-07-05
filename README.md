# 🤖 IntelliOps AI

### Autonomous Multi-Agent Procurement Platform for Manufacturing Enterprises

![Vite](https://img.shields.io/badge/Vite-React-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)
![Gemini](https://img.shields.io/badge/Google-Gemini_AI-4285F4?logo=google)
![License](https://img.shields.io/badge/License-MIT-green)

IntelliOps AI is an enterprise-grade autonomous procurement platform that simulates how modern manufacturing companies automate purchasing using multiple AI agents.

Instead of manually checking inventory, comparing suppliers, calculating taxes, generating purchase orders, and coordinating approvals, IntelliOps AI orchestrates specialized AI agents that complete the workflow in seconds.

Built as a hackathon MVP with modern enterprise UI, multilingual voice interaction, and Google Gemini integration.

---

# 🚀 Live Demo

## 🌐 Vercel Deployment

https://intelli-ops-ai.vercel.app

## 💻 GitHub Repository

https://github.com/bhargavramanamarchi/IntelliOps-AI

---

# 📌 Quick Navigation

- 🚀 Live Demo
- ✨ Features
- 🏗 Architecture
- ⚙ Installation
- 🎙 Voice AI
- 📊 Workflow
- 📸 Screenshots
- 🔮 Future Roadmap

---

# ✨ Features

| Feature | Description |
|----------|-------------|
| 🤖 Multi-Agent AI | Four autonomous AI agents execute procurement workflows sequentially |
| 🧠 Google Gemini Integration | Natural language understanding for procurement requests |
| 🎙 Multilingual Voice Input | Voice procurement requests using browser speech recognition |
| 🌍 Multiple Languages | English, Hindi, Telugu, Tamil, Kannada and Malayalam |
| 📦 Inventory Intelligence | Automatically checks stock and identifies shortages |
| 🏢 Supplier Recommendation | AI scores suppliers based on price, delivery and reputation |
| 📄 Purchase Order Generator | Creates enterprise-ready purchase orders |
| 🇮🇳 Indian GST Support | GST, CGST, SGST calculations with HSN codes |
| 📊 Analytics Dashboard | Procurement KPIs updated dynamically |
| ⚡ Real-Time Workflow | Visual AI agent orchestration with execution logs |
| 🔐 Local API Key Storage | Gemini API keys stored securely in browser LocalStorage |
| 🌙 Enterprise UI | Professional dark dashboard inspired by modern ERP systems |

---

# 🏗 System Architecture

```
                    Procurement Manager
                           │
                           ▼
              Natural Language / Voice Input
                           │
                           ▼
                  Requirement Agent
                           │
                           ▼
                  Inventory Agent
                           │
                           ▼
           Supplier Recommendation Agent
                           │
                           ▼
                Purchase Order Agent
                           │
                           ▼
             Enterprise Purchase Order
                           │
                           ▼
                 Analytics Dashboard
```

---

# ⚙ Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | CSS3 |
| AI | Google Gemini |
| Voice Recognition | Browser Web Speech API |
| State Management | React Context API |
| Deployment | Vercel |
| Version Control | Git + GitHub |

---

# 🤖 AI Agent Workflow

## 1️⃣ Requirement Agent

- Understands procurement request
- Extracts product
- Extracts quantity
- Extracts deadline
- Generates structured payload

↓

## 2️⃣ Inventory Agent

- Checks inventory
- Calculates shortages
- Determines procurement quantity

↓

## 3️⃣ Supplier Recommendation Agent

- Compares suppliers
- Scores vendors
- Selects best supplier
- Calculates estimated savings

↓

## 4️⃣ Purchase Order Agent

- Generates enterprise purchase order
- Calculates GST
- Generates HSN
- Produces printable PO

---

# 🎙 Voice AI

IntelliOps AI supports multilingual voice procurement requests.

Supported Languages

- 🇮🇳 English
- 🇮🇳 Hindi
- 🇮🇳 Telugu
- 🇮🇳 Tamil
- 🇮🇳 Kannada
- 🇮🇳 Malayalam

Users simply press the microphone button and speak naturally.

Example:

> "Need 500 wooden boards before Friday."

The system automatically converts speech into structured procurement requests using browser speech recognition.

---

# 🇮🇳 Indian Business Features

✔ GST Calculation

✔ CGST & SGST Breakdown

✔ HSN Code Support

✔ Indian Supplier Dataset

✔ INR Currency

✔ Enterprise Purchase Orders

✔ Manufacturing Procurement Simulation

---

# 📊 Dashboard Modules

- Procurement Control Room
- Workflow Metrics
- AI Confidence Score
- Inventory Status
- Supplier Matrix
- Purchase Order Preview
- Execution Logs
- Agent Progress Tracking

---

# 🔐 Google Gemini Integration

The application supports Google Gemini for intelligent procurement understanding.

API keys are **never hardcoded**.

Users can securely add their own API key through the Settings panel.

The key is stored only inside browser LocalStorage.

---

# 📁 Project Structure

```
IntelliOps-AI
│
├── public/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── mock/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── README.md
└── .gitignore
```

---

# 🚀 Installation

Clone repository

```bash
git clone https://github.com/bhargavramanamarchi/IntelliOps-AI.git
```

Go inside project

```bash
cd IntelliOps-AI
```

Install packages

```bash
npm install
```

Start development server

```bash
npm run dev
```

Build Production

```bash
npm run build
```

---

# 🔑 Google Gemini API

To enable AI parsing,

1. Click the Settings icon.

2. Paste your Google Gemini API Key.

3. Save.

The application stores the key locally and never uploads it to any server.

---

# 🌐 Deployment

## Vercel

Automatically deployed from GitHub.

Production URL

https://intelli-ops-ai.vercel.app

---

# 📸 Screenshots

| Module | Description |
|----------|-------------|
| Home | Enterprise Procurement Landing Page |
| Procurement Control Room | Natural Language & Voice Input |
| Workflow Dashboard | Multi-Agent Execution |
| Analytics | Procurement KPIs |
| Supplier Matrix | AI Recommendation |
| Purchase Order | Enterprise GST Invoice |

---

# 🔮 Future Roadmap

- 🔗 ERP Integration (SAP / Oracle)
- 📧 Email Purchase Orders
- 📱 Mobile Application
- 🤖 LangGraph Agent Workflows
- 📊 Live Vendor APIs
- ☁ Cloud Database
- 👥 Role-Based Authentication
- 📈 Predictive Procurement Analytics
- 📄 PDF Export
- 🧠 Fine-tuned Procurement LLM

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Open Pull Request

---

# 📄 License

Licensed under the MIT License.

---

# ⚠ Disclaimer

This project is a hackathon demonstration of enterprise procurement automation.

Supplier data, inventory records and purchase orders are simulated for educational purposes.

---

# 👨‍💻 Developed By

**Bhargav Ramana Marchi**

B.Tech CSE (AI & ML)

Enterprise AI | Multi-Agent Systems | Full Stack AI Developer

---

## ⭐ If you found this project useful, don't forget to Star the repository.