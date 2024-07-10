'use server';

import { handleError } from '@/lib/utils';
import prisma from '@/prisma/client';
import { TCategoryFormData } from '@/validation';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export const createCategory = async (data: TCategoryFormData) => {
  const { userId } = auth();
  const { description, title } = data;
  try {
    if (!userId) {
      return { error: "You're unauthorized! Please login to your account." };
    }

    const existingCategory = await prisma.category.findUnique({
      where: {
        name: title
      }
    });

    if (existingCategory) {
      return { error: 'This category already exists. Please try another name' };
    }

    const newCategory = await prisma.category.create({
      data: {
        name: title,
        description
      }
    });
    revalidatePath('/teacher/categories', 'page');
    return { newCategory };
  } catch (error) {
    handleError(error);
  }
};
