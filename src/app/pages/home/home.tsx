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
  const [searchTag, setSearchTag] = useState<string>("");
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

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTag(event.target.value);
  };

  const filteredToolData = toolData.filter((tool) =>
    tool.tags.some((tag) => tag.toLowerCase().includes(searchTag.toLowerCase()))
  );

  return (
    <main className="flex flex-col lg:flex-row m-auto">
      <Layout>
        <span className="flex flex-col lg:flex-row justify-between items-center h-10 mt-5">
          <input
            type="text"
            placeholder="Buscar por tag"
            className="lg:mr-2 mb-2 lg:mb-0 pl-3 border-2 bg-[#F5F4F6] 1px solid border-[#EBEAED]"
            value={searchTag}
            onChange={handleSearchInputChange}
          />
          <Button
            text="Adicionar"
            type="add"
            handleOnClick={handleAddButtonClick}
          />
        </span>
        {filteredToolData.map((item, index) => (
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
