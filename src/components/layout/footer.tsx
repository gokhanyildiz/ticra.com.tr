import Image from 'next/image';
import Link from 'next/link';

import { KucoLogo } from '@/components/layout/kuco-logo';
import {
  appUrl,
  type Locale,
  localizePath,
  type SiteDictionary,
} from '@/lib/i18n';

type FooterProps = {
  locale: Locale;
  dict: SiteDictionary;
};

export function Footer({ locale, dict }: FooterProps) {
  const contactLabel =
    dict.nav.items.find((item) => item.href === '/contact')?.label ||
    dict.contact.eyebrow;
  const productLinks = [
    { name: dict.nav.items[0].label, href: '/features' },
    { name: dict.nav.items[1].label, href: '/integrations' },
    { name: dict.nav.demo, href: '/demo' },
    { name: dict.nav.purchase, href: '/purchase' },
  ];
  const legalLinks = [
    { name: dict.legal.privacy.title, href: '/privacy' },
    { name: dict.legal.terms.title, href: '/terms' },
    { name: dict.legal.cookie.title, href: '/cookie-policy' },
  ];

  return (
    <footer className="bg-[#07133a] px-0 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col gap-4">
            <Link href={localizePath('/', locale)} aria-label="Ticra">
              <Image
                src="/ticra/ticra-logo-horizontal-light.svg"
                alt="Ticra"
                width={175}
                height={60}
                className="h-10 w-auto"
              />
            </Link>
            <p className="max-w-sm text-sm leading-6 text-white/70">
              {dict.footer.description}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-white/60">
                {dict.footer.product}
              </h2>
              <ul className="flex flex-col gap-3">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localizePath(link.href, locale)}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-white/60">
                {dict.footer.company}
              </h2>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    href={localizePath('/contact', locale)}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {contactLabel}
                  </Link>
                </li>
                <li>
                  <Link
                    href={appUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {dict.nav.login}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-white/60">
                {dict.footer.legal}
              </h2>
              <ul className="flex flex-col gap-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localizePath(link.href, locale)}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ticra. {dict.footer.copyright}</p>
          <p
            className="inline-flex items-center gap-1.5 text-white/70"
            title={dict.footer.kucoAttribution}
          >
            <span>{dict.footer.kucoAttributionPrefix}</span>
            <Link
              href="https://kuco.tr?utm_source=ticra&utm_medium=referral&utm_campaign=ticra-com-tr"
              target="_blank"
              rel="noreferrer"
              aria-label="Kuco"
              className="inline-flex h-5 items-center text-white/85 transition-colors hover:text-white"
            >
              <KucoLogo aria-hidden="true" className="h-4 w-auto fill-current" />
            </Link>
            <span>{dict.footer.kucoAttributionSuffix}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
