'use client';
import SignOutButton from '@/dashboardComponents/SignOutButton';
import { BarChart, Compass, Layout, LayoutGrid, List } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SidebarItem from './SidebarItem';

const defaultRoutes = [
  { icon: Layout, label: 'Dashboard', href: '/' },
  { icon: Compass, label: 'Browse', href: '/search' }
];

const teacherRoutes = [
  { icon: List, label: 'Courses', href: '/teacher/courses' },
  { icon: BarChart, label: 'Analytics', href: '/teacher/analytics' },
  { icon: LayoutGrid, label: 'Categories', href: '/teacher/categories' }
];

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname.includes('/teacher');
  const routes = isTeacherPage ? teacherRoutes : defaultRoutes;
  return (
    <div className='mt-4 flex h-full w-full flex-col justify-between pb-2'>
      <div>
        {routes.map(link => (
          <SidebarItem key={link.href} link={link} />
        ))}
      </div>
      <div className='px-4'>
        <SignOutButton />
      </div>
    </div>
  );
};

export default SidebarRoutes;
