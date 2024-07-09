import { dotStream } from 'ldrs';

const SubmitLoading = () => {
  dotStream.register();
  return <l-dot-stream size='40' speed='2.5' color='white'></l-dot-stream>;
};

export default SubmitLoading;
