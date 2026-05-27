# Ticra.com.tr SEO İncelemesi ve Yol Haritası

Bu rapor, Ticra.com.tr web sitesinin mevcut SEO durumunu analiz eder, eksikleri belirler ve Google araçlarının entegrasyonu için bir yol haritası sunar.

## 1. Genel SEO Durumu

Ticra.com.tr, Next.js (App Router) ve React 19 kullanılarak modern standartlarda inşa edilmiştir. SEO temelleri (Metadata, Sitemap, Robots, Structured Data) teknik olarak doğru kurgulanmıştır.

### Mevcut SEO Altyapısı:

- **Dinamik Metadata:** Tüm sayfalarda başlık (title), açıklama (description), Open Graph (OG) ve Twitter kartları dinamik olarak yönetilmektedir.
- **Dil Desteği (i18n):** Türkçe ve İngilizce sayfalar için `hreflang` (alternates) etiketleri doğru şekilde uygulanmıştır.
- **Robots & Sitemap:** `src/app/robots.ts` ve `src/app/sitemap.ts` üzerinden dinamik olarak oluşturulmaktadır.
- **Yapılandırılmış Veri (Structured Data):** `Organization`, `WebSite`, `WebPage`, `SoftwareApplication`, `FAQPage` ve `BreadcrumbList` şemaları (JSON-LD) kapsamlı bir şekilde entegre edilmiştir.
- **Semantik HTML:** Ana sayfa ve alt sayfalarda `h1`, `h2`, `section`, `article` gibi semantik etiketler doğru hiyerarşide kullanılmıştır.
- **Görsel Optimizasyon:** Next.js `Image` bileşeni kullanılarak `alt` metinleri ve performans optimizasyonları yapılmıştır.

## 2. Tespit Edilen Eksikler ve İyileştirmeler

### Eksikler:

1. **Google Araçları Entegrasyonu:** Google Analytics 4 (GA4), Google Tag Manager (GTM) ve Google Search Console henüz siteye bağlanmamıştır.
2. **Sitemap Eksikliği (Blog):** `src/app/sitemap.ts` dosyası şu anda sadece statik sayfaları içermektedir. `src/app/blog/[slug]` altındaki dinamik blog yazıları sitemap'e dahil edilmemiştir. Bu durum, blog içeriklerinin indekslenmesini zorlaştırabilir. [not: blog sayfasını şimdilik disabled yapalım. ileride içerik oluştukça aktif ederiz.]
3. **Sosyal Medya Linkleri:** Footer ve iletişim sayfalarında Ticra'ya ait sosyal medya linkleri henüz eklenmemiş görünmektedir. [https://x.com/TicraApp, https://www.linkedin.com/company/ticra-app, https://www.youtube.com/@Ticra-App, instagram.com/ticra.app]
4. **Sayfa Performans Metrikleri:** Script yükleme stratejileri (özellikle üçüncü taraf araçlar eklendiğinde) gözden geçirilmelidir.

### İyileştirme Önerileri:

- **Hız Optimizasyonu:** Google araçları eklendiğinde `@next/third-parties` kütüphanesi kullanılarak performans korunmalıdır.
- **Backlink Çalışması:** Ticra'nın ana domaini (`ticra.app`) ile `ticra.com.tr` arasındaki geçişler ve link hiyerarşisi güçlendirilmelidir.
- **Favicon Çeşitliliği:** Modern tarayıcılar ve mobil cihazlar için tüm favicon varyasyonlarının (apple-touch-icon vb.) eksiksiz olduğundan emin olunmalıdır. favicon için ticra iconunu kullan.

## 3. Google Araçları Entegrasyon Yol Haritası

Aşağıdaki adımlar, Google araçlarının siteye profesyonel bir şekilde dahil edilmesini sağlar.

### Adım 1: Google Search Console (GSC) Kurulumu

- **İşlem:** Siteyi [Google Search Console](https://searchconsole.google.com/)'a ekleyin.
- **Doğrulama:** `src/app/[lang]/layout.tsx` dosyasına bir `google-site-verification` meta etiketi ekleyin veya `public` dizinine doğrulama dosyasını yükleyin.
- **Bilgi Kaynağı:** [GSC Help Center](https://support.google.com/webmasters/answer/9008080)
- **Aksiyon:** Kurulum sonrası `sitemap.xml` adresini GSC'ye gönderin.

### Adım 2: Google Analytics 4 (GA4) Kurulumu

- **İşlem:** Bir GA4 mülkü oluşturun ve Ölçüm Kimliğini (`G-XXXXXXXXXX`) alın.
- **Entegrasyon:** Next.js projeleri için en performanslı yöntem olan `@next/third-parties/google` paketini kullanın.
- **Bilgi Kaynağı:** [Next.js Google Analytics Docs](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-analytics)
- **Aksiyon:** `src/app/[lang]/layout.tsx` içerisine `<GoogleAnalytics gaId="G-XXXXXXXXXX" />` bileşenini ekleyin.

### Adım 3: Google Tag Manager (GTM) Kurulumu (Opsiyonel ama Önerilir)

- **İşlem:** Bir GTM kapsayıcısı oluşturun ve GTM Kimliğini (`GTM-XXXXXXX`) alın.
- **Entegrasyon:** Yine `@next/third-parties/google` paketini kullanın.
- **Bilgi Kaynağı:** [Next.js GTM Docs](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-tag-manager)
- **Aksiyon:** `src/app/[lang]/layout.tsx` içerisine `<GoogleTagManager gtmId="GTM-XXXXXXX" />` bileşenini ekleyin.

## 4. İhtiyaç Duyulan Bilgilerin Kaynakları

| Bilgi / Veri           | Nereden Alınacak?                                                           |
| :--------------------- | :-------------------------------------------------------------------------- | ---------------------- |
| **GSC Doğrulama Kodu** | Google Search Console > Ayarlar > Sahiplik Doğrulama                        | doğrulandı             |
| **GA4 Ölçüm Kimliği**  | Google Analytics > Yönetici > Veri Akışları > Web Akışı Ayrıntıları         | .env dosyasına eklendi |
| **GTM Kimliği**        | Google Tag Manager > Çalışma Alanı Üst Paneli                               | .env dosyasına eklendi |
| **SEO Meta Metinleri** | Mevcut metinler `src/lib/seo.ts` dosyasında merkezi olarak yönetilmektedir. |
| **Dinamik Veriler**    | `src/lib/i18n/` altındaki dil dosyalarından çekilmektedir.                  |

---

_Bu rapor Ticra.com.tr SEO altyapısının genel olarak başarılı olduğunu ancak veri analizi araçlarının (Google) eksik olduğunu göstermektedir._
