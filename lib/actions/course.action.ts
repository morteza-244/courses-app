'use server';

import { handleError } from '@/lib/utils';
import prisma from '@/prisma/client';
import { TCourseNameFormData } from '@/validation';
import { auth } from '@clerk/nextjs/server';

export const createCourse = async (data: TCourseNameFormData) => {
  const { userId } = auth();
  const { title } = data;
  try {
    if (!userId) {
      return { error: "You're unauthorized! Please login to your account." };
    }

    const newCourse = await prisma.course.create({
      data: {
        title,
        userId
      }
    });
    return { newCourse };
  } catch (error) {
    handleError(error);
  }
};

export const getCourseById = async (id: string) => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id
      }
    });


    return course ;
  } catch (error) {
    handleError(error);
  }
};
