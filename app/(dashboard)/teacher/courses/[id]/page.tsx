import { getCourseById } from '@/lib/actions/course.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const CourseDetail = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();
  const course = await getCourseById(params.id);
  if (!course || !userId) redirect('/');

  const requiredFields = [
    course.title,
    course.description,
    course.price,
    course.imageUrl,
    course.categoryId
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  
  return (
    <div>
      <div className='flex flex-col gap-y-2'>
        <h1 className='text-2xl font-medium'>Course Setup</h1>
        <span className='text-sm text-slate-500'>
          Complete all fields {completionText}
        </span>
      </div>
    </div>
  );
};

export default CourseDetail;
