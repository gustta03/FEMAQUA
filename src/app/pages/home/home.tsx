/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Layout from "../../layout/layout";
import { Tools } from "../../../usecases/protocols/tool-protocols";
import Cookies from "universal-cookie";
import Button from "../../components/buttons/button";
import Card from "../../components/cards/cards";
import { useNavigate } from "react-router-dom";

type Tool = {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: string[];
};

type Props = {
  getTools: Tools;
  deleteTool: Tools;
  cookies: Cookies;
};

export function Home({ getTools, deleteTool, cookies }: Props) {
  const [toolData, setToolData] = useState<Tool[]>([]);
  const cookie = cookies.get("access_token");
  const navigate = useNavigate();

  const updateHomeData = async () => {
    try {
      const response = await getTools.execute({ token: cookie });
      setToolData(response?.data as unknown  as Tool[]);
    } catch (error) {
      console.error("Error loading tools:", error);
    }
  };

  useEffect(() => {
    updateHomeData();
  }, []);

  const handleAddButtonClick = () => {
    navigate("/home/tools/save");
  };

  return (
    <main className="flex">
      <Layout>
        <span className="flex justify-between align-middle h-10 mt-5">
          <input
            type="text"
            placeholder="buscar por tag"
            className="pl-3 border-2 bg-[#F5F4F6] 1px solid border-[#EBEAED]"
          />
          <Button
            text="Adicionar"
            type="success"
            handleOnClick={handleAddButtonClick}
          />
        </span>
        {toolData.map((item, index) => (
          <Card
            key={index}
            data={item}
            deleteTool={deleteTool}
            updateHomeData={updateHomeData}
          ></Card>
        ))}
      </Layout>
    </main>
  );
}

export default Home;
