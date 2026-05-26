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
  const seo = getIntentSeoCopy(locale, '/purchase');

  return pageMetadata({
    locale,
    pathname: '/purchase',
    title: seo.title,
    description: seo.description,
  });
}

type PurchaseSearchParams = Promise<{
  plan?: string | string[] | undefined;
}>;

export default async function Page({
  params,
  searchParams,
}: {
  params: LocaleParams;
  searchParams: PurchaseSearchParams;
}) {
  const { locale, dict } = await getLocaleData(params);
  const { plan } = await searchParams;
  const selectedPackageCode = Array.isArray(plan) ? plan[0] : plan;

  return (
    <>
      <StructuredData locale={locale} dict={dict} pathname="/purchase" />
      <RequestPage
        locale={locale}
        dict={dict}
        type="purchase"
        selectedPackageCode={selectedPackageCode}
      />
    </>
  );
}
