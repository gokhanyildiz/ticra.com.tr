import { NextResponse } from 'next/server';

import { sendEmail } from '@/lib/email';
import {
  buildLeadRequestEmail,
  getClientIp,
  getLeadRecipient,
  isAllowedLeadOrigin,
  isLeadRateLimited,
  isTooFastLeadRequest,
  leadRequestSchema,
  verifyTurnstileToken,
} from '@/lib/lead-request';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!isAllowedLeadOrigin(request)) {
    return NextResponse.json(
      { ok: false, error: 'invalid_origin' },
      { status: 403 },
    );
  }

  const rawBody = await request.text().catch(() => '');
  if (rawBody.length > 12_000) {
    return NextResponse.json(
      { ok: false, error: 'payload_too_large' },
      { status: 413 },
    );
  }

  const body = rawBody
    ? (() => {
        try {
          return JSON.parse(rawBody) as unknown;
        } catch {
          return null;
        }
      })()
    : null;
  const parsed = leadRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'invalid_request',
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  const input = parsed.data;

  if (input.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = getClientIp(request);

  if (isTooFastLeadRequest(input)) {
    return NextResponse.json(
      { ok: false, error: 'form_timing_failed' },
      { status: 400 },
    );
  }

  const turnstileOk = await verifyTurnstileToken(input, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { ok: false, error: 'turnstile_failed' },
      { status: 403 },
    );
  }

  if (isLeadRateLimited(input, ip)) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429 },
    );
  }

  const email = buildLeadRequestEmail(input);
  const recipient = getLeadRecipient(input.type);

  try {
    await sendEmail({
      to: recipient,
      subject: email.subject,
      html: email.html,
      text: email.text,
      replyTo: input.email,
      headers: {
        'X-Ticra-Lead-Type': input.type,
        'X-Ticra-Lead-Locale': input.locale,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Lead request email delivery failed', {
      type: input.type,
      recipient,
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      { ok: false, error: 'email_delivery_failed' },
      { status: 502 },
    );
  }
}
