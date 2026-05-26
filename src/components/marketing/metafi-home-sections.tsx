'use client';

import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import AnimationCheckout from '@/components/ui/animation-checkout';
import AnimationInvoicing from '@/components/ui/animation-invoicing';
import AnimationPaymentLink from '@/components/ui/animation-payment-link';
import AnimationRecurringBilling from '@/components/ui/animation-recurring-bill';
import { Button } from '@/components/ui/button';
import { type Locale, localizePath, type SiteDictionary } from '@/lib/i18n';

type TicraSectionProps = {
  dict: SiteDictionary;
};

type LocalizedSectionProps = TicraSectionProps & {
  locale: Locale;
};

type SectionTone = 'white' | 'muted';

type TonedSectionProps = TicraSectionProps & {
  tone?: SectionTone;
};

type TonedLocalizedSectionProps = LocalizedSectionProps & {
  tone?: SectionTone;
};

type Feature = {
  title: string;
  description: string;
  image: string;
  visual: 'checkout' | 'recurring' | 'invoicing' | 'payment';
};

type Integration = {
  name: string;
  description: string;
  icon: string;
};

type QA = {
  question: string;
  answer: string;
};

function metafiSectionClass(tone: SectionTone, className: string) {
  return [
    'metafi-template-scope',
    tone === 'muted' ? 'metafi-muted-section' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

function FeatureCard({ feature }: { feature: Feature }) {
  const isCheckout = feature.visual === 'checkout';
  const isRecurring = feature.visual === 'recurring';
  const isInvoicing = feature.visual === 'invoicing';
  const isPayment = feature.visual === 'payment';

  return (
    <div className="bg-card border-border-light relative flex flex-col rounded-[16px] border p-6 text-left shadow-[0_2px_8px_-1px_rgba(13,13,18,0.04)]">
      <h3 className="text-foreground text-lg font-medium sm:text-xl">
        {feature.title}
      </h3>
      <p className="text-muted-foreground mt-2 text-sm sm:text-base">
        {feature.description}
      </p>

      <div className="relative mt-6 w-full overflow-hidden rounded-[12px]">
        <div className="bg-accent relative h-[220px] w-full sm:h-[260px] md:h-[300px]">
          {isRecurring ? (
            <AnimationRecurringBilling className="absolute inset-0" />
          ) : isCheckout ? (
            <AnimationCheckout className="absolute inset-0" />
          ) : isInvoicing ? (
            <AnimationInvoicing className="absolute inset-0" />
          ) : isPayment ? (
            <AnimationPaymentLink className="absolute inset-0" />
          ) : (
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function TicraMetafiFeatures({
  dict,
  tone = 'white',
}: TonedSectionProps) {
  const [m1, m2, m3, m4] = dict.home.modules;
  const features: [Feature, Feature, Feature, Feature] = [
    {
      title: m1?.title ?? '',
      description: m1?.description ?? '',
      image: '/images/homepage/features/animation1.svg',
      visual: 'checkout',
    },
    {
      title: m2?.title ?? '',
      description: m2?.description ?? '',
      image: '/images/homepage/features/recurring-billing.webp',
      visual: 'recurring',
    },
    {
      title: m3?.title ?? '',
      description: m3?.description ?? '',
      image: '/images/homepage/features/invoicing.webp',
      visual: 'invoicing',
    },
    {
      title: m4?.title ?? '',
      description: m4?.description ?? '',
      image: '/images/homepage/features/payment-link.webp',
      visual: 'payment',
    },
  ];

  const [f1, f2, f3, f4] = features;

  return (
    <section
      id="metafi-features"
      className={metafiSectionClass(tone, 'bg-background px-6 lg:px-0')}
    >
      <div className="container px-0 py-16 sm:py-20 md:px-6 md:py-28">
        <p className="text-tagline mb-4 text-center text-sm sm:text-base">
          {dict.features.eyebrow}
        </p>

        <h2 className="text-foreground mx-auto max-w-3xl text-center text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl md:text-5xl">
          {dict.home.modulesTitle}
        </h2>

        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-base sm:text-lg">
          {dict.home.modulesDescription}
        </p>

        <div className="mt-12 flex flex-col gap-6 md:mt-14 md:gap-8 lg:flex-row">
          <div className="lg:flex-1">
            <FeatureCard feature={f1} />
          </div>
          <div className="lg:w-[500px]">
            <FeatureCard feature={f2} />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6 md:mt-8 md:gap-8 lg:flex-row">
          <div className="lg:w-[500px]">
            <FeatureCard feature={f3} />
          </div>
          <div className="lg:flex-1">
            <FeatureCard feature={f4} />
          </div>
        </div>
      </div>
    </section>
  );
}

function IntegrationCard({
  item,
  tone,
}: {
  item: Integration;
  tone: SectionTone;
}) {
  return (
    <li
      className={[
        'relative rounded-[16px] p-6 pb-8',
        tone === 'muted'
          ? 'bg-card border-border-light shadow-light border'
          : 'bg-accent',
      ].join(' ')}
    >
      <div className="pointer-events-none absolute -top-8 left-1/2 flex -translate-x-1/2 items-center justify-center">
        <div className="flex items-center justify-center rounded-full">
          <Image
            src={item.icon}
            alt={`${item.name} logo`}
            width={60}
            height={60}
            className="size-[60px] object-contain"
          />
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-foreground text-[20px] leading-tight font-medium">
          {item.name}
        </h3>
        <p className="text-muted-foreground mt-2 text-base font-normal">
          {item.description}
        </p>
      </div>
    </li>
  );
}

export function TicraMetafiIntegrations({
  locale,
  dict,
  tone = 'white',
}: TonedLocalizedSectionProps) {
  const buttonLabel =
    locale === 'tr' ? 'Tüm Entegrasyonlar' : 'See All Integrations';

  return (
    <section
      id="metafi-integrations"
      className={metafiSectionClass(tone, 'bg-background px-6 lg:px-0')}
    >
      <div className="container px-0 py-16 text-center sm:py-20 md:px-6 md:py-28">
        <p className="text-tagline mb-4 text-sm leading-tight sm:text-base">
          {dict.integrations.eyebrow}
        </p>

        <h2 className="text-foreground mx-auto max-w-3xl text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl md:text-5xl">
          {dict.integrations.title}
        </h2>

        <ul className="mt-10 grid gap-12 sm:grid-cols-2 sm:gap-6 md:mt-20 md:gap-8 lg:grid-cols-3 [@media(min-width:1024px)]:[&>li:nth-child(n+4)]:mt-8">
          {dict.integrations.items.map((item) => (
            <IntegrationCard key={item.name} item={item} tone={tone} />
          ))}
        </ul>

        <p className="text-muted-foreground text-md text-md mx-auto mt-10 max-w-3xl font-normal md:mt-20">
          {dict.integrations.description}
        </p>

        <div className="mt-6 flex justify-center">
          <Button className="w-full sm:w-auto" asChild>
            <Link href={localizePath('/integrations', locale)}>
              {buttonLabel}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  id,
  qa,
  open,
  onToggle,
}: {
  id: string;
  qa: QA;
  open: boolean;
  onToggle: (id: string) => void;
}) {
  const regionId = `${id}-region`;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>(open ? 'auto' : 0);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    if (open) {
      const h = contentRef.current.scrollHeight;
      setHeight(h);
    } else {
      const current = wrapperRef.current?.offsetHeight ?? 0;
      setHeight(current);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [open, qa.answer]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onEnd = () => {
      if (open) setHeight('auto');
    };
    el.addEventListener('transitionend', onEnd);
    return () => el.removeEventListener('transitionend', onEnd);
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (!contentRef.current) return;
      if (open) {
        const h = contentRef.current.scrollHeight;
        if (height !== 'auto') setHeight(h);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open, height]);

  return (
    <div
      className={[
        'bg-card rounded-[16px] border px-4 py-2 sm:px-6 sm:py-4',
        'border-border shadow-[0_2px_8px_-1px_rgba(13,13,18,0.04)]',
      ].join(' ')}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => onToggle(id)}
        className={[
          'group flex w-full items-center justify-between gap-4 text-left',
          'text-foreground text-xl leading-tight font-medium sm:text-2xl',
          'hover:no-underline',
          'py-1 sm:py-2',
        ].join(' ')}
      >
        <span className="pr-2">{qa.question}</span>
        <span
          className={[
            'flex size-6 items-center justify-center rounded-[6px] border',
            open
              ? 'border-tagline bg-tagline/10 text-tagline'
              : 'border-border text-muted-foreground',
          ].join(' ')}
          aria-hidden
        >
          {open ? (
            <Minus className="size-3" strokeWidth={2} />
          ) : (
            <Plus className="size-3" strokeWidth={2} />
          )}
        </span>
      </button>

      <div
        id={regionId}
        role="region"
        aria-hidden={!open}
        ref={wrapperRef}
        style={{ height, transition: 'height 200ms ease' }}
        className="overflow-hidden"
      >
        <div
          ref={contentRef}
          className="text-muted-foreground mt-2 text-sm font-normal whitespace-pre-wrap sm:text-base"
        >
          {qa.answer}
        </div>
      </div>
    </div>
  );
}

export function TicraMetafiFaq({ dict, tone = 'white' }: TonedSectionProps) {
  const [value, setValue] = useState<string | undefined>(undefined);
  const handleToggle = (id: string) =>
    setValue((curr) => (curr === id ? undefined : id));

  return (
    <section
      id="metafi-faq"
      className={metafiSectionClass(tone, 'bg-background px-6 lg:px-0')}
    >
      <div className="container px-0 py-16 sm:py-20 md:px-6 lg:py-28">
        <p className="text-tagline mb-4 text-center text-sm leading-tight font-normal sm:text-base">
          FAQ
        </p>

        <h2 className="text-foreground mx-auto mb-4 max-w-3xl text-center text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl">
          {dict.home.faqTitle}
        </h2>

        <p className="text-muted-foreground mx-auto max-w-2xl text-center text-base font-normal sm:text-lg">
          {dict.home.ctaDescription}
        </p>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4 sm:mt-14">
          {dict.home.faqs.map((qa, i) => {
            const id = `item-${i + 1}`;
            const open = value === id;
            return (
              <FaqItem
                key={id}
                id={id}
                qa={qa}
                open={open}
                onToggle={handleToggle}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TicraMetafiCta({ locale, dict }: LocalizedSectionProps) {
  return (
    <section
      id="metafi-cta"
      className="metafi-template-scope bg-tagline relative overflow-hidden px-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-[size:16px_16px] [color:oklch(1_0_89.88)] opacity-30" />

      <div className="bg-tagline pointer-events-none absolute top-0 left-1/2 h-full w-[500px] -translate-x-1/2" />

      <div className="relative container px-0 py-16 text-center sm:py-20 md:px-6 md:py-28">
        <h2 className="text-primary-foreground mx-auto max-w-5xl text-4xl leading-tight font-medium text-balance sm:text-5xl md:text-6xl">
          {dict.home.ctaTitle}
        </h2>

        <p className="text-primary-foreground/80 mx-auto mt-4 max-w-2xl text-base font-normal sm:text-lg">
          {dict.home.ctaDescription}
        </p>

        <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            className="bg-primary-foreground text-tagline hover:bg-primary-foreground/90 h-12 w-full rounded-[12px] sm:w-auto"
          >
            <Link href={localizePath('/demo', locale)}>
              {dict.home.primaryCta}
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-12 w-full rounded-[12px] border bg-transparent sm:w-auto"
          >
            <Link href={localizePath('/purchase', locale)}>
              {dict.home.secondaryCta}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
