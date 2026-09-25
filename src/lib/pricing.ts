export type Plan = {
  id: "500" | "1000";
  name: string;
  homes: number;
  price: number;
  blurb: string;
  featured: boolean;
  badge?: string;
  perHome: string;
  features: string[];
};

const sharedFeatures = (homes: string) => [
  "Custom door hanger design",
  `${homes} door hangers professionally printed`,
  "Target neighborhood selection with you",
  `Personal distribution to ${homes} homes`,
  "Your approval before anything is printed",
  "Completion report: area covered, number distributed, and photos where practical",
];

export const plans: Plan[] = [
  {
    id: "500",
    name: "500-Home Campaign",
    homes: 500,
    price: 449,
    blurb: "A focused test campaign for one neighborhood or a tight service area.",
    featured: false,
    perHome: "about $0.90 per home",
    features: sharedFeatures("500"),
  },
  {
    id: "1000",
    name: "1,000-Home Campaign",
    homes: 1000,
    price: 699,
    blurb: "Our most popular campaign. Twice the reach for a much lower cost per home.",
    featured: true,
    badge: "Best Value",
    perHome: "about $0.70 per home",
    features: sharedFeatures("1,000"),
  },
];

export const formatPrice = (price: number) => `$${price.toLocaleString("en-US")}`;
