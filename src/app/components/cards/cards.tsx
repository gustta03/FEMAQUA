import { useEffect, useState } from "react";
import Button from "../buttons/button";
import Modal from "../modal/modal";
import { Tools } from "../../../usecases/protocols/tool-protocols";

type Tool = {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: string[];
};

type Prop = {
  data: Tool;
  deleteTool: Tools;
  updateHomeData: () => void
};

export function Card({ data, deleteTool, updateHomeData }: Prop) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<number | null>(null);

  const handleOpenModal = () => {
    setModalIsOpen(true);
    setSelectedTool(data.id);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <main>
      <div className="mt-5 h-auto bottom-5 p-10 shadow-md">
        <span className="flex justify-between align-middle ">
          <a href={data.link}>
            <h1 className="text-2xl font-bold text-sky-600">{data.title}</h1>
          </a>
          <Button text="Deletar" handleOnClick={handleOpenModal} />
        </span>
        <p>{data.description}</p>
        <a target="_blank" rel="noopener noreferrer">
          {data.link}
        </a>
        <div className="flex flex-wrap mt-2 w-auto">
          {data.tags.map((item) => (
            <p key={item} className="text-sky-600 mr-2 mb-2">
              #{item}
            </p>
          ))}
        </div>
        <Modal
          closeModal={handleCloseModal}
          state={modalIsOpen}
          deleteTool={deleteTool}
          updateHomeData={updateHomeData}
          selectedTool={selectedTool}
        ></Modal>
      </div>
    </main>
  );
}

export default Card;
