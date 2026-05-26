import type { Metadata } from 'next';

import { HomePage } from '@/components/marketing/home-page';
import { StructuredData } from '@/components/seo/structured-data';
import { getIntentSeoCopy, pageMetadata } from '@/lib/seo';

import { getLocaleData, type LocaleParams } from './_lib';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale } = await getLocaleData(params);
  const seo = getIntentSeoCopy(locale, '/');

  return pageMetadata({
    locale,
    pathname: '/',
    title: seo.title,
    description: seo.description,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  const { locale, dict } = await getLocaleData(params);

  return (
    <>
      <StructuredData locale={locale} dict={dict} pathname="/" />
      <HomePage locale={locale} dict={dict} />
    </>
  );
}
