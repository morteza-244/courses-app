'use server';

import { handleError } from '@/lib/utils';
import prisma from '@/prisma/client';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { ICreateAttachmentsParams } from './shared.types';

export const createAttachment = async (data: ICreateAttachmentsParams) => {
  const { userId } = auth();
  const { url, courseId, pathname } = data;
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
      return { error: "You're unauthorized! Please login to your account." };
    }

    const newAttachments = await prisma.attachment.create({
      data: {
        url: url,
        name: url.split('/').pop()!,
        courseId
      }
    });
    revalidatePath(pathname);
    return { newAttachments };
  } catch (error) {
    handleError(error);
  }
};
