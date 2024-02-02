export default function LoginModal() {
    return (
        <section className="login-page flex w-full grow justify-end">
          <div className="login-modal flex flex-col bg-white rounded-[1.75rem] w-[30.5%] h-[27rem] p-[2.125rem] pt-12 self-center">
            <h1 className="text-4xl text-blue-950 font-bold tracking-tighter">Bem-vindo<em className="text-red-600 not-italic">.</em></h1>
            <p className="text-gray-500 text-md mt-4 font-light tracking-tighter leading-tight">
              informe as suas credenciais de acesso ao portal
            </p>
            <input className="border border-blue-950 rounded-lg h-14 mt-1.5 p-4" placeholder="Informe seu e-mail" type="text"></input>
            <input className="border border-slate-400 rounded-lg h-14 mt-[1.3875rem] p-4 placeholder:text-sm placeholder:font-light placeholder:tracking-tight placeholder:text-slate-400" placeholder="Informe sua senha" type="text"></input>
            <button className="bg-blue-950 rounded-lg h-14 mt-3 text-2xl font-bold">
              entrar
            </button>
            <h5 className="text-red-600 text-xs font-light text-right mt-6">Esqueceu a senha?</h5>
          </div>
        </section>
    );
  }