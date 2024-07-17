import { columns, DataTable } from '@/dashboardComponents/courses';
import { getCourses } from '@/lib/actions/course.action';

const Courses = async () => {
  const courses = await getCourses();
  return (
    <div className='space-y-5'>
      {' '}
      <DataTable columns={columns} data={courses || []} />
    </div>
  );
};

export default Courses;
