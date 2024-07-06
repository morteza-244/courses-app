import Image from 'next/image';
import Link from 'next/link';
const Logo = () => {
  return (
    <Link href='/' className='flex items-center gap-3 px-4 py-2'>
      <Image
        src='/images/logo.svg'
        width={30}
        height={30}
        alt='logo'
        className='h-9 w-9 md:h-12 md:w-12'
      />
      <h1 className='text-[15px] font-semibold md:text-[16px]'>
        Online Academy
      </h1>
    </Link>
  );
};

export default Logo;
