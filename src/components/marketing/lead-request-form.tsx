'use client';

import { Loader2 } from 'lucide-react';
import Script from 'next/script';
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Locale, SiteDictionary } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type LeadRequestFormProps = {
  type: 'demo' | 'purchase';
  locale: Locale;
  copy: SiteDictionary['contact']['demo'];
  moduleOptions: string[];
  packageOptions: SiteDictionary['packages']['plans'];
  selectedPackageCode?: string;
};

type ContactRequestFormProps = {
  locale: Locale;
  copy: SiteDictionary['contact']['general'];
};

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      theme: 'light';
      action: string;
      callback: (token: string) => void;
      'expired-callback': () => void;
      'error-callback': () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove?: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function Field({
  children,
  label,
  htmlFor,
}: {
  children: ReactNode;
  label: string;
  htmlFor: string;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="text-muted-foreground text-sm">{label}</span>
      {children}
    </label>
  );
}

function SubmitStatus({
  copy,
  state,
}: {
  copy: Pick<SiteDictionary['contact']['demo'], 'success' | 'error'>;
  state: SubmitState;
}) {
  const message =
    state === 'success' ? copy.success : state === 'error' ? copy.error : '';

  return (
    <p
      aria-live="polite"
      className={cn(
        'min-h-5 text-sm font-semibold',
        state === 'success' && 'text-success',
        state === 'error' && 'text-destructive',
        (state === 'idle' || state === 'submitting') && 'text-transparent',
      )}
    >
      {message}
    </p>
  );
}

async function submitPayload(payload: Record<string, unknown>) {
  const response = await fetch('/api/lead-requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Lead request failed');
  }
}

function TurnstileField({
  action,
  onVerify,
  resetSignal,
}: {
  action: string;
  onVerify: (token: string) => void;
  resetSignal: number;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!siteKey || !scriptReady || !containerRef.current || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile?.render(containerRef.current, {
      sitekey: siteKey,
      theme: 'light',
      action,
      callback: onVerify,
      'expired-callback': () => onVerify(''),
      'error-callback': () => onVerify(''),
    }) ?? null;

    return () => {
      if (widgetIdRef.current) {
        window.turnstile?.remove?.(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [action, onVerify, scriptReady, siteKey]);

  useEffect(() => {
    if (!siteKey || resetSignal === 0 || !widgetIdRef.current) {
      return;
    }

    window.turnstile?.reset(widgetIdRef.current);
    onVerify('');
  }, [onVerify, resetSignal, siteKey]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className="flex min-h-[68px] items-center">
      <Script
        id="ticra-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} />
    </div>
  );
}

export function LeadRequestForm({
  type,
  locale,
  copy,
  moduleOptions,
  packageOptions,
  selectedPackageCode,
}: LeadRequestFormProps) {
  const formId = useId();
  const [state, setState] = useState<SubmitState>('idle');
  const [startedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const isTurnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  const normalizedSelectedPackageCode = selectedPackageCode
    ? selectedPackageCode.toUpperCase()
    : '';
  const defaultPackageCode = packageOptions.some(
    (plan) => plan.code === normalizedSelectedPackageCode,
  )
    ? normalizedSelectedPackageCode
    : '';

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState('submitting');

    const payload = {
      type,
      locale,
      fullName: String(formData.get('fullName') || ''),
      companyName: String(formData.get('companyName') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      companySize: String(formData.get('companySize') || ''),
      expectedUsers: String(formData.get('expectedUsers') || ''),
      taxNumber: String(formData.get('taxNumber') || ''),
      packageCode: String(formData.get('packageCode') || ''),
      message: String(formData.get('message') || ''),
      website: String(formData.get('website') || ''),
      startedAt: Number(formData.get('startedAt') || 0),
      turnstileToken,
      interestedModules: formData.getAll('interestedModules').map(String),
    };

    const resetTurnstile = () => {
      setTurnstileToken('');
      setTurnstileResetSignal((current) => current + 1);
    };

    if (isTurnstileEnabled && !turnstileToken) {
      resetTurnstile();
      setState('error');
      return;
    }

    try {
      await submitPayload(payload);
      form.reset();
      resetTurnstile();
      setState('success');
    } catch {
      resetTurnstile();
      setState('error');
    }
  }

  const isSubmitting = state === 'submitting';
  const isSubmitDisabled =
    isSubmitting || (isTurnstileEnabled && !turnstileToken);

  return (
    <form
      id={type}
      onSubmit={onSubmit}
      className="bg-card border-border-light shadow-light flex h-full flex-col gap-6 rounded-[12px] border p-6 sm:p-8 md:p-10"
    >
      <div className="flex flex-col gap-2">
        <p className="text-tagline text-sm font-medium">{copy.badge}</p>
        <h2 className="text-foreground text-2xl font-medium">{copy.title}</h2>
        <p className="text-muted-foreground text-sm leading-6">
          {copy.description}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label={copy.fields.fullName} htmlFor={`${formId}-fullName`}>
          <Input
            id={`${formId}-fullName`}
            name="fullName"
            placeholder={copy.placeholders.fullName}
            autoComplete="name"
            className="h-11 rounded-[8px]"
            required
          />
        </Field>
        <Field label={copy.fields.companyName} htmlFor={`${formId}-company`}>
          <Input
            id={`${formId}-company`}
            name="companyName"
            placeholder={copy.placeholders.companyName}
            autoComplete="organization"
            className="h-11 rounded-[8px]"
            required
          />
        </Field>
        <Field label={copy.fields.email} htmlFor={`${formId}-email`}>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            placeholder={copy.placeholders.email}
            autoComplete="email"
            className="h-11 rounded-[8px]"
            required
          />
        </Field>
        <Field label={copy.fields.phone} htmlFor={`${formId}-phone`}>
          <Input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            placeholder={copy.placeholders.phone}
            autoComplete="tel"
            className="h-11 rounded-[8px]"
            required
          />
        </Field>
        <Field label={copy.fields.companySize} htmlFor={`${formId}-size`}>
          <Input
            id={`${formId}-size`}
            name="companySize"
            placeholder={copy.placeholders.companySize}
            className="h-11 rounded-[8px]"
          />
        </Field>
        <Field label={copy.fields.expectedUsers} htmlFor={`${formId}-users`}>
          <Input
            id={`${formId}-users`}
            name="expectedUsers"
            placeholder={copy.placeholders.expectedUsers}
            className="h-11 rounded-[8px]"
          />
        </Field>
      </div>

      <Field label={copy.fields.taxNumber} htmlFor={`${formId}-tax`}>
        <Input
          id={`${formId}-tax`}
          name="taxNumber"
          placeholder={copy.placeholders.taxNumber}
          className="h-11 rounded-[8px]"
        />
      </Field>

      {type === 'purchase' ? (
        <Field label={copy.fields.package} htmlFor={`${formId}-package`}>
          <select
            id={`${formId}-package`}
            name="packageCode"
            defaultValue={defaultPackageCode}
            required
            className={cn(
              'border-input bg-background ring-offset-background flex h-11 w-full rounded-[8px] border px-3 py-2 text-sm shadow-xs transition-colors',
              'focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50',
            )}
          >
            <option value="">{copy.placeholders.package}</option>
            {packageOptions.map((plan) => (
              <option key={plan.code} value={plan.code}>
                {plan.name} - {plan.price}
              </option>
            ))}
          </select>
        </Field>
      ) : null}

      <fieldset className="flex flex-col gap-3">
        <legend className="text-muted-foreground text-sm font-semibold">
          {copy.fields.modules}
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {moduleOptions.map((module) => (
            <label
              key={module}
              className="border-border bg-accent hover:bg-muted flex items-center gap-2 rounded-[8px] border px-3 py-2 text-sm font-medium transition-colors"
            >
              <input
                type="checkbox"
                name="interestedModules"
                value={module}
                className="accent-primary size-4"
              />
              <span>{module}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label={copy.fields.message} htmlFor={`${formId}-message`}>
        <Textarea
          id={`${formId}-message`}
          name="message"
          placeholder={copy.placeholders.message}
          className="min-h-28 resize-y rounded-[8px]"
        />
      </Field>

      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>{copy.fields.website}</label>
        <input
          id={`${formId}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <input type="hidden" name="startedAt" value={startedAt} readOnly />
      <input
        type="hidden"
        name="turnstileToken"
        value={turnstileToken}
        readOnly
      />
      <TurnstileField
        action={`ticra-${type}`}
        onVerify={setTurnstileToken}
        resetSignal={turnstileResetSignal}
      />

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          disabled={isSubmitDisabled}
          className="bg-foreground text-primary-foreground hover:bg-foreground/90 mt-2 h-12 w-full rounded-[8px]"
        >
          {isSubmitting ? (
            <Loader2
              data-icon="inline-start"
              className="animate-spin"
              aria-hidden="true"
            />
          ) : null}
          {copy.submit}
        </Button>
        <SubmitStatus copy={copy} state={state} />
      </div>
    </form>
  );
}

export function ContactRequestForm({ locale, copy }: ContactRequestFormProps) {
  const formId = useId();
  const [state, setState] = useState<SubmitState>('idle');
  const [startedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const isTurnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState('submitting');

    const payload = {
      type: 'contact',
      locale,
      fullName: String(formData.get('fullName') || ''),
      companyName: String(formData.get('companyName') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      subject: String(formData.get('subject') || ''),
      message: String(formData.get('message') || ''),
      website: String(formData.get('website') || ''),
      startedAt: Number(formData.get('startedAt') || 0),
      turnstileToken,
    };

    const resetTurnstile = () => {
      setTurnstileToken('');
      setTurnstileResetSignal((current) => current + 1);
    };

    if (isTurnstileEnabled && !turnstileToken) {
      resetTurnstile();
      setState('error');
      return;
    }

    try {
      await submitPayload(payload);
      form.reset();
      resetTurnstile();
      setState('success');
    } catch {
      resetTurnstile();
      setState('error');
    }
  }

  const isSubmitting = state === 'submitting';
  const isSubmitDisabled =
    isSubmitting || (isTurnstileEnabled && !turnstileToken);

  return (
    <form
      id="contact"
      onSubmit={onSubmit}
      className="bg-card border-border-light shadow-light mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-[12px] border p-6 sm:p-8 md:p-10"
    >
      <div className="flex flex-col gap-2">
        <p className="text-tagline text-sm font-medium">{copy.badge}</p>
        <h2 className="text-foreground text-2xl font-medium">{copy.title}</h2>
        <p className="text-muted-foreground text-sm leading-6">
          {copy.description}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label={copy.fields.fullName} htmlFor={`${formId}-fullName`}>
          <Input
            id={`${formId}-fullName`}
            name="fullName"
            placeholder={copy.placeholders.fullName}
            autoComplete="name"
            className="h-11 rounded-[8px]"
            required
          />
        </Field>
        <Field label={copy.fields.companyName} htmlFor={`${formId}-company`}>
          <Input
            id={`${formId}-company`}
            name="companyName"
            placeholder={copy.placeholders.companyName}
            autoComplete="organization"
            className="h-11 rounded-[8px]"
          />
        </Field>
        <Field label={copy.fields.email} htmlFor={`${formId}-email`}>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            placeholder={copy.placeholders.email}
            autoComplete="email"
            className="h-11 rounded-[8px]"
            required
          />
        </Field>
        <Field label={copy.fields.phone} htmlFor={`${formId}-phone`}>
          <Input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            placeholder={copy.placeholders.phone}
            autoComplete="tel"
            className="h-11 rounded-[8px]"
          />
        </Field>
      </div>

      <Field label={copy.fields.subject} htmlFor={`${formId}-subject`}>
        <Input
          id={`${formId}-subject`}
          name="subject"
          placeholder={copy.placeholders.subject}
          className="h-11 rounded-[8px]"
          required
        />
      </Field>

      <Field label={copy.fields.message} htmlFor={`${formId}-message`}>
        <Textarea
          id={`${formId}-message`}
          name="message"
          placeholder={copy.placeholders.message}
          className="min-h-36 resize-y rounded-[8px]"
          required
        />
      </Field>

      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>{copy.fields.website}</label>
        <input
          id={`${formId}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <input type="hidden" name="startedAt" value={startedAt} readOnly />
      <input
        type="hidden"
        name="turnstileToken"
        value={turnstileToken}
        readOnly
      />
      <TurnstileField
        action="ticra-contact"
        onVerify={setTurnstileToken}
        resetSignal={turnstileResetSignal}
      />

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          disabled={isSubmitDisabled}
          className="bg-foreground text-primary-foreground hover:bg-foreground/90 mt-2 h-12 w-full rounded-[8px]"
        >
          {isSubmitting ? (
            <Loader2
              data-icon="inline-start"
              className="animate-spin"
              aria-hidden="true"
            />
          ) : null}
          {copy.submit}
        </Button>
        <SubmitStatus copy={copy} state={state} />
      </div>
    </form>
  );
}
