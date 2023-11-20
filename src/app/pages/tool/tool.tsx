/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Layout from "../../layout/layout";
import { Tools } from "../../../usecases/protocols/tool-protocols";
import Cookies from "universal-cookie";
import Button from "../../components/buttons/button";
import Card from "../../components/cards/cards";

type Props = {
  loadAllTool: Tools;
  cookies: Cookies;
};

export function Tool({ loadAllTool, cookies }: Props) {
  const [toolData, setToolData] = useState<any>([]);
  const cookie = cookies.get("access_token");

  useEffect(() => {
    loadAllTool
      .execute({ token: cookie })
      .then((tool) => setToolData(tool?.data));
  }, []);

  return (
    <main className="flex">
      <Layout>
        <form className="h-[70vh] shadow-lg">
          <h1 className="p-5 border-b border-gray-200">Adicionar nova ferramenta</h1>
          <div className="w-[90%] m-auto flex flex-col h-[70%] mt-5">
            <div className="flex justify-between w-[100%] h-auto mb-5">
              <div className="flex flex-col w-[45%]">
                <label className="block">Nome</label>
                <input className="border-2 border-slate-600" />
              </div>
              <div className="flex flex-col w-[45%]">
                <label className="block">Link</label>
                <input type="text" className="border-2 border-slate-600" />
              </div>
            </div>
            <div className="flex flex-col">
              <label>Descrição</label>
              <textarea
                className="border-2 border-slate-600"
                id="story"
                name="story"
                maxLength={200}
              >
                It was a dark and stormy night...
              </textarea>
            </div>
            <div className="flex flex-col">
              <label>Tags</label>
              <input type="text" className="border-2 border-slate-600" />
            </div>
          </div>
          <div className="w-[90%] m-auto flex justify-end">
            <Button text="Salvar" />
          </div>
        </form>
      </Layout>
    </main>
  );
}

export default Tool;
