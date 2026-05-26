import Image from 'next/image';
import Link from 'next/link';

import {
  TicraMetafiCta,
  TicraMetafiIntegrations,
} from '@/components/marketing/metafi-home-sections';
import { Button } from '@/components/ui/button';
import {
  type Locale,
  localizePath,
  type SiteDictionary,
} from '@/lib/i18n';

type FeaturesPageProps = {
  locale: Locale;
  dict: SiteDictionary;
};

const includedIcons = [
  '/images/features/included/payments.svg',
  '/images/features/included/checkout.svg',
  '/images/features/included/payment-link.svg',
  '/images/features/included/connect.svg',
  '/images/features/included/billing.svg',
  '/images/features/included/invoicing.svg',
  '/images/features/included/revenue.svg',
  '/images/features/included/connections.svg',
  '/images/features/included/data-pipeline.svg',
];

const benefitIcons = [
  '/images/features/bar.svg',
  '/images/features/bell.svg',
  '/images/features/server.svg',
];

export function FeaturesPage({ locale, dict }: FeaturesPageProps) {
  const benefits = dict.features.groups.slice(0, 3);
  const includedItems = [
    {
      title: dict.features.languageSupport.title,
      description: dict.features.languageSupport.description,
    },
    ...dict.features.groups,
  ];
  const pricingCopy =
    locale === 'tr'
      ? {
          overline: 'Kurumsal kullanım',
          title: 'Ticra modülleri tek şirket verisi üzerinde çalışır',
          description:
            'Satış, satın alma, stok, finans, servis, proje ve İK kayıtları ayrı ekranlarda ilerlerken aynı şirket bağlamını paylaşır.',
        }
      : {
          overline: 'Business use',
          title: 'Ticra modules run on one company data model',
          description:
            'Sales, purchasing, inventory, finance, service, project and HR records move through separate screens while sharing the same company context.',
        };
  const includedTitle =
    locale === 'tr' ? 'Modül ve altyapı kapsamı' : 'Module and platform scope';
  const includedSubtitle =
    locale === 'tr'
      ? 'Ticra’nın ana modülleri, altyapı yetenekleri ve destek kapsamı bu bölümde özetlenir.'
      : 'Ticra’s core modules, platform capabilities and support scope are summarized in this section.';

  return (
    <>
      <section
        id="metafi-features-hero"
        className="metafi-template-scope bg-background px-6 lg:px-0"
      >
        <div className="container px-0 md:px-6">
          <div className="bg-features-hero relative overflow-hidden">
            <div className="grid items-center gap-8 p-6 sm:p-8 md:gap-12 md:p-12 lg:grid-cols-2">
              <div className="max-w-xl">
                <p className="text-tagline mb-2 text-sm sm:text-base">
                  {dict.features.eyebrow}
                </p>

                <h1 className="text-foreground text-[36px] leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[64px]">
                  {dict.features.title}
                </h1>

                <p className="text-muted-foreground mt-4 text-base sm:text-lg">
                  {dict.features.description}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-start sm:gap-4">
                  <Button asChild className="w-full sm:w-auto">
                    <Link href={localizePath('/demo', locale)}>
                      {dict.nav.demo}
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link href={localizePath('/purchase', locale)}>
                      {dict.nav.purchase}
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative flex justify-center">
                <div className="border-border-light shadow-soft relative aspect-[10/9] w-full max-w-[1000px] overflow-hidden rounded-[16px] border bg-white lg:w-[500px]">
                  <Image
                    src="/images/ticra/app-preview.png"
                    alt={dict.home.previewAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-6 sm:h-8" />
        </div>
      </section>

      <section
        id="metafi-feature-benefits"
        className="metafi-template-scope metafi-muted-section bg-background px-6 lg:px-0"
      >
        <div className="container px-0 py-12 sm:py-16 md:px-6 md:py-20">
          <ul className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <li key={benefit.title} className="text-start">
                <div className="border-border-light shadow-soft mb-6 flex h-[44px] w-[44px] items-center justify-center rounded-[12px] border bg-white">
                  <Image
                    src={benefitIcons[index % benefitIcons.length]}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>

                <h3 className="text-foreground text-base font-medium sm:text-lg">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground mx-auto mt-2 text-sm sm:text-base">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="metafi-features-included"
        className="metafi-template-scope bg-background px-6 lg:px-0"
      >
        <div className="container px-0 py-16 sm:py-20 md:py-24">
          <div className="text-center">
            <p className="text-tagline text-sm sm:text-base">
              {dict.features.eyebrow}
            </p>
            <h2 className="text-foreground mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
              {includedTitle}
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-sm sm:text-base">
              {includedSubtitle}
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-18 md:gap-x-12 md:gap-y-18 lg:grid-cols-3">
            {includedItems.map((item, index) => (
              <li key={item.title} className="text-center">
                <div
                  className="border-border-light bg-card shadow-light mx-auto mb-4 flex h-[44px] w-[44px] items-center justify-center rounded-[12px] border"
                  aria-hidden
                >
                  <Image
                    src={includedIcons[index % includedIcons.length]}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>

                <h3 className="text-foreground mt-6 text-lg font-medium">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mx-auto mt-2 max-w-[44ch] text-base">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="metafi-feature-pricing"
        className="metafi-template-scope metafi-muted-section bg-background px-6 lg:px-0"
      >
        <div className="container px-0 py-16 sm:py-20 md:px-6 md:py-24">
          <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)]">
            <div className="max-w-xl">
              <p className="text-tagline mb-4 text-sm sm:text-base">
                {pricingCopy.overline}
              </p>

              <h2 className="text-foreground text-3xl leading-tight font-medium tracking-tight sm:text-5xl md:text-[56px]">
                {pricingCopy.title}
              </h2>

              <p className="text-muted-foreground mt-4 text-base sm:text-lg">
                {pricingCopy.description}
              </p>
              <p className="text-muted-foreground mt-4 text-base sm:text-lg">
                {dict.home.operationsDescription}
              </p>
            </div>

            <div className="w-full">
              <Image
                src="/images/ticra/dashboard-wide.png"
                alt={dict.home.previewAlt}
                width={1734}
                height={886}
                className="h-auto w-full object-contain object-left"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <TicraMetafiIntegrations locale={locale} dict={dict} />
      <TicraMetafiCta locale={locale} dict={dict} />
    </>
  );
}
