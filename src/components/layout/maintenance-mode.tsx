import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { appUrl } from '@/lib/i18n';

export function MaintenanceMode() {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-6">
      <div className="flex flex-col items-center gap-8">
        <Image
          src="/ticra/ticra-logo-horizontal.svg"
          alt="Ticra"
          width={128}
          height={128}
          priority
          className="h-28 w-auto sm:h-32"
        />

        <Button asChild className="h-12 rounded-[10px] px-6 text-sm font-bold">
          <Link href={appUrl} target="_blank" rel="noreferrer">
            Kullanıcı girişi yapın
          </Link>
        </Button>
      </div>
    </main>
  );
}
