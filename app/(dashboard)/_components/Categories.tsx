'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Category } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';

interface CategoriesProps {
  categories: Category[];
}
const Categories = ({ categories }: CategoriesProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const currentCategoryId = searchParams.get('categoryId');
  const currentTitle = searchParams.get('title');

  const currentCategory = categories.find(
    category => category.id === selectedCategoryId
  )?.name;

  const onChecked = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    const isSelected = categoryId === currentCategoryId;
    if (isSelected) setSelectedCategoryId('');
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : categoryId
        }
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>
          {currentCategory ? currentCategory : 'Select a category'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='max-h-52 overflow-y-auto'>
        {categories.map(category => (
          <DropdownMenuCheckboxItem
            key={category.id}
            checked={selectedCategoryId === category.id}
            onCheckedChange={() => onChecked(category.id)}
          >
            {category.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Categories;
