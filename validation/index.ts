import z from 'zod';

export const courseNameFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 character' })
});

export type TCourseNameFormData = z.infer<typeof courseNameFormSchema>;

export const courseDescribeSchema = z.object({
  description: z
    .string()
    .min(25, { message: 'Description must be at least 25 characters' })
});

export type TCourseDescribeFormData = z.infer<typeof courseDescribeSchema>;

export const courseCategorySchema = z.object({
  categoryId: z
    .string()
    .min(1, { message: 'Please select at least one category' })
});

export type TCourseCategoryFormData = z.infer<typeof courseCategorySchema>;

export const coursePriceSchema = z.object({
  price: z.coerce.number().gte(1).lte(100_000)
});

export type TCoursePriceFormData = z.infer<typeof coursePriceSchema>;

export const categoryFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 character' }),
  description: z
    .string()
    .min(25, { message: 'Description must be at least 25 characters' })
});

export type TCategoryFormData = z.infer<typeof categoryFormSchema>;
