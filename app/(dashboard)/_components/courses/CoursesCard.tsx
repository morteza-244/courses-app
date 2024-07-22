import { IconBadge } from '@/components/ui/icon-badge';
import { formatPrice } from '@/lib/utils';
import { TCourseCard } from '@/types';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CourseCardProps {
  course: TCourseCard;
}

const CoursesCard = ({ course }: CourseCardProps) => {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className='group h-full overflow-hidden rounded-lg border p-3 transition hover:scale-105 hover:shadow-sm'>
        <div className='relative aspect-video w-full overflow-hidden rounded-md'>
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className='object-cover'
          />
        </div>
        <div className='flex w-full flex-col pt-2'>
          <h3 className='line-clamp-2 text-lg font-medium transition hover:text-indigo-700 md:text-base'>
            {course.title}
          </h3>
          <p className='text-xs text-muted-foreground'>{course.category}</p>
          <div className='my-3 flex items-center gap-x-1 text-slate-500'>
            <IconBadge size={'sm'} icon={BookOpen} />
            <span>
              {course.chaptersLength}
              {course.chaptersLength === 1 ? 'Chapter' : 'Chapters'}
            </span>
          </div>
        </div>
        {course.progress !== null ? (
          <div>Progress Component</div>
        ) : (
          <p className='text-md font-medium text-slate-700 md:text-sm'>
            {formatPrice(course.price)}
          </p>
        )}
      </div>
    </Link>
  );
};

export default CoursesCard;
