'use client';

import React from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  register,
  errors,
  disabled,
  required,
}) => {
  return (
    <div className='relative'>
      <input
        type={type}
        autoComplete='id'
        className='block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer'
        disabled={disabled}
        {...register(id, { required })}
        placeholder=' '
      />
      <label
        htmlFor={id}
        className='absolute select-none pointer-events-none text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 p:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
