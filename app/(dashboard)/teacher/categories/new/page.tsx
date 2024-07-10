import CategoryForm from '@/app/(dashboard)/_components/forms/CategoryForm';

const CreateNewCategory = () => {
  return (
    <div className='space-y-4'>
      <h1 className='text-xl font-semibold'>
        Create a specific category for your courses
      </h1>
      <CategoryForm />
    </div>
  );
};

export default CreateNewCategory;
