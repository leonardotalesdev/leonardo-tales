type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  limit?: number;
  windowMs?: number;
  now?: number;
};

export type InMemoryRateLimitResult =
  | {
      ok: true;
      remaining: number;
      resetAt: number;
    }
  | {
      ok: false;
      retryAfterSeconds: number;
      resetAt: number;
    };

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 10 * 60 * 1_000;
const buckets = new Map<string, RateLimitBucket>();

function normalizeIdentifier(identifier: string | null | undefined) {
  return identifier?.trim().toLowerCase() || "unknown";
}

function cleanupExpiredBuckets(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const forwardedIp = forwardedFor?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();

  return forwardedIp || realIp || "unknown";
}

export function checkInMemoryRateLimit(
  identifier: string | null | undefined,
  options: RateLimitOptions = {},
): InMemoryRateLimitResult {
  const limit = options.limit ?? DEFAULT_LIMIT;
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const now = options.now ?? Date.now();
  const key = normalizeIdentifier(identifier);

  cleanupExpiredBuckets(now);

  const bucket = buckets.get(key);

  if (!bucket) {
    buckets.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      ok: true,
      remaining: limit - 1,
      resetAt: now + windowMs,
    };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1_000)),
      resetAt: bucket.resetAt,
    };
  }

  bucket.count += 1;

  return {
    ok: true,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt,
  };
}

export function resetInMemoryRateLimit() {
  buckets.clear();
}
