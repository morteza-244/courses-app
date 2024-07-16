import { Banner } from '@/components/ui/banner';
import { IconBadge } from '@/components/ui/icon-badge';
import {
  ChapterAccessForm,
  ChapterDescriptionForm,
  ChapterTitleForm,
  ChapterVideoForm
} from '@/dashboardComponents/forms/chapter';
import { getChapterById } from '@/lib/actions/chapter.action';
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react';
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
    <div className='space-y-5'>
      {!chapter.isPublished && (
        <Banner
          variant={'warning'}
          label={
            'This chapter is unpublished. It will not be visible in the course'
          }
        />
      )}
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
      <div className='flex flex-col'>
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
          <ChapterDescriptionForm
            chapterId={chapter.id}
            description={chapter.description!}
            courseId={chapter.courseId}
          />
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={Eye} />
            <h2 className='font-semibold sm:text-[18px] md:text-[15px] lg:text-xl'>
              Access settings
            </h2>
          </div>
          <ChapterAccessForm
            isFree={chapter.isFree}
            chapterId={chapter.id}
            courseId={chapter.courseId}
          />
        </div>
        <div className='space-y-6'>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={Video} />
            <h2 className='font-semibold sm:text-[18px] md:text-[15px] lg:text-xl'>
              Add a video
            </h2>
          </div>
          <ChapterVideoForm
            chapter={chapter}
            courseId={chapter.courseId}
            chapterId={chapter.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
