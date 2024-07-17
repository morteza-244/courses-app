import { dotStream } from 'ldrs';

interface SubmitLoadingProps {
  color?: string;
}

const SubmitLoading = ({ color }: SubmitLoadingProps) => {
  dotStream.register();
  return (
    <l-dot-stream
      size='40'
      speed='2.5'
      color={color ? color : 'white'}
    ></l-dot-stream>
  );
};

export default SubmitLoading;
