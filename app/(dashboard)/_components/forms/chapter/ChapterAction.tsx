'use client';
import { ConfirmModal } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { ToastMessage } from '@/enums';
import { deleteChapter } from '@/lib/actions/chapter.action';
import { Loader2, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

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
  return (
    <div className='flex items-center justify-end gap-x-2'>
      <Button
        onClick={() => {}}
        disabled={disabled || isPending}
        variant={'secondary'}
        size={'sm'}
      >
        {isPublished ? 'Unpublished' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size={'sm'} disabled={isPending}>
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
