# FundLocal Demo Script v3 — Compliance-Focused with Depth Over Breadth (~3:00)

---

## INTRO — Identity & Framing (0:00–0:35)

**[VISUAL: You on camera]**

> "Hey, I'm Jordanne Dyck and I'm a builder. I built FundLocal end-to-end with Claude Code — it's a community investment platform where people fund projects in their neighbourhood.

> But I'm not here to pitch the product. I want to show you how I think about rebuilding an operational workflow with AI.

> I think community investment is poorly served by today's financial products — and compliance verification is the bottleneck. It's the process that stands between an application and an approval, it evolved before modern AI existed, and it's mostly manual. Every financial platform has some version of compliance verification — I'm assuming Wealthsimple does too. I rebuilt it as an AI-native system."

**[VISUAL: Click into compliance view]**

> "I'll show you two sides: verifying user claims against external data, and verifying user-submitted evidence like photos. Both are live, both have explicit fail modes, and both keep humans in the decision seat."

---

## CLAIM VERIFICATION (0:35–1:35)

**[VISUAL: Click into proposal in compliance queue]**

> "A user submitted a proposal claiming they're a registered nonprofit with a Parks Department partnership. A reviewer needs to know if any of that is true. Today that's manual — searching registries, cross-referencing documents, writing up findings."

**[VISUAL: Click "Run AI Verification" → watch trace stream]**

> "This runs on Haiku — the fastest, cheapest Claude model. I'm triggering this live so you can watch it work. Claude has access to external databases — charity registry, municipal directory, budget benchmarks. It decides which to check, executes real API calls, and interprets the results. That LIVE tag means real API call, real registry data. Claude is deciding what to check on its own, not following a script.

> The same agentic system extends beyond verification — it drafts follow-up communications, identifies what documentation is missing, surfaces related records. It does whatever work it can to collect and organize information so the reviewer can focus on the decision."

**[VISUAL: Point to colored rows in verification results — walk through slowly]**

> "Green: verified against the CRA database. Yellow: unable to verify. And red: discrepancy. I deliberately submitted a false Parks Department partnership. The AI checked the municipal directory, found nothing, and flagged it — with exactly what it searched, what it passed, and what came back."

**[VISUAL: Point to Agent Activity panel]**

> "Every tool call, every argument, every result is documented. A compliance reviewer — or a regulator — can review the AI's entire decision chain, not just the conclusion. That's not a feature, it's a requirement in financial services."

---

## EVIDENCE VERIFICATION (1:35–2:35)

> "Claim verification handles what people say. But compliance doesn't stop there — you also need to verify what people show you. Photos, permits, invoices."

**[VISUAL: Click Milestone tab → Solar Garden → upload demo photo → click "Run AI Photo Verification" → watch trace]**

> "Three verification layers, each independent. First: client-side metadata forensics — EXIF parsing, filename regex for known AI generators. Zero API cost. Second: Claude Vision scores four dimensions independently — authenticity, subject match, location, scale. Third: cross-reference — GPS against the project location, timestamp against the milestone window, permit number against the municipal database."

**[VISUAL: Point to unified results table]**

> "I tested this against specific failure cases. A real photo in the wrong location — authenticity passes, location flags. A Gemini-generated image — filename detection caught it even when vision didn't. If vision says verified but there's no EXIF data, the verdict downgrades. No single layer is trusted alone."

> "An assumption I'm making: high-quality AI images with spoofed EXIF could pass all three layers. The mitigation is requiring multiple evidence types — photos plus invoices plus permits — so no single channel is the only proof."

---

## CLOSE — The Pattern (2:35–3:00)

**[VISUAL: You on camera]**

> "Two verification systems, one pattern. AI does the cognitive work — searching registries, analyzing images, cross-referencing data. But approving verification is always human. That's the critical decision — it determines whether a project can list, whether funds release, whether evidence is accepted. AI surfaces the findings, the human owns the judgment.

> What breaks first at scale isn't the AI — it's knowledge management. A production system needs to manage internal policies, external registries, and growing volumes of user-generated content. The composable architecture handles this — you add sources by adding tool definitions, not rewriting the system.

> The full prototype goes beyond compliance — I built the complete system, customer-facing and operational: investor onboarding, creator submissions, compliance review, and the handoffs between them. Those flows are available to explore on your own. Thanks for watching."

**[VISUAL: While delivering the above, briefly flash investor view and creator submission view on screen — 2-3 seconds each, no narration needed. Let the evaluator see the full system exists.]**

---

## TIMING

| Section | Target | Cumulative |
|---------|--------|------------|
| Intro (assumption + framing) | 35s | 0:35 |
| Claim verification (problem → live demo → fail states → auditability) | 60s | 1:35 |
| Evidence verification (bridge → three layers → pressure test → assumption) | 60s | 2:35 |
| Close (pattern + WS relevance + tag) | 25s | 3:00 |

## SHORTCUTS

- **Ctrl+Shift+D**: Jumps to compliance with pre-populated Parkdale Community Garden proposal
- **Nav "Compliance" button**: Same behaviour

## DEMO IMAGES (in `demo/` folder)

| File | Purpose | Expected result |
|------|---------|----------------|
| `solar-panels-real.jpg` | Real rooftop solar photo (Pexels) | All checks pass |
| `solar-panels-wrong-location.jpg` | Real photo, wrong setting (desert solar farm) | Authenticity passes, location flags |
| `not-solar-panels.jpg` | Completely unrelated photo (cat) | Subject match fails |
| Any AI-generated image | Test metadata forensics | Filename/EXIF flags even if vision passes |

## KEY BEATS TO HIT

1. **Compliance is the focus, not the product** — "I'm not here to pitch the product, I want to show you how I think about rebuilding a workflow"
2. **WS assumption stated explicitly** — "I'm assuming this process exists in some form at Wealthsimple"
3. **Model choice explained** — Haiku for speed/cost
4. **Fail modes woven in** — discrepancy detection on claims, multi-layer cross-checks on evidence
5. **Pressure testing called out** — "I tested this with wrong-location photos, AI-generated images"
6. **Assumptions stated** — spoofed EXIF acknowledged as limitation with mitigation and extensibility
7. **Agentic tool use** — the LIVE tag proves real API calls, not simulation
8. **Auditability by design** — full agent trace, every tool call documented, "not a feature, it's a requirement"
9. **Scalability** — knowledge management as the real scale challenge, composable architecture handles growth
10. **Hard boundary** — approving verification is always human. Stated in close.
11. **Full prototype available** — investor matching + creator flows mentioned as self-serve exploration

## DELIVERY TIPS

- **Energy:** Open strong — "I'm a builder" sets the tone, then pivot fast to the reframe
- **The pivot:** "I'm not here to pitch the product" needs to land cleanly — it's the moment the viewer recalibrates expectations
- **Pace:** Slow down for the live demo. Let the viewer watch the agent trace stream. Speed up for the bridge between sections.
- **Fail modes:** Deliver these confidently, not defensively. "I deliberately submitted a false claim" = credibility.
- **Assumptions:** State them matter-of-factly. Acknowledging limits shows rigor, not weakness.
- **WS connection:** The close should feel like a natural implication, not a sales pitch. "This is a pattern for redesigning any verification workflow" — let them connect the dots.
- **Jargon check:** If you wouldn't say it to a smart friend who isn't a developer, rephrase it.

---

## TECHNICAL ARCHITECTURE REFERENCE

### Models

| Model | Use case | Why |
|-------|----------|-----|
| `claude-haiku-4-5-20251001` | All calls (verification, vision) | Speed (~1-2s), cost (~$0.01/call), reliable structured JSON, tool use, vision. At scale: pennies per thousand operations. |

**Why not Sonnet/Opus?** Every call in this system is high-frequency and latency-sensitive. Haiku's structured output quality is sufficient for both verification use cases. You'd escalate to Sonnet for edge cases that Haiku flags as uncertain — that's a cost-optimization pattern, not a quality compromise.

### Knowledge Architecture

| Layer | Source | Trust level | Storage | Example |
|-------|--------|-------------|---------|---------|
| Project corpus | Internal database | Curated | Direct context injection (no RAG — corpus fits in window) | Project descriptions, milestones, budget data |
| Creator proposals | User-generated | **Untrusted** — all claims require verification | Submitted to review queue | Proposal text, team claims, partnership assertions |
| External registries | Government/public APIs | **Authoritative** — ground truth | Fetched on demand via tool use | CRA charity database, municipal permits |
| Photo evidence | User-submitted | **Untrusted** — requires multi-layer validation | Uploaded files + extracted metadata | Milestone photos with EXIF |
| AI analysis | Model output | **Derived** — useful but not authoritative | Ephemeral (per-session) | Verification results, vision analysis |

**Why not RAG?** The project corpus is currently ~5 projects. Direct context injection gives perfect recall with zero infrastructure. The architecture is RAG-ready: swap the project loader from "inject all" to "retrieve top-N by embedding similarity" without changing the prompt contract. But premature RAG adds a vector database, an embedding pipeline, a chunking strategy, and retrieval quality issues — all for a problem that doesn't exist yet.

**When RAG becomes necessary:** When the corpus exceeds ~100 projects or ~50K tokens. At that point, pre-filter by category/location/return-type, embed the shortlist, retrieve top candidates, then score with the LLM. The prompt stays the same.

### API Patterns

| Pattern | System | Turns | Description |
|---------|--------|-------|-------------|
| Agentic tool use | Claim verification | 2-3 | Claude requests tool → app executes real API → results returned → Claude interprets |
| Vision + context injection | Evidence verification | 1 | Image as base64 + metadata findings + project context in a single multimodal prompt |
| Client-side forensics | Evidence verification | 0 | EXIF parsing, GPS validation, filename regex — no API call, runs in browser |

### Composable Service Architecture

Each verification capability is an independent, pluggable service:

```
┌─────────────────────────────────────────────────────┐
│                  Orchestration Layer                  │
│         (routes claims to verification services)      │
├──────────┬──────────┬──────────┬──────────┬──────────┤
│  CRA     │ Municipal│ Budget   │ Identity │ Future   │
│ Registry │ Permits  │ Bench-   │ Check    │ Sources  │
│ (live)   │ (planned)│ marks    │          │          │
├──────────┴──────────┴──────────┴──────────┴──────────┤
│              Tool Definitions (JSON Schema)           │
│        Claude decides which tools to call             │
└─────────────────────────────────────────────────────┘
```

Adding a new verification source = adding a tool definition + an API handler. The orchestration layer (Claude's tool-use loop) routes automatically.

### Domain Boundaries & Access Control

| Role | Knowledge surface | Can see | Cannot see |
|------|------------------|---------|------------|
| Creator | Proposal feedback | AI evaluation, strengths, improvements, risk flags | Compliance decisions, other proposals |
| Compliance reviewer | Full verification | All of the above + agent traces, raw API proof, follow-up drafts, permit data | Financial transactions |

The AI operates across domains but surfaces different knowledge to each role. A compliance reviewer sees the raw CRA API response; a project listing shows "Verified organization" as a badge. Same underlying data, different trust-appropriate presentations.

### Economics at Scale

| Operation | Cost (Haiku) | Latency | At 10K/day |
|-----------|-------------|---------|------------|
| Proposal verification | ~$0.02 (2 turns) | ~3s | ~$200/day |
| Photo verification | ~$0.015 | ~2s | ~$150/day |
| EXIF/metadata check | $0.00 | <50ms | $0/day |
| GPS/timestamp validation | $0.00 | <1ms | $0/day |

**Cost optimization pattern:** Run free checks first (metadata, filename, GPS, timestamp). Only call the LLM if cheap checks don't already flag the input. At scale, this eliminates ~20-30% of vision API calls for obviously fraudulent submissions.

**Model escalation pattern:** Use Haiku for all first-pass analysis. Escalate to Sonnet only for cases where Haiku returns low-confidence results or `unable_to_verify`. This keeps average cost near Haiku-level while getting Sonnet-quality for edge cases.

### Demo vs Production UX

The demo includes manual "Run AI Verification" and "Run AI Photo Verification" buttons so the viewer can watch the AI execute in real time. In production:

| Trigger | Demo | Production |
|---------|------|------------|
| Proposal verification | Manual button click | Automatic on submission — results ready when reviewer opens the project |
| Photo verification | Manual button click | Automatic on upload — results appear inline as each layer completes |

The compliance reviewer's production experience is: open project → results already compiled → review, approve/reject, send follow-ups. No waiting, no triggering. The agent trace persists for audit purposes but is collapsed by default — reviewers who want to inspect the AI's work can expand it.

### Human/AI Boundaries

| Decision | Owner | Why |
|----------|-------|-----|
| Project listing approval | Human (compliance reviewer) | Liability. AI pre-screens but cannot approve for listing. |
| Payout release | Human (compliance reviewer) | Fiduciary duty. AI verifies evidence, human authorizes funds. |
| Claim verification | AI | Operational. AI searches databases faster and more thoroughly than humans. |
| Follow-up drafting | AI (human sends) | AI drafts, human reviews and approves sending. No autonomous outreach. |

**The critical decision that must remain human:** Approving verification. Every other decision in the system is either AI-owned (searching, analyzing, scoring) or AI-assisted (drafting follow-ups, surfacing records). But the decision to approve or reject a verification — which determines whether a project can list, funds release, or evidence is accepted — must be human. This isn't a technical limitation. It's a regulatory and ethical requirement that won't change regardless of AI capability.

### What Breaks First at Scale

1. **Verification throughput** — AI can pre-screen thousands/day, human reviewers can't. **Mitigation:** AI tooling compresses hours-per-review to minutes-per-review. The compliance UX is designed around this — focused views, AI recommendations at top, pre-drafted follow-ups.

2. **Photo verification false negatives** — High-quality AI images with spoofed EXIF could pass all three layers. **Mitigation:** Require multiple evidence types (photos + invoices + permits). Never rely on a single evidence channel. Add layer-four checks: reverse image search, satellite imagery comparison.

3. **Knowledge staleness** — Project data, registry data, and permit databases change. The system currently fetches on demand (live API calls), but cached or stale data could cause false verifications. **Mitigation:** TTL-based caching with mandatory refresh for verification-critical data. Registry lookups should never be cached beyond a session.

4. **Prompt injection via proposals** — A malicious creator could craft proposal text designed to manipulate Claude's verification output. **Mitigation:** Separate the proposal ingestion prompt from the verification prompt. Treat all user-generated text as untrusted input. Validate AI output structure before displaying.
