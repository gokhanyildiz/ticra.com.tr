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
    pathname: '/privacy',
    title: dict.legal.privacy.title,
    description: dict.legal.privacy.description,
    robots: noindexFollowRobots,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  const { dict } = await getLocaleData(params);

  return <LegalPage content={dict.legal.privacy} />;
}
