export const socialLinks = [
  {
    key: 'x',
    label: 'X',
    href: 'https://x.com/TicraApp',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ticra-app',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@Ticra-App',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/ticra.app',
  },
] as const;

export type SocialLinkKey = (typeof socialLinks)[number]['key'];

export const socialLinkUrls = socialLinks.map((link) => link.href);
