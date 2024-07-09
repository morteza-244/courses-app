import { IconBadge } from '@/components/ui/icon-badge';
import { TitleForm } from '@/dashboardComponents/forms';
import { getCourseById } from '@/lib/actions/course.action';
import { auth } from '@clerk/nextjs/server';
import { LayoutDashboard } from 'lucide-react';
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
    <div className='space-y-8'>
      <div className='flex flex-col gap-y-2'>
        <h1 className='text-2xl font-medium'>Course Setup</h1>
        <span className='text-sm text-slate-500'>
          Complete all fields {completionText}
        </span>
      </div>
      <div className='flex items-center gap-x-2'>
        <IconBadge icon={LayoutDashboard} />
        <h2 className='font-semibold sm:text-[18px] md:text-[15px] lg:text-xl'>
          Customize your course
        </h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <TitleForm title={course.title} courseId={course.id} />
      </div>
    </div>
  );
};

export default CourseDetail;
