import assert from "node:assert/strict";
import { test } from "node:test";

import { looksLikeSpam, normalizeQuote, validateQuote, type QuoteData } from "../src/lib/quote.ts";

const valid: QuoteData = {
  businessName: "Summit Ridge Roofing",
  contactName: "Jamie Tester",
  email: "jamie@example.com",
  phone: "(615) 555-0100",
  businessType: "Roofing",
  website: "summitridge.com",
  campaignSize: "1000",
  targetArea: "North side of town",
  city: "Springfield",
  neighborhoods: "",
  offer: "Free roof inspections",
  artwork: "no",
  timeframe: "asap",
  message: "",
};

test("accepts a complete, valid request", () => {
  assert.deepEqual(validateQuote(valid), {});
});

test("requires core fields", () => {
  const errors = validateQuote(normalizeQuote({}));
  for (const f of ["businessName", "contactName", "email", "phone", "businessType", "campaignSize", "targetArea", "city", "offer", "artwork", "timeframe"]) {
    assert.ok(errors[f as keyof QuoteData], `expected error for ${f}`);
  }
  assert.equal(errors.website, undefined);
  assert.equal(errors.message, undefined);
});

test("rejects malformed email, phone, and website", () => {
  const errors = validateQuote({ ...valid, email: "not-an-email", phone: "12345", website: "nope" });
  assert.ok(errors.email);
  assert.ok(errors.phone);
  assert.ok(errors.website);
});

test("only allows known option values", () => {
  const errors = validateQuote({ ...valid, campaignSize: "5000", artwork: "maybe", timeframe: "never" });
  assert.ok(errors.campaignSize);
  assert.ok(errors.artwork);
  assert.ok(errors.timeframe);
});

test("normalizes: trims, truncates, and drops non-strings", () => {
  const data = normalizeQuote({ businessName: "  Acme  ", message: "x".repeat(10_000), phone: 5551234567 });
  assert.equal(data.businessName, "Acme");
  assert.equal(data.message.length, 3000);
  assert.equal(data.phone, "");
});

test("flags link-stuffed spam", () => {
  assert.equal(looksLikeSpam(valid), false);
  assert.equal(looksLikeSpam({ ...valid, message: "http://a.co http://b.co www.c.co https://d.co" }), true);
});
