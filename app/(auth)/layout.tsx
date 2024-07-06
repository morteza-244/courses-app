import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className='flex min-h-screen w-full items-center justify-center py-4'>
      {children}
    </main>
  );
};

export default AuthLayout;
