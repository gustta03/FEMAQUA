import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Tools } from "../../../usecases/protocols/tool-protocols";
import Cookies from "universal-cookie";
import Spinner from "../spinner/spinner";

interface ModalProps {
  state: boolean;
  deleteTool: Tools;
  updateHomeData: () => void;
  selectedTool: number | null;
  closeModal: () => void;
}

export default function Modal({
  state,
  closeModal,
  deleteTool,
  selectedTool,
  updateHomeData,
}: ModalProps) {
  const cookie = new Cookies();
  const [isLoading, setLoading] = useState(false);

  async function deleteToolById() {
    try {
      setLoading(true);
      await deleteTool.execute({
        token: cookie.get("access_token"),
        data: selectedTool,
      });

      updateHomeData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      closeModal();
    }
  }

  return (
    <Transition appear show={state} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-y-auto" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                Deletar ferramenta
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Deseja realmente deletar esta ferramenta
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="mr-3 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2"
                  onClick={closeModal}
                >
                  cancelar
                </button>
                <button
                  type="button"
                  className={`inline-flex justify-center rounded-md border border-transparent bg-[#F95E5A] text-white px-4 py-2 text-sm font-medium   ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={deleteToolById}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : "Sim"}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
