export interface QuoteFormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  company: string;
  // Step 2
  projectType: string;
  // Step 3
  duration: string;
  shootDays: string;
  location: string;
  talentRequired: string;
  crewSize: string;
  // Step 4
  productionElements: string[];
  // Step 5
  postProduction: string[];
  // Step 6
  budgetRange: string;
  deadline: string;
}

export interface Estimate {
  minBudget: number;
  maxBudget: number;
  minWeeks: number;
  maxWeeks: number;
  breakdown: { label: string; detail: string }[];
}

const BASE_PRICES: Record<string, [number, number]> = {
  'Ad Film': [150000, 500000],
  'Corporate Video': [100000, 300000],
  'Social Media Content': [50000, 150000],
  'Music Video': [200000, 600000],
  'Short Film': [300000, 800000],
  'Other': [80000, 250000],
};

const DURATION_MULTIPLIER: Record<string, number> = {
  '15 sec': 0.7,
  '30 sec': 1,
  '1 min': 1.4,
  '3+ min': 2,
};

const SHOOT_DAYS_ADD: Record<string, [number, number]> = {
  '1': [0, 0],
  '2-3': [50000, 120000],
  '4+': [150000, 300000],
};

const LOCATION_ADD: Record<string, [number, number]> = {
  'Studio': [20000, 50000],
  'Outdoor': [30000, 80000],
  'Multiple Locations': [60000, 150000],
};

const CREW_MULTIPLIER: Record<string, number> = {
  'Small': 1,
  'Medium': 1.3,
  'Large': 1.7,
};

const ELEMENT_COSTS: Record<string, [number, number]> = {
  'Drone Shots': [15000, 40000],
  'High-end Camera (RED/ARRI)': [30000, 80000],
  'Lighting Setup': [15000, 40000],
  'Set Design': [40000, 120000],
  'Scriptwriting': [20000, 50000],
  'Storyboarding': [10000, 30000],
};

const POST_COSTS: Record<string, [number, number]> = {
  'Basic Editing': [10000, 25000],
  'Advanced Editing': [25000, 60000],
  'Color Grading': [15000, 40000],
  'VFX': [50000, 200000],
  'Sound Design': [15000, 40000],
};

const TIMELINE_BASE: Record<string, [number, number]> = {
  'Ad Film': [2, 4],
  'Corporate Video': [2, 3],
  'Social Media Content': [1, 2],
  'Music Video': [3, 5],
  'Short Film': [4, 8],
  'Other': [2, 4],
};

export function calculateEstimate(data: QuoteFormData): Estimate {
  const breakdown: { label: string; detail: string }[] = [];

  const [baseMin, baseMax] = BASE_PRICES[data.projectType] || [100000, 300000];
  breakdown.push({ label: 'Base Production', detail: `${data.projectType} — ₹${fmt(baseMin)}–₹${fmt(baseMax)}` });

  const durMul = DURATION_MULTIPLIER[data.duration] || 1;
  let min = baseMin * durMul;
  let max = baseMax * durMul;
  if (durMul !== 1) breakdown.push({ label: 'Duration', detail: `${data.duration} (×${durMul})` });

  const [sdMin, sdMax] = SHOOT_DAYS_ADD[data.shootDays] || [0, 0];
  min += sdMin; max += sdMax;
  if (sdMin > 0) breakdown.push({ label: 'Shoot Days', detail: `${data.shootDays} days — +₹${fmt(sdMin)}–₹${fmt(sdMax)}` });

  const [locMin, locMax] = LOCATION_ADD[data.location] || [0, 0];
  min += locMin; max += locMax;
  breakdown.push({ label: 'Location', detail: `${data.location} — +₹${fmt(locMin)}–₹${fmt(locMax)}` });

  if (data.talentRequired === 'Yes') {
    min += 30000; max += 100000;
    breakdown.push({ label: 'Talent', detail: 'Required — +₹30K–₹1L' });
  }

  const crewMul = CREW_MULTIPLIER[data.crewSize] || 1;
  min *= crewMul; max *= crewMul;
  if (crewMul !== 1) breakdown.push({ label: 'Crew', detail: `${data.crewSize} team (×${crewMul})` });

  for (const el of data.productionElements) {
    const [eMin, eMax] = ELEMENT_COSTS[el] || [0, 0];
    min += eMin; max += eMax;
    if (eMin > 0) breakdown.push({ label: el, detail: `+₹${fmt(eMin)}–₹${fmt(eMax)}` });
  }

  for (const pp of data.postProduction) {
    const [pMin, pMax] = POST_COSTS[pp] || [0, 0];
    min += pMin; max += pMax;
    if (pMin > 0) breakdown.push({ label: pp, detail: `+₹${fmt(pMin)}–₹${fmt(pMax)}` });
  }

  const [tMin, tMax] = TIMELINE_BASE[data.projectType] || [2, 4];
  let minWeeks = tMin;
  let maxWeeks = tMax;
  if (data.shootDays === '4+') { minWeeks += 1; maxWeeks += 2; }
  if (data.postProduction.includes('VFX')) { minWeeks += 1; maxWeeks += 2; }
  if (data.deadline === 'Urgent') { minWeeks = Math.max(1, minWeeks - 1); }
  if (data.deadline === 'Flexible') { maxWeeks += 2; }

  return {
    minBudget: Math.round(min / 1000) * 1000,
    maxBudget: Math.round(max / 1000) * 1000,
    minWeeks,
    maxWeeks,
    breakdown,
  };
}

function fmt(n: number): string {
  if (n >= 100000) return `${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

export function formatINR(n: number): string {
  if (n >= 100000) {
    const lakhs = n / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)}L`;
  }
  if (n >= 1000) {
    return `₹${(n / 1000).toFixed(0)}K`;
  }
  return `₹${n}`;
}
