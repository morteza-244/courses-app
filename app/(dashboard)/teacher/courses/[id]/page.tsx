import { IconBadge } from '@/components/ui/icon-badge';
import {
  CourseAttachmentsForm,
  CourseCategoryForm,
  CourseDescriptionForm,
  CourseImageForm,
  CoursePriceForm,
  TitleForm
} from '@/dashboardComponents/forms';
import { getCategories } from '@/lib/actions/category.action';
import { getCourseById } from '@/lib/actions/course.action';
import { auth } from '@clerk/nextjs/server';
import { File, LayoutDashboard, ListChecks } from 'lucide-react';
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
  const categories = await getCategories();
  const categoryOptions = categories?.map(category => ({
    label: category.name,
    value: category.id
  }));
  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-y-2'>
        <h1 className='text-2xl font-medium'>Course Setup</h1>
        <span className='text-sm text-slate-500'>
          Complete all fields {completionText}
        </span>
      </div>
      <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
        <div className='space-y-6'>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={LayoutDashboard} />
            <h2 className='font-semibold sm:text-[18px] md:text-[15px] lg:text-xl'>
              Customize your course
            </h2>
          </div>
          <TitleForm title={course.title} courseId={course.id} />
          <CourseDescriptionForm
            description={course.description!}
            courseId={course.id}
          />
          <CourseImageForm imageUrl={course.imageUrl!} courseId={course.id} />
          <CourseCategoryForm
            categoryOptions={categoryOptions!}
            courseId={course.id}
            categoryId={course.categoryId!}
          />
        </div>
        <div className='space-y-6'>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={ListChecks} />
            <h2 className='font-semibold sm:text-[18px] md:text-[15px] lg:text-xl'>
              Course chapters
            </h2>
          </div>
          <CoursePriceForm courseId={course.id} price={course.price!} />
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={File} />
            <h2 className='font-semibold sm:text-[18px] md:text-[15px] lg:text-xl'>
              Resources & attachments
            </h2>
          </div>
          <CourseAttachmentsForm course={course} courseId={course.id} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
