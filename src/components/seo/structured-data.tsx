import type { Locale, SiteDictionary } from '@/lib/i18n';
import {
  buildStructuredData,
  jsonLdScriptContent,
  type PublicRoute,
} from '@/lib/seo';

type StructuredDataProps = {
  locale: Locale;
  dict: SiteDictionary;
  pathname: PublicRoute;
};

export function StructuredData({
  locale,
  dict,
  pathname,
}: StructuredDataProps) {
  const structuredData = buildStructuredData(locale, dict, pathname);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLdScriptContent(structuredData),
      }}
    />
  );
}
