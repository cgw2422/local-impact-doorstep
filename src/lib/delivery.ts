import "server-only";

import { site } from "./site";
import {
  artworkOptions,
  campaignSizeOptions,
  labelFor,
  timeframeOptions,
  type QuoteData,
} from "./quote";

/**
 * Quote delivery.
 *
 * Supported channels (configure one or both):
 *  - Email via Resend (RESEND_API_KEY + QUOTE_TO_EMAIL, optional QUOTE_FROM_EMAIL)
 *  - Webhook (QUOTE_WEBHOOK_URL), e.g. Zapier, Make, Slack workflow, or a CRM
 *
 * If neither is configured, submissions are written to the server log. In
 * production that only counts as "delivered" when QUOTE_ALLOW_LOG_ONLY=true,
 * so leads are never silently dropped.
 */

type Row = [label: string, value: string];

export function quoteRows(data: QuoteData): Row[] {
  return [
    ["Business name", data.businessName],
    ["Contact name", data.contactName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Business type", data.businessType],
    ["Website", data.website || "—"],
    ["Campaign size", labelFor(campaignSizeOptions, data.campaignSize)],
    ["Preferred target area", data.targetArea],
    ["City", data.city],
    ["Neighborhoods / communities", data.neighborhoods || "—"],
    ["Service or offer to promote", data.offer],
    ["Existing artwork", labelFor(artworkOptions, data.artwork)],
    ["Desired start", labelFor(timeframeOptions, data.timeframe)],
    ["Message / notes", data.message || "—"],
  ];
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function emailHtml(data: QuoteData): string {
  const rows = quoteRows(data)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6B7280;font-size:13px;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#0F2D5B;font-size:14px;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto">
<div style="background:#0F2D5B;color:#fff;padding:18px 20px;border-radius:10px 10px 0 0"><strong style="font-size:18px">New campaign quote request</strong><div style="color:#F97316;font-size:13px;margin-top:4px">${escapeHtml(site.name)}</div></div>
<table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e5e7eb">${rows}</table>
<p style="color:#6B7280;font-size:12px">Reply directly to this email to respond to ${escapeHtml(data.contactName)}.</p></div>`;
}

function emailText(data: QuoteData): string {
  return quoteRows(data)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

async function sendViaResend(data: QuoteData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY!;
  const to = process.env.QUOTE_TO_EMAIL!.split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.QUOTE_FROM_EMAIL?.trim() || `${site.name} <onboarding@resend.dev>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.email,
      subject: `Quote request: ${data.businessName} (${labelFor(campaignSizeOptions, data.campaignSize)})`,
      html: emailHtml(data),
      text: emailText(data),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

async function sendViaWebhook(data: QuoteData, url: string): Promise<void> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "quote_request",
      source: site.url,
      submittedAt: new Date().toISOString(),
      data,
      summary: emailText(data),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

export type DeliveryResult = { ok: boolean; channels: string[] };

export async function deliverQuote(data: QuoteData): Promise<DeliveryResult> {
  const tasks: { name: string; run: () => Promise<void> }[] = [];

  if (process.env.RESEND_API_KEY && process.env.QUOTE_TO_EMAIL) {
    tasks.push({ name: "email", run: () => sendViaResend(data) });
  }
  const webhook = process.env.QUOTE_WEBHOOK_URL?.trim();
  if (webhook) tasks.push({ name: "webhook", run: () => sendViaWebhook(data, webhook) });

  if (tasks.length === 0) {
    const allowLogOnly =
      process.env.NODE_ENV !== "production" || process.env.QUOTE_ALLOW_LOG_ONLY === "true";
    console.warn(
      `[quote] No delivery channel configured (set RESEND_API_KEY + QUOTE_TO_EMAIL or QUOTE_WEBHOOK_URL). Submission:\n${emailText(data)}`,
    );
    return { ok: allowLogOnly, channels: allowLogOnly ? ["log"] : [] };
  }

  const results = await Promise.allSettled(tasks.map((t) => t.run()));
  const delivered: string[] = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") delivered.push(tasks[i].name);
    else console.error(`[quote] ${tasks[i].name} delivery failed:`, r.reason);
  });

  if (delivered.length === 0) {
    // Keep a copy in the logs so the lead can be recovered manually.
    console.error(`[quote] All delivery channels failed. Submission:\n${emailText(data)}`);
  }
  return { ok: delivered.length > 0, channels: delivered };
}
