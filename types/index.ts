import { LucideIcon } from 'lucide-react';

export type TLink = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export type TDeleteAttachment = {
  courseId: string;
  attachmentId: string;
};

export type TReorderData = {
  id: string;
  position: number;
};

export type TCourseCard = {
  id: string;
  imageUrl: string;
  title: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
};
