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
