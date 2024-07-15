'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EditSubmitButton } from '@/dashboardComponents/shared';
import { ToastMessage } from '@/enums';
import { createChapter, reorderChapter } from '@/lib/actions/chapter.action';
import { TReorderData } from '@/types';
import { courseChapterSchema, TCourseChapterFormData } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Chapter, Course } from '@prisma/client';
import { PlusCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ChaptersList from './ChaptersList';
import ReorderSkeleton from './ReorderSkeleton';

interface CourseChaptersFormProps {
  course: Course & { chapters: Chapter[] };
  courseId: string;
}

const CourseChaptersForm = ({ courseId, course }: CourseChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const pathname = usePathname();
  const form = useForm<TCourseChapterFormData>({
    resolver: zodResolver(courseChapterSchema),
    defaultValues: {
      title: ''
    }
  });
  const { isValid, isSubmitting } = form.formState;

  const toggleCreating = () => {
    setIsCreating(current => !current);
    form.reset();
  };

  const onSubmit = async (data: TCourseChapterFormData) => {
    try {
      setIsPending(true);
      const res = await createChapter({
        courseId,
        title: data.title,
        pathname
      });
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(ToastMessage.success);
        toggleCreating();
      }
    } catch {
      toast.error(ToastMessage.error);
    } finally {
      setIsPending(false);
    }
  };

  const onReorder = async (data: TReorderData[]) => {
    try {
      setIsPending(true);
      const res = await reorderChapter({
        courseId,
        pathname,
        list: data
      });
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success('Chapters reordered');
      }
    } catch (error) {
      toast.error(ToastMessage.error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className='relative space-y-2.5 rounded-md bg-slate-200 p-4'>
      {isPending && <ReorderSkeleton />}
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold'>Course Chapters</h2>
        <Button variant={'secondary'} size={'sm'} onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle size={17} className='mr-1' /> Add a Chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-4 space-y-2'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isPending}
                      placeholder='Introduction to the course'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <EditSubmitButton
              isPending={isPending}
              isSubmitting={isSubmitting}
              isValid={isValid}
              label='Create'
            />
          </form>
        </Form>
      )}
      {!isCreating && course.chapters.length === 0 && (
        <div>
          <p>No Chapters</p>
        </div>
      )}
      <ChaptersList
        items={course.chapters || []}
        onEdit={() => {}}
        onReorder={onReorder}
      />
      <small className='text-muted-foreground'>
        Drag and drop to reorder the chapters
      </small>
    </div>
  );
};

export default CourseChaptersForm;
