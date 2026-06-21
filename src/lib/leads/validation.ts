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

  return value.trim();
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

export function validateLeadSubmission(input: unknown):
  | {
      ok: true;
      data: NormalizedLeadSubmission;
    }
  | {
      ok: false;
      fieldErrors: Record<string, string>;
    } {
  const candidate = (input ?? {}) as Partial<LeadSubmissionInput>;
  const fieldErrors: Record<string, string> = {};

  const name = normalizeString(candidate.name);
  const email = normalizeString(candidate.email).toLowerCase();
  const companyOrProject = normalizeString(candidate.company_or_project);
  const website = optionalString(candidate.website);

  if (!name) {
    fieldErrors.name = "Ad soyad zorunludur.";
  }

  if (!email) {
    fieldErrors.email = "E-posta zorunludur.";
  } else if (!isValidEmail(email)) {
    fieldErrors.email = "Geçerli bir e-posta yazın.";
  }

  if (!companyOrProject) {
    fieldErrors.company_or_project = "Şirket veya proje adı zorunludur.";
  }

  if (website && !isValidWebsite(website)) {
    fieldErrors.website = "Website adresi http:// veya https:// ile başlamalıdır.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      fieldErrors,
    };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone: optionalString(candidate.phone),
      company_or_project: companyOrProject,
      website,
      preferred_contact_channel: getContactPreference(
        candidate.preferred_contact_channel,
      ),
      note: optionalMultilineString(candidate.note),
      business_type: optionalString(candidate.business_type),
      detected_need: optionalString(candidate.detected_need),
      category: getDiscoveryCategory(candidate.category),
      conversation_summary: optionalString(candidate.conversation_summary),
      source: "leonardo_tales_ai_representative",
      status: "new",
      next_action: "human_follow_up_required",
    },
  };
}
