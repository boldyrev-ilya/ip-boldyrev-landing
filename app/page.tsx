"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    id: "appointment",
    label: "Главный проект",
    title: "Запись, которая начинает готовить визит.",
    text: "Клиент выбирает задачу, получает понятный маршрут и приходит в контору уже подготовленным.",
    result: "Меньше уточняющих звонков",
    signal: "14:30",
    signalLabel: "визит подтверждён",
    tone: "blue",
  },
  {
    id: "notary-site",
    label: "Быстрый запуск",
    title: "Сайт нотариуса. Всё необходимое — уже на месте.",
    text: "Готовая структура с обязательной информацией, услугами, тарифами, контактами и записью. Адаптируем под контору и запускаем без долгой разработки.",
    result: "Простой сайт по требованиям — быстро",
    signal: "7 дней",
    signalLabel: "от материалов до запуска",
    tone: "sand",
  },
  {
    id: "seo",
    label: "Поиск и спрос",
    title: "Не просто выше в поиске. Ближе к нужному действию.",
    text: "Строим страницы вокруг реальных нотариальных задач — чтобы человек находил ответ и понимал следующий шаг.",
    result: "Целевые обращения из поиска",
    signal: "+37%",
    signalLabel: "видимость нужных страниц",
    tone: "paper",
  },
  {
    id: "usb",
    label: "Собственный продукт",
    title: "USB‑ключ там, где он нужен. Без физической передачи.",
    text: "Программа виртуализации даёт защищённый удалённый доступ к USB‑устройствам в рабочей инфраструктуре.",
    result: "Доступ без переносов и ожидания",
    signal: "USB",
    signalLabel: "подключён удалённо",
    tone: "lime",
  },
  {
    id: "calculator",
    label: "Публичный сервис",
    title: "Тариф понятен до звонка.",
    text: "Калькулятор помогает заранее сориентироваться в стоимости нотариального действия и составе расчёта.",
    result: "Цена объясняет себя сама",
    signal: "₽",
    signalLabel: "расчёт по параметрам",
    tone: "ink",
  },
  {
    id: "registry",
    label: "Федеральный проект",
    title: "Все нотариусы России — в одном понятном поиске.",
    text: "Сервис для выбора нотариуса по городу, специализации, режиму работы и доступности записи.",
    result: "От запроса к подходящей конторе",
    signal: "89",
    signalLabel: "регионов в структуре",
    tone: "coral",
  },
  {
    id: "bots",
    label: "Диалог",
    title: "Типовой вопрос получает ответ без очереди.",
    text: "Чат‑бот ведёт по сценарию, собирает исходные данные и передаёт сотруднику уже понятное обращение.",
    result: "Сотрудник подключается там, где нужен",
    signal: "24/7",
    signalLabel: "первая линия ответа",
    tone: "violet",
  },
  {
    id: "telegram-miniapp",
    label: "Сервис внутри Telegram",
    title: "Не отправляем на сайт. Открываем сервис прямо в диалоге.",
    text: "Мини‑приложение в Telegram объединяет запись, подготовку документов, расчёты и статус обращения в привычном для клиента интерфейсе.",
    result: "Меньше переходов — больше завершённых действий",
    signal: "T‑APP",
    signalLabel: "сервис открыт в Telegram",
    tone: "telegram",
  },
  {
    id: "yclients",
    label: "Готовая платформа",
    title: "YCLIENTS — настроен под логику нотариальной конторы.",
    text: "Не просто подключаем календарь: проектируем услуги, длительность, правила записи, уведомления и отчёты.",
    result: "Сервис становится рабочим процессом",
    signal: "01",
    signalLabel: "единое расписание",
    tone: "sky",
  },
  {
    id: "automation",
    label: "Индивидуальная разработка",
    title: "Повторяемое действие становится системой.",
    text: "Разбираем конкретный процесс конторы, находим лишние шаги и создаём решение вокруг существующей работы.",
    result: "Автоматизация по фактам, не по моде",
    signal: "→",
    signalLabel: "обсудить свою задачу",
    tone: "final",
  },
];

export default function Home() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".page");
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-screen]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number((visible.target as HTMLElement).dataset.screen));
      },
      { root, threshold: [0.58, 0.8] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => document.getElementById(projects[index].id)?.scrollIntoView({ block: "start" });

  return (
    <main className="page" id="top">
      <header className="masthead">
        <a className="brand" href="#appointment" aria-label="Про нотариат — к первому проекту">
          <span className="brandMark" aria-hidden="true"><i>Н</i><b /></span>
          <span className="brandName"><strong>Про нотариат</strong><small>цифровые проекты для контор и людей · notary-it.pro</small></span>
        </a>
        <a className="contactLink" href="#automation">Обсудить задачу <span>↗</span></a>
      </header>

      <nav className="rail" aria-label="Проекты">
        <b>{String(active + 1).padStart(2, "0")}</b>
        <div>
          {projects.map((project, index) => (
            <button key={project.id} className={active === index ? "active" : ""} onClick={() => goTo(index)} aria-label={project.title} aria-current={active === index ? "step" : undefined} />
          ))}
        </div>
        <span>{String(projects.length).padStart(2, "0")}</span>
      </nav>

      {projects.map((project, index) => (
        <section className={`screen ${project.tone}`} id={project.id} data-screen={index} key={project.id}>
          <div className="projectCopy">
            <p className="eyebrow">{project.label}</p>
            <h1>{project.title}</h1>
            <p className="projectText">{project.text}</p>
            <div className="projectResult"><span>Результат</span><strong>{project.result}</strong></div>
          </div>
          <div className="projectSignal" aria-label={`${project.signal}: ${project.signalLabel}`}>
            <div className="signalTop"><span>notary-it.pro</span><i>проект в работе</i></div>
            <strong>{project.signal}</strong>
            <p>{project.signalLabel}</p>
            {index === projects.length - 1 ? (
              <a href="mailto:hello@notary-it.pro">hello@notary-it.pro <span>↗</span></a>
            ) : (
              <button type="button" onClick={() => goTo(index + 1)}>Следующий проект <span>↓</span></button>
            )}
          </div>
        </section>
      ))}
    </main>
  );
}
