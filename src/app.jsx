import { useState, useEffect, useRef } from "react";

const COLORS = {
  dune: "#32302F",
  duneLight: "#4A4745",
  warmWhite: "#FAFAF8",
  cream: "#F5F3EF",
  accent: "#E8702A",
  accentHover: "#D4621F",
  green: "#2D8F5C",
  greenLight: "#E8F5EE",
  yellow: "#E6A817",
  yellowLight: "#FDF6E3",
  red: "#C7493A",
  redLight: "#FDF0EE",
  blue: "#3B7DD8",
  blueLight: "#EDF3FC",
  border: "#E8E6E1",
  textSecondary: "#7A7671",
  textTertiary: "#A09B95",
};

const COMMUNITY_PROJECTS = [
  {
    id: 1, title: "Riverdale Community Solar Garden", category: "environment",
    location: "Toronto, ON", creator: "Riverdale Community Energy Co-op",
    funding_goal: 125000, funded: 87500, return_type: "blended",
    financial_return: "4.2% annually",
    impact_return: "Powers 45 homes with clean energy, reduces 180 tonnes CO₂/year",
    timeline: "18 months", verified: true, risk_score: "Low",
    milestones: [
      { name: "Site preparation & permits", status: "complete", date: "2025-06" },
      { name: "Panel installation", status: "in_progress", date: "2025-12" },
      { name: "Grid connection & first power", status: "upcoming", date: "2026-03" },
    ],
    description: "A community-owned solar installation on the roof of Riverdale Collegiate, generating clean energy for 45 neighbouring households and reducing electricity costs by 30%.",
  },
  {
    id: 2, title: "Moss Park Elementary STEM Lab", category: "education",
    location: "Toronto, ON", creator: "Moss Park Elementary Parent Council",
    funding_goal: 45000, funded: 31200, return_type: "impact",
    financial_return: "None — pure impact investment",
    impact_return: "Equips 340 students with modern science tools. Lab equipment verified by photo + inventory audit.",
    timeline: "6 months", verified: true, risk_score: "Very Low",
    milestones: [
      { name: "Equipment procurement", status: "complete", date: "2025-09" },
      { name: "Lab renovation", status: "in_progress", date: "2025-11" },
      { name: "First class in new lab", status: "upcoming", date: "2026-01" },
    ],
    description: "Moss Park Elementary's science lab hasn't been updated since 2008. This project funds microscopes, lab benches, a 3D printer, and safety equipment for 340 K-8 students.",
  },
  {
    id: 3, title: "Lake Simcoe Wetland Restoration", category: "environment",
    location: "Georgina, ON", creator: "Lake Simcoe Conservation Authority",
    funding_goal: 200000, funded: 64000, return_type: "impact",
    financial_return: "None — pure impact investment",
    impact_return: "Restores 12 hectares of wetland habitat. Verified by annual ecological assessment from University of Toronto.",
    timeline: "24 months", verified: true, risk_score: "Low",
    milestones: [
      { name: "Environmental assessment", status: "complete", date: "2025-04" },
      { name: "Phase 1: Invasive species removal", status: "in_progress", date: "2025-10" },
      { name: "Phase 2: Native planting", status: "upcoming", date: "2026-05" },
      { name: "Ecological monitoring report", status: "upcoming", date: "2027-04" },
    ],
    description: "Restoring degraded wetlands along Lake Simcoe's southern shore. The project removes invasive Phragmites, replants native species, and creates habitat corridors for at-risk species including the Blanding's Turtle.",
  },
  {
    id: 4, title: "Kensington Market Small Business Micro-Loans", category: "small_business",
    location: "Toronto, ON", creator: "Kensington Market BIA",
    funding_goal: 150000, funded: 112500, return_type: "financial",
    financial_return: "5.8% annually",
    impact_return: "Supports 12 independent businesses, preserving 35+ jobs in a culturally significant neighbourhood.",
    timeline: "36 months", verified: true, risk_score: "Medium",
    milestones: [
      { name: "Fund setup & borrower vetting", status: "complete", date: "2025-05" },
      { name: "First loan disbursements", status: "complete", date: "2025-08" },
      { name: "Q1 repayment cycle", status: "in_progress", date: "2026-02" },
      { name: "Full fund maturity", status: "upcoming", date: "2028-05" },
    ],
    description: "A pooled micro-loan fund for independent shops and restaurants in Kensington Market. Loans of $5K-$25K help businesses cover rent gaps, equipment upgrades, and seasonal inventory.",
  },
  {
    id: 5, title: "Open-Source Climate Modelling Research", category: "research",
    location: "Remote / University of Waterloo", creator: "Dr. Anika Patel, Dept. of Earth Sciences",
    funding_goal: 80000, funded: 22400, return_type: "impact",
    financial_return: "None — pure research funding",
    impact_return: "Produces open-source climate prediction tools accessible to any researcher globally. All code published under MIT license.",
    timeline: "12 months", verified: false, risk_score: "Medium-High",
    milestones: [
      { name: "Literature review & model design", status: "complete", date: "2025-07" },
      { name: "Data collection & training", status: "in_progress", date: "2026-01" },
      { name: "Model validation & paper submission", status: "upcoming", date: "2026-06" },
      { name: "Open-source release", status: "upcoming", date: "2026-07" },
    ],
    description: "Building an open-source machine learning model for hyperlocal climate prediction. Current global models operate at 100km resolution — this project aims for 1km, enabling better flood, drought, and heat planning for municipalities.",
  },
];

const CATEGORIES = [
  { id: "environment", label: "Environment", icon: "🌿" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "infrastructure", label: "Infrastructure", icon: "🏗️" },
  { id: "healthcare", label: "Healthcare", icon: "🏥" },
  { id: "small_business", label: "Small Business", icon: "🏪" },
  { id: "research", label: "Scientific Research", icon: "🔬" },
];

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

async function fetchClaude(body, signal, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch("/api/anthropic/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify(body),
      signal,
    });
    if (res.status === 529 && attempt < retries - 1) {
      console.warn(`FundLocal: API overloaded, retrying (${attempt + 1}/${retries})...`);
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
      continue;
    }
    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      console.error("FundLocal API error:", res.status, errBody);
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    const raw = data.content?.map(c => c.text || "").join("") || "";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    // Extract first complete JSON object/array — model sometimes appends commentary
    const startChar = cleaned[0];
    if (startChar === "[" || startChar === "{") {
      const close = startChar === "[" ? "]" : "}";
      let depth = 0, inStr = false, esc = false;
      for (let i = 0; i < cleaned.length; i++) {
        const ch = cleaned[i];
        if (esc) { esc = false; continue; }
        if (ch === "\\") { esc = true; continue; }
        if (ch === '"') { inStr = !inStr; continue; }
        if (inStr) continue;
        if (ch === startChar) depth++;
        if (ch === close) { depth--; if (depth === 0) return cleaned.slice(0, i + 1); }
      }
    }
    return cleaned;
  }
}

async function getAIMatches(profile, projects, signal) {
  const projectSummaries = projects.map(p => ({
    id: p.id, title: p.title, category: p.category, location: p.location,
    funding_goal: p.funding_goal, funded: p.funded, return_type: p.return_type,
    financial_return: p.financial_return, impact_return: p.impact_return,
    timeline: p.timeline, verified: p.verified, risk_score: p.risk_score,
    description: p.description,
  }));

  const system = `You are the AI matching engine for FundLocal, a community investment platform.

VOICE & TONE:
- Address the investor directly as "you" and "your" — never "the investor" or "the investor's".
- Write like a knowledgeable friend, not a financial advisor. Plain language, no jargon.
- Be honest and specific. Never say "seems promising" or "has potential" without citing the specific detail that makes it promising.
- Every score must be justified by concrete details from the project and the investor's profile. No generic filler.

SCORING RULES:
- ai_match_score: 0-100 overall match reflecting how well this project fits the investor's stated values, location, mix target, and credibility standards.
- Sub-scores (values, geographic, returns, credibility): each 0-100. A score below 50 must cite what's misaligned. A score above 85 must cite what's strongly aligned.
- The investor's impact/financial split is a PORTFOLIO-LEVEL target, not a per-project filter. A pure-impact project and a financially-focused project can BOTH score highly if together they help achieve the desired overall balance. Do NOT penalize a project just because it leans impact-only or financial-only — consider how it complements other top matches.

OUTPUT FORMAT:
Respond in EXACTLY this JSON (no markdown, no backticks):
[{"id":1,"ai_match_score":90,"scores":{"values":95,"geographic":85,"returns":88,"credibility":90},"ai_reasoning":"...","ai_limitations":"..."},...]

- ai_reasoning: 2-3 sentences explaining why this matches or doesn't. When discussing returns fit, frame it in terms of portfolio balance.
- ai_limitations: 1-2 sentences on what can't be independently verified.`;

  const userMessage = `INVESTOR PROFILE:
- Preferred categories (ranked, #1 = most important): ${(profile.selectedCategories || []).map((c, i) => `#${i + 1} ${c}`).join(", ") || "none specified"}
- Location preference: ${profile.location || "any"}
- Desired portfolio mix: ${100 - (profile.returnMix || 50)}% impact / ${profile.returnMix || 50}% financial
- Investment amount: $${Number(profile.amount || 5000).toLocaleString()}

PROJECTS:
${JSON.stringify(projectSummaries, null, 2)}

Score each project against this investor's profile.`;

  const cleaned = await fetchClaude({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2000,
    temperature: 0.3,
    system,
    messages: [{ role: "user", content: userMessage }],
  }, signal);
  return JSON.parse(cleaned);
}

function Logo() {
  return (
    <span style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontWeight: 700, fontSize: 20, color: COLORS.dune, letterSpacing: "-0.02em" }}>
      fund<span style={{ color: COLORS.accent }}>local</span>
    </span>
  );
}

function VerifiedBadge({ verified }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 100, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: verified ? COLORS.greenLight : COLORS.yellowLight, color: verified ? COLORS.green : "#B8860B" }}>
      {verified ? "✓ Verified" : "⏳ Under review"}
    </span>
  );
}

function ScoreBreakdown({ scores }) {
  const dims = [{ key: "values", label: "Values" }, { key: "geographic", label: "Location" }, { key: "returns", label: "Returns" }, { key: "credibility", label: "Credibility" }];
  return (
    <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
      {dims.map(d => (
        <div key={d.key} style={{ flex: 1, padding: "6px 0", borderRadius: 6, background: scores[d.key] >= 85 ? COLORS.greenLight : scores[d.key] >= 65 ? COLORS.yellowLight : COLORS.redLight, textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, color: COLORS.textTertiary, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{d.label}</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: scores[d.key] >= 85 ? COLORS.green : scores[d.key] >= 65 ? "#B8860B" : COLORS.red }}>{scores[d.key]}</p>
        </div>
      ))}
    </div>
  );
}

function Nav({ currentView, setCurrentView, setScreen }) {
  const [signupToast, setSignupToast] = useState(false);
  const handleSignup = () => { setSignupToast(true); setTimeout(() => setSignupToast(false), 2500); };
  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", borderBottom: `1px solid ${COLORS.border}`, background: "#fff", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <div style={{ cursor: "pointer" }} onClick={() => setScreen("welcome")}><Logo /></div>
        <div style={{ display: "flex", gap: 8 }}>
          {[{ key: "investor", label: "Invest", target: "values" }, { key: "creator", label: "Get funded", target: "creator_landing" }].map(v => (
            <button key={v.key} onClick={() => { setCurrentView(v.key); setScreen(v.target); }}
              style={{ padding: "8px 20px", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, background: currentView === v.key ? COLORS.dune : "transparent", color: currentView === v.key ? "#fff" : COLORS.textSecondary, transition: "all 0.2s" }}>
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <button onClick={handleSignup} style={{ padding: "10px 24px", borderRadius: 100, border: "none", background: COLORS.dune, color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Sign up</button>
        {signupToast && (
          <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, padding: "10px 16px", borderRadius: 10, background: COLORS.dune, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", animation: "fadeIn 0.2s ease" }}>
            Coming soon
          </div>
        )}
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </nav>
  );
}

function WelcomeNav() {
  const [toast, setToast] = useState(false);
  const handleSignup = () => { setToast(true); setTimeout(() => setToast(false), 2500); };
  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", position: "absolute", top: 0, left: 0, right: 0, zIndex: 100 }}>
      <Logo />
      <div style={{ position: "relative" }}>
        <button onClick={handleSignup} style={{ padding: "10px 24px", borderRadius: 100, border: "none", background: COLORS.dune, color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Sign up</button>
        {toast && (
          <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, padding: "10px 16px", borderRadius: 10, background: COLORS.dune, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", animation: "fadeIn 0.2s ease" }}>
            Coming soon
          </div>
        )}
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </nav>
  );
}

function WelcomeScreen({ onStart }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 100); }, []);
  return (
    <div style={{ minHeight: "calc(100vh - 73px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "80px 40px", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <div style={{ maxWidth: 680, textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24 }}>Introducing FundLocal</p>
        <h1 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 52, fontWeight: 400, lineHeight: 1.15, color: COLORS.dune, marginBottom: 28, letterSpacing: "-0.02em" }}>Your money should do<br />more than grow.</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 19, lineHeight: 1.65, color: COLORS.textSecondary, marginBottom: 48, maxWidth: 520, margin: "0 auto 48px" }}>Choose exactly where your investment goes — your neighbourhood school, a local solar project, the small business down the street. AI finds the opportunities. You make the call.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button onClick={() => onStart("investor")} style={{ padding: "14px 36px", borderRadius: 100, border: "none", background: COLORS.dune, color: "#fff", fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Start investing</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, maxWidth: 900, marginTop: 100, width: "100%" }}>
        {[{ num: "01", title: "Tell us what matters", desc: "Pick the causes, communities, and return types that align with your values." }, { num: "02", title: "AI finds the match", desc: "Our AI evaluates hundreds of community projects against your profile — risk, impact, alignment." }, { num: "03", title: "You decide", desc: "Review the reasoning, see the milestones, and choose where your money goes. Always." }].map((item, i) => (
          <div key={i} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.15}s` }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textTertiary, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>{item.num}</p>
            <p style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 18, color: COLORS.dune, marginBottom: 8 }}>{item.title}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textSecondary, lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 680, marginTop: 80, width: "100%", textAlign: "center", borderTop: `1px solid ${COLORS.border}`, paddingTop: 48 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 8 }}>Have a project that needs funding?</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textTertiary, lineHeight: 1.6, marginBottom: 20, maxWidth: 480, margin: "0 auto 20px" }}>FundLocal helps community creators get AI-evaluated proposals in front of aligned investors.</p>
        <button onClick={() => onStart("creator_landing")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.accent, padding: 0 }}>Get funded →</button>
      </div>
    </div>
  );
}

function CreatorLandingScreen({ onStartProposal, onSwitchToInvestor }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 100); }, []);
  return (
    <div style={{ minHeight: "calc(100vh - 73px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "80px 40px", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <div style={{ maxWidth: 680, textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24 }}>For community creators</p>
        <h1 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 44, fontWeight: 400, lineHeight: 1.2, color: COLORS.dune, marginBottom: 28, letterSpacing: "-0.02em" }}>Your community has investors.<br />They just can't find you yet.</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 19, lineHeight: 1.65, color: COLORS.textSecondary, marginBottom: 48, maxWidth: 520, margin: "0 auto 48px" }}>Build your proposal, get AI feedback in minutes, and put your project in front of investors who care about your community.</p>
        <button onClick={onStartProposal} style={{ padding: "14px 36px", borderRadius: 100, border: "none", background: COLORS.dune, color: "#fff", fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Start your proposal →</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, maxWidth: 900, marginTop: 100, width: "100%" }}>
        {[{ num: "01", title: "Build your proposal", desc: "Walk through our guided wizard — project details, budget, team, and impact plan." }, { num: "02", title: "AI evaluates & coaches", desc: "Get instant feedback on strengths, weaknesses, and what investors will look for." }, { num: "03", title: "Submit & get funded", desc: "Strong proposals go live to aligned investors. You stay in control the whole way." }].map((item, i) => (
          <div key={i} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.15}s` }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textTertiary, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>{item.num}</p>
            <p style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 18, color: COLORS.dune, marginBottom: 8 }}>{item.title}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textSecondary, lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <button onClick={onSwitchToInvestor} style={{ marginTop: 60, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textTertiary, padding: 0 }}>Looking to invest instead? →</button>
    </div>
  );
}

function ValuesIntake({ onComplete }) {
  const [sel, setSel] = useState([]);
  const [loc, setLoc] = useState("toronto");
  const [ret, setRet] = useState(40);
  const [amt, setAmt] = useState("5000");
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 100); }, []);
  const toggle = id => setSel(p => p.includes(id) ? p.filter(c => c !== id) : [...p, id]);
  const promote = idx => { if (idx <= 0) return; setSel(p => { const n = [...p]; [n[idx - 1], n[idx]] = [n[idx], n[idx - 1]]; return n; }); };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "60px 40px 100px", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Your values profile</p>
      <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 36, fontWeight: 400, color: COLORS.dune, marginBottom: 12 }}>What do you care about?</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.textSecondary, lineHeight: 1.6, marginBottom: 48 }}>This helps our AI match you with projects that actually matter to you. Not a generic portfolio — your priorities, your community.</p>

      <div style={{ marginBottom: 48 }}>
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.dune, display: "block", marginBottom: 16 }}>Select the areas you want to invest in</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {CATEGORIES.map(cat => {
            const rank = sel.indexOf(cat.id);
            const isSelected = rank !== -1;
            return (
              <button key={cat.id} onClick={() => toggle(cat.id)} style={{ padding: "20px 16px", borderRadius: 12, border: `1.5px solid ${isSelected ? COLORS.dune : COLORS.border}`, background: isSelected ? COLORS.cream : "#fff", cursor: "pointer", textAlign: "center", transition: "all 0.2s", position: "relative" }}>
                {isSelected && <span style={{ position: "absolute", top: 8, right: 8, width: 22, height: 22, borderRadius: "50%", background: COLORS.dune, color: "#fff", fontSize: 11, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>{rank + 1}</span>}
                <span style={{ fontSize: 24, display: "block", marginBottom: 8 }}>{cat.icon}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.dune }}>{cat.label}</span>
              </button>
            );
          })}
        </div>
        {sel.length >= 2 && (
          <div style={{ marginTop: 16 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.textSecondary, display: "block", marginBottom: 10 }}>Your priority ranking</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {sel.map((id, idx) => {
                const cat = CATEGORIES.find(c => c.id === id);
                return (
                  <div key={id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderRadius: 10, background: "#fff", border: `1px solid ${COLORS.border}` }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: COLORS.accent, minWidth: 20 }}>#{idx + 1}</span>
                    <span style={{ fontSize: 16 }}>{cat.icon}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.dune, flex: 1 }}>{cat.label}</span>
                    {idx > 0 && <button onClick={(e) => { e.stopPropagation(); promote(idx); }} style={{ border: "none", background: COLORS.cream, borderRadius: 6, cursor: "pointer", padding: "4px 8px", fontSize: 14, color: COLORS.dune, fontWeight: 600, lineHeight: 1 }}>↑</button>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: 48 }}>
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.dune, display: "block", marginBottom: 16 }}>Where do you want your money to go?</label>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ id: "hyperlocal", label: "My neighbourhood" }, { id: "toronto", label: "Toronto" }, { id: "regional", label: "Ontario" }, { id: "anywhere", label: "Anywhere" }].map(l => (
            <button key={l.id} onClick={() => setLoc(l.id)} style={{ padding: "10px 20px", borderRadius: 100, border: `1.5px solid ${loc === l.id ? COLORS.dune : COLORS.border}`, background: loc === l.id ? COLORS.dune : "#fff", color: loc === l.id ? "#fff" : COLORS.textSecondary, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>{l.label}</button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 48 }}>
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.dune, display: "block", marginBottom: 8 }}>What kind of returns matter to you?</label>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary, marginBottom: 20 }}>Slide to set your balance between community impact and financial return.</p>
        <style>{`
          .slider-neutral::-webkit-slider-runnable-track { background: ${COLORS.border}; height: 6px; border-radius: 3px; }
          .slider-neutral::-moz-range-track { background: ${COLORS.border}; height: 6px; border-radius: 3px; }
          .slider-neutral::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: ${COLORS.accent}; margin-top: -7px; cursor: pointer; }
          .slider-neutral::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: ${COLORS.accent}; border: none; cursor: pointer; }
          .slider-neutral::-moz-range-progress { background: ${COLORS.border}; height: 6px; border-radius: 3px; }
        `}</style>
        <input type="range" min="0" max="100" value={ret} onChange={e => setRet(e.target.value)} className="slider-neutral" style={{ width: "100%", height: 6, cursor: "pointer", WebkitAppearance: "none", appearance: "none", background: "transparent" }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary }}>100% Impact</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: COLORS.dune, background: COLORS.cream, padding: "4px 14px", borderRadius: 100 }}>{100 - ret}% impact · {ret}% financial</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary }}>100% Financial</span>
        </div>
      </div>

      <div style={{ marginBottom: 56 }}>
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.dune, display: "block", marginBottom: 16 }}>How much are you looking to invest?</label>
        <div style={{ display: "flex", gap: 10 }}>
          {["1000", "5000", "10000", "25000"].map(a => (
            <button key={a} onClick={() => setAmt(a)} style={{ padding: "10px 24px", borderRadius: 100, border: `1.5px solid ${amt === a ? COLORS.dune : COLORS.border}`, background: amt === a ? COLORS.dune : "#fff", color: amt === a ? "#fff" : COLORS.textSecondary, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>${Number(a).toLocaleString()}</button>
          ))}
        </div>
      </div>

      <button onClick={() => onComplete({ selectedCategories: sel, location: loc, returnMix: ret, amount: amt })} disabled={sel.length === 0} style={{ width: "100%", padding: "16px", borderRadius: 100, border: "none", background: sel.length > 0 ? COLORS.dune : COLORS.border, color: sel.length > 0 ? "#fff" : COLORS.textTertiary, fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: sel.length > 0 ? "pointer" : "default", transition: "all 0.2s" }}>Find my matches →</button>
    </div>
  );
}

function MatchResults({ profile, onSelectProject, cachedProjects, cachedFallback, onCacheResults }) {
  const hasCached = cachedProjects && cachedProjects.length > 0;
  const [v, setV] = useState(hasCached);
  const [thinking, setThinking] = useState(!hasCached);
  const [ts, setTs] = useState(0);
  const [projects, setProjects] = useState(hasCached ? cachedProjects : []);
  const [apiFallback, setApiFallback] = useState(hasCached ? cachedFallback : false);
  const animDone = useRef(false);
  const apiDone = useRef(false);
  const apiResult = useRef(null);
  const steps = ["Analyzing your values profile...", "Scanning 847 community projects...", "Evaluating risk and impact alignment...", "Ranking matches by your priorities..."];

  useEffect(() => {
    if (hasCached) return;

    setTimeout(() => setV(true), 100);

    // Thinking animation
    const i = setInterval(() => {
      setTs(p => {
        if (p >= steps.length - 1) {
          clearInterval(i);
          setTimeout(() => {
            animDone.current = true;
            if (apiDone.current) {
              setProjects(apiResult.current);
              setThinking(false);
            }
          }, 800);
          return p;
        }
        return p + 1;
      });
    }, 900);

    // AI matching API call (runs concurrently with animation)
    const controller = new AbortController();
    getAIMatches(profile, COMMUNITY_PROJECTS, controller.signal)
      .then(matches => {
        const merged = COMMUNITY_PROJECTS.map(p => {
          const m = matches.find(x => x.id === p.id);
          return m ? { ...p, ai_match_score: m.ai_match_score, scores: m.scores, ai_reasoning: m.ai_reasoning, ai_limitations: m.ai_limitations } : null;
        }).filter(Boolean).sort((a, b) => b.ai_match_score - a.ai_match_score);
        apiDone.current = true;
        const resultProjects = merged.length > 0 ? merged : buildFallbackProjects(profile);
        const isFallback = merged.length === 0;
        apiResult.current = resultProjects;
        if (isFallback) setApiFallback(true);
        onCacheResults(resultProjects, isFallback);
        if (animDone.current) { setProjects(apiResult.current); setThinking(false); }
      })
      .catch(err => {
        if (err.name === "AbortError") return;
        console.warn("FundLocal: AI matching failed, using fallback.", err);
        apiDone.current = true;
        apiResult.current = buildFallbackProjects(profile);
        setApiFallback(true);
        onCacheResults(apiResult.current, true);
        if (animDone.current) { setProjects(apiResult.current); setThinking(false); }
      });

    return () => { clearInterval(i); controller.abort(); };
  }, []);

  if (thinking) return (
    <div style={{ minHeight: "calc(100vh - 73px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40 }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", border: `3px solid ${COLORS.border}`, borderTopColor: COLORS.accent, animation: "spin 0.8s linear infinite", marginBottom: 32 }} />
      <div style={{ textAlign: "center" }}>
        {steps.map((s, i) => (<p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: i <= ts ? COLORS.dune : COLORS.textTertiary, opacity: i <= ts ? 1 : 0.4, transition: "all 0.4s", marginBottom: 8, fontWeight: i === ts ? 600 : 400 }}>{i < ts ? "✓ " : i === ts ? "→ " : ""}{s}</p>))}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 40px 100px", opacity: v ? 1 : 0, transition: "opacity 0.6s" }}>
      {apiFallback && (
        <div style={{ padding: "14px 20px", borderRadius: 10, background: COLORS.yellowLight, border: `1px solid ${COLORS.yellow}`, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16 }}>&#9888;</span>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#B8860B", lineHeight: 1.5 }}>Personalized AI matching is temporarily unavailable. Showing results filtered by your selected categories. Please try again shortly.</p>
        </div>
      )}
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Your matches</p>
      <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 36, fontWeight: 400, color: COLORS.dune, marginBottom: 12 }}>{projects.length} projects matched to you.</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.textSecondary, lineHeight: 1.6, marginBottom: 48 }}>Ranked by how well each project aligns with your values, location, and return preferences. Read the AI's reasoning — then decide.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onClick={() => onSelectProject(p)} />)}
      </div>
    </div>
  );
}

function buildFallbackProjects(profile) {
  const filtered = COMMUNITY_PROJECTS.filter(p => !profile?.selectedCategories?.length || profile.selectedCategories.includes(p.category));
  const base = filtered.length > 0 ? filtered : COMMUNITY_PROJECTS.slice(0, 3);
  return base.map((p, i) => ({
    ...p,
    ai_match_score: 75 - i * 5,
    scores: { values: 70, geographic: 70, returns: 70, credibility: 70 },
    ai_reasoning: "This project matches the categories you selected. We'll have a more detailed, personalized breakdown for you shortly.",
    ai_limitations: "Scores shown are preliminary estimates based on your category preferences. Personalized analysis will be available soon.",
  }));
}

function ProjectCard({ project, index, onClick }) {
  const [h, setH] = useState(false);
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 150 + index * 100); }, []);
  const rt = { impact: { bg: COLORS.greenLight, text: COLORS.green, label: "Impact return" }, financial: { bg: COLORS.blueLight, text: COLORS.blue, label: "Financial return" }, blended: { bg: COLORS.yellowLight, text: COLORS.yellow, label: "Blended return" } }[project.return_type];
  const pct = Math.round((project.funded / project.funding_goal) * 100);

  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ padding: 32, borderRadius: 16, border: `1.5px solid ${h ? COLORS.dune : COLORS.border}`, background: "#fff", cursor: "pointer", transform: v ? (h ? "translateY(-2px)" : "none") : "translateY(12px)", opacity: v ? 1 : 0, boxShadow: h ? "0 8px 32px rgba(0,0,0,0.08)" : "none", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: rt.bg, color: rt.text }}>{rt.label}</span>
            <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, background: COLORS.cream, color: COLORS.textSecondary }}>{project.location}</span>
            <VerifiedBadge verified={project.verified} />
          </div>
          <h3 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 20, color: COLORS.dune, marginBottom: 6 }}>{project.title}</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textSecondary }}>{project.creator}</p>
        </div>
        <div style={{ width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: project.ai_match_score >= 90 ? COLORS.greenLight : project.ai_match_score >= 80 ? COLORS.yellowLight : COLORS.cream, flexShrink: 0, marginLeft: 24 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: project.ai_match_score >= 90 ? COLORS.green : project.ai_match_score >= 80 ? "#B8860B" : COLORS.textSecondary }}>{project.ai_match_score}</span>
        </div>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textSecondary, lineHeight: 1.6, marginBottom: 20 }}>{project.description}</p>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.dune }}>${project.funded.toLocaleString()} raised</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary }}>{pct}% of ${project.funding_goal.toLocaleString()}</span>
        </div>
        <div style={{ height: 6, background: COLORS.cream, borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: COLORS.accent, borderRadius: 3, transition: "width 1s ease" }} />
        </div>
      </div>
      <ScoreBreakdown scores={project.scores} />
      <div style={{ padding: 16, borderRadius: 10, background: COLORS.warmWhite, borderLeft: `3px solid ${COLORS.accent}`, marginTop: 14 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>AI match reasoning</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.duneLight, lineHeight: 1.6 }}>{project.ai_reasoning}</p>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onBack, onApprove }) {
  const [amt, setAmt] = useState("500");
  const [approved, setApproved] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 100); }, []);
  const rt = { impact: { bg: COLORS.greenLight, text: COLORS.green, label: "Impact return" }, financial: { bg: COLORS.blueLight, text: COLORS.blue, label: "Financial return" }, blended: { bg: COLORS.yellowLight, text: COLORS.yellow, label: "Blended return" } }[project.return_type];

  const handleApprove = () => { setConfirming(true); setTimeout(() => { setApproved(true); setTimeout(() => onApprove(project, amt), 2000); }, 1500); };

  if (approved) return (
    <div style={{ minHeight: "calc(100vh - 73px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40 }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: COLORS.greenLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, animation: "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}><span style={{ fontSize: 32 }}>✓</span></div>
      <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 28, color: COLORS.dune, marginBottom: 12, textAlign: "center" }}>Investment confirmed.</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.textSecondary, textAlign: "center" }}>${Number(amt).toLocaleString()} → {project.title}</p>
      <style>{`@keyframes scaleIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 40px 100px", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(12px)", transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textSecondary, marginBottom: 32, padding: 0 }}>← Back to matches</button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: rt.bg, color: rt.text }}>{rt.label}</span>
          <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, background: COLORS.cream, color: COLORS.textSecondary }}>{project.risk_score} risk</span>
          <VerifiedBadge verified={project.verified} />
        </div>
        <div style={{ width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: project.ai_match_score >= 90 ? COLORS.greenLight : project.ai_match_score >= 80 ? COLORS.yellowLight : COLORS.cream, flexShrink: 0 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: project.ai_match_score >= 90 ? COLORS.green : project.ai_match_score >= 80 ? "#B8860B" : COLORS.textSecondary }}>{project.ai_match_score}</span>
        </div>
      </div>

      <h1 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 36, fontWeight: 400, color: COLORS.dune, marginBottom: 8 }}>{project.title}</h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.textSecondary, marginBottom: 32 }}>{project.creator} · {project.location}</p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.duneLight, lineHeight: 1.7, marginBottom: 40 }}>{project.description}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, borderRadius: 12, background: COLORS.warmWhite }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Returns</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: COLORS.dune }}>{project.return_type === "impact" ? "Pure impact" : project.financial_return}</p>
        </div>
        <div style={{ padding: 20, borderRadius: 12, background: COLORS.warmWhite }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Timeline</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: COLORS.dune }}>{project.timeline}</p>
        </div>
      </div>

      <div style={{ padding: 24, borderRadius: 12, background: COLORS.greenLight, marginBottom: 24 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.green, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Real-world impact</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.dune, lineHeight: 1.6 }}>{project.impact_return}</p>
      </div>

      {project.return_type !== "impact" && (
        <div style={{ padding: 24, borderRadius: 12, background: COLORS.blueLight, borderLeft: `3px solid ${COLORS.blue}`, marginBottom: 24 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.blue, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>How you get paid</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.duneLight, lineHeight: 1.7 }}>
            You put your money in, and as the project hits its goals you get paid back — earning {project.financial_return} over {project.timeline}. Your money isn't locked up all at once: it releases in stages as each milestone is verified, so the project has to prove progress before more funds flow.
          </p>
        </div>
      )}

      <div style={{ padding: 20, borderRadius: 12, border: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.dune }}>Match breakdown</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.textSecondary }}>{project.ai_match_score}/100 overall</p>
        </div>
        <ScoreBreakdown scores={project.scores} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: COLORS.dune, marginBottom: 8 }}>Milestones & accountability</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary, marginBottom: 16, lineHeight: 1.5 }}>Money releases step by step as goals are met — not all at once. If a milestone isn't hit, remaining funds stay put.</p>
        {project.milestones.map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: m.status === "complete" ? COLORS.green : m.status === "in_progress" ? COLORS.accent : COLORS.border }}>
              <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{m.status === "complete" ? "✓" : m.status === "in_progress" ? "→" : (i + 1)}</span>
            </div>
            <div><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.dune }}>{m.name}</p><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textSecondary }}>{m.date}</p></div>
          </div>
        ))}
      </div>

      <div style={{ padding: 24, borderRadius: 12, background: COLORS.warmWhite, borderLeft: `3px solid ${COLORS.accent}`, marginBottom: 16 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Why we matched you</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.duneLight, lineHeight: 1.7 }}>{project.ai_reasoning}</p>
      </div>

      <div style={{ padding: 20, borderRadius: 12, background: COLORS.warmWhite, borderLeft: `3px solid ${COLORS.border}`, marginBottom: 40 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>What we can't verify</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.6 }}>{project.ai_limitations}</p>
      </div>

      <div style={{ padding: 32, borderRadius: 16, border: `2px solid ${COLORS.dune}`, background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.accent }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>Human decision required</p>
        </div>
        <h3 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 22, color: COLORS.dune, marginBottom: 8 }}>Your call.</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textSecondary, lineHeight: 1.6, marginBottom: 24 }}>Our AI found this match and evaluated the risks. But only you can decide if this is where your money should go. We'll never invest without your explicit approval.</p>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.dune, display: "block", marginBottom: 10 }}>Investment amount</label>
          <div style={{ display: "flex", gap: 8 }}>
            {["100", "250", "500", "1000"].map(a => (
              <button key={a} onClick={() => setAmt(a)} style={{ padding: "8px 20px", borderRadius: 100, border: `1.5px solid ${amt === a ? COLORS.dune : COLORS.border}`, background: amt === a ? COLORS.dune : "#fff", color: amt === a ? "#fff" : COLORS.textSecondary, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>${a}</button>
            ))}
          </div>
        </div>
        <button onClick={handleApprove} disabled={confirming} style={{ width: "100%", padding: "16px", borderRadius: 100, border: "none", background: confirming ? COLORS.green : COLORS.dune, color: "#fff", fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: confirming ? "default" : "pointer", transition: "all 0.3s" }}>
          {confirming ? "Confirming..." : `Invest $${Number(amt).toLocaleString()} →`}
        </button>
      </div>
    </div>
  );
}

function Dashboard({ investments }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 100); }, []);
  const total = investments.reduce((s, i) => s + Number(i.amount), 0);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 40px 100px", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(12px)", transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Your portfolio</p>
      <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 36, fontWeight: 400, color: COLORS.dune, marginBottom: 48 }}>Here's what your money is building.</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 24, borderRadius: 16, background: COLORS.dune }}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Total invested</p><p style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 32, color: "#fff" }}>${total.toLocaleString()}</p></div>
        <div style={{ padding: 24, borderRadius: 16, background: COLORS.greenLight }}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.green, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Projects funded</p><p style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 32, color: COLORS.green }}>{investments.length}</p></div>
        <div style={{ padding: 24, borderRadius: 16, background: COLORS.warmWhite }}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Milestones hit</p><p style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 32, color: COLORS.dune }}>{investments.reduce((s, i) => s + i.project.milestones.filter(m => m.status === "complete").length, 0)}</p></div>
      </div>

      <div style={{ padding: 24, borderRadius: 16, background: COLORS.greenLight, marginBottom: 48 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.green, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Your impact so far</p>
        {investments.map((inv, i) => (
          <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.dune, lineHeight: 1.6, marginBottom: i < investments.length - 1 ? 8 : 0 }}>
            <span style={{ fontWeight: 600 }}>{inv.project.title}:</span> {inv.project.impact_return}
          </p>
        ))}
      </div>
      {investments.map((inv, i) => {
        const pct = Math.round((inv.project.funded / inv.project.funding_goal) * 100);
        return (
          <div key={i} style={{ padding: 28, borderRadius: 16, border: `1px solid ${COLORS.border}`, background: "#fff", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div><h3 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 18, color: COLORS.dune, marginBottom: 4 }}>{inv.project.title}</h3><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary }}>{inv.project.location}</p></div>
              <div style={{ textAlign: "right" }}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: COLORS.dune }}>${Number(inv.amount).toLocaleString()}</p><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textSecondary }}>invested</p></div>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              <div style={{ flex: 1 }}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.textTertiary, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Funded</p><div style={{ height: 6, background: COLORS.cream, borderRadius: 3, overflow: "hidden", marginBottom: 4 }}><div style={{ height: "100%", width: `${pct}%`, background: COLORS.accent, borderRadius: 3 }} /></div><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textSecondary }}>{pct}%</p></div>
              <div style={{ flex: 1 }}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.textTertiary, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Milestones</p><div style={{ display: "flex", gap: 4 }}>{inv.project.milestones.map((m, j) => (<div key={j} style={{ flex: 1, height: 6, borderRadius: 3, background: m.status === "complete" ? COLORS.green : m.status === "in_progress" ? COLORS.accent : COLORS.cream }} />))}</div><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textSecondary, marginTop: 4 }}>{inv.project.milestones.filter(m => m.status === "complete").length}/{inv.project.milestones.length}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CreatorView() {
  const [step, setStep] = useState("form");
  const [formStep, setFormStep] = useState(1);
  const [v, setV] = useState(false);
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [loc, setLoc] = useState("");
  const [goal, setGoal] = useState("");
  const [problem, setProblem] = useState("");
  const [beneficiaries, setBeneficiaries] = useState("");
  const [timeline, setTimeline] = useState("");
  const [milestones, setMilestones] = useState("");
  const [fundUse, setFundUse] = useState("");
  const [team, setTeam] = useState("");
  const [impactPlan, setImpactPlan] = useState("");
  const [evidence, setEvidence] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [aiResult, setAiResult] = useState(null);
  const [raw, setRaw] = useState("");
  const [evalFallback, setEvalFallback] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 100); }, []);

  const canNext = () => {
    if (formStep === 1) return title.trim() && cat && loc.trim();
    if (formStep === 2) return problem.trim();
    if (formStep === 3) return fundUse.trim();
    if (formStep === 4) return goal.trim();
    return true;
  };

  const evaluate = async () => {
    setStep("evaluating");
    const evalSystem = `You are an AI project evaluator for FundLocal, a community investment platform.

VOICE & TONE:
- Be encouraging but honest. Creators need real feedback, not flattery.
- Be specific — reference actual details from their proposal. Never say "your project seems interesting" without citing what's interesting.
- Write for someone who may not have written a funding proposal before. Clear, plain language.

SCORING RULES:
- Rate impact, feasibility, readiness, and clarity as High, Medium, or Low.
- "High" means the proposal provides concrete, specific detail. "Medium" means it's present but vague. "Low" means it's missing or too thin to evaluate.
- Each explanation must cite the specific part of the proposal that earned that rating.

EVIDENCE VERIFICATION:
- Flag any claims that lack supporting evidence (partnerships, credentials, institutional backing, cost estimates) in the risk_flags array with prefix "UNVERIFIED:".
- If evidence links or documents are provided, acknowledge them but note they haven't been independently verified.

OUTPUT FORMAT:
Respond in EXACTLY this JSON (no markdown, no backticks):
{"overall_assessment":"2-3 sentences","scores":{"impact":{"rating":"High/Medium/Low","explanation":"1 sentence"},"feasibility":{"rating":"High/Medium/Low","explanation":"1 sentence"},"readiness":{"rating":"High/Medium/Low","explanation":"1 sentence"},"clarity":{"rating":"High/Medium/Low","explanation":"1 sentence"}},"strengths":["s1","s2","s3"],"improvements":["i1","i2","i3","i4"],"risk_flags":["r1","r2"],"suggested_milestones":["m1","m2","m3"]}

- strengths: 3 specific things done well, citing proposal details.
- improvements: 3-4 actionable suggestions with enough detail to act on.
- risk_flags: real concerns investors would raise. Prefix unverified claims with "UNVERIFIED:".
- suggested_milestones: 3 concrete, time-bound milestones appropriate to this project's scope.`;

    const evalMessage = `PROJECT: ${title || "Untitled"} | Category: ${cat || "N/A"} | Location: ${loc || "N/A"} | Goal: ${goal || "N/A"}

Problem being addressed:
${problem || "Not provided"}

Who benefits: ${beneficiaries || "Not specified"}

How funds will be used:
${fundUse || "Not provided"}

Timeline: ${timeline || "Not provided"}

Key milestones:
${milestones || "Not provided"}

Team & credentials:
${team || "Not provided"}

Impact measurement plan:
${impactPlan || "Not provided"}

Evidence provided: ${evidence || "None"}

Evaluate this proposal.`;

    try {
      const text = await fetchClaude({ model: "claude-haiku-4-5-20251001", max_tokens: 2048, temperature: 0.3, system: evalSystem, messages: [{ role: "user", content: evalMessage }] });
      try { setAiResult(JSON.parse(text)); setStep("results"); }
      catch { setRaw(text); setStep("results_raw"); }
    } catch (err) {
      setEvalFallback(true);
      setAiResult({ overall_assessment: "We couldn't run a personalized evaluation right now. Below is a general assessment based on the information you provided — you can revise and resubmit anytime.", scores: { impact: { rating: "Medium", explanation: "We'll assess this when evaluation is back online" }, feasibility: { rating: "Medium", explanation: "We'll assess this when evaluation is back online" }, readiness: { rating: "Medium", explanation: "We'll assess this when evaluation is back online" }, clarity: { rating: "Medium", explanation: "We'll assess this when evaluation is back online" } }, strengths: ["Your project has been submitted successfully", "Category and funding goal are clearly defined", "Location targeting is specified"], improvements: ["Add milestones with specific dates", "Break down how funds will be allocated", "Describe how impact will be measured", "Include team background and credentials"], risk_flags: ["Personalized risk analysis will be available on resubmission"], suggested_milestones: ["Phase 1: Planning (Month 1-2)", "Phase 2: Implementation (Month 3-6)", "Phase 3: Verification (Month 7-8)"] });
      setStep("results");
    }
  };

  const rc = r => r === "High" ? COLORS.green : r === "Medium" ? "#B8860B" : COLORS.red;
  const rb = r => r === "High" ? COLORS.greenLight : r === "Medium" ? COLORS.yellowLight : COLORS.redLight;

  if (step === "evaluating") return (
    <div style={{ minHeight: "calc(100vh - 73px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40 }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", border: `3px solid ${COLORS.border}`, borderTopColor: COLORS.accent, animation: "spin 0.8s linear infinite", marginBottom: 32 }} />
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: COLORS.dune, marginBottom: 8 }}>AI is evaluating your proposal...</p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textSecondary }}>Assessing impact, feasibility, readiness, and clarity</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (step === "results_raw") return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "60px 40px 100px" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>AI Evaluation</p>
      <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 36, fontWeight: 400, color: COLORS.dune, marginBottom: 24 }}>Here's what our AI found.</h2>
      <div style={{ padding: 24, borderRadius: 12, background: COLORS.warmWhite, borderLeft: `3px solid ${COLORS.accent}` }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.duneLight, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{raw}</p>
      </div>
      <button onClick={() => { setStep("form"); setFormStep(5); setAiResult(null); }} style={{ marginTop: 24, padding: "14px 36px", borderRadius: 100, border: `1.5px solid ${COLORS.border}`, background: "#fff", color: COLORS.dune, fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>← Revise proposal</button>
    </div>
  );

  if (step === "results" && aiResult) {
    const lowCount = Object.values(aiResult.scores).filter(s => s.rating === "Low").length;
    const isWeak = lowCount >= 2;
    const unverifiedFlags = (aiResult.risk_flags || []).filter(f => f.startsWith("UNVERIFIED:"));
    const regularFlags = (aiResult.risk_flags || []).filter(f => !f.startsWith("UNVERIFIED:"));

    return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "60px 40px 100px", opacity: v ? 1 : 0, transition: "opacity 0.6s" }}>
      {evalFallback && (
        <div style={{ padding: "14px 20px", borderRadius: 10, background: COLORS.yellowLight, border: `1px solid ${COLORS.yellow}`, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16 }}>&#9888;</span>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#B8860B", lineHeight: 1.5 }}>AI evaluation is temporarily unavailable. Showing a general assessment template. Please try again shortly for a personalized evaluation.</p>
        </div>
      )}
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>AI Evaluation Complete</p>
      <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 36, fontWeight: 400, color: COLORS.dune, marginBottom: 12 }}>Here's what our AI found.</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.textSecondary, lineHeight: 1.6, marginBottom: 40 }}>{aiResult.overall_assessment}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
        {Object.entries(aiResult.scores).map(([k, val]) => (
          <div key={k} style={{ padding: 16, borderRadius: 12, background: rb(val.rating), textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{k}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: rc(val.rating) }}>{val.rating}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.textSecondary, marginTop: 4, lineHeight: 1.4 }}>{val.explanation}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: 24, borderRadius: 12, background: COLORS.greenLight, marginBottom: 16 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.green, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Strengths</p>
        {aiResult.strengths.map((s, i) => <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.dune, lineHeight: 1.6, marginBottom: 4 }}>✓ {s}</p>)}
      </div>

      <div style={{ padding: 24, borderRadius: 12, background: COLORS.yellowLight, marginBottom: 16 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#B8860B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Suggestions to strengthen</p>
        {aiResult.improvements.map((s, i) => <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.dune, lineHeight: 1.6, marginBottom: 4 }}>→ {s}</p>)}
      </div>

      {regularFlags.length > 0 && (
        <div style={{ padding: 24, borderRadius: 12, background: COLORS.redLight, marginBottom: 16 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.red, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Risk flags</p>
          {regularFlags.map((s, i) => <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.dune, lineHeight: 1.6, marginBottom: 4 }}>⚠ {s}</p>)}
        </div>
      )}

      {unverifiedFlags.length > 0 && (
        <div style={{ padding: 24, borderRadius: 12, background: COLORS.blueLight, border: `1px solid ${COLORS.blue}`, marginBottom: 16 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.blue, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Unverified claims</p>
          {unverifiedFlags.map((s, i) => <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.dune, lineHeight: 1.6, marginBottom: 4 }}>🛡 {s.replace("UNVERIFIED: ", "").replace("UNVERIFIED:", "")}</p>)}
        </div>
      )}

      {aiResult.suggested_milestones && <div style={{ padding: 24, borderRadius: 12, background: COLORS.blueLight, marginBottom: 24 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.blue, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Suggested milestones</p>
        {aiResult.suggested_milestones.map((s, i) => <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.dune, lineHeight: 1.6, marginBottom: 4 }}>{i + 1}. {s}</p>)}
      </div>}

      <div style={{ padding: 20, borderRadius: 12, background: COLORS.warmWhite, borderLeft: `3px solid ${COLORS.border}`, marginBottom: 40 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>About this evaluation</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.6 }}>This AI assessment is based solely on the information you provided. It has not independently verified any claims, credentials, or cost estimates. Projects that pass AI evaluation will enter a human compliance review before being listed to investors. Claims about partnerships, credentials, and institutional backing will require documentation during compliance review.</p>
      </div>

      {isWeak && (
        <div style={{ padding: "14px 20px", borderRadius: 10, background: COLORS.yellowLight, border: `1px solid ${COLORS.yellow}`, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16 }}>&#9888;</span>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#B8860B", lineHeight: 1.5 }}>Your proposal scored low in several areas. We strongly recommend revising before submitting — stronger proposals get funded faster.</p>
        </div>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        {isWeak ? (<>
          <button onClick={() => { setStep("form"); setFormStep(5); setAiResult(null); }} style={{ flex: 1, padding: "14px", borderRadius: 100, border: "none", background: COLORS.dune, color: "#fff", fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Revise proposal</button>
          <button style={{ flex: 1, padding: "14px", borderRadius: 100, border: `1.5px solid ${COLORS.border}`, background: "#fff", color: COLORS.textSecondary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Submit anyway</button>
        </>) : (<>
          <button onClick={() => { setStep("form"); setFormStep(5); setAiResult(null); }} style={{ flex: 1, padding: "14px", borderRadius: 100, border: `1.5px solid ${COLORS.border}`, background: "#fff", color: COLORS.dune, fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Revise proposal</button>
          <button style={{ flex: 1, padding: "14px", borderRadius: 100, border: "none", background: COLORS.dune, color: "#fff", fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Submit for review →</button>
        </>)}
      </div>
    </div>
    );
  }

  const inputStyle = { width: "100%", padding: "14px 16px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" };
  const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.dune, display: "block", marginBottom: 8 };
  const fieldWrap = { marginBottom: 28 };
  const focusHandler = e => e.target.style.borderColor = COLORS.dune;
  const blurHandler = e => e.target.style.borderColor = COLORS.border;

  const stepHeaders = {
    1: { title: "Let's start with the basics", helper: "Give your project a name and tell us where it's happening." },
    2: { title: "What problem are you solving?", helper: "Investors want to know why this matters. Be specific about the need." },
    3: { title: "How will you make it happen?", helper: "Show investors you have a plan. Break things into phases." },
    4: { title: "Why should investors trust you?", helper: "Credentials and accountability turn interest into investment." },
    5: { title: "Review your proposal", helper: "Make sure everything looks right. Our AI will evaluate this and give you feedback." },
  };

  const reviewSection = (label, value, editStep) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
        <button onClick={() => setFormStep(editStep)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: COLORS.accent, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Edit</button>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: value ? COLORS.dune : COLORS.textTertiary, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{value || "Not provided"}</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "60px 40px 100px", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(12px)", transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Step {formStep} of 5</p>
      <div style={{ height: 4, background: COLORS.border, borderRadius: 2, marginBottom: 32, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${formStep / 5 * 100}%`, background: COLORS.accent, borderRadius: 2, transition: "width 0.3s" }} />
      </div>

      <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 30, fontWeight: 400, color: COLORS.dune, marginBottom: 8 }}>{stepHeaders[formStep].title}</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.6, marginBottom: 40 }}>{stepHeaders[formStep].helper}</p>

      {formStep === 1 && <>
        <div style={fieldWrap}>
          <label style={labelStyle}>Project name</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Parkdale Community Garden Expansion" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
        </div>
        <div style={fieldWrap}>
          <label style={labelStyle}>Category</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setCat(c.id)} style={{ padding: "12px", borderRadius: 10, border: `1.5px solid ${cat === c.id ? COLORS.dune : COLORS.border}`, background: cat === c.id ? COLORS.cream : "#fff", cursor: "pointer", textAlign: "center", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: COLORS.dune, transition: "all 0.2s" }}>{c.icon} {c.label}</button>
            ))}
          </div>
        </div>
        <div style={fieldWrap}>
          <label style={labelStyle}>Location</label>
          <input value={loc} onChange={e => setLoc(e.target.value)} placeholder="e.g. Toronto, ON" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
        </div>
      </>}

      {formStep === 2 && <>
        <div style={fieldWrap}>
          <label style={labelStyle}>What problem does this solve?</label>
          <textarea value={problem} onChange={e => setProblem(e.target.value)} placeholder="e.g. Our neighbourhood park has been neglected for over a decade..." rows={5} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} onFocus={focusHandler} onBlur={blurHandler} />
        </div>
        <div style={fieldWrap}>
          <label style={labelStyle}>Who benefits directly?</label>
          <input value={beneficiaries} onChange={e => setBeneficiaries(e.target.value)} placeholder="e.g. 3,000 residents of Parkdale neighbourhood" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
        </div>
      </>}

      {formStep === 3 && <>
        <div style={fieldWrap}>
          <label style={labelStyle}>Expected timeline</label>
          <input value={timeline} onChange={e => setTimeline(e.target.value)} placeholder="e.g. 8 months from funding to completion" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
        </div>
        <div style={fieldWrap}>
          <label style={labelStyle}>Key milestones with rough dates</label>
          <textarea value={milestones} onChange={e => setMilestones(e.target.value)} placeholder="e.g. Month 1-2: Site preparation&#10;Month 3-4: Construction phase 1&#10;Month 5-6: Equipment installation" rows={4} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} onFocus={focusHandler} onBlur={blurHandler} />
        </div>
        <div style={fieldWrap}>
          <label style={labelStyle}>How will funds be used?</label>
          <textarea value={fundUse} onChange={e => setFundUse(e.target.value)} placeholder="e.g. $10,000 for materials, $8,000 for labour, $5,000 for permits and insurance, $2,000 contingency" rows={4} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} onFocus={focusHandler} onBlur={blurHandler} />
        </div>
      </>}

      {formStep === 4 && <>
        <div style={fieldWrap}>
          <label style={labelStyle}>Who's behind this?</label>
          <textarea value={team} onChange={e => setTeam(e.target.value)} placeholder="e.g. Jane Smith (10 years community organizing), Local Parks Alliance board member..." rows={4} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} onFocus={focusHandler} onBlur={blurHandler} />
        </div>
        <div style={fieldWrap}>
          <label style={labelStyle}>How will you measure and report impact?</label>
          <textarea value={impactPlan} onChange={e => setImpactPlan(e.target.value)} placeholder="e.g. Quarterly progress photos, monthly financial updates, community survey at 6 months" rows={4} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} onFocus={focusHandler} onBlur={blurHandler} />
        </div>
        <div style={fieldWrap}>
          <label style={labelStyle}>Funding goal</label>
          <input value={goal} onChange={e => setGoal(e.target.value)} placeholder="e.g. $25,000" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
        </div>
        <div style={fieldWrap}>
          <label style={labelStyle}>Evidence & supporting links</label>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary, marginBottom: 10, lineHeight: 1.5 }}>Provide URLs, documents, or references that back up your claims. Unverified claims will be flagged during review.</p>
          <textarea value={evidence} onChange={e => setEvidence(e.target.value)} placeholder="e.g. Link to organization website, letter of support, relevant certifications or permits" rows={4} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} onFocus={focusHandler} onBlur={blurHandler} />
          <div style={{ marginTop: 12 }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 100, border: `1.5px solid ${COLORS.border}`, background: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.dune }}>
              <span>+ Attach files</span>
              <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" style={{ display: "none" }} onChange={e => { if (e.target.files.length) setAttachments(prev => [...prev, ...Array.from(e.target.files)]); e.target.value = ""; }} />
            </label>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textTertiary, marginLeft: 10 }}>PDF, DOC, or images</span>
          </div>
          {attachments.length > 0 && (
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {attachments.map((file, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 8, background: COLORS.cream, border: `1px solid ${COLORS.border}` }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.dune, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.textTertiary, flexShrink: 0 }}>{(file.size / 1024).toFixed(0)} KB</span>
                  <button onClick={() => setAttachments(prev => prev.filter((_, j) => j !== i))} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textTertiary, padding: "0 4px", lineHeight: 1 }}>&times;</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </>}

      {formStep === 5 && (
        <div style={{ padding: 24, borderRadius: 14, border: `1px solid ${COLORS.border}`, background: "#fff" }}>
          {reviewSection("Project name", title, 1)}
          {reviewSection("Category", CATEGORIES.find(c => c.id === cat)?.label ? `${CATEGORIES.find(c => c.id === cat).icon} ${CATEGORIES.find(c => c.id === cat).label}` : "", 1)}
          {reviewSection("Location", loc, 1)}
          <hr style={{ border: "none", borderTop: `1px solid ${COLORS.border}`, margin: "20px 0" }} />
          {reviewSection("Problem", problem, 2)}
          {reviewSection("Beneficiaries", beneficiaries, 2)}
          <hr style={{ border: "none", borderTop: `1px solid ${COLORS.border}`, margin: "20px 0" }} />
          {reviewSection("Timeline", timeline, 3)}
          {reviewSection("Key milestones", milestones, 3)}
          {reviewSection("Fund usage", fundUse, 3)}
          <hr style={{ border: "none", borderTop: `1px solid ${COLORS.border}`, margin: "20px 0" }} />
          {reviewSection("Team", team, 4)}
          {reviewSection("Impact plan", impactPlan, 4)}
          {reviewSection("Funding goal", goal, 4)}
          {reviewSection("Evidence & supporting links", evidence, 4)}
          {attachments.length > 0 && (
            <div style={{ marginTop: -12, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em" }}>Attached files ({attachments.length})</p>
                <button onClick={() => setFormStep(4)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: COLORS.accent, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Edit</button>
              </div>
              {attachments.map((file, i) => (
                <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.dune, lineHeight: 1.6 }}>{file.name} ({(file.size / 1024).toFixed(0)} KB)</p>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
        {formStep > 1 && (
          <button onClick={() => setFormStep(formStep - 1)} style={{ padding: "14px 24px", borderRadius: 100, border: "none", background: "none", color: COLORS.dune, fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>&larr; Back</button>
        )}
        {formStep < 5 ? (
          <button onClick={() => setFormStep(formStep + 1)} disabled={!canNext()} style={{ flex: 1, padding: "16px", borderRadius: 100, border: "none", background: canNext() ? COLORS.dune : COLORS.border, color: canNext() ? "#fff" : COLORS.textTertiary, fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: canNext() ? "pointer" : "default", transition: "all 0.2s" }}>Next &rarr;</button>
        ) : (
          <button onClick={evaluate} style={{ flex: 1, padding: "16px", borderRadius: 100, border: "none", background: COLORS.dune, color: "#fff", fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>Get AI evaluation &rarr;</button>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [view, setView] = useState("investor");
  const [profile, setProfile] = useState(null);
  const [selProject, setSelProject] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [matchedProjects, setMatchedProjects] = useState([]);
  const [matchFallback, setMatchFallback] = useState(false);

  const start = v => {
    if (v === "creator_landing") { setView("creator"); setScreen("creator_landing"); }
    else { setView(v); setScreen(v === "investor" ? "values" : "creator"); }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet" />
      {screen !== "welcome" && <Nav currentView={view} setCurrentView={setView} setScreen={setScreen} />}
      {screen === "welcome" && <>
        <WelcomeNav />
        <WelcomeScreen onStart={start} />
      </>}
      {screen === "values" && <ValuesIntake onComplete={p => { setProfile(p); setScreen("matches"); }} />}
      {screen === "matches" && <MatchResults profile={profile} onSelectProject={p => { setSelProject(p); setScreen("detail"); }} cachedProjects={matchedProjects} cachedFallback={matchFallback} onCacheResults={(projects, fallback) => { setMatchedProjects(projects); setMatchFallback(fallback); }} />}
      {screen === "detail" && selProject && <ProjectDetail project={selProject} onBack={() => setScreen("matches")} onApprove={(p, a) => { setInvestments(prev => [...prev, { project: p, amount: a }]); setScreen("dashboard"); }} />}
      {screen === "dashboard" && <Dashboard investments={investments} />}
      {screen === "creator_landing" && <CreatorLandingScreen onStartProposal={() => { setView("creator"); setScreen("creator"); }} onSwitchToInvestor={() => { setView("investor"); setScreen("welcome"); }} />}
      {screen === "creator" && <CreatorView />}
    </div>
  );
}
