'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/ui/select';

interface SelectOptionProps {
  options: { label: string; value: string }[];
  value?: string;
  onChange: (value: string) => void;
}

const SelectOption = ({ onChange, options, value }: SelectOptionProps) => {
  const currentValue = options.find(option => option.value === value)?.label;
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger>
        <p>{value === '' ? 'Select a category' : currentValue}</p>
      </SelectTrigger>
      <SelectContent className='max-h-52'>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectOption;
