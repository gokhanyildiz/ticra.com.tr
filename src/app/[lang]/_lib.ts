import { notFound } from 'next/navigation';

import {
  getDictionary,
  isLocale,
  type Locale,
  type SiteDictionary,
} from '@/lib/i18n';

export type LocaleParams = Promise<{ lang: string }>;

export async function getLocaleData(
  params: LocaleParams,
): Promise<{ locale: Locale; dict: SiteDictionary }> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return {
    locale: lang,
    dict: getDictionary(lang),
  };
}
