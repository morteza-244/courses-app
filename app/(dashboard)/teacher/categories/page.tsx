import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

const Categories = () => {
  return (
    <div>
      <Link href={'/teacher/categories/new'}>
        <Button>
          <PlusCircle className='mr-1' />
          New Category
        </Button>
      </Link>
    </div>
  );
};

export default Categories;
