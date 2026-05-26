const GOOGLE_OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GMAIL_SEND_URL =
  'https://gmail.googleapis.com/gmail/v1/users/me/messages/send';

type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  headers?: Record<string, string>;
};

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required for Gmail API email delivery`);
  }

  return value;
}

function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function encodeMimeHeader(value: string) {
  const sanitized = sanitizeHeaderValue(value);

  if (/^[\x20-\x7E]*$/.test(sanitized)) {
    return sanitized;
  }

  return `=?UTF-8?B?${Buffer.from(sanitized, 'utf8').toString('base64')}?=`;
}

function encodeMimePart(value: string) {
  return Buffer.from(value, 'utf8').toString('base64');
}

function encodeBase64Url(value: string) {
  return Buffer.from(value, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function resolveFromAddress() {
  const sender = requiredEnv('EMAIL_SENDER_ADDRESS');
  const senderName = process.env.EMAIL_SENDER_NAME || 'Ticra';

  if (/<[^>]+>/.test(sender)) {
    return sender;
  }

  return `${senderName} <${sender}>`;
}

function buildGmailRawMessage(input: SendEmailInput) {
  const boundary = `ticra_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2)}`;
  const to = Array.isArray(input.to) ? input.to.join(', ') : input.to;
  const headers = [
    ['From', encodeMimeHeader(resolveFromAddress())],
    ['To', sanitizeHeaderValue(to)],
    ['Subject', encodeMimeHeader(input.subject)],
    ['MIME-Version', '1.0'],
    ['Content-Type', `multipart/alternative; boundary="${boundary}"`],
  ];
  const replyTo = input.replyTo || process.env.EMAIL_REPLY_TO;

  if (replyTo) {
    headers.push(['Reply-To', sanitizeHeaderValue(replyTo)]);
  }

  Object.entries(input.headers || {}).forEach(([key, value]) => {
    if (/^[A-Za-z0-9-]+$/.test(key)) {
      headers.push([key, sanitizeHeaderValue(value)]);
    }
  });

  const parts = [
    [
      `--${boundary}`,
      'Content-Type: text/plain; charset="UTF-8"',
      'Content-Transfer-Encoding: base64',
      '',
      encodeMimePart(input.text),
    ].join('\r\n'),
    [
      `--${boundary}`,
      'Content-Type: text/html; charset="UTF-8"',
      'Content-Transfer-Encoding: base64',
      '',
      encodeMimePart(input.html),
    ].join('\r\n'),
    `--${boundary}--`,
  ];

  return [...headers.map(([key, value]) => `${key}: ${value}`), '', ...parts]
    .join('\r\n');
}

async function resolveGmailApiAccessToken() {
  const response = await fetch(GOOGLE_OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: requiredEnv('EMAIL_OAUTH_CLIENT_ID'),
      client_secret: requiredEnv('EMAIL_OAUTH_CLIENT_SECRET'),
      refresh_token: requiredEnv('EMAIL_OAUTH_REFRESH_TOKEN'),
      grant_type: 'refresh_token',
    }),
  });
  const payload = (await response.json().catch(() => ({}))) as {
    access_token?: unknown;
  };

  if (!response.ok || typeof payload.access_token !== 'string') {
    throw new Error('Gmail API OAuth refresh failed');
  }

  return payload.access_token;
}

export async function sendEmail(input: SendEmailInput) {
  const mode = process.env.EMAIL_DELIVERY_MODE || 'gmail-api';

  if (mode === 'noop') {
    return { id: 'suppressed' };
  }

  if (mode !== 'gmail-api' && mode !== 'auto') {
    throw new Error('Only gmail-api email delivery is configured for this site');
  }

  const accessToken = await resolveGmailApiAccessToken();
  const response = await fetch(GMAIL_SEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: encodeBase64Url(buildGmailRawMessage(input)),
    }),
  });

  if (!response.ok) {
    throw new Error(`Gmail API send failed: ${response.status}`);
  }

  return response.json().catch(() => ({}));
}
