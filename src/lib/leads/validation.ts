import type {
  ContactPreference,
  DiscoveryCategory,
  LeadSubmissionInput,
  NormalizedLeadSubmission,
} from "@/lib/leads/types";

const contactPreferences = new Set<ContactPreference>([
  "telegram",
  "whatsapp",
  "email",
  "phone",
]);

const discoveryCategories = new Set<DiscoveryCategory>([
  "customer_support_website",
  "sales_quote",
  "operations_automation",
  "unclear",
]);

export const LEAD_FIELD_LIMITS = {
  name: 80,
  email: 254,
  phone: 40,
  company_or_project: 140,
  website: 220,
  website_url: 220,
  note: 1200,
  business_type: 120,
  detected_need: 160,
  conversation_summary: 500,
} as const;

export const MIN_FORM_DWELL_MS = 2_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1_000;

type ValidationResult =
  | {
      ok: true;
      data: NormalizedLeadSubmission;
    }
  | {
      ok: false;
      kind: "invalid_input" | "spam";
      fieldErrors: Record<string, string>;
    };

function normalizeString(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ");
}

function normalizeMultilineString(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.trim().replace(/[ \t]+/g, " "))
    .join("\n")
    .trim();
}

function optionalString(value: unknown) {
  const normalized = normalizeString(value);
  return normalized.length > 0 ? normalized : undefined;
}

function optionalMultilineString(value: unknown) {
  const normalized = normalizeMultilineString(value);
  return normalized.length > 0 ? normalized : undefined;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidWebsite(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function getContactPreference(value: unknown): ContactPreference {
  return typeof value === "string" && contactPreferences.has(value as ContactPreference)
    ? (value as ContactPreference)
    : "email";
}

function getDiscoveryCategory(value: unknown): DiscoveryCategory {
  return typeof value === "string" && discoveryCategories.has(value as DiscoveryCategory)
    ? (value as DiscoveryCategory)
    : "unclear";
}

function hasUsefulRequiredText(value: string) {
  return value.length >= 2 && /[\p{L}\p{N}]/u.test(value);
}

function addMaxLengthError(
  fieldErrors: Record<string, string>,
  field: keyof typeof LEAD_FIELD_LIMITS,
  value: string | undefined,
) {
  if (value && value.length > LEAD_FIELD_LIMITS[field]) {
    fieldErrors[field] = `Bu alan en fazla ${LEAD_FIELD_LIMITS[field]} karakter olabilir.`;
  }
}

function getFormStartedAtMs(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const trimmedValue = value.trim();
  const numericValue = Number(trimmedValue);

  if (Number.isFinite(numericValue)) {
    return numericValue;
  }

  const parsedDate = Date.parse(trimmedValue);
  return Number.isFinite(parsedDate) ? parsedDate : null;
}

export function validateLeadSubmission(
  input: unknown,
  options: { now?: number } = {},
): ValidationResult {
  const candidate = (input ?? {}) as Partial<LeadSubmissionInput>;
  const fieldErrors: Record<string, string> = {};
  const now = options.now ?? Date.now();

  const name = normalizeString(candidate.name);
  const email = normalizeString(candidate.email).toLowerCase();
  const companyOrProject = normalizeString(candidate.company_or_project);
  const website = optionalString(candidate.website);
  const phone = optionalString(candidate.phone);
  const note = optionalMultilineString(candidate.note);
  const businessType = optionalString(candidate.business_type);
  const detectedNeed = optionalString(candidate.detected_need);
  const conversationSummary = optionalString(candidate.conversation_summary);
  const honeypotWebsiteUrl = normalizeString(candidate.website_url);
  const formStartedAtMs = getFormStartedAtMs(candidate.form_started_at);

  if (honeypotWebsiteUrl) {
    return {
      ok: false,
      kind: "spam",
      fieldErrors: {},
    };
  }

  if (!formStartedAtMs) {
    fieldErrors.form_started_at = "Form süresi doğrulanamadı.";
  } else if (formStartedAtMs > now || now - formStartedAtMs < MIN_FORM_DWELL_MS) {
    return {
      ok: false,
      kind: "spam",
      fieldErrors: {},
    };
  } else if (now - formStartedAtMs > MAX_FORM_AGE_MS) {
    fieldErrors.form_started_at = "Form süresi doldu. Lütfen formu tekrar açın.";
  }

  if (!name) {
    fieldErrors.name = "Ad soyad zorunludur.";
  } else if (!hasUsefulRequiredText(name)) {
    fieldErrors.name = "Lütfen gerçek bir ad soyad yazın.";
  }

  if (!email) {
    fieldErrors.email = "E-posta zorunludur.";
  } else if (!isValidEmail(email)) {
    fieldErrors.email = "Geçerli bir e-posta yazın.";
  }

  if (!companyOrProject) {
    fieldErrors.company_or_project = "Şirket veya proje adı zorunludur.";
  } else if (!hasUsefulRequiredText(companyOrProject)) {
    fieldErrors.company_or_project = "Lütfen gerçek bir şirket veya proje adı yazın.";
  }

  if (website && !isValidWebsite(website)) {
    fieldErrors.website = "Website adresi http:// veya https:// ile başlamalıdır.";
  }

  addMaxLengthError(fieldErrors, "name", name);
  addMaxLengthError(fieldErrors, "email", email);
  addMaxLengthError(fieldErrors, "phone", phone);
  addMaxLengthError(fieldErrors, "company_or_project", companyOrProject);
  addMaxLengthError(fieldErrors, "website", website);
  addMaxLengthError(fieldErrors, "website_url", honeypotWebsiteUrl);
  addMaxLengthError(fieldErrors, "note", note);
  addMaxLengthError(fieldErrors, "business_type", businessType);
  addMaxLengthError(fieldErrors, "detected_need", detectedNeed);
  addMaxLengthError(fieldErrors, "conversation_summary", conversationSummary);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      kind: "invalid_input",
      fieldErrors,
    };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      company_or_project: companyOrProject,
      website,
      preferred_contact_channel: getContactPreference(
        candidate.preferred_contact_channel,
      ),
      note,
      business_type: businessType,
      detected_need: detectedNeed,
      category: getDiscoveryCategory(candidate.category),
      conversation_summary: conversationSummary,
      source: "leonardo_tales_ai_representative",
      status: "new",
      next_action: "human_follow_up_required",
    },
  };
}
