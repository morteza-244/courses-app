'use server';

import { handleError } from '@/lib/utils';
import prisma from '@/prisma/client';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { ICreateChaptersParams, IReorderChaptersParams } from './shared.types';

export const createChapter = async (data: ICreateChaptersParams) => {
  const { userId } = auth();
  const { title, courseId, pathname } = data;
  try {
    if (!userId) {
      return { error: "You're unauthorized! Please login to your account." };
    }

    const courseOwner = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId
      }
    });

    if (!courseOwner) {
      return { error: 'You do not own this course' };
    }

    const lastChapter = await prisma.chapter.findFirst({
      where: {
        courseId
      },
      orderBy: {
        position: 'desc'
      }
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const newChapter = await prisma.chapter.create({
      data: {
        title,
        position: newPosition,
        courseId
      }
    });
    revalidatePath(pathname);
    return { newChapter };
  } catch (error) {
    handleError(error);
  }
};

export const reorderChapter = async (data: IReorderChaptersParams) => {
  const { userId } = auth();
  const { pathname, courseId, list } = data;
  try {
    if (!userId) {
      return { error: "You're unauthorized! Please login to your account." };
    }
    const courseOwner = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId
      }
    });

    if (!courseOwner) {
      return { error: 'You do not own this course' };
    }

    for (let item of list) {
      await prisma.chapter.update({
        where: {
          id: item.id
        },
        data: { position: item.position }
      });
    }
    revalidatePath(pathname);
    return { message: 'Success' };
  } catch (error) {
    handleError(error);
  }
};
