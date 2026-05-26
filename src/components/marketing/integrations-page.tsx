import Image from 'next/image';
import Link from 'next/link';

import { TicraMetafiCta } from '@/components/marketing/metafi-home-sections';
import { Button } from '@/components/ui/button';
import {
  type Locale,
  localizePath,
  type SiteDictionary,
} from '@/lib/i18n';

type IntegrationsPageProps = {
  locale: Locale;
  dict: SiteDictionary;
};

export function IntegrationsPage({ locale, dict }: IntegrationsPageProps) {
  const allIntegrationsTitle =
    locale === 'tr' ? 'Kullanıma hazır bağlantılar' : 'Ready-to-use connections';
  const contactLabel = locale === 'tr' ? 'İletişime Geç' : 'Contact Us';

  return (
    <>
      <section
        id="metafi-integrations-hero"
        className="metafi-template-scope bg-background px-6 lg:px-0"
      >
        <div className="container px-0 md:px-6">
          <div className="bg-features-hero relative overflow-hidden">
            <div className="mx-auto max-w-5xl px-6 py-16 text-center sm:px-8 sm:py-20 md:py-24">
              <p className="text-tagline mb-4 text-sm sm:text-base">
                {dict.integrations.eyebrow}
              </p>

              <h1 className="text-foreground text-4xl leading-tight font-medium tracking-tight text-balance sm:text-5xl md:text-[68px]">
                {dict.integrations.title}
              </h1>

              <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-base sm:text-lg">
                {dict.integrations.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                <Button asChild className="w-full sm:w-auto">
                  <Link href={localizePath('/demo', locale)}>
                    {dict.nav.demo}
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href={localizePath('/contact', locale)}>
                    {contactLabel}
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="h-6 sm:h-8" />
        </div>
      </section>

      <section
        id="metafi-all-integrations"
        className="metafi-template-scope metafi-muted-section bg-background px-6 lg:px-0"
      >
        <div className="container px-0 py-16 sm:py-20 md:px-6 md:py-24">
          <h2 className="text-foreground text-center text-[40px] leading-tight font-medium tracking-tight md:text-[52px]">
            {allIntegrationsTitle}
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-18 lg:grid-cols-3">
            {dict.integrations.items.map((integration) => (
              <li key={integration.name} className="h-full">
                <article className="bg-card border-border-light shadow-light h-full rounded-[16px] border p-4 transition-transform hover:translate-y-[-2px]">
                  <div className="bg-accent flex h-[200px] w-full items-center justify-center rounded-[12px]">
                    <Image
                      src={integration.icon}
                      alt={`${integration.name} logo`}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-contain"
                    />
                  </div>

                  <h3 className="text-foreground mt-4 text-2xl font-medium">
                    {integration.name}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-[18px]">
                    {integration.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TicraMetafiCta locale={locale} dict={dict} />
    </>
  );
}
