export const locales = ['tr', 'en'] as const;
export const defaultLocale = 'tr';
export const appUrl = 'https://ticra.app';
export const siteUrl = 'https://ticra.com.tr';

export type Locale = (typeof locales)[number];

type NavItem = {
  href: string;
  label: string;
};

type FormCopy = {
  badge: string;
  title: string;
  description: string;
  submit: string;
  success: string;
  error: string;
  fields: {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    companySize: string;
    expectedUsers: string;
    taxNumber: string;
    package: string;
    message: string;
    modules: string;
    website: string;
  };
  placeholders: {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    companySize: string;
    expectedUsers: string;
    taxNumber: string;
    package: string;
    message: string;
  };
};

type ContactFormCopy = {
  badge: string;
  title: string;
  description: string;
  submit: string;
  success: string;
  error: string;
  fields: {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    website: string;
  };
  placeholders: {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
};

type PricingPlan = {
  code: string;
  name: string;
  badge: string;
  price: string;
  period: string;
  description: string;
  limits: string[];
  features: string[];
  cta: string;
  highlighted?: boolean;
};

type PricingComparisonRow = {
  feature: string;
  values: string[];
};

export type SiteDictionary = {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    items: NavItem[];
    login: string;
    demo: string;
    purchase: string;
    language: string;
  };
  home: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    previewAlt: string;
    metrics: { label: string; value: string }[];
    modulesTitle: string;
    modulesDescription: string;
    modules: { title: string; description: string }[];
    operationsTitle: string;
    operationsDescription: string;
    operations: string[];
    faqTitle: string;
    faqs: { question: string; answer: string }[];
    ctaTitle: string;
    ctaDescription: string;
  };
  features: {
    eyebrow: string;
    title: string;
    description: string;
    languageSupport: {
      title: string;
      description: string;
      languages: { code: string; name: string; region: string }[];
    };
    groups: {
      title: string;
      description: string;
      items: string[];
    }[];
  };
  integrations: {
    eyebrow: string;
    title: string;
    description: string;
    items: { name: string; description: string; icon: string }[];
  };
  packages: {
    eyebrow: string;
    title: string;
    description: string;
    comparisonTitle: string;
    comparisonDescription: string;
    comparisonFeatureLabel: string;
    footnote: string;
    plans: PricingPlan[];
    comparisonRows: PricingComparisonRow[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    demo: FormCopy;
    purchase: FormCopy;
    general: ContactFormCopy;
  };
  footer: {
    product: string;
    company: string;
    legal: string;
    description: string;
    kucoAttribution: string;
    kucoAttributionPrefix: string;
    kucoAttributionSuffix: string;
    copyright: string;
  };
  legal: Record<
    'privacy' | 'terms' | 'cookie',
    {
      title: string;
      description: string;
      updated: string;
      sections: { title: string; body: string }[];
    }
  >;
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizePublicPath(pathname: string) {
  if (pathname === '/tr' || pathname === '/en') return '/';
  return pathname.replace(/^\/(tr|en)(?=\/)/, '') || '/';
}

export function localizePath(pathname: string, locale: Locale) {
  const normalized = normalizePublicPath(pathname);

  if (locale === defaultLocale) {
    return normalized;
  }

  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`;
}

export const dictionaries: Record<Locale, SiteDictionary> = {
  tr: {
    metadata: {
      title: 'Ticra | İş Süreçleri Yönetim Platformu',
      description:
        'Ticra İş Süreçleri Yönetim Platformu; teklif, sipariş, stok, günlük kur, finans, servis, İK, doküman, sözleşme, demirbaş, rapor ve çoklu firma süreçlerini tek merkezde birleştirir.',
    },
    nav: {
      items: [
        { label: 'Özellikler', href: '/features' },
        { label: 'Entegrasyonlar', href: '/integrations' },
        { label: 'Demo Talebi', href: '/demo' },
        { label: 'Teklif Al', href: '/purchase' },
        { label: 'İletişim', href: '/contact' },
      ],
      login: 'Kullanıcı Girişi',
      demo: 'Demo Talep Et',
      purchase: 'Teklif Al',
      language: 'EN',
    },
    home: {
      eyebrow: 'Ticra İş Süreçleri Yönetim Platformu',
      title: 'Şirketinizdeki tüm iş süreçlerini sizin için hazırladık',
      description:
        'Ticra İş Süreçleri Yönetim Platformu; satıştan satın almaya, stoktan finans ve projelere, servis yönetiminden insan kaynakları ve doküman yönetimine kadar günlük şirket operasyonlarını tek güvenilir çalışma alanında toplar.',
      primaryCta: 'Demo Talep Et',
      secondaryCta: 'Teklif Al',
      previewAlt: 'Ticra platformu demo dashboard ekranı',
      metrics: [
        { value: 'Tek veri omurgası', label: 'iş yönetim platformu' },
        { value: 'Yetki ve izlenebilirlik', label: 'rol bazlı süreç kurgusu' },
        { value: 'Mobil uyumlu arayüz', label: 'tüm cihazlarda kullanım' },
      ],
      modulesTitle: 'İş akışları aynı veri omurgasında birleşir',
      modulesDescription:
        'Ticra; proje yönetimi, satış öncesi ve sonrası hizmetler, finansal ve görev analizleri ile tüm süreçlerinizi uçtan uca yönetir, analiz eder.',
      modules: [
        {
          title: 'Müşteri İlişkileri ve Satış',
          description:
            'Aday müşteri, müşteri, aktivite, teklif revizyonu, sipariş ve tahsilat süreçlerini tek ticari akışta takip edin.',
        },
        {
          title: 'Satın alma, gider ve ödeme',
          description:
            'Tedarikçi, satın alma talebi, gider, ödeme, mutabakat ve onay adımlarını görünür hale getirin.',
        },
        {
          title: 'Stok ve ürün',
          description:
            'Ürün, marka, depo, sevkiyat, sayım, rezervasyon, kritik stok ve fiyat listelerini aynı merkezden yönetin.',
        },
        {
          title: 'Finansal Performans Raporlamaları',
          description:
            'Cari hareket, nakit akışı, kur takibi, finansal performans raporları, zamanlanmış raporlar ve dışa aktarım akışlarını yönetin.',
        },
        {
          title: 'Proje Yönetimi ve Teknik Servis',
          description:
            'Proje şablonları, görevler, iş emirleri, teknik servis talepleri ve takvim kayıtlarını aynı bağlamda yönetin.',
        },
        {
          title: 'İnsan Kaynakları, Ekip Yönetimi ve Onay Süreçleri',
          description:
            'Çalışan, izin, devam, performans, maaş, organizasyon, ekip yönetimi ve onay akışlarını düzenli tutun.',
        },
        {
          title: 'Doküman ve Sözleşme Yönetimi',
          description:
            'Doküman ve sözleşmeleri klasör, sürüm, arama ve yetki akışlarıyla yönetin; belgelerinizin bir yedeğini Google Drive hesabınıza arşivleyin.',
        },
        {
          title: 'Tüm firmalarınızı tek hesap ile yönetin',
          description:
            'Firmalarınız arasında hızlı geçiş yapın. Kullanıcılarınıza firmalara göre erişim yetkisi verin.',
        },
      ],
      operationsTitle: 'Kurumsal kullanım için tasarlanmış sade bir kontrol paneli',
      operationsDescription:
        'Ticra hızlı öğrenilen, yoğun veriyle çalışırken düzenini kaybetmeyen, ekiplerin her gün tekrar kullandığı iş ekranlarına odaklanır.',
      operations: [
        'KVKK uyumunu destekleyen rol, yetki, erişim ve işlem kayıtları',
        'Ticaret yapan proje firmaları için teklif, satın alma ve proje takibi',
        'Mobil uyumlu arayüz sayesinde tüm cihazlardan verimli kullanım',
        'Belgelerinizin bir yedeğini Google Drive üzerinde otomatik saklayın.',
        'Çoklu firma desteği, hızlı firma geçişi ve firma bazlı kullanıcı yetkisi',
      ],
      faqTitle: 'Sık sorulanlar',
      faqs: [
        {
          question: 'Ticra’da otomatik kayıt veya anında kurulum var mı?',
          answer:
            'Hayır. Kurulum, demo ve teklif süreçleri ekip tarafından değerlendirilir; bu yüzden sitede herkese açık kayıt formu yerine talep formları bulunur.',
        },
        {
          question: 'Ticra hangi şirketler için uygundur?',
          answer:
            'Birden fazla operasyon modülünü aynı yerde yönetmek isteyen B2B ekipler, ticaret ve servis şirketleri ve özellikle teklif, satın alma ve proje takibini aynı akışta yürüten ticaret yapan proje firmaları için uygundur.',
        },
        {
          question: 'Demo sonrasında canlıya hazırlık çalışması yapılabilir mi?',
          answer:
            'İhtiyaç duyulursa demo görüşmesinden sonra gerçek verilerinizle sınırlı değerlendirme ve canlıya hazırlık süreci planlanabilir. Bu çalışma, standart public paketlerden ayrı olarak satış planı kapsamında değerlendirilir.',
        },
        {
          question: 'Mevcut uygulamaya nereden girilir?',
          answer:
            'Üst menüdeki Kullanıcı Girişi butonu doğrudan ticra.app çalışma alanına yönlendirir.',
        },
      ],
      ctaTitle: 'Ticra’yı kendi operasyon yapınıza göre değerlendirin',
      ctaDescription:
        'Demo talep edin veya teklif talebi gönderin; ekip paket, kullanıcı, firma, depolama ve entegrasyon kapsamını sizinle netleştirsin.',
    },
    features: {
      eyebrow: 'Özellikler',
      title:
        'Ticra, tüm iş süreçlerinizi yönetmek için birbiriyle entegre birçok modülden oluşur.',
      description:
        'Ticra’nın modüler yapısı; proje yönetimi, satış, satın alma, stok, teknik servis, insan kaynakları, finansal analizler, doküman ve sözleşme yönetimi, envanter ve onay süreçlerini tek yerde toplar. Ekipleriniz aynı şirket ya da erişim izni verdiğiniz diğer şirketler üzerinde birlikte çalışabilir.',
      languageSupport: {
        title: 'Platform arayüzünde 5 dil altyapısı',
        description:
          'Ticra platform arayüzü Türkçe, İngilizce, Almanca, Fransızca ve Rusça dil altyapısıyla çok dilli ekiplerin aynı operasyon merkezinde çalışmasını sağlar.',
        languages: [
          { code: 'TR', name: 'Türkçe', region: 'Türkiye' },
          { code: 'EN', name: 'English', region: 'Global' },
          { code: 'DE', name: 'Deutsch', region: 'DACH' },
          { code: 'FR', name: 'Français', region: 'France' },
          { code: 'RU', name: 'Русский', region: 'CIS' },
        ],
      },
      groups: [
        {
          title: 'Müşteri İlişkileri, Teklif, Sipariş ve Satış',
          description:
            'Aday müşteriden teklif revizyonuna, satış fırsatından siparişe uzanan ticari akış müşteri bağlamında izlenebilir kalır.',
          items: [
            'Aday müşteri, müşteri, segment, aktivite, satış fırsatı ve satış kapsamı takibi',
            'Teklif, teklif revizyonu, teklif takibi, arşiv, iptal ve e-belge bağlantıları',
            'Tekliften siparişe dönüşüm, satış siparişi, tahsilat planı, cari bakiye ve satış mutabakat görünümü',
          ],
        },
        {
          title: 'Satın alma, gider ve ödeme',
          description:
            'Tedarikçi, talep, gider ve ödeme kayıtları onay ve mutabakat süreçlerine hazır tutulur.',
          items: [
            'Satın alma talepleri, tedarikçiler, gider kategorileri ve etiketleri',
            'Gider onayları, harcama/onay yaşlandırma, borç yaşlandırma ve KDV raporları',
            'Ödeme kayıtları, Paraşüt alış faturası okuma, mutabakat ve e-fatura çalışma alanı',
          ],
        },
        {
          title: 'Stok, ürün, depo ve sevkiyat',
          description:
            'Ürün ve stok hareketleri satış, satın alma ve sevkiyat kayıtlarıyla birlikte ilerler.',
          items: [
            'Ürün katalogları, marka, ürün grubu, ölçü birimi ve fiyat listesi yönetimi',
            'Depo, depo yetkisi, kritik stok, stok sorgu, sayım ve rezervasyon',
            'Mal kabul, sevkiyat, iade siparişi, paketleme fişi ve stok hareket raporları',
          ],
        },
        {
          title: 'Proje Yönetimi ve Teknik Servis',
          description:
            'Proje yönetimi, görev ve teknik servis kayıtları ekiplerin günlük çalışma düzenine göre görünür olur.',
          items: [
            'Projeler, proje şablonları, ekip projeleri, arşiv ve çöp kutusu',
            'Görevler, liste görünümleri, zaman çizelgesi, beyaz tahta ve rapor notları',
            'Servis talepleri, iş emirleri, servis takvimi, servis geçmişi ve servis ayarları',
          ],
        },
        {
          title: 'Finans, Günlük Kurlar ve Cari Takip',
          description:
            'Finans ve yönetim ekipleri nakit, cari, günlük kur, kur farkı ve finansal performans kayıtlarını aynı veri üzerinden izler.',
          items: [
            'Nakit hesapları, günlük kur yönetimi, kur farkı, gelir tablosu, bilanço, mizan ve nakit akışı',
            'Cari bakiye, tahsilat, ödeme planı, alacak/borç yaşlandırma ve ödeme gerçekleşme takibi',
            'Satış, stok, proje, müşteri ve performans verileriyle finansal görünüm',
          ],
        },
        {
          title: 'Raporlar, Gösterge Paneli ve Dışa Aktarım',
          description:
            'Yönetim ekipleri operasyonel kararları standart raporlar, özel raporlar ve zamanlanmış çıktılarla takip eder.',
          items: [
            'Satış, tahsilat, stok, stok değerleme, stok hareket, proje, müşteri ve performans raporları',
            'Özel rapor oluşturucu, rapor zamanlamaları, e-posta gönderimi ve liste dışa aktarımı',
            'Gösterge paneli, rol bazlı görünüm, işlem kayıtları ve izlenebilirlik',
          ],
        },
        {
          title: 'İnsan Kaynakları, Ekip Yönetimi ve Onay Süreçleri',
          description:
            'Çalışan kayıtları, izin, devam, performans, ekip politikaları ve onay süreçleri şirket yetkileriyle birlikte çalışır.',
          items: [
            'Çalışan yönetimi, organizasyon şeması, izin, devam ve maaş süreçleri',
            'Performans dönemleri, hedefler, sorular, kapsam ve Çalışan Portalı ekranları',
            'Ekipler, ekip politikaları, onay süreçleri, varlık zimmetleri ve çalışan profil akışları',
          ],
        },
        {
          title: 'Demirbaş, Zimmet ve Sözleşme Yönetimi',
          description:
            'Demirbaş kayıtları ve sözleşmeler çalışan, firma, doküman ve hatırlatma akışlarıyla birlikte yönetilir.',
          items: [
            'Demirbaş türleri, konumlar, demirbaş kayıtları, zimmetler ve çalışan varlıkları',
            'Bakım planları, yaklaşan bakım hatırlatmaları ve demirbaş yaşam döngüsü takibi',
            'Sözleşme türleri, sözleşme kayıtları, yenileme/sona erme takibi ve sözleşme hatırlatmaları',
          ],
        },
        {
          title: 'Doküman, Sözleşme Dosyaları ve Drive Arşivi',
          description:
            'Dokümanlar, sözleşme dosyaları, erişim kayıtları ve arşiv akışları firma bazında yönetilir.',
          items: [
            'Doküman yönetimi, klasörler, sürümler, paylaşım, çöp kutusu, dosya erişimi ve arama',
            'Google Drive hesabınızı bağlayarak belgeleriniz için otomatik doküman yedeği',
            'KVKK uyumunu destekleyen yapılandırılabilir yetki, erişim ve işlem kayıtları',
            'Yanlışlıkla silinen veriler için çöp kutusu ve kurtarma kontrolleri',
          ],
        },
        {
          title: 'Tüm firmalarınızı tek hesap ile yönetin',
          description:
            'Birden fazla firmayı ayrı çalışma alanlarıyla yönetin; kullanıcılarınıza firmalara göre erişim yetkisi verin ve hızlı firma geçişi sağlayın.',
          items: [
            'Birden fazla firma yönetimi, firma değiştirici ve firma bazlı ayarlar',
            'Kullanıcı, rol, grup, politika, firma erişimi ve işlem kayıtları',
            'Ticra Support, Ticra Chat, gelen kutusu, bildirimler, yardım merkezi ve dış sistem bağlantısı dokümanları',
          ],
        },
      ],
    },
    integrations: {
      eyebrow: 'Entegrasyonlar',
      title: 'Canlı dış entegrasyonlar',
      description:
        'Ticra, dış servislerle entegre olarak iş süreçlerinizi daha verimli hale getirir. Ekiplerimiz yeni entegrasyonlar hazırlayarak Ticra’yı daha geniş bir ekosisteme dönüştürmek için çalışmalarını sürdürüyor.',
      items: [
        {
          name: 'Paraşüt',
          description:
            'Müşteri, ürün, satış, satın alma, finans ve belge süreçleri için Paraşüt kayıtlarıyla çift yönlü senkronizasyon kurun.',
          icon: '/images/integrations/parasut.svg',
        },
        {
          name: 'Slack',
          description:
            'Operasyon, proje, görev ve bildirimleri seçili Slack kanallarına aktarın.',
          icon: '/images/integrations/slack.svg',
        },
        {
          name: 'Google Chat',
          description:
            'Operasyon, proje ve ekip içi takip mesajlarını Google Chat alanlarına taşıyın.',
          icon: '/images/integrations/google-chat.png',
        },
        {
          name: 'Google Drive',
          description:
            'Belgelerinizin bir yedeğini Google Drive hesabınızı bağlayarak otomatik arşivleyin; doküman akışlarını Ticra kayıtlarıyla ilişkilendirin.',
          icon: '/images/integrations/google-drive.svg',
        },
        {
          name: 'Google Calendar',
          description:
            'Görev, proje, servis, müşteri takibi ve izin gibi tarihli kayıtları gizlilik kontrollü şekilde takvimde görünür yapın.',
          icon: '/images/integrations/google-calendar.svg',
        },
      ],
    },
    packages: {
      eyebrow: 'Paketler',
      title: 'Karşılaştır ve Teklif Al',
      description:
        'Ticra paketleri firma başına kullanım, depolama ve modül erişimine göre düzenlenir. Basic tek firma için temel operasyonları, Professional büyüyen işletmelerin gelişmiş operasyon ihtiyacını, Enterprise ise kurumsal kapsam ve özel yönetim senaryolarını karşılar.',
      comparisonTitle: 'Özellik ve kapsam karşılaştırması',
      comparisonDescription:
        'Depolama, firma başına kullanım, fiyatlama modeli ve modül erişimleri aktif paket kurallarını gösterir. Kullanıcı, proje, müşteri ve ürün sayısı paket limiti olarak sunulmaz.',
      comparisonFeatureLabel: 'Kapsam',
      footnote:
        'Basic ve Professional fiyatları kullanıcı başınadır; yıllık planda avantajlı fiyat uygulanır. Enterprise özel fiyatlandırılır. KDV, kur, ödeme dönemi, ek depolama, ek firma, kurulum ve entegrasyon kapsamı teklif aşamasında netleşir. Demo görüşmesinden sonra ihtiyaç duyulursa gerçek verilerinizle canlıya hazırlık süreci planlanabilir.',
      plans: [
        {
          code: 'BASIC',
          name: 'Basic',
          badge: 'Temel başlangıç',
          price: '7,99 €',
          period: '/ kullanıcı / ay',
          description:
            'Tek firma için satış, teklif, sipariş, stok, satın alma, gider, yönetici onayı ve standart raporlamayı açar.',
          limits: [
            'Tek firma kullanımı',
            '5 GB depolama dahildir',
            'Kullanıcı başına fiyatlandırılır',
          ],
          features: [
            'Teklif ve sipariş akışı',
            'Stok, depo ve fiyat listesi temeli',
            'Satın alma, gider, yönetici onayı ve standart raporlar',
          ],
          cta: 'Teklif Al',
        },
        {
          code: 'PROFESSIONAL',
          name: 'Professional',
          badge: 'Büyüyen işletmeler',
          price: '11,99 €',
          period: '/ kullanıcı / ay',
          description:
            'Büyüyen işletmeler için çoklu firma desteği, finansal raporlama, ekip yönetimi, onay, gelen kutusu ve işlem kayıtlarını ekler.',
          limits: [
            'Çoklu firma desteği',
            '10 GB depolama dahildir',
            'Kullanıcı başına fiyatlandırılır',
          ],
          features: [
            'Basic kapsamının tamamı',
            'Finans, ekipler, onay akışı ve işlem kayıtları',
            'Gelişmiş raporlama, e-posta özeti, gelen kutusu ve çoklu firma kullanımı',
          ],
          cta: 'Teklif Al',
          highlighted: true,
        },
        {
          code: 'ENTERPRISE',
          name: 'Enterprise',
          badge: 'Kurumsal kapsam',
          price: 'Özel fiyat',
          period: '',
          description:
            'Kurumsal kapsam, tüm gelişmiş modüller, dış sistem bağlantıları, doküman arşivi, çöp kutusu ve geri yükleme kontrollerini kapsar.',
          limits: [
            'Kurumsal çoklu firma yönetimi',
            '50 GB depolama dahildir',
            'Özel fiyatlandırma ile tekliflendirilir',
          ],
          features: [
            'Professional kapsamının tamamı',
            'İK, müşteri ilişkileri, doküman yönetimi, servis, demirbaş ve sözleşme yönetimi',
            'Firma geçişi, firma bazlı yetki, özel rapor, dış sistem bağlantıları (API erişimi), geri yükleme ve çok kademeli onay',
          ],
          cta: 'Teklif Al',
        },
      ],
      comparisonRows: [
        {
          feature: 'Varsayılan depolama kotası',
          values: ['5 GB', '10 GB', '50 GB'],
        },
        {
          feature: 'Fiyatlama modeli',
          values: ['Kullanıcı başına', 'Kullanıcı başına', 'Özel fiyat'],
        },
        {
          feature: 'Firma başına',
          values: [
            'Tek firma',
            'Çoklu firma desteği',
            'Kurumsal çoklu firma',
          ],
        },
        {
          feature: 'Ek firma başına',
          values: ['-', 'Teklif sürecinde netleşir', 'Teklif sürecinde netleşir'],
        },
        {
          feature: 'Ek depolama kotası',
          values: ['Teklifte netleşir', 'Teklifte netleşir', 'Teklifte netleşir'],
        },
        {
          feature: 'Satış, teklif, sipariş, stok, gider ve raporlar',
          values: ['Dahil', 'Dahil', 'Dahil'],
        },
        {
          feature: 'Finans, ekipler, onay, gelen kutusu ve işlem kayıtları',
          values: ['Yönetici onayı', 'Dahil', 'Dahil'],
        },
        {
          feature: 'Aylık fatura tarama kotası',
          values: ['-', '1.000', 'Sınırsız'],
        },
        {
          feature: 'İK, müşteri ilişkileri, doküman yönetimi, servis, demirbaş ve sözleşmeler',
          values: ['-', '-', 'Dahil'],
        },
        {
          feature: 'Gelişmiş raporlama ve gösterge paneli',
          values: ['-', 'Dahil', 'Dahil'],
        },
        {
          feature: 'Doküman arşivi, geri yükleme ve dış sistem bağlantıları',
          values: ['-', '-', 'Dahil'],
        },
        {
          feature: 'Yanlışlıkla veri silinmesine karşı koruma ve kurtarma',
          values: ['-', '-', 'Enterprise çöp kutusu ve kurtarma kontrolleri'],
        },
        {
          feature: 'Çoklu firma yönetimi, hızlı firma geçişi ve firma bazlı yetki',
          values: ['-', 'Dahil', 'Dahil'],
        },
        {
          feature: 'Onay seviyesi',
          values: ['Yönetici onayı', 'Standart onay', 'Çok kademeli onay'],
        },
      ],
    },
    contact: {
      eyebrow: 'İletişim',
      title: 'Ticra ekibine ulaşın',
      description:
        'Genel sorularınız için iletişim formunu kullanabilirsiniz. Demo ve teklif talepleri ayrı sayfalarda alınır.',
      demo: {
        badge: 'Demo talebi',
        title: 'Ürün demosu planlayalım',
        description:
          'Ekibinizin modül ihtiyacını ve mevcut süreçlerini öğrenip uygun demo akışını hazırlayalım.',
        submit: 'Demo Talebi Gönder',
        success: 'Demo talebiniz alındı. Ekip en kısa sürede dönüş yapacak.',
        error: 'Talep gönderilemedi. Lütfen bilgileri kontrol edip tekrar deneyin.',
        fields: {
          fullName: 'Ad soyad',
          companyName: 'Şirket adı',
          email: 'E-posta',
          phone: 'Telefon',
          companySize: 'Şirket büyüklüğü',
          expectedUsers: 'Beklenen kullanıcı sayısı',
          taxNumber: 'Vergi numarası',
          package: 'İlgilendiğiniz paket',
          message: 'Notunuz',
          modules: 'İlgilendiğiniz modüller',
          website: 'Web sitesi',
        },
        placeholders: {
          fullName: 'Adınız Soyadınız',
          companyName: 'Şirketiniz',
          email: 'ornek@sirket.com',
          phone: '+90 5xx xxx xx xx',
          companySize: 'Örn. 11-50 çalışan',
          expectedUsers: 'Örn. 15 kullanıcı',
          taxNumber: 'Opsiyonel',
          package: 'Paket seçin',
          message: 'Görmek istediğiniz modüller veya mevcut operasyon yapınız',
        },
      },
      purchase: {
        badge: 'Teklif talebi',
        title: 'Fiyat teklifi talebi gönderin',
        description:
          'Şirket bilgilerinizi, hedef paketinizi ve kullanıcı kapsamınızı paylaşın; ekip size uygun fiyat teklifini hazırlasın.',
        submit: 'Teklif Talebi Gönder',
        success:
          'Talebiniz alınmıştır, satış temsilcimiz en kısa sürede fiyat teklifinizi size iletecektir.',
        error: 'Teklif talebi gönderilemedi. Lütfen bilgileri kontrol edip tekrar deneyin.',
        fields: {
          fullName: 'Yetkili kişi',
          companyName: 'Şirket adı',
          email: 'E-posta',
          phone: 'Telefon',
          companySize: 'Şirket büyüklüğü',
          expectedUsers: 'Beklenen kullanıcı sayısı',
          taxNumber: 'Vergi numarası',
          package: 'Paket seçimi',
          message: 'Teklif notu',
          modules: 'Teklif kapsamındaki modüller',
          website: 'Web sitesi',
        },
        placeholders: {
          fullName: 'Yetkili ad soyad',
          companyName: 'Ticari unvan',
          email: 'teklif@sirket.com',
          phone: '+90 5xx xxx xx xx',
          companySize: 'Örn. 51-200 çalışan',
          expectedUsers: 'Örn. 40 kullanıcı',
          taxNumber: 'Opsiyonel',
          package: 'Teklif almak istediğiniz paketi seçin',
          message: 'Kurulum beklentiniz, modül kapsamınız veya zaman planınız',
        },
      },
      general: {
        badge: 'Genel iletişim',
        title: 'Mesajınızı iletin',
        description:
          'Basın, iş ortaklığı, destek yönlendirmesi veya genel sorular için Ticra ekibine ulaşın.',
        submit: 'Mesaj Gönder',
        success: 'Mesajınız alındı. Ekip en kısa sürede dönüş yapacak.',
        error: 'Mesaj gönderilemedi. Lütfen bilgileri kontrol edip tekrar deneyin.',
        fields: {
          fullName: 'Ad soyad',
          companyName: 'Şirket adı',
          email: 'E-posta',
          phone: 'Telefon',
          subject: 'Konu',
          message: 'Mesajınız',
          website: 'Web sitesi',
        },
        placeholders: {
          fullName: 'Adınız Soyadınız',
          companyName: 'Şirketiniz',
          email: 'ornek@sirket.com',
          phone: '+90 5xx xxx xx xx',
          subject: 'Kısaca konu başlığı',
          message: 'Size nasıl yardımcı olabiliriz?',
        },
      },
    },
    footer: {
      product: 'Ürün',
      company: 'Şirket',
      legal: 'Yasal',
      description: 'İş Süreçleri Yönetim Platformu',
      kucoAttribution: 'Bir Kuco ürünüdür.',
      kucoAttributionPrefix: 'Bir',
      kucoAttributionSuffix: 'ürünüdür.',
      copyright: 'Tüm hakları saklıdır.',
    },
    legal: {
      privacy: {
        title: 'Gizlilik Politikası',
        description:
          'Ticra web sitesi üzerinden paylaşılan bilgilerin nasıl işlendiğine dair özet.',
        updated: 'Son güncelleme: 25 Mayıs 2026',
        sections: [
          {
            title: 'Toplanan bilgiler',
            body: 'Demo, teklif ve iletişim formlarında ad, şirket, iletişim ve ihtiyaç bilgileri alınır.',
          },
          {
            title: 'Kullanım amacı',
            body: 'Bilgiler yalnızca başvurunuzu değerlendirmek, demo planlamak ve ticari iletişim kurmak için kullanılır.',
          },
          {
            title: 'Saklama ve güvenlik',
            body: 'Form bildirimleri yetkili ekiplerin erişebildiği e-posta altyapısına iletilir; spam önleme için honeypot, hız limiti ve Cloudflare Turnstile kontrolleri uygulanabilir.',
          },
        ],
      },
      terms: {
        title: 'Kullanım Koşulları',
        description: 'Ticra web sitesinin kullanımına ilişkin temel koşullar.',
        updated: 'Son güncelleme: 25 Mayıs 2026',
        sections: [
          {
            title: 'Web sitesi kapsamı',
            body: 'Bu site Ticra hakkında bilgilendirme, demo talebi, teklif başvurusu ve genel iletişim mesajı toplamak için hazırlanmıştır.',
          },
          {
            title: 'Başvuru değerlendirme',
            body: 'Demo veya teklif başvurusu Ticra kullanım hakkı oluşturmaz; ekip değerlendirmesi ve ticari mutabakat gerekir.',
          },
          {
            title: 'İçerik doğruluğu',
            body: 'Ürün özellikleri gelişebilir. En güncel kapsam için Ticra ekibiyle iletişime geçilmelidir.',
          },
        ],
      },
      cookie: {
        title: 'Çerez Politikası',
        description: 'Ticra web sitesinde çerez kullanımına ilişkin kısa açıklama.',
        updated: 'Son güncelleme: 25 Mayıs 2026',
        sections: [
          {
            title: 'Zorunlu çerezler',
            body: 'Site güvenliği, dil tercihi, temel gezinme deneyimi ve form spam koruması için gerekli çerezler ya da güvenlik tokenları kullanılabilir.',
          },
          {
            title: 'Analitik',
            body: 'Analitik araçlar eklenirse ziyaret davranışını anlamak için sınırlı ve toplulaştırılmış veriler işlenebilir.',
          },
          {
            title: 'Tercihler',
            body: 'Tarayıcı ayarlarınız üzerinden çerezleri sınırlandırabilir veya silebilirsiniz.',
          },
        ],
      },
    },
  },
  en: {
    metadata: {
      title: 'Ticra | Business Process Management Platform',
      description:
        'Ticra Business Process Management Platform brings quotes, orders, inventory, daily exchange rates, finance, service, HR, documents, contracts, assets, reports and multi-firm workflows into one workspace.',
    },
    nav: {
      items: [
        { label: 'Features', href: '/features' },
        { label: 'Integrations', href: '/integrations' },
        { label: 'Request Demo', href: '/demo' },
        { label: 'Request Quote', href: '/purchase' },
        { label: 'Contact', href: '/contact' },
      ],
      login: 'User Login',
      demo: 'Request Demo',
      purchase: 'Request Quote',
      language: 'TR',
    },
    home: {
      eyebrow: 'Ticra Business Process Management Platform',
      title: 'Your company workflows are ready in one workspace',
      description:
        'Ticra Business Process Management Platform brings sales, purchasing, inventory, finance, projects, service management, HR and document management into one reliable workspace for daily company operations.',
      primaryCta: 'Request Demo',
      secondaryCta: 'Request Quote',
      previewAlt: 'Ticra platform demo dashboard interface',
      metrics: [
        { value: 'One data backbone', label: 'business management platform' },
        { value: 'Access and traceability', label: 'role-based process setup' },
        { value: 'Mobile-friendly interface', label: 'use on every device' },
      ],
      modulesTitle: 'Workflows share the same data backbone',
      modulesDescription:
        'Ticra manages and analyzes your processes end to end with project management, pre-sales and after-sales services, and financial and task analytics.',
      modules: [
        {
          title: 'Customer Relations and Sales',
          description:
            'Track sales opportunities, customers, activities, quote revisions, orders and collections in one commercial flow.',
        },
        {
          title: 'Purchasing, expenses and payments',
          description:
            'Make vendors, purchase requests, expenses, payments, reconciliation and approvals visible.',
        },
        {
          title: 'Inventory and products',
          description:
            'Manage products, brands, warehouses, shipments, counts, reservations, critical stock and price lists.',
        },
        {
          title: 'Financial Performance Reporting',
          description:
            'Manage customer balances, cash flow, exchange rates, financial performance reports, scheduled reports and exports.',
        },
        {
          title: 'Project Management and Technical Service',
          description:
            'Manage project templates, tasks, work orders, technical service requests and calendars in the same company context.',
        },
        {
          title: 'Human Resources, Team Management and Approval Workflows',
          description:
            'Keep employees, leave, attendance, performance, salary, organization, team management and approval workflows structured.',
        },
        {
          title: 'Document and Contract Management',
          description:
            'Manage documents and contracts with folders, versions, search and permissions, and archive a copy of your documents to Google Drive.',
        },
        {
          title: 'Manage all your companies from one account',
          description:
            'Switch between companies quickly. Give users access permissions by company.',
        },
      ],
      operationsTitle: 'A clear control panel for business users',
      operationsDescription:
        'Ticra is designed for repeat daily use: fast to learn, dense enough for real data, and predictable across modules.',
      operations: [
        'Role and permission structure supporting KVKK-aligned operating processes',
        'Quote, purchasing and project tracking for project-based trading companies',
        'Efficient use from every device through a mobile-friendly interface',
        'Automatically store a copy of your documents on Google Drive.',
        'Multi-company support, fast firm switching and firm-level user access',
      ],
      faqTitle: 'Questions',
      faqs: [
        {
          question: 'Can users sign up by themselves?',
          answer:
            'No. Setup, demo and quote requests are reviewed by the team, so the site collects requests instead of public registrations.',
        },
        {
          question: 'Who is Ticra built for?',
          answer:
            'Ticra fits B2B teams, trading and service businesses, and especially project-based trading companies that manage quotes, purchasing and project tracking in the same flow.',
        },
        {
          question: 'Can go-live preparation run with real data after the demo?',
          answer:
            'If needed, a limited evaluation and go-live preparation process can be planned with your real data after the demo meeting. This work is handled within the sales plan, separate from the standard public packages.',
        },
        {
          question: 'Where do existing users log in?',
          answer:
            'The User Login button in the top navigation takes users directly to ticra.app.',
        },
      ],
      ctaTitle: 'Evaluate Ticra around your own operating model',
      ctaDescription:
        'Request a demo or send a quote request so the team can clarify package, user, firm, storage and integration scope with you.',
    },
    features: {
      eyebrow: 'Features',
      title:
        'Ticra is made of integrated modules built to manage all your business processes.',
      description:
        'Ticra’s modular structure brings project management, sales, purchasing, inventory, technical service, HR, financial analytics, document and contract management, asset management and approval workflows together. Your teams can work across the same company or other companies you authorize.',
      languageSupport: {
        title: 'Platform interface infrastructure in 5 languages',
        description:
          'The Ticra platform interface includes Turkish, English, German, French and Russian language infrastructure so multilingual teams can work in the same operations center.',
        languages: [
          { code: 'TR', name: 'Türkçe', region: 'Turkey' },
          { code: 'EN', name: 'English', region: 'Global' },
          { code: 'DE', name: 'Deutsch', region: 'DACH' },
          { code: 'FR', name: 'Français', region: 'France' },
          { code: 'RU', name: 'Русский', region: 'CIS' },
        ],
      },
      groups: [
        {
          title: 'Customer Relations, Quotes, Orders and Sales',
          description:
            'The commercial flow from sales opportunities to quote revisions and orders stays traceable in the customer context.',
          items: [
            'Sales opportunity, customer, segment, activity and sales coverage tracking',
            'Quotes, quote revisions, quote follow-up, archive, cancellation and e-document links',
            'Quote-to-order conversion, sales orders, collection plans, customer balances and sales reconciliation visibility',
          ],
        },
        {
          title: 'Purchasing, expenses and payments',
          description:
            'Vendor, request, expense and payment records are kept ready for approval and reconciliation workflows.',
          items: [
            'Purchase requests, vendors, expense categories and tags',
            'Expense approvals, spend approval aging, payables aging and VAT reports',
            'Payment records, Paraşüt purchase bill reading, reconciliation and e-invoice workspace',
          ],
        },
        {
          title: 'Inventory, products, warehouses and shipments',
          description:
            'Product and stock movements move together with sales, purchasing and shipment records.',
          items: [
            'Product catalogs, brands, product groups, measurement units and price lists',
            'Warehouses, warehouse access, critical stock, stock query, counts and reservations',
            'Goods receipts, shipments, return orders, packing slips and stock movement reports',
          ],
        },
        {
          title: 'Project Management and Technical Service',
          description:
            'Project management, task and technical service records become visible around the team’s daily working model.',
          items: [
            'Projects, project templates, team projects, archive and trash',
            'Tasks, list views, timeline, whiteboard and report notes',
            'Service requests, work orders, service calendar, service history and service settings',
          ],
        },
        {
          title: 'Finance, Daily Exchange Rates and Balances',
          description:
            'Finance and management teams track cash, balances, daily exchange rates, FX variance and financial performance from the same data model.',
          items: [
            'Cash accounts, daily exchange rate management, FX variance, income statement, balance sheet, trial balance and cash flow',
            'Customer balances, collections, payment plans, receivables/payables aging and payment realization tracking',
            'Financial visibility connected to sales, inventory, project, customer and performance data',
          ],
        },
        {
          title: 'Reports, Dashboard and Exports',
          description:
            'Management teams follow operational decisions through standard reports, custom reports and scheduled outputs.',
          items: [
            'Sales, collection, inventory, stock valuation, stock movement, project, customer and performance reports',
            'Custom report builder, report schedules, email delivery and list exports',
            'Dashboard, role-based visibility, activity records and traceability',
          ],
        },
        {
          title: 'Human Resources, Team Management and Approval Workflows',
          description:
            'Employee records, leave, attendance, performance, team policies and approval workflows work with company permissions.',
          items: [
            'Employee management, organization chart, leave, attendance and salary workflows',
            'Performance cycles, goals, questions, coverage and Employee Portal screens',
            'Teams, team policies, approval workflows, employee assets and employee profile flows',
          ],
        },
        {
          title: 'Assets, Assignments and Contract Management',
          description:
            'Company assets and contracts are managed together with employees, firms, documents and reminder workflows.',
          items: [
            'Asset types, locations, asset records, assignments and employee assets',
            'Maintenance schedules, upcoming maintenance reminders and asset lifecycle tracking',
            'Contract types, contract records, renewal/expiration tracking and contract reminders',
          ],
        },
        {
          title: 'Documents, Contract Files and Drive Archive',
          description:
            'Documents, contract files, access records and archive workflows are managed per firm.',
          items: [
            'Document management, folders, versions, sharing, trash, file access and search',
            'Automatic document backup for your files by connecting your Google Drive account',
            'Configurable permissions, access controls and activity records that support KVKK-aligned use',
            'Trash and recovery controls for accidentally deleted data',
          ],
        },
        {
          title: 'Manage all firms with one account',
          description:
            'Manage multiple firms as separate workspaces, authorize users by firm and switch between firms quickly.',
          items: [
            'Multiple firm management, firm switcher and firm-level settings',
            'Users, roles, groups, policies, firm access and activity records',
            'Ticra Support, Ticra Chat, inbox, notifications, help center and external system connection docs',
          ],
        },
      ],
    },
    integrations: {
      eyebrow: 'Integrations',
      title: 'Live external integrations',
      description:
        'Ticra makes your business processes more efficient by integrating with external services. Our teams continue building new integrations to turn Ticra into a broader ecosystem.',
      items: [
        {
          name: 'Paraşüt',
          description:
            'Set up two-way synchronization with Paraşüt records for customer, product, sales, purchasing, finance and document processes.',
          icon: '/images/integrations/parasut.svg',
        },
        {
          name: 'Slack',
          description:
            'Send operations, project, task and notification updates to selected Slack channels.',
          icon: '/images/integrations/slack.svg',
        },
        {
          name: 'Google Chat',
          description:
            'Send operations, project and internal team tracking messages to Google Chat spaces.',
          icon: '/images/integrations/google-chat.png',
        },
        {
          name: 'Google Drive',
          description:
            'Automatically archive a copy of your documents by connecting your Google Drive account, and link document flows with Ticra records.',
          icon: '/images/integrations/google-drive.svg',
        },
        {
          name: 'Google Calendar',
          description:
            'Make dated tasks, projects, service plans, customer follow-ups and leave records visible on calendars with privacy controls.',
          icon: '/images/integrations/google-calendar.svg',
        },
      ],
    },
    packages: {
      eyebrow: 'Packages',
      title: 'Compare and Request a Quote',
      description:
        'Ticra packages are organized by per-firm use, storage and module access. Basic covers core operations for a single firm, Professional meets the advanced operations needs of growing businesses, and Enterprise covers corporate scope and custom management scenarios.',
      comparisonTitle: 'Feature and scope comparison',
      comparisonDescription:
        'Storage, per-firm use, pricing model and module access reflect active package rules. User, project, customer and product counts are not presented as package limits.',
      comparisonFeatureLabel: 'Scope',
      footnote:
        'Basic and Professional are priced per user; yearly billing uses advantageous pricing. Enterprise uses custom pricing. VAT, currency, billing period, extra storage, additional per-firm use, setup and integration scope are clarified during the quote process. If needed after the demo meeting, go-live preparation can be planned with your real data.',
      plans: [
        {
          code: 'BASIC',
          name: 'Basic',
          badge: 'Core starter',
          price: '7.99 €',
          period: '/ user / month',
          description:
            'Opens sales, quotes, orders, inventory, purchasing, expenses, manager approval and standard reports for one firm.',
          limits: [
            'Single-firm use',
            '5 GB storage included',
            'Priced per user',
          ],
          features: [
            'Quote and order flow',
            'Inventory, warehouse and price-list foundation',
            'Purchasing, expenses, manager approval and standard reports',
          ],
          cta: 'Request Quote',
        },
        {
          code: 'PROFESSIONAL',
          name: 'Professional',
          badge: 'Growing businesses',
          price: '11.99 €',
          period: '/ user / month',
          description:
            'Adds multi-company support, financial reporting, team management, approvals, inbox and activity records for growing businesses.',
          limits: [
            'Multi-company support',
            '10 GB storage included',
            'Priced per user',
          ],
          features: [
            'Everything in Basic',
            'Finance, teams, approval workflow and activity records',
            'Advanced reporting, email digest, inbox and multi-company use',
          ],
          cta: 'Request Quote',
          highlighted: true,
        },
        {
          code: 'ENTERPRISE',
          name: 'Enterprise',
          badge: 'Corporate scope',
          price: 'Custom pricing',
          period: '',
          description:
            'Covers corporate scope, all advanced modules, external system connections, document archive, trash and restore controls.',
          limits: [
            'Corporate multi-firm management',
            '50 GB storage included',
            'Quoted with custom pricing',
          ],
          features: [
            'Everything in Professional',
            'HR, customer relations, document management, service, assets and contract management',
            'Firm switching, firm-level access, custom reports, external system connections (API access), restore and multi-level approvals',
          ],
          cta: 'Request Quote',
        },
      ],
      comparisonRows: [
        {
          feature: 'Default storage quota',
          values: ['5 GB', '10 GB', '50 GB'],
        },
        {
          feature: 'Pricing model',
          values: ['Per user', 'Per user', 'Custom pricing'],
        },
        {
          feature: 'Per-firm use',
          values: [
            'Single firm',
            'Multi-company support',
            'Corporate multi-firm support',
          ],
        },
        {
          feature: 'Additional per-firm use',
          values: ['-', 'Clarified during quote process', 'Clarified during quote process'],
        },
        {
          feature: 'Extra storage quota',
          values: ['Clarified by quote', 'Clarified by quote', 'Clarified by quote'],
        },
        {
          feature: 'Sales, quotes, orders, inventory, expenses and reports',
          values: ['Included', 'Included', 'Included'],
        },
        {
          feature: 'Finance, teams, approvals, inbox and activity records',
          values: ['Manager approval', 'Included', 'Included'],
        },
        {
          feature: 'Monthly invoice scan quota',
          values: ['-', '1,000', 'Unlimited'],
        },
        {
          feature: 'HR, customer relations, document management, service, assets and contracts',
          values: ['-', '-', 'Included'],
        },
        {
          feature: 'Advanced reporting and dashboard',
          values: ['-', 'Included', 'Included'],
        },
        {
          feature: 'Document archive, restore controls and external system connections',
          values: ['-', '-', 'Included'],
        },
        {
          feature: 'Protection and recovery for accidentally deleted data',
          values: ['-', '-', 'Enterprise trash and recovery controls'],
        },
        {
          feature: 'Multi-firm management, quick firm switching and firm-level access',
          values: ['-', 'Included', 'Included'],
        },
        {
          feature: 'Approval level',
          values: ['Manager approval', 'Standard approval', 'Multi-level approval'],
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Contact the Ticra team',
      description:
        'Use the contact form for general questions. Demo and quote requests are collected on separate pages.',
      demo: {
        badge: 'Demo request',
        title: 'Plan a product demo',
        description:
          'Tell us about your modules and current workflows so we can prepare a focused demo.',
        submit: 'Send Demo Request',
        success: 'Your demo request has been received. The team will get back to you shortly.',
        error: 'The request could not be sent. Please check the details and try again.',
        fields: {
          fullName: 'Full name',
          companyName: 'Company name',
          email: 'Email',
          phone: 'Phone',
          companySize: 'Company size',
          expectedUsers: 'Expected users',
          taxNumber: 'Tax number',
          package: 'Package of interest',
          message: 'Notes',
          modules: 'Modules of interest',
          website: 'Website',
        },
        placeholders: {
          fullName: 'Your full name',
          companyName: 'Your company',
          email: 'name@company.com',
          phone: '+1 555 000 0000',
          companySize: 'E.g. 11-50 employees',
          expectedUsers: 'E.g. 15 users',
          taxNumber: 'Optional',
          package: 'Select a package',
          message: 'Modules you want to see or your current operating model',
        },
      },
      purchase: {
        badge: 'Quote request',
        title: 'Request a price quote',
        description:
          'Share your company details, target package and user scope so the team can prepare the right quote.',
        submit: 'Send Quote Request',
        success:
          'Your request has been received. A sales representative will send your price quote as soon as possible.',
        error: 'The request could not be sent. Please check the details and try again.',
        fields: {
          fullName: 'Authorized person',
          companyName: 'Company name',
          email: 'Email',
          phone: 'Phone',
          companySize: 'Company size',
          expectedUsers: 'Expected users',
          taxNumber: 'Tax number',
          package: 'Package selection',
          message: 'Quote notes',
          modules: 'Modules in quote scope',
          website: 'Website',
        },
        placeholders: {
          fullName: 'Authorized full name',
          companyName: 'Legal company name',
          email: 'quote@company.com',
          phone: '+1 555 000 0000',
          companySize: 'E.g. 51-200 employees',
          expectedUsers: 'E.g. 40 users',
          taxNumber: 'Optional',
          package: 'Select the package you want quoted',
          message: 'Setup expectations, module scope or timeline',
        },
      },
      general: {
        badge: 'General contact',
        title: 'Send a message',
        description:
          'Reach the Ticra team for press, partnership, support routing or general questions.',
        submit: 'Send Message',
        success: 'Your message has been received. The team will get back to you shortly.',
        error: 'The message could not be sent. Please check the details and try again.',
        fields: {
          fullName: 'Full name',
          companyName: 'Company name',
          email: 'Email',
          phone: 'Phone',
          subject: 'Subject',
          message: 'Message',
          website: 'Website',
        },
        placeholders: {
          fullName: 'Your full name',
          companyName: 'Your company',
          email: 'name@company.com',
          phone: '+1 555 000 0000',
          subject: 'Short subject',
          message: 'How can we help?',
        },
      },
    },
    footer: {
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
      description: 'Business Process Management Platform',
      kucoAttribution: 'A Kuco product.',
      kucoAttributionPrefix: 'A',
      kucoAttributionSuffix: 'product.',
      copyright: 'All rights reserved.',
    },
    legal: {
      privacy: {
        title: 'Privacy Policy',
        description:
          'A short summary of how information submitted through the Ticra website is processed.',
        updated: 'Last updated: May 25, 2026',
        sections: [
          {
            title: 'Information collected',
            body: 'Demo, quote and contact forms collect name, company, contact and request details.',
          },
          {
            title: 'Purpose',
            body: 'Information is used only to evaluate your request, schedule a demo and communicate commercially.',
          },
          {
            title: 'Storage and security',
            body: 'Form notifications are delivered to authorized team email infrastructure; honeypot, rate limiting and Cloudflare Turnstile checks may be used to reduce spam.',
          },
        ],
      },
      terms: {
        title: 'Terms of Use',
        description: 'Basic terms for using the Ticra marketing website.',
        updated: 'Last updated: May 25, 2026',
        sections: [
          {
            title: 'Website scope',
            body: 'This website provides Ticra information and collects demo requests, quote requests and general contact messages.',
          },
          {
            title: 'Request review',
            body: 'A demo or quote request does not create a right to use Ticra; team review and commercial agreement are required.',
          },
          {
            title: 'Content accuracy',
            body: 'Product capabilities may evolve. Contact the Ticra team for the latest scope.',
          },
        ],
      },
      cookie: {
        title: 'Cookie Policy',
        description: 'A short explanation of cookie use on the Ticra website.',
        updated: 'Last updated: May 25, 2026',
        sections: [
          {
            title: 'Essential cookies',
            body: 'Essential cookies or security tokens may be used for site security, language preference, core navigation and form spam protection.',
          },
          {
            title: 'Analytics',
            body: 'If analytics tools are added, limited and aggregated visit data may be processed to understand site usage.',
          },
          {
            title: 'Preferences',
            body: 'You can restrict or delete cookies through your browser settings.',
          },
        ],
      },
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function resolveLocale(value: string) {
  return isLocale(value) ? value : defaultLocale;
}
