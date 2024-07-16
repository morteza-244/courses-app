import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertTriangle, CheckCircleIcon } from 'lucide-react';

const bannerVariants = cva(
  'border w-full text-center flex items-center text-sm p-4 rounded-md',
  {
    variants: {
      variant: {
        warning: 'bg-yellow-200/80 border-yellow-30 text-primary',
        success: 'bg-emerald-700 border-emerald-800 text-secondary'
      }
    },
    defaultVariants: {
      variant: 'warning'
    }
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon
};

export const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || 'warning'];
  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon size={20} className='mr-1' />
      {label}
    </div>
  );
};
