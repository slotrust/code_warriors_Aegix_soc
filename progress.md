# Project Progress Report

## 📌 Project Title
AegixChain AI (Team Code worriers)

## 👥 Team Members
- Name 1 - Y Nageswar Reddy
- Name 2 - Teja Prakash Reddy
- Name 3 - Shashank V
- Name 4 - Nithin J T

## 📅 Checkpoint 1 (3:00 PM)

### ✅ Completed Tasks
- Problem statement and proposed idea
- Modern Security Operations Centers (SOCs) face a dual crisis: Alert Fatigue and Response Latency. Security analysts are overwhelmed by thousands of daily logs, while sophisticated threats—such as zero-day exploits and multi-stage lateral movements—can compromise a network in seconds. Traditional rule-based systems are too rigid to detect novel patterns and too slow to stop automated attacks before significant damage occurs.
- AegixChain AI is an autonomous, multi-layered security ecosystem designed to act as a self-healing digital immune system. It integrates an Aegix Brain (AI Agent) with real-time system sensors (EDR/IPS) to provide 360-degree visibility. The platform doesn't just notify; it intervenes. It utilizes a hierarchical defense strategy—from sub-second deep learning anomaly detection at the packet level to high-reasoning agentic analysis for complex incident response—ensuring that threats are neutralized at the earliest stage of the kill-chain.
- Designed system architecture
- AegixChain AI is a multi-layered, agent-driven SOC architecture that combines real-time telemetry, deep learning detection, and autonomous response to create a self-healing cybersecurity system
- 
  Setup GitHub repository
- https://github.com/slotrust/code_warriors
-
- Initialized frontend
- # Frontend (SOC Dashboard)

* Initialized **React + Vite** application
* Built real-time **SOC Dashboard UI** for alert monitoring
* Integrated **live alert streaming** using WebSockets / SSE
* Displays only **high-severity threats** to reduce alert fatigue
* Modular structure (components, services, sockets) for scalability

### 🔄 Ongoing Tasks
Initialization of backend 
- Implementing login system
- User clicks “Sign in with Google” (React frontend)
Firebase handles authentication (signInWithPopup)
Frontend sends Firebase ID token to backend
Backend verifies token using Firebase Admin SDK
Backend generates JWT session token
Role (USER / ADMIN) assigned from Firestore
- Working on API integration
- ##  API Integration

* Connected **React frontend, Node.js backend, and Python AI agents** via REST + SSE + Redis
* Implemented core APIs for **auth, live agent feed, threat response, and AI analysis**
* Integrated **Gemini AI + JWT security** for real-time, secure SOC operations


###  Pending Tasks
- Testing
- ## Pending Tasks (Next Steps)

* Fix **Gemini LLM failure** (API key, prompt limits, response handling)
* Implement **vector DB (Pinecone/ChromaDB)** for advanced Threat Memory
* Upgrade Response Agent → **kernel-level blocking (iptables/eBPF)**
* Enhance UI with **MITRE heatmap + audit logs**
* Enable **multi-node sensor deployment** + secure Firebase rules

## 📅 Checkpoint 2 (5:00 PM)

### ✅ Completed Tasks
- Added authentication system
- ##  Authentication Implementation (Short)

* Integrated **Firebase Google Sign-In + JWT** for secure login
* Frontend gets Firebase ID token → sends to backend
* Backend verifies token → issues **JWT session**
* Added **JWT middleware** to protect AI/IPS routes
* Stored session token in localStorage

Config:

* Set `JWT_SECRET` in `.env`
* Configure Firebase keys (`apiKey`, `authDomain`)
* Implement **RBAC (Admin whitelist in Firestore)**

- Built dashboard UI
- ## Dashboard UI (Short)

* Built **Tactical SOC UI** (Blue & Amber theme) with sidebar, header, and main stage
* Sidebar → navigation (Brain, EDR, Network, Alerts, IPS)
* Header → system status + time + user role

 ###Core Components

* **Agent Grid** → shows status of Collector, Analyst, LLM, Response
* **Message Bus (Live Feed)** → real-time SSE stream of agent communication

---

### UI Style

* Dark theme (Slate) + Blue/Amber accents
* Monospace font for logs
* Pulse animations for live system status

-### Integration

* SSE (`/api/agents/bus`) for live data
* State management for message stream
* Role-based UI (ADMIN-only features like IPS)


### Ongoing Tasks
- Threat detection module
- ##Threat Detection Module

* Detection pipeline works, but **LLM synthesis failing** → fix prompts & token limits
* High false positives → add **baseline allow-list + threshold tuning**
* Improve **MITRE mapping → multi-stage attack correlation**
* Upgrade Threat Memory → **fuzzy matching + feedback learning**


### Pending Tasks
- Final optimization
Add self-process allow-list to reduce false positives
Fix LLM errors with structured forensic prompt
Optimize SSE with event batching + diff updates
- 

---

## Next Steps
- Complete remaining modules
- ##Final Modules (Humanized + Short)

* **Threat Memory Engine** → Remembers past attacks & false positives, helps AI react faster and smarter
* **Response Engine** → Automatically kills malicious processes & blocks harmful IPs
* **Correlation Service** → Connects network, process, and file events into one clear attack story
  
- Test full system

* Start backend + sensors + Gemini API
* Run attack script → triggers process + network + file events
* Flow: **Collector → Analyst → LLM → Response**
* Verify: alert, MITRE mapping, auto block, logs

 Prepare final presentation

* **Problem:** Alert fatigue + slow detection (212 days)
* **Solution:** NovaShield → autonomous AI SOC (detects + acts instantly
*  How it Works

Sensors → Analyst → LLM (Gemini) → Response + Memory
(MITRE mapping + auto threat blocking)

Demo Flow

Healthy system → run attack → anomaly detected → LLM explains → process killed → system secured

---

### Future

Vector memory + eBPF + multi-device control

 Pitch: *“Not just alerts—NovaShield acts in real time.”*
