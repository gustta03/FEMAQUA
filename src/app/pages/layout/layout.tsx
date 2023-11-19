import React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex bg-slate-400 w-[60vw] m-auto h-[60vh] mt-20">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white">
        FEMAQUA
      </h1>
      <h2>Ferramentas Maravilhosas Que Adoro</h2>
      {children}
    </main>
  );
}

export default Layout;
