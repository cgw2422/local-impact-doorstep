export type ExampleTheme = "navy" | "light" | "orange";

export type ExampleCampaign = {
  slug: string;
  industry: string;
  business: string;
  theme: ExampleTheme;
  scene: "roof" | "wash" | "hvac" | "garage" | "yard" | "paint";
  kicker: string;
  headline: string;
  highlight: string;
  bullets: string[];
  offer: string;
  footer: string;
  strategy: string;
  campaign: string;
};

/**
 * Sample campaign concepts. These are illustrative designs, not completed
 * client jobs. Business names and phone numbers are fictional.
 */
export const examples: ExampleCampaign[] = [
  {
    slug: "roofing",
    industry: "Roofing",
    business: "Summit Ridge Roofing",
    theme: "navy",
    scene: "roof",
    kicker: "Your local",
    headline: "Experts",
    highlight: "Roofing",
    bullets: ["Roof repairs & replacements", "Storm damage inspections", "Free written estimates"],
    offer: "Free roof inspection",
    footer: "Quality roofs. Stronger neighborhoods.",
    strategy:
      "Sent to neighborhoods with older roofs after a storm season, leading with a no-pressure free inspection.",
    campaign: "1,000 homes",
  },
  {
    slug: "pressure-washing",
    industry: "Pressure Washing",
    business: "BrightSide Exterior Wash",
    theme: "light",
    scene: "wash",
    kicker: "Cleaner homes.",
    headline: "Neighbors.",
    highlight: "Brighter",
    bullets: ["House washing", "Driveways & walkways", "Decks, fences & more"],
    offer: "$50 off when 2 neighbors book",
    footer: "A cleaner community starts here.",
    strategy:
      "A neighborhood discount encourages homeowners on the same street to book together, keeping routes efficient.",
    campaign: "500 homes",
  },
  {
    slug: "hvac",
    industry: "HVAC",
    business: "Comfort Point Heating & Air",
    theme: "orange",
    scene: "hvac",
    kicker: "Beat the heat.",
    headline: "Tune-Up",
    highlight: "AC",
    bullets: ["21-point AC tune-up", "Repairs on all major brands", "Honest replacement quotes"],
    offer: "Spring tune-up special",
    footer: "Local comfort, done right.",
    strategy:
      "Timed a few weeks before summer so the door hanger is on the counter when the first hot day hits.",
    campaign: "1,000 homes",
  },
  {
    slug: "garage-doors",
    industry: "Garage Doors",
    business: "Keystone Garage Door Co.",
    theme: "navy",
    scene: "garage",
    kicker: "Stuck door?",
    headline: "Service",
    highlight: "Same-Week",
    bullets: ["Broken spring replacement", "Opener repair & install", "New insulated doors"],
    offer: "Free safety check with any repair",
    footer: "Keep this handy. You'll need us someday.",
    strategy:
      "Positioned as a keep-it-on-the-fridge reference for an urgent, unplanned repair.",
    campaign: "1,000 homes",
  },
  {
    slug: "landscaping",
    industry: "Landscaping",
    business: "Greenway Landscape Group",
    theme: "light",
    scene: "yard",
    kicker: "Love your",
    headline: "Again.",
    highlight: "Yard",
    bullets: ["Spring cleanups", "Mulch, beds & planting", "Weekly maintenance plans"],
    offer: "Free yard assessment",
    footer: "Local crews. Beautiful streets.",
    strategy:
      "Distributed around existing customers' homes to build dense, efficient maintenance routes.",
    campaign: "500 homes",
  },
  {
    slug: "painting",
    industry: "Painting",
    business: "Fresh Coat Painting Pros",
    theme: "orange",
    scene: "paint",
    kicker: "Refresh your",
    headline: "Exterior",
    highlight: "Home's",
    bullets: ["Exterior & interior painting", "Trim, doors & shutters", "Clean, on-time crews"],
    offer: "Free color consultation",
    footer: "Curb appeal your neighbors will notice.",
    strategy:
      "Aimed at established neighborhoods where homes are due for repainting, with a low-commitment first step.",
    campaign: "1,000 homes",
  },
];
