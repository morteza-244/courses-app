import { Course } from '@prisma/client';

export interface IUpdateCourseTitleParams {
  course: Partial<Course>;
  courseId: string;
  pathname: string;
}

export interface ICreateAttachmentsParams {
  courseId: string;
  url: string
  pathname: string
}