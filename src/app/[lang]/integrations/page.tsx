import type { Metadata } from 'next';

import { IntegrationsPage } from '@/components/marketing/integrations-page';
import { StructuredData } from '@/components/seo/structured-data';
import { getIntentSeoCopy, pageMetadata } from '@/lib/seo';

import { getLocaleData, type LocaleParams } from '../_lib';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale } = await getLocaleData(params);
  const seo = getIntentSeoCopy(locale, '/integrations');

  return pageMetadata({
    locale,
    pathname: '/integrations',
    title: seo.title,
    description: seo.description,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  const { locale, dict } = await getLocaleData(params);

  return (
    <>
      <StructuredData locale={locale} dict={dict} pathname="/integrations" />
      <IntegrationsPage locale={locale} dict={dict} />
    </>
  );
}
