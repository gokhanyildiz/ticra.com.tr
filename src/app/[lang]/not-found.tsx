import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="bg-background">
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-5 py-16 text-center">
        <p className="text-primary text-sm font-semibold">404</p>
        <h1 className="text-foreground text-4xl font-bold">
          Sayfa bulunamadı
        </h1>
        <p className="text-muted-foreground max-w-md leading-7">
          Aradığınız sayfa taşınmış veya yayından kaldırılmış olabilir.
        </p>
        <Button asChild>
          <Link href="/">Ana sayfaya dön</Link>
        </Button>
      </div>
    </section>
  );
}
