import { TReorderData } from '@/types';
import { Chapter, Course } from '@prisma/client';

export interface IUpdateCourseTitleParams {
  course: Partial<Course>;
  courseId: string;
  pathname: string;
}

export interface IUpdateChapterParams {
  chapter: Partial<Chapter>;
  courseId: string;
  chapterId: string;
  pathname: string;
}

export interface ICreateAttachmentsParams {
  courseId: string;
  url: string;
  pathname: string;
}

export interface ICreateChaptersParams {
  courseId: string;
  title: string;
  pathname: string;
}

export interface IReorderChaptersParams {
  courseId: string;
  list: TReorderData[];
  pathname: string;
}

export interface IDeleteAttachmentParams {
  courseId: string;
  attachmentId: string;
  pathname: string;
}

export interface IDeleteChapterParams {
  courseId: string;
  chapterId: string;
}

export interface IPublishChapterParams {
  courseId: string;
  chapterId: string;
  pathname: string
}

export interface IPublishCourseParams {
  courseId: string;
  pathname: string;
}