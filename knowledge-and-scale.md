# Knowledge Management & What Breaks at Scale

This document covers two connected questions: how the AI system manages knowledge today, and what breaks — and what must be built — when it scales from prototype to production in a regulated environment.

---

## Knowledge Architecture (Current)

| Layer | Source | Trust level | Storage | Example |
|-------|--------|-------------|---------|---------|
| Project corpus | Internal database | Curated | Direct context injection | Project descriptions, milestones, budget data |
| Creator proposals | User-generated | **Untrusted** — all claims require verification | Submitted to review queue | Proposal text, team claims, partnership assertions |
| External registries | Government/public APIs | **Authoritative** — ground truth | Fetched on demand via tool use | CRA charity database, municipal permits |
| Photo evidence | User-submitted | **Untrusted** — requires multi-layer validation | Uploaded files + extracted metadata | Milestone photos with EXIF |
| AI analysis | Model output | **Derived** — useful but not authoritative | Ephemeral (per-session) | Verification results, vision analysis |

**Why direct injection over RAG?** The project corpus is ~5 projects. Direct context injection gives perfect recall with zero infrastructure. The architecture is RAG-ready — swap the project loader from "inject all" to "retrieve top-N by embedding similarity" without changing the prompt contract. But premature RAG adds a vector database, an embedding pipeline, a chunking strategy, and retrieval quality issues for a problem that doesn't exist yet. RAG becomes necessary when the corpus exceeds ~100 projects or ~50K tokens.

### What's missing: Institutional Knowledge

The current system verifies claims against external data (registries, directories, databases). It does not encode internal compliance rules, regulatory requirements, or jurisdictional law. In a production system at a financial institution, this is the next critical knowledge layer:

| Knowledge type | Example | How it enters the system | Update frequency |
|---------------|---------|-------------------------|-----------------|
| Internal compliance policies | "All projects over $50K require two independent verifications" | Structured rule definitions injected as context | On policy change |
| Regulatory requirements | KYC/AML thresholds, securities exemptions, accredited investor definitions | Codified rules with jurisdictional scoping | On regulatory change |
| Jurisdictional law | Provincial securities law, municipal zoning requirements, charity law variations by province | Scoped rule sets per jurisdiction | Legislative cycles |
| Institutional precedent | "We rejected a similar claim structure in Q3 — here's why" | Case database, retrievable by similarity | Ongoing |

The architecture supports this naturally. Compliance rules would be injected as context the same way project data is today — structured, versioned, and scoped to the relevant jurisdiction and project type. The AI would cite which rules apply to each finding, creating an audit trail that links every decision back to specific policy.

---

## What Breaks at Scale

### 1. Verification throughput

**The problem:** AI can pre-screen thousands of proposals per day. Human reviewers can't. The bottleneck shifts from "finding the answer" to "reviewing the AI's work," but that's still a human bottleneck.

**Mitigation:** The compliance UX is designed around reviewer efficiency — focused views, AI recommendations surfaced at the top, pre-drafted follow-ups, agent traces collapsed by default but expandable for audit. The goal is compressing hours-per-review to minutes-per-review, not eliminating the reviewer.

### 2. Photo verification false negatives

**The problem:** High-quality AI-generated images with spoofed EXIF metadata could pass all three verification layers (metadata forensics, vision analysis, cross-reference).

**Mitigation:** Never rely on a single evidence channel. Require multiple evidence types — photos plus invoices plus permits. Add additional layers (reverse image search, satellite imagery comparison) without changing the scoring architecture. Each layer is independent and composable.

### 3. Prompt injection via proposals

**The problem:** A malicious creator could craft proposal text designed to manipulate Claude's verification output — e.g., embedding instructions that cause the model to skip checks or misreport results.

**Mitigation:** Separate the proposal ingestion prompt from the verification prompt. Treat all user-generated text as untrusted input. Validate AI output structure before displaying. The verification system should never execute instructions found in proposal text.

### 4. Knowledge staleness

**The problem:** Project data, registry data, and permit databases change. Cached or stale data could cause false verifications — a charity that lost its status still showing as verified, a permit that expired still passing checks.

**Mitigation:** TTL-based caching with mandatory refresh for verification-critical data. Registry lookups should never be cached beyond a session. External API calls are marked LIVE precisely so reviewers know they're seeing current data, not cached results.

### 5. Knowledge management as an ongoing operation

This is the hardest scaling problem and the one most teams underestimate. It's not a build-once problem — it's a permanent operational responsibility with several distinct challenges:

**Scoping — what knowledge does the AI get access to?**

Not all institutional knowledge should be in every prompt. A verification agent checking a community garden proposal in Ontario doesn't need Alberta securities law or institutional precedent from crypto products. Over-scoping increases cost (more tokens), increases latency, and increases the risk of the AI applying irrelevant rules. Under-scoping means the AI misses applicable requirements.

The scoping decision is itself a compliance decision: who decides what rules apply to what project type, and how is that mapping maintained as products and regulations evolve?

**Quality control — how do you know the knowledge is correct?**

Injected rules are only as good as their encoding. A mistyped threshold, an outdated regulation, or an ambiguous policy statement can cause the AI to systematically approve or reject incorrectly — and unlike a human reviewer who might catch an odd result, the AI will apply the wrong rule consistently at scale.

This requires:
- Version control on all rule definitions — who changed what, when, and why
- Testing against known cases — "this proposal should trigger rule X" as a regression suite
- Human review of rule changes before deployment — the same approval workflow you'd apply to code changes
- Drift detection — flagging when AI decisions diverge from historical patterns, which may indicate a rule change had unintended effects

**Access governance — who can modify what the AI knows?**

In a regulated environment, the ability to change what the AI checks is effectively the ability to change compliance policy. This needs the same access controls as any policy change:
- Role-based access to rule definitions (compliance team can edit, engineering can deploy, neither can do both unilaterally)
- Approval workflows for rule changes
- Audit trail on all modifications
- Separation between rule authoring and rule deployment

**Source selection — which external sources does the AI trust?**

The current system treats government registries as authoritative. At scale, you're integrating dozens of external data sources with varying reliability, update frequencies, and coverage gaps. Decisions that need to be made and maintained:
- Which sources are authoritative vs. supplementary?
- What happens when two authoritative sources contradict each other?
- How do you handle sources that go offline, change their API, or deprecate endpoints?
- Who approves adding a new source to the verification pipeline?

Each new source is a dependency. Each dependency is a potential failure point. The composable architecture (add a tool definition + an API handler) makes it easy to add sources — but "easy to add" doesn't mean "safe to add." Source selection is a governance decision, not an engineering decision.

**The meta-problem:** Knowledge management creates its own compliance surface. The rules that govern the AI's behavior need the same rigor as the rules the AI enforces. This is recursive and unavoidable in regulated environments. The organizations that handle it well treat knowledge management as a product — with owners, roadmaps, testing, and release cycles — not as a configuration file that someone updates when they remember to.

---

## How This Connects to the Demo

The prototype demonstrates the architectural pattern: structured knowledge injected as context, AI cites its sources, humans review and decide. The knowledge layers shown (project corpus, external registries) are the simplest cases. The harder cases — institutional policy, regulatory rules, jurisdictional law — use the same injection pattern but require the operational infrastructure described above.

The system doesn't need to be rebuilt to add these layers. It needs to be governed.
