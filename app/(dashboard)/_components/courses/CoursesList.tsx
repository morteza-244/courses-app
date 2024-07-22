import { ICoursesWithProgressWithCategory } from '@/lib/actions/shared.types';
import { TCourseCard } from '@/types';
import CoursesCard from './CoursesCard';

interface CoursesListProps {
  courses: ICoursesWithProgressWithCategory[];
}

const CoursesList = ({ courses }: CoursesListProps) => {
  return (
    <div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {courses.map(item => {
          const course: TCourseCard = {
            category: item.category.name,
            chaptersLength: item.chapters.length,
            id: item.id,
            imageUrl: item.imageUrl!,
            price: item.price!,
            progress: item.progress,
            title: item.title
          };
          return <CoursesCard key={item.id} course={course} />;
        })}
      </div>
      {courses.length === 0 && <p>No Courses</p>}
    </div>
  );
};

export default CoursesList;
