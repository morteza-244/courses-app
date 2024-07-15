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
import { courseChapterSchema, TCourseChapterFormData } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Chapter, Course } from '@prisma/client';
import { PlusCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
  };

  const onSubmit = async (data: TCourseChapterFormData) => {
    console.log(data);
  };

  return (
    <div className='space-y-2.5 rounded-md bg-slate-200 p-4'>
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
      {!isCreating && (
        <div>
          <p>No Chapters</p>
          <small className='text-muted-foreground'>
            Drag and drop to reorder the chapters
          </small>
        </div>
      )}
    </div>
  );
};

export default CourseChaptersForm;
