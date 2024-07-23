import { ReactNode } from 'react';

interface CourseDetailsLayoutProps {
  children: ReactNode;
  params: {
    courseId: string;
  };
}

const CourseDetailsLayout = ({
  children,
  params
}: CourseDetailsLayoutProps) => {
  return (
    <div className='h-full'>
      <div className='fixed inset-y-0 z-50 hidden h-full w-80 flex-col md:flex'>
        CourseSidebar
      </div>
      <main className='h-full md:pl-80'>{children}</main>
    </div>
  );
};

export default CourseDetailsLayout;
