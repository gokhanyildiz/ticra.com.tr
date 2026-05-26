import { z } from 'zod';

const localeSchema = z.enum(['tr', 'en']).default('tr');
const honeypotSchema = z.string().trim().max(160).optional().default('');
const antiSpamSchema = {
  startedAt: z.coerce.number().int().positive().optional().default(0),
  turnstileToken: z.string().trim().max(4096).optional().default(''),
};

const leadFormSchema = z.object({
  type: z.enum(['demo', 'purchase']),
  locale: localeSchema,
  fullName: z.string().trim().min(2).max(120),
  companyName: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(5).max(40),
  companySize: z.string().trim().max(80).optional().default(''),
  expectedUsers: z.string().trim().max(80).optional().default(''),
  taxNumber: z.string().trim().max(80).optional().default(''),
  packageCode: z.string().trim().max(80).optional().default(''),
  message: z.string().trim().max(1600).optional().default(''),
  website: honeypotSchema,
  ...antiSpamSchema,
  interestedModules: z
    .array(z.string().trim().min(1).max(80))
    .max(12)
    .optional()
    .default([]),
});

const contactFormSchema = z.object({
  type: z.literal('contact'),
  locale: localeSchema,
  fullName: z.string().trim().min(2).max(120),
  companyName: z.string().trim().max(160).optional().default(''),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().default(''),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(5).max(1600),
  website: honeypotSchema,
  ...antiSpamSchema,
});

export const leadRequestSchema = z.discriminatedUnion('type', [
  leadFormSchema,
  contactFormSchema,
]);

export type LeadRequestInput = z.infer<typeof leadRequestSchema>;

const requestTypeLabels = {
  tr: {
    demo: 'Demo Talebi',
    purchase: 'Teklif Talebi',
    contact: 'Genel İletişim',
  },
  en: {
    demo: 'Demo Request',
    purchase: 'Quote Request',
    contact: 'General Contact',
  },
} as const;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatValue(value: string | string[]) {
  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : '-';
  }

  return value || '-';
}

export function buildLeadRequestEmail(input: LeadRequestInput) {
  const title = requestTypeLabels[input.locale][input.type];
  const commonRows = [
    ['Talep tipi / Request type', title],
    ['Dil / Locale', input.locale.toUpperCase()],
    ['Ad soyad / Full name', input.fullName],
    ['Şirket / Company', input.companyName],
    ['E-posta / Email', input.email],
    ['Telefon / Phone', input.phone],
  ] as const;
  const rows =
    input.type === 'contact'
      ? ([
          ...commonRows,
          ['Konu / Subject', input.subject],
          ['Mesaj / Message', input.message],
        ] as const)
      : ([
          ...commonRows,
          ['Şirket büyüklüğü / Company size', input.companySize],
          ['Kullanıcı sayısı / Expected users', input.expectedUsers],
          ['Vergi numarası / Tax number', input.taxNumber],
          ['Paket / Package', input.packageCode],
          ['Modüller / Modules', input.interestedModules],
          ['Not / Message', input.message],
        ] as const);
  const subjectTarget =
    input.type === 'contact' ? input.subject : input.companyName;
  const subject = `[Ticra] ${title}: ${subjectTarget}`;
  const text = rows
    .map(([label, value]) => `${label}: ${formatValue(value)}`)
    .join('\n');
  const htmlRows = rows
    .map(([label, value]) => {
      return `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(formatValue(value))}</td></tr>`;
    })
    .join('');
  const html = `
    <div style="font-family:Arial,sans-serif;color:#18181b;line-height:1.5">
      <h1 style="font-size:20px;margin:0 0 16px">${escapeHtml(title)}</h1>
      <table style="border-collapse:collapse;width:100%;max-width:720px">
        <tbody>${htmlRows}</tbody>
      </table>
      <style>
        th { text-align:left; width:260px; padding:10px; border:1px solid #e4e4e7; background:#f4f4f5; }
        td { padding:10px; border:1px solid #e4e4e7; }
      </style>
    </div>
  `;

  return { subject, text, html };
}

export function getLeadRecipient(type: LeadRequestInput['type']) {
  if (type === 'contact') {
    return process.env.CONTACT_FORM_TO || 'info@ticra.com.tr';
  }

  const envName = type === 'demo' ? 'DEMO_FORM_TO' : 'PURCHASE_FORM_TO';
  const fallbackAddress =
    type === 'demo' ? 'demo@ticra.com.tr' : 'sales@ticra.com.tr';

  return process.env[envName] || process.env.CONTACT_FORM_TO || fallbackAddress;
}

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateLimitBuckets = new Map<string, RateLimitBucket>();

function cleanRateLimitBuckets(now: number) {
  for (const [key, bucket] of rateLimitBuckets.entries()) {
    if (bucket.resetAt <= now) {
      rateLimitBuckets.delete(key);
    }
  }
}

function hitRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  cleanRateLimitBuckets(now);

  const current = rateLimitBuckets.get(key);
  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  return current.count > limit;
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const firstForwardedIp = forwardedFor?.split(',')[0]?.trim();

  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    firstForwardedIp ||
    'unknown'
  );
}

function getAllowedLeadOrigins(requestOrigin: string) {
  const configuredOrigins = (process.env.LEAD_FORM_ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return new Set([
    ...configuredOrigins,
    'https://ticra.com.tr',
    'https://www.ticra.com.tr',
    ...(!isProductionEnvironment() ? [requestOrigin] : []),
  ]);
}

export function isAllowedLeadOrigin(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const allowedOrigins = getAllowedLeadOrigins(requestOrigin);
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');

  if (!origin && !referer) {
    return !isProductionEnvironment();
  }

  if (origin && !allowedOrigins.has(origin)) {
    return false;
  }

  if (referer) {
    try {
      return allowedOrigins.has(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  return true;
}

export function isTooFastLeadRequest(input: LeadRequestInput) {
  if (!input.startedAt) {
    return true;
  }

  const elapsedMs = Date.now() - input.startedAt;

  return elapsedMs < 3000 || elapsedMs > 1000 * 60 * 60 * 24;
}

export function isLeadRateLimited(input: LeadRequestInput, ip: string) {
  const normalizedEmail = input.email.toLowerCase();
  const typeWindowKey = `${ip}:${input.type}`;
  const emailWindowKey = `${normalizedEmail}:${input.type}`;

  return (
    hitRateLimit(typeWindowKey, 5, 15 * 60 * 1000) ||
    hitRateLimit(emailWindowKey, 3, 60 * 60 * 1000)
  );
}

type TurnstileVerifyResponse = {
  success: boolean;
  'error-codes'?: string[];
  action?: string;
  hostname?: string;
};

function isProductionEnvironment() {
  return (
    process.env.NODE_ENV === 'production' ||
    process.env.VERCEL_ENV === 'production'
  );
}

function expectedTurnstileAction(type: LeadRequestInput['type']) {
  return `ticra-${type}`;
}

function isAllowedTurnstileHostname(hostname: string | undefined) {
  const configuredHostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const allowedHostnames = new Set([
    ...configuredHostnames,
    'ticra.com.tr',
    'www.ticra.com.tr',
    ...(!isProductionEnvironment() ? ['localhost', '127.0.0.1'] : []),
  ]);

  return Boolean(hostname && allowedHostnames.has(hostname));
}

export async function verifyTurnstileToken(
  input: LeadRequestInput,
  ip: string,
) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

  if (!secret || !siteKey) {
    return !isProductionEnvironment();
  }

  if (!input.turnstileToken) {
    return false;
  }

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret,
        response: input.turnstileToken,
        remoteip: ip,
      }),
    },
  );

  if (!response.ok) {
    return false;
  }

  const data = (await response.json().catch(() => null)) as
    | TurnstileVerifyResponse
    | null;

  if (data?.success !== true) {
    return false;
  }

  if (!isAllowedTurnstileHostname(data.hostname)) {
    return false;
  }

  return !data.action || data.action === expectedTurnstileAction(input.type);
}
