import { Button } from '@/components/ui/button';
import SubmitLoading from './SubmitLoading';

interface EditSubmitButtonProps {
  isPending: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  label?: string;
}

const EditSubmitButton = ({
  isPending,
  isSubmitting,
  isValid,
  label
}: EditSubmitButtonProps) => {
  return (
    <Button size={'sm'} disabled={!isValid || isSubmitting || isPending}>
      {isPending ? <SubmitLoading /> : <>{label ? label : 'Save'}</>}
    </Button>
  );
};

export default EditSubmitButton;
