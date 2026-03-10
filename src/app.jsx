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

const DEMO_PROPOSAL = {
  proposal: {
    title: "Parkdale Community Garden Expansion",
    category: "environment",
    location: "Toronto, ON",
    goal: "$35,000",
    problem: "Parkdale has the lowest green space per capita in Toronto. Our existing 20-plot community garden has a 45-person waitlist. Residents in surrounding towers have zero access to growing space.",
    beneficiaries: "200+ Parkdale residents, including 45 families on the waitlist",
    timeline: "8 months",
    milestones: "Month 1-2: Site prep and permits\nMonth 3-4: Raised bed construction\nMonth 5: Irrigation install\nMonth 6-7: Accessibility mods\nMonth 8: Grand opening",
    fundUse: "$15,000 raised beds and soil, $8,000 irrigation, $5,000 tool shed, $4,000 accessibility modifications, $3,000 contingency",
    team: "Sarah Chen, Community Living Toronto (8 years community programming). Partnership with City of Toronto Parks Department.",
    impactPlan: "Quarterly photo updates, annual plot holder survey, monthly financial reports posted publicly",
    evidence: "",
  },
  aiResult: {
    overall_assessment: "A well-structured community garden proposal from a verified registered charity. The 45-person waitlist demonstrates real demand. However, the claimed Parks Department partnership is unverified, and no evidence has been provided for site access.",
    scores: {
      impact: { rating: "High", explanation: "Lowest green space per capita claim is specific and verifiable; 200+ direct beneficiaries is meaningful." },
      feasibility: { rating: "Medium", explanation: "Budget breakdown is reasonable but the 8-month timeline is tight for permits + construction + accessibility mods." },
      readiness: { rating: "Medium", explanation: "Detailed milestones provided, but no evidence of permits applied for or site access secured." },
      clarity: { rating: "High", explanation: "Problem, beneficiaries, budget, and impact plan are all clearly articulated." },
    },
    strengths: [
      "Creator is a CRA-registered charity (Community Living Toronto, BN: 107694143RR0001) — verified via live database lookup",
      "Specific, data-backed need: lowest green space per capita in Toronto with a 45-person waitlist",
      "Detailed budget breakdown with reasonable line items totalling $35,000",
      "Clear accountability plan with quarterly photos, surveys, and public financial reports",
    ],
    improvements: [
      "Provide evidence of Parks Department partnership — a letter of support or MOU",
      "Include proof of site access or lease agreement for the expansion area",
      "Add contingency plan if permits are delayed beyond Month 2",
      "Specify Sarah Chen's specific role and past project outcomes at Community Living Toronto",
    ],
    risk_flags: [
      "UNVERIFIED: Partnership with City of Toronto Parks Department — no supporting documentation provided",
      "UNVERIFIED: Sarah Chen's 8-year tenure at Community Living Toronto — no references or links",
      "UNVERIFIED: Claim of lowest green space per capita — no source cited",
    ],
    suggested_milestones: [
      "Month 1: Secure site access agreement and submit permit applications",
      "Month 3: Complete raised bed construction — verified by site photos and receipts",
      "Month 6: Accessibility modifications complete — verified by accessibility audit",
    ],
  },
};

async function fetchClaude(body, signal, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch("/api/anthropic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

// Raw API call that returns the full Anthropic response (for tool-use flows)
async function fetchClaudeRaw(body, signal) {
  const res = await fetch("/api/anthropic", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    console.error("fetchClaudeRaw error:", res.status, errBody);
    throw new Error(`API error: ${res.status} — ${errBody.slice(0, 200)}`);
  }
  return res.json();
}

// Real tool-use verification: Claude calls search_charity_registry, we fetch the CRA charity list via Canada Open Data, Claude interprets
async function runRegistryVerification(orgName, signal, onToolCall, onToolResult, onInterpretation) {
  const tools = [{
    name: "search_charity_registry",
    description: "Search the Canada Revenue Agency's registered charity database via Canada Open Data. Returns matching charity records as JSON including legal name, BN (registration number), address, city, and province.",
    input_schema: {
      type: "object",
      properties: {
        organization_name: { type: "string", description: "Name of the organization to search for" },
        province: { type: "string", description: "Province code (e.g. ON)" },
      },
      required: ["organization_name"],
    },
  }];

  // Step 1: Ask Claude to verify the org — it should call the tool
  const response1 = await fetchClaudeRaw({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    tools,
    messages: [{
      role: "user",
      content: `You are a compliance verification agent. Verify whether "${orgName}" is a registered charity or nonprofit in Canada. Use the search_charity_registry tool to look it up. After getting results, provide a concise summary: was the organization found, what is its BN (registration number), its address, and its status.`,
    }],
  }, signal);

  // Step 2: Extract the tool_use block
  const toolUseBlock = response1.content?.find(c => c.type === "tool_use");
  if (!toolUseBlock) {
    const textContent = response1.content?.map(c => c.text || "").join("") || "";
    onInterpretation && onInterpretation(textContent);
    return { toolCall: null, registryData: null, interpretation: textContent, rawResponse: response1 };
  }

  // Notify: Claude made the tool call
  onToolCall && onToolCall(toolUseBlock);

  // Step 3: Fetch from Canada Open Data CKAN API (CRA registered charity list)
  const searchName = toolUseBlock.input?.organization_name || orgName;
  let registryData = "";
  try {
    const registryRes = await fetch(`/api/registry/data/api/3/action/datastore_search?resource_id=31a52caf-fa79-4ab3-bded-1ccc7b61c17f&q=${encodeURIComponent(searchName)}&limit=5`, { signal });
    const json = await registryRes.json();
    const records = json.result?.records || [];
    const total = json.result?.total || 0;
    if (records.length > 0) {
      registryData = `CRA Registered Charity Database — search results for "${searchName}":\n\nTotal matches found: ${total}\n\n` +
        records.map((r, i) => `${i + 1}. Legal Name: ${r["Legal Name"]}\n   BN: ${r.BN}\n   Address: ${r["Address Line 1"]}, ${r.City}, ${r.Province} ${r["Postal Code"]}\n   Designation: ${r.Designation === "C" ? "Charity" : r.Designation}`).join("\n\n") +
        `\n\nSource: Canada Open Data Portal — 2023 List of Charities (resource_id: 31a52caf-fa79-4ab3-bded-1ccc7b61c17f)`;
    } else {
      registryData = `CRA Registered Charity Database — search results for "${searchName}":\n\nNo matching registered charity found. Total results: 0.\n\nSource: Canada Open Data Portal — 2023 List of Charities`;
    }
  } catch (e) {
    registryData = `Registry fetch failed: ${e.message}. The CRA charity database at open.canada.ca contains all registered Canadian charities.`;
  }

  // Notify: we got real registry data
  onToolResult && onToolResult(registryData);

  // Step 4: Send tool result back to Claude for interpretation
  const cleanedContent = response1.content.map(block => {
    if (block.type === "tool_use") {
      const { caller, ...rest } = block;
      return rest;
    }
    return block;
  });
  const response2 = await fetchClaudeRaw({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    messages: [
      { role: "user", content: `Verify whether "${orgName}" is a registered charity or nonprofit in Canada. Use the search_charity_registry tool.` },
      { role: "assistant", content: cleanedContent },
      {
        role: "user",
        content: [{
          type: "tool_result",
          tool_use_id: toolUseBlock.id,
          content: registryData,
        }],
      },
    ],
    tools,
  }, signal);

  const interpretation = response2.content?.map(c => c.text || "").join("") || "";
  onInterpretation && onInterpretation(interpretation);

  return {
    toolCall: toolUseBlock,
    registryData: registryData.slice(0, 2000),
    interpretation,
    rawResponse: { step1: response1, step2: response2 },
  };
}

// Extract EXIF metadata from a JPEG file — camera, GPS coords, timestamp, AI detection
function extractImageMetadata(arrayBuffer, fileName) {
  const result = { hasExif: false, camera: null, software: null, gps: false, gpsCoords: null, timestamp: null, warnings: [] };

  // Check filename for known AI generator patterns
  const aiPatterns = [/gemini.generated/i, /dall.?e/i, /midjourney/i, /stable.?diffusion/i, /firefly/i, /ideogram/i, /leonardo/i, /playground/i, /bing.?image/i, /ai.?generated/i, /generated.?image/i];
  for (const pat of aiPatterns) {
    if (pat.test(fileName)) {
      result.warnings.push(`Filename "${fileName}" matches known AI generator naming pattern: ${pat.source}`);
    }
  }

  // Parse JPEG EXIF
  const view = new DataView(arrayBuffer);
  if (view.byteLength < 4) return result;
  if (view.getUint16(0) !== 0xFFD8) return result; // Not JPEG

  let offset = 2;
  while (offset < view.byteLength - 2) {
    const marker = view.getUint16(offset);
    if (marker === 0xFFE1) { // APP1 = EXIF
      result.hasExif = true;
      const segLen = view.getUint16(offset + 2);
      const segEnd = Math.min(offset + 4 + segLen - 2, view.byteLength);
      const segment = new Uint8Array(arrayBuffer, offset + 4, segEnd - (offset + 4));
      const text = Array.from(segment).map(b => (b >= 32 && b < 127) ? String.fromCharCode(b) : " ").join("");

      // Camera make
      const makePatterns = [/Canon/i, /Nikon/i, /Sony/i, /Apple/i, /Samsung/i, /Google/i, /Huawei/i, /OnePlus/i, /Xiaomi/i, /FUJIFILM/i, /Olympus/i, /Panasonic/i, /LG/i, /Motorola/i, /DJI/i, /GoPro/i];
      for (const mp of makePatterns) {
        const match = text.match(mp);
        if (match) { result.camera = match[0]; break; }
      }

      // Editing software
      const swPatterns = [/Adobe\s*Photoshop/i, /GIMP/i, /Lightroom/i, /Snapseed/i];
      for (const sp of swPatterns) {
        const match = text.match(sp);
        if (match) { result.software = match[0]; break; }
      }

      // Timestamp — look for EXIF date pattern: "YYYY:MM:DD HH:MM:SS"
      const dateMatch = text.match(/(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
      if (dateMatch) {
        result.timestamp = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}T${dateMatch[4]}:${dateMatch[5]}:${dateMatch[6]}`;
      }

      // GPS — check for GPS IFD presence
      if (text.includes("GPS")) {
        result.gps = true;
        // Try to find GPS coordinates encoded in the EXIF segment
        // GPS data is stored as rational numbers in IFD entries — we do a best-effort parse
        // by looking for the TIFF byte order and scanning for GPS IFD tags
        try {
          const exifStart = offset + 4;
          // Check for "Exif\0\0" header then TIFF header
          if (segment[0] === 0x45 && segment[1] === 0x78) { // "Ex"
            const tiffOffset = 6; // After "Exif\0\0"
            const littleEndian = segment[tiffOffset] === 0x49; // "II" = little-endian
            const tiffView = new DataView(arrayBuffer, exifStart + tiffOffset);

            // Helper to read EXIF rational (two uint32s = numerator/denominator)
            const getRational = (off) => {
              const num = tiffView.getUint32(off, littleEndian);
              const den = tiffView.getUint32(off + 4, littleEndian);
              return den === 0 ? 0 : num / den;
            };

            // Scan for GPS IFD pointer in IFD0
            const ifd0Offset = tiffView.getUint32(4, littleEndian);
            const ifd0Count = tiffView.getUint16(ifd0Offset, littleEndian);
            let gpsIfdOffset = null;
            for (let i = 0; i < ifd0Count && i < 40; i++) {
              const entryOffset = ifd0Offset + 2 + i * 12;
              if (entryOffset + 12 > tiffView.byteLength) break;
              const tag = tiffView.getUint16(entryOffset, littleEndian);
              if (tag === 0x8825) { // GPSInfo IFD pointer
                gpsIfdOffset = tiffView.getUint32(entryOffset + 8, littleEndian);
                break;
              }
            }

            if (gpsIfdOffset !== null && gpsIfdOffset < tiffView.byteLength - 4) {
              const gpsCount = tiffView.getUint16(gpsIfdOffset, littleEndian);
              let latRef = "N", lonRef = "W", latVals = null, lonVals = null;
              for (let i = 0; i < gpsCount && i < 20; i++) {
                const entryOffset = gpsIfdOffset + 2 + i * 12;
                if (entryOffset + 12 > tiffView.byteLength) break;
                const tag = tiffView.getUint16(entryOffset, littleEndian);
                const valOffset = tiffView.getUint32(entryOffset + 8, littleEndian);
                if (tag === 1) { // GPSLatitudeRef
                  const ref = String.fromCharCode(tiffView.getUint8(entryOffset + 8));
                  if (ref === "S" || ref === "N") latRef = ref;
                }
                if (tag === 3) { // GPSLongitudeRef
                  const ref = String.fromCharCode(tiffView.getUint8(entryOffset + 8));
                  if (ref === "E" || ref === "W") lonRef = ref;
                }
                if (tag === 2 && valOffset + 24 <= tiffView.byteLength) { // GPSLatitude
                  latVals = [getRational(valOffset), getRational(valOffset + 8), getRational(valOffset + 16)];
                }
                if (tag === 4 && valOffset + 24 <= tiffView.byteLength) { // GPSLongitude
                  lonVals = [getRational(valOffset), getRational(valOffset + 8), getRational(valOffset + 16)];
                }
              }
              if (latVals && lonVals) {
                let lat = latVals[0] + latVals[1] / 60 + latVals[2] / 3600;
                let lon = lonVals[0] + lonVals[1] / 60 + lonVals[2] / 3600;
                if (latRef === "S") lat = -lat;
                if (lonRef === "W") lon = -lon;
                if (Math.abs(lat) <= 90 && Math.abs(lon) <= 180) {
                  result.gpsCoords = { lat, lon };
                }
              }
            }
          }
        } catch (e) {
          // GPS parsing failed — non-critical, gps flag is still set
        }
      }

      break;
    }
    if ((marker & 0xFF00) !== 0xFF00) break;
    const len = view.getUint16(offset + 2);
    offset += 2 + len;
  }

  if (!result.hasExif) {
    result.warnings.push("No EXIF metadata found — real camera/phone photos almost always contain EXIF data (camera model, timestamp, GPS). AI-generated images typically have no EXIF.");
  }

  return result;
}

// Haversine distance in km between two lat/lon points
function gpsDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Validate photo timestamp against milestone date window
function validateTimestamp(exifTimestamp, milestoneDate) {
  if (!exifTimestamp) return { status: "unable_to_verify", detail: "No timestamp in EXIF — cannot verify when photo was taken" };
  const photoDate = new Date(exifTimestamp);
  if (isNaN(photoDate.getTime())) return { status: "unable_to_verify", detail: `Invalid EXIF timestamp: ${exifTimestamp}` };

  const msDate = new Date(milestoneDate + "-01");
  // Allow a window: 2 months before milestone start through 3 months after
  const windowStart = new Date(msDate);
  windowStart.setMonth(windowStart.getMonth() - 2);
  const windowEnd = new Date(msDate);
  windowEnd.setMonth(windowEnd.getMonth() + 3);

  const fmt = d => d.toISOString().slice(0, 10);
  if (photoDate < windowStart) {
    return { status: "discrepancy", detail: `Photo taken ${fmt(photoDate)} — before milestone window (${fmt(windowStart)} to ${fmt(windowEnd)}). Photo may be reused from a different project.` };
  }
  if (photoDate > windowEnd) {
    return { status: "discrepancy", detail: `Photo taken ${fmt(photoDate)} — after milestone window (${fmt(windowStart)} to ${fmt(windowEnd)}).` };
  }
  return { status: "verified", detail: `Photo taken ${fmt(photoDate)} — within milestone window (${fmt(windowStart)} to ${fmt(windowEnd)})` };
}

// Validate GPS coordinates against expected project location
function validateGpsLocation(gpsCoords, expectedLocation) {
  if (!gpsCoords) return { status: "unable_to_verify", detail: "No GPS coordinates in EXIF — cannot verify photo location" };

  // Known project locations (Toronto-area)
  const locations = {
    "Toronto, ON": { lat: 43.6532, lon: -79.3832, radiusKm: 30, label: "Toronto" },
    "Georgina, ON": { lat: 44.3000, lon: -79.4300, radiusKm: 20, label: "Georgina" },
  };

  const expected = locations[expectedLocation];
  if (!expected) return { status: "unable_to_verify", detail: `Unknown project location: ${expectedLocation}` };

  const dist = gpsDistanceKm(gpsCoords.lat, gpsCoords.lon, expected.lat, expected.lon);
  const coordStr = `${gpsCoords.lat.toFixed(4)}°, ${gpsCoords.lon.toFixed(4)}°`;

  if (dist <= expected.radiusKm) {
    return { status: "verified", detail: `GPS coordinates (${coordStr}) are ${dist.toFixed(1)} km from ${expected.label} — within expected ${expected.radiusKm} km radius` };
  }
  return { status: "discrepancy", detail: `GPS coordinates (${coordStr}) are ${dist.toFixed(0)} km from ${expected.label} — outside expected ${expected.radiusKm} km radius. Photo may not be from the project site.` };
}

async function runPhotoVerification(imageFile, milestoneContext) {
  // Read image as both base64 and ArrayBuffer
  const [base64, arrayBuffer] = await Promise.all([
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    }),
    imageFile.arrayBuffer(),
  ]);

  const mediaType = imageFile.type || "image/jpeg";

  // Extract metadata for forensic analysis
  const metadata = extractImageMetadata(arrayBuffer, imageFile.name);

  // Build metadata context string for the prompt
  let metadataContext = "FILE METADATA ANALYSIS (non-visual forensic signals):\n";
  metadataContext += `- Filename: "${imageFile.name}"\n`;
  metadataContext += `- EXIF data present: ${metadata.hasExif ? "YES" : "NO"}\n`;
  if (metadata.camera) metadataContext += `- Camera detected in EXIF: ${metadata.camera}\n`;
  if (metadata.software) metadataContext += `- Editing software in EXIF: ${metadata.software}\n`;
  metadataContext += `- GPS coordinates in EXIF: ${metadata.gps ? "YES" : "NO"}\n`;
  if (metadata.warnings.length > 0) {
    metadataContext += `- WARNINGS:\n${metadata.warnings.map(w => `  ⚠ ${w}`).join("\n")}\n`;
  }

  const response = await fetchClaudeRaw({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: [
        { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
        { type: "text", text: `You are a compliance verification agent reviewing milestone evidence photos for a community investment platform. Be rigorous — investors' money depends on your assessment.

Project: "${milestoneContext.projectTitle}"
Creator: "${milestoneContext.creator}"
Milestone: "${milestoneContext.milestoneName}"
Expected evidence: "${milestoneContext.evidenceDescription}"
Project location: "${milestoneContext.location}" (expect urban setting consistent with this)
Project context: "${milestoneContext.projectDescription}"

${metadataContext}

Analyze this photo across four dimensions and respond in JSON only:
{
  "authenticity": { "status": "verified|unable_to_verify|discrepancy", "reasoning": "..." },
  "subject_match": { "status": "verified|unable_to_verify|discrepancy", "reasoning": "..." },
  "location_consistency": { "status": "verified|unable_to_verify|discrepancy", "reasoning": "..." },
  "scale_plausibility": { "status": "verified|unable_to_verify|discrepancy", "reasoning": "..." },
  "overall_verdict": "verified|unable_to_verify|discrepancy",
  "summary": "one-line overall assessment"
}

IMPORTANT — each dimension is INDEPENDENT. Judge each one ONLY on its own criteria:

1. authenticity: Determine ONLY if this is a real, unmanipulated photograph taken by a camera/phone, or if it is AI-generated, photoshopped, or otherwise manipulated. This dimension is SOLELY about whether the image is a genuine photo — NOT whether it matches the project or milestone. A real photo of the wrong subject is still authentic. Use BOTH visual analysis AND the file metadata above. Key signals:
   - If the filename matches a known AI generator pattern (DALL-E, Midjourney, Gemini, Stable Diffusion, etc.), this is strong evidence of AI generation — mark "discrepancy".
   - If NO EXIF metadata is present, this is a significant red flag — real photos from cameras and phones almost always have EXIF data (camera model, GPS, timestamps). AI-generated images almost never do. Missing EXIF alone should result in "unable_to_verify" at minimum.
   - If EXIF IS present with a recognized camera make, this strongly supports authenticity — mark "verified" unless there are clear visual AI artifacts.
   - Also check visually for AI artifacts: unnatural textures, warped text/numbers, impossible geometry, inconsistent lighting/shadows, extra fingers, uncanny smoothness.
   - A photo that looks visually plausible but has NO EXIF and/or an AI-generator filename should be flagged — do NOT mark as "verified".
   - Do NOT factor subject relevance into this score. That belongs in subject_match.
2. subject_match: Does this photo show what the milestone claims? For "Panel installation" expect solar panels being installed or installed on a roof.
3. location_consistency: Is the setting consistent with the project location? A school rooftop in Toronto should show an urban environment, flat commercial-style roof, not a desert, rural farmland, or residential suburb.
4. scale_plausibility: Does the visible scope seem plausible for the project budget and description?` },
      ],
    }],
  });

  const raw = response.content?.map(c => c.text || "").join("") || "";
  const cleaned = raw.replace(/```json|```/g, "").trim();
  // Extract JSON object
  const startIdx = cleaned.indexOf("{");
  const endIdx = cleaned.lastIndexOf("}");
  if (startIdx !== -1 && endIdx !== -1) {
    return JSON.parse(cleaned.slice(startIdx, endIdx + 1));
  }
  return JSON.parse(cleaned);
}

async function getAIMatches(profile, projects, signal) {
  const projectSummaries = projects.map(p => ({
    id: p.id, title: p.title, category: p.category, location: p.location,
    funding_goal: p.funding_goal, funded: p.funded, return_type: p.return_type,
    financial_return: p.financial_return, impact_return: p.impact_return,
    timeline: p.timeline, verified: p.verified, risk_score: p.risk_score,
    description: p.description,
  }));

  const system = `You are FundLocal's investment matching engine within Wealthsimple. Your role is to analyze an investor's values profile and score community projects against it.

## Tone & Personality
Be professional, transparent, and conservatively honest. Write like a knowledgeable financial advisor who prioritizes clarity over persuasion. Use plain language — avoid jargon, marketing speak, or enthusiasm. When uncertain, say so directly rather than hedging with qualifiers. Your credibility comes from honesty, not confidence. Address the investor directly as "you" and "your."

## Scoring Dimensions
Score each project 0-100 on four dimensions:
1. VALUES ALIGNMENT — How well does this project match the investor's stated priorities? Weight this dimension according to cause ranking (#1 = 2x weight of #2).
2. LOCATION PROXIMITY — How close is the project to the investor's community?
3. RETURN FIT — Does the project's return structure (financial, impact, blended) match the investor's slider position? The impact/financial split is a PORTFOLIO-LEVEL target, not a per-project filter. A pure-impact project and a financially-focused project can BOTH score highly if together they help achieve the desired overall balance.
4. CREDIBILITY — Based on verification status, milestone progress, risk score, and organizational track record. A project with unverified claims scores lower regardless of other dimensions.

## Output Format
Respond in EXACTLY this JSON (no markdown, no backticks):
[{"project_id":1,"overall_score":90,"dimension_scores":{"values_alignment":{"score":95,"justification":"..."},"location_proximity":{"score":85,"justification":"..."},"return_fit":{"score":88,"justification":"..."},"credibility":{"score":90,"justification":"..."}},"match_explanation":"...","limitations":["..."],"portfolio_note":"..."},...]

- match_explanation: 2-3 sentence plain-language paragraph explaining why this project fits or doesn't fit this specific investor.
- limitations: Array of what you could NOT verify or assess.
- portfolio_note: How this project complements or overlaps with other top matches to achieve the investor's impact/return balance.

## Example Output (Abbreviated)

Investor profile: #1 Environment, #2 Education. Toronto. Slider: 70% impact / 30% financial. Budget: $5,000.

{"project_id":1,"overall_score":87,"dimension_scores":{"values_alignment":{"score":95,"justification":"Directly addresses #1 priority (Environment) — community solar installation reduces neighbourhood carbon footprint."},"location_proximity":{"score":90,"justification":"Located in Riverdale, Toronto — within the investor's stated community."},"return_fit":{"score":78,"justification":"Offers 4.2% annual return plus measurable impact (homes powered). Blended structure fits the 70/30 preference, though slightly more financial-leaning than ideal."},"credibility":{"score":82,"justification":"Charity registration verified via CRA. Three of four milestones on track. Partnership with Toronto Hydro is claimed but unverified."}},"match_explanation":"This project is a strong match for your profile. It directly serves your top priority — environmental impact — in your own neighbourhood. The 4.2% return paired with measurable community impact aligns well with your 70/30 balance. The main gap is an unverified partnership claim with Toronto Hydro, which affects the credibility score.","limitations":["Toronto Hydro partnership is claimed but could not be verified against available records","Long-term energy output projections are based on manufacturer estimates, not independent assessment"],"portfolio_note":"Pairs well with an education-focused project to cover both of your stated priorities."}

## Critical Constraints
- NEVER recommend investing. Present information and reasoning; the decision is human.
- ALWAYS surface uncertainty. If you can't assess something, say so explicitly.
- NEVER overstate credibility. A project with unverified claims scores lower on Credibility regardless of other dimensions.
- Rank by overall match score but call out cases where a lower-ranked project might be preferred (e.g., better diversification, complementary to existing portfolio).
- Consider how projects COMPLEMENT each other to achieve the investor's impact/return balance.`;

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
    max_tokens: 3000,
    temperature: 0.3,
    system,
    messages: [{ role: "user", content: userMessage }],
  }, signal);
  const raw = JSON.parse(cleaned);
  // Normalize PRD output format to rendering format
  return raw.map(r => ({
    id: r.project_id,
    ai_match_score: r.overall_score,
    scores: {
      values: r.dimension_scores?.values_alignment?.score ?? r.scores?.values ?? 70,
      geographic: r.dimension_scores?.location_proximity?.score ?? r.scores?.geographic ?? 70,
      returns: r.dimension_scores?.return_fit?.score ?? r.scores?.returns ?? 70,
      credibility: r.dimension_scores?.credibility?.score ?? r.scores?.credibility ?? 70,
    },
    ai_reasoning: r.match_explanation || r.ai_reasoning || "",
    ai_limitations: Array.isArray(r.limitations) ? r.limitations.join(". ") : (r.ai_limitations || ""),
  }));
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

function Nav({ currentView, setCurrentView, setScreen, onComplianceDemo }) {
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
          <button onClick={onComplianceDemo}
            style={{ padding: "8px 20px", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, background: currentView === "compliance" ? COLORS.dune : "transparent", color: currentView === "compliance" ? "#fff" : COLORS.textSecondary, transition: "all 0.2s" }}>
            Compliance
          </button>
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
      <div style={{ marginTop: 40, padding: 20, borderRadius: 12, background: COLORS.warmWhite, border: `1px solid ${COLORS.border}` }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>About these matches</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.6 }}>Match scores are generated by AI based on your stated values, location, and return preferences. They are not financial advice and should not be the sole basis for investment decisions. All projects undergo human compliance review before listing. AI reasoning reflects the model's interpretation and may not capture all relevant factors.</p>
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
  const [riskAcknowledged, setRiskAcknowledged] = useState(false);
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

      <div style={{ padding: 20, borderRadius: 12, background: COLORS.warmWhite, borderLeft: `3px solid ${COLORS.border}`, marginBottom: 24 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>What we can't verify</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.6 }}>{project.ai_limitations}</p>
      </div>

      <div style={{ padding: 16, borderRadius: 10, background: COLORS.cream, marginBottom: 40 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: COLORS.textTertiary, marginBottom: 4 }}>About this evaluation</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5 }}>Match scores and reasoning are generated by AI and reviewed by our compliance team. They are informational and do not constitute financial advice. All listed projects have passed human compliance review. <span style={{ fontWeight: 600 }}>The investment decision is always yours.</span></p>
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
        <div style={{ padding: 16, borderRadius: 10, background: COLORS.warmWhite, marginBottom: 20 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 8 }}>Key terms</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.duneLight, lineHeight: 1.5 }}>Return: {project.return_type === "impact" ? "Impact only (no financial return)" : project.financial_return} · Timeline: {project.timeline}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.duneLight, lineHeight: 1.5 }}>Funds release in stages against verified milestones. Unmet milestones pause remaining disbursements.</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.red, lineHeight: 1.5 }}>Community investments carry risk including potential loss of principal. Past performance does not guarantee future results.</p>
          </div>
        </div>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 20 }}>
          <input type="checkbox" checked={riskAcknowledged} onChange={e => setRiskAcknowledged(e.target.checked)} style={{ marginTop: 2, accentColor: COLORS.dune, width: 18, height: 18, cursor: "pointer" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.duneLight, lineHeight: 1.5 }}>I understand that community investments carry risk, including potential loss of principal, and that AI-generated match scores are informational — not financial advice.</span>
        </label>
        <button onClick={handleApprove} disabled={confirming || !riskAcknowledged} style={{ width: "100%", padding: "16px", borderRadius: 100, border: "none", background: confirming ? COLORS.green : (riskAcknowledged ? COLORS.dune : COLORS.border), color: riskAcknowledged || confirming ? "#fff" : COLORS.textTertiary, fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: confirming || !riskAcknowledged ? "default" : "pointer", transition: "all 0.3s" }}>
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

      <div style={{ padding: 24, borderRadius: 16, background: COLORS.greenLight, marginBottom: 24 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.green, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Your impact so far</p>
        {investments.map((inv, i) => (
          <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.dune, lineHeight: 1.6, marginBottom: i < investments.length - 1 ? 8 : 0 }}>
            <span style={{ fontWeight: 600 }}>{inv.project.title}:</span> {inv.project.impact_return}
          </p>
        ))}
      </div>
      <div style={{ padding: 24, borderRadius: 16, background: COLORS.warmWhite, borderLeft: `3px solid ${COLORS.accent}`, marginBottom: 48 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>AI impact narrative</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.duneLight, lineHeight: 1.7 }}>
          {investments.length === 1
            ? `Your $${total.toLocaleString()} investment in ${investments[0].project.title} is funding real change in ${investments[0].project.location}. ${investments[0].project.impact_return}. As milestones are verified, you'll see updates here on exactly how your money is being put to work.`
            : `You've deployed $${total.toLocaleString()} across ${investments.length} community projects. Your portfolio spans ${[...new Set(investments.map(i => i.project.category))].length} cause area${[...new Set(investments.map(i => i.project.category))].length > 1 ? "s" : ""}, with ${investments.reduce((s, i) => s + i.project.milestones.filter(m => m.status === "complete").length, 0)} milestones already verified. As projects progress, this narrative will update with verified impact data.`
          }
        </p>
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

function CreatorView({ onSubmit }) {
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
          <button onClick={() => onSubmit && onSubmit({ title, category: cat, location: loc, goal, problem, beneficiaries, timeline, milestones, fundUse, team, impactPlan, evidence }, aiResult)} style={{ flex: 1, padding: "14px", borderRadius: 100, border: `1.5px solid ${COLORS.border}`, background: "#fff", color: COLORS.textSecondary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Submit anyway</button>
        </>) : (<>
          <button onClick={() => { setStep("form"); setFormStep(5); setAiResult(null); }} style={{ flex: 1, padding: "14px", borderRadius: 100, border: `1.5px solid ${COLORS.border}`, background: "#fff", color: COLORS.dune, fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Revise proposal</button>
          <button onClick={() => onSubmit && onSubmit({ title, category: cat, location: loc, goal, problem, beneficiaries, timeline, milestones, fundUse, team, impactPlan, evidence }, aiResult)} style={{ flex: 1, padding: "14px", borderRadius: 100, border: "none", background: COLORS.dune, color: "#fff", fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Submit for review →</button>
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
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Community Garden Expansion" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
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

function buildAgentTrace(verificationResults) {
  const traceMap = {
    "Organization exists": { fn: "search_charity_registry", args: (r) => `"${r.detail?.match(/^(.*?)—/)?.[1]?.trim() || 'Community Living Toronto'}", province: "ON"`, source: "https://open.canada.ca/data/en/dataset/05b3abd0-e70f-4b3b-a9c5-acc436bd15b6", sourceLabel: "CRA Charity Database (Open Data)" },
    "Partnership claim": { fn: "check_municipal_directory", args: (r) => `"City of Toronto Parks Department", partner: "Community Living Toronto"`, source: "https://www.toronto.ca/city-government/accountability-operations-customer-service/city-administration/city-managers-office/agencies-corporations/", sourceLabel: "City of Toronto Partner Directory" },
    "Budget reasonableness": { fn: "analyze_budget_benchmarks", args: (r) => { const amt = r.detail?.match(/\$[\d,]+/)?.[0] || "$35,000"; return `type: "community_garden", amount: "${amt}", region: "Toronto"`; }, source: "https://communitygarden.org/resources/", sourceLabel: "ACGA Benchmark Data" },
    "Creator credentials": { fn: "verify_creator_identity", args: (r) => `name: "${r.detail?.match(/^(.*?)found/)?.[1]?.trim() || 'creator'}", org: "submitted organization"`, source: "https://www.linkedin.com/search/results/people/", sourceLabel: "LinkedIn People Search" },
    "Wealthsimple Business account": { fn: "verify_wealthsimple_business", args: (r) => `org: "${r.detail?.match(/for (.*?)$/i)?.[1]?.trim() || 'organization'}"`, sourceLabel: "Wealthsimple Business API" },
  };
  return verificationResults.map(r => {
    const mapped = traceMap[r.check];
    const fn = mapped?.fn || `verify_${r.check.toLowerCase().replace(/\s+/g, "_")}`;
    const args = mapped?.args ? mapped.args(r) : `"${r.check}"`;
    return { fn, args, result: r.detail || r.action, status: r.status, source: mapped?.source || null, sourceLabel: mapped?.sourceLabel || null };
  });
}

const MILESTONE_AGENT_TRACE = [
  { fn: "analyze_images", args: 'count: 12, type: "installation_progress"', result: "Solar panels visible on flat commercial roof, consistent with Riverdale Collegiate location", status: "verified", sourceLabel: "Claude Vision API" },
  { fn: "compare_invoice", args: 'invoice: "$47,200", budget_allocation: "$62,500", phase: "Panel installation"', result: "75% of allocation — consistent with phased installation", status: "verified", sourceLabel: "Internal budget ledger" },
  { fn: "verify_municipal_permit", args: 'number: "2025-ET-4421", municipality: "City of Toronto"', result: "Active electrical permit found in municipal database", status: "verified", source: "https://www.toronto.ca/city-government/planning-development/building-permits-renovation/", sourceLabel: "Toronto Building Permits" },
];

function AgentTracePanel({ trace, elapsed, collapsed: initialCollapsed = true, streaming = false, totalExpected = 0 }) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const bottomRef = useRef(null);
  const statusColor = s => s === "verified" ? COLORS.green : s === "discrepancy" || s === "error" ? COLORS.red : "#B8860B";

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [trace.length]);

  // When streaming, "done" means all expected entries have results filled in
  const allHaveResults = trace.length > 0 && trace.every(t => t.result !== null);
  const done = streaming ? (totalExpected > 0 ? trace.length >= totalExpected && allHaveResults : allHaveResults) : true;
  const displayTrace = trace;

  return (
    <div style={{ borderRadius: 12, border: `1px solid ${COLORS.border}`, overflow: "hidden", marginBottom: 20 }}>
      <div onClick={() => setCollapsed(!collapsed)} style={{ padding: "12px 16px", background: COLORS.warmWhite, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: COLORS.dune }}>Agent Activity</span>
          {done ? (
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textSecondary }}>— {trace.length} actions completed{elapsed ? ` · ${elapsed}s` : ""} · claude-haiku-4-5</span>
          ) : (
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.accent, fontWeight: 600 }}>— running ({displayTrace.length}/{totalExpected || trace.length})... · claude-haiku-4-5</span>
          )}
        </div>
        <span style={{ fontSize: 12, color: COLORS.textSecondary, transition: "transform 0.2s", transform: collapsed ? "rotate(0deg)" : "rotate(180deg)" }}>&#9660;</span>
      </div>
      {!collapsed && (
        <div style={{ padding: "16px 20px", background: "#1a1a1a", fontFamily: "'DM Mono', 'Fira Code', monospace", fontSize: 13, lineHeight: 1.8, maxHeight: 320, overflowY: "auto" }}>
          {displayTrace.map((t, i) => {
            return (
              <div key={i} style={{ marginBottom: i < displayTrace.length - 1 ? 16 : 0, opacity: 1, animation: streaming ? "traceIn 0.3s ease" : "none" }}>
                <div>
                  <span style={{ color: "#888" }}>→ </span>
                  <span style={{ color: COLORS.accent }}>{t.fn}</span>
                  <span style={{ color: "#ccc" }}>({t.args})</span>
                </div>
                <div style={{ paddingLeft: 18 }}>
                  {t.result ? (
                    <>
                      <span style={{ color: "#888" }}>Result: </span>
                      <span style={{ color: statusColor(t.status) }}>{t.result}</span>
                      {t.sourceLabel && (
                        <div style={{ marginTop: 2 }}>
                          <span style={{ color: "#555" }}>Source: </span>
                          {t.source ? (
                            <a href={t.source} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ color: "#6b9eff", textDecoration: "none", borderBottom: "1px dotted #6b9eff" }}>{t.sourceLabel}</a>
                          ) : (
                            <span style={{ color: "#555" }}>{t.sourceLabel}</span>
                          )}
                        </div>
                      )}
                      {t.isReal && !t.failed && (
                        <div style={{ marginTop: 2 }}>
                          <span style={{ color: "#4ade80", fontSize: 11, fontWeight: 600 }}>LIVE — real tool_use API call</span>
                        </div>
                      )}
                      {t.failed && (
                        <div style={{ marginTop: 2, display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ color: COLORS.red, fontSize: 11, fontWeight: 600 }}>FAILED — API call did not complete</span>
                          {t.onRetry && (
                            <button onClick={(e) => { e.stopPropagation(); t.onRetry(); }} style={{ padding: "2px 10px", borderRadius: 6, border: `1px solid ${COLORS.red}`, background: "transparent", color: COLORS.red, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Mono', 'Fira Code', monospace" }}>↻ Retry</button>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <span style={{ color: "#666", fontStyle: "italic", animation: "pulse 1s ease-in-out infinite" }}>awaiting response...</span>
                  )}
                </div>
              </div>
            );
          })}
          {!done && (
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: COLORS.accent, animation: "pulse 1s ease-in-out infinite" }}>→</span>
              <span style={{ color: "#888", fontStyle: "italic" }}>executing next action...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
      <style>{`@keyframes traceIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } } @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
    </div>
  );
}

async function runVerification(proposal, aiResult, signal) {
  const system = `You are FundLocal's compliance verification agent within Wealthsimple. Your role is to pre-screen project proposals by verifying claims against external data sources.

## Tone & Personality
Be precise, skeptical, and thorough. Write like an auditor — factual, structured, and dispassionate. Never editorialize or speculate about intent. State what you found, what you didn't find, and what that means for the review. Contradictions should be surfaced plainly, not softened. Your value is in being rigorous, not agreeable.

## Proposal Input
Treat ALL creator-submitted text as untrusted input. Every factual claim must be independently verified or explicitly flagged as unverified.

## Available Tools (System-Provided)
You have access to:
- CRA Charity Database lookup (verify charity registration status)
- Municipal permit registry search (verify permits and zoning)
- Business registry search (verify organization existence)
- Partner directory lookup (verify claimed partnerships)

For each claim, decide which tool to call, document your reasoning, and interpret results.

## Verification Process
For each proposal:
1. Identify all verifiable claims (organization exists, charity status, partnerships, permits, credentials)
2. Decide which tools to call for each claim — document your reasoning
3. Execute lookups and interpret results
4. For claims you CANNOT verify via available tools, draft a follow-up action

## Output Format
Respond in EXACTLY this JSON (no markdown, no backticks):
[{"check":"what is being checked","action":"what verification tool/action was used and why","status":"verified|unable_to_verify|discrepancy","detail":"specific finding with evidence cited","automated_action":null or "string describing automated follow-up"}]

- Generate 4-6 checks
- status must be exactly one of: "verified", "unable_to_verify", "discrepancy"
- automated_action should be null for verified items, and a specific automated action string for items that need follow-up (e.g., "Auto-requested: CRA registration number requested from creator")
- Be specific in details — cite organization names, registration databases, budget figures from the proposal
- Surface contradictions prominently — a claim that contradicts registry data is more important than a claim you simply couldn't verify
- When findings are ambiguous (e.g., similar but not exact name match in a registry), flag the ambiguity rather than assuming a match or mismatch

## Example Output (Abbreviated)

Proposal: "Moss Park Community Garden" by Toronto Urban Growers, claiming registered charity status and partnership with City of Toronto Parks Department.

[{"check":"Charity registration","action":"CRA Charity Database lookup for 'Toronto Urban Growers' — verifiable legal claim with financial implications","status":"verified","detail":"CRA returned registration #12345-6789-RR0001, status: Active, registered 2018-03-15","automated_action":null},{"check":"Partnership with City of Toronto Parks Department","action":"Partner directory lookup for Toronto Urban Growers + City of Toronto Parks — creator claims formal partnership","status":"unable_to_verify","detail":"No matching entry found in Partner Directory. City of Toronto Parks Department is a valid municipal entity, but no record of a formal partnership with this organization exists in available databases.","automated_action":"Auto-requested: signed partnership agreement or letter of support from City of Toronto Parks Department"}]

## Critical Constraints
- NEVER approve or reject a proposal. Present findings for human decision.
- Document your reasoning for each tool call decision (audit trail).
- If a tool call fails, report the failure and what it means for the verification.`;

  const userMessage = `PROPOSAL:
Title: ${proposal.title || "Untitled"}
Category: ${proposal.category || "N/A"}
Location: ${proposal.location || "N/A"}
Goal: ${proposal.goal || "N/A"}
Problem: ${proposal.problem || "Not provided"}
Beneficiaries: ${proposal.beneficiaries || "Not specified"}
Fund use: ${proposal.fundUse || "Not provided"}
Timeline: ${proposal.timeline || "Not provided"}
Milestones: ${proposal.milestones || "Not provided"}
Team: ${proposal.team || "Not provided"}
Impact plan: ${proposal.impactPlan || "Not provided"}
Evidence: ${proposal.evidence || "None"}

AI PRE-SCREENING RESULT:
${aiResult ? JSON.stringify(aiResult, null, 2) : "No pre-screening available"}

Verify the claims in this proposal.`;

  const cleaned = await fetchClaude({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    temperature: 0.3,
    system,
    messages: [{ role: "user", content: userMessage }],
  }, signal);
  return JSON.parse(cleaned);
}

function ComplianceDashboard({ submittedProposal }) {
  const [activeTab, setActiveTab] = useState("proposals");
  const [expandedProposal, setExpandedProposal] = useState(null);
  const [expandedMilestone, setExpandedMilestone] = useState(null);
  const [verificationResults, setVerificationResults] = useState(null);
  const [verificationElapsed, setVerificationElapsed] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);
  const [liveTrace, setLiveTrace] = useState([]);
  const [registryProof, setRegistryProof] = useState(null);
  const [draftExpanded, setDraftExpanded] = useState({});
  const [toast, setToast] = useState(null);
  const [v, setV] = useState(false);
  const [milestonePhoto, setMilestonePhoto] = useState(null);
  const [milestonePhotoPreview, setMilestonePhotoPreview] = useState(null);
  const [milestonePhotoResult, setMilestonePhotoResult] = useState(null);
  const [milestonePhotoVerifying, setMilestonePhotoVerifying] = useState(false);
  const [milestonePhotoTrace, setMilestonePhotoTrace] = useState([]);
  const [milestonePhotoElapsed, setMilestonePhotoElapsed] = useState(null);
  const [milestoneSecondary, setMilestoneSecondary] = useState(null);
  useEffect(() => { setTimeout(() => setV(true), 100); }, []);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleMilestonePhoto = (file) => {
    setMilestonePhoto(file);
    setMilestonePhotoPreview(URL.createObjectURL(file));
    setMilestonePhotoResult(null);
    setMilestonePhotoTrace([]);
    setMilestonePhotoElapsed(null);
    setMilestoneSecondary(null);
  };

  const handlePhotoVerification = async () => {
    if (!milestonePhoto) return;
    setMilestonePhotoVerifying(true);
    setMilestonePhotoResult(null);
    const fileSizeKB = (milestonePhoto.size / 1024).toFixed(0);

    // Run metadata extraction immediately for the first trace entry
    const buf = await milestonePhoto.arrayBuffer();
    const meta = extractImageMetadata(buf, milestonePhoto.name);
    const metaStatus = meta.warnings.length > 0 ? "discrepancy" : meta.hasExif ? "verified" : "unable_to_verify";
    const metaSummary = meta.warnings.length > 0
      ? meta.warnings.join("; ")
      : meta.hasExif
        ? `EXIF present${meta.camera ? ` — camera: ${meta.camera}` : ""}${meta.gps ? ", GPS coordinates found" : ""}${meta.software ? `, edited with ${meta.software}` : ""}`
        : "No EXIF metadata found — cannot confirm camera source";

    // Run secondary verifications from metadata
    const gpsResult = validateGpsLocation(meta.gpsCoords, "Toronto, ON");
    const timestampResult = validateTimestamp(meta.timestamp, "2025-12"); // Panel installation milestone date

    const gpsArgs = meta.gpsCoords
      ? `lat: ${meta.gpsCoords.lat.toFixed(4)}, lon: ${meta.gpsCoords.lon.toFixed(4)}, expected: "Toronto, ON"`
      : 'coords: null, expected: "Toronto, ON"';
    const tsArgs = meta.timestamp
      ? `timestamp: "${meta.timestamp}", milestone: "2025-12"`
      : 'timestamp: null, milestone: "2025-12"';

    setMilestonePhotoTrace([
      { fn: "extract_file_metadata", args: `file: "${milestonePhoto.name}", size: "${fileSizeKB} KB"`, result: metaSummary, status: metaStatus, sourceLabel: "File metadata parser", isReal: true },
      { fn: "verify_gps_location", args: gpsArgs, result: gpsResult.detail, status: gpsResult.status, sourceLabel: "EXIF GPS + Haversine", isReal: true },
      { fn: "validate_photo_timestamp", args: tsArgs, result: timestampResult.detail, status: timestampResult.status, sourceLabel: "EXIF DateTimeOriginal", isReal: true },
      { fn: "analyze_image_authenticity", args: `file: "${milestonePhoto.name}", exif: ${meta.hasExif}`, result: null, status: null, sourceLabel: "Claude Vision API" },
      { fn: "verify_subject_match", args: 'milestone: "Panel installation", expected: "solar panels on roof"', result: null, status: null, sourceLabel: "Claude Vision API" },
      { fn: "check_location_consistency", args: 'expected: "school rooftop, urban Toronto"', result: null, status: null, sourceLabel: "Claude Vision API" },
      { fn: "assess_scale_plausibility", args: 'budget: "$62,500", phase: "Panel installation"', result: null, status: null, sourceLabel: "Claude Vision API" },
      { fn: "verify_electrical_permit", args: 'permit: "2025-ET-4421", municipality: "City of Toronto"', result: null, status: null, sourceLabel: "Toronto Building Permits" },
    ]);
    const t0 = performance.now();

    // Store secondary results for display
    setMilestoneSecondary({ gps: gpsResult, timestamp: timestampResult, permit: null });

    try {
      const solarProject = COMMUNITY_PROJECTS[0];
      const result = await runPhotoVerification(milestonePhoto, {
        projectTitle: solarProject.title,
        creator: solarProject.creator,
        milestoneName: "Panel installation",
        evidenceDescription: "Solar panels installed on school rooftop",
        location: solarProject.location,
        projectDescription: solarProject.description,
      });

      // Stream vision trace entries sequentially (indices 3-6)
      const dimensions = [
        { key: "authenticity", idx: 3 },
        { key: "subject_match", idx: 4 },
        { key: "location_consistency", idx: 5 },
        { key: "scale_plausibility", idx: 6 },
      ];

      for (let i = 0; i < dimensions.length; i++) {
        await new Promise(r => setTimeout(r, i === 0 ? 0 : 500));
        const dim = dimensions[i];
        const dimResult = result[dim.key];
        setMilestonePhotoTrace(prev => {
          const updated = [...prev];
          updated[dim.idx] = {
            ...updated[dim.idx],
            result: dimResult?.reasoning || "No data",
            status: dimResult?.status || "unable_to_verify",
            isReal: true,
          };
          return updated;
        });
      }

      // After vision completes, add permit lookup trace (hardcoded for demo — would be a real API call in production)
      await new Promise(r => setTimeout(r, 500));
      const permitResult = { status: "verified", detail: "Active electrical permit #2025-ET-4421 found in City of Toronto database — issued to Riverdale Community Energy Co-op" };
      setMilestonePhotoTrace(prev => {
        const updated = [...prev];
        updated[7] = {
          ...updated[7],
          result: permitResult.detail,
          status: permitResult.status,
          isReal: false,
          source: "https://www.toronto.ca/city-government/planning-development/building-permits-renovation/",
        };
        return updated;
      });
      setMilestoneSecondary(prev => ({ ...prev, permit: permitResult }));

      const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
      setMilestonePhotoResult(result);
      setMilestonePhotoElapsed(elapsed);
    } catch (e) {
      console.error("Photo verification failed:", e);
      setMilestonePhotoTrace(prev => prev.map(t => ({
        ...t,
        result: t.result || `Error: ${e.message}`,
        status: t.status || "error",
      })));
    }
    setMilestonePhotoVerifying(false);
  };

  const verifySteps = ["Searching public records...", "Cross-referencing CRA database...", "Checking municipal partner directories...", "Analyzing budget benchmarks..."];

  // Hardcoded trace entries for checks 2-6 (streamed after the real registry lookup)
  const hardcodedTraceEntries = [
    { fn: "check_municipal_directory", args: '"City of Toronto Parks Department", partner: "Community Living Toronto"', result: "No partnership record in directory", status: "discrepancy", source: "https://www.toronto.ca/city-government/accountability-operations-customer-service/city-administration/city-managers-office/agencies-corporations/", sourceLabel: "City of Toronto Partner Directory" },
    { fn: "analyze_budget_benchmarks", args: 'type: "community_garden", amount: "$35,000", region: "Toronto"', result: "Within expected range ($25K–$50K for comparable scope)", status: "verified", source: "https://communitygarden.org/resources/", sourceLabel: "ACGA Benchmark Data" },
    { fn: "verify_creator_identity", args: 'name: "Sarah Chen", org: "Community Living Toronto"', result: "Employee found — 8-year tenure unconfirmed", status: "unable_to_verify", source: "https://www.linkedin.com/search/results/people/", sourceLabel: "LinkedIn People Search" },
    { fn: "verify_wealthsimple_business", args: 'org: "Community Living Toronto"', result: "No Wealthsimple Business account found", status: "unable_to_verify", source: null, sourceLabel: "Wealthsimple Business API" },
  ];

  const totalExpectedTraces = 1 + hardcodedTraceEntries.length; // 1 real + 5 hardcoded

  const handleRunVerification = async () => {
    if (!submittedProposal) return;
    setVerifying(true);
    setVerifyStep(0);
    setLiveTrace([]);
    setRegistryProof(null);
    const t0 = performance.now();

    const stepInterval = setInterval(() => {
      setVerifyStep(p => {
        if (p >= verifySteps.length - 1) { clearInterval(stepInterval); return p; }
        return p + 1;
      });
    }, 900);

    // Extract org name from team field: "Person Name, Org Name (details)" → "Org Name"
    const orgName = submittedProposal.proposal.team?.match(/,\s*([^(]+)/)?.[1]?.replace(/\.\s*Partnership.*$/i, "").trim()
      || submittedProposal.proposal.title || "organization";

    // Step 1: Show the registry call (real tool-use)
    setLiveTrace([{
      fn: "search_charity_registry",
      args: `"${orgName}", province: "ON"`,
      result: null, status: null,
      source: "https://open.canada.ca/data/en/dataset/05b3abd0-e70f-4b3b-a9c5-acc436bd15b6",
      sourceLabel: "CRA Charity Database (Open Data)",
    }]);

    // Step 2: Run the real tool-use call
    let registryResult = null;
    try {
      registryResult = await runRegistryVerification(orgName, null,
        (toolCall) => {
          // Claude made the tool call — store the raw tool_use block as proof
          setRegistryProof(prev => ({ ...prev, toolCall }));
        },
        (registryData) => {
          // We fetched real data from the registry
          setRegistryProof(prev => ({ ...prev, registryData }));
        },
        (interpretation) => {
          // Claude interpreted the results
          setRegistryProof(prev => ({ ...prev, interpretation }));
        },
      );
    } catch (e) {
      console.warn("Registry lookup failed:", e);
      registryResult = { interpretation: null, toolCall: null, failed: true, error: e.message };
      setRegistryProof(prev => ({ ...prev, error: e.message }));
    }

    // Step 3: Fill in the first trace entry with the real result
    const registryFailed = registryResult?.failed || !registryResult?.interpretation;
    const realResult = registryFailed
      ? `Registry lookup failed: ${registryResult?.error || "No response from API"}`
      : registryResult.interpretation;
    const realStatus = registryFailed
      ? "error"
      : (realResult.toLowerCase().includes("not found") || realResult.toLowerCase().includes("no matching") || realResult.toLowerCase().includes("unable"))
        ? "unable_to_verify"
        : "verified";
    setLiveTrace(prev => {
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        result: realResult.length > 120 ? realResult.slice(0, 117) + "..." : realResult,
        status: realStatus,
        isReal: true,
        failed: registryFailed,
      };
      return updated;
    });

    // Store the full proof with raw API data
    if (registryResult?.rawResponse) {
      setRegistryProof(prev => ({ ...prev, rawResponse: registryResult.rawResponse }));
    }

    // Step 4: Stream remaining hardcoded entries
    let hIdx = 0;
    let hShowingResult = false;
    const hardcodedInterval = setInterval(() => {
      if (hIdx >= hardcodedTraceEntries.length) {
        clearInterval(hardcodedInterval);
        return;
      }
      if (!hShowingResult) {
        const entry = hardcodedTraceEntries[hIdx];
        setLiveTrace(prev => [...prev, { fn: entry.fn, args: entry.args, result: null, status: null, source: entry.source, sourceLabel: entry.sourceLabel }]);
        hShowingResult = true;
      } else {
        const entry = hardcodedTraceEntries[hIdx];
        setLiveTrace(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...entry };
          return updated;
        });
        hShowingResult = false;
        hIdx++;
      }
    }, 450);

    // Step 5: After all traces done, show final results
    const hardcodedTime = hardcodedTraceEntries.length * 2 * 450 + 800;
    setTimeout(() => {
      clearInterval(hardcodedInterval);
      clearInterval(stepInterval);
      const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
      const firstCheckDetail = realResult.length > 120 ? realResult.slice(0, 117) + "..." : realResult;
      const finalFirstStatus = realStatus === "error" ? "unable_to_verify" : realStatus;
      setVerificationResults([
        { check: "Organization exists", action: "Search CRA Charity Database (live tool-use)", status: finalFirstStatus, detail: registryFailed ? "Registry lookup failed — manual verification required" : firstCheckDetail, automated_action: registryFailed ? "Auto-flagged: Registry lookup failed — retry or verify manually" : null },
        { check: "Partnership claim", action: "Check Parks Dept partner directory", status: "discrepancy", detail: "No record in City of Toronto Parks Department partner directory", automated_action: "Auto-flagged: Creator notified — provide documentation or remove claim" },
        { check: "Budget reasonableness", action: "Compare against similar project benchmarks", status: "verified", detail: "$35,000 within expected range for community garden scope", automated_action: null },
        { check: "Creator credentials", action: "Search organizational directories", status: "unable_to_verify", detail: "Sarah Chen found at Community Living Toronto — 8-year tenure unconfirmed", automated_action: "Auto-requested: LinkedIn or organizational reference requested" },
        { check: "Wealthsimple Business account", action: "Check Wealthsimple Business directory", status: "unable_to_verify", detail: "No WS Business account found for Community Living Toronto", automated_action: "Auto-sent: Invitation to link WS Business account" },
      ]);
      setVerificationElapsed(elapsed);
      setVerifying(false);
    }, hardcodedTime);
  };

  const retryRegistryLookup = async () => {
    const orgName = submittedProposal?.proposal?.team?.match(/,\s*([^(]+)/)?.[1]?.replace(/\.\s*Partnership.*$/i, "").trim()
      || submittedProposal?.proposal?.title || "organization";

    // Reset first trace entry to "awaiting"
    setLiveTrace(prev => {
      const updated = [...prev];
      updated[0] = { ...updated[0], result: null, status: null, failed: false, isReal: true };
      return updated;
    });
    setRegistryProof(null);

    // Also reset first verification result if it exists
    if (verificationResults) {
      setVerificationResults(prev => {
        const updated = [...prev];
        updated[0] = { ...updated[0], status: "verifying", detail: "Retrying registry lookup..." };
        return updated;
      });
    }

    let registryResult = null;
    try {
      registryResult = await runRegistryVerification(orgName, null,
        (toolCall) => setRegistryProof(prev => ({ ...prev, toolCall })),
        (registryData) => setRegistryProof(prev => ({ ...prev, registryData })),
        (interpretation) => setRegistryProof(prev => ({ ...prev, interpretation })),
      );
    } catch (e) {
      console.warn("Registry retry failed:", e);
      registryResult = { interpretation: null, toolCall: null, failed: true, error: e.message };
      setRegistryProof(prev => ({ ...prev, error: e.message }));
    }

    const registryFailed = registryResult?.failed || !registryResult?.interpretation;
    const realResult = registryFailed
      ? `Registry lookup failed: ${registryResult?.error || "No response from API"}`
      : registryResult.interpretation;
    const realStatus = registryFailed
      ? "error"
      : (realResult.toLowerCase().includes("not found") || realResult.toLowerCase().includes("no matching") || realResult.toLowerCase().includes("unable"))
        ? "unable_to_verify"
        : "verified";

    setLiveTrace(prev => {
      const updated = [...prev];
      updated[0] = { ...updated[0], result: realResult.length > 120 ? realResult.slice(0, 117) + "..." : realResult, status: realStatus, isReal: true, failed: registryFailed };
      return updated;
    });

    // Update verification results row too
    if (verificationResults) {
      const firstCheckDetail = realResult.length > 120 ? realResult.slice(0, 117) + "..." : realResult;
      const finalFirstStatus = realStatus === "error" ? "unable_to_verify" : realStatus;
      setVerificationResults(prev => {
        const updated = [...prev];
        updated[0] = { ...updated[0], status: finalFirstStatus, detail: registryFailed ? "Registry lookup failed — manual verification required" : firstCheckDetail, automated_action: registryFailed ? "Auto-flagged: Registry lookup failed — retry or verify manually" : null };
        return updated;
      });
    }
  };

  const prePopulated = [
    { id: "solar", title: "Riverdale Community Solar Garden", creator: "Riverdale Community Energy Co-op", category: "environment", risk: "Low", riskColor: COLORS.green, unverified: 0, timeAgo: "3d ago", status: "Verification complete", wsVerified: true, wsSubtext: "Identity verified via WS Business · KYC complete since 2021" },
    { id: "kensington", title: "Kensington Market Micro-Loans", creator: "Kensington Market BIA", category: "small_business", risk: "Medium", riskColor: "#B8860B", unverified: 1, timeAgo: "1d ago", status: "Awaiting review", wsVerified: true },
  ];

  const catLabel = id => CATEGORIES.find(c => c.id === id)?.label || id;
  const catIcon = id => CATEGORIES.find(c => c.id === id)?.icon || "";

  const statusIcon = s => s === "verified" ? "✓" : s === "discrepancy" ? "✗" : s === "verifying" ? "⟳" : "⚠";
  const statusColor = s => s === "verified" ? COLORS.green : s === "discrepancy" ? COLORS.red : s === "verifying" ? COLORS.accent : "#B8860B";
  const statusBg = s => s === "verified" ? COLORS.greenLight : s === "discrepancy" ? COLORS.redLight : s === "verifying" ? "#FFF7ED" : COLORS.yellowLight;
  const statusLabel = s => s === "verified" ? "Verified" : s === "discrepancy" ? "Discrepancy" : s === "verifying" ? "Retrying..." : "Unable to verify";

  const verifiedCount = verificationResults ? verificationResults.filter(r => r.status === "verified").length : 0;
  const autoActions = verificationResults ? verificationResults.filter(r => r.automated_action).length : 0;

  const followUps = verificationResults ? [
    ...verificationResults.filter(r => r.automated_action && !r.automated_action.includes("flagged")).map(r => ({ item: r.check, tier: "automated", action: r.automated_action })),
    ...verificationResults.filter(r => r.status === "discrepancy").map(r => ({ item: r.check, tier: "ai_drafted", action: r.automated_action || "Draft outreach ready for review", draft: r.check.toLowerCase().includes("partner") ? `Dear City of Toronto Parks Department,\n\nWe are verifying a partnership claim from Community Living Toronto regarding the Parkdale Community Garden Expansion project. They have listed your department as a partner in their funding proposal.\n\nCould you confirm whether this partnership exists and, if so, provide a brief description of the arrangement?\n\nThank you for your time.\n\nBest regards,\nSarah M.\nFundLocal Compliance Team` : `Dear project creator,\n\nAs part of our compliance review, we need additional documentation for the following claim: ${r.detail}\n\nPlease provide one of the following:\n- Official documentation or agreement\n- Contact reference who can confirm\n- Updated project description removing this claim\n\nThank you,\nFundLocal Compliance Team` })),
    ...verificationResults.filter(r => r.status === "unable_to_verify" && !verificationResults.some(f => f.tier === "automated" && f.item === r.check)).filter(r => !r.automated_action?.includes("Auto-requested")).map(r => ({ item: r.check, tier: "ai_drafted", action: `Draft request to creator for documentation`, draft: `Dear project creator,\n\nWe were unable to verify: ${r.detail}\n\nPlease provide supporting documentation such as:\n- Registration numbers or certificates\n- Links to official profiles or directories\n- Letters of reference\n\nThank you,\nFundLocal Compliance Team` })),
  ] : [];

  const autoCount = followUps.filter(f => f.tier === "automated").length;
  const draftCount = followUps.filter(f => f.tier === "ai_drafted").length;

  // Milestone verification data
  const milestoneProjects = [
    {
      id: "solar",
      title: "Riverdale Community Solar Garden",
      creator: "Riverdale Community Energy Co-op",
      funded: 87500, goal: 125000,
      currentMilestone: "Panel installation",
      evidence: "12 installation photos, supplier invoice ($47,200), electrical permit #2025-ET-4421",
      milestones: [
        { name: "Site preparation & permits", amount: "$30,000", status: "released" },
        { name: "Panel installation", amount: "$62,500", status: "pending" },
        { name: "Grid connection", amount: "$32,500", status: "upcoming" },
      ],
      evidenceAnalysis: [
        { evidence: "Installation photos (12)", analysis: "Image analysis: panels visible, matches site", status: "verified", detail: "Flat commercial roof, matches Riverdale Collegiate location" },
        { evidence: "Supplier invoice ($47,200)", analysis: "Budget comparison: $62,500 allocated", status: "verified", detail: "75% of phase allocation. Consistent with phased install." },
        { evidence: "Electrical permit #2025-ET-4421", analysis: "Municipal permit database lookup", status: "verified", detail: "Active permit found in City of Toronto database" },
      ],
    },
    {
      id: "stem",
      title: "Moss Park Elementary STEM Lab",
      creator: "Moss Park Elementary Parent Council",
      funded: 31200, goal: 45000,
      currentMilestone: "Lab renovation",
      evidence: "Contractor invoice ($18,500), 8 before/after photos, building permit",
      milestones: [
        { name: "Equipment procurement", amount: "$15,000", status: "released" },
        { name: "Lab renovation", amount: "$18,500", status: "pending" },
        { name: "First class in new lab", amount: "$11,500", status: "upcoming" },
      ],
      evidenceAnalysis: [
        { evidence: "Contractor invoice ($18,500)", analysis: "Budget comparison: $18,500 allocated", status: "verified", detail: "Matches phase allocation exactly." },
        { evidence: "Before/after photos (8)", analysis: "Image analysis: renovation progress visible", status: "verified", detail: "Classroom transformation consistent with STEM lab conversion" },
        { evidence: "Building permit", analysis: "Municipal permit database lookup", status: "verified", detail: "Active renovation permit for Moss Park Elementary" },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 40px 100px", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(12px)", transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", padding: "12px 24px", borderRadius: 10, background: COLORS.dune, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, boxShadow: "0 4px 16px rgba(0,0,0,0.15)", zIndex: 1000, animation: "fadeIn 0.2s ease" }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, background: COLORS.dune, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>Internal</span>
            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 28, fontWeight: 400, color: COLORS.dune }}>Compliance Review</h2>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textSecondary }}>Reviewer: Sarah M. — Compliance Team</p>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 4, marginBottom: 32, background: COLORS.cream, padding: 4, borderRadius: 10 }}>
        {[{ key: "proposals", label: "Proposal Review" }, { key: "milestones", label: "Milestone Verification" }].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ flex: 1, padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: activeTab === tab.key ? "#fff" : "transparent", color: activeTab === tab.key ? COLORS.dune : COLORS.textSecondary, boxShadow: activeTab === tab.key ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }}>{tab.label}</button>
        ))}
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
        {[
          { label: "Proposals in queue", value: submittedProposal ? "3" : "2" },
          { label: "Milestones pending", value: "2" },
          { label: "AI pre-screened", value: "100%" },
          { label: "Avg review", value: "~12 min", sub: "previously ~4 hrs" },
        ].map((stat, i) => (
          <div key={i} style={{ padding: 16, borderRadius: 12, background: COLORS.warmWhite, textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{stat.label}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: COLORS.dune }}>{stat.value}</p>
            {stat.sub && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.textTertiary, marginTop: 2 }}>{stat.sub}</p>}
          </div>
        ))}
      </div>

      {/* TAB 1: Proposal Review */}
      {activeTab === "proposals" && (
        <div>
          {/* Queue list — hidden when a proposal is focused */}
          {!expandedProposal && (
            <>
              {submittedProposal && (
                <div onClick={() => setExpandedProposal("new")} style={{ padding: 20, borderRadius: 12, border: `2px solid ${COLORS.accent}`, background: "#fff", marginBottom: 12, cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                      <span style={{ padding: "3px 8px", borderRadius: 100, fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, background: COLORS.accent, color: "#fff" }}>New</span>
                      <div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: COLORS.dune }}>{submittedProposal.proposal.title || "Untitled Proposal"}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textSecondary }}>{submittedProposal.proposal.team || "Unknown creator"}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {submittedProposal.proposal.category && <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, background: COLORS.cream, color: COLORS.textSecondary }}>{catIcon(submittedProposal.proposal.category)} {catLabel(submittedProposal.proposal.category)}</span>}
                      <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: COLORS.yellowLight, color: "#B8860B" }}>Pending review</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textTertiary }}>Just now</span>
                    </div>
                  </div>
                </div>
              )}

              {prePopulated.map(item => (
                <div key={item.id} onClick={() => setExpandedProposal(item.id)} style={{ padding: 20, borderRadius: 12, border: `1px solid ${COLORS.border}`, background: "#fff", marginBottom: 12, cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                      <div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: COLORS.dune }}>{item.title}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textSecondary }}>{item.creator}</p>
                        {item.wsSubtext && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.green, marginTop: 2 }}>{item.wsSubtext}</p>}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, background: COLORS.cream, color: COLORS.textSecondary }}>{catIcon(item.category)} {catLabel(item.category)}</span>
                      {item.wsVerified && <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: COLORS.greenLight, color: COLORS.green }}>WS Verified</span>}
                      <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: item.risk === "Low" ? COLORS.greenLight : COLORS.yellowLight, color: item.riskColor }}>{item.risk} risk</span>
                      <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, background: item.status === "Verification complete" ? COLORS.greenLight : COLORS.yellowLight, color: item.status === "Verification complete" ? COLORS.green : "#B8860B" }}>{item.status}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textTertiary }}>{item.timeAgo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Focused detail view for submitted proposal */}
          {expandedProposal === "new" && submittedProposal && (
            <div>
              {/* Back button */}
              <button onClick={() => setExpandedProposal(null)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 0", border: "none", background: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 16 }}>
                ← Back to queue
              </button>

              {/* Proposal header */}
              <div style={{ padding: 20, borderRadius: 12, border: `2px solid ${COLORS.accent}`, background: "#fff", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <span style={{ padding: "3px 8px", borderRadius: 100, fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, background: COLORS.accent, color: "#fff" }}>New</span>
                      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: COLORS.dune }}>{submittedProposal.proposal.title || "Untitled Proposal"}</h3>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary }}>{submittedProposal.proposal.team || "Unknown creator"} · {submittedProposal.proposal.location || "N/A"} · Goal: {submittedProposal.proposal.goal || "N/A"}</p>
                  </div>
                  <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: COLORS.yellowLight, color: "#B8860B" }}>Pending review</span>
                </div>
              </div>

              <div style={{ padding: 28, borderRadius: 14, border: `1px solid ${COLORS.border}`, background: "#fff", marginBottom: 24 }}>
                {/* AI Pre-Screening Report */}
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: COLORS.dune, marginBottom: 16 }}>AI Pre-Screening Report</h3>

                {submittedProposal.aiResult && (
                  <>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.duneLight, lineHeight: 1.7, marginBottom: 20 }}>{submittedProposal.aiResult.overall_assessment}</p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
                      {Object.entries(submittedProposal.aiResult.scores).map(([k, val]) => {
                        const rc = r => r === "High" ? COLORS.green : r === "Medium" ? "#B8860B" : COLORS.red;
                        const rb = r => r === "High" ? COLORS.greenLight : r === "Medium" ? COLORS.yellowLight : COLORS.redLight;
                        return (
                          <div key={k} style={{ padding: 12, borderRadius: 10, background: rb(val.rating), textAlign: "center" }}>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{k}</p>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: rc(val.rating) }}>{val.rating}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Risk flags & unverified claims — combined */}
                    {submittedProposal.aiResult.risk_flags?.length > 0 && (
                      <div style={{ padding: 16, borderRadius: 10, background: COLORS.redLight, marginBottom: 20 }}>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.red, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Flags & unverified claims</p>
                        {submittedProposal.aiResult.risk_flags.map((f, i) => {
                          const isUnverified = f.startsWith("UNVERIFIED:");
                          return (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
                              <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 9, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, background: isUnverified ? COLORS.blueLight : COLORS.redLight, color: isUnverified ? COLORS.blue : COLORS.red, flexShrink: 0, marginTop: 3 }}>{isUnverified ? "UNVERIFIED" : "RISK"}</span>
                              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.dune, lineHeight: 1.5 }}>{f.replace("UNVERIFIED: ", "").replace("UNVERIFIED:", "")}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}

                {/* Live AI Verification */}
                <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 20, marginTop: 8 }}>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: COLORS.dune, marginBottom: 12 }}>AI Verification</h3>

                  {!verificationResults && !verifying && (
                    <button onClick={handleRunVerification} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 100, border: "none", background: COLORS.accent, color: "#fff", fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                      <span style={{ fontSize: 14 }}>&#9881;</span> Run AI Verification
                    </button>
                  )}

                  {verifying && (
                    <div>
                      <div style={{ padding: 24, borderRadius: 12, background: COLORS.warmWhite, textAlign: "center", marginBottom: 16 }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", border: `3px solid ${COLORS.border}`, borderTopColor: COLORS.accent, animation: "spin 0.8s linear infinite", margin: "0 auto 20px" }} />
                        {verifySteps.map((s, i) => (
                          <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: i <= verifyStep ? COLORS.dune : COLORS.textTertiary, opacity: i <= verifyStep ? 1 : 0.4, transition: "all 0.4s", marginBottom: 6, fontWeight: i === verifyStep ? 600 : 400 }}>
                            {i < verifyStep ? "✓ " : i === verifyStep ? "→ " : ""}{s}
                          </p>
                        ))}
                      </div>
                      {liveTrace.length > 0 && (
                        <AgentTracePanel trace={liveTrace.map((t, i) => i === 0 && t.failed ? { ...t, onRetry: retryRegistryLookup } : t)} collapsed={false} streaming={true} totalExpected={totalExpectedTraces} />
                      )}
                    </div>
                  )}

                  {verificationResults && (
                    <div>
                      {/* AI Recommendation — top of results */}
                      {(() => {
                        const hasDiscrepancy = verificationResults.some(r => r.status === "discrepancy");
                        return (
                          <div style={{ padding: 16, borderRadius: 10, background: hasDiscrepancy ? COLORS.yellowLight : COLORS.greenLight, border: `1px solid ${hasDiscrepancy ? COLORS.yellow : COLORS.green}`, marginBottom: 16 }}>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: hasDiscrepancy ? "#B8860B" : COLORS.green, marginBottom: 4 }}>
                              {hasDiscrepancy ? "AI recommends: Request additional documentation before approval" : "AI recommends: Approve for listing"}
                            </p>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textSecondary }}>AI recommendation. Reviewer judgment is final.</p>
                          </div>
                        );
                      })()}

                      {/* Status summary — above detail rows */}
                      {(() => {
                        const vc = verificationResults.filter(r => r.status === "verified").length;
                        const uc = verificationResults.filter(r => r.status === "unable_to_verify").length;
                        const dc = verificationResults.filter(r => r.status === "discrepancy").length;
                        return (
                          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 16px", borderRadius: 10, background: COLORS.warmWhite, marginBottom: 12 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.green, display: "inline-block" }} />
                              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.green }}>{vc} verified</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#B8860B", display: "inline-block" }} />
                              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#B8860B" }}>{uc} unverified</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.red, display: "inline-block" }} />
                              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.red }}>{dc} discrepancy</span>
                            </div>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textTertiary, marginLeft: "auto" }}>{verificationElapsed}s</span>
                          </div>
                        );
                      })()}

                      {/* Verification results table */}
                      <div style={{ borderRadius: 12, border: `1px solid ${COLORS.border}`, overflow: "hidden", marginBottom: 20 }}>
                        {verificationResults.map((r, i) => (
                          <div key={i} style={{ padding: "14px 16px", borderBottom: i < verificationResults.length - 1 ? `1px solid ${COLORS.border}` : "none", display: "flex", alignItems: "flex-start", gap: 12, borderLeft: `3px solid ${statusColor(r.status)}` }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: statusBg(r.status), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                              <span style={{ fontSize: 14, fontWeight: 700, color: statusColor(r.status) }}>{statusIcon(r.status)}</span>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.dune }}>{r.check}</p>
                                <span style={{ padding: "2px 8px", borderRadius: 100, fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: statusBg(r.status), color: statusColor(r.status) }}>{statusLabel(r.status)}</span>
                              </div>
                              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5 }}>{r.detail}</p>
                              {r.automated_action && (
                                <div style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 100, background: COLORS.blueLight, border: `1px solid ${COLORS.blue}` }}>
                                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.blue }}>Automated</span>
                                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.blue }}>{r.automated_action}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Agent Activity Trace — always visible after verification */}
                      <AgentTracePanel trace={buildAgentTrace(verificationResults).map((t, i) => i === 0 ? { ...t, isReal: true, failed: verificationResults[0]?.status === "unable_to_verify" && verificationResults[0]?.detail?.includes("failed"), onRetry: verificationResults[0]?.detail?.includes("failed") ? retryRegistryLookup : undefined } : t)} elapsed={verificationElapsed} />

                      {/* Raw API Proof */}
                      {registryProof && (
                        <div style={{ borderRadius: 12, border: `1px solid ${registryProof.error ? COLORS.red : COLORS.green}`, overflow: "hidden", marginBottom: 20 }}>
                          <div onClick={() => setDraftExpanded(prev => ({ ...prev, __proof: !prev.__proof }))} style={{ padding: "12px 16px", background: registryProof.error ? COLORS.redLight : COLORS.greenLight, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: registryProof.error ? COLORS.red : COLORS.green }}>{registryProof.error ? "API Call Failed" : "Raw API Proof"}</span>
                              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: registryProof.error ? COLORS.red : COLORS.green }}>— {registryProof.error ? registryProof.error : "Claude tool_use response + CRA Charity Database"}</span>
                            </div>
                            <span style={{ fontSize: 12, color: registryProof.error ? COLORS.red : COLORS.green, transition: "transform 0.2s", transform: draftExpanded.__proof ? "rotate(180deg)" : "rotate(0deg)" }}>&#9660;</span>
                          </div>
                          {draftExpanded.__proof && (
                            <div style={{ padding: "16px 20px", background: "#0d1117", fontFamily: "'DM Mono', 'Fira Code', monospace", fontSize: 12, lineHeight: 1.7, maxHeight: 400, overflowY: "auto" }}>
                              {registryProof.toolCall && (
                                <div style={{ marginBottom: 16 }}>
                                  <div style={{ color: "#4ade80", fontWeight: 700, marginBottom: 8 }}>1. Claude's tool_use request (from API response):</div>
                                  <pre style={{ color: "#e2e8f0", whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>{JSON.stringify(registryProof.toolCall, null, 2)}</pre>
                                </div>
                              )}
                              {registryProof.registryData && (
                                <div style={{ marginBottom: 16 }}>
                                  <div style={{ color: "#60a5fa", fontWeight: 700, marginBottom: 8 }}>2. Data fetched from CRA Charity Database (Open Data):</div>
                                  <pre style={{ color: "#94a3b8", whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>{registryProof.registryData.slice(0, 1500)}{registryProof.registryData.length > 1500 ? "\n..." : ""}</pre>
                                </div>
                              )}
                              {registryProof.interpretation && (
                                <div>
                                  <div style={{ color: "#fbbf24", fontWeight: 700, marginBottom: 8 }}>3. Claude's interpretation of registry data:</div>
                                  <pre style={{ color: "#e2e8f0", whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>{registryProof.interpretation}</pre>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* AI-Assisted Follow-ups */}
                      <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 20, marginBottom: 20 }}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: COLORS.dune, marginBottom: 12 }}>AI-Assisted Follow-ups</h3>

                        {followUps.map((f, i) => (
                          <div key={i} style={{ padding: 14, borderRadius: 10, border: `1px solid ${COLORS.border}`, background: "#fff", marginBottom: 8 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, background: f.tier === "automated" ? COLORS.greenLight : COLORS.blueLight, color: f.tier === "automated" ? COLORS.green : COLORS.blue, textTransform: "uppercase" }}>{f.tier === "automated" ? "Automated" : "AI-drafted"}</span>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.dune }}>{f.item}</p>
                              </div>
                              {f.tier === "ai_drafted" && f.draft && (
                                <button onClick={(e) => { e.stopPropagation(); setDraftExpanded(prev => ({ ...prev, [i]: !prev[i] })); }} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: COLORS.blue, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                                  {draftExpanded[i] ? "Hide draft" : "View draft"}
                                </button>
                              )}
                            </div>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary, marginTop: 4 }}>{f.action}</p>
                            {draftExpanded[i] && f.draft && (
                              <div style={{ marginTop: 10, padding: 14, borderRadius: 8, background: COLORS.warmWhite, border: `1px solid ${COLORS.border}` }}>
                                <p style={{ fontFamily: "'DM Sans', monospace", fontSize: 13, color: COLORS.duneLight, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{f.draft}</p>
                                <button onClick={() => showToast("Coming soon — send functionality in development")} style={{ marginTop: 10, padding: "8px 20px", borderRadius: 100, border: "none", background: COLORS.dune, color: "#fff", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Send</button>
                              </div>
                            )}
                          </div>
                        ))}

                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.6, marginTop: 12, padding: "10px 14px", borderRadius: 8, background: COLORS.warmWhite }}>
                          AI resolved {verifiedCount} checks automatically. {autoCount} auto-requested from creator. {draftCount} drafts ready for reviewer to send. 0 require manual research.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reviewer Actions — sticky at bottom */}
                <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 20 }}>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => showToast("Proposal approved for listing")} style={{ flex: 1, padding: "12px", borderRadius: 100, border: "none", background: COLORS.green, color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Approve for listing</button>
                    <button onClick={() => showToast("More info requested from creator")} style={{ flex: 1, padding: "12px", borderRadius: 100, border: `1.5px solid ${COLORS.border}`, background: "#fff", color: COLORS.dune, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Request more info</button>
                    <button onClick={() => showToast("Proposal rejected")} style={{ padding: "12px 20px", borderRadius: 100, border: `1.5px solid ${COLORS.redLight}`, background: COLORS.redLight, color: COLORS.red, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Reject</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Milestone Verification */}
      {activeTab === "milestones" && (
        <div>
          {/* Queue list — hidden when focused */}
          {!expandedMilestone && milestoneProjects.map(proj => {
            const pct = Math.round((proj.funded / proj.goal) * 100);
            return (
              <div key={proj.id} onClick={() => setExpandedMilestone(proj.id)} style={{ padding: 20, borderRadius: 12, border: `1px solid ${COLORS.border}`, background: "#fff", marginBottom: 12, cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: COLORS.dune }}>{proj.title}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textSecondary }}>{proj.creator}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.dune }}>${proj.funded.toLocaleString()} / ${proj.goal.toLocaleString()}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textSecondary }}>{pct}% funded</p>
                    </div>
                    <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: COLORS.yellowLight, color: "#B8860B" }}>{proj.currentMilestone}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Focused milestone detail view */}
          {expandedMilestone && (() => {
            const proj = milestoneProjects.find(p => p.id === expandedMilestone);
            if (!proj) return null;
            const pct = Math.round((proj.funded / proj.goal) * 100);
            return (
              <div>
                {/* Back button */}
                <button onClick={() => setExpandedMilestone(null)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 0", border: "none", background: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 16 }}>
                  ← Back to queue
                </button>

                {/* Project header */}
                <div style={{ padding: 20, borderRadius: 12, border: `1px solid ${COLORS.dune}`, background: "#fff", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: COLORS.dune, marginBottom: 4 }}>{proj.title}</h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary }}>{proj.creator} · ${proj.funded.toLocaleString()} / ${proj.goal.toLocaleString()} ({pct}% funded)</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {proj.id === "solar" && <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: COLORS.greenLight, color: COLORS.green }}>WS Verified</span>}
                      <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: COLORS.yellowLight, color: "#B8860B" }}>{proj.currentMilestone}</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: 28, borderRadius: 14, border: `1px solid ${COLORS.border}`, background: "#fff" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary, marginBottom: 20 }}>
                    <span style={{ fontWeight: 600, color: COLORS.dune }}>Evidence submitted:</span> {proj.evidence}
                  </p>

                  {/* Live Photo Verification */}
                  {proj.id === "solar" && (
                    <div style={{ marginBottom: 24 }}>
                      <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: COLORS.dune, marginBottom: 12 }}>Live Photo Verification</h4>

                      {/* Upload zone */}
                      <div style={{ padding: 20, borderRadius: 12, border: `2px dashed ${milestonePhoto ? COLORS.green : COLORS.border}`, background: milestonePhoto ? COLORS.greenLight + "33" : COLORS.warmWhite, textAlign: "center", marginBottom: 16, transition: "all 0.2s" }}>
                        {!milestonePhoto ? (
                          <label style={{ cursor: "pointer", display: "block" }}>
                            <input type="file" accept=".jpg,.jpeg,.png,.webp" style={{ display: "none" }} onChange={e => e.target.files?.[0] && handleMilestonePhoto(e.target.files[0])} />
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, marginBottom: 8 }}>📷</p>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.dune, marginBottom: 4 }}>Upload photo for AI verification</p>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textTertiary }}>JPG, PNG, or WebP — milestone evidence photo</p>
                          </label>
                        ) : (
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, textAlign: "left" }}>
                            <img src={milestonePhotoPreview} alt="Preview" style={{ width: 240, height: 180, objectFit: "cover", borderRadius: 10, border: `3px solid ${milestonePhotoResult ? (milestonePhotoResult.overall_verdict === "verified" ? COLORS.green : milestonePhotoResult.overall_verdict === "discrepancy" ? COLORS.red : COLORS.yellow) : COLORS.border}`, cursor: "pointer" }} onClick={() => window.open(milestonePhotoPreview, "_blank")} />
                            <div style={{ flex: 1 }}>
                              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.dune, marginBottom: 4 }}>{milestonePhoto.name}</p>
                              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textTertiary, marginBottom: 12 }}>{(milestonePhoto.size / 1024).toFixed(0)} KB · {milestonePhoto.type}</p>
                              <button onClick={() => { setMilestonePhoto(null); setMilestonePhotoPreview(null); setMilestonePhotoResult(null); setMilestonePhotoTrace([]); setMilestonePhotoElapsed(null); setMilestoneSecondary(null); }} style={{ padding: "6px 14px", borderRadius: 100, border: `1px solid ${COLORS.border}`, background: "#fff", color: COLORS.textSecondary, fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Remove</button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Run verification button */}
                      {milestonePhoto && !milestonePhotoResult && (
                        <button onClick={handlePhotoVerification} disabled={milestonePhotoVerifying} style={{ width: "100%", padding: "12px", borderRadius: 100, border: "none", background: milestonePhotoVerifying ? COLORS.duneLight : COLORS.dune, color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: milestonePhotoVerifying ? "not-allowed" : "pointer", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                          {milestonePhotoVerifying && <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />}
                          {milestonePhotoVerifying ? "Verifying..." : "Run AI Photo Verification"}
                        </button>
                      )}

                      {/* Verification trace — always visible after run */}
                      {milestonePhotoTrace.length > 0 && (
                        <AgentTracePanel trace={milestonePhotoTrace} elapsed={milestonePhotoElapsed} collapsed={!milestonePhotoVerifying} streaming={milestonePhotoVerifying} totalExpected={8} />
                      )}

                      {/* Verification results — unified table with all checks */}
                      {milestonePhotoResult && (
                        <div>
                          {/* Overall verdict banner — top */}
                          {(() => {
                            const v = milestonePhotoResult.overall_verdict;
                            const secondaryFlags = milestoneSecondary ? [milestoneSecondary.gps, milestoneSecondary.timestamp, milestoneSecondary.permit].filter(Boolean) : [];
                            const hasSecondaryDiscrepancy = secondaryFlags.some(f => f.status === "discrepancy");
                            const allSecondaryUnverifiable = secondaryFlags.length > 0 && secondaryFlags.every(f => f.status === "unable_to_verify");
                            const effectiveVerdict = hasSecondaryDiscrepancy ? "discrepancy" : v === "verified" && allSecondaryUnverifiable ? "unable_to_verify" : v;
                            const bannerBg = effectiveVerdict === "verified" ? COLORS.greenLight : effectiveVerdict === "discrepancy" ? COLORS.redLight : COLORS.yellowLight;
                            const bannerBorder = effectiveVerdict === "verified" ? COLORS.green : effectiveVerdict === "discrepancy" ? COLORS.red : COLORS.yellow;
                            const bannerColor = effectiveVerdict === "verified" ? COLORS.green : effectiveVerdict === "discrepancy" ? COLORS.red : "#B8860B";
                            const secondaryNote = hasSecondaryDiscrepancy
                              ? " Secondary checks flagged discrepancies."
                              : allSecondaryUnverifiable && v === "verified"
                                ? " Vision passed but no EXIF metadata to independently verify."
                                : "";
                            return (
                              <div style={{ padding: 14, borderRadius: 10, background: bannerBg, border: `1px solid ${bannerBorder}`, marginBottom: 12 }}>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: bannerColor, marginBottom: 2 }}>
                                  {effectiveVerdict === "verified" ? "Photo verified" : effectiveVerdict === "discrepancy" ? "Discrepancy detected" : "Unable to fully verify"}
                                </p>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary }}>{milestonePhotoResult.summary}{secondaryNote}</p>
                              </div>
                            );
                          })()}

                          {/* Layer 1: Client-side metadata forensics */}
                          {milestoneSecondary && (
                            <>
                              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Layer 1 — Client-side Forensics <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(zero API cost)</span></p>
                              <div style={{ borderRadius: 12, border: `1px solid ${COLORS.border}`, overflow: "hidden", marginBottom: 16 }}>
                                {[
                                  { key: "metadata", label: "File metadata & EXIF", category: "metadata" },
                                  { key: "gps", label: "GPS geolocation", category: "metadata" },
                                  { key: "timestamp", label: "Photo timestamp", category: "metadata" },
                                ].map((dim, i, arr) => {
                                  const d = dim.key === "metadata"
                                    ? { status: milestonePhotoTrace[0]?.status || "unable_to_verify", detail: milestonePhotoTrace[0]?.result || "Awaiting..." }
                                    : milestoneSecondary?.[dim.key];
                                  const s = d?.status || "unable_to_verify";
                                  const reasoning = d?.detail || d?.reasoning || "Awaiting verification...";
                                  const borderColor = s === "verified" ? COLORS.green : s === "discrepancy" ? COLORS.red : COLORS.yellow;
                                  const bg = s === "verified" ? COLORS.greenLight : s === "discrepancy" ? COLORS.redLight : COLORS.yellowLight;
                                  const icon = s === "verified" ? "✓" : s === "discrepancy" ? "✗" : "⚠";
                                  const iconColor = s === "verified" ? COLORS.green : s === "discrepancy" ? COLORS.red : "#B8860B";
                                  return (
                                    <div key={dim.key} style={{ padding: "12px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.border}` : "none", borderLeft: `4px solid ${borderColor}`, display: "flex", alignItems: "flex-start", gap: 12 }}>
                                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: iconColor }}>{icon}</span>
                                      </div>
                                      <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.dune }}>{dim.label}</p>
                                          <span style={{ padding: "1px 7px", borderRadius: 100, fontSize: 9, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: bg, color: iconColor }}>{s === "verified" ? "Verified" : s === "discrepancy" ? "Discrepancy" : "Unverified"}</span>
                                        </div>
                                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5 }}>{reasoning}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </>
                          )}

                          {/* Layer 2: AI Vision analysis */}
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Layer 2 — AI Vision Analysis <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(Claude Vision API)</span></p>
                          <div style={{ borderRadius: 12, border: `1px solid ${COLORS.border}`, overflow: "hidden", marginBottom: 16 }}>
                            {[
                              { key: "authenticity", label: "Photo authenticity" },
                              { key: "subject_match", label: "Subject match" },
                              { key: "location_consistency", label: "Location consistency" },
                              { key: "scale_plausibility", label: "Scale plausibility" },
                            ].map((dim, i, arr) => {
                              const d = milestonePhotoResult[dim.key];
                              const s = d?.status || "unable_to_verify";
                              const reasoning = d?.reasoning || "No data";
                              const borderColor = s === "verified" ? COLORS.green : s === "discrepancy" ? COLORS.red : COLORS.yellow;
                              const bg = s === "verified" ? COLORS.greenLight : s === "discrepancy" ? COLORS.redLight : COLORS.yellowLight;
                              const icon = s === "verified" ? "✓" : s === "discrepancy" ? "✗" : "⚠";
                              const iconColor = s === "verified" ? COLORS.green : s === "discrepancy" ? COLORS.red : "#B8860B";
                              return (
                                <div key={dim.key} style={{ padding: "12px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.border}` : "none", borderLeft: `4px solid ${borderColor}`, display: "flex", alignItems: "flex-start", gap: 12 }}>
                                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: iconColor }}>{icon}</span>
                                  </div>
                                  <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.dune }}>{dim.label}</p>
                                      <span style={{ padding: "1px 7px", borderRadius: 100, fontSize: 9, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: bg, color: iconColor }}>{s === "verified" ? "Verified" : s === "discrepancy" ? "Discrepancy" : "Unverified"}</span>
                                    </div>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5 }}>{reasoning}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Layer 3: External verification */}
                          {milestoneSecondary?.permit && (
                            <>
                              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Layer 3 — External Verification <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(registry lookup)</span></p>
                              <div style={{ borderRadius: 12, border: `1px solid ${COLORS.border}`, overflow: "hidden", marginBottom: 16 }}>
                                {(() => {
                                  const d = milestoneSecondary.permit;
                                  const s = d?.status || "unable_to_verify";
                                  const reasoning = d?.detail || "Awaiting verification...";
                                  const borderColor = s === "verified" ? COLORS.green : s === "discrepancy" ? COLORS.red : COLORS.yellow;
                                  const bg = s === "verified" ? COLORS.greenLight : s === "discrepancy" ? COLORS.redLight : COLORS.yellowLight;
                                  const icon = s === "verified" ? "✓" : s === "discrepancy" ? "✗" : "⚠";
                                  const iconColor = s === "verified" ? COLORS.green : s === "discrepancy" ? COLORS.red : "#B8860B";
                                  return (
                                    <div style={{ padding: "12px 16px", borderLeft: `4px solid ${borderColor}`, display: "flex", alignItems: "flex-start", gap: 12 }}>
                                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: iconColor }}>{icon}</span>
                                      </div>
                                      <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.dune }}>Electrical permit</p>
                                          <span style={{ padding: "1px 7px", borderRadius: 100, fontSize: 9, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: bg, color: iconColor }}>{s === "verified" ? "Verified" : s === "discrepancy" ? "Discrepancy" : "Unverified"}</span>
                                        </div>
                                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5 }}>{reasoning}</p>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* AI Evidence Analysis */}
                  <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: COLORS.dune, marginBottom: 12 }}>AI Evidence Analysis</h4>
                  <div style={{ borderRadius: 12, border: `1px solid ${COLORS.border}`, overflow: "hidden", marginBottom: 24 }}>
                    {proj.evidenceAnalysis.map((ev, i) => (
                      <div key={i} style={{ padding: "14px 16px", borderBottom: i < proj.evidenceAnalysis.length - 1 ? `1px solid ${COLORS.border}` : "none", display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.greenLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.green }}>✓</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.dune, marginBottom: 2 }}>{ev.evidence}</p>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textTertiary, marginBottom: 4 }}>{ev.analysis}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ padding: "2px 8px", borderRadius: 100, fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: COLORS.greenLight, color: COLORS.green }}>Consistent</span>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textSecondary }}>{ev.detail}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Agent Activity Trace (static for milestones) */}
                  {proj.id === "solar" && <AgentTracePanel trace={MILESTONE_AGENT_TRACE} elapsed="1.8" />}

                  {/* Milestone Timeline */}
                  <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: COLORS.dune, marginBottom: 12 }}>Milestone Timeline</h4>
                  <div style={{ marginBottom: 24 }}>
                    {proj.milestones.map((m, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: m.status === "released" ? COLORS.green : m.status === "pending" ? COLORS.accent : COLORS.border }}>
                          <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{m.status === "released" ? "✓" : m.status === "pending" ? "→" : "○"}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.dune }}>{m.name} — {m.amount} {m.status === "released" ? "released" : m.status === "pending" ? "pending" : "upcoming"}</p>
                          {m.status === "pending" && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.accent, fontWeight: 600 }}>← Evidence under review</p>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payout Decision */}
                  <div style={{ padding: 16, borderRadius: 10, background: COLORS.greenLight, border: `1px solid ${COLORS.green}`, marginBottom: 16 }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.green }}>All {proj.evidenceAnalysis.length} evidence items verified by AI. 0 require manual review.</p>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => showToast(`Payout of ${proj.milestones.find(m => m.status === "pending")?.amount || ""} approved`)} style={{ flex: 1, padding: "12px", borderRadius: 100, border: "none", background: COLORS.green, color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Approve payout — {proj.milestones.find(m => m.status === "pending")?.amount || ""}</button>
                    <button onClick={() => showToast("Payout held for further review")} style={{ padding: "12px 24px", borderRadius: 100, border: `1.5px solid ${COLORS.border}`, background: "#fff", color: COLORS.dune, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Hold for review</button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  // URL parameter support: ?view=compliance opens directly to compliance demo
  const urlParams = new URLSearchParams(window.location.search);
  const initialView = urlParams.get("view");
  const startOnCompliance = initialView === "compliance";

  const [screen, setScreen] = useState(startOnCompliance ? "compliance" : "welcome");
  const [view, setView] = useState(startOnCompliance ? "compliance" : "investor");
  const [profile, setProfile] = useState(null);
  const [selProject, setSelProject] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [matchedProjects, setMatchedProjects] = useState([]);
  const [matchFallback, setMatchFallback] = useState(false);
  const [submittedProposal, setSubmittedProposal] = useState(DEMO_PROPOSAL);

  const jumpToComplianceDemo = () => {
    setSubmittedProposal(DEMO_PROPOSAL);
    setView("compliance");
    setScreen("compliance");
  };

  useEffect(() => {
    const handler = e => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        jumpToComplianceDemo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleCreatorSubmit = (proposal, aiResult) => {
    setSubmittedProposal({ proposal, aiResult });
    setScreen("compliance");
  };

  const start = v => {
    if (v === "creator_landing") { setView("creator"); setScreen("creator_landing"); }
    else { setView(v); setScreen(v === "investor" ? "values" : "creator"); }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet" />
      {screen !== "welcome" && <Nav currentView={view} setCurrentView={setView} setScreen={setScreen} onComplianceDemo={jumpToComplianceDemo} />}
      {screen === "welcome" && <>
        <WelcomeNav />
        <WelcomeScreen onStart={start} />
      </>}
      {screen === "values" && <ValuesIntake onComplete={p => { setProfile(p); setScreen("matches"); }} />}
      {screen === "matches" && <MatchResults profile={profile} onSelectProject={p => { setSelProject(p); setScreen("detail"); }} cachedProjects={matchedProjects} cachedFallback={matchFallback} onCacheResults={(projects, fallback) => { setMatchedProjects(projects); setMatchFallback(fallback); }} />}
      {screen === "detail" && selProject && <ProjectDetail project={selProject} onBack={() => setScreen("matches")} onApprove={(p, a) => { setInvestments(prev => [...prev, { project: p, amount: a }]); setScreen("dashboard"); }} />}
      {screen === "dashboard" && <Dashboard investments={investments} />}
      {screen === "creator_landing" && <CreatorLandingScreen onStartProposal={() => { setView("creator"); setScreen("creator"); }} onSwitchToInvestor={() => { setView("investor"); setScreen("welcome"); }} />}
      {screen === "creator" && <CreatorView onSubmit={handleCreatorSubmit} />}
      {screen === "compliance" && <ComplianceDashboard submittedProposal={submittedProposal} />}
    </div>
  );
}
