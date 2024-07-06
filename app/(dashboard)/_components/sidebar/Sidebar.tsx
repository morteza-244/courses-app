import Logo from '@/dashboardComponents/Logo';
import SidebarRoutes from './SidebarRoutes';

const Sidebar = () => {
  return (
    <aside className='fixed inset-y-0 z-50 hidden h-full w-56 flex-col md:flex'>
      <div className='flex h-full flex-col overflow-y-auto border-r bg-white shadow-md'>
        <Logo />
        <SidebarRoutes />
      </div>
    </aside>
  );
};

export default Sidebar;
