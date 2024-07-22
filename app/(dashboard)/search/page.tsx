import SearchInput from '@/components/shared/SearchInput';
import { getCategories } from '@/lib/actions/category.action';
import { getAllCourses } from '@/lib/actions/course.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Categories from '../_components/Categories';

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
      {courses.map(course => (
        <div>{course.price}</div>
      ))}
    </div>
  );
};

export default Browse;
