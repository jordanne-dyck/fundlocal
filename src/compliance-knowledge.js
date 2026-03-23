/**
 * FundLocal Compliance Knowledge Base
 *
 * Structured regulatory knowledge for RAG-augmented compliance verification.
 * Each chunk represents a specific regulation/requirement tagged by jurisdiction,
 * category, and requirement type.
 *
 * Production: This would be embedded in a vector store (e.g., Pinecone, Weaviate)
 * with semantic search. For the prototype, we use keyword + metadata matching.
 */

const COMPLIANCE_KNOWLEDGE = [
  // ── Ontario Securities Commission — Exempt Market Rules ──────────────
  {
    id: "osc-001",
    jurisdiction: "ontario",
    category: ["small_business", "environment", "infrastructure", "research"],
    requirement_type: "securities",
    title: "Ontario Exempt Market Dealer Registration",
    content: `Under Ontario Securities Act, any platform facilitating investment transactions must be registered as an Exempt Market Dealer (EMD) or operate under a valid exemption. Key requirements:
- Registration with the Ontario Securities Commission (OSC) required
- Minimum capital requirement: $50,000 net capital
- Chief Compliance Officer (CCO) must be designated
- Annual audited financial statements required
- Know-Your-Client (KYC) and suitability assessments mandatory for each investor
- Community investment platforms may qualify under the "offering memorandum" exemption (NI 45-106, s. 2.9)`,
    last_updated: "2025-12",
    source: "Ontario Securities Act, R.S.O. 1990, c. S.5; NI 31-103"
  },
  {
    id: "osc-002",
    jurisdiction: "ontario",
    category: ["small_business", "environment", "infrastructure"],
    requirement_type: "securities",
    title: "Crowdfunding Exemption (Start-up)",
    content: `Ontario Start-up Crowdfunding Exemption (OSC Rule 45-501, Part 5):
- Maximum raise: $1,500,000 per offering
- Maximum investment: $2,500 per investor per offering
- Issuer must be incorporated in Canada with head office in a participating jurisdiction
- Offering document required (simplified prospectus-like disclosure)
- 2 business day cooling-off period for investors
- Funds held in trust until minimum offering amount reached
- Annual financial statements required if total raised exceeds $500,000
- Platform (funding portal) must be registered with OSC
This exemption is specifically designed for small community-oriented raises.`,
    last_updated: "2025-12",
    source: "OSC Rule 45-501, Part 5; Multilateral CSA Notice 45-316"
  },
  {
    id: "osc-003",
    jurisdiction: "canada",
    category: ["small_business", "environment", "infrastructure", "research"],
    requirement_type: "securities",
    title: "Offering Memorandum Exemption",
    content: `National Instrument 45-106, Section 2.9 — Offering Memorandum Exemption:
- Available to non-reporting issuers (private companies, co-ops, community organizations)
- Offering memorandum must be filed with securities regulator
- Investment limits for non-eligible investors:
  - $10,000 per offering for investors with income <$75,000 and net assets <$400,000
  - $30,000 for investors with income ≥$75,000 or net assets ≥$400,000
  - $100,000 for "eligible investors" (accredited)
- 2 business day cancellation right
- Annual financial statements required
- Risk acknowledgment form must be signed by investor
Most relevant exemption for community investment platforms with larger raises.`,
    last_updated: "2025-12",
    source: "National Instrument 45-106, Section 2.9"
  },

  // ── CRA Charity Requirements ─────────────────────────────────────────
  {
    id: "cra-001",
    jurisdiction: "canada",
    category: ["environment", "education", "healthcare", "research"],
    requirement_type: "charity",
    title: "CRA Registered Charity Obligations",
    content: `Canada Revenue Agency requirements for registered charities:
- Must file annual T3010 Registered Charity Information Return within 6 months of fiscal year-end
- Failure to file → revocation of charitable status
- Must maintain books and records for at least 6 years
- Disbursement quota: must spend minimum 3.5% of property not used in charitable activities
- Cannot carry on unrelated business activities
- Political activities limited to non-partisan activities that further charitable purpose
- Must be established and resident in Canada
- CRA database publicly searchable: charity name, registration number, status, filing history
Verification: Search CRA Charities Listings (open.canada.ca) for registration status.`,
    last_updated: "2025-12",
    source: "Income Tax Act, Part V; CRA Charities Directorate"
  },
  {
    id: "cra-002",
    jurisdiction: "canada",
    category: ["environment", "education", "healthcare"],
    requirement_type: "charity",
    title: "Charity Revocation and Annulment",
    content: `Grounds for CRA charity revocation:
- Failure to file T3010 for 2+ consecutive years (automatic revocation process)
- Non-compliance with disbursement quota
- Providing false information on application or return
- Operating outside stated charitable purposes
- Excessive accumulation of funds without charitable use
Revocation status is public and searchable. A revoked charity:
- Loses tax-exempt status retroactively
- Must pay revocation tax equal to full value of assets
- Cannot issue tax receipts
- Name remains in CRA database with "Revoked" status
Important: Revocation is different from voluntary dissolution — revoked charities may still exist as organizations but without charitable tax status.`,
    last_updated: "2025-12",
    source: "Income Tax Act, s. 149.1(2)-(4.1); CRA Charities Guidance CG-012"
  },

  // ── Municipal Requirements ───────────────────────────────────────────
  {
    id: "mun-001",
    jurisdiction: "toronto",
    category: ["infrastructure", "environment", "small_business"],
    requirement_type: "municipal",
    title: "City of Toronto Building Permits and Zoning",
    content: `City of Toronto building and development requirements:
- Building permit required for any construction, alteration, or demolition over $5,000
- Zoning by-law compliance (By-law 569-2013) — project must conform to permitted use for the zone
- Site plan approval required for developments over certain thresholds
- Heritage Conservation District requirements may apply in designated areas
- Tree preservation by-law (Private Tree By-law, Chapter 813) — permit needed to remove trees >30cm diameter
- Environmental site assessments required for changing land use (Phase 1 ESA minimum)
- Committee of Adjustment approval needed for minor variances
Verification: Toronto Open Data portal for permit records; ePlans portal for application status.`,
    last_updated: "2025-12",
    source: "City of Toronto Building Code Act; By-law 569-2013; Toronto Municipal Code"
  },
  {
    id: "mun-002",
    jurisdiction: "hamilton",
    category: ["infrastructure", "environment"],
    requirement_type: "municipal",
    title: "City of Hamilton Building and Zoning Requirements",
    content: `City of Hamilton building requirements:
- Building permit required per Ontario Building Code for construction over $5,000
- Zoning By-law 05-200 governs permitted uses
- Site plan control agreements required for non-residential development
- Niagara Escarpment Development Permits required for projects in escarpment area
- Hamilton Conservation Authority permit required for work near watercourses or wetlands
- Heritage permits required in designated heritage districts (e.g., Durand, Kirkendall)
- Green roof requirements may apply under green development standards
Verification: Hamilton building permit lookup (hamilton.ca); Conservation Authority permit check.`,
    last_updated: "2025-12",
    source: "City of Hamilton Zoning By-law 05-200; Ontario Building Code"
  },
  {
    id: "mun-003",
    jurisdiction: "ontario",
    category: ["infrastructure", "environment", "small_business"],
    requirement_type: "municipal",
    title: "Ontario Business Registry Requirements",
    content: `Ontario business registration requirements:
- Sole proprietorships and partnerships must register under the Business Names Act (renewal every 5 years)
- Corporations must register under the Ontario Business Corporations Act or the Not-for-Profit Corporations Act (ONCA)
- Not-for-profit corporations must comply with ONCA requirements:
  - Annual filing of corporate return
  - Financial statements appropriate to revenue level
  - Revenue >$500,000: audit required; $100K-$500K: review engagement; <$100K: compilation acceptable
- Co-operatives register under the Co-operative Corporations Act
- All registrations searchable through ServiceOntario's Ontario Business Registry
Verification: Ontario Business Registry search (ontario.ca/page/ontario-business-registry).`,
    last_updated: "2025-12",
    source: "Business Names Act; Ontario Business Corporations Act; Not-for-Profit Corporations Act, 2010"
  },

  // ── Industry-Specific Standards ──────────────────────────────────────
  {
    id: "ind-001",
    jurisdiction: "ontario",
    category: ["environment"],
    requirement_type: "environmental",
    title: "Ontario Environmental Compliance for Community Projects",
    content: `Environmental compliance requirements for community projects in Ontario:
- Environmental Compliance Approval (ECA) required for projects that may discharge contaminants (air, water, land)
- Environmental Assessment Act applies to public-sector projects and some private-sector projects of significant scale
- Species at Risk Act compliance — projects must not harm threatened or endangered species or their habitat
- Conservation Authority permits required for development in regulated areas (flood plains, wetlands, shorelines)
- Phase 1 and Phase 2 Environmental Site Assessments for brownfield redevelopment
- Solar installations: Renewable Energy Approval (REA) required for facilities >10kW (community solar typically exceeds this)
- Waste management approvals for composting facilities or waste diversion projects
Verification: Environmental Activity and Sector Registry (EASR) for registered activities; MECP compliance database.`,
    last_updated: "2025-12",
    source: "Ontario Environmental Protection Act; Environmental Assessment Act; Endangered Species Act, 2007"
  },
  {
    id: "ind-002",
    jurisdiction: "ontario",
    category: ["education"],
    requirement_type: "education",
    title: "Ontario Education and Youth Program Requirements",
    content: `Requirements for education-related community projects in Ontario:
- Programs serving children/youth must comply with Ontario's child protection framework
- Vulnerable Sector Check (VSC) required for all staff and volunteers working with minors
- If operating a "day camp" or after-school program: must meet Day Nurseries Act or Child Care and Early Years Act requirements
- School board partnership requirements: formal agreement needed; TDSB requires liability insurance, background checks, and program alignment with curriculum
- Post-secondary partnerships: institutional ethics board approval may be required for research involving human subjects
- Equipment purchases for schools: must meet CSA safety standards; procurement may require board-level approval
- Accessibility: Accessibility for Ontarians with Disabilities Act (AODA) compliance required for public-facing programs
Verification: Ontario College of Teachers registry for educator credentials; Criminal Record Check databases.`,
    last_updated: "2025-12",
    source: "Child Care and Early Years Act, 2014; AODA; Education Act, R.S.O. 1990"
  },
  {
    id: "ind-003",
    jurisdiction: "canada",
    category: ["healthcare"],
    requirement_type: "healthcare",
    title: "Health-Related Community Project Requirements",
    content: `Requirements for health-related community projects in Canada:
- Food banks and food distribution: must comply with provincial food safety regulations (Ontario Health Protection and Promotion Act)
- Food handling certification required for volunteers handling food
- Cold chain requirements for perishable food storage (Health Canada Safe Food Storage guidelines)
- Health information collection: Personal Health Information Protection Act (PHIPA) in Ontario
- Community health clinics: provincial licensing through Ontario Ministry of Health
- Mental health programs: practitioners must be registered with appropriate Ontario college (e.g., College of Psychologists, College of Social Workers)
- Pharmaceutical handling (if applicable): Drug and Pharmacies Regulation Act
- Accessibility requirements per AODA for all health service delivery points
Verification: Ontario Ministry of Health facility registry; professional college registries; Public Health inspection reports.`,
    last_updated: "2025-12",
    source: "Health Protection and Promotion Act; PHIPA; Drug and Pharmacies Regulation Act"
  },
  {
    id: "ind-004",
    jurisdiction: "canada",
    category: ["small_business"],
    requirement_type: "business",
    title: "Small Business and Micro-Loan Compliance",
    content: `Regulatory requirements for community micro-loan and small business funding programs:
- Lending activities may trigger provincial consumer lending legislation (Payday Loans Act in Ontario; Consumer Protection Act)
- Interest rate cap: Criminal Code s. 347 sets maximum at 35% APR (reduced from 60% effective 2025)
- If structured as a loan fund: potential securities regulation — pooled investment vehicles may require prospectus or exemption
- BIA (Business Improvement Area) operations governed by Municipal Act, Part IV
- Anti-money laundering: FINTRAC registration required if facilitating financial transactions above thresholds
- Tax implications: interest income is taxable; loan losses may be deductible under specific conditions
- Community Development Financial Institution (CDFI) model may apply — no specific Canadian regulatory framework but established best practices
Verification: FINTRAC registry for MSB registration; Ontario Business Registry for BIA incorporation; CRA business number lookup.`,
    last_updated: "2025-12",
    source: "Criminal Code, s. 347; Payday Loans Act, 2008; FINTRAC guidelines; Municipal Act, 2001"
  },
  {
    id: "ind-005",
    jurisdiction: "ontario",
    category: ["research"],
    requirement_type: "research",
    title: "Research Project Compliance Requirements",
    content: `Requirements for community-funded research projects:
- Research involving human participants: Tri-Council Policy Statement (TCPS 2) compliance required; institutional Research Ethics Board (REB) approval mandatory
- Data collection and privacy: compliance with PIPEDA (federal) and potentially PHIPA (if health data in Ontario)
- Open-source licensing: MIT, GPL, Apache licenses have different implications for commercial use and liability
- University-affiliated research: institutional overhead charges typically 20-40% of direct costs
- Equipment procurement: may require competitive bidding above certain thresholds (varies by institution)
- Intellectual property: clear IP assignment needed between funder, researcher, and institution
- Environmental research: Species at Risk permits if fieldwork involves protected species; Conservation Authority permits for wetland/watercourse access
Verification: University ethics board approval status; Tri-Council grants registry; academic publication records (Google Scholar, ORCID).`,
    last_updated: "2025-12",
    source: "TCPS 2; PIPEDA; institutional research policies"
  },

  // ── Vancouver / BC Jurisdiction ──────────────────────────────────────
  {
    id: "bc-001",
    jurisdiction: "vancouver",
    category: ["infrastructure", "environment", "small_business"],
    requirement_type: "municipal",
    title: "City of Vancouver Development and Business Requirements",
    content: `City of Vancouver requirements relevant to community projects:
- Development permit required for most construction/renovation (Vancouver Building By-law)
- Business licence required for any business operating in Vancouver (annual renewal)
- Community benefit agreements may be required for larger developments
- Green Building Policy for Rezoning: all rezonings must meet near-zero emission building standards
- Zoning and Development By-law governs permitted land uses
- Heritage designation requirements in heritage conservation areas
- BC Securities Commission (BCSC) governs securities in BC — separate registration from Ontario
- BC Societies Act governs not-for-profit organizations in BC (different from Ontario ONCA)
Verification: City of Vancouver Open Data for permits and licences; BC Societies Online Registry; BCSC registration search.`,
    last_updated: "2025-12",
    source: "Vancouver Building By-law; BC Securities Act; BC Societies Act"
  },

  // ── Rural Ontario ────────────────────────────────────────────────────
  {
    id: "rural-001",
    jurisdiction: "ontario",
    category: ["environment", "infrastructure"],
    requirement_type: "municipal",
    title: "Rural Ontario Community Project Requirements",
    content: `Additional considerations for community projects in rural Ontario:
- Township and county-level building permits (same Ontario Building Code, but local by-laws vary)
- Septic system approval required for developments not on municipal sewage (Ontario Building Code Part 8)
- Minimum Distance Separation (MDS) formulae for projects near agricultural operations
- Conservation Authority jurisdiction varies by watershed — multiple CAs may cover different rural areas
- Source Water Protection Plans may restrict activities in wellhead protection areas
- Agricultural zoning restrictions: permitted uses more limited than urban zones
- Aggregate Resources Act permits if project involves extraction
- Fire department review required where no municipal water supply exists
Verification: County/township building department; local Conservation Authority; Ministry of Agriculture zoning maps.`,
    last_updated: "2025-12",
    source: "Ontario Building Code Part 8; Conservation Authorities Act; Planning Act"
  }
];

/**
 * Retrieve relevant compliance knowledge chunks based on proposal metadata.
 * Uses keyword + metadata matching (prototype). Production would use semantic embeddings.
 *
 * @param {Object} proposal - The proposal being verified
 * @param {string} proposal.category - Project category
 * @param {string} proposal.location - Project location
 * @param {string} proposal.team - Team description (checked for charity/org keywords)
 * @param {string} proposal.goal - Funding goal (checked for securities thresholds)
 * @param {string} proposal.fundUse - Fund use description
 * @returns {Object} Retrieved context with chunks and metadata
 */
export function retrieveComplianceContext(proposal) {
  const category = (proposal.category || "").toLowerCase();
  const location = (proposal.location || "").toLowerCase();
  const team = (proposal.team || "").toLowerCase();
  const fundUse = (proposal.fundUse || "").toLowerCase();
  const goal = (proposal.goal || "").replace(/[^0-9]/g, "");
  const goalAmount = parseInt(goal) || 0;
  const allText = `${proposal.title || ""} ${proposal.problem || ""} ${team} ${fundUse}`.toLowerCase();

  const scored = COMPLIANCE_KNOWLEDGE.map(chunk => {
    let score = 0;
    const reasons = [];

    // Category match
    if (chunk.category.includes(category)) {
      score += 3;
      reasons.push(`category match: ${category}`);
    }

    // Jurisdiction match
    if (location.includes("toronto") && (chunk.jurisdiction === "toronto" || chunk.jurisdiction === "ontario" || chunk.jurisdiction === "canada")) {
      score += chunk.jurisdiction === "toronto" ? 3 : 2;
      reasons.push(`jurisdiction match: ${chunk.jurisdiction}`);
    } else if (location.includes("hamilton") && (chunk.jurisdiction === "hamilton" || chunk.jurisdiction === "ontario" || chunk.jurisdiction === "canada")) {
      score += chunk.jurisdiction === "hamilton" ? 3 : 2;
      reasons.push(`jurisdiction match: ${chunk.jurisdiction}`);
    } else if (location.includes("vancouver") && (chunk.jurisdiction === "vancouver" || chunk.jurisdiction === "canada")) {
      score += chunk.jurisdiction === "vancouver" ? 3 : 2;
      reasons.push(`jurisdiction match: ${chunk.jurisdiction}`);
    } else if (chunk.jurisdiction === "ontario" || chunk.jurisdiction === "canada") {
      score += 1;
      reasons.push(`general jurisdiction: ${chunk.jurisdiction}`);
    }

    // Keyword boosting
    if ((team.includes("charity") || team.includes("non-profit") || team.includes("nonprofit") || allText.includes("cra") || allText.includes("registered")) && chunk.requirement_type === "charity") {
      score += 2;
      reasons.push("charity keywords detected");
    }
    if ((allText.includes("permit") || allText.includes("zoning") || allText.includes("construction") || allText.includes("building")) && chunk.requirement_type === "municipal") {
      score += 2;
      reasons.push("municipal/permit keywords detected");
    }
    if ((allText.includes("loan") || allText.includes("lending") || allText.includes("micro-loan") || allText.includes("fund")) && chunk.requirement_type === "business") {
      score += 2;
      reasons.push("lending/business keywords detected");
    }
    if (goalAmount > 1500000 && chunk.id === "osc-003") {
      score += 2;
      reasons.push("large raise → offering memorandum relevant");
    }
    if (goalAmount > 0 && goalAmount <= 1500000 && chunk.id === "osc-002") {
      score += 2;
      reasons.push("raise within crowdfunding exemption range");
    }

    return { ...chunk, score, reasons };
  });

  // Sort by score descending, take top 3-5 most relevant
  scored.sort((a, b) => b.score - a.score);
  const topChunks = scored.filter(c => c.score >= 3).slice(0, 5);

  // If nothing scores high enough, return general securities + category match
  if (topChunks.length === 0) {
    const fallback = scored.slice(0, 2);
    return {
      chunks: fallback,
      retrievalMetadata: {
        query: { category, location, goalAmount },
        totalChunks: COMPLIANCE_KNOWLEDGE.length,
        retrievedCount: fallback.length,
        strategy: "fallback — no strong matches, returning top 2 by score"
      }
    };
  }

  return {
    chunks: topChunks,
    retrievalMetadata: {
      query: { category, location, goalAmount },
      totalChunks: COMPLIANCE_KNOWLEDGE.length,
      retrievedCount: topChunks.length,
      strategy: "keyword + metadata matching"
    }
  };
}

/**
 * Format retrieved chunks into a context string for injection into the compliance prompt.
 */
export function formatRAGContext(retrievalResult) {
  if (!retrievalResult || !retrievalResult.chunks || retrievalResult.chunks.length === 0) {
    return "";
  }

  const sections = retrievalResult.chunks.map(chunk =>
    `### ${chunk.title}\n**Jurisdiction:** ${chunk.jurisdiction} | **Type:** ${chunk.requirement_type} | **Source:** ${chunk.source}\n\n${chunk.content}`
  );

  return `\n## REGULATORY CONTEXT (Retrieved from compliance knowledge base)\nThe following regulations may be relevant to this proposal. Use them to inform your verification — check whether the proposal's claims and structure comply with applicable requirements. Do not fabricate regulations not listed here.\n\n${sections.join("\n\n---\n\n")}`;
}

export { COMPLIANCE_KNOWLEDGE };
