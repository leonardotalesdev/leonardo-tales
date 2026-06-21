import type {
  LeadNotificationStatus,
  NormalizedLeadSubmission,
} from "@/lib/leads/types";

type TelegramResult =
  | {
      ok: true;
      notification: LeadNotificationStatus;
    }
  | {
      ok: false;
      notification: LeadNotificationStatus;
      message: string;
    };

function getNotificationMode() {
  return process.env.LEADS_NOTIFICATION_MODE?.trim().toLowerCase() || "telegram";
}

function getTelegramConfig() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    return null;
  }

  return {
    botToken,
    chatId,
  };
}

function formatLeadNotification(lead: NormalizedLeadSubmission) {
  const lines = [
    "Leonardo Tales yeni lead",
    "",
    `Ad: ${lead.name}`,
    `E-posta: ${lead.email}`,
    `Şirket/Proje: ${lead.company_or_project}`,
    `Kategori: ${lead.category}`,
    lead.phone ? `Telefon: ${lead.phone}` : null,
    lead.website ? `Website: ${lead.website}` : null,
    lead.preferred_contact_channel
      ? `Tercih edilen kanal: ${lead.preferred_contact_channel}`
      : null,
    lead.business_type ? `İş türü: ${lead.business_type}` : null,
    lead.detected_need ? `İhtiyaç: ${lead.detected_need}` : null,
    lead.note ? `Not: ${lead.note}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

export async function notifyLeadTelegram(
  lead: NormalizedLeadSubmission,
): Promise<TelegramResult> {
  const notificationMode = getNotificationMode();

  if (notificationMode === "none") {
    return {
      ok: true,
      notification: "skipped",
    };
  }

  const config = getTelegramConfig();

  if (!config) {
    return {
      ok: true,
      notification: "not_configured",
    };
  }

  const response = await fetch(
    `https://api.telegram.org/bot${config.botToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: formatLeadNotification(lead),
        disable_web_page_preview: true,
      }),
    },
  );

  if (!response.ok) {
    return {
      ok: false,
      notification: "failed",
      message: "Telegram notification failed.",
    };
  }

  return {
    ok: true,
    notification: "sent",
  };
}
