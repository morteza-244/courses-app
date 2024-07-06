'use client';

import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/nextjs';

const SignOutButton = () => {
  const { signOut } = useClerk();
  return (
    <Button
      onClick={() => signOut({ redirectUrl: '/sign-in' })}
      variant={'secondary'}
      className='w-full text-indigo-700'
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
