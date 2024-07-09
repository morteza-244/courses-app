import { CourseNameForm } from '@/app/(dashboard)/_components/forms';

const CreateNewCourse = () => {
  return (
    <div>
      <h1 className='text-2xl'>Name your course</h1>
      <p className='text-sm text-slate-500'>
        What would you like to name your course? Don&apos;t worry, you can
        change this later.
      </p>
      <CourseNameForm />
    </div>
  );
};

export default CreateNewCourse;
