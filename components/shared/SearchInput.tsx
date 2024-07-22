'use client';

import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useEffect, useState } from 'react';
const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);

  const currentCategoryId = searchParams.get('categoryId');

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue
        }
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [currentCategoryId, debouncedValue, router, pathname]);
  return (
    <div className='relative flex w-full items-center xs:w-auto'>
      <SearchIcon
        size={20}
        className='absolute left-2 top-2.5 text-slate-500'
      />
      <Input
        className='w-full pl-8 xs:w-80 bg-slate-50'
        placeholder='Search...'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
