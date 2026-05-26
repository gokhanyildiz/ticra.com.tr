import type { Metadata } from 'next';

import { LegalPage } from '@/components/marketing/legal-page';
import { noindexFollowRobots, pageMetadata } from '@/lib/seo';

import { getLocaleData, type LocaleParams } from '../_lib';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale, dict } = await getLocaleData(params);

  return pageMetadata({
    locale,
    pathname: '/cookie-policy',
    title: dict.legal.cookie.title,
    description: dict.legal.cookie.description,
    robots: noindexFollowRobots,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  const { dict } = await getLocaleData(params);

  return <LegalPage content={dict.legal.cookie} />;
}
