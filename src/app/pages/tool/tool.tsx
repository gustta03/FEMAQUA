import Layout from "../../layout/layout";
import { Tools } from "../../../usecases/protocols/tool-protocols";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  saveTool: Tools;
  cookies: Cookies;
};


export function Tool({ saveTool, cookies }: Props) {
  const navigate = useNavigate();

  const createNewToolSchema = z.object({
    title: z.string().min(1, { message: "O Título é obrigatório" }),
    description: z.string().min(1, { message: "A descrição é obrigatória" }),
    link: z.string().min(1, { message: "O Link é obrigatório" }),
    tags: z
      .string()
      .min(1, {
        message: "As tags são obrigatórias e devem ser separadas por vírgula",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(createNewToolSchema),
  });

  const inputClass = (name: string) => {
    return errors[name] ? 'invalidInput' : '';
  };

  const handleAddTool = async (data: any) => {
    const tagsArray = data.tags.split(",").map((tag: string) => tag.trim());

    try {
      await saveTool.execute({
        token: cookies.get("access_token"),
        data: { ...data, tags: tagsArray },
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding tool:", error);
    }
  };

  return (
    <main className="flex m-auto">
      <Layout>
        <form
          onSubmit={handleSubmit(handleAddTool)}
          className="h-[70vh] shadow-lg"
        >
          <div className="flex justify-between p-5 border-b border-gray-200">
          <h1>
            Adicionar nova ferramenta
          </h1>
          
          <button onClick={() => navigate('/')}>
            x
          </button>
          </div>
          <div className="w-[90%] m-auto flex flex-col h-[70%] mt-5">
            <div className={`flex justify-between w-[100%] h-auto mb-5 ${inputClass('title')}`}>
              <div className={`flex flex-col w-[45%] inputWrapper`}>
                <label htmlFor="title" className="block">
                  Titulo
                </label>
                <input
                  id="title"
                  data-testid="title-input"
                  {...register("title")}
                  className={`border-[1px] rounded-sm bg-[#F5F4F6] inputField ${errors.title ? 'bg-[#FEEFEE] border-2 border-[#95E5A]' : ''}`}
                />
                {errors.title ? (
                  <span className="text-[#F95E5A]">{errors.title.message as string}</span>
                ) : null}
              </div>
              <div className={`flex flex-col w-[45%] inputWrapper`}>
                <label htmlFor="link" className="block">
                  Link
                </label>
                <input
                  id="link"
                  data-testid="link-input"
                  {...register("link")}
                  type="text"
                  className={`border-[1px] rounded-sm bg-[#F5F4F6] inputField ${errors.link ? 'bg-[#FEEFEE] border-2 border-[#95E5A]' : ''}`}
                />
                {errors.link ? (
                  <span className="text-[#F95E5A]">{errors.link.message as string}</span>
                ) : null}
              </div>
            </div>
            <div className={`flex flex-col inputWrapper`}>
              <label htmlFor="description">Descrição</label>
              <textarea
                id="description"
                data-testid="description-input"
                {...register("description")}
                className={`border-[1px] rounded-sm mb-4 bg-[#F5F4F6] inputField ${errors.description ? 'bg-[#FEEFEE] border-2 border-[#95E5A]' : ''}`}
              />
              {errors.description ? (
                <span className="text-[#F95E5A]">{errors.description.message as string}</span>
              ) : null}
            </div>
            <div className={`flex flex-col inputWrapper`}>
              <label htmlFor="tags">Tags</label>
              <input
                id="tags"
                data-testid="tags-input"
                {...register("tags")}
                type="text"
                className={`border-[1px] rounded-sm inputField bg-[#F5F4F6] ${errors.tags ? 'bg-[#FEEFEE] border-2 border-[#95E5A]' : ''}`}
              />
              {errors.tags ? (
                <span className="text-[#F95E5A]">{errors.tags.message as string}</span>
              ) : null}
            </div>
            <div className="w-[90%] m-auto flex justify-end">
              <button className="bg-[#365DF0] pt-2 pl-6 pr-6 pb-2 text-white cursor-pointer" type="submit">Salvar</button>
            </div>
          </div>
        </form>
      </Layout>
    </main>
  );
}

export default Tool;