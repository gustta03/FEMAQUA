import React, { useRef } from "react";
import { AuthenticationUseCase } from "../../../usecases/protocols/authentication-protocols";

import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

type Props = {
  authentication: AuthenticationUseCase;
  cookies: Cookies;
};

export function Login({ authentication, cookies }: Props) {
  /**
   *  escolhi usar useRef para evitar re-renders desnecessários ao digitar cada tecla do teclado no formulário para ajudar a otimizar o desempenho,
   *  já que useRef permite acessar os valores dos campos de forma direta,
   *  sem acionar re-renderizações em cada alteração.
   */

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailRef.current && passwordRef.current) {
      try {
        const response = await authentication.execute({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });

        cookies.set("access_token", response.data.access_token);
        navigate("/home/tools");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main className="flex">
      <div data-testid="form" className="w-[80vw] h-[95vh] mt-[60px] p-10">
        <div className="text-2xl w-[90%] m-auto mb-20">
          <p>FEMAQUA</p>
          <p>Ferramentas maravilhosas que adoro</p>
        </div>
        <form
          data-testid="form"
          className="m-auto w-[90%] h-[50%]"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu e-mail"
            className="block mb-2 w-[70%] p-2 border-solid border-2 border-black"
            ref={emailRef}
          />

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
            className="block mb-2 w-[70%] p-2 border-solid border-2 border-black"
            ref={passwordRef}
          />
          <div className="w-[70%] flex justify-end">
            <button
              type="submit"
              data-testid="submit-button"
              className="p-3 w-[100px] bg-[#365DF0] text-white rounded cursor-pointer"
            >
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
