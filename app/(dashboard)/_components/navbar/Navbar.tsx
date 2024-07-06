import { NavbarRoutes } from '@/components/shared';

const Navbar = () => {
  return (
    <header className='sticky inset-x-0 top-0 z-50 h-[70px] w-full md:pl-56'>
      <nav className='flex h-full w-full items-center border-b bg-white/40 px-3 shadow-md backdrop-blur-sm'>
        <NavbarRoutes />
      </nav>
    </header>
  );
};

export default Navbar;
