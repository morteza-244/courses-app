import { Button } from '@/components/ui/button';
import { columns, DataTable } from '@/dashboardComponents/courses';
import { getCourses } from '@/lib/actions/course.action';
import { PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

const Courses = async () => {
  const courses = await getCourses();
  return (
    <div className='space-y-5'>
      <Link href={'/teacher/courses/new'}>
        <Button>
          <PlusCircleIcon className='mr-1' />
          New Course
        </Button>
      </Link>
      <DataTable columns={columns} data={courses || []} />
    </div>
  );
};

export default Courses;
