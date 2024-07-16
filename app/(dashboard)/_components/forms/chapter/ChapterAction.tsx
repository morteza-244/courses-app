'use client';
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
      <Button size={'sm'}>
        <Trash size={20} />
      </Button>
    </div>
  );
};

export default ChapterAction;
