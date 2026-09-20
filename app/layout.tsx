import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://notary-it.pro"),
  title: "Про нотариат — цифровые проекты для контор и людей",
  description: "Сайты, запись, поиск, сервисы и автоматизация для нотариальных контор и их клиентов.",
  openGraph: {
    title: "notary—IT: контора работает. Цифровая часть — тоже.",
    description: "Цифровая практика для нотариальных контор: путь клиента от первого вопроса до подготовленного визита.",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "notary—IT — цифровая практика для нотариальных контор" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "notary—IT: контора работает. Цифровая часть — тоже.",
    description: "Цифровая практика для нотариальных контор.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
