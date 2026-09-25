import { NextResponse } from "next/server";

import { deliverQuote } from "@/lib/delivery";
import {
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  STARTED_AT_FIELD,
  looksLikeSpam,
  normalizeQuote,
  validateQuote,
} from "@/lib/quote";

export const runtime = "nodejs";

/* Best-effort, per-instance rate limit. Good enough to stop casual abuse. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("bad body");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot and speed checks: quietly accept so bots get no signal.
  const honeypot = body[HONEYPOT_FIELD];
  const startedAt = Number(body[STARTED_AT_FIELD]);
  const tooFast = !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS;
  if ((typeof honeypot === "string" && honeypot.length > 0) || tooFast) {
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const data = normalizeQuote(body);
  const errors = validateQuote(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please correct the highlighted fields.", errors },
      { status: 422 },
    );
  }
  if (looksLikeSpam(data)) {
    return NextResponse.json({ ok: true });
  }

  const result = await deliverQuote(data);
  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't send your request right now. Please try again in a few minutes, or contact us directly.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
