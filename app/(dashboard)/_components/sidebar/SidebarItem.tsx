'use client';
import { cn } from '@/lib/utils';
import { TLink } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  link: TLink;
}

const SidebarItem = ({ link }: SidebarItemProps) => {
  const { href, icon: Icon, label } = link;
  const pathname = usePathname();
  const isActive =
    (pathname === '/' && href === '/') ||
    pathname === href ||
    pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-x-2 px-4 py-3 text-sm font-[500] transition-all hover:bg-slate-300/20',
        isActive && 'bg-indigo-600 text-white hover:bg-indigo-500'
      )}
    >
      <Icon size={22} />
      {label}
    </Link>
  );
};

export default SidebarItem;
