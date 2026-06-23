export type DiscoveryCategory =
  | "customer_support_website"
  | "sales_quote"
  | "operations_automation"
  | "unclear";

export type ContactPreference = "telegram" | "whatsapp" | "email" | "phone";

export type LeadStatus = "new";

export type LeadSubmissionInput = {
  name: string;
  email: string;
  phone?: string;
  company_or_project: string;
  website?: string;
  website_url?: string;
  form_started_at?: number | string;
  preferred_contact_channel?: ContactPreference;
  note?: string;
  business_type?: string;
  detected_need?: string;
  category?: DiscoveryCategory;
  conversation_summary?: string;
  source?: "leonardo_tales_ai_representative";
  status?: LeadStatus;
  next_action?: "human_follow_up_required";
};

export type NormalizedLeadSubmission = Required<
  Pick<
    LeadSubmissionInput,
    | "name"
    | "email"
    | "company_or_project"
    | "preferred_contact_channel"
    | "category"
    | "source"
    | "status"
    | "next_action"
  >
> &
  Pick<
    LeadSubmissionInput,
    | "phone"
    | "website"
    | "note"
    | "business_type"
    | "detected_need"
    | "conversation_summary"
  >;

export type LeadPersistenceStatus =
  | "stored"
  | "local_only"
  | "not_configured"
  | "failed";

export type LeadNotificationStatus =
  | "sent"
  | "not_configured"
  | "failed"
  | "skipped";

export type LeadSubmissionResult =
  | {
      ok: true;
      message: string;
      lead_id?: string;
      persistence: LeadPersistenceStatus;
      notification: LeadNotificationStatus;
    }
  | {
      ok: false;
      message: string;
      code:
        | "invalid_input"
        | "spam_rejected"
        | "rate_limited"
        | "storage_not_configured"
        | "storage_failed"
        | "unexpected_error";
      fieldErrors?: Record<string, string>;
      persistence?: LeadPersistenceStatus;
      notification?: LeadNotificationStatus;
    };
