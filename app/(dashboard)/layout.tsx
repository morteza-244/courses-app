import { Navbar } from '@/dashboardComponents/navbar';
import { Sidebar } from '@/dashboardComponents/sidebar';
import { PropsWithChildren } from 'react';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='container relative h-screen overflow-x-hidden p-0'>
      <Navbar />
      <Sidebar />
      <main className='p-4 md:ml-56'>{children}</main>
    </div>
  );
};

export default DashboardLayout;
