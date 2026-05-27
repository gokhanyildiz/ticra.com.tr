import '../globals.css';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import type { ReactNode } from 'react';

import Banner from '@/components/layout/banner';
import { Footer } from '@/components/layout/footer';
import { MaintenanceMode } from '@/components/layout/maintenance-mode';
import Navbar from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { getGoogleMarketingConfig } from '@/lib/google-marketing';
import {
  getDictionary,
  isLocale,
  type Locale,
  locales,
} from '@/lib/i18n';
import { isMaintenanceModeEnabled } from '@/lib/maintenance';
import { localizedAlternates } from '@/lib/seo';

const nexa = localFont({
  src: [
    {
      path: '../../../public/fonts/Nexa-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Nexa-XBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-nexa',
  display: 'swap',
});

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'tr';
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL('https://ticra.com.tr'),
    title: {
      default: dict.metadata.title,
      template: `%s | Ticra`,
    },
    description: dict.metadata.description,
    keywords: [
      'Ticra',
      'iş yönetim platformu',
      'operasyon yönetimi',
      'teklif ve sipariş yönetimi',
      'stok yönetimi',
      'satın alma yönetimi',
      'günlük kur takibi',
      'teknik servis yönetimi',
      'sözleşme yönetimi',
      'demirbaş yönetimi',
      'doküman yönetimi',
      'Google Drive doküman arşivi',
      'çoklu firma yönetimi',
      'yerli iş yönetim yazılımı',
    ],
    authors: [{ name: 'Ticra' }],
    creator: 'Ticra',
    publisher: 'Ticra',
    robots: { index: true, follow: true },
    alternates: localizedAlternates('/', locale),
    manifest: '/favicon/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon/favicon.ico', sizes: 'any' },
        { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/ticra/ticra-icon.svg', type: 'image/svg+xml' },
      ],
      shortcut: [{ url: '/favicon/favicon.ico' }],
      apple: [
        {
          url: '/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      siteName: 'Ticra',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/ticra/app-preview.png',
          width: 1200,
          height: 675,
          alt: 'Ticra',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: ['/images/ticra/app-preview.png'],
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  await connection();

  const dict = getDictionary(lang);
  const isMaintenanceMode = isMaintenanceModeEnabled();
  const { gtmId, standaloneGaId } = getGoogleMarketingConfig();

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <body className={`${nexa.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {isMaintenanceMode ? (
            <MaintenanceMode />
          ) : (
            <>
              <Banner locale={lang} />
              <Navbar locale={lang} nav={dict.nav} />
              <main>{children}</main>
              <Footer locale={lang} dict={dict} />
            </>
          )}
        </ThemeProvider>
      </body>
      {standaloneGaId ? <GoogleAnalytics gaId={standaloneGaId} /> : null}
    </html>
  );
}
