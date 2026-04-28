# AegixChain AI 🛡️

AegixChain AI is an **Autonomous AI-Powered Security Operations Center (SOC)** equipped with Episodic Threat Memory and Layered Self-Hardening. Think of it as a living security system that gets smarter every time it's attacked.

## 🌟 Key Features

- **Autonomous Threat Detection**: AI-driven analysis to identify and respond to threats in real-time.
- **Episodic Threat Memory**: The system remembers past incidents and learns from them to prevent similar breaches in the future.
- **Layered Self-Hardening**: Implements automatic, evolving defenses by strengthening network configurations and protocols dynamically.
- **Intrusion Prevention System (IPS)**: Automatic IP blocking and traffic sanitization against active threats.
- **Unified Security Dashboard**: Real-time monitoring UI delivering instant insights, built with React and Tailwind CSS.
- **AI Brain Integration (Aegix LangGraph Pipeline)**: Context-aware security analysis sequentially orchestrated via neural logic:
  - **Threat Decision Engine**: High-confidence precision enforcement logic for immediate threat containment.
  - **Predictive Intelligence AI**: Forecasting models that anticipate attacker kill-chain progression and probabilistically evaluate alternative escalation paths.
  - **Central Orchestration AI**: Unified validation node that enforces strict logical consistency between detection, simulation, and executed responses.
- **Real-Time Data Streaming**: Server-Sent Events (SSE) provide live updates for alerts and logs.

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Recharts, Framer Motion, Lucide React
- **Backend**: Express (TypeScript/Node.js), Better-SQLite3
- **AI & Integrations**: Google GenAI
- **Security & Data Handling**: Express-rate-limit, jsonwebtoken, CORS, bcryptjs
- **Cloud/Auth**: Firebase (applet config & authentication compatibility built-in)

## 📁 Project Structure

```text
├── agent/               # Autonomous AI agent operational code
├── app/                 # Client UI application endpoints and components
├── code_warriors_.../   # Internal integrations and logic
├── sigma_rules/         # Sigma rule mappings for event analytics
├── src/
│   ├── ai/              # AI Brain logic and integrations
│   ├── api/             # Frontend API request abstractions
│   ├── backend/         # Backend routers, middleware, and controllers
│   ├── components/      # Reusable React components UI 
│   ├── hooks/           # Custom React hooks
│   └── logs/            # Sub-components handling system logs
├── server.ts            # Entry point for backend Node.js server
├── vite.config.ts       # Configuration for Vite
└── package.json         # Project dependencies and script runner commands
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed to run the application:
- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- `npm`

### Installation

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Copy the example environment configuration to establish your database and secret keys.
   ```bash
   cp .env.example .env
   ```
   *Make sure you provide the necessary AI service keys and Firebase configuration inside your `.env`.*

### Development

To start the local development server (spins up both backend server and frontend Vite application proxy):

```bash
npm run dev
```

The application will be accessible via `http://localhost:3000`.

### Building for Production

Compile the frontend React assets and run the unified built stack:

```bash
npm run build
npm run start
```

## 🧑‍💻 Commands

- `npm run dev`: Start the full-stack development server.
- `npm run build`: Build for production.
- `npm run clean`: Clean the `dist/` directory.
- `npm run generator`: Trigger local log generation for testing `src/logs/generator.ts`.
- `npm run lint`: Check the code for type errors.

## 🤝 Contribution Guidelines

We welcome contributions. Before making large changes, please open an issue to discuss the proposed improvements.

When submitting a Pull Request:
1. Ensure your code passes all linters (`npm run lint`).
2. Include explanations for architecture changes.
3. Keep the code strictly typed with TypeScript.

## 📄 License

This project is licensed under the MIT License.
