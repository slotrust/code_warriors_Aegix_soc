# CyberSOC Local Agent

This Python agent monitors system processes and network connections and sends the data to the CyberSOC backend for analysis.

## Prerequisites

- Python 3.x
- `psutil` library
- `requests` library

## Installation

```bash
pip install psutil requests
```

## Running the Agent

```bash
python soc_agent.py
```

## Features

- **Process Monitoring**: Tracks CPU, memory, and executable paths.
- **Network Monitoring**: Tracks established connections and remote IPs.
- **Anomaly Detection**: Flags high CPU usage and suspicious process names.
- **Data Normalization**: Sends data in a standardized JSON format.
- 📂 Project Structure
/
├── server.ts                 # Express backend entry point & global IPS middleware
├── firebase-applet-config.json # Firebase configuration
├── firestore.rules           # Firestore security rules
├── src/
│   ├── ai/                   # AI/ML logic (Anomaly detection, feature extraction)
│   ├── api/                  # Frontend API client (Axios)
│   ├── backend/              # Backend logic
│   │   ├── routes/           # Express API routes (auth, logs, system, alerts, ips)
│   │   ├── services/         # Business logic (log processing, system monitoring, IPS)
│   │   ├── middleware/       # Auth, rate limiting, and IPS blocking middleware
│   │   ├── firebaseAdmin.ts  # Firebase Admin SDK initialization
│   │   └── database.ts       # SQLite database initialization (logs, blocked_ips)
│   ├── components/           # React UI components (Dashboard, IPS Management, ErrorBoundary)
│   ├── firebase.ts           # Firebase client initialization
│   └── hooks/                # Custom React hooks (e.g., usePolling)
├── agent/                    # Python-based external agents (optional)
└── package.json              # Project dependencies and scripts

🧠 How the AI & Defense System Works
Feature Extraction: Incoming logs and system data are parsed to extract key numerical and categorical features (e.g., bytes transferred, time of day, failure rates).
Anomaly Prediction: The features are fed into the anomalyDetector, which calculates a risk score.
Automated Defense (IPS): If a critical anomaly is detected (score > 0.85) or a brute force attack occurs, the Intrusion Prevention System automatically blocks the offending IP address at the middleware level.
Explanation & Mitigation: For flagged anomalies, the explainer module generates a human-readable reason and suggests immediate mitigation steps.
Alert Generation: A critical or medium alert is dispatched to the dashboard for SOC analysts to review, including notifications of automated IPS actions.
🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
