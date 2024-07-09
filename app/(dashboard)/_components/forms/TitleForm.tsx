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
import { ToastMessage } from '@/enums';
import { TCourseNameFormData, courseNameFormSchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface TitleFormProps {
  title: string;
}

const TitleForm = ({ title }: TitleFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm<TCourseNameFormData>({
    resolver: zodResolver(courseNameFormSchema),
    defaultValues: {
      title: title
    }
  });
  const toggleEditing = () => {
    setIsEditing(current => !current);
    form.reset();
  };
  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (data: TCourseNameFormData) => {
    try {
      setIsPending(true);
    } catch {
      toast.error(ToastMessage.error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className='rounded-md bg-slate-200 p-4'>
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
      {!isEditing && <p className='text-sm'>{title}</p>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='mt-4'>
            <div className='flex w-full items-center gap-x-2'>
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
              <Button
                size={'sm'}
                disabled={!isValid || isSubmitting || isPending}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default TitleForm;
