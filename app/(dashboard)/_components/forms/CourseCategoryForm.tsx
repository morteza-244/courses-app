'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { EditSubmitButton } from '@/dashboardComponents/shared';
import { cn } from '@/lib/utils';
import { courseCategorySchema, TCourseCategoryFormData } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SelectOption from '../shared/SelectOption';

interface CourseCategoryFormProps {
  categoryOptions: { label: string; value: string }[];
  courseId: string;
  categoryId: string;
}

const CourseCategoryForm = ({
  categoryOptions,
  courseId,
  categoryId
}: CourseCategoryFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<TCourseCategoryFormData>({
    resolver: zodResolver(courseCategorySchema),
    defaultValues: {
      categoryId: categoryId || ''
    }
  });
  const { isValid, isSubmitting } = form.formState;
  const toggleEditing = () => {
    setIsEditing(current => !current);
    form.reset();
  };

  const currentCategory = categoryOptions.find(
    category => category.value === categoryId
  )?.label;
  const onSubmit = async (data: TCourseCategoryFormData) => {
    console.log(data);
  };

  return (
    <div className='space-y-2.5 rounded-md bg-slate-200 p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold'>Course Category</h2>
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
            !categoryId && 'italic text-slate-500'
          )}
        >
          {currentCategory || 'No category'}
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
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SelectOption
                      onChange={field.onChange}
                      value={field.value}
                      options={categoryOptions}
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

export default CourseCategoryForm;
