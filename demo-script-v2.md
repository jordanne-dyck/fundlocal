# FundLocal Demo Script v2 (~3:00)

---

## INTRO — Hook + The Problem (0:00–0:45)

**[VISUAL: You on camera, energy up]**

> "Hey Wealthsimple Crew! I'm Jordanne Dyck and I'm a builder. Here's my latest creation, made just for you. It's called FundLocal — and I built it with Claude Code."

**[VISUAL: Show the landing page hero]**

> "Imagine your favourite coffee shop needs thirty grand to open a second location and they'd pay six percent interest annually to get it. You'd probably be into that investment — but how would it actually work? You'd have to somehow find out they need funding, do your own due diligence on their financials, figure out how to legally structure the deal, and then just... trust that they follow through. Most people give up before step one.
>
> And other options like GoFundMe and Kickstarter are focused on donations and pre-orders — no return structure, no risk evaluation, no accountability. On the institutional side, SRI portfolios are a step in the right direction — but someone else picks what's in them. You get values *categories*, not values *choices*.
>
> Then there's the deeper assumption — that the only return worth tracking is a financial one. But when your $500 keeps the bakery on your corner alive through a rough winter, or restores a wetland you walk past every morning — that's a return. The financial system was just never designed to measure, verify, or deliver it back to you. FundLocal changes that. It uses AI to make community investment — financial returns, impact returns, your choice — easy, scalable, and safe.
>
> I know this role is about rebuilding internal processes as AI-native systems. I built end-to-end deliberately — the consumer experience and the operational infrastructure underneath it, because you can't design one well without thinking about the other. As you watch, pay attention to where AI takes on real responsibility and where humans have to stay in the loop. FundLocal is the vehicle. The systems thinking is the point."

---

## INVESTOR FLOW — Live AI Demo (0:45–1:45)

**[VISUAL: Click "Start investing" → fill in the values intake]**
**[USE THESE INPUTS: Select Environment (#1) and Education (#2). Location: Toronto. Slider: ~70% impact / 30% financial. Amount: $5,000]**

> "The investor experience starts here. Picture this living inside Wealthsimple — users who already invest in SRI portfolios or private equity have told you they care about values-aligned investing. They're the perfect first audience.

> They tell us what matters to them — causes ranked by priority, their community, how they balance impact and financial returns, and their budget."

**[VISUAL: Submit → AI thinking animation plays. Let it breathe. Results load.]**

> "This is a live API call to Claude right now. The AI is reading this investor's profile and scoring every project in our pipeline against it. This couldn't just be a filter — the AI is matching values against messy, real-world project descriptions, reasoning about portfolio balance, and writing plain-language explanations. That's genuine cognitive work."

**[VISUAL: Point to score breakdown, click into top project, scroll through detail]**

> "Every match breaks down into four dimensions. Inside each project, the AI shows its reasoning and explicitly calls out what it couldn't verify. Money releases in stages against verified milestones — receipts trigger phase one, photos trigger phase two."

**[VISUAL: Scroll to "Your call" → click Invest → confirmation → portfolio dashboard]**

> "The investment decision is always human. The AI never moves a dollar without explicit approval."

---

## CREATOR FLOW — Compressed (~15s) (1:45–2:00)

**[VISUAL: Click "Get funded" → "Start your proposal" → Ctrl+Shift+D to skip to compliance]**

> "Creators build proposals through a guided wizard and get live AI evaluation. I've got a shortcut to jump straight to the compliance side — but if you want to see the full creator flow, it's all there. The AI catches missing evidence, flags unverified claims, and won't over-score to make creators feel good."

*Note: If you want to show the creator flow, use copy-paste from the cheat sheet below instead of the shortcut. Otherwise, Ctrl+Shift+D pre-populates the Parkdale Community Garden proposal with empty evidence to trigger UNVERIFIED flags.*

---

## COMPLIANCE — AI Verification + Agent Trace (~50s) (2:00–2:50)

**[VISUAL: Compliance dashboard loads with pre-populated queue]**

> "Now I'm going to show you the internal side — what happens after a creator submits. This is the compliance queue. Notice everything starts collapsed — the reviewer sees a clean queue and opens what they need."

**[VISUAL: Point to WS badges on Riverdale and Kensington]**

> "See the green 'WS Verified' badges on these two? They've linked their Wealthsimple Business accounts — identity already confirmed, KYC complete. The new submission shows 'Not linked' — that's going to become a verification step."

**[VISUAL: Click on the new submission to expand → click "Run AI Verification" → watch animation → results appear]**

> "This is a live AI call doing operational work — and watch what comes back."

**[VISUAL: Point to the colored rows — green verified, yellow unverified, red discrepancy]**

> "Look at the fail states. Green rows are clean — verified. The yellow rows with amber borders? Unable to verify — the AI couldn't find a CRA registration or confirm credentials. And that red row — that's a discrepancy. I claimed a Parks Department partnership and the AI checked the partner directory and found nothing. It's not just flagging — it's telling you exactly what it checked and what it found."

**[VISUAL: Point to the summary banner — "2 verified · 2 unverified · 1 discrepancy"]**

> "The summary gives the reviewer an instant read on the proposal's health."

**[VISUAL: Expand the Agent Activity panel — show the tool-use trace]**

> "Now this is the part I want you to really look at. This 'Agent Activity' panel shows you exactly what the AI did — not a black box summary, but the actual tool calls. It searched the nonprofit registry, queried the CRA database, checked the municipal partner directory, analyzed budget benchmarks against comparable projects, and checked for a Wealthsimple Business account. Each call shows the function name, the arguments it passed, and the result it got back. You can see the model used — claude-haiku-4-5 — and how long it took. This is what agentic AI actually looks like in production."

**[VISUAL: Point to the WS Business check in the trace]**

> "And notice the Wealthsimple tie-in here — the AI automatically checked if this organization has a WS Business account. When they don't, it auto-sends an invitation to link one. When they do, like Riverdale, you get instant KYC confirmation."

**[VISUAL: Click "Milestone Verification" tab → expand Solar Garden]**

> "Same pattern for milestone payouts. Creator submits photos, invoices, permits — the AI analyzes each one. See the 'WS Verified' badge and 'Creator identity: Verified via Wealthsimple Business' — that's the trust layer. And here's the agent trace for the milestone verification — it analyzed 12 installation photos, compared the invoice against the budget allocation, and verified the electrical permit against the city's database. Reviewer confirms, payout releases."

---

## CLOSE (2:50–3:05)

**[VISUAL: Return to landing page]**

> "Three takeaways. One — community investment is a real, underserved market. People want their money to do something they can see and feel. Two — AI makes it possible at scale. Not as a gimmick — real analytical work: matching investors, coaching creators, flagging what it can't verify, and showing you its work through agent traces. Three — humans stay in control. The AI never moves a dollar, never approves a project, never replaces compliance. When it disagrees with a human, the human wins.
>
> Every pattern you just saw — AI pre-screening, agent-traced verification, fail-state highlighting, Wealthsimple identity integration, human override — that's how you rebuild any operational workflow as an AI-native system. Thanks for watching."

---

## TIMING NOTES

| Section | Target | Cumulative |
|---------|--------|------------|
| Hook + The Problem | 45s | 0:45 |
| Investor flow — live AI, portfolio | 60s | 1:45 |
| Creator flow — compressed (shortcut available) | 15s | 2:00 |
| Compliance — agent trace, fail states, WS tie-in, milestones | 50s | 2:50 |
| Close — three takeaways | 15s | 3:05 |

## SHORTCUTS

- **Ctrl+Shift+D**: Jumps directly to compliance dashboard with pre-populated Parkdale Community Garden proposal (empty evidence, UNVERIFIED flags)
- **Nav "Compliance" button**: Same behavior — pre-populates and jumps to compliance view
- Use the shortcut if you want to skip the creator flow and spend more time on compliance

## CREATOR INPUTS CHEAT SHEET (if showing full creator flow)

| Field | Value |
|-------|-------|
| **Title** | Parkdale Community Garden Expansion |
| **Category** | Environment |
| **Location** | Toronto, ON |
| **Problem** | Parkdale has the lowest green space per capita in Toronto. Our existing 20-plot community garden has a 45-person waitlist. Residents in surrounding towers have zero access to growing space. |
| **Beneficiaries** | 200+ Parkdale residents, including 45 families on the waitlist |
| **Timeline** | 8 months |
| **Milestones** | Month 1-2: Site prep and permits / Month 3-4: Raised bed construction / Month 5: Irrigation install / Month 6-7: Accessibility mods / Month 8: Grand opening |
| **Fund use** | $15,000 raised beds and soil, $8,000 irrigation, $5,000 tool shed, $4,000 accessibility modifications, $3,000 contingency |
| **Team** | Sarah Chen, Parkdale Community Land Trust (8 years community organizing). Partnership with City of Toronto Parks Department. |
| **Impact plan** | Quarterly photo updates, annual plot holder survey, monthly financial reports posted publicly |
| **Goal** | $35,000 |
| **Evidence** | LEAVE EMPTY (triggers UNVERIFIED flags) |

## INVESTOR INPUTS CHEAT SHEET

| Field | Value |
|-------|-------|
| **Categories** | #1 Environment, #2 Education |
| **Location** | Toronto |
| **Return slider** | ~70% impact / 30% financial |
| **Amount** | $5,000 |

## KEY DEMO BEATS

1. **Agent Activity panel** — This is your strongest proof that AI is doing real work. Expand it slowly, let the viewer read the function calls.
2. **Fail state rows** — The colored borders make discrepancies immediately visible. Point to the red row specifically.
3. **WS badges** — The contrast between "WS Verified" (green) and "Not linked" (grey) tells a story about trust tiers.
4. **Summary banner** — "2 verified · 2 unverified · 1 discrepancy" gives the reviewer an instant health check.
5. **Milestone agent trace** — Shows the same pattern (AI doing real tool calls) applied to ongoing verification, not just initial review.

## DELIVERY TIPS

- The two live API loading moments are your proof. Pause. Let the panel watch the AI think.
- When expanding Agent Activity, read one or two function calls aloud. Don't rush.
- Mouse over fail-state row borders slowly — the color contrast is the visual proof.
- The WS tie-in is your Wealthsimple-specific narrative. Hit it clearly in compliance and milestones.
- If running over 3:00, compress the investor flow further — the compliance section is now the star.
- Energy up on the open. Conversational through the demo. Confident and clear on the close.
