'use server';

import { handleError } from '@/lib/utils';
import prisma from '@/prisma/client';
import { TCourseNameFormData } from '@/validation';
import { auth } from '@clerk/nextjs/server';
import Mux from '@mux/mux-node';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { IPublishCourseParams, IUpdateCourseTitleParams } from './shared.types';

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});

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
  const { userId } = auth();
  try {
    if (!userId) {
      redirect('/');
    }
    const course = await prisma.course.findUnique({
      where: {
        id,
        userId
      },
      include: {
        chapters: {
          orderBy: {
            position: 'asc'
          }
        },
        attachment: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });

    return course;
  } catch (error) {
    handleError(error);
  }
};

export const updateCourseTitle = async (data: IUpdateCourseTitleParams) => {
  const { userId } = auth();
  const { course, courseId, pathname } = data;
  try {
    if (!userId) {
      return { error: "You're unauthorized! Please login to your account." };
    }
    const updatedCourse = await prisma.course.update({
      where: {
        id: courseId,
        userId
      },
      data: { ...course }
    });
    revalidatePath(pathname);
    return { updatedCourse };
  } catch (error) {
    handleError(error);
  }
};

export const deleteCourse = async (courseId: string) => {
  const { userId } = auth();
  try {
    if (!userId) {
      return { error: "You're unauthorized! Please login to your account." };
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId
      },
      include: {
        chapters: {
          include: {
            muxData: true
          }
        }
      }
    });

    if (!course) {
      return { error: 'Course not found' };
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await video.assets.delete(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await prisma.course.delete({
      where: {
        id: courseId
      }
    });

    return { deletedCourse };
  } catch (error) {
    handleError(error);
  }
};

export const publishCourse = async (data: IPublishCourseParams) => {
  const { userId } = auth();
  const { courseId, pathname } = data;
  try {
    if (!userId) {
      return { error: "You're unauthorized! Please login to your account." };
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId
      },
      include: {
        chapters: {
          include: {
            muxData: true
          }
        }
      }
    });

    if (!course) {
      return { error: 'Course not found' };
    }

    const hasPublishedChapter = course.chapters.some(
      chapter => chapter.isPublished
    );

    if (
      !course.title ||
      !course.imageUrl ||
      !course.categoryId ||
      !course.description ||
      !hasPublishedChapter
    ) {
      return { error: 'Missing required fields' };
    }

    const publishedCourse = await prisma.course.update({
      where: {
        id: courseId
      },
      data: {
        isPublished: true
      }
    });

    revalidatePath(pathname);
    return { publishedCourse };
  } catch (error) {
    handleError(error);
  }
};

export const unPublishCourse = async (data: IPublishCourseParams) => {
  const { userId } = auth();
  const { courseId, pathname } = data;
  try {
    if (!userId) {
      return { error: "You're unauthorized! Please login to your account." };
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId
      }
    });

    if (!course) {
      return { error: 'Course not found' };
    }

    const unPublishedCourse = await prisma.course.update({
      where: {
        id: courseId
      },
      data: {
        isPublished: false
      }
    });

    revalidatePath(pathname);
    return { unPublishedCourse };
  } catch (error) {
    handleError(error);
  }
};
