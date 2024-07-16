'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { chapterAccessSchema, TChapterAccessFormData } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface ChapterAccessFormProps {
  isFree: boolean;
  courseId: string;
  chapterId: string;
}

const ChapterAccessForm = ({
  courseId,
  isFree,
  chapterId
}: ChapterAccessFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const pathname = usePathname();
  const form = useForm<TChapterAccessFormData>({
    resolver: zodResolver(chapterAccessSchema),
    defaultValues: {
      isFree: isFree
    }
  });
  const { isValid, isSubmitting } = form.formState;

  const toggleEditing = () => {
    setIsEditing(current => !current);
  };

  const onSubmit = async (data: TChapterAccessFormData) => {
    try {
      setIsPending(true);
      const res = await updateChapter({
        courseId,
        chapterId,
        chapter: {
          isFree: data.isFree
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
        <h2 className='font-semibold'>Course access</h2>
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
        <p
          className={cn(
            'line-clamp-1 text-sm',
            !isFree && 'italic text-slate-500'
          )}
        >
          {isFree ? (
            <>This chapter is free for preview.</>
          ) : (
            <>This chapter is not free.</>
          )}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-4 space-y-2'
          >
            <FormField
              control={form.control}
              name='isFree'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        id='free'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor='free'
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        Check this box if you want to make this chapter free for
                        preview
                      </label>
                    </div>
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

export default ChapterAccessForm;
