'use client';

import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavbarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname.startsWith('/teacher');
  const isPlayerPage = pathname.includes('/chapter');

  return (
    <div className='ml-auto flex items-center gap-x-2'>
      {isTeacherPage || isPlayerPage ? (
        <Link href='/'>
          <Button size={'sm'}>
            <LogOut className='mr-2' size={17} />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href='/teacher/courses'>
          <Button size={'sm'}>Teacher Mode</Button>
        </Link>
      )}
      <UserButton
        appearance={{
          elements: {
            avatarBox: 'w-9 h-9'
          }
        }}
      />
    </div>
  );
};

export default NavbarRoutes;
