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
      title: 'Şirketinizin günlük işlerini profesyonelce yönetin',
      description:
        'Ticra; satıştan satın almaya, stoktan finansa, projeden teknik servise, insan kaynaklarından doküman ve sözleşme yönetimine kadar ekiplerinizin her gün kullandığı süreçleri tek platformda toplar.',
      primaryCta: 'Demo Talep Et',
      secondaryCta: 'Teklif Al',
      previewAlt: 'Ticra uygulama ekranı',
      metrics: [
        { value: 'Tek merkezden yönetim', label: 'satıştan finansa tüm süreçler' },
        { value: 'Yetkili ve izlenebilir kullanım', label: 'ekibinize uygun erişim' },
        { value: 'Mobil uyumlu arayüz', label: 'tüm cihazlarda rahat kullanım' },
      ],
      modulesTitle: 'Her gün kullandığınız süreçler birlikte çalışır',
      modulesDescription:
        'Ticra satış, satın alma, stok ve finansla başlayan iş akışlarını proje, servis, İK, doküman, sözleşme ve çoklu firma yönetimine kadar genişletir.',
      modules: [
        {
          title: 'Müşteri İlişkileri ve Satış',
          description:
            'Müşteri adayından teklife, siparişten tahsilata kadar satış sürecini ekipçe takip edin.',
        },
        {
          title: 'Satın alma, gider ve ödeme',
          description:
            'Tedarikçi taleplerini, giderleri, ödemeleri, mutabakatları ve onayları dağılmadan yönetin.',
        },
        {
          title: 'Stok ve ürün',
          description:
            'Ürün, marka, depo, sevkiyat, sayım, rezervasyon, kritik stok ve fiyat listelerini güncel tutun.',
        },
        {
          title: 'Finans ve Raporlama',
          description:
            'Cari hareketleri, nakit akışını, günlük kurları, raporları ve dışa aktarımları aynı yerden izleyin.',
        },
        {
          title: 'Proje Yönetimi ve Teknik Servis',
          description:
            'Projeleri, görevleri, iş emirlerini, servis taleplerini ve takvim kayıtlarını ekiplerinize göre planlayın.',
        },
        {
          title: 'İnsan Kaynakları, Ekip Yönetimi ve Onay Süreçleri',
          description:
            'Çalışan kayıtlarını, izinleri, devam takibini, performansı, maaşları, ekipleri ve onayları düzenli tutun.',
        },
        {
          title: 'Doküman, Sözleşme ve Demirbaş Yönetimi',
          description:
            'Belgeleri, sözleşmeleri ve demirbaşları arama, hatırlatma, yetki ve Drive yedekleme desteğiyle yönetin.',
        },
        {
          title: 'Tüm firmalarınızı tek hesap ile yönetin',
          description:
            'Firmalarınız arasında hızlı geçiş yapın. Kullanıcılarınıza firmalara göre erişim yetkisi verin.',
        },
      ],
      operationsTitle: 'Ekiplerin her gün rahatça kullanacağı iş ekranları',
      operationsDescription:
        'Ticra hızlı öğrenilir, yoğun iş temposunda düzenini korur ve satış, operasyon, finans, servis ve yönetim ekiplerinin tekrar tekrar kullanacağı net ekranlar sunar.',
      operations: [
        'Rol ve izinlerle güvenli, izlenebilir ve kontrollü kullanım',
        'Ticaret yapan proje firmaları için teklif, satın alma ve proje takibi',
        'Mobil uyumlu arayüzle ofiste, sahada ve yolda kesintisiz erişim',
        'Belgelerinizin bir kopyasını Google Drive üzerinde otomatik saklama',
        'Çoklu firma yönetimi, hızlı firma geçişi ve firma bazlı kullanıcı izni',
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
            'Evet. Demo görüşmesinden sonra ihtiyaç duyarsanız gerçek verilerinizle kontrollü bir hazırlık süreci planlanabilir. Bu adım teklif sürecinde ayrıca netleştirilir.',
        },
        {
          question: 'Mevcut uygulamaya nereden girilir?',
          answer:
            'Üst menüdeki Kullanıcı Girişi butonu doğrudan ticra.app çalışma alanına yönlendirir.',
        },
      ],
      ctaTitle: 'Ticra’yı kendi operasyon yapınıza göre değerlendirin',
      ctaDescription:
        'Demo talep edin ya da teklif isteyin; Ticra ekibi paket, kullanıcı sayısı, firma sayısı, depolama ve entegrasyon ihtiyaçlarınızı birlikte netleştirsin.',
    },
    features: {
      eyebrow: 'Özellikler',
      title:
        'Tüm iş süreçleriniz tek platformda birlikte çalışır',
      description:
        'Satış, satın alma, stok, finans, proje, teknik servis, İK, doküman, sözleşme, demirbaş ve çoklu firma yönetimi aynı ürün deneyimi içinde birleşir. Ekipleriniz yetkili oldukları firmalarda aynı güncel bilgilerle çalışır.',
      languageSupport: {
        title: '5 dilde kullanım desteği',
        description:
          'Ticra arayüzü Türkçe, İngilizce, Almanca, Fransızca ve Rusça kullanılabilir. Çok dilli ekipler aynı süreçleri kendi tercih ettikleri dilde takip edebilir.',
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
            'Aday müşteriden teklif revizyonuna, satış fırsatından siparişe uzanan süreç müşteri bilgileriyle birlikte izlenebilir kalır.',
          items: [
            'Aday müşteri, müşteri, segment, aktivite, satış fırsatı ve satış süreci takibi',
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
            'Ödeme kayıtları, Paraşüt alış faturası okuma, mutabakat ve e-fatura işlemleri',
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
            'Projeler, proje şablonları, ekip projeleri, arşiv ve silinen kayıtları geri alma',
            'Görevler, liste görünümleri, zaman çizelgesi, beyaz tahta ve rapor notları',
            'Servis talepleri, iş emirleri, servis takvimi, servis geçmişi ve servis planları',
          ],
        },
        {
          title: 'Finans, Günlük Kurlar ve Cari Takip',
          description:
            'Finans ve yönetim ekipleri nakit, cari, günlük kur, kur farkı ve finansal performans kayıtlarını birlikte izler.',
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
            'Gösterge paneli, rol bazlı görünüm, kayıt geçmişi ve izlenebilirlik',
          ],
        },
        {
          title: 'İnsan Kaynakları, Ekip Yönetimi ve Onay Süreçleri',
          description:
            'Çalışan kayıtları, izin, devam, performans, ekip politikaları ve onay süreçleri şirket yetkileriyle birlikte çalışır.',
          items: [
            'Çalışan yönetimi, organizasyon şeması, izin, devam ve maaş süreçleri',
            'Performans dönemleri, hedefler, değerlendirme formları ve çalışan portalı',
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
            'Doküman yönetimi, klasörler, sürümler, paylaşım, dosya erişimi, arama ve geri alma',
            'Google Drive hesabınızı bağlayarak belgeleriniz için otomatik doküman yedeği',
            'KVKK süreçlerini destekleyen yapılandırılabilir yetki, erişim ve kayıt geçmişi',
            'Yanlışlıkla silinen veriler için güvenli geri alma kontrolleri',
          ],
        },
        {
          title: 'Tüm firmalarınızı tek hesap ile yönetin',
          description:
            'Birden fazla firmayı ayrı çalışma alanlarıyla yönetin; kullanıcılarınıza firmalara göre erişim yetkisi verin ve hızlı firma geçişi sağlayın.',
          items: [
            'Birden fazla firma yönetimi, firma değiştirici ve firma bazlı ayarlar',
            'Kullanıcı, rol, grup, erişim politikası, firma izni ve kayıt geçmişi',
            'Destek, bildirimler, ekip mesajları, gelen kutusu ve yardım merkezi',
          ],
        },
      ],
    },
    integrations: {
      eyebrow: 'Entegrasyonlar',
      title: 'Kullandığınız araçlarla birlikte çalışır',
      description:
        'Paraşüt, Google Drive, Slack, Google Chat ve Google Calendar bağlantılarıyla finans, doküman, görev ve ekip iletişimi süreçlerini Ticra kayıtlarıyla birlikte yönetin.',
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
        'Basic paketi tek firma için temel satış, stok ve satın alma süreçlerini; Professional paketi büyüyen ekiplerin finans, rapor, onay ve çoklu firma ihtiyacını; Enterprise paketi ise İK, servis, doküman, demirbaş, sözleşme ve gelişmiş yönetim ihtiyaçlarını karşılar.',
      comparisonTitle: 'Paketleri karşılaştırın',
      comparisonDescription:
        'Depolama, firma kullanımı, fiyatlama modeli ve modül erişimleri paketler arasındaki ana farkları gösterir. Kullanıcı, proje, müşteri ve ürün sayısı için standart bir sınır sunulmaz.',
      comparisonFeatureLabel: 'Özellik',
      footnote:
        'Basic ve Professional fiyatları kullanıcı başınadır; yıllık planda avantajlı fiyat uygulanır. Enterprise özel fiyatlandırılır. KDV, kur, ödeme dönemi, ek depolama, ek firma, kurulum ve entegrasyon ihtiyaçları teklif aşamasında netleşir. Demo görüşmesinden sonra gerekirse gerçek verilerinizle kullanım hazırlığı planlanabilir.',
      plans: [
        {
          code: 'BASIC',
          name: 'Basic',
          badge: 'Temel başlangıç',
          price: '7,99 €',
          period: '/ kullanıcı / ay',
          description:
            'Tek firma için satış, teklif, sipariş, stok, satın alma, gider, yönetici onayı ve standart raporları başlatır.',
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
            'Büyüyen işletmeler için çoklu firma, finansal raporlama, ekip yönetimi, onay akışları, bildirimler ve kayıt geçmişi ekler.',
          limits: [
            'Çoklu firma desteği',
            '10 GB depolama dahildir',
            'Kullanıcı başına fiyatlandırılır',
          ],
          features: [
            'Basic paketindeki tüm özellikler',
            'Finans, ekipler, onay akışı ve kayıt geçmişi',
            'Gelişmiş raporlama, e-posta özeti, bildirimler ve çoklu firma kullanımı',
          ],
          cta: 'Teklif Al',
          highlighted: true,
        },
        {
          code: 'ENTERPRISE',
          name: 'Enterprise',
          badge: 'Kurumsal kullanım',
          price: 'Özel fiyat',
          period: '',
          description:
            'Enterprise; İK, müşteri ilişkileri, servis, doküman, demirbaş, sözleşme, özel rapor, entegrasyon ve gelişmiş geri alma ihtiyaçları için hazırlanır.',
          limits: [
            'Kurumsal çoklu firma yönetimi',
            '50 GB depolama dahildir',
            'Özel fiyatlandırma ile tekliflendirilir',
          ],
          features: [
            'Professional paketindeki tüm özellikler',
            'İK, müşteri ilişkileri, doküman yönetimi, servis, demirbaş ve sözleşme yönetimi',
            'Firma geçişi, firma bazlı yetki, özel rapor, API erişimi, güvenli geri alma ve çok kademeli onay',
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
          feature: 'Firma kullanımı',
          values: [
            'Tek firma',
            'Çoklu firma desteği',
            'Kurumsal çoklu firma',
          ],
        },
        {
          feature: 'Ek firma ihtiyacı',
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
          feature: 'Finans, ekipler, onaylar, bildirimler ve kayıt geçmişi',
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
          feature: 'Doküman arşivi, geri alma ve dış sistem bağlantıları',
          values: ['-', '-', 'Dahil'],
        },
        {
          feature: 'Yanlışlıkla veri silinmesine karşı koruma ve kurtarma',
          values: ['-', '-', 'Enterprise güvenli geri alma kontrolleri'],
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
          'Ekibinizin satış, operasyon, finans, servis, İK ve doküman ihtiyaçlarını öğrenip size uygun demo akışını hazırlayalım.',
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
          'Şirket bilgilerinizi, ilgilendiğiniz paketi ve beklenen kullanıcı sayısını paylaşın; ekip size uygun fiyat teklifini hazırlasın.',
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
          modules: 'İlgilendiğiniz modüller',
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
          message: 'Kurulum beklentiniz, ihtiyaç duyduğunuz modüller veya zaman planınız',
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
            body: 'Form bildirimleri yalnızca yetkili ekiplerin erişebildiği e-posta hesaplarına iletilir; spam önleme için honeypot, hız limiti ve Cloudflare Turnstile kontrolleri uygulanabilir.',
          },
        ],
      },
      terms: {
        title: 'Kullanım Koşulları',
        description: 'Ticra web sitesinin kullanımına ilişkin temel koşullar.',
        updated: 'Son güncelleme: 25 Mayıs 2026',
        sections: [
          {
            title: 'Web sitesi içeriği',
            body: 'Bu site Ticra hakkında bilgilendirme, demo talebi, teklif başvurusu ve genel iletişim mesajı toplamak için hazırlanmıştır.',
          },
          {
            title: 'Başvuru değerlendirme',
            body: 'Demo veya teklif başvurusu Ticra kullanım hakkı oluşturmaz; ekip değerlendirmesi ve ticari mutabakat gerekir.',
          },
          {
            title: 'İçerik doğruluğu',
            body: 'Ürün özellikleri zaman içinde gelişebilir. En güncel bilgi için Ticra ekibiyle iletişime geçilmelidir.',
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
        'Ticra brings quotes, orders, inventory, purchasing, finance, projects, service, HR, documents, contracts, assets, reports and multi-company processes together on one platform.',
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
      title: 'Manage your company’s daily work from one place',
      description:
        'Ticra brings sales, purchasing, inventory, finance, projects, technical service, HR, document and contract management into one platform your teams can use every day.',
      primaryCta: 'Request Demo',
      secondaryCta: 'Request Quote',
      previewAlt: 'Ticra application interface',
      metrics: [
        { value: 'One place to manage work', label: 'from sales to finance' },
        { value: 'Controlled and traceable use', label: 'access for every team' },
        { value: 'Mobile-friendly interface', label: 'comfortable use on every device' },
      ],
      modulesTitle: 'Daily workflows work together',
      modulesDescription:
        'Ticra starts with sales, purchasing, inventory and finance, then extends to projects, service, HR, documents, contracts and multi-company management.',
      modules: [
        {
          title: 'Customer Relations and Sales',
          description:
            'Track leads, quotes, orders, activities and collections through the full sales process.',
        },
        {
          title: 'Purchasing, expenses and payments',
          description:
            'Manage vendor requests, expenses, payments, reconciliations and approvals without scattered follow-up.',
        },
        {
          title: 'Inventory and products',
          description:
            'Keep products, brands, warehouses, shipments, counts, reservations, critical stock and price lists up to date.',
        },
        {
          title: 'Finance and Reporting',
          description:
            'Follow balances, cash flow, exchange rates, reports, scheduled outputs and exports from the same place.',
        },
        {
          title: 'Project Management and Technical Service',
          description:
            'Plan projects, tasks, work orders, service requests and calendars around your teams.',
        },
        {
          title: 'Human Resources, Team Management and Approval Workflows',
          description:
            'Keep employee records, leave, attendance, performance, salary, teams and approvals organized.',
        },
        {
          title: 'Documents, Contracts and Assets',
          description:
            'Manage documents, contracts and assets with search, reminders, permissions and Google Drive backup support.',
        },
        {
          title: 'Manage all companies from one account',
          description:
            'Switch between companies quickly. Give users access permissions by company.',
        },
      ],
      operationsTitle: 'Work screens your teams can use every day',
      operationsDescription:
        'Ticra is easy to learn, stays organized under busy workloads and gives sales, operations, finance, service and management teams clear daily screens.',
      operations: [
        'Secure, controlled and traceable use through roles and permissions',
        'Quote, purchasing and project tracking for project-based trading companies',
        'Mobile-friendly access from the office, field or road',
        'Automatically store a copy of your documents on Google Drive',
        'Multi-company management, fast company switching and company-level access',
      ],
      faqTitle: 'Questions',
      faqs: [
        {
          question: 'Can users sign up by themselves?',
          answer:
            'No. Setup, demo and quote requests are reviewed by the team, so the site collects requests instead of open self-signups.',
        },
        {
          question: 'Who is Ticra built for?',
          answer:
            'Ticra fits B2B teams, trading and service businesses, and especially project-based trading companies that manage quotes, purchasing and project tracking in the same flow.',
        },
        {
          question: 'Can go-live preparation run with real data after the demo?',
          answer:
            'Yes. After the demo, a controlled preparation process can be planned with your real data if needed. This step is clarified separately during the quote process.',
        },
        {
          question: 'Where do existing users log in?',
          answer:
            'The User Login button in the top navigation takes users directly to ticra.app.',
        },
      ],
      ctaTitle: 'Evaluate Ticra around your own operating model',
      ctaDescription:
        'Request a demo or quote so the Ticra team can clarify your package, user count, company count, storage and integration needs with you.',
    },
    features: {
      eyebrow: 'Features',
      title:
        'Your business processes work together on one platform.',
      description:
        'Sales, purchasing, inventory, finance, projects, technical service, HR, documents, contracts, assets and multi-company management come together in one product experience. Your teams work with the same up-to-date information in the companies they are allowed to access.',
      languageSupport: {
        title: 'Use Ticra in 5 languages',
        description:
          'The Ticra interface can be used in Turkish, English, German, French and Russian, so multilingual teams can follow the same processes in their preferred language.',
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
            'The path from opportunity to quote revision and order stays visible with the customer record.',
          items: [
            'Sales opportunity, customer, segment, activity and sales process tracking',
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
            'Payment records, Paraşüt purchase bill reading, reconciliation and e-invoice operations',
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
            'Projects, project templates, team projects, archive and restore for deleted records',
            'Tasks, list views, timeline, whiteboard and report notes',
            'Service requests, work orders, service calendar, service history and service planning',
          ],
        },
        {
          title: 'Finance, Daily Exchange Rates and Balances',
          description:
            'Finance and management teams follow cash, balances, daily exchange rates, FX variance and financial performance together.',
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
            'Dashboard, role-based visibility, record history and traceability',
          ],
        },
        {
          title: 'Human Resources, Team Management and Approval Workflows',
          description:
            'Employee records, leave, attendance, performance, team policies and approval workflows work with company permissions.',
          items: [
            'Employee management, organization chart, leave, attendance and salary workflows',
            'Performance cycles, goals, review forms and employee portal',
            'Teams, team policies, approval workflows, employee assets and employee profile flows',
          ],
        },
        {
          title: 'Assets, Assignments and Contract Management',
          description:
            'Company assets and contracts are managed together with employees, companies, documents and reminder workflows.',
          items: [
            'Asset types, locations, asset records, assignments and employee assets',
            'Maintenance schedules, upcoming maintenance reminders and asset lifecycle tracking',
            'Contract types, contract records, renewal/expiration tracking and contract reminders',
          ],
        },
        {
          title: 'Documents, Contract Files and Drive Archive',
          description:
            'Documents, contract files, access records and archive workflows are managed per company.',
          items: [
            'Document management, folders, versions, sharing, file access, search and restore',
            'Automatic document backup for your files by connecting your Google Drive account',
            'Configurable permissions, access controls and record history that support KVKK-aligned use',
            'Secure restore controls for accidentally deleted data',
          ],
        },
        {
          title: 'Manage all companies with one account',
          description:
            'Manage multiple companies separately, authorize users by company and switch between companies quickly.',
          items: [
            'Multiple company management, company switcher and company-level settings',
            'Users, roles, groups, access policies, company permissions and record history',
            'Support, notifications, team messages, inbox and help center',
          ],
        },
      ],
    },
    integrations: {
      eyebrow: 'Integrations',
      title: 'Works with the tools your teams already use',
      description:
        'Connect Ticra with Paraşüt, Google Drive, Slack, Google Chat and Google Calendar to manage finance, documents, tasks and team communication alongside your Ticra records.',
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
        'Basic covers core sales, inventory and purchasing for one company. Professional adds finance, reporting, approvals and multi-company use for growing teams. Enterprise is prepared for HR, service, documents, assets, contracts and advanced management needs.',
      comparisonTitle: 'Compare packages',
      comparisonDescription:
        'Storage, company use, pricing model and module access show the main differences between packages. Standard limits are not presented for user, project, customer or product counts.',
      comparisonFeatureLabel: 'Feature',
      footnote:
        'Basic and Professional are priced per user; yearly billing uses advantageous pricing. Enterprise uses custom pricing. VAT, currency, billing period, extra storage, additional company use, setup and integration needs are clarified during the quote process. If needed after the demo, usage preparation can be planned with your real data.',
      plans: [
        {
          code: 'BASIC',
          name: 'Basic',
          badge: 'Core starter',
          price: '7.99 €',
          period: '/ user / month',
          description:
            'Starts sales, quotes, orders, inventory, purchasing, expenses, manager approval and standard reports for one company.',
          limits: [
            'Single-company use',
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
            'Adds multi-company use, financial reporting, team management, approval workflows, notifications and record history for growing businesses.',
          limits: [
            'Multi-company support',
            '10 GB storage included',
            'Priced per user',
          ],
          features: [
            'Everything in Basic',
            'Finance, teams, approval workflow and record history',
            'Advanced reporting, email digest, notifications and multi-company use',
          ],
          cta: 'Request Quote',
          highlighted: true,
        },
        {
          code: 'ENTERPRISE',
          name: 'Enterprise',
          badge: 'Enterprise use',
          price: 'Custom pricing',
          period: '',
          description:
            'Prepared for HR, customer relations, service, documents, assets, contracts, custom reports, integrations and advanced restore needs.',
          limits: [
            'Enterprise multi-company management',
            '50 GB storage included',
            'Quoted with custom pricing',
          ],
          features: [
            'Everything in Professional',
            'HR, customer relations, document management, service, assets and contract management',
            'Company switching, company-level access, custom reports, API access, secure restore and multi-level approvals',
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
          feature: 'Company use',
          values: [
            'Single company',
            'Multi-company support',
            'Enterprise multi-company support',
          ],
        },
        {
          feature: 'Additional company need',
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
          feature: 'Finance, teams, approvals, notifications and record history',
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
          values: ['-', '-', 'Enterprise secure restore controls'],
        },
        {
          feature: 'Multi-company management, quick company switching and company-level access',
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
          'Tell us about your sales, operations, finance, service, HR and document needs so we can prepare a focused demo.',
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
          'Share your company details, package of interest and expected user count so the team can prepare the right quote.',
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
          modules: 'Modules of interest',
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
          message: 'Setup expectations, modules you need or timeline',
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
            body: 'Form notifications are delivered only to email accounts accessible by authorized teams; honeypot, rate limiting and Cloudflare Turnstile checks may be used to reduce spam.',
          },
        ],
      },
      terms: {
        title: 'Terms of Use',
        description: 'Basic terms for using the Ticra marketing website.',
        updated: 'Last updated: May 25, 2026',
        sections: [
          {
            title: 'Website content',
            body: 'This website provides Ticra information and collects demo requests, quote requests and general contact messages.',
          },
          {
            title: 'Request review',
            body: 'A demo or quote request does not create a right to use Ticra; team review and commercial agreement are required.',
          },
          {
            title: 'Content accuracy',
            body: 'Product capabilities may evolve over time. Contact the Ticra team for the latest information.',
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
