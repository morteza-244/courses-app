import { Loader2 } from 'lucide-react';

const ReorderSkeleton = () => {
  return (
    <div className='absolute inset-x-0 top-0 flex h-full w-full items-center justify-center rounded-md bg-slate-200/50'>
      <Loader2 size={20} className='animate-spin' />
    </div>
  );
};

export default ReorderSkeleton;
