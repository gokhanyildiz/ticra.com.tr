import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  TicraMetafiCta,
  TicraMetafiFaq,
  TicraMetafiFeatures,
  TicraMetafiIntegrations,
} from '@/components/marketing/metafi-home-sections';
import { PricingCards } from '@/components/marketing/pricing-cards';
import { Button } from '@/components/ui/button';
import { GridBackground } from '@/components/ui/grid-background';
import { type Locale, localizePath, type SiteDictionary } from '@/lib/i18n';

type HomePageProps = {
  locale: Locale;
  dict: SiteDictionary;
};

export function HomePage({ locale, dict }: HomePageProps) {
  const processCopy =
    locale === 'tr'
      ? {
          eyebrow: 'Canlıya geçiş',
          title: 'Demo, canlıya hazırlık ve canlı kullanım',
          pilotTitle: 'Canlıya Hazırlık',
          pilotDescription:
            'İhtiyaç varsa gerçek verilerinizle sınırlı değerlendirme ortamı planlanır.',
          liveTitle: 'Canlı kullanım',
          liveDescription:
            'Teklif kapsamı netleşir, ekip canlı kullanıma geçiş akışını hazırlar.',
        }
      : {
          eyebrow: 'Go-live path',
          title: 'Demo, go-live preparation and live use',
          pilotTitle: 'Go-live preparation',
          pilotDescription:
            'If needed, a limited evaluation workspace is planned with your real data.',
          liveTitle: 'Live use',
          liveDescription:
            'The quote scope is clarified and the team prepares the go-live flow.',
        };

  const pricingHighlightRows = [0, 1, 12].flatMap((index) => {
    const row = dict.packages.comparisonRows[index];
    return row ? [row] : [];
  });

  const processSteps = [
    {
      title: dict.contact.demo.badge,
      description: dict.contact.demo.description,
      Icon: ClipboardList,
    },
    {
      title: processCopy.pilotTitle,
      description: processCopy.pilotDescription,
      Icon: BadgeCheck,
    },
    {
      title: processCopy.liveTitle,
      description: processCopy.liveDescription,
      Icon: ShieldCheck,
    },
  ];

  return (
    <>
      <section
        id="ticra-hero"
        className="bg-background border-border relative overflow-hidden border-b px-6 lg:px-0"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 bottom-0 h-[560px] md:h-[720px]">
            <Image
              src="/images/homepage/hero/Gradient.webp"
              alt=""
              fill
              preload
              className="object-cover opacity-25"
            />
            <GridBackground className="[background-size:calc(var(--square-size,64px))_calc(var(--square-size,64px))]" />
            <div className="from-background to-background/0 absolute inset-x-0 top-0 h-40 bg-gradient-to-b" />
          </div>
        </div>

        <div className="relative container px-0 md:px-6">
          <div className="flex flex-col items-center gap-8 py-10 sm:py-12 lg:pt-16 lg:pb-14">
            <div className="reveal-up mx-auto flex max-w-4xl flex-col items-center gap-5 text-center">
              <div className="border-border bg-card/80 text-primary inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold backdrop-blur">
                <span className="bg-brand-gradient size-2 rounded-full" />
                {dict.home.eyebrow}
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-foreground text-3xl leading-tight font-bold text-balance sm:text-5xl lg:text-[58px]">
                  {dict.home.title}
                </h1>
                <p className="text-muted-foreground mx-auto max-w-3xl text-base leading-7 sm:text-lg md:leading-8">
                  {dict.home.description}
                </p>
              </div>
              <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Button asChild className="w-full sm:w-auto">
                  <Link href={localizePath('/demo', locale)}>
                    {dict.home.primaryCta}
                    <ArrowRight data-icon="inline-end" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href={localizePath('/purchase', locale)}>
                    {dict.home.secondaryCta}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="soft-float reveal-up border-border-light bg-card/80 shadow-soft mx-auto w-full max-w-6xl overflow-hidden rounded-[8px] border p-2 backdrop-blur">
              <div className="border-border-light flex items-center justify-between border-b px-3 py-2">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="size-2 rounded-full bg-red-400" />
                  <span className="size-2 rounded-full bg-amber-400" />
                  <span className="size-2 rounded-full bg-emerald-400" />
                </div>
                <span className="text-muted-foreground min-w-0 truncate text-xs font-semibold">
                  {dict.home.previewAlt}
                </span>
              </div>
              <Image
                src="/images/ticra/dashboard-wide.png"
                alt={dict.home.previewAlt}
                width={1734}
                height={886}
                preload
                sizes="(max-width: 1024px) 100vw, 1120px"
                className="max-h-[260px] w-full rounded-[6px] object-cover object-top sm:max-h-[420px] lg:max-h-[520px]"
              />
            </div>
          </div>
        </div>
      </section>

      <TicraMetafiFeatures dict={dict} tone="muted" />

      <section id="pricing" className="bg-white border-y">
        <div className="container flex flex-col gap-10 py-16 lg:py-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-3 text-center">
            <p className="text-primary text-sm font-semibold">
              {dict.packages.eyebrow}
            </p>
            <h2 className="text-foreground text-3xl leading-tight font-bold md:text-5xl">
              {dict.packages.title}
            </h2>
            <p className="text-muted-foreground text-base leading-7">
              {dict.packages.description}
            </p>
          </div>

          <PricingCards
            locale={locale}
            plans={dict.packages.plans}
            highlightRows={pricingHighlightRows}
            comparisonRows={dict.packages.comparisonRows}
            comparisonTitle={dict.packages.comparisonTitle}
            comparisonDescription={dict.packages.comparisonDescription}
            comparisonFeatureLabel={dict.packages.comparisonFeatureLabel}
            footnote={dict.packages.footnote}
          />
        </div>
      </section>

      <section className="metafi-template-scope metafi-muted-section bg-background border-b px-6 lg:px-0">
        <div className="container grid gap-8 px-0 py-14 md:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-20">
          <div className="flex max-w-xl flex-col gap-3">
            <p className="text-primary text-sm font-semibold">
              {processCopy.eyebrow}
            </p>
            <h2 className="text-foreground text-3xl leading-tight font-bold md:text-5xl">
              {processCopy.title}
            </h2>
            <p className="text-muted-foreground text-base leading-7">
              {dict.home.ctaDescription}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {processSteps.map(({ title, description, Icon }, index) => (
              <article
                key={title}
                className="border-border-light bg-card flex min-h-44 flex-col gap-4 rounded-[8px] border p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-[8px]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-muted-foreground text-xs font-bold">
                    0{index + 1}
                  </span>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-foreground text-lg font-bold">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-6">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="metafi-template-scope bg-background border-y px-6 lg:px-0">
        <div className="container flex flex-col gap-10 px-0 py-16 md:px-6 lg:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <div className="bg-accent/10 text-accent-foreground border-accent/20 flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold">
              <ShieldCheck aria-hidden="true" />
              Ticra
            </div>
            <h2 className="text-foreground text-3xl leading-tight font-bold md:text-5xl">
              {dict.home.operationsTitle}
            </h2>
            <p className="text-muted-foreground text-base leading-7">
              {dict.home.operationsDescription}
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <ul className="grid gap-3">
              {dict.home.operations.map((item) => (
                <li
                  key={item}
                  className="text-foreground flex items-start gap-3 text-sm font-semibold"
                >
                  <BadgeCheck
                    className="text-success mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="border-border-light bg-card shadow-soft reveal-up overflow-hidden rounded-[8px] border p-2">
              <Image
                src="/images/ticra/app-preview.png"
                alt={dict.home.previewAlt}
                width={1672}
                height={941}
                className="h-auto w-full rounded-[6px] object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 680px"
              />
            </div>
          </div>
        </div>
      </section>

      <TicraMetafiIntegrations locale={locale} dict={dict} tone="muted" />
      <TicraMetafiFaq dict={dict} />
      <TicraMetafiCta locale={locale} dict={dict} />
    </>
  );
}
