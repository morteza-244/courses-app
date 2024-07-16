'use client';
import Editor from '@/components/shared/Editor';
import Preview from '@/components/shared/Preview';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { EditSubmitButton } from '@/dashboardComponents/shared';
import { ToastMessage } from '@/enums';
import { updateChapter } from '@/lib/actions/chapter.action';
import { cn } from '@/lib/utils';
import { courseDescribeSchema, TCourseDescribeFormData } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface ChapterDescriptionFormProps {
  description: string;
  courseId: string;
  chapterId: string;
}

const ChapterDescriptionForm = ({
  courseId,
  description,
  chapterId
}: ChapterDescriptionFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const pathname = usePathname();
  const form = useForm<TCourseDescribeFormData>({
    resolver: zodResolver(courseDescribeSchema),
    defaultValues: {
      description: description
    }
  });
  const { isValid, isSubmitting } = form.formState;

  const toggleEditing = () => {
    setIsEditing(current => !current);
  };

  const onSubmit = async (data: TCourseDescribeFormData) => {
    try {
      setIsPending(true);
      const res = await updateChapter({
        courseId,
        chapterId,
        chapter: {
          description: data.description
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
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className='space-y-2.5 rounded-md bg-slate-200 p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold'>Course Description</h2>
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
      {!isEditing && (
        <div
          className={cn(
            'line-clamp-1 text-sm',
            !description && 'italic text-slate-500'
          )}
        >
          {!description ? 'No description' : <Preview value={description} />}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-4 space-y-2'
          >
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Editor {...field} />
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

export default ChapterDescriptionForm;
