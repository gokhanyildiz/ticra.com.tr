import { LeadRequestForm } from '@/components/marketing/lead-request-form';
import type { Locale, SiteDictionary } from '@/lib/i18n';

type RequestPageProps = {
  locale: Locale;
  dict: SiteDictionary;
  type: 'demo' | 'purchase';
  selectedPackageCode?: string;
};

export function RequestPage({
  locale,
  dict,
  type,
  selectedPackageCode,
}: RequestPageProps) {
  const copy = dict.contact[type];
  const moduleOptions = dict.home.modules.map((module) => module.title);

  return (
    <section
      id="metafi-contact"
      className="metafi-template-scope bg-background relative px-6 lg:px-0"
    >
      <div className="bg-features-hero pointer-events-none absolute inset-x-0 top-0 z-0 container h-[600px]" />

      <div className="relative z-10 container px-0">
        <div className="pt-20 text-center sm:pt-24 md:pt-28">
          <p className="text-tagline mb-3 text-sm sm:text-base">
            {copy.badge}
          </p>
          <h1 className="text-foreground text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
            {copy.title}
          </h1>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm sm:text-base">
            {copy.description}
          </p>
        </div>

        <div className="relative z-10 mt-10 sm:mt-12 md:mt-16">
          <div className="mx-auto w-full max-w-4xl">
            <LeadRequestForm
              type={type}
              locale={locale}
              copy={copy}
              moduleOptions={moduleOptions}
              packageOptions={dict.packages.plans}
              selectedPackageCode={selectedPackageCode}
            />
          </div>
        </div>

        <div className="h-10 sm:h-12 md:h-14" />
      </div>
    </section>
  );
}
