import type { Metadata } from 'next';

import {
  type Locale,
  localizePath,
  type SiteDictionary,
  siteUrl,
} from '@/lib/i18n';

export const publicRoutes = [
  '/',
  '/features',
  '/integrations',
  '/demo',
  '/purchase',
  '/contact',
  '/privacy',
  '/terms',
  '/cookie-policy',
] as const;

export type PublicRoute = (typeof publicRoutes)[number];

export const sitemapRoutes = [
  '/',
  '/features',
  '/integrations',
  '/demo',
  '/purchase',
  '/contact',
] as const satisfies readonly PublicRoute[];

export type SitemapRoute = (typeof sitemapRoutes)[number];

export const intentSeoRoutes = [
  '/',
  '/features',
  '/integrations',
  '/demo',
  '/purchase',
] as const satisfies readonly PublicRoute[];

type IntentSeoRoute = (typeof intentSeoRoutes)[number];

type PageSeoCopy = {
  title: string;
  description: string;
};

const intentSeoCopy = {
  tr: {
    '/': {
      title: 'Ticra İş Süreçleri Yönetim Platformu',
      description:
        'Ticra; teklif, sipariş, stok, satın alma, finans, proje, teknik servis, İK, doküman, sözleşme ve çoklu firma süreçlerini tek merkezde birleştirir.',
    },
    '/features': {
      title: 'Teklif, Stok, Finans, Servis ve İK Özellikleri',
      description:
        'Teklif, satış, sipariş, stok, günlük kur, finans, rapor, demirbaş, sözleşme, teknik servis, İK ve doküman akışlarını tek platformda yönetin.',
    },
    '/integrations': {
      title: 'Paraşüt, Drive, Slack ve Google Chat Entegrasyonları',
      description:
        "Ticra'yı Paraşüt, Google Drive, Slack ve Google Chat ile bağlayarak iş süreçlerinizi daha verimli hale getirin.",
    },
    '/demo': {
      title: 'Ticra İş Süreçleri Yönetim Platformu Demosu',
      description:
        'Tekliften siparişe, stoktan günlük kur ve raporlara, teknik servisten İK ve sözleşme yönetimine kadar Ticra’yı ekibiniz için inceleyin.',
    },
    '/purchase': {
      title: 'Ticra Paketleri İçin Teklif Al',
      description:
        'Basic, Professional veya Enterprise paketini; kullanıcı sayısı, firma sayısı, depolama, modül ve entegrasyon ihtiyacınıza göre tekliflendirin.',
    },
  },
  en: {
    '/': {
      title: 'Ticra Business Process Management Platform',
      description:
        'Ticra brings quotes, orders, inventory, purchasing, finance, projects, technical service, HR, documents, contracts and multi-company work together on one platform.',
    },
    '/features': {
      title: 'Quotes, Inventory, Finance, Service and HR Features',
      description:
        'Manage quotes, sales, orders, inventory, daily exchange rates, finance, reports, assets, contracts, service, HR and documents on one platform.',
    },
    '/integrations': {
      title: 'Paraşüt, Drive, Slack and Google Chat Integrations',
      description:
        'Connect Ticra with Paraşüt, Google Drive, Slack and Google Chat to make your business processes more efficient.',
    },
    '/demo': {
      title: 'Explore the Ticra Business Process Management Platform',
      description:
        'Review how Ticra supports quote-to-order, inventory, daily exchange rates, reports, service, HR, contracts and documents before rollout.',
    },
    '/purchase': {
      title: 'Request a Quote for Ticra Packages',
      description:
        'Share your Basic, Professional or Enterprise package, user count, company count, storage, module and integration needs for a tailored quote.',
    },
  },
} satisfies Record<Locale, Record<IntentSeoRoute, PageSeoCopy>>;

export function getIntentSeoCopy(locale: Locale, pathname: IntentSeoRoute) {
  return intentSeoCopy[locale][pathname];
}

const routeLabels = {
  tr: {
    '/': 'Ana sayfa',
    '/features': 'Özellikler',
    '/integrations': 'Entegrasyonlar',
    '/demo': 'Demo Talebi',
    '/purchase': 'Teklif Al',
    '/contact': 'İletişim',
    '/privacy': 'Gizlilik Politikası',
    '/terms': 'Kullanım Koşulları',
    '/cookie-policy': 'Çerez Politikası',
  },
  en: {
    '/': 'Home',
    '/features': 'Features',
    '/integrations': 'Integrations',
    '/demo': 'Request Demo',
    '/purchase': 'Request Quote',
    '/contact': 'Contact',
    '/privacy': 'Privacy Policy',
    '/terms': 'Terms of Use',
    '/cookie-policy': 'Cookie Policy',
  },
} satisfies Record<Locale, Record<PublicRoute, string>>;

function isIntentSeoRoute(pathname: PublicRoute): pathname is IntentSeoRoute {
  return intentSeoRoutes.includes(pathname as IntentSeoRoute);
}

function getStructuredSeoCopy(
  locale: Locale,
  dict: SiteDictionary,
  pathname: PublicRoute,
): PageSeoCopy {
  if (isIntentSeoRoute(pathname)) {
    return getIntentSeoCopy(locale, pathname);
  }

  if (pathname === '/contact') {
    return {
      title:
        locale === 'tr' ? 'Ticra ile İletişime Geçin' : 'Contact Ticra',
      description: dict.contact.description,
    };
  }

  if (pathname === '/privacy') {
    return dict.legal.privacy;
  }

  if (pathname === '/terms') {
    return dict.legal.terms;
  }

  return dict.legal.cookie;
}

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

export function localizedUrl(pathname: PublicRoute, locale: Locale) {
  return absoluteUrl(localizePath(pathname, locale));
}

export function localizedAlternates(pathname: PublicRoute, locale: Locale) {
  return {
    canonical: localizedUrl(pathname, locale),
    languages: {
      tr: localizedUrl(pathname, 'tr'),
      en: localizedUrl(pathname, 'en'),
      'x-default': localizedUrl(pathname, 'tr'),
    },
  } satisfies Metadata['alternates'];
}

export function pageMetadata({
  description,
  locale,
  pathname,
  robots,
  title,
}: {
  description: string;
  locale: Locale;
  pathname: PublicRoute;
  robots?: Metadata['robots'];
  title: string;
}): Metadata {
  return {
    title,
    description,
    ...(robots ? { robots } : {}),
    alternates: localizedAlternates(pathname, locale),
    openGraph: {
      title,
      description,
      url: localizedUrl(pathname, locale),
      siteName: 'Ticra',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/ticra/app-preview.png',
          width: 1200,
          height: 675,
          alt: 'Ticra',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/ticra/app-preview.png'],
    },
  };
}

export const noindexFollowRobots = {
  index: false,
  follow: true,
} satisfies Metadata['robots'];

export function jsonLdScriptContent(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function planOfferDescription(
  locale: Locale,
  plan: SiteDictionary['packages']['plans'][number],
) {
  if (plan.code === 'ENTERPRISE') {
    return locale === 'tr'
      ? 'Enterprise paketi gelişmiş modüller ve özel fiyat teklifiyle sunulur.'
      : 'The Enterprise package is provided with advanced modules and custom quote terms.';
  }

  const userBasedNote =
    locale === 'tr'
      ? 'Kullanıcı başı aylık paket için teklif alın.'
      : 'Request a quote for the monthly per-user package.';

  return `${plan.description} ${userBasedNote}`;
}

function getPlanOfferPrice(plan: SiteDictionary['packages']['plans'][number]) {
  const match = plan.price.match(/(\d+(?:[.,]\d+)?)/);

  return match ? match[1].replace(',', '.') : null;
}

function buildBreadcrumbList(locale: Locale, pathname: PublicRoute) {
  const items = [
    {
      name: routeLabels[locale]['/'],
      item: localizedUrl('/', locale),
    },
  ];

  if (pathname !== '/') {
    items.push({
      name: routeLabels[locale][pathname],
      item: localizedUrl(pathname, locale),
    });
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      ...item,
    })),
  };
}

export function buildStructuredData(
  locale: Locale,
  dict: SiteDictionary,
  pathname: PublicRoute,
) {
  const inLanguage = locale === 'tr' ? 'tr-TR' : 'en-US';
  const contactUrl = localizedUrl('/contact', locale);
  const purchaseUrl = localizedUrl('/purchase', locale);
  const pageUrl = localizedUrl(pathname, locale);
  const pageCopy = getStructuredSeoCopy(locale, dict, pathname);
  const showOffers = pathname === '/' || pathname === '/purchase';
  const planOffers = dict.packages.plans.map((plan) => {
    const price = getPlanOfferPrice(plan);

    return {
      '@type': 'Offer',
      name: `${plan.name} ${locale === 'tr' ? 'paketi' : 'package'}`,
      url: `${purchaseUrl}?plan=${plan.code.toLowerCase()}`,
      availability: 'https://schema.org/InStock',
      category:
        locale === 'tr'
          ? 'İş yönetim yazılımı'
          : 'Business management software',
      description: planOfferDescription(locale, plan),
      ...(price ? { price, priceCurrency: 'EUR' } : {}),
    };
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}#organization`,
        name: 'Ticra',
        url: siteUrl,
        logo: absoluteUrl('/ticra/ticra-icon.svg'),
        sameAs: ['https://ticra.app'],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType:
              locale === 'tr' ? 'satış ve destek' : 'sales and support',
            url: contactUrl,
            availableLanguage: ['tr', 'en'],
          },
        ],
        ...(showOffers
          ? {
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: locale === 'tr' ? 'Ticra paketleri' : 'Ticra packages',
                itemListElement: planOffers,
              },
            }
          : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        name: 'Ticra',
        url: siteUrl,
        inLanguage,
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageCopy.title,
        description: pageCopy.description,
        inLanguage,
        isPartOf: {
          '@id': `${siteUrl}#website`,
        },
        breadcrumb: {
          '@id': `${pageUrl}#breadcrumb`,
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteUrl}#software`,
        name: dict.metadata.title,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: siteUrl,
        description: dict.metadata.description,
        inLanguage,
        ...(showOffers ? { offers: planOffers } : {}),
      },
      {
        '@id': `${pageUrl}#breadcrumb`,
        ...buildBreadcrumbList(locale, pathname),
      },
      ...(pathname === '/'
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${pageUrl}#faq`,
              inLanguage,
              mainEntity: dict.home.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };
}
