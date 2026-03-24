# FundLocal

AI-native community investment platform that connects everyday investors with local projects — schools, solar gardens, micro-loans, environmental restoration, and research. Built as a capstone project demonstrating how AI can make community investing accessible while maintaining real compliance guardrails.

## User Flows

### Investor
1. **Values intake** — questionnaire captures impact focus, return preferences, risk tolerance, and location
2. **AI matching** — Claude evaluates projects against the investor profile and explains *why* each is a fit
3. **Project detail** — full breakdown with milestones, impact metrics, funding progress, and investment controls
4. **Dashboard** — portfolio view of active investments

### Creator
1. **Proposal submission** — structured form for project details, funding goals, milestones, team credentials, and evidence uploads (photos, documents)
2. **AI verification pipeline** runs automatically:
   - **Registry check** — tool-use agent queries CRA charity database via Canada Open Data portal
   - **Proposal evaluation** — scores impact, feasibility, readiness, and clarity
   - **Photo forensics** — EXIF metadata extraction, GPS validation, AI-generated image detection
   - **Risk scoring** — flags unverified claims and compliance gaps

### Compliance / Internal
1. **Compliance dashboard** — full AI evaluation results with strengths, improvements, and risk flags
2. **Agent trace panel** — expandable view of AI reasoning steps and tool calls
3. **Human review gate** — AI recommends but never approves listings; human compliance review is required

## Design Principles

- **AI never moves money** — it recommends, the investor decides
- **AI never approves listings** — human compliance review gates all projects
- **AI surfaces its limitations** — explicitly shows what couldn't be verified
- **Multi-layer evidence** — no single source is trusted alone (photos + metadata + registry + cross-reference)

## Tech Stack

- **React 18** / **Vite** — frontend
- **Claude API** (Anthropic) — AI evaluation, tool-use agents, vision analysis
- **piexifjs** — JPEG EXIF metadata extraction
- **Canada Open Data Portal** — CRA registered charity verification
- **Vercel** — deployment (serverless API proxy)

## Setup

```bash
npm install

# Set up environment variables
cp .env.example .env
# Add your VITE_ANTHROPIC_API_KEY to .env

npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

```
src/
├── app.jsx                    # Main application (all components and flows)
└── compliance-knowledge.js    # RAG knowledge base (25+ regulatory chunks)
api/
└── anthropic.js               # Vercel serverless proxy for Anthropic API
```

## Compliance Coverage

The embedded knowledge base covers Ontario Securities Commission crowdfunding rules, CRA charity requirements, municipal zoning/permits (Toronto, Hamilton, Vancouver), and industry-specific regulations for environment, education, healthcare, small business lending, and research.

## Demo Projects

Five sample projects are included spanning community solar, STEM education, wetland restoration, micro-lending, and climate research — each with different risk profiles, return types, and verification statuses.
