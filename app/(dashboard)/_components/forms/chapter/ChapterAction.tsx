'use client';
import { ConfirmModal } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

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
  return (
    <div className='flex items-center justify-end gap-x-2'>
      <Button
        onClick={() => {}}
        disabled={disabled}
        variant={'secondary'}
        size={'sm'}
      >
        {isPublished ? 'Unpublished' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={() => {}}>
        <Button size={'sm'}>
          <Trash size={20} />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterAction;
