import {
  Instagram,
  Linkedin,
  type LucideIcon,
  Twitter,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';

import { type SocialLinkKey, socialLinks } from '@/lib/social-links';
import { cn } from '@/lib/utils';

const socialIcons: Record<SocialLinkKey, LucideIcon> = {
  x: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
};

type SocialLinksProps = {
  className?: string;
  variant?: 'dark' | 'light';
};

export function SocialLinks({
  className,
  variant = 'dark',
}: SocialLinksProps) {
  const linkClassName =
    variant === 'light'
      ? 'border-white/10 bg-white/5 text-white/75 hover:border-white/20 hover:bg-white/10 hover:text-white'
      : 'border-border bg-background text-muted-foreground hover:border-[#2fc3ff]/40 hover:bg-[#2fc3ff]/10 hover:text-[#0b81b7]';

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {socialLinks.map((link) => {
        const Icon = socialIcons[link.key];

        return (
          <Link
            key={link.key}
            href={link.href}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={`Ticra ${link.label}`}
            title={link.label}
            className={cn(
              'inline-flex size-9 items-center justify-center rounded-full border transition-colors',
              linkClassName,
            )}
          >
            <Icon aria-hidden="true" className="size-4" />
          </Link>
        );
      })}
    </div>
  );
}
