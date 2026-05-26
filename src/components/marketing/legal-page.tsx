import type { SiteDictionary } from '@/lib/i18n';

type LegalPageProps = {
  content: SiteDictionary['legal']['privacy'];
};

export function LegalPage({ content }: LegalPageProps) {
  return (
    <article className="bg-background">
      <div className="container flex max-w-3xl flex-col gap-8 py-16 md:py-24">
        <header className="flex flex-col gap-4">
          <p className="text-primary text-sm font-semibold">
            {content.updated}
          </p>
          <h1 className="text-foreground text-4xl font-bold md:text-5xl">
            {content.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-8">
            {content.description}
          </p>
        </header>

        <div className="flex flex-col gap-5">
          {content.sections.map((section) => (
            <section
              key={section.title}
              className="border-border-light bg-card rounded-[8px] border p-5"
            >
              <h2 className="text-foreground text-xl font-bold">
                {section.title}
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
