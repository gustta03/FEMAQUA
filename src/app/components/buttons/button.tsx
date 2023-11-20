
type Props = {
  text: string;
  type?: string;
  handleOnClick?: () => void
};

export function Button({ text, type, handleOnClick }: Props) {
  return (
  <main>
    <button
        className={`border-slate-600 border-1 text-center h-10 w-32 text-white ${
          type === "add" ? "bg-[#0E995D]" : "bg-[#F95E5A]"
        } `}
        onClick={handleOnClick}
      >
        {text}
      </button>
    </main>
  );
}

export default Button;
