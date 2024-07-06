import { Sidebar } from '@/dashboardComponents/sidebar';
import { PropsWithChildren } from 'react';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='container relative h-screen overflow-x-hidden p-0'>
      <header className='sticky inset-x-0 top-0 z-50 h-[70px] w-full md:pl-56'>
        <nav className='flex h-full w-full items-center border-b bg-white/40 px-3 shadow-md backdrop-blur-sm'>
          Navbar
        </nav>
      </header>
      <Sidebar />
      <main className='p-4 md:ml-56'>{children}</main>
    </div>
  );
};

export default DashboardLayout;
