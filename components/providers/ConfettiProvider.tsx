'use client';

import { useConfettiStore } from '@/store/confettiStore';
import ReactConfetti from 'react-confetti';

const ConfettiProvider = () => {
  const confetti = useConfettiStore();
  if (!confetti.isOpen) return null;
  return (
    <ReactConfetti
      className='pointer-events-none z-[1000]'
      numberOfPieces={1000}
      recycle={false}
      onConfettiComplete={() => confetti.onClose()}
    />
  );
};

export default ConfettiProvider;
