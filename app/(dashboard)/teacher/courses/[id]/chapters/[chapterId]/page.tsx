import { IconBadge } from '@/components/ui/icon-badge';
import { ChapterTitleForm } from '@/dashboardComponents/forms/chapter';
import { getChapterById } from '@/lib/actions/chapter.action';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const ChapterIdPage = async ({
  params
}: {
  params: { chapterId: string; id: string };
}) => {
  const chapter = await getChapterById(params.chapterId);
  if (!chapter) {
    redirect('/');
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='w-full'>
          <Link
            href={`/teacher/courses/${params.id}`}
            className='mb-6 flex items-center gap-x-2 text-sm transition hover:opacity-75'
          >
            <ArrowLeft size={20} />
            Back to course setup
          </Link>
        </div>
      </div>
      <div className='flex flex-col gap-y-2'>
        <span className='text-sm text-slate-500'>
          Complete all fields {completionText}
        </span>
      </div>
      <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
        <div className='space-y-6'>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={LayoutDashboard} />
            <h2 className='font-semibold sm:text-[18px] md:text-[15px] lg:text-xl'>
              Customize your chapter
            </h2>
          </div>
          <ChapterTitleForm
            chapterId={chapter.id}
            title={chapter.title}
            courseId={chapter.courseId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
