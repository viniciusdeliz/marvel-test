import LoginForm from "./LoginForm";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function LoginModal() {
    return (
        <section className="login-modal flex w-full grow justify-end mt-2">
          <div className="login-modal flex flex-col bg-white rounded-[1.75rem] lg:w-[31%] h-[27rem] p-[2.25rem] pt-[3rem] self-center">
            <h1 className="text-4xl text-blue-950 font-bold tracking-tighter">
              Bem-vindo<em className="text-red-600 not-italic">.</em>
            </h1>
            <p className="text-gray-500 text-md mt-4 font-light tracking-tighter leading-tight">
              informe as suas credenciais de acesso ao portal
            </p>
            <LoginForm />
            <h5
              className="text-red-600 text-[.6875rem] font-regular text-right mt-5 tracking-tighter">
              <span><i className="inline-block align-sub"><QuestionMarkCircleIcon className="w-3 h-3" /></i> Esqueceu a senha?</span>
            </h5>
          </div>
        </section>
    );
  }