import { NextResponse } from "next/server";

import { storeLead } from "@/lib/leads/supabase";
import type { LeadSubmissionResult } from "@/lib/leads/types";
import { validateLeadSubmission } from "@/lib/leads/validation";
import { notifyLeadTelegram } from "@/lib/notifications/telegram";
import {
  checkInMemoryRateLimit,
  getClientIp,
} from "@/lib/rate-limit/in-memory";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    const result: LeadSubmissionResult = {
      ok: false,
      code: "invalid_input",
      message: "Geçersiz form verisi. Lütfen bilgileri kontrol edip tekrar deneyin.",
    };

    return NextResponse.json(result, { status: 400 });
  }

  const rateLimit = checkInMemoryRateLimit(getClientIp(request));

  if (!rateLimit.ok) {
    const result: LeadSubmissionResult = {
      ok: false,
      code: "rate_limited",
      message:
        "Çok kısa sürede fazla gönderim yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.",
      persistence: "failed",
      notification: "skipped",
    };

    return NextResponse.json(result, {
      status: 429,
      headers: {
        "Retry-After": String(rateLimit.retryAfterSeconds),
      },
    });
  }

  const validation = validateLeadSubmission(payload);

  if (!validation.ok) {
    if (validation.kind === "spam") {
      const result: LeadSubmissionResult = {
        ok: false,
        code: "spam_rejected",
        message: "Form gönderimi doğrulanamadı. Lütfen tekrar deneyin.",
        persistence: "failed",
        notification: "skipped",
      };

      return NextResponse.json(result, { status: 400 });
    }

    const result: LeadSubmissionResult = {
      ok: false,
      code: "invalid_input",
      message: "Lütfen zorunlu alanları kontrol edin.",
      fieldErrors: validation.fieldErrors,
    };

    return NextResponse.json(result, { status: 400 });
  }

  try {
    const storageResult = await storeLead(validation.data);

    if (!storageResult.ok) {
      const result: LeadSubmissionResult = {
        ok: false,
        code:
          storageResult.persistence === "not_configured"
            ? "storage_not_configured"
            : "storage_failed",
        message:
          "Lead kaydı şu anda tamamlanamadı. Lütfen yapılandırmayı kontrol edin veya daha sonra tekrar deneyin.",
        persistence: storageResult.persistence,
        notification: "skipped",
      };

      return NextResponse.json(result, { status: 500 });
    }

    const notificationResult = await notifyLeadTelegram(validation.data);
    const message =
      storageResult.persistence === "local_only"
        ? "Bilgileriniz yerel test modunda alındı. Canlı takip için sistem yapılandırması tamamlanmalıdır."
        : "Bilgileriniz alındı. Leonardo Tales yetkilisi sizinle iletişime geçerek ihtiyacınızı netleştirecektir.";
    const result: LeadSubmissionResult = {
      ok: true,
      message,
      lead_id: storageResult.leadId,
      persistence: storageResult.persistence,
      notification: notificationResult.notification,
    };

    return NextResponse.json(result, { status: 200 });
  } catch {
    const result: LeadSubmissionResult = {
      ok: false,
      code: "unexpected_error",
      message:
        "Lead gönderimi sırasında beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
      persistence: "failed",
      notification: "skipped",
    };

    return NextResponse.json(result, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json(
    {
      ok: false,
      message: "Bu endpoint yalnızca POST isteklerini kabul eder.",
    },
    { status: 405 },
  );
}
