import { getCategories } from '@/lib/actions/category.action';
import Categories from '../_components/Categories';

const Browse = async () => {
  const categories = await getCategories();
  return (
    <div>
      <Categories categories={categories!} />
    </div>
  );
};

export default Browse;
