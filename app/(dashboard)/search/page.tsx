import SearchInput from '@/components/shared/SearchInput';
import Categories from '@/dashboardComponents/Categories';
import { CoursesList } from '@/dashboardComponents/courses';
import { getCategories } from '@/lib/actions/category.action';
import { getAllCourses } from '@/lib/actions/course.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface SearchPageParams {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const Browse = async ({ searchParams }: SearchPageParams) => {
  const { userId } = auth();
  if (!userId) redirect('/');
  const categories = await getCategories();
  const courses = await getAllCourses({
    userId,
    categoryId: searchParams.categoryId,
    title: searchParams.title
  });
  return (
    <div className='space-y-5'>
      <div className='flex w-full flex-wrap items-center gap-4'>
        <Categories categories={categories!} />
        <SearchInput />
      </div>
      <CoursesList courses={courses} />
    </div>
  );
};

export default Browse;
