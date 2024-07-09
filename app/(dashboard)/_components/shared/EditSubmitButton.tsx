import { Button } from '@/components/ui/button';
import SubmitLoading from './SubmitLoading';

interface EditSubmitButtonProps {
  isPending: boolean;
  isValid: boolean;
  isSubmitting: boolean;
}

const EditSubmitButton = ({
  isPending,
  isSubmitting,
  isValid
}: EditSubmitButtonProps) => {
  return (
    <Button size={'sm'} disabled={!isValid || isSubmitting || isPending}>
      {isPending ? <SubmitLoading /> : <>Save</>}
    </Button>
  );
};

export default EditSubmitButton;
