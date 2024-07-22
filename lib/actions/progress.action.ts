'use server';

import { handleError } from '@/lib/utils';
import prisma from '@/prisma/client';
import { IGetProgressParams } from './shared.types';

export const getProgress = async (
  data: IGetProgressParams
): Promise<number> => {
  const { courseId, userId } = data;
  try {
    const publishedChapters = await prisma.chapter.findMany({
      where: {
        courseId,
        isPublished: true
      },
      select: {
        id: true
      }
    });

    const publishedChapterIds = publishedChapters.map(chapter => chapter.id);

    const validCompletedChapters = await prisma.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChapterIds
        },
        isCompleted: true
      }
    });
    
    const progressPercentage =
      (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    handleError(error);
    return 0;
  }
};
