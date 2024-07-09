import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

const Courses = () => {
  return (
    <div>
      <Link href={'/teacher/courses/new'}>
        <Button>
          <PlusCircleIcon className='mr-1' />
          New Course
        </Button>
      </Link>
    </div>
  );
};

export default Courses;
