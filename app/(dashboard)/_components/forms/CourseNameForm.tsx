'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastMessage } from '@/enums';
import { createCourse } from '@/lib/actions/course.action';
import { courseNameFormSchema, TCourseNameFormData } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const CourseNameForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const form = useForm<TCourseNameFormData>({
    resolver: zodResolver(courseNameFormSchema),
    defaultValues: {
      title: ''
    }
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: TCourseNameFormData) => {
    try {
      setIsPending(true);
      const res = await createCourse(data);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success('Your course created successfully');
        form.reset();
        router.push(`/teacher/courses/${res?.newCourse?.id}`);
      }
    } catch {
      toast.error(ToastMessage.error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-8 space-y-8 xs:w-96'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting || isPending}
                  placeholder='React.js'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                What will you teach in this course
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center gap-x-2'>
          <Button
            type='button'
            variant='secondary'
            disabled={isPending}
            onClick={() => router.push('/')}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={!isValid || isSubmitting || isPending}
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CourseNameForm;
