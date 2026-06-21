import type {
  LeadPersistenceStatus,
  NormalizedLeadSubmission,
} from "@/lib/leads/types";

type StoreLeadResult =
  | {
      ok: true;
      persistence: LeadPersistenceStatus;
      leadId?: string;
    }
  | {
      ok: false;
      persistence: LeadPersistenceStatus;
      message: string;
    };

function getStorageMode() {
  return process.env.LEADS_STORAGE_MODE?.trim().toLowerCase() || "supabase";
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    serviceRoleKey,
  };
}

export async function storeLead(
  lead: NormalizedLeadSubmission,
): Promise<StoreLeadResult> {
  const storageMode = getStorageMode();

  if (storageMode === "local") {
    return {
      ok: true,
      persistence: "local_only",
    };
  }

  if (storageMode === "none") {
    return {
      ok: false,
      persistence: "not_configured",
      message:
        "Lead storage is disabled. Set LEADS_STORAGE_MODE=local for local-only testing or configure Supabase.",
    };
  }

  const config = getSupabaseConfig();

  if (!config) {
    return {
      ok: false,
      persistence: "not_configured",
      message:
        "Supabase persistence is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, or use LEADS_STORAGE_MODE=local for local testing.",
    };
  }

  const response = await fetch(`${config.url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      phone: lead.phone ?? null,
      company_or_project: lead.company_or_project,
      website: lead.website ?? null,
      preferred_contact_channel: lead.preferred_contact_channel,
      note: lead.note ?? null,
      business_type: lead.business_type ?? null,
      detected_need: lead.detected_need ?? null,
      category: lead.category,
      source: lead.source,
      status: lead.status,
      conversation_summary: lead.conversation_summary ?? null,
      next_action: lead.next_action,
    }),
  });

  if (!response.ok) {
    return {
      ok: false,
      persistence: "failed",
      message: "Supabase lead insert failed.",
    };
  }

  const rows = (await response.json()) as Array<{ id?: string }>;

  return {
    ok: true,
    persistence: "stored",
    leadId: rows[0]?.id,
  };
}
