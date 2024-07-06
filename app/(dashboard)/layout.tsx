import { PropsWithChildren } from 'react';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='container relative h-screen overflow-x-hidden p-0'>
      <header className='sticky inset-x-0 top-0 z-50 h-[70px] w-full md:pl-56'>
        <nav className='flex h-full w-full items-center border-b bg-white/40 px-3 shadow-md backdrop-blur-sm'>
          Navbar
        </nav>
      </header>
      <aside className='fixed inset-y-0 z-50 hidden h-full w-56 flex-col md:flex'>
        <div className='flex h-full flex-col overflow-y-auto border-r bg-white shadow-md'>
          Sidebar
        </div>
      </aside>
      <main className='p-4 md:ml-56'>{children}</main>
    </div>
  );
};

export default DashboardLayout;
