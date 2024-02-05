
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form'
import { AtSymbolIcon, ArrowRightEndOnRectangleIcon, EyeIcon } from '@heroicons/react/24/outline'
import InputValidatorAlert from './InputValidatorAlert';
import type { SignInData } from '../contexts/AuthContext';

export default function LoginForm() {
  const { signIn, isAuthenticated, user } = useContext(AuthContext);
  const { register, formState: { errors }, handleSubmit } = useForm<SignInData>({ criteriaMode: 'all' });
  const handleSignIn: SubmitHandler<SignInData> = async (data) => {
    await signIn(data);
  }

  const emailValidationObj = {
    required: 'Este campo é necessário',
    pattern: {
      value: /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/,
      message: 'Insira um e-mail válido'
    },
    minLength: {
      value: 4,
      message: 'E-mail muito curto',
    }
  };

  const passwordValidationObj = {
    required: 'Este campo é necessário',
    minLength: {
      value: 6,
      message: 'Sua senha é muito curta',
    }  
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(handleSignIn)}>
      <div className="input-holder relative px-0.5">
        <i className="absolute right-4 top-6"><AtSymbolIcon className="h-5 w-5 text-blue-900" /></i>
        <input
          {...register('email', {...emailValidationObj})}
          aria-invalid={errors.email ? "true" : "false"}
          className="border border-blue-950 rounded-lg w-full h-14 mt-1.5 p-4 text-blue-950 font-semibold tracking-tighter placeholder:text-sm placeholder:font-light placeholder:tracking-tight placeholder:text-slate-400" placeholder="Informe seu e-mail" type="text" />
      </div>
      <InputValidatorAlert errors={errors} inputName={'email'}/>
      
      <div className="input-holder relative px-0.5">
        <i className="absolute right-4 top-6"><EyeIcon className="h-5 w-5 text-gray-500" /></i>
        <input
          {...register('password', {...passwordValidationObj})}
          className="w-full border border-slate-400 rounded-lg h-14 mt-1 p-4 text-lg text-blue-950 placeholder:text-sm placeholder:font-light placeholder:tracking-tight placeholder:text-slate-400"
          placeholder="Informe sua senha"
          type="password" />
      </div>
      <InputValidatorAlert errors={errors} inputName={'password'}/>

      <button
        className="bg-[#081B4E] rounded-lg h-14 text-2xl text-zinc-50 font-semibold tracking-tight"
        type="submit">
        entrar <ArrowRightEndOnRectangleIcon className="inline h-4 w-4" />
      </button>
    </form>
  )
}