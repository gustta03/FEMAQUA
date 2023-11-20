import React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col w-[90vw] md:w-[50vw] m-auto h-[90vh] mt-20">
      <header>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl">
          FEMAQUA
        </h1>
        <h2 className="text-2xl font-bold dark:text-white">
          Ferramentas Maravilhosas Que Adoro
        </h2>
      </header>
      {children}
    </main>
  );
}

export default Layout;
