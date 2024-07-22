import SearchInput from '@/components/shared/SearchInput';
import { getCategories } from '@/lib/actions/category.action';
import Categories from '../_components/Categories';

const Browse = async () => {
  const categories = await getCategories();
  return (
    <div className='flex flex-wrap items-center gap-4 w-full'>
      <Categories categories={categories!} />
      <SearchInput />
    </div>
  );
};

export default Browse;
