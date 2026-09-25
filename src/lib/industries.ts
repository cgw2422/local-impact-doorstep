import type { LucideIcon } from "lucide-react";
import {
  AirVent,
  Axe,
  BrickWall,
  Bug,
  CloudRain,
  Fence,
  Hammer,
  House,
  Leaf,
  PaintRoller,
  Sprout,
  SprayCan,
  Trash,
  Warehouse,
  Wrench,
  Zap,
} from "lucide-react";

export type Industry = {
  slug: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  angles: string[];
  featured?: boolean;
};

export const industries: Industry[] = [
  {
    slug: "roofing",
    name: "Roofing",
    icon: House,
    summary:
      "Homeowners rarely think about their roof until they need to. A door hanger keeps your name close at hand when they do.",
    angles: ["Storm damage checks", "Free roof inspections", "Roof replacement", "Seasonal offers"],
    featured: true,
  },
  {
    slug: "hvac",
    name: "HVAC",
    icon: AirVent,
    summary:
      "Heating and cooling needs follow the seasons. Time a campaign ahead of the first heat wave or cold snap.",
    angles: ["Seasonal tune-ups", "AC replacement", "Furnace service", "Maintenance plans"],
    featured: true,
  },
  {
    slug: "garage-doors",
    name: "Garage Doors",
    icon: Warehouse,
    summary:
      "Broken springs and stuck openers are urgent. Be the local number a homeowner already has on the counter.",
    angles: ["Repair service", "Spring replacement", "New door installation", "Opener installation"],
    featured: true,
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    icon: Leaf,
    summary:
      "Neighbors notice each other's yards. Reach a whole street while you're already working in the area.",
    angles: ["Spring cleanups", "Mulch and planting", "Landscape design", "Hardscape projects"],
    featured: true,
  },
  {
    slug: "lawn-care",
    name: "Lawn Care",
    icon: Sprout,
    summary: "Build dense routes by filling in homes around the customers you already serve.",
    angles: ["Weekly mowing", "Fertilization programs", "Aeration and seeding", "Fall leaf removal"],
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    icon: SprayCan,
    summary:
      "A visual service with a clear before-and-after. Great for neighborhood specials and bundled offers.",
    angles: ["House washing", "Driveways and walkways", "Decks and fences", "Neighborhood discounts"],
    featured: true,
  },
  {
    slug: "tree-service",
    name: "Tree Service",
    icon: Axe,
    summary:
      "Overhanging limbs and storm cleanup are easy to put off. Give homeowners a simple reason to call.",
    angles: ["Trimming and pruning", "Tree removal", "Storm cleanup", "Stump grinding"],
  },
  {
    slug: "painting",
    name: "Painting",
    icon: PaintRoller,
    summary: "Exterior paint is visible from the curb. Reach homes in neighborhoods of a similar age and style.",
    angles: ["Exterior painting", "Interior refresh", "Cabinet painting", "Free estimates"],
  },
  {
    slug: "remodeling",
    name: "Remodeling",
    icon: Hammer,
    summary:
      "Larger projects take longer to decide. A well-designed door hanger keeps your business in mind while they plan.",
    angles: ["Kitchen remodels", "Bathroom remodels", "Basement finishing", "Design consultations"],
  },
  {
    slug: "concrete",
    name: "Concrete",
    icon: BrickWall,
    summary: "Cracked driveways and patios are easy to spot. Target neighborhoods where the work is visible.",
    angles: ["Driveway replacement", "Patios", "Walkways and steps", "Repair and resurfacing"],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    icon: Wrench,
    summary: "When a pipe leaks, homeowners want someone local and fast. Be the name already on their fridge.",
    angles: ["Emergency repairs", "Water heaters", "Drain cleaning", "Fixture installation"],
    featured: true,
  },
  {
    slug: "electrical",
    name: "Electrical",
    icon: Zap,
    summary: "Upgrades and safety checks are natural offers for older neighborhoods.",
    angles: ["Panel upgrades", "Lighting installation", "EV charger installs", "Safety inspections"],
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    icon: Bug,
    summary: "Pest problems often spread house to house. Neighborhood-level outreach fits naturally.",
    angles: ["Seasonal treatments", "Termite inspections", "Mosquito control", "Recurring service plans"],
  },
  {
    slug: "junk-removal",
    name: "Junk Removal",
    icon: Trash,
    summary: "Moves, cleanouts, and renovations create demand. Give homeowners an easy next step.",
    angles: ["Garage cleanouts", "Furniture removal", "Estate cleanouts", "Yard debris pickup"],
  },
  {
    slug: "gutters",
    name: "Gutters",
    icon: CloudRain,
    summary: "Gutter work is seasonal and tree-dependent. Target wooded neighborhoods before fall and spring.",
    angles: ["Gutter cleaning", "Gutter guards", "Repairs", "New gutter installation"],
  },
  {
    slug: "fencing",
    name: "Fencing",
    icon: Fence,
    summary: "New fences get noticed by neighbors. Reach the surrounding homes while interest is high.",
    angles: ["New fence installation", "Fence repair", "Privacy fencing", "Staining and sealing"],
  },
];

export const featuredIndustries = industries.filter((i) => i.featured);

export const businessTypeOptions = [...industries.map((i) => i.name), "Other"];
