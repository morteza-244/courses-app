'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SubmitLoading } from '@/dashboardComponents/shared';
import { ToastMessage } from '@/enums';
import { createCategory } from '@/lib/actions/category.action';
import { categoryFormSchema, TCategoryFormData } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const CategoryForm = () => {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<TCategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      description: '',
      title: ''
    }
  });
  
  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: TCategoryFormData) => {
    try {
      setIsPending(true);
      const res = await createCategory(data);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success('Your category created.');
        form.reset();
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
        className='space-y-8 sm:w-96'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting || isPending}
                  placeholder='Technology'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting || isPending}
                  rows={7}
                  className='resize-none'
                  placeholder='About category...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center gap-x-3'>
          <Button
            variant={'secondary'}
            type='button'
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={!isValid || isSubmitting || isPending}
          >
            {isPending ? <SubmitLoading /> : <>Create</>}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
