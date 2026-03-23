# FundLocal Demo Script (~3:00)

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

## INVESTOR FLOW — Live AI Demo (0:45–1:50)

**[VISUAL: Click "Start investing" → fill in the values intake]**
**[USE THESE INPUTS: Select Environment (#1) and Education (#2). Location: Toronto. Slider: ~70% impact / 30% financial. Amount: $5,000]**

> "The investor experience starts here. Picture this living inside Wealthsimple — users who already invest in SRI portfolios or private equity have told you they care about values-aligned investing. They're the perfect first audience.

> They tell us what matters to them — causes ranked by priority, their community, how they balance impact and financial returns, and their budget. Takes about a minute, and it saves to a profile they can adjust anytime."

**[VISUAL: Submit → AI thinking animation plays. Let it breathe. Results load.]**

> "This is a live API call to Claude right now. The AI is reading this investor's profile and scoring every project in our pipeline against it. This couldn't just be a filter or a database query — the AI is matching values against messy, real-world project descriptions, reasoning about how different projects *complement each other* to hit that 70/30 mix, and writing plain-language explanations of why each match works or doesn't. That's genuine cognitive work."

**[VISUAL: Brief pause — let results sink in]**

> "And this scales. Right now there's a handful of projects, but when there are thousands, you don't send everything to the AI every time. You pre-compute scores offline as projects come in, then when an investor hits submit, the AI grabs the top candidates and does a focused reasoning pass on just those — response stays fast regardless of pipeline size. And as it sees how investors interact with recommendations, matches get sharper — personalization improves the more it's used."

**[VISUAL: Point to the top project's score breakdown — Values, Location, Returns, Credibility]**

> "Every match breaks down into four dimensions, and the weighting reflects your specific profile. You can see exactly *why* something scored the way it did."

**[VISUAL: Click into the top project → scroll through reasoning, limitations]**

> "Inside each project, the AI shows its reasoning and explicitly calls out what it couldn't verify. That transparency is intentional — you see the confidence and the gaps."

**[VISUAL: Point to the milestone tracker — complete/in-progress/upcoming]**

> "Milestones are the accountability layer. Money releases in stages against verified progress — receipts trigger phase one, installation photos trigger phase two. If a milestone isn't hit, funds don't move. We start with projects where verification is straightforward — receipts, photos, audits — and expand as the platform matures."

**[VISUAL: Gesture at the project detail page while talking about where projects come from]**

> "So where do projects like this come from? To kick things off, we seed the platform with public data — municipal budgets, school board capital plans, infrastructure reports. AI scans those records and turns them into investable project profiles, then invites the relevant organization to claim and complete it. Pair that with a handful of institutional partners — BIAs, conservation authorities, school boards, universities — who each bring dozens of projects, and you've got a real pipeline before organic submissions even start flowing."

**[VISUAL: Scroll to "Your call" box → click Invest $500 → confirmation]**

> "The investment decision is always human. The AI found the match, evaluated the risk, wrote the reasoning — but it never moves a dollar without explicit approval."

**[VISUAL: Portfolio dashboard — total invested, projects funded, milestones hit, impact summary]**

> "After investing, the portfolio tracks everything — capital deployed, financial returns accruing, milestones hit, and a running impact summary. This is your money doing what you told it to do."

---

## CREATOR FLOW — AI as Coach, Live Evaluation (~20s) (1:50–2:10)

**[VISUAL: Click "Get funded" in nav → "Start your proposal" → quickly fill Steps 1–4 via copy-paste. Leave evidence EMPTY.]**

> "Now the other side — creators. They build a proposal through a guided wizard, and the AI evaluates it live. I'm leaving the evidence field blank on purpose."

**[VISUAL: Step 5 review → click "Get AI evaluation" → results appear. Brief pause on scores + UNVERIFIED flags.]**

> "Another live API call — the AI caught that I claimed a partnership with the Parks Department and gave zero evidence. It flagged it separately from general risk. Readiness scored Medium even with detailed milestones — the AI won't over-score to make creators feel good. That conservatism protects investors. Now watch what happens when I submit."

---

## COMPLIANCE — Internal AI Verification (~35s) (2:10–2:45)

**[VISUAL: Click "Submit for review" → compliance dashboard loads]**

> "Now I'm going to show you something most people don't think about — what happens on the other side. This is the internal compliance queue. Every proposal is AI pre-screened before a reviewer touches it."

**[VISUAL: Click "Run AI Verification" → thinking animation → results appear]**

> "This is a live AI call — and this one's doing operational work. It's searching public records to confirm the organization exists, cross-referencing the CRA database for charity registration, and checking the Parks Department's partner directory for that claim I made with zero evidence. Look at the results — it verified what it could, auto-requested missing information from the creator, and for the partnership claim it couldn't verify, it drafted an email to the Parks Department ready for the reviewer to send. Out of five checks, zero require the reviewer to start from scratch."

**[VISUAL: Click "Milestone Verification" tab → Solar Garden expanded]**

> "And it doesn't stop at approval. Once funded, every milestone payout goes through the same process. Creator submits evidence — photos, invoices, permits — AI analyzes each one. Here it checked the installation photos match the site, confirmed the invoice is within budget, and verified the electrical permit against the city's database. Reviewer confirms, payout releases. That's how you take a four-hour process down to twelve minutes."

---

## CLOSE (2:45–3:05)

**[VISUAL: Return to landing page]**

> "So three things I want you to take away. One — community investment is a real, underserved market. People want their money to do something they can see and feel, and right now there's no good way to make that happen. Two — AI is what makes it possible at scale. Not as a gimmick — real analytical work: matching investors to projects they actually care about, coaching creators to build stronger proposals, flagging what it can't verify, and designed to improve with every completed project. Three — humans stay in control at every level. The AI never moves a dollar, never approves a project, never replaces compliance. When it disagrees with a human, the human wins.
>
> Every pattern you just saw — AI pre-screening, credential verification, compliance acceleration, human override — that's not just a product feature. That's how you rebuild any operational workflow as an AI-native system. FundLocal puts AI where it's strong and keeps humans where they have to be. Thanks for watching."

---

## TIMING NOTES

| Section | Target | Cumulative |
|---------|--------|------------|
| Hook + The Problem | 45s | 0:45 |
| Investor flow — live AI, scalability, supply, portfolio | 65s | 1:50 |
| Creator flow — compressed, live AI eval | 20s | 2:10 |
| Compliance — live verification, milestone verification | 35s | 2:45 |
| Close — three takeaways, sign-off | 20s | 3:05 |


## CREATOR INPUTS CHEAT SHEET (copy-paste before recording)

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

## DELIVERY TIPS

- The two live API loading moments are your proof. Pause. Let the panel watch the AI think. Then narrate what came back.
- The uncertainty beat ("readiness is Medium even though I gave milestones") is one of your strongest moments. Don't rush it.
- Mouse over UNVERIFIED flags and Verified badges slowly — make them visually obvious.
- Mouse along milestone tracker stages when discussing accountability.
- Pre-fill a text file with creator inputs. Copy-paste during recording.
- If running over 3:00, trim the demand-side sentences in the close. Everything else is load-bearing.
- Energy up on the open. Conversational through the demo. Confident and clear on the close.
