'use client';
import { Button } from '@/components/ui/button';
import { FileUploader } from '@/dashboardComponents/shared';
import { ToastMessage } from '@/enums';
import { updateChapter } from '@/lib/actions/chapter.action';
import MuxPlayer from '@mux/mux-player-react';
import { Chapter, MuxData } from '@prisma/client';
import { Pencil, PlusCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface ChapterVideoFormProps {
  chapter: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const ChapterVideoForm = ({
  courseId,
  chapter,
  chapterId
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const pathname = usePathname();

  const toggleEditing = () => {
    setIsEditing(current => !current);
  };

  const onSubmit = async (data: { videoUrl: string }) => {
    try {
      const res = await updateChapter({
        courseId,
        chapterId,
        chapter: {
          videoUrl: data.videoUrl
        },
        pathname
      });
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(ToastMessage.success);
        toggleEditing();
      }
    } catch {
      toast.error(ToastMessage.error);
    }
  };

  return (
    <div className='space-y-2.5 rounded-md bg-slate-200 p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold'>Chapter video</h2>
        <Button
          type='button'
          variant={'secondary'}
          size={'sm'}
          onClick={toggleEditing}
        >
          {isEditing && <>Cancel</>}
          {!isEditing && !chapter.videoUrl && (
            <>
              <PlusCircle size={17} className='mr-1' />
              Add a video
            </>
          )}
          {!isEditing && chapter.videoUrl && (
            <>
              <Pencil size={17} className='mr-1' />
              Edit
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!chapter.videoUrl ? (
          <div className='flex h-60 w-full flex-col items-center justify-center rounded-lg bg-slate-300'>
            <img src='/images/file-upload.svg' alt='Upload' />
          </div>
        ) : (
          <div className='relative aspect-video'>
            <MuxPlayer playbackId={chapter.muxData?.playbackId || ""} />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUploader
            endpoint='chapterVideo'
            onChange={url => {
              if (url) {
                onSubmit({
                  videoUrl: url
                });
              }
            }}
          />
        </div>
      )}
      {chapter.videoUrl && !isEditing && (
        <p className='text-xs text-muted-foreground'>
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </p>
      )}
    </div>
  );
};

export default ChapterVideoForm;
