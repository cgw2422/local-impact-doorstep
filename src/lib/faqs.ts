export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do you guarantee leads?",
    a: "No. We guarantee the distribution: the agreed number of door hangers delivered to homes in the agreed target area. We can't promise how many calls, leads, or customers a campaign will produce, because that depends on your offer, your market, timing, and many other factors. What we do promise is that the work gets done and documented.",
  },
  {
    q: "Can I choose the neighborhood?",
    a: "Yes. You tell us the areas, neighborhoods, or zip codes you want to reach, and we'll work with you to build a route that covers the right number of homes. If an area is too spread out or outside where we currently operate, we'll let you know before anything is booked.",
  },
  {
    q: "Do I approve the design first?",
    a: "Always. We send you a digital proof of your door hanger before anything is printed. You can request changes, and nothing goes to print until you approve it.",
  },
  {
    q: "How long does a campaign take?",
    a: "Most campaigns are completed within about two to three weeks of design approval. The exact timeline depends on revisions, print production, route size, and weather. We'll give you an expected schedule when we confirm your campaign.",
  },
  {
    q: "What size are the door hangers?",
    a: "Our standard door hanger is 4.25\" × 11\", printed in full color on both sides on durable, heavyweight cardstock with a die-cut hole that fits most door handles.",
  },
  {
    q: "Do I need to provide artwork?",
    a: "No. Design is included. Send us your logo, contact details, and the service or offer you want to promote, and we'll build the design. If you already have artwork you like, we can use it or adapt it to fit a door hanger.",
  },
  {
    q: "Can you distribute to apartment buildings?",
    a: "Our campaigns focus on single-family homes and townhome neighborhoods. Many apartment complexes and gated communities restrict door-to-door distribution, so we don't include them unless access is permitted. We'll talk through this when planning your route.",
  },
  {
    q: "Do you place items in mailboxes?",
    a: "No. Materials are not placed inside mailboxes unless legally permitted. Door hangers are placed on front doors and door handles.",
  },
  {
    q: "What about homes with “No Soliciting” signs?",
    a: "We respect posted signs asking not to leave flyers or solicitations and skip those homes. Homes we skip are not counted toward your distribution total.",
  },
  {
    q: "How does payment work?",
    a: "There's no online checkout. After you request a quote, we confirm your target area and campaign details with you personally, then send an invoice. Printing begins after payment and design approval.",
  },
];

/** A shorter set used on the homepage. */
export const homeFaqs = faqs.slice(0, 8);
