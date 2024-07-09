import z from 'zod';

export const courseNameFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 character' })
});

export type TCourseNameFormData = z.infer<typeof courseNameFormSchema>;
