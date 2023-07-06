'use client';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        secondary
          ? 'bg-neutral-200 hover:bg-neutral-300 text-neutral-900'
          : danger
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-red-600 hover:bg-red-700 text-white'
      } py-3 text-white rounded-md w-full mt-10 transition ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
