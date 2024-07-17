'use client';
import { ConfirmModal } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { SubmitLoading } from '@/dashboardComponents/shared';
import { ToastMessage } from '@/enums';
import {
  deleteCourse,
  publishCourse,
  unPublishCourse
} from '@/lib/actions/course.action';
import { Loader2, Trash } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface CourseActionProps {
  isPublished: boolean;
  courseId: string;
  disabled: boolean;
}

const CourseAction = ({
  courseId,
  disabled,
  isPublished
}: CourseActionProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const onDelete = async () => {
    try {
      setIsPending(true);
      const res = await deleteCourse(courseId);
      if (res?.error) toast.error(res.error);
      toast.success('Course deleted');
      router.push(`/teacher/courses`);
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
        const res = await unPublishCourse({
          courseId,
          pathname
        });
        if (res?.error) toast.error(res.error);
        toast.success('Course unPublished');
      } else {
        const res = await publishCourse({
          courseId,
          pathname
        });
        if (res?.error) toast.error(res.error);
        toast.success('Course published');
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
          <SubmitLoading />
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

export default CourseAction;
