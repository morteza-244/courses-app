'use server';

import { handleError } from '@/lib/utils';
import prisma from '@/prisma/client';
import { auth } from '@clerk/nextjs/server';
import Mux from '@mux/mux-node';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  ICreateChaptersParams,
  IDeleteChapterParams,
  IPublishChapterParams,
  IReorderChaptersParams,
  IUpdateChapterParams
} from './shared.types';

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});

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

export const getChapterById = async (id: string) => {
  const { userId } = auth();
  try {
    if (!userId) {
      redirect('/');
    }
    const chapter = await prisma.chapter.findUnique({
      where: {
        id
      },
      include: {
        muxData: true
      }
    });
    return chapter;
  } catch (error) {
    handleError(error);
  }
};

export const updateChapter = async (data: IUpdateChapterParams) => {
  const { userId } = auth();
  const { chapter, chapterId, courseId, pathname } = data;

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

    const updatedChapter = await prisma.chapter.update({
      where: {
        courseId,
        id: chapterId
      },
      data: { ...chapter }
    });

    if (chapter.videoUrl) {
      const existingMuxData = await prisma.muxData.findFirst({
        where: {
          chapterId
        }
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await prisma.muxData.delete({
          where: {
            id: existingMuxData.id
          }
        });
      }
      const asset = await video.assets.create({
        input: [{ url: chapter.videoUrl }],
        playback_policy: ['public'],
        test: false
      });

      await prisma.muxData.create({
        data: {
          chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id
        }
      });
    }

    revalidatePath(pathname);
    return { updatedChapter };
  } catch (error) {
    handleError(error);
  }
};

export const deleteChapter = async (data: IDeleteChapterParams) => {
  const { userId } = auth();
  const { courseId, chapterId } = data;
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

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
        courseId
      }
    });

    if (!chapter) {
      return { error: 'Chapter not found!' };
    }

    if (chapter.videoUrl) {
      const existingMuxData = await prisma.muxData.findUnique({
        where: {
          chapterId
        }
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await prisma.muxData.delete({
          where: {
            id: existingMuxData.id
          }
        });
      }
    }

    const deletedChapter = await prisma.chapter.delete({
      where: {
        id: chapterId
      }
    });

    const publishedChapterInCourse = await prisma.chapter.findMany({
      where: {
        courseId,
        isPublished: true
      }
    });

    if (!publishedChapterInCourse.length) {
      await prisma.course.update({
        where: {
          id: courseId
        },
        data: {
          isPublished: false
        }
      });
    }

    return { deletedChapter };
  } catch (error) {
    handleError(error);
  }
};

export const publishChapter = async (data: IPublishChapterParams) => {
  const { userId } = auth();
  const { chapterId, courseId, pathname } = data;
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

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
        courseId
      }
    });

    const muxData = await prisma.muxData.findUnique({
      where: {
        chapterId: chapterId
      }
    });

    if (
      !chapter ||
      !muxData ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ) {
      return { error: 'Missing required fields' };
    }

    const publishedChapter = await prisma.chapter.update({
      where: {
        id: chapterId,
        courseId
      },
      data: {
        isPublished: true
      }
    });
    revalidatePath(pathname);
    return { publishedChapter };
  } catch (error) {
    handleError(error);
  }
};

export const unpublishedChapter = async (data: IPublishChapterParams) => {
  const { userId } = auth();
  const { chapterId, courseId, pathname } = data;
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

    const unPublishedChapter = await prisma.chapter.update({
      where: {
        id: chapterId,
        courseId
      },
      data: {
        isPublished: false
      }
    });

    const publishedChapterInCourse = await prisma.chapter.findMany({
      where: {
        id: courseId,
        isPublished: true
      }
    });

    if (!publishedChapterInCourse.length) {
      await prisma.course.update({
        where: {
          id: courseId
        },
        data: {
          isPublished: false
        }
      });
    }
    revalidatePath(pathname);
    return { unPublishedChapter };
  } catch (error) {
    handleError(error);
  }
};
