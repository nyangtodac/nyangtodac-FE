import { tv } from 'tailwind-variants';

export const button = tv({
  slots: {
    container: 'flex flex-row items-center justify-center rounded-md px-4 py-2',
    label: 'font-semibold',
    indicator: 'h-6 text-white',
  },
  variants: {
    color: {
      primary: {
        container: 'bg-primary',
        label: 'text-white',
        indicator: 'text-white',
      },
      secondary: {
        container: 'bg-page border border-solid',
        label: 'text-body',
        indicator: 'text-body',
      },
      destructive: {
        container: 'bg-destructive',
        label: 'text-white',
        indicator: 'text-white',
      },
      link: {
        container: 'bg-transparent',
        label: 'text-body underline',
        indicator: 'text-body',
      },
    },
    size: {
      default: {
        container: 'h-12 px-4',
        label: 'text-lg',
      },
      sm: {
        container: 'h-10 px-3',
        label: 'text-base',
      },
      lg: {
        container: 'h-14 px-8',
        label: 'text-xl',
      },
    },
    disabled: {
      true: {
        container: 'opacity-40',
      },
    },
    fullWidth: {
      true: {
        container: 'self-stretch',
      },
      false: {
        container: 'self-center',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'default',
    disabled: false,
    fullWidth: true,
  },
});

