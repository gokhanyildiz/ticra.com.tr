import type { MetadataRoute } from 'next';

import { locales } from '@/lib/i18n';
import {
  localizedUrl,
  type SitemapRoute,
  sitemapRoutes,
} from '@/lib/seo';

const routePriority: Record<SitemapRoute, number> = {
  '/': 1,
  '/features': 0.9,
  '/integrations': 0.8,
  '/demo': 0.9,
  '/purchase': 0.8,
  '/contact': 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-05-26T00:00:00.000Z');

  return sitemapRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: localizedUrl(route, locale),
      lastModified,
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: routePriority[route],
      alternates: {
        languages: {
          tr: localizedUrl(route, 'tr'),
          en: localizedUrl(route, 'en'),
          'x-default': localizedUrl(route, 'tr'),
        },
      },
    })),
  );
}
