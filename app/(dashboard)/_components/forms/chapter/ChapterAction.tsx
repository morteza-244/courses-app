'use client';
import { ConfirmModal } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { SubmitLoading } from '@/dashboardComponents/shared';
import { ToastMessage } from '@/enums';
import {
  deleteChapter,
  publishChapter,
  unpublishedChapter
} from '@/lib/actions/chapter.action';
import { Loader2, Trash } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface ChapterActionProps {
  isPublished: boolean;
  courseId: string;
  chapterId: string;
  disabled: boolean;
}

const ChapterAction = ({
  chapterId,
  courseId,
  disabled,
  isPublished
}: ChapterActionProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const onDelete = async () => {
    try {
      setIsPending(true);
      const res = await deleteChapter({
        chapterId,
        courseId
      });
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success('Chapter deleted');
        router.push(`/teacher/courses/${courseId}`);
      }
    } catch {
      toast.error(ToastMessage.error);
    } finally {
      setIsPending(false);
    }
  };

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        const res = await unpublishedChapter({
          chapterId,
          courseId,
          pathname
        });
        if (res?.error) toast.error(res.error);
        toast.success('Chapter unPublished');
      } else {
        const res = await publishChapter({
          chapterId,
          courseId,
          pathname
        });
        if (res?.error) toast.error(res.error);
        toast.success('Chapter published');
      }
    } catch {
      toast.error(ToastMessage.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-end gap-x-2'>
      <Button
        onClick={onClick}
        disabled={disabled || isPending || isLoading}
        variant={'secondary'}
        size={'sm'}
      >
        {isLoading ? (
          <SubmitLoading color='black' />
        ) : isPublished ? (
          'Unpublished'
        ) : (
          'Publish'
        )}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size={'sm'} disabled={isPending || isLoading}>
          {isPending ? (
            <Loader2 className='animate-spin' />
          ) : (
            <Trash size={20} />
          )}
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterAction;
