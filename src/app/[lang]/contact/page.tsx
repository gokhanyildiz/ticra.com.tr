import type { Metadata } from 'next';

import { ContactPage } from '@/components/marketing/contact-page';
import { StructuredData } from '@/components/seo/structured-data';
import { pageMetadata } from '@/lib/seo';

import { getLocaleData, type LocaleParams } from '../_lib';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale, dict } = await getLocaleData(params);

  return pageMetadata({
    locale,
    pathname: '/contact',
    title: locale === 'tr' ? 'Ticra ile İletişime Geçin' : 'Contact Ticra',
    description: dict.contact.description,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  const { locale, dict } = await getLocaleData(params);

  return (
    <>
      <StructuredData locale={locale} dict={dict} pathname="/contact" />
      <ContactPage locale={locale} dict={dict} />
    </>
  );
}
