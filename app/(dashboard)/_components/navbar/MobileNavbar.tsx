import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import Logo from '@/dashboardComponents/Logo';
import { SidebarRoutes } from '@/dashboardComponents/sidebar';
import { Menu } from 'lucide-react';
const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className='md:hidden'>
        <Button variant='ghost' size={'icon'}>
          <Menu size={30} />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='border-none p-0 md:hidden'>
        <SheetHeader className='h-full'>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SidebarRoutes />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;