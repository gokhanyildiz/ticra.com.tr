'use client';

import { ExternalLink, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  appUrl,
  type Locale,
  localizePath,
  normalizePublicPath,
  type SiteDictionary,
} from '@/lib/i18n';
import { cn } from '@/lib/utils';

type NavbarProps = {
  locale: Locale;
  nav: SiteDictionary['nav'];
};

function LanguageLink({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const targetLocale: Locale = locale === 'tr' ? 'en' : 'tr';
  const href = localizePath(pathname || '/', targetLocale);

  return (
    <Link
      href={href}
      className="border-border bg-background hover:bg-muted inline-flex h-9 min-w-10 items-center justify-center rounded-[8px] border px-3 text-xs font-semibold transition-colors"
      aria-label={label}
    >
      {label}
    </Link>
  );
}

export default function Navbar({ locale, nav }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activePath = normalizePublicPath(pathname || '/');

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isMenuOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMenuOpen]);

  return (
    <header className="bg-background/95 border-border sticky top-0 z-50 h-20 border-b backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-5 lg:grid lg:grid-cols-[auto_1fr_auto]">
        <Link
          href={localizePath('/', locale)}
          className="flex min-w-0 items-center"
          aria-label="Ticra"
        >
          <Image
            src="/ticra/ticra-logo-horizontal.svg"
            alt="Ticra"
            width={175}
            height={60}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="gap-8hea mt-2 hidden h-full items-center justify-center lg:flex">
          {nav.items.map((item) => {
            const href = localizePath(item.href, locale);
            const isActive = activePath === item.href;

            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  'text-muted-foreground hover:text-foreground flex h-full items-center text-sm font-semibold transition-colors',
                  isActive && 'text-primary',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageLink locale={locale} label={nav.language} />
          <Button asChild size="sm">
            <Link href={appUrl} target="_blank" rel="noreferrer">
              {nav.login}
              <ExternalLink data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageLink locale={locale} label={nav.language} />
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? (
              <X aria-hidden="true" />
            ) : (
              <Menu aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="bg-background border-border h-[calc(100vh-8rem)] overflow-hidden border-t lg:hidden">
          <div className="container flex h-full flex-col justify-between py-8">
            <nav className="flex flex-col gap-5">
              {nav.items.map((item) => (
                <Link
                  key={item.href}
                  href={localizePath(item.href, locale)}
                  className="text-foreground text-xl font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link
                  href={appUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {nav.login}
                  <ExternalLink data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
