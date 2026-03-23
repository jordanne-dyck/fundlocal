# FundLocal — AI-Native Compliance Verification

## What the human can now do

Today a compliance reviewer spends hours per proposal searching registries, cross-referencing claims, and documenting findings. The work is slow and inconsistent — two reviewers may search different sources and document findings differently.

With FundLocal's verification system, a reviewer opens a proposal and structured results are already waiting — claims checked, evidence analyzed, discrepancies flagged, everything documented. The reviewer's job shifts to judgment. Hours compress to minutes. The audit trail is automatic and consistent regardless of who reviews.

## What AI is responsible for

AI owns the cognitive work across two verification systems.

For claim verification, Claude operates as an agentic system — it receives tool definitions for external registries, decides which to call, executes real API calls against government databases, interprets results, and flags discrepancies. The same agentic loop extends beyond verification: drafting follow-ups, identifying what documentation is needed, surfacing related records — collecting and organizing information so the reviewer can make a decision.

For evidence verification, Claude Vision analyzes uploaded photos — authenticity, subject match, location, scale — scoring each independently, then synthesizes its analysis with metadata forensics and geographic cross-referencing to produce a unified verdict, surface gaps, and identify next steps for the reviewer.

## The critical decision that must remain human

Approving verification. All AI output is structured with confidence levels and presented for human review — the AI surfaces findings, it never acts on them. The decision to approve or reject a verification is human. That approval determines whether a project can list, whether funds release, whether evidence is accepted. This isn't a technical limitation, it's a regulatory and ethical requirement. In financial services a human must own the compliance decision regardless of how capable the AI becomes.

## What breaks first at scale

Knowledge management — internal, external, and user-generated. The prototype verifies claims against external registries and user-generated content on demand. A production system must also manage internal knowledge (compliance policies, regulatory requirements, jurisdictional law) as well as many more external knowledge connections and larger volumes of user generated content each with different trust levels, update frequencies, and ownership. You need RAG to efficiently manage this knowledge, minimizing cost and time while maximizing quality.

Managing that pipeline requires scoping, quality control, and access governance. Every layer compounds: a scoping error means the AI applies the wrong rules, a quality control gap means it applies them incorrectly, an access governance failure means unauthorized changes propagate silently. This isn't a build-once problem — the rules governing the AI's behavior need the same rigor as the rules the AI enforces.

The composable architecture of the prototype allows additional layers to be added as the system expands responsibility and grows in scale: each source is an independent definition, so one failing doesn't break the system. But managing this at scale is an operational challenge that grows with capability.
