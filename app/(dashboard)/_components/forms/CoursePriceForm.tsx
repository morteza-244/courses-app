'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EditSubmitButton } from '@/dashboardComponents/shared';
import { ToastMessage } from '@/enums';
import { updateCourseTitle } from '@/lib/actions/course.action';
import { cn, formatPrice } from '@/lib/utils';
import { TCoursePriceFormData, coursePriceSchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CoursePriceFormProps {
  price: number;
  courseId: string;
}

const CoursePriceForm = ({ price, courseId }: CoursePriceFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const pathname = usePathname();
  const form = useForm<TCoursePriceFormData>({
    resolver: zodResolver(coursePriceSchema),
    defaultValues: {
      price: price
    }
  });

  const toggleEditing = () => {
    setIsEditing(current => !current);
  };

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: TCoursePriceFormData) => {
    try {
      setIsPending(true);
      const res = await updateCourseTitle({
        courseId,
        course: {
          price: data.price
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
        <h2 className='font-semibold'>Course Price</h2>
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
            !price && 'italic text-slate-500'
          )}
        >
          {formatPrice(price) || 'No price'}
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
              name='price'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isPending}
                      placeholder='$99.99'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Course Price: {formatPrice(field.value)}
                  </FormDescription>
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

export default CoursePriceForm;
