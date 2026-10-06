import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Agent — gestão inteligente de tarefas",
  description:
    "Base inicial de um sistema de tarefas organizado por linguagem natural e evoluído por etapas.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
