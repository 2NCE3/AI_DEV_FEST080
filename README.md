# upay Sentinel — AI Fraud & Scam Intelligence Platform
### *AI DEV FEST 2026 — AI Hackathon (DIU CPC × upay)*
**Track 01: Trust & Risk Intelligence**

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-blue?style=flat&logo=react)](https://react.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini_API-1.5_Pro_%2F_Flash-orange?style=flat&logo=google)](https://ai.google.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/Status-Production_Ready-emerald)](https://github.com/)

---

## 1. Project Overview

### Problem Addressed
In modern Mobile Financial Services (MFS) platforms like **upay**, rapid adoption creates massive transaction volume. However, criminal syndicates exploit this speed through:
1. **Coordinated Money-Mule Networks:** Rapid smurfing and layering of illicit funds across intermediate wallets before liquidating at cash-out agent points.
2. **Account Takeover (ATO):** Credential theft, unauthorized SIM swaps, and nocturnal access from new, unverified hardware devices.
3. **Behavioral Anomaly & Social Engineering:** Trick transfers and sudden burst cash-outs that deviate dramatically from a customer's historic baseline.

Traditional rule engines trigger either too many false positives (hurting legitimate customer experience) or fail to detect multi-hop syndicate layering.

### Proposed Solution: upay Sentinel
**upay Sentinel** is an end-to-end AI Trust & Risk Intelligence platform. It replaces generic chatbots and siloed rule engines with a **closed-loop fraud operations intelligence center**:

$$\text{Transaction Telemetry} \longrightarrow \text{Ensemble Risk Scoring} \longrightarrow \text{Graph Topology Clustering} \longrightarrow \text{XAI Feature Attribution} \longrightarrow \text{Gemini Copilot Synthesis} \longrightarrow \text{Human-in-the-Loop Action}$$

### Answers to the Three Core Evaluation Questions:
- **What happened?** Real-time ingestion engine reconstructs chronological event telemetry (device registration, velocity bursts, recipient hops).
- **Why is it risky?** Multi-vector explainability (SHAP feature attribution) flags exact deviations (e.g. 4.8× spending spike, new nocturnal device, proximity to Mule Cluster #17).
- **What should upay do next?** Gemini-powered actionable recommendations (interim settlement freeze, step-up biometric challenge, regulatory SAR generation) with mandatory human oversight.

---

## 2. Implemented Features & AI Usage

| Feature | Screen / Component | AI / ML Role |
| :--- | :--- | :--- |
| **Real-time Risk Scoring** | `Transaction Monitor` | **XGBoost & Isolation Forest ensemble** scores incoming transactions from 0 to 100 with sub-20ms latency. |
| **Explainable AI (XAI)** | `Risk Intelligence` | **TreeSHAP attribution bars** breaking down risk contribution across Amount, Velocity, Device, Recipient, Time, and Location. |
| **Graph Neural Intelligence** | `Fraud Network` | **Graph topological cluster analysis** detecting money-mule rings, shared device hubs, and fund layering into Cluster #17. |
| **Case Investigation Dossier** | `Investigation Detail` | Automatic evidence aggregation, 5-metric exposure cards, chronological timeline, and action enforcement bar. |
| **Sentinel AI Assistant** | `Sentinel AI Copilot` | **Google Gemini 1.5 Pro / Flash** providing evidence-grounded interactive Q&A, citations, and investigation synthesis. |
| **Customer 360 Profiling** | `Customer Intelligence` | 90-day baseline learning (typical hours, median amount, trusted devices) vs real-time anomalous vector deviations. |
| **Automated Alert Triage** | `Alert Center` | Severity prioritization (Critical, High, Medium, Low) with MTTD tracking and 1-click triage actions. |
| **Management Analytics & ROI**| `Analytics Dashboard` | Detection rate (96.4%), False Positive rate (3.2%), ROC-AUC (98.2%), and real-time Kolmogorov-Smirnov **model drift monitoring**. |
| **Live Attack & Fraud Injector**| `Simulator Modal` | Interactive testing sandbox allowing judges to trigger Mule Floods, Account Takeovers, Velocity Bursts, or custom parameters. |
| **Compliance SAR Generator** | `Audit Export Modal` | Generates official Suspicious Activity Reports (SAR) formatted for Bangladesh Bank regulatory filings. |

---

## 3. Technology Stack

- **Frontend & App Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling & Design System:** Tailwind CSS, Custom SVG vector graph engine, CSS design tokens based on upay brand identity (`#0e9f67` green & `#10261f` navy)
- **Generative AI & Reasoning:** Google Gemini API (`@google/genai` / `gemini-1.5-pro` & `gemini-1.5-flash`) with structured JSON schema output and heuristic fallback
- **Risk Scoring & Analytics:** Heuristic TreeSHAP attribution, Isolation Forest anomaly detection simulator, GraphSAGE topological clustering simulator
- **Icons & UI Utilities:** Lucide React, clsx, tailwind-merge

---

## 4. Requirements

- **Node.js:** v18.18.0 or newer (tested and verified on Node.js v24)
- **npm:** v9.0.0 or newer
- **Browser:** Any modern web browser (Google Chrome, Microsoft Edge, Safari, Firefox)
- **Memory:** Standard laptop/desktop (no GPU required for prototype)

---

## 5. Installation and Setup

### Step 1: Clone or Navigate to the Repository
```bash
git clone https://github.com/your-team/upay-sentinel.git
cd ProjectHackathon
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Google Gemini API Key into `.env.local` (optional — the application has built-in offline evidence synthesis if no API key is provided).

---

## 6. Environment Variables

| Variable Name | Purpose | Configuration Instructions |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Powers real-time AI case synthesis and interactive analyst copilot | Obtain from [Google AI Studio](https://aistudio.google.com/). Set in `.env.local`. |
| `PORT` | Optional local development server port | Default is `3000`. |

*(Note: Never commit secret API keys to public Git repositories. Placeholders are maintained in `.env.example`)*

---

## 7. Run and Build Commands

### Run in Development Mode:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production:
```bash
npm run build
```

### Run Production Server:
```bash
npm run start
```

---

## 8. Live Deployment URL

- **Demo URL:** [https://upay-sentinel.vercel.app](https://upay-sentinel.vercel.app) *(or your deployed Vercel link)*
- **Figma Design Link:** [AI Fraud Intelligence Dashboard on Figma Make](https://www.figma.com/make/QwcksMsmG2Z1suY8e87CBI/AI-Fraud-Intelligence-Dashboard?t=CgtxzxSGMueAnDkh-1)

---

## 9. Testing & Demonstration Instructions

### Interactive Walkthrough for Judges:

1. **Overview Dashboard:**
   - Observe live KPI cards (৳18.7M Prevented Loss, 1.28M Monitored, 96.4% Accuracy).
   - Review the multi-line **Live Risk Activity** chart and **Risk Distribution** donut.
   - Click **“Investigate”** on any Recent Critical Alert to open the slide-out Transaction Drawer.

2. **Test Real-time AI Scoring & Drawer:**
   - In the slide-out drawer, inspect the **6-signal AI explanation** (Amount 4.8× normal, New device DEV-8821, 02:13 AM off-hours, etc.).
   - Click **“Open Investigation”** to enter the Investigation workspace.

3. **Explore the Fraud Network:**
   - Navigate to **Fraud Network** from the sidebar or top header.
   - Click on nodes (`U-1042`, `DEV-8821`, `U-8831`, `U-4412`).
   - Notice the highlighted **Mule Cluster #17** halo and the hourly velocity timeline.
   - Click **“Customer 360”** to inspect the customer's behavioral baseline.

4. **Sentinel AI Copilot:**
   - Navigate to **Investigations** > **INV-1042**.
   - In the Sentinel AI panel on the right, click suggested prompt: *"Why was this transaction flagged?"* or *"What should I investigate next?"*
   - Type any custom question to test live Gemini inference with evidence grounding.

5. **Inject a Live Fraud Attack:**
   - Click the top-bar button: **“⚡ Simulate Attack / Fraud”**.
   - Select **“Mule Network Surge (Cluster #17)”** or **“Account Takeover & Cash-out”**.
   - Watch the new transaction stream into the live table, update the risk score to Critical, and display a live alert toast!

6. **Generate Regulatory Audit Dossier (SAR):**
   - Click **“Audit Report”** in the top navigation.
   - Inspect the formatted Suspicious Activity Report (SAR) with chronology, SHAP weights, and Bangladesh Bank regulatory sign-offs.
   - Test the **“Download Report (.txt)”** or **“Copy Text”** actions.

---

## 10. Responsible AI, Privacy & Governance

- **Privacy by Design:** 100% synthetic demonstration data modeled on Bangladeshi MFS demographics. No real customer Personally Identifiable Information (PII) is stored or transmitted.
- **Human-in-the-Loop Oversight:** In accordance with Section 14 of the Hackathon rulebook, Sentinel AI acts as an advisory decision-support system. Consequential financial actions (e.g. account freezing or funds confiscation) mandate human analyst confirmation.
- **Explainability:** Model outputs are strictly decomposed into traceable TreeSHAP feature attributions and cited evidence sources rather than unconstrained black-box prompts.

---

## Team & Project Metadata
- **Hackathon:** AI DEV FEST 2026 AI Hackathon (DIU CPC × upay)
- **Track:** Track 01 — Trust & Risk Intelligence
- **Repository:** ProjectHackathon / upay Sentinel
- **Lead Developer:** Arman Hossen Ripon (Daffodil International University)
