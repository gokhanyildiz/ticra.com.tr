'use client';

import { ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { type Locale, localizePath } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const bannerCopy = {
  tr: {
    mobileMessage: 'İlk adımı atın.',
    message:
      'Ticra ile iş süreçlerinizi dijitalleştirmenin ilk adımını atın.',
    cta: 'Teklif Al',
  },
  en: {
    mobileMessage: 'Shape your Ticra quote.',
    message:
      'Shape your Ticra quote around your users, companies and module needs.',
    cta: 'Get a Quote',
  },
} satisfies Record<
  Locale,
  { mobileMessage: string; message: string; cta: string }
>;

const Banner = ({ locale }: { locale: Locale }) => {
  const [isVisible, setIsVisible] = useState(true);
  const copy = bannerCopy[locale];
  const purchaseHref = useMemo(() => localizePath('/purchase', locale), [locale]);

  useEffect(() => {
    const bannerDismissed = localStorage.getItem('ticra-quote-banner-dismissed');
    if (bannerDismissed === 'true') {
      setIsVisible(false);
    }
  }, [locale]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('ticra-quote-banner-dismissed', 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-primary relative">
      <div className="container flex min-h-12 items-center justify-center px-3 py-2 pr-9 sm:px-6 sm:pr-12 lg:px-0">
        <div className="flex flex-1 items-center justify-center gap-2 text-center sm:gap-4">
          <span className="text-primary-foreground text-xs leading-5 font-semibold sm:text-sm">
            <span className="sm:hidden">{copy.mobileMessage}</span>
            <span className="hidden sm:inline">{copy.message}</span>
          </span>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 rounded-[8px] px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
            asChild
          >
            <Link href={purchaseHref}>
              {copy.cta}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <button
          onClick={handleDismiss}
          className={cn(
            'absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-1.5 sm:right-4',
            'text-primary-foreground/70 hover:text-primary-foreground',
            'transition-all duration-200 hover:scale-110 hover:bg-white/10',
            'focus:ring-2 focus:ring-white/30 focus:outline-none',
          )}
          aria-label="Close banner"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
