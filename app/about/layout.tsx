import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О проекте — Про нотариат",
  description: "Цифровая практика для нотариальных контор: подход, инструменты и результаты. Проектируем понятные сценарии от первого вопроса до подготовленного визита.",
  openGraph: {
    title: "О проекте — Про нотариат",
    description: "Цифровая практика для нотариальных контор: подход, инструменты и результаты.",
    type: "website",
  },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
