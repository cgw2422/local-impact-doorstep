# Local Impact Doorstep

Marketing website for **Local Impact Doorstep**: done-for-you neighborhood door hanger campaigns for local home-service businesses.

> Your business. On local doorsteps.

Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. All pages are statically prerendered. The only server code is the quote form endpoint (`/api/quote`).

## Pages

| Route           | Purpose                                                   |
| --------------- | --------------------------------------------------------- |
| `/`             | Home: hero, benefits, industries, process, pricing, report, FAQ |
| `/how-it-works` | 9-step process, who does what, timeline                   |
| `/pricing`      | 500-home ($449) and 1,000-home ($699) campaigns, comparison, fee notes |
| `/industries`   | 16 home-service industries with campaign angles           |
| `/examples`     | Six sample door hanger concepts (clearly labelled as samples) |
| `/about`        | Company approach and values                               |
| `/quote`        | Quote request form (also reached via `/contact`)          |
| `/privacy`      | Privacy Policy                                            |
| `/terms`        | Service Terms                                             |

Plus `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, a generated Open Graph image, favicon, and Apple touch icon.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

## Scripts

| Command             | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start the dev server                               |
| `npm run build`     | Production build                                   |
| `npm start`         | Serve the production build                         |
| `npm run typecheck` | TypeScript check                                   |
| `npm run lint`      | ESLint                                             |
| `npm test`          | Unit tests for quote validation (Node ≥ 22.18)     |
| `npm run check`     | Typecheck + lint + tests                           |

## Environment variables

See `.env.example`. All are optional for local development.

| Variable                    | Required in prod | Description |
| --------------------------- | ---------------- | ----------- |
| `NEXT_PUBLIC_SITE_URL`      | Yes              | Canonical URL, e.g. `https://www.localimpactdoorstep.com`. Used for sitemap, robots, canonical and OG tags. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No               | Public email shown in footer, quote page, and legal pages. Hidden if empty. |
| `NEXT_PUBLIC_CONTACT_PHONE` | No               | Public phone shown in footer, mobile menu, and quote page. Hidden if empty. |
| `NEXT_PUBLIC_SERVICE_AREA`  | No               | Confirmed service area, e.g. `Nashville, TN and surrounding communities`. Leave empty until confirmed. |
| `RESEND_API_KEY`            | One delivery option | [Resend](https://resend.com) API key for emailing quote requests. |
| `QUOTE_TO_EMAIL`            | With Resend      | Inbox(es) that receive quote requests (comma-separated). |
| `QUOTE_FROM_EMAIL`          | Recommended      | Verified sender, e.g. `Local Impact Doorstep <quotes@yourdomain.com>`. Defaults to Resend's test sender, which only delivers to your own Resend account email. |
| `QUOTE_WEBHOOK_URL`         | One delivery option | Receives each request as JSON (Zapier, Make, Slack workflow, CRM). |
| `QUOTE_ALLOW_LOG_ONLY`      | No               | `true` accepts submissions in production with no delivery channel and only logs them. |

`NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.

### Quote form delivery

`POST /api/quote` validates input with the same rules as the browser (`src/lib/quote.ts`), then delivers via every configured channel (Resend email and/or webhook). The email sets `reply_to` to the customer so you can reply directly.

- **No channel configured, development:** the submission is printed to the server console and the visitor sees the success message.
- **No channel configured, production:** the API returns 503 and the visitor is asked to try again or contact you directly, so no lead is silently lost. The submission is still written to the server log. Set `QUOTE_ALLOW_LOG_ONLY=true` to override.
- **All channels fail:** 503 to the visitor, and the full submission is written to the error log for manual recovery.

Spam protection: a hidden honeypot field, a minimum fill time (3 s), a link-count heuristic, a 20 KB body limit, and a best-effort per-IP rate limit (5 per 10 minutes, per server instance). Bot submissions get a fake success response.

**Resend setup:** create an account, verify your sending domain, create an API key, then set `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, and `QUOTE_FROM_EMAIL`.

## Project structure

```
src/
  app/                 Routes, metadata files, /api/quote
  components/
    brand/Logo.tsx     SVG logo mark + wordmark
    layout/            Header (mobile menu), Footer
    ui/                Button/ButtonLink, Section/SectionHeading
    sections/          Hero, FeatureStrip, Industries, ProcessSteps, PricingCards,
                       CompletionReport, Faq, CtaBanner, PageHero, DoorHanger, LegalPage
    forms/QuoteForm.tsx
    illustrations/     Hero scene (SVG)
  lib/                 site config, pricing, industries, FAQs, examples, quote schema, delivery
tests/                 node:test unit tests
```

Content lives in `src/lib/*.ts`: edit prices in `pricing.ts`, industries in `industries.ts`, FAQs in `faqs.ts`, and sample campaigns in `examples.ts`.

## Assets you may want to replace

- **Hero visual:** an SVG illustration (`src/components/illustrations/HeroScene.tsx`). To use a real photo of your team hanging a door hanger, add it to `public/images/` and pass it to the hero in `src/app/page.tsx`:
  `<HomeHero photo={{ src: "/images/hero.jpg", alt: "…" }} />` (about 1200×1120, optimized automatically).
- **Logo:** recreated in SVG (`src/components/brand/Logo.tsx`, `src/app/icon.svg`). Swap in the final vector files from your designer if they differ.
- **Sample campaigns:** mock designs with fictional businesses and `555` numbers. Replace with real, permission-cleared client work when available and remove the "sample" labels.
- **Completion report mock:** illustrative. Update if your real report format differs.
- **Legal pages:** sensible starting templates. Have them reviewed by an attorney for your state before relying on them.

## Deployment

Any Node host works. For Vercel: import the repo, set the environment variables above, and deploy (no extra config needed). For other hosts: `npm run build && npm start`.

The in-memory rate limiter is per instance. On serverless hosts it's best-effort; add a platform firewall rule or a shared store if abuse becomes a problem.
