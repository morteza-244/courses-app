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
import { updateCourseTitle } from '@/lib/actions/course.action';
import { TCourseNameFormData, courseNameFormSchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface TitleFormProps {
  title: string;
  courseId: string;
}

const TitleForm = ({ title, courseId }: TitleFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const pathname = usePathname();

  const form = useForm<TCourseNameFormData>({
    resolver: zodResolver(courseNameFormSchema),
    defaultValues: {
      title: title
    }
  });

  const toggleEditing = () => {
    setIsEditing(current => !current);
  };

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: TCourseNameFormData) => {
    try {
      setIsPending(true);
      const res = await updateCourseTitle({
        courseId,
        title: data.title,
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
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className='space-y-2.5 rounded-md bg-slate-200 p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold'>Course Title</h2>
        <Button variant={'secondary'} size={'sm'} onClick={toggleEditing}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil size={17} className='mr-1' /> Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className='line-clamp-1 text-sm'>{title}</p>}
      {isEditing && (
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
                      placeholder='React.js'
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
            />
          </form>
        </Form>
      )}
    </div>
  );
};

export default TitleForm;
