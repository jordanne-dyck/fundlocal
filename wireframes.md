# FundLocal — Annotated Wireframes

*ASCII wireframes with design annotations.*

---

## Navigation Flow & Decision Points

How users move through FundLocal, with key decision points and AI moments marked.

### Investor Flow

```
┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐
│ 1. Landing │───→│ 2. Values │───→│ 3. Match  │───→│ 4. Project│───→│ 5. Confirm│───→│ 6. Port-  │
│    Page    │    │   Intake  │    │  Results   │    │   Detail  │    │           │    │   folio   │
│            │    │           │    │            │    │           │    │           │    │           │
│ USER       │    │ USER      │    │ 🤖 AI     │    │ 🤖 AI     │    │ USER      │    │ 🤖 AI     │
│ chooses    │    │ provides  │    │ processes  │    │ presents  │    │ decides   │    │ tracks    │
│ to explore │    │ values    │    │ & ranks    │    │ reasoning │    │ to invest │    │ & reports │
└───────────┘    └───────────┘    └───────────┘    └───────────┘    └───────────┘    └───────────┘
                                        │                │                                  │
                                   ◆ DECISION       ◆ DECISION                         ◆ DECISION
                                   Click into a     Invest or                          Reinvest in
                                   project, edit    go back                            new match
                                   profile, or                                         notification
                                   leave
```

**Key decision points:**
1. **Screen 2 → 3:** User submits values profile → triggers live AI matching
2. **Screen 3 → 4:** User selects a project to explore (or edits profile to re-match)
3. **Screen 4 → 5:** User decides to invest (or goes back — AI has presented reasoning, decision is human)
4. **Screen 5 → 6:** User confirms investment with explicit acknowledgment of risk
5. **Screen 6 → 3:** Proactive notification surfaces new match → loops back into matching flow

### Compliance Flow

```
┌───────────┐    ┌───────────┐
│ 7. Comp.  │───→│ 8. Verif. │
│   Queue   │    │ Dashboard │
│           │    │ + Evidence│
│ 🤖 AI     │    │ Verif.    │
│ triages   │    │           │
│ by risk   │    │ 🤖 AI     │
└───────────┘    │ presents  │
                 │ findings  │
                 │ & analyzes│
                 │ evidence  │
                 └───────────┘
                      │
                 ◆ DECISION
                 Approve,
                 reject, or
                 request info
                 (HUMAN)
```

**Key decision points:**
1. **Screen 7 → 8:** Reviewer selects a proposal to review (AI has pre-sorted by risk level)
2. **Screen 8:** Reviewer agrees/disagrees with each AI finding, reviews live evidence verification (photo analysis, EXIF metadata, vision), then approves, rejects, or requests more info

### Creator Flow

```
┌───────────┐    ┌───────────┐
│ 9. Proposal│───→│10. AI     │──→ Submit for compliance review (Screen 7)
│   Wizard  │    │ Evaluation│     ↑
│           │    │           │     │
│ USER      │    │ 🤖 AI     │  or loop back
│ builds    │    │ coaches   │──→ Edit proposal & re-evaluate (Screen 9)
│ proposal  │    │ & flags   │
└───────────┘    └───────────┘
                      │
                 ◆ DECISION
                 Edit & improve
                 based on AI
                 feedback, or
                 submit as-is
```

**Key decision points:**
1. **Screen 9 → 10:** Creator requests AI evaluation (optional — can submit without it)
2. **Screen 10:** Creator decides to edit and re-evaluate (loop) or submit for human compliance review

### Cross-Flow Connections

```
Creator submits (Screen 9/10) ───→ Appears in compliance queue (Screen 7)
                                         │
Compliance approves (Screen 8)  ───→ Project appears in investor matches (Screen 3)
                                         │
Investor funds (Screen 5)       ───→ Updates investor portfolio (Screen 6)
```

---

## AI Design Language

Consistent visual patterns used across all screens to surface AI features. These patterns should be applied uniformly so users build familiarity with how AI appears in the product.

### AI Visual Patterns

| Pattern | Visual Treatment | Used On | Purpose |
|---------|-----------------|---------|---------|
| **AI processing** | Animated spinner + descriptive text ("Finding your matches..." / "Evaluating your proposal...") | Screens 3, 11 | Signals that real AI work is happening — not a database lookup. Sets expectation for a few seconds of wait time |
| **AI scores (investor)** | Numeric 0–100 with horizontal bar chart, 4 dimensions stacked | Screens 3, 4 | Quantitative, scannable, comparable across projects. Bar length = score at a glance |
| **AI scores (creator)** | HIGH / MEDIUM / LOW cards, color-coded (green / yellow / red) | Screen 10 | Simpler than numeric — creators need actionable feedback, not precision |
| **AI reasoning** | Plain-language text in a distinct bordered panel | Screens 3, 4, 8, 11 | Reads as explanation, not marketing. Always specific to this user/project, never generic |
| **AI limitations** | Amber/yellow callout box with ⚠ icon, headed "What we couldn't verify" | Screen 4 | Visually elevated — never buried in fine print. Positioned above or alongside reasoning so gaps are seen before the narrative |
| **Unverified claims** | Blue badge (🔵) with explanation text | Screen 10 | Distinct from risk flags (red) — separates "unknown" from "bad." Each flag explains what's missing and what would resolve it |
| **Verification results** | ✅ VERIFIED / ⚠ UNVERIFIED / 🚫 CONTRADICTED with evidence chain | Screens 8, 9 | Status + evidence together — the reviewer sees the result and the proof in one place |
| **AI disclaimer** | Small text below AI output: "This evaluation is AI-generated" + link | Screens 3, 4, 6, 11 | Manages expectations. Always present, never hidden. Links to explanation of AI role and human oversight |
| **Feedback mechanism** | Thumbs up/down (investors); Agree/Disagree/Partial buttons (reviewers) | Screens 3, 8 | Captures human judgment on AI output. Feeds into prompt improvement. Unobtrusive — doesn't block the flow |
| **Error / failure state** | Clear message + retry button + profile-saved confirmation | Screens 3, 11 | AI failures never produce blank screens, cryptic errors, or silent failures. Fallback content when possible |
| **Proactive notification** | Notification card with match score and "View match" link | Screen 6 | AI-initiated but human-acted — the system surfaces an opportunity, the investor decides whether to engage |

### Design Principles

1. **AI is visible but not dominant** — AI elements have a consistent visual language (bordered panels, score bars, badges) but never overshadow the project content or the human decision. The AI explains; the user decides.
2. **Uncertainty is as prominent as confidence** — Limitation callouts and unverified flags get the same visual weight as scores and verified badges. The design never hides what the AI doesn't know.
3. **Human gates are structurally distinct** — Investment confirmation (Screen 5) and compliance approval (Screen 8) are visually different from AI output screens — they use buttons, checkboxes, and explicit acknowledgments, not AI-styled panels.
4. **Loading states communicate work** — Every AI processing moment uses descriptive text, not just a spinner. The user understands what the AI is doing and approximately how long it takes.
5. **Feedback is optional but present** — Thumbs up/down and agree/disagree buttons are visible on every AI output but never required. They create the improvement loop without adding friction.

---

## Investor Flow

### Screen 1 — Landing Page

```
┌──────────────────────────────────────────────────────────────────────┐
│  ┌─ nav ───────────────────────────────────────────────────────────┐ │
│  │  🍁 Wealthsimple          Invest   Save   Crypto   [FundLocal] │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│                                                                      │
│         Invest in your community.                                    │
│         See exactly where your money goes.              ◄── [A]     │
│                                                                      │
│         FundLocal uses AI to match you with local                    │
│         projects that align with your values —                       │
│         then tracks every dollar through verified                    │
│         milestones.                                                  │
│                                                                      │
│         ┌──────────────────┐   ┌──────────────────┐                 │
│         │  Start investing  │   │    Get funded     │    ◄── [B]    │
│         │    (primary)      │   │   (secondary)     │               │
│         └──────────────────┘   └──────────────────┘                 │
│                                                                      │
│  ── How it works ─────────────────────────────────────               │
│                                                                      │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐            │
│   │  1. Tell us  │    │ 2. AI finds │    │ 3. You      │            │
│   │  what you    │───→│ matches     │───→│ decide      │ ◄── [C]   │
│   │  care about  │    │             │    │             │            │
│   └─────────────┘    └─────────────┘    └─────────────┘            │
│                                                                      │
│  ── Trust signals ────────────────────────────────────               │
│   Powered by Wealthsimple  •  IIROC regulated  •                    │
│   Human-reviewed compliance  •  Milestone-verified     ◄── [D]     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Annotations:**

[A] **Value proposition** — Leads with outcome ("invest in your community"), not technology. AI is mentioned in the subtitle but isn't the headline — the benefit is.

[B] **Dual CTAs** — Two distinct entry points for the two-sided marketplace. "Start investing" is primary (larger, filled button); "Get funded" is secondary (outlined). Investor flow is the focus.

[C] **3-step "How it works"** — Frames AI as the middle step between human input and human decision. Deliberately positions AI as a tool, not a decision-maker. Step 3 ("You decide") reinforces human agency.

[D] **Trust signals** — Wealthsimple branding, regulatory status, and human oversight mentioned before the user enters any flow. Addresses the Overton Window — community investing via AI is unfamiliar, so trust cues come early.

---

### Screen 2 — Values Intake

```
┌──────────────────────────────────────────────────────────────────────┐
│  ← Back                                        Step 1 of 4          │
│                                                 ████░░░░  25%       │
│                                                                 [A] │
│  ── What causes matter most to you? ──────────────────────          │
│                                                                      │
│     Drag to rank by priority:                          ◄── [B]     │
│                                                                      │
│     ┌─ #1 ──────────────────────────┐                               │
│     │  🌿 Environment               │  ↕                            │
│     └───────────────────────────────┘                               │
│     ┌─ #2 ──────────────────────────┐                               │
│     │  📚 Education                  │  ↕                            │
│     └───────────────────────────────┘                               │
│     ┌────────────────────────────────┐                               │
│     │  🏪 Small Business             │  ↕                            │
│     └────────────────────────────────┘                               │
│     ┌────────────────────────────────┐                               │
│     │  🏘 Housing                    │  ↕                            │
│     └────────────────────────────────┘                               │
│     ┌────────────────────────────────┐                               │
│     │  🎭 Arts & Culture             │  ↕                            │
│     └────────────────────────────────┘                               │
│                                                                      │
│     Your #1 priority gets twice the weight                           │
│     in matching.                                       ◄── [C]     │
│                                                                      │
│                                    ┌──────────┐                      │
│                                    │   Next →  │                     │
│                                    └──────────┘                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  ← Back                                        Step 2 of 4          │
│                                                 ████████░░  50%     │
│                                                                      │
│  ── Where is your community? ─────────────────────────               │
│                                                                      │
│     ┌────────────────────────────────┐                               │
│     │  Toronto, ON              🔍   │                  ◄── [D]     │
│     └────────────────────────────────┘                               │
│                                                                      │
│     We'll prioritize projects near you,                              │
│     but won't exclude great matches elsewhere.                       │
│                                                                      │
│                                    ┌──────────┐                      │
│                                    │   Next →  │                     │
│                                    └──────────┘                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  ← Back                                        Step 3 of 4          │
│                                                 ████████████░  75%  │
│                                                                      │
│  ── What matters more to you? ────────────────────────               │
│                                                                      │
│     Financial returns ◄──────────●───────────► Community impact      │
│                              70% impact                 ◄── [E]     │
│                                                                      │
│     "I want most of my return to come from                           │
│      community impact, with some financial return."     ◄── [F]     │
│                                                                      │
│                                    ┌──────────┐                      │
│                                    │   Next →  │                     │
│                                    └──────────┘                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  ← Back                                        Step 4 of 4          │
│                                                 ████████████████ 100%│
│                                                                      │
│  ── How much do you want to invest? ──────────────────               │
│                                                                      │
│     ┌────────────────────────────────┐                               │
│     │  $ 5,000                       │                  ◄── [G]     │
│     └────────────────────────────────┘                               │
│                                                                      │
│     You can split this across multiple projects.                     │
│     Minimums vary by project (typically $100–$500).                  │
│                                                                      │
│     ┌─────────────────────────────┐                                  │
│     │  🔍  Find my matches         │                    ◄── [H]     │
│     └─────────────────────────────┘                                  │
│                                                                      │
│     Your profile is saved and improves                               │
│     matches over time.                                  ◄── [I]     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Annotations:**

[A] **Progress bar** — 4-step wizard. Progress indicator reduces abandonment by showing how close to completion the user is. ~1 minute total.

[B] **Drag-to-rank** — Captures priority order, not just selection. AI uses rank to weight matching (#1 = 2x weight of #2). More expressive than checkboxes.

[C] **Weighting explanation** — Transparency about how inputs affect outputs. The user understands that ranking order matters, not just selection.

[D] **Location input** — Freeform city/region with autocomplete. Help text signals that location is a factor but not a filter — matches aren't excluded, just prioritized.

[E] **Impact/return slider** — 0–100 continuous scale. Left = pure financial, right = pure impact. This drives Return Fit scoring. Avoids forcing a binary choice — most investors want a blend.

[F] **Dynamic plain-language label** — Slider position generates a human-readable sentence summarizing the preference. Confirms the user's intent before submission.

[G] **Budget input** — Freeform dollar amount. Help text explains that it can be split and that minimums vary — sets expectations for the matching results.

[H] **Submit CTA** — "Find my matches" (not "Get recommendations" or "See results") — language frames AI as a search tool, not an advisor.

[I] **Profile persistence note** — Signals that this isn't throwaway input. Addresses the "starting from zero every time" pain point — future visits won't require re-entry.

---

### Screen 3 — AI Matching Results

```
┌──────────────────────────────────────────────────────────────────────┐
│  ← Back to profile                                                   │
│                                                                      │
│  ── Your matches ─────────────────────────────────────               │
│     Based on: Environment #1, Education #2,                          │
│     Toronto, 70% impact, $5,000                        ◄── [A]     │
│                                                     [Edit profile]   │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐      │
│  │  #1  Riverdale Community Solar Garden            87/100    │      │
│  │       Toronto, ON  •  Environment                          │      │
│  │                                                            │      │
│  │  Val ████████████████████░░  95                             │      │
│  │  Loc ██████████████████░░░░  90                 ◄── [B]   │      │
│  │  Ret ████████████████░░░░░░  78                             │      │
│  │  Cre ████████████████░░░░░░  82                             │      │
│  │                                                            │      │
│  │  "Directly addresses your top priority —                    │      │
│  │   environmental impact — in your own                        │      │
│  │   neighbourhood. Blended return structure                   │      │
│  │   fits your 70/30 preference."              ◄── [C]       │      │
│  │                                                            │      │
│  │                          👍  👎  Was this relevant?  [D] ►│      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐      │
│  │  #2  Moss Park STEM Lab                          74/100    │      │
│  │       Toronto, ON  •  Education                            │      │
│  │                                                            │      │
│  │  Val ██████████████░░░░░░░░  72                             │      │
│  │  Loc ██████████████████░░░░  90                             │      │
│  │  Ret ██████████████░░░░░░░░  68                             │      │
│  │  Cre █████████████░░░░░░░░░  65                             │      │
│  │                                                            │      │
│  │  "Matches your #2 priority (Education) and is              │      │
│  │   local. Lower credibility score — the school              │      │
│  │   board partnership is claimed but unverified."             │      │
│  │                                                            │      │
│  │                          👍  👎  Was this relevant?        │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌─ portfolio note ───────────────────────────────────────────┐      │
│  │  💡 Together, these two projects cover both your cause      │      │
│  │  priorities and hit your 70/30 impact/financial balance.    │ [E] │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌─ about these matches ──────────────────────────────────────┐      │
│  │  Matches are generated by AI based on your profile.         │      │
│  │  Scores reflect alignment, not quality. All projects        │      │
│  │  undergo human compliance review before listing.   ◄── [F] │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

── Loading State ──────────────────────────────────────────────────────

┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                                                                      │
│                         ◠ ◡ ◠                                        │
│                   Finding your matches...              ◄── [G]      │
│                                                                      │
│             Analyzing projects against your profile.                  │
│             This usually takes a few seconds.                        │
│                                                                      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

── Empty State ────────────────────────────────────────────────────────

┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│         We couldn't find strong matches for your                     │
│         profile right now.                             ◄── [H]      │
│                                                                      │
│         Here are the closest options — scores are                    │
│         honest, so you can see where alignment is                    │
│         strong and where it isn't.                                   │
│                                                                      │
│         ┌──────────────┐  ┌──────────────────┐                      │
│         │ Edit profile  │  │ Notify me when   │                      │
│         │               │  │ new projects land │                     │
│         └──────────────┘  └──────────────────┘                      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

── Error State ────────────────────────────────────────────────────────

┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│         Matching is temporarily unavailable.            ◄── [I]     │
│                                                                      │
│         We're having trouble connecting right now.                    │
│         Your profile is saved — try again shortly.                   │
│                                                                      │
│                  ┌──────────────┐                                    │
│                  │   Try again   │                                    │
│                  └──────────────┘                                    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Annotations:**

[A] **Profile summary** — Echoes the investor's inputs back at the top so they can verify what the AI used. "Edit profile" link allows quick adjustment without starting over.

[B] **4-dimension score bars** — Visual, scannable, comparable across projects. Values (Val), Location (Loc), Return Fit (Ret), Credibility (Cre). Bar length = score. Investor can see at a glance which dimensions are strong and which are weak.

[C] **AI-generated match explanation** — 1-2 sentences, plain language, references the investor's specific profile ("your top priority," "your 70/30 preference"). This is AI output — must be specific to this investor, not generic.

[D] **Feedback mechanism** — Thumbs up/down per match. Feeds into human-in-the-loop evaluation (Row 29, Phase 5). Optional — doesn't block the flow. Collected feedback helps identify systematic matching issues.

[E] **Portfolio-level note** — AI considers how projects complement each other, not just individual scores. This addresses the Complementarity criterion — the portfolio should collectively hit the investor's impact/return balance.

[F] **"About these matches" disclaimer** — Manages expectations: scores reflect alignment, not quality. Confirms human compliance review. Always visible, not hidden behind a click.

[G] **Loading state** — Descriptive text ("Finding your matches...") communicates that real AI processing is happening — not a database lookup. Sets expectation for a few seconds of wait time.

[H] **Empty state** — Honest framing. Doesn't force-fit irrelevant projects or hide low scores. Offers two paths: edit profile, or opt in to notifications for new projects. Addresses the "no good matches" test case.

[I] **Error state** — Clear, non-technical language. Confirms profile is saved (reduces anxiety about re-entry). Single retry action. Never shows a blank screen or cryptic error message.

---

### Screen 4 — Project Detail

```
┌──────────────────────────────────────────────────────────────────────┐
│  ← Back to matches                                                   │
│                                                                      │
│  ┌─ header ───────────────────────────────────────────────────┐      │
│  │                                                            │      │
│  │  Riverdale Community Solar Garden                          │      │
│  │  Toronto, ON  •  Environment  •  ✓ Listed         [A] ►  │      │
│  │                                                            │      │
│  │  ████████████████████████████████████░░░░  $22,400 / $30K  │      │
│  │  75% funded  •  12 investors  •  18 days left     [B] ►  │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌─ your match ───────────────────────────────────────────────┐      │
│  │                                                            │      │
│  │  Overall Match: 87 / 100                                   │      │
│  │                                                            │      │
│  │  Values Alignment    ████████████████████░░  95             │      │
│  │  "Directly addresses your #1 priority —                     │      │
│  │   environmental impact via community solar."       [C] ►  │      │
│  │                                                            │      │
│  │  Location Proximity  ██████████████████░░░░  90             │      │
│  │  "Located in Riverdale — within your                        │      │
│  │   stated community of Toronto."                             │      │
│  │                                                            │      │
│  │  Return Fit          ████████████████░░░░░░  78             │      │
│  │  "4.2% annual financial return + measurable                 │      │
│  │   impact. Slightly more financial-leaning                   │      │
│  │   than your 70/30 preference."                              │      │
│  │                                                            │      │
│  │  Credibility         ████████████████░░░░░░  82             │      │
│  │  "Charity registration verified. 3 of 4                     │      │
│  │   milestones on track. One partnership                      │      │
│  │   claim unverified."                                        │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌─ ⚠ what we couldn't verify ────────────────────────────────┐      │
│  │                                                            │      │
│  │  • Toronto Hydro partnership — claimed but not             │      │
│  │    confirmed against available records             [D] ►  │      │
│  │  • Long-term energy output projections — based on          │      │
│  │    manufacturer estimates, not independent assessment       │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌─ AI reasoning ─────────────────────────────────────────────┐      │
│  │                                                            │      │
│  │  This project is a strong match for your profile. It       │      │
│  │  directly serves your top priority — environmental         │      │
│  │  impact — in your own neighbourhood. The 4.2% return       │      │
│  │  paired with measurable community impact (homes            │ [E]  │
│  │  powered, carbon offset) aligns well with your 70/30       │      │
│  │  balance. The main gap is an unverified partnership         │      │
│  │  claim, which affects the credibility score.               │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ── Project details ──────────────────────────────────────────       │
│                                                                      │
│  [Full project description, team info, budget                        │
│   breakdown, financial terms, impact metrics]           ◄── [F]     │
│                                                                      │
│  ── Milestones ───────────────────────────────────────────────       │
│                                                                      │
│  ✅ Phase 1: Site preparation          Completed  Mar 2026          │
│     Evidence: Receipts verified, photos matched         ◄── [G]    │
│  🔄 Phase 2: Panel installation        In progress                  │
│     Evidence: Awaiting installation photos                           │
│  ○  Phase 3: Grid connection           Upcoming   Jun 2026          │
│  ○  Phase 4: Community launch          Upcoming   Aug 2026          │
│                                                                      │
│  ── Your call ────────────────────────────────────────────────       │
│                                                                      │
│  ┌──────────────────────────────────────────┐                        │
│  │         Invest in this project            │           ◄── [H]    │
│  └──────────────────────────────────────────┘                        │
│                                                                      │
│  About this evaluation  •  Report an issue              ◄── [I]    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Annotations:**

[A] **Project header** — Name, location, category, listing status. "✓ Listed" badge confirms human compliance review was completed. This is the first trust signal on the page.

[B] **Funding progress** — Real-time funding bar, investor count, and time remaining. Social proof ("12 investors") builds confidence. Progress data is factual, not AI-generated.

[C] **Per-dimension score breakdown** — Each dimension shows a score bar + 1-sentence AI justification referencing the investor's specific profile. This is the core AI output — transparent reasoning, not just a number. Justifications must be specific ("your #1 priority"), never generic ("good environmental alignment").

[D] **Limitations callout (amber box)** — Visually elevated, never buried. Lists what the AI couldn't verify. Positioned *above* the full reasoning section so investors see gaps before the narrative. This is the key trust mechanism — honesty about uncertainty. Addresses the "greenwashing via AI" safety risk.

[E] **AI reasoning panel** — 2-3 paragraph explanation synthesizing all four dimensions into a coherent narrative. References specific project and profile details. Labeled as AI-generated. Reads as analysis, not recommendation.

[F] **Project details** — Standard project information (description, team, budget, terms, impact metrics). Not AI-generated — this is the creator's submitted content, verified through compliance. Separated visually from AI analysis.

[G] **Milestone tracker** — Timeline with completion status and evidence summary. Completed milestones show what was verified. In-progress milestones show what's expected. This is the accountability layer — money releases are tied to these checkpoints.

[H] **"Invest in this project" CTA** — Deliberately labeled as a human action. Framed under "Your call" heading. The AI has presented reasoning; the decision is explicitly the investor's. Reinforces Sheridan's Level 5 — AI suggests, human decides.

[I] **Footer links** — "About this evaluation" explains AI role and human oversight. "Report an issue" provides accessible issue reporting (Safety guideline #2) — lets users flag bad matches, incorrect reasoning, or concerns.

---

### Screen 5 — Investment Confirmation

```
┌──────────────────────────────────────────────────────────────────────┐
│  ← Back to project                                                   │
│                                                                      │
│  ── Confirm your investment ──────────────────────────               │
│                                                                      │
│  Riverdale Community Solar Garden                                    │
│  Match score: 87/100                                    ◄── [A]    │
│                                                                      │
│  ┌─ amount ───────────────────────────────────────────────────┐      │
│  │                                                            │      │
│  │  How much would you like to invest?                        │      │
│  │                                                            │      │
│  │  ┌──────────────────┐                                      │      │
│  │  │  $ 500            │                           ◄── [B]  │      │
│  │  └──────────────────┘                                      │      │
│  │                                                            │      │
│  │  Minimum: $100  •  Your remaining budget: $4,500           │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌─ terms summary ────────────────────────────────────────────┐      │
│  │                                                            │      │
│  │  Return structure:   4.2% annual (paid quarterly)          │      │
│  │  Term:               24 months                    [C] ►   │      │
│  │  Impact metric:      Homes powered by clean energy         │      │
│  │  Risk level:         Medium                                │      │
│  │  Fund release:       Milestone-based (4 phases)            │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌─ key risks ────────────────────────────────────────────────┐      │
│  │                                                            │      │
│  │  • This is not a guaranteed return. Community              │      │
│  │    investments carry risk of partial or total loss. [D] ► │      │
│  │  • Project completion depends on milestones being          │      │
│  │    met. If milestones fail, remaining funds are             │      │
│  │    returned to investors.                                   │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ☑  I understand this is a community investment with                 │
│     risk of loss and milestone-based fund release.      ◄── [E]    │
│                                                                      │
│  ┌──────────────────────────────────────────┐                        │
│  │         Confirm investment — $500         │           ◄── [F]    │
│  └──────────────────────────────────────────┘                        │
│                                                                      │
│  ┌──────────────┐                                                    │
│  │   Go back     │                                                   │
│  └──────────────┘                                                    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Annotations:**

[A] **Match score reference** — Brief callback to the AI match score. Provides continuity from the matching screen but doesn't re-argue the case. AI's work is done — this screen is about the human decision.

[B] **Amount input** — Pre-filled with a reasonable default, adjustable. Shows minimum and remaining budget from profile. Practical guidance, not AI-driven.

[C] **Terms summary** — Structured, scannable presentation of the key financial and impact terms. Not AI-generated — these are the project's stated terms, verified through compliance. Includes both financial return and impact metric to reflect the blended return model.

[D] **Key risks** — Plain-language risk disclosure. Not buried in legal text. Explains the milestone-based protection mechanism (if milestones fail, remaining funds return). Honest about loss potential without being alarmist.

[E] **Acknowledgment checkbox** — Explicit human confirmation of risk understanding. Required before the confirm button activates. This is a regulatory and ethical safeguard — the investor affirms they understand what they're doing.

[F] **Confirm button** — Shows exact dollar amount. Final human gate — no AI persuasion, urgency cues, or countdown timers. "Go back" is equally accessible. The design respects the decision either way.

---

### Screen 6 — Portfolio Dashboard

```
┌──────────────────────────────────────────────────────────────────────┐
│  ┌─ nav ───────────────────────────────────────────────────────────┐ │
│  │  🍁 Wealthsimple     Invest   Save   Crypto   [FundLocal]      │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ── Your community portfolio ─────────────────────────               │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  $2,500       │  │  $47.50      │  │  5 of 8      │     [A] ►  │
│  │  invested     │  │  returns     │  │  milestones   │              │
│  │               │  │  earned      │  │  completed    │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                      │
│  ┌─ impact summary (AI-generated) ────────────────────────────┐      │
│  │                                                            │      │
│  │  Your investments are powering 12 homes with clean         │      │
│  │  energy and equipping a STEM lab for 340 students.         │      │
│  │  You've funded 2 projects in your neighbourhood,    [B] ► │      │
│  │  with 5 of 8 total milestones completed on schedule.       │      │
│  │                                                            │      │
│  │  ℹ AI-generated summary based on verified milestone data   │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ── Active investments ───────────────────────────────────────       │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐      │
│  │  Riverdale Community Solar Garden                          │      │
│  │  $500 invested  •  4.2% annual  •  Environment             │      │
│  │                                                            │      │
│  │  Milestones:  ✅ ✅ ✅ 🔄 ○                    ◄── [C]   │      │
│  │  Financial return: $10.50 earned                            │      │
│  │  Impact: 12 homes powered                        ◄── [D]  │      │
│  │                                                            │      │
│  │  📋 Milestone update: Panel installation 80% complete       │      │
│  │     Updated 2 days ago                                      │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐      │
│  │  Moss Park STEM Lab                                        │      │
│  │  $2,000 invested  •  Impact only  •  Education             │      │
│  │                                                            │      │
│  │  Milestones:  ✅ ✅ 🔄 ○ ○                                │      │
│  │  Financial return: —                                        │      │
│  │  Impact: 340 students with new lab equipment     ◄── [E]  │      │
│  │                                                            │      │
│  │  📋 Milestone update: Equipment procurement underway        │      │
│  │     Updated 5 days ago                                      │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌─ notification ─────────────────────────────────────────────┐      │
│  │  🔔 New project matching your profile:                      │      │
│  │  "Scarborough Wetland Restoration" — 91/100 match  [F] ►  │      │
│  │                                              [View match]   │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌──────────────────────────────────────┐                            │
│  │  How's your experience so far?  📝   │               ◄── [G]    │
│  └──────────────────────────────────────┘                            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Annotations:**

[A] **Portfolio summary cards** — Three key metrics at a glance: capital deployed, financial returns, milestone progress. Scannable, factual, not AI-generated. These are the numbers that answer "what's my money doing?"

[B] **AI-generated impact narrative** — Plain-language summary synthesizing verified milestone data into a meaningful story. Clearly labeled as "AI-generated summary based on verified milestone data." This is the emotional feedback loop — translating milestones into outcomes the investor cares about. Based on real data, not projections.

[C] **Milestone progress indicators** — Visual shorthand for project progress. ✅ = completed, 🔄 = in progress, ○ = upcoming. Investor can see at a glance how their funded projects are progressing without reading detailed reports.

[D] **Dual return tracking** — Financial return and impact metric displayed side by side for each project. This is the "impact as a measured return class" design — both types of return treated with equal prominence. Neither is buried or de-emphasized.

[E] **Impact-only project** — Financial return shows "—" (not "$0" or "N/A"). Impact metric is the primary return. Demonstrates that the dashboard handles pure-impact investments without making them feel like underperformers.

[F] **Proactive match notification** — AI has monitored new projects against the saved profile and surfaced a relevant opportunity. The investor didn't have to go looking. Addresses "starting from zero every time" pain point. Links directly to the match detail.

[G] **Feedback prompt** — Appears after first completed milestone cycle. Captures investor trust and effort (the two CX metrics in the business metrics). Unobtrusive — doesn't block the dashboard.

---

## Compliance Flow

### Screen 7 — Compliance Queue

```
┌──────────────────────────────────────────────────────────────────────┐
│  ┌─ internal nav ──────────────────────────────────────────────────┐ │
│  │  🍁 Wealthsimple Compliance    Queue   Reviews   Settings      │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ── Proposal queue ───────────────────────────────────               │
│     14 pending  •  Avg review time: 22 min  •  AI flag rate: 35%    │
│                                                         ◄── [A]    │
│                                                                      │
│  ┌─ table header ─────────────────────────────────────────────┐      │
│  │  Project          Creator        Submitted  Risk   Claims  │      │
│  ├────────────────────────────────────────────────────────────┤      │
│  │                                                            │      │
│  │  Kensington       Kensington     Mar 8      🔴     2V     │      │
│  │  Market Micro-    BIA            2026       HIGH   0U     │      │
│  │  Loan Fund                                         1C     │      │
│  │                                             ◄── [B]       │      │
│  │─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │      │
│  │                                                            │      │
│  │  Moss Park        Toronto Urban  Mar 7      🟡     2V     │      │
│  │  Community        Growers        2026       MED    1U     │      │
│  │  Garden                                     0C            │      │
│  │                                                            │      │
│  │─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │      │
│  │                                                            │      │
│  │  Riverdale        Riverdale      Mar 6      🟢     4V     │      │
│  │  Community        Energy         2026       LOW    0U     │      │
│  │  Solar Garden     Co-op                     0C            │      │
│  │                                             ◄── [C]       │      │
│  │─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  V = Verified   U = Unverified   C = Contradicted       ◄── [D]   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Annotations:**

[A] **Queue stats** — Aggregate metrics for the compliance team: total pending, average review time (tracking efficiency gain from AI), AI flag rate (what percentage of proposals have issues). These feed directly into the business metrics (compliance throughput benchmark).

[B] **Risk-level sort** — Queue sorted by AI-assigned risk level (highest first). Red/yellow/green color coding for instant triage. The reviewer spends time where it matters most. A CONTRADICTED claim (C) automatically elevates risk to HIGH — contradictions always surface first.

[C] **Low-risk proposals** — All claims verified, no flags. Reviewer can confirm quickly. This is where AI saves the most time — clean proposals that previously required the same research effort as flagged ones.

[D] **Claim summary shorthand** — V/U/C counts give the reviewer a pre-read on what to expect. "2V 1U 0C" means two claims checked out, one needs follow-up, no contradictions. Scannable without opening the full dashboard.

---

### Screen 8 — Verification Dashboard

```
┌──────────────────────────────────────────────────────────────────────┐
│  ← Back to queue                                                     │
│                                                                      │
│  ── Moss Park Community Garden ───────────────────────               │
│     Submitted by: Toronto Urban Growers  •  Mar 7, 2026             │
│     Overall risk: 🟡 MEDIUM                             ◄── [A]    │
│                                                                      │
│  ┌─ reviewer summary (AI-generated) ──────────────────────────┐      │
│  │                                                            │      │
│  │  Organization and charity status are verified and in       │      │
│  │  good standing. The claimed partnership with City of       │      │
│  │  Toronto Parks Department could not be confirmed —  [B] ► │      │
│  │  this is the key outstanding item before approval.         │      │
│  │  No contradictions found.                                  │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ── Findings ─────────────────────────────────────────────────       │
│                                                                      │
│  ┌─ finding 1 ────────────────────────────────────────────────┐      │
│  │  Claim: "Toronto Urban Growers is a registered charity"    │      │
│  │                                                            │      │
│  │  Result:  ✅ VERIFIED          Confidence: HIGH            │      │
│  │                                                            │      │
│  │  Evidence: CRA Charity Database returned registration      │      │
│  │  #12345-6789-RR0001, status: Active, registered     [C] ► │      │
│  │  2018-03-15.                                               │      │
│  │                                                            │      │
│  │  Reviewer:  [Agree ✓]   [Disagree]   [Partial]   [D] ►  │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌─ finding 2 ────────────────────────────────────────────────┐      │
│  │  Claim: "Organization has been operating since 2017"       │      │
│  │                                                            │      │
│  │  Result:  ✅ VERIFIED          Confidence: HIGH            │      │
│  │                                                            │      │
│  │  Evidence: Ontario Business Registry shows incorporation   │      │
│  │  date 2017-06-22, status: Active.                          │      │
│  │                                                            │      │
│  │  Reviewer:  [Agree ✓]   [Disagree]   [Partial]            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌─ finding 3 (flagged) ──────────────────────────────────────┐      │
│  │  Claim: "Partnership with City of Toronto Parks Dept"      │      │
│  │                                                     [E] ► │      │
│  │  Result:  ⚠ UNVERIFIED         Confidence: LOW            │      │
│  │                                                            │      │
│  │  Evidence: No matching entry found in Partner Directory.   │      │
│  │  City of Toronto Parks Dept is a valid municipal entity    │      │
│  │  but no formal partnership record exists.                  │      │
│  │                                                            │      │
│  │  Recommended next step: Request signed partnership         │      │
│  │  agreement or letter of support from Parks Dept.           │      │
│  │                                                            │      │
│  │  ┌─ draft follow-up email ──────────────────────────┐      │      │
│  │  │  To: creator@torontourbangrowers.org             │      │      │
│  │  │  Subject: Verification needed — Parks Dept       │      │      │
│  │  │  partnership                                     │      │      │
│  │  │                                                  │      │      │
│  │  │  [AI-generated draft, editable by reviewer] [F]► │      │      │
│  │  │                                                  │      │      │
│  │  │  [Edit]  [Send]  [Skip]                          │      │      │
│  │  └──────────────────────────────────────────────────┘      │      │
│  │                                                            │      │
│  │  Reviewer:  [Agree]   [Disagree]   [Partial]              │      │
│  │  Notes: ┌──────────────────────────────────┐       [G] ► │      │
│  │         │                                  │               │      │
│  │         └──────────────────────────────────┘               │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ── Tool call log ────────────────────────────────────────────       │
│                                                            ◄── [H] │
│  1. CRA Charity Database → "Toronto Urban Growers"                   │
│     Reasoning: Creator claims charity status — verifiable            │
│     Result: Active, registered 2018                                  │
│                                                                      │
│  2. Ontario Business Registry → "Toronto Urban Growers"              │
│     Reasoning: Verify organization existence and age                 │
│     Result: Incorporated 2017, Active                                │
│                                                                      │
│  3. Partner Directory → "City of Toronto Parks Department"           │
│     Reasoning: Creator claims formal partnership                     │
│     Result: No matching entry found                                  │
│                                                                      │
│  ── Live evidence verification ───────────────────────────────       │
│                                                              [J] ►  │
│  ┌─ photo verification ──────────────────────────────────────┐      │
│  │                                                            │      │
│  │  📷 Upload photo for AI verification                       │      │
│  │  ┌──────────────────────────────────────────────────┐      │      │
│  │  │                                                  │      │      │
│  │  │  Drag & drop or click to upload                  │      │      │
│  │  │  JPG, PNG, or WebP                               │      │      │
│  │  │                                                  │      │      │
│  │  └──────────────────────────────────────────────────┘      │      │
│  │                                                            │      │
│  │  ┌──────────────────────────────────────┐                  │      │
│  │  │   Run AI Photo Verification           │                 │      │
│  │  └──────────────────────────────────────┘                  │      │
│  │                                                            │      │
│  │  ── AI analysis results (after upload) ──────────          │      │
│  │                                                            │      │
│  │  Layer 1 — File Metadata (EXIF):               ◄── [K]   │      │
│  │  ┌──────────────────────────────────────────────────┐      │      │
│  │  │  ✅ EXIF present — Camera: iPhone 14 Pro         │      │      │
│  │  │  ✅ GPS: 43.6772°N, 79.3474°W (Riverdale area)  │      │      │
│  │  │  ⚠ Timestamp: 3 days before claimed date         │      │      │
│  │  └──────────────────────────────────────────────────┘      │      │
│  │                                                            │      │
│  │  Layer 2 — AI Vision Analysis (Claude):        ◄── [L]   │      │
│  │  ┌──────────────────────────────────────────────────┐      │      │
│  │  │  ✅ Authenticity: HIGH — real photo, not AI-gen  │      │      │
│  │  │  ✅ Subject match: HIGH — shows solar panels     │      │      │
│  │  │     consistent with project description          │      │      │
│  │  │  ✅ Location match: HIGH — background matches    │      │      │
│  │  │     expected site context                        │      │      │
│  │  │  ✅ Scale plausibility: CONSISTENT with budget   │      │      │
│  │  └──────────────────────────────────────────────────┘      │      │
│  │                                                            │      │
│  │  Verdict: ✅ Photo verified (minor timestamp note)  [M] ► │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ── Decision ─────────────────────────────────────────────────       │
│                                                                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐             │
│  │  Approve    │  │  Reject    │  │  Request more info  │   [N] ►  │
│  └────────────┘  └────────────┘  └────────────────────┘             │
│                                                                      │
│  Reviewer notes:                                                     │
│  ┌────────────────────────────────────────────────────────────┐      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Annotations:**

[A] **Risk level header** — AI-assigned risk level prominently displayed. Gives the reviewer an instant read on the severity of findings before diving into detail.

[B] **AI-generated reviewer summary** — 2-3 sentences highlighting the most important findings and the key outstanding item. Designed so a reviewer can read this alone and know whether this is a quick approve or needs deep investigation. This is where AI saves the most time.

[C] **Evidence chain** — Every finding shows exactly what was found and where. Specific registry names, registration numbers, dates. The reviewer doesn't have to re-do the lookup — they just confirm the AI's work. This is the audit trail.

[D] **Agree/Disagree/Partial buttons** — Per-finding reviewer feedback. Creates the feedback loop described in Row 29 Phase 5 (human-in-the-loop evaluation). Disagreements are logged with the AI's original assessment for future prompt improvement.

[E] **Flagged finding (visual distinction)** — Unverified and contradicted findings are visually distinct from verified ones (different border color, ⚠ icon). The reviewer's eye is drawn to what needs attention. Contradictions would use a red border and 🚫 icon.

[F] **Draft follow-up email** — AI generates a ready-to-send follow-up request for the creator, pre-filled with the specific missing evidence. Editable by the reviewer before sending. Saves time on the most common post-review action.

[G] **Reviewer notes field** — Free-text notes on flagged findings. Captured alongside the AI assessment and the reviewer's agree/disagree decision. When a reviewer disagrees, their reasoning is preserved — this is how the system learns.

[H] **Tool call log** — Complete audit trail of what the AI searched, why, and what it found. Transparent and reviewable. Supports the audit trail completeness benchmark and regulatory requirements. Collapsible in production — available when the reviewer wants to verify AI's process.

[J] **Live evidence verification** — Integrated into the compliance review rather than a separate milestone screen. The reviewer can upload photos submitted by the creator and run AI verification in real time — demonstrating the vision analysis capability within the compliance workflow.

[K] **Layer 1 — File metadata (EXIF)** — Deterministic checks run first: EXIF data extraction, GPS coordinates, timestamp validation. These are factual — the AI isn't interpreting, it's reading metadata. Missing EXIF is a significant flag (real camera photos almost always have it; AI-generated images almost never do).

[L] **Layer 2 — AI Vision analysis** — Claude Vision API analyzes the photo across four dimensions: authenticity (real vs. AI-generated), subject match (does this show what the project claims?), location consistency (does the background match the expected site?), and scale plausibility (is this consistent with the budget?). Displayed separately from metadata to show the two-layer verification approach.

[M] **Verdict** — Overall assessment combining metadata and vision analysis. If metadata flags a discrepancy but vision passes, the verdict notes both — the reviewer sees the full picture and makes the judgment call.

[N] **Decision buttons** — Three options: Approve (project goes live), Reject (with required notes), Request More Info (triggers follow-up to creator). Human makes the call. AI has done the research; the reviewer makes the judgment. This is Sheridan's Level 4 — AI offers a complete assessment, human decides.

---

## Creator Flow

### Screen 9 — Proposal Wizard

```
┌──────────────────────────────────────────────────────────────────────┐
│  ← Back                                        Step 1 of 5          │
│                                                 ██░░░░░░░░  20%     │
│                                                                      │
│  ── Tell us about your project ───────────────────────               │
│                                                                      │
│  Project name                                                        │
│  ┌────────────────────────────────────────────────────┐              │
│  │  Moss Park Community Garden                         │             │
│  └────────────────────────────────────────────────────┘              │
│                                                                      │
│  Category                                               ◄── [A]    │
│  ┌────────────────────────────────────────────────────┐              │
│  │  Environment                                    ▼   │             │
│  └────────────────────────────────────────────────────┘              │
│                                                                      │
│  Location                                                            │
│  ┌────────────────────────────────────────────────────┐              │
│  │  Toronto, ON                                        │             │
│  └────────────────────────────────────────────────────┘              │
│                                                                      │
│  Funding amount                                                      │
│  ┌────────────────────────────────────────────────────┐              │
│  │  $ 25,000                                           │             │
│  └────────────────────────────────────────────────────┘              │
│                                                                      │
│  Return type                                            ◄── [B]    │
│  ○ Financial return (specify rate and term)                          │
│  ● Impact only (no financial return to investors)                    │
│  ○ Blended (financial + impact)                                      │
│                                                                      │
│                                    ┌──────────┐                      │
│                                    │   Next →  │                     │
│                                    └──────────┘                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  ← Back                                        Step 2 of 5          │
│                                                 ████░░░░░░  40%     │
│                                                                      │
│  ── What problem does your project solve? ────────────               │
│                                                                      │
│  Describe the community need:                           ◄── [C]    │
│  ┌────────────────────────────────────────────────────┐              │
│  │  Moss Park neighbourhood lacks green space and      │             │
│  │  access to fresh produce. 45 families on our        │             │
│  │  waitlist. The nearest community garden is 3km      │             │
│  │  away and has a 2-year wait...                      │             │
│  │                                                     │             │
│  │                                          320/2000   │             │
│  └────────────────────────────────────────────────────┘              │
│                                                                      │
│  Who benefits and how?                                               │
│  ┌────────────────────────────────────────────────────┐              │
│  │                                                     │             │
│  └────────────────────────────────────────────────────┘              │
│                                                                      │
│  💡 Tip: Proposals with specific numbers                             │
│     (waitlist size, distance, demographics)                          │
│     score higher in evaluation.                         ◄── [D]    │
│                                                                      │
│                                    ┌──────────┐                      │
│                                    │   Next →  │                     │
│                                    └──────────┘                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  ← Back                                        Step 3 of 5          │
│                                                 ██████░░░░  60%     │
│                                                                      │
│  ── What's your plan? ────────────────────────────────               │
│                                                                      │
│  Budget breakdown:                                      ◄── [E]    │
│  ┌────────────────────────────────────────────────────┐              │
│  │  Line item                          Amount          │             │
│  │  ┌──────────────────────────────┐  ┌──────────┐    │             │
│  │  │  Land preparation            │  │  $5,000  │    │             │
│  │  └──────────────────────────────┘  └──────────┘    │             │
│  │  ┌──────────────────────────────┐  ┌──────────┐    │             │
│  │  │  Materials & seeds           │  │  $8,000  │    │             │
│  │  └──────────────────────────────┘  └──────────┘    │             │
│  │  ┌──────────────────────────────┐  ┌──────────┐    │             │
│  │  │  Infrastructure              │  │  $10,000 │    │             │
│  │  └──────────────────────────────┘  └──────────┘    │             │
│  │  + Add line item                                    │             │
│  │                                                     │             │
│  │  Total: $23,000 / $25,000 requested                 │             │
│  └────────────────────────────────────────────────────┘              │
│                                                                      │
│  Timeline & milestones:                                              │
│  ┌────────────────────────────────────────────────────┐              │
│  │  Milestone 1: ┌──────────────────┐ Date: ┌──────┐  │             │
│  │               │ Site preparation  │       │Jun 26│  │             │
│  │               └──────────────────┘       └──────┘  │             │
│  │  Milestone 2: ┌──────────────────┐ Date: ┌──────┐  │             │
│  │               │ Planting          │       │Aug 26│  │             │
│  │               └──────────────────┘       └──────┘  │             │
│  │  + Add milestone                            [F] ►  │             │
│  └────────────────────────────────────────────────────┘              │
│                                                                      │
│                                    ┌──────────┐                      │
│                                    │   Next →  │                     │
│                                    └──────────┘                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  ← Back                                        Step 4 of 5          │
│                                                 ████████░░  80%     │
│                                                                      │
│  ── Who's behind this project? ───────────────────────               │
│                                                                      │
│  Organization name                                                   │
│  ┌────────────────────────────────────────────────────┐              │
│  │  Toronto Urban Growers                              │             │
│  └────────────────────────────────────────────────────┘              │
│                                                                      │
│  Organization type                                                   │
│  ┌────────────────────────────────────────────────────┐              │
│  │  Registered charity                             ▼   │             │
│  └────────────────────────────────────────────────────┘              │
│                                                                      │
│  Team / key people                                      ◄── [G]    │
│  ┌────────────────────────────────────────────────────┐              │
│  │  Sarah Chen, Executive Director (12 years in        │             │
│  │  urban agriculture)...                              │             │
│  └────────────────────────────────────────────────────┘              │
│                                                                      │
│  Partnerships & endorsements                                         │
│  ┌────────────────────────────────────────────────────┐              │
│  │  City of Toronto Parks Department                   │             │
│  └────────────────────────────────────────────────────┘              │
│                                                                      │
│  Supporting evidence (links, documents)                  ◄── [H]    │
│  ┌────────────────────────────────────────────────────┐              │
│  │  📎  Drag files here or click to upload             │             │
│  │                                                     │             │
│  │  Accepted: PDF, images, links to public records     │             │
│  └────────────────────────────────────────────────────┘              │
│                                                                      │
│  💡 Tip: Providing evidence for your claims (charity                 │
│     registration, partnership agreements, permits)                    │
│     speeds up the review process significantly.         ◄── [I]    │
│                                                                      │
│                                    ┌──────────┐                      │
│                                    │   Next →  │                     │
│                                    └──────────┘                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  ← Back                                        Step 5 of 5          │
│                                                 ██████████  100%    │
│                                                                      │
│  ── Review your proposal ─────────────────────────────               │
│                                                                      │
│  [Full proposal preview as investors would see it]                   │
│                                                                      │
│  Project: Moss Park Community Garden                                 │
│  Category: Environment  •  Location: Toronto, ON                     │
│  Funding: $25,000  •  Return: Impact only                            │
│  Organization: Toronto Urban Growers (Registered charity)            │
│  ...                                                    ◄── [J]    │
│                                                                      │
│  ┌─────────────────────────────────────────┐                         │
│  │  Get AI evaluation before submitting     │           ◄── [K]    │
│  └─────────────────────────────────────────┘                         │
│                                                                      │
│  ┌─────────────────────────────────────────┐                         │
│  │  Submit without evaluation               │                        │
│  └─────────────────────────────────────────┘                         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Annotations:**

[A] **Category dropdown** — Structured input (not freeform) so projects can be matched against investor cause priorities. Categories match the investor values intake options for consistency.

[B] **Return type selection** — Three options reflecting the blended return model: financial, impact-only, or blended. Determines how the project appears in investor matching (Return Fit scoring). Impact-only projects are a first-class option, not a fallback.

[C] **Problem description** — Freeform text with character limit (2000). This is the unstructured input the AI will evaluate — it needs enough detail for meaningful assessment but constraints prevent overwhelming submissions.

[D] **Quality nudge** — Guidance text that helps creators write stronger proposals without AI intervention. "Proposals with specific numbers score higher" — teaches the creator what the AI (and investors) look for, without being prescriptive.

[E] **Itemized budget** — Structured line-item input with running total vs. requested amount. This structured data makes AI evaluation more precise (budget analysis) and gives investors transparency into how funds are allocated.

[F] **Milestone builder** — Structured milestone input with descriptions and target dates. These become the accountability checkpoints post-funding.

[G] **Team credentials** — Freeform text for team background. This is one of the inputs the AI evaluates for Readiness — specific credentials and experience are more credible than vague claims.

[H] **Evidence upload** — File upload and link submission for supporting documents. This is the key input for compliance verification — evidence provided here is what the AI cross-references against registries. Accepted formats specified.

[I] **Evidence nudge** — Tip explaining that evidence speeds up review. Doesn't require evidence (some creators may not have it yet) but incentivizes providing it. This is the pre-compliance coaching mentioned in the demo script — "the more the creator provides, the faster they get approved."

[J] **Full proposal preview** — Shows the creator exactly what investors will see. Opportunity to catch errors before submission. No AI at this point — just a clean preview.

[K] **AI evaluation CTA** — Primary action is "Get AI evaluation" (not "Submit"). Encourages creators to get coaching before submitting. "Submit without evaluation" is available but secondary — the design nudges toward AI coaching without requiring it.

---

### Screen 10 — AI Evaluation Results

```
┌──────────────────────────────────────────────────────────────────────┐
│  ← Back to proposal                                                  │
│                                                                      │
│  ── AI Evaluation ────────────────────────────────────               │
│     Moss Park Community Garden                                       │
│                                                                      │
│  ┌─ scores ───────────────────────────────────────────────────┐      │
│  │                                                            │      │
│  │  ┌──────────────┐  ┌──────────────┐                        │      │
│  │  │ Impact       │  │ Feasibility  │                        │      │
│  │  │ Potential    │  │              │                        │      │
│  │  │   🟢 HIGH    │  │   🟢 HIGH    │                [A] ►  │      │
│  │  └──────────────┘  └──────────────┘                        │      │
│  │  ┌──────────────┐  ┌──────────────┐                        │      │
│  │  │ Readiness    │  │ Clarity      │                        │      │
│  │  │              │  │              │                        │      │
│  │  │   🟡 MEDIUM  │  │   🟢 HIGH    │                        │      │
│  │  └──────────────┘  └──────────────┘                        │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ── Detailed feedback ────────────────────────────────────────       │
│                                                                      │
│  ┌─ Impact Potential: HIGH ───────────────────────────────────┐      │
│  │                                                            │      │
│  │  "Strong community need demonstrated — the 45-family       │      │
│  │   waitlist and 3km distance to nearest alternative  [B] ► │      │
│  │   show clear demand. Environmental and food security       │      │
│  │   impact is well-articulated."                              │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌─ Feasibility: HIGH ────────────────────────────────────────┐      │
│  │                                                            │      │
│  │  "Itemized budget totals $23K against $25K request —       │      │
│  │   the $2K buffer is reasonable. Budget line items are       │      │
│  │   specific and realistic for a garden project of           │      │
│  │   this scope."                                              │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌─ Readiness: MEDIUM ────────────────────────────────────────┐      │
│  │                                                     [C] ► │      │
│  │  "Timeline and milestones are detailed, but there is       │      │
│  │   no evidence of site access being confirmed. Your         │      │
│  │   first milestone (site preparation, Jun 2026) assumes     │      │
│  │   land access — without a confirmed agreement, this        │      │
│  │   timeline may be aggressive."                              │      │
│  │                                                            │      │
│  │  💡 To improve: Provide a land-use agreement,              │      │
│  │     letter of intent, or confirmation of site access. [D]►│      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌─ Clarity: HIGH ────────────────────────────────────────────┐      │
│  │                                                            │      │
│  │  "Proposal is well-structured with specific numbers,       │      │
│  │   clear beneficiaries, and an itemized budget.             │      │
│  │   Above average for proposal quality."                      │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ── Unverified claims ────────────────────────────────────────       │
│                                                                      │
│  ┌─ flagged ──────────────────────────────────────────────────┐      │
│  │                                                            │      │
│  │  🔵 "Partnership with City of Toronto Parks Department"    │      │
│  │     No supporting evidence provided. To strengthen  [E] ► │      │
│  │     this claim, upload a partnership agreement or           │      │
│  │     letter of support.                                      │      │
│  │                                                            │      │
│  │  🔵 "Registered charity"                                   │      │
│  │     Stated but not yet verified. This will be checked      │      │
│  │     automatically during compliance review.                 │      │
│  │                                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌─ about this evaluation ────────────────────────────────────┐      │
│  │  This evaluation is AI-generated. All projects undergo     │      │
│  │  human compliance review before being listed to     [F] ► │      │
│  │  investors. Providing evidence for flagged claims           │      │
│  │  speeds up the review process.                              │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌────────────────────────────────┐  ┌────────────────────────┐      │
│  │  Edit proposal & re-evaluate   │  │  Submit for review     │      │
│  └────────────────────────────────┘  └────────────────────────┘      │
│                                                         ◄── [G]    │
└──────────────────────────────────────────────────────────────────────┘

── Loading State ──────────────────────────────────────────────────────

┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                         ◠ ◡ ◠                                        │
│                   Evaluating your proposal...          ◄── [H]      │
│                                                                      │
│             Reading your proposal and assessing                      │
│             impact, feasibility, and readiness.                      │
│             This usually takes a few seconds.                        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Annotations:**

[A] **4-dimension score cards** — High/Medium/Low (not numeric) for creators. Simpler than the investor-facing 0-100 scores because creators need actionable feedback, not precision. Color-coded: green (HIGH), yellow (MEDIUM), red (LOW). At a glance, the creator sees what's strong and what needs work.

[B] **Specific AI coaching** — Feedback references specific details from the proposal ("45-family waitlist," "3km distance," "$23K against $25K"). This is what makes the coaching valuable — it's about *this* proposal, not generic advice. The AI has read the unstructured text and identified the strongest evidence the creator provided.

[C] **Conservative scoring** — Readiness scored MEDIUM despite detailed milestones, because site access isn't confirmed. This conservatism is by design (noted in the demo script) — a system that over-scores to make creators feel good puts investors and the platform at risk. The explanation is specific enough that the creator understands exactly what's missing.

[D] **Actionable improvement suggestion** — "To improve" callout tells the creator exactly what evidence would raise the score. Not vague ("add more detail") but specific ("provide a land-use agreement, letter of intent, or confirmation of site access"). This is the AI-as-coach design — coaching the creator toward a stronger proposal.

[E] **Unverified claims (blue flags)** — Visually distinct from the dimension scores. Blue (🔵) signals "unknown," not "bad" — different from a risk flag. Each flag explains what was claimed, why it's unverified, and what evidence would resolve it. This pre-compliance coaching reduces the back-and-forth during human review.

[F] **Evaluation disclaimer** — Manages expectations: AI evaluation is not approval. Human compliance review is still required. Reinforces that providing evidence speeds up the process — incentivizes the creator to address flags before submitting.

[G] **Dual CTAs** — "Edit proposal & re-evaluate" encourages the creator to address feedback (loops back to the wizard with the AI's flags in mind). "Submit for review" allows submission even with flags — creators shouldn't be blocked by AI. Both paths are equally accessible — the design nudges improvement without gatekeeping.

[H] **Loading state** — Same pattern as investor matching. Descriptive text signals real AI processing. Sets expectation for processing time.

---

## Screen Index

| # | Screen | Flow | Key AI Moment |
|---|--------|------|---------------|
| 1 | Landing Page | Investor | None — trust signals and framing |
| 2 | Values Intake | Investor | Collects AI inputs |
| 3 | AI Matching Results | Investor | Primary AI output — ranked matches with reasoning |
| 4 | Project Detail | Investor | AI reasoning, limitations, score breakdown |
| 5 | Investment Confirmation | Investor | Human decision gate — minimal AI |
| 6 | Portfolio Dashboard | Investor | AI impact narrative, proactive notifications |
| 7 | Compliance Queue | Compliance | AI risk triage — sorted by severity |
| 8 | Verification Dashboard + Evidence Verification | Compliance | Full AI findings + live photo/evidence verification — reviewer workspace |
| 9 | Proposal Wizard | Creator | Collects AI inputs — quality nudges |
| 11 | AI Evaluation Results | Creator | AI coaching — scores, flags, improvement suggestions |
