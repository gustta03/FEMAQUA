import React from "react";

type Props = {
  validation: any
  authentication: any
}

export function Login({ authentication, validation }: Props) {
  return (
    <main className="flex">
      <div data-testid="form" className="w-[80vw] h-[95vh] mt-[60px] p-10">
        <div className="text-2xl w-[90%] m-auto mb-20">
          <p>FEMAQUA</p>
          <p>Ferramentas maravilhosas que adoro</p>
        </div>
        <form data-testid="form" className="m-auto w-[90%] h-[50%]">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            className="block mb-2 w-[70%] p-2 border-solid border-2 border-black"
          />
          <label>Senha</label>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            className="block mb-2 w-[70%] p-2 border-solid border-2 border-black"
          />
          <div className="w-[70%] flex justify-end">
            <button className="p-3 w-[100px] bg-[#365DF0] text-white rounded cursor-pointer">
              Entrar
            </button>
          </div>
        </form>
      </div>
      <div className="bg-[#365DF0] w-[80%] sm:none">
        <p></p>
      </div>
    </main>
  );
}

export default Login;
