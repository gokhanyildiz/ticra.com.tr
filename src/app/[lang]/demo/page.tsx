import type { Metadata } from 'next';

import { RequestPage } from '@/components/marketing/request-page';
import { StructuredData } from '@/components/seo/structured-data';
import { getIntentSeoCopy, pageMetadata } from '@/lib/seo';

import { getLocaleData, type LocaleParams } from '../_lib';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale } = await getLocaleData(params);
  const seo = getIntentSeoCopy(locale, '/demo');

  return pageMetadata({
    locale,
    pathname: '/demo',
    title: seo.title,
    description: seo.description,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  const { locale, dict } = await getLocaleData(params);

  return (
    <>
      <StructuredData locale={locale} dict={dict} pathname="/demo" />
      <RequestPage locale={locale} dict={dict} type="demo" />
    </>
  );
}
