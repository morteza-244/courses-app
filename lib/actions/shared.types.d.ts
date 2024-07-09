import { Course } from '@prisma/client';

export interface IUpdateCourseTitleParams {
  course: Partial<Course>;
  courseId: string;
  pathname: string;
}
