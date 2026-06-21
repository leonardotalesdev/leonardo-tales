import {
  MIN_FORM_DWELL_MS,
  validateLeadSubmission,
} from "./validation.ts";
import {
  checkInMemoryRateLimit,
  resetInMemoryRateLimit,
} from "../rate-limit/in-memory.ts";

const now = Date.now();

function createValidPayload(overrides = {}) {
  return {
    name: "Ayse Yilmaz",
    email: "ayse@example.com",
    phone: "+90 555 111 2233",
    company_or_project: "Leonardo Demo Projesi",
    website: "https://example.com",
    preferred_contact_channel: "telegram",
    note: "Web sitesi ve AI musteri temsilcisi icin gorusmek istiyoruz.",
    business_type: "Profesyonel hizmetler",
    detected_need: "Web sitesi + musteri karsilama asistani",
    category: "customer_support_website",
    conversation_summary: "Profesyonel hizmetler - web sitesi + AI temsilci",
    website_url: "",
    form_started_at: now - MIN_FORM_DWELL_MS - 100,
    ...overrides,
  };
}

const scenarios = [
  {
    id: "valid-lead",
    description: "Valid normalized lead passes.",
    run: () => {
      const result = validateLeadSubmission(createValidPayload(), { now });
      return [
        result.ok ? "" : "expected valid lead to pass",
        result.ok && result.data.email === "ayse@example.com"
          ? ""
          : "expected email to be normalized",
      ].filter(Boolean);
    },
  },
  {
    id: "missing-required-fields",
    description: "Missing required fields fail.",
    run: () => {
      const result = validateLeadSubmission(
        createValidPayload({
          name: "",
          company_or_project: "",
        }),
        { now },
      );
      return [
        !result.ok && result.kind === "invalid_input"
          ? ""
          : "expected invalid input result",
        !result.ok && result.fieldErrors.name ? "" : "expected name error",
        !result.ok && result.fieldErrors.company_or_project
          ? ""
          : "expected company/project error",
      ].filter(Boolean);
    },
  },
  {
    id: "invalid-email",
    description: "Invalid email fails.",
    run: () => {
      const result = validateLeadSubmission(
        createValidPayload({ email: "not-an-email" }),
        { now },
      );
      return [
        !result.ok && result.kind === "invalid_input"
          ? ""
          : "expected invalid input result",
        !result.ok && result.fieldErrors.email ? "" : "expected email error",
      ].filter(Boolean);
    },
  },
  {
    id: "honeypot-filled",
    description: "Filled honeypot is rejected.",
    run: () => {
      const result = validateLeadSubmission(
        createValidPayload({ website_url: "https://spam.example" }),
        { now },
      );
      return [
        !result.ok && result.kind === "spam"
          ? ""
          : "expected spam rejection for honeypot",
      ].filter(Boolean);
    },
  },
  {
    id: "too-fast",
    description: "Too-fast submission is rejected.",
    run: () => {
      const result = validateLeadSubmission(
        createValidPayload({ form_started_at: now - 500 }),
        { now },
      );
      return [
        !result.ok && result.kind === "spam"
          ? ""
          : "expected spam rejection for too-fast submission",
      ].filter(Boolean);
    },
  },
  {
    id: "rate-limit",
    description: "Sixth submission in a five-request window is rate limited.",
    run: () => {
      resetInMemoryRateLimit();
      const attempts = Array.from({ length: 6 }, (_, index) =>
        checkInMemoryRateLimit("203.0.113.42", {
          limit: 5,
          windowMs: 10 * 60 * 1_000,
          now: now + index,
        }),
      );
      resetInMemoryRateLimit();

      return [
        attempts.slice(0, 5).every((attempt) => attempt.ok)
          ? ""
          : "expected first five attempts to pass",
        !attempts[5].ok ? "" : "expected sixth attempt to be limited",
      ].filter(Boolean);
    },
  },
];

let passed = 0;

for (const scenario of scenarios) {
  const failures = scenario.run();

  if (failures.length === 0) {
    passed += 1;
    console.log(`PASS ${scenario.id} - ${scenario.description}`);
  } else {
    console.error(`FAIL ${scenario.id} - ${scenario.description}`);
    for (const failure of failures) {
      console.error(`  - ${failure}`);
    }
  }
}

console.log(`\nLead anti-spam evals: ${passed}/${scenarios.length} passed.`);

if (passed !== scenarios.length) {
  process.exit(1);
}
