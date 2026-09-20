"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type WP = { entered: boolean };

// ─── Widget 1: Hero – animated route steps ────────────────────────────────────

const HERO_STEPS = [
  { label: "Выбрал задачу", sub: "Доверенность на автомобиль" },
  { label: "Получил список документов", sub: "3 пункта · 10 минут подготовки" },
  { label: "Записался на удобное время", sub: "Вт 14:30 · подтверждено" },
];

function HeroWidget({ entered }: WP) {
  const [done, setDone] = useState<number[]>([]);
  useEffect(() => {
    if (!entered) return;
    const timers = HERO_STEPS.map((_, i) =>
      setTimeout(() => setDone((p) => [...p, i]), 500 + i * 750),
    );
    return () => timers.forEach(clearTimeout);
  }, [entered]);
  return (
    <div className="widget">
      <div className="wbar">
        <span>notary-it.pro</span>
        <span className="wbar-ok">
          <span className="dot" />
          маршрут активен
        </span>
      </div>
      <div className="steps">
        {HERO_STEPS.map((s, i) => (
          <div key={i} className={`step${done.includes(i) ? " done" : ""}`}>
            <div className="step-num">{done.includes(i) ? "✓" : i + 1}</div>
            <div>
              <p className="step-label">{s.label}</p>
              <p className="step-sub">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="wfoot">
        <span className="wfoot-muted">Клиент приходит подготовленным</span>
        <span className="badge b-lime">готово</span>
      </div>
    </div>
  );
}

// ─── Widget 2: Friction – animated call log ───────────────────────────────────

const CALLS = [
  { t: "09:14", n: "Иванова А.В.", s: "повторный вопрос", badge: "b-red", mark: "✕" },
  { t: "10:32", n: "Петров Д.С.", s: "уточнение документов", badge: "b-sky b-ink", mark: "?" },
  { t: "11:05", n: "Сидорова В.Н.", s: "ожидает ответа", badge: "b-dim", mark: "○" },
  { t: "11:47", n: "Козлов М.А.", s: "пропущен", badge: "b-red", mark: "✕" },
];

function FrictionWidget({ entered }: WP) {
  return (
    <div className="widget">
      <div className="wbar">
        <span>входящие звонки</span>
        <span>сегодня</span>
      </div>
      <div className="calls">
        {CALLS.map((c, i) => (
          <div
            key={i}
            className={`call sa${entered ? " in" : ""}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <span className="call-t">{c.t}</span>
            <div>
              <div className="call-n">{c.n}</div>
              <div className="call-s">{c.s}</div>
            </div>
            <span className={`badge ${c.badge}`}>{c.mark}</span>
          </div>
        ))}
      </div>
      <div className="wfoot">
        <span className="wfoot-muted">4 обращения без результата</span>
        <span className="badge b-red">! !</span>
      </div>
    </div>
  );
}

// ─── Widget 3: Route – interactive task selector ──────────────────────────────

const TASKS: Record<string, string[]> = {
  "Доверенность": ["Паспорт — ваш и поверенного", "Данные о полномочиях", "Запись: до 20 минут"],
  "Наследство": ["Свидетельство о смерти", "Документы на имущество", "Запись: до 40 минут"],
  "Сделка": ["Правоустанавливающие документы", "Паспорта сторон", "Выписка ЕГРН"],
  "Другое": ["Опишите задачу — уточним список", "Подберём удобное время"],
};

function RouteWidget({ entered: _ }: WP) {
  const [sel, setSel] = useState("Доверенность");
  const steps = TASKS[sel] ?? [];
  return (
    <div className="widget">
      <div className="wbar">
        <span>выберите задачу</span>
        <span className="wbar-ok">
          <span className="dot" />
          следующий шаг
        </span>
      </div>
      <div className="tasks">
        {Object.keys(TASKS).map((t) => (
          <button
            key={t}
            className={`task-btn${sel === t ? " sel" : ""}`}
            onClick={() => setSel(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="task-steps">
        {steps.map((s, i) => (
          <div
            key={`${sel}-${i}`}
            className="task-step show"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="task-step-i">→</span>
            <span>{s}</span>
          </div>
        ))}
      </div>
      <div className="wfoot">
        <span className="wfoot-muted">Клиент знает, что взять с собой</span>
      </div>
    </div>
  );
}

// ─── Widget 4: Notary site – browser mockup ───────────────────────────────────

function SiteWidget({ entered }: WP) {
  return (
    <div className="browser-widget">
      <div className="b-chrome">
        <div className="b-dots">
          <div className="b-dot" />
          <div className="b-dot" />
          <div className="b-dot" />
        </div>
        <div className="b-addr">notary-office.ru</div>
      </div>
      <div className="b-body">
        <div className={`sa${entered ? " in" : ""}`} style={{ transitionDelay: "0ms" }}>
          <div className="b-nav">
            <span>Услуги</span>
            <span>Тарифы</span>
            <span>О нас</span>
            <span className="b-nav-accent">Записаться</span>
          </div>
        </div>
        <div className={`sa${entered ? " in" : ""}`} style={{ transitionDelay: "130ms" }}>
          <p className="b-title">Нотариус Иванова Е.А.</p>
          <p className="b-sub">Нотариальный округ · г. Москва</p>
          <a className="b-cta" href="#site">Записаться на приём →</a>
        </div>
        <div className={`sa${entered ? " in" : ""}`} style={{ transitionDelay: "260ms" }}>
          <div className="b-grid">
            {["Доверенности", "Наследство", "Сделки", "Заверение"].map((s) => (
              <div key={s} className="b-tag">{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Widget 5: Online booking – service + time slots ─────────────────────────

const SVCS = ["Доверенность", "Наследство", "Сделка"];
const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт"];
const TIMES = ["10:00", "11:00", "12:00"];
// 1=free, 0=taken, null=closed
const MATRIX = [
  [1, 1, null, 1, 0],
  [0, 1, null, 0, 1],
  [1, 1, null, 1, 1],
] as const;

function BookingWidget({ entered: _ }: WP) {
  const [svc, setSvc] = useState(0);
  const [slot, setSlot] = useState<[number, number] | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const confirm = () => {
    if (!slot) return;
    setConfirmed(true);
    setTimeout(() => { setConfirmed(false); setSlot(null); }, 2800);
  };

  if (confirmed && slot) {
    return (
      <div className="widget">
        <div className="book-confirm">
          <div className="book-confirm-check">✓</div>
          <p className="book-confirm-label">Запись подтверждена</p>
          <span className="badge b-lime">
            {DAYS[slot[1]]} {TIMES[slot[0]]}
          </span>
          <span style={{ font: "400 10px/1 var(--f-mono)", opacity: .45 }}>
            уведомление отправлено
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="widget">
      <div className="wbar">
        <span>онлайн-запись</span>
        <span className="wbar-ok">
          <span className="dot" />
          доступно
        </span>
      </div>
      <div className="svcs">
        {SVCS.map((s, i) => (
          <button key={i} className={`svc${svc === i ? " sel" : ""}`} onClick={() => setSvc(i)}>
            {s}
          </button>
        ))}
      </div>
      <div className="slot-grid">
        <div className="slot-days">
          <div />
          {DAYS.map((d) => (
            <div key={d} className="slot-day">{d}</div>
          ))}
        </div>
        {MATRIX.map((row, ri) => (
          <div key={ri} className="slot-row">
            <div className="slot-time">{TIMES[ri]}</div>
            {row.map((v, ci) => {
              const isSel = slot?.[0] === ri && slot?.[1] === ci;
              const off = v === null || v === 0;
              return (
                <button
                  key={ci}
                  className={`slot${isSel ? " sel" : ""}${off ? " off" : ""}`}
                  onClick={() => !off && setSlot([ri, ci])}
                  aria-label={off ? "недоступно" : `${DAYS[ci]} ${TIMES[ri]}`}
                  aria-pressed={isSel}
                >
                  {v === null ? "—" : isSel ? "✓" : v ? "·" : "×"}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <button className="book-btn" onClick={confirm} disabled={!slot}>
        {slot ? `Записаться: ${DAYS[slot[1]]} ${TIMES[slot[0]]}` : "Выберите время"}
      </button>
    </div>
  );
}

// ─── Widget 6: Telegram mini app ─────────────────────────────────────────────

function TelegramWidget({ entered }: WP) {
  return (
    <div className="widget tg-widget">
      <div className="wbar">
        <span>telegram mini app</span>
        <span className="wbar-ok">
          <span className="dot" />
          доступно
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", padding: "16px 22px 8px" }}>
        <div className={`tg-phone sa${entered ? " in" : ""}`} style={{ transitionDelay: "180ms" }}>
          <div className="tg-head">
            <div className="tg-name">Нотариус Иванова Е.А.</div>
            <div className="tg-sub">✓ Официальный бот</div>
          </div>
          <div className="tg-msgs">
            <div className="tg-msg tg-in">
              Добрый день! Хочу записаться на доверенность
            </div>
            <div className="tg-msg tg-out">
              Открой сервис — выбери время и подготовь документы заранее
            </div>
          </div>
          <button className="tg-open">Открыть сервис записи →</button>
        </div>
      </div>
      <div className="wfoot">
        <span className="wfoot-muted">Сервис — внутри привычного чата</span>
      </div>
    </div>
  );
}

// ─── Widget 7: SEO – search journey ──────────────────────────────────────────

function SeoWidget({ entered }: WP) {
  return (
    <div className="widget seo-widget">
      <div className={`search-bar sa${entered ? " in" : ""}`} style={{ transitionDelay: "0ms" }}>
        <i className="s-icon" aria-hidden="true">🔍</i>
        <span className="s-q">нотариус доверенность москва</span>
      </div>
      <div className={`serp sa${entered ? " in" : ""}`} style={{ transitionDelay: "160ms" }}>
        <div className="serp-url">notary-office.ru › uslugi › doverennost</div>
        <div className="serp-ttl">Доверенность у нотариуса — Иванова Е.А.</div>
        <div className="serp-snip">
          Оформление нотариальных доверенностей. Узнайте стоимость и подготовьте
          документы заранее.
        </div>
        <a href="#seo" className="serp-cta">Записаться онлайн →</a>
      </div>
      <div
        className={`serp-arrow sa${entered ? " in" : ""}`}
        style={{ transitionDelay: "320ms" }}
      >
        <span>↓</span>
        <span>от запроса к действию — без потерь</span>
      </div>
    </div>
  );
}

// ─── Widget 8: Automation – before / after toggle ────────────────────────────

const BA = {
  before: [
    "Звонок — объяснение задачи с нуля",
    "Ожидание ответа (иногда часами)",
    "Уточнение документов — ещё звонок",
    "Запись вручную в таблицу",
    "Напоминание — снова звонок",
  ],
  after: [
    "Клиент выбирает задачу онлайн",
    "Получает список документов сразу",
    "Запись + подтверждение автоматически",
  ],
} as const;

function AutomationWidget({ entered: _ }: WP) {
  const [view, setView] = useState<"before" | "after">("before");
  return (
    <div className="widget">
      <div className="wbar">
        <span>процесс конторы</span>
      </div>
      <div className="ba-toggle">
        <button className={`ba-btn${view === "before" ? " sel" : ""}`} onClick={() => setView("before")}>
          КАК БЫЛО
        </button>
        <button className={`ba-btn${view === "after" ? " sel" : ""}`} onClick={() => setView("after")}>
          КАК СТАЛО
        </button>
      </div>
      <div className="ba-list">
        {BA[view].map((s, i) => (
          <div
            key={`${view}-${i}`}
            className={`ba-item sa in ${view === "before" ? "bad" : "good"}`}
            style={{ transitionDelay: `${i * 65}ms` }}
          >
            <i className="ba-mark">{view === "before" ? "✕" : "✓"}</i>
            <span>{s}</span>
          </div>
        ))}
      </div>
      <div className="wfoot">
        <span className="wfoot-muted">
          {view === "before" ? "5 точек трения" : "3 шага — клиент готов"}
        </span>
        {view === "after" && <span className="badge b-lime">эффект</span>}
      </div>
    </div>
  );
}

// ─── Widget 9: Final CTA ──────────────────────────────────────────────────────

function FinalWidget({ entered }: WP) {
  return (
    <div className="widget final-widget">
      <div className="wbar">
        <span>notary-it.pro</span>
        <span style={{ opacity: .5 }}>hello@notary-it.pro</span>
      </div>
      <div className="final-links">
        <div className={`sa${entered ? " in" : ""}`} style={{ transitionDelay: "80ms" }}>
          <a href="mailto:hello@notary-it.pro" className="final-cta">
            <span>hello@notary-it.pro</span>
            <span style={{ opacity: .4 }}>↗</span>
          </a>
        </div>
        <div className={`sa${entered ? " in" : ""}`} style={{ transitionDelay: "180ms" }}>
          <div className="final-note">
            Расскажите, что сейчас происходит в конторе — предложим конкретное решение без
            обязательств.
          </div>
        </div>
      </div>
      <div className="wfoot">
        <a href="mailto:hello@notary-it.pro">Написать →</a>
      </div>
    </div>
  );
}

// ─── Screen data ──────────────────────────────────────────────────────────────

interface Screen {
  id: string;
  tone: string;
  eyebrow: string;
  title: string;
  text: string;
  result: string;
  Widget: React.ComponentType<WP>;
}

const SCREENS: Screen[] = [
  {
    id: "promise",
    tone: "",
    eyebrow: "цифровые решения для нотариата",
    title: "Работа конторы, которая не заставляет клиента ждать",
    text: "Клиент знает, что взять и что сделать до визита. Контора получает подготовленного посетителя — не очередь вопросов.",
    result: "Меньше уточняющих звонков",
    Widget: HeroWidget,
  },
  {
    id: "friction",
    tone: "s-sky",
    eyebrow: "как устроен сегодняшний день",
    title: "Звонки, уточнения, ожидание — это рабочий день без системы",
    text: "Один вопрос повторяется десять раз. Клиент ждёт ответа, сотрудник занят другим. Время уходит — дело не движется.",
    result: "Ситуация знакома каждой конторе",
    Widget: FrictionWidget,
  },
  {
    id: "route",
    tone: "",
    eyebrow: "маршрут клиента",
    title: "Клиент выбирает задачу и сразу получает следующий шаг",
    text: "Не форма обратной связи и не «перезвоним». Понятный список: что взять, что проверить, как добраться. Всё — до визита.",
    result: "Клиент приходит подготовленным",
    Widget: RouteWidget,
  },
  {
    id: "site",
    tone: "s-sand",
    eyebrow: "быстрый запуск",
    title: "Сайт нотариуса. Всё необходимое — уже на месте",
    text: "Готовая структура с обязательной информацией, услугами, тарифами, контактами и записью. Адаптируем под контору за 7 дней.",
    result: "Сайт по требованиям — быстро и без хаоса",
    Widget: SiteWidget,
  },
  {
    id: "booking",
    tone: "s-sky",
    eyebrow: "онлайн-запись",
    title: "Выбрал услугу, выбрал время — визит назначен",
    text: "Не ждать звонка и не объяснять с нуля. Клиент сам проходит путь: услуга → свободное время → подтверждение.",
    result: "Запись работает до вашего ответа",
    Widget: BookingWidget,
  },
  {
    id: "telegram",
    tone: "s-tlgm",
    eyebrow: "сервис внутри telegram",
    title: "Не отправляем на сайт. Открываем сервис прямо в диалоге",
    text: "Мини-приложение в Telegram: запись, подготовка документов, статус обращения — в одном окне без переключений.",
    result: "Меньше переходов — больше завершённых действий",
    Widget: TelegramWidget,
  },
  {
    id: "seo",
    tone: "",
    eyebrow: "поиск и доверие",
    title: "Не просто выше в поиске. Ближе к нужному действию",
    text: "Страницы, которые отвечают на реальные нотариальные задачи. Человек ищет — находит ответ — понимает следующий шаг.",
    result: "Целевые обращения из поиска",
    Widget: SeoWidget,
  },
  {
    id: "automation",
    tone: "s-ink",
    eyebrow: "индивидуальная автоматизация",
    title: "Повторяемое действие становится системой",
    text: "Разбираем конкретный процесс конторы, убираем лишние шаги и создаём решение вокруг существующей работы.",
    result: "Автоматизация по фактам, не по моде",
    Widget: AutomationWidget,
  },
  {
    id: "final",
    tone: "s-indigo",
    eyebrow: "следующий шаг",
    title: "Обсудить задачу",
    text: "Расскажите, что происходит в конторе сейчас. Предложим конкретное решение — без лишних слов и обязательств.",
    result: "Один разговор вместо долгого выбора",
    Widget: FinalWidget,
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function Home() {
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState<Set<number>>(new Set([0]));
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-screen]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) {
          const idx = Number((hit.target as HTMLElement).dataset.screen);
          setActive(idx);
          setEntered((p) => new Set([...p, idx]));
        }
      },
      { root, threshold: [0.5, 0.75] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((idx: number) => {
    pageRef.current
      ?.querySelector<HTMLElement>(`[data-screen="${idx}"]`)
      ?.scrollIntoView({ block: "start" });
  }, []);

  const total = SCREENS.length;

  return (
    <main className="page" ref={pageRef} id="top">
      {/* ── Header ── */}
      <header className="masthead">
        <a className="brand" href="#promise" aria-label="Начало страницы">
          <span className="brandMark" aria-hidden="true">
            <i>Н</i>
            <b />
          </span>
          <span className="brandName">
            <strong>Про нотариат</strong>
            <small>цифровые проекты · notary-it.pro</small>
          </span>
        </a>
        <a className="cta-nav" href="#final">
          <span className="cta-nav-txt">Обсудить задачу</span>
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      {/* ── Nav rail ── */}
      <nav className="rail" aria-label="Навигация по экранам">
        <span className="rail-n" aria-hidden="true">
          {String(active + 1).padStart(2, "0")}
        </span>
        <div className="rail-dots">
          {SCREENS.map((s, i) => (
            <button
              key={s.id}
              className={`rail-dot${active === i ? " on" : ""}`}
              onClick={() => goTo(i)}
              aria-label={s.eyebrow}
              aria-current={active === i ? "step" : undefined}
            />
          ))}
        </div>
        <span className="rail-n" aria-hidden="true">
          {String(total).padStart(2, "0")}
        </span>
      </nav>

      {/* ── Progress counter ── */}
      <div className="progress" aria-hidden="true">
        {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* ── Screens ── */}
      {SCREENS.map((s, i) => {
        const isIn = entered.has(i);
        return (
          <section
            key={s.id}
            id={s.id}
            className={`screen${s.tone ? " " + s.tone : ""}`}
            data-screen={i}
            data-in={isIn ? "" : undefined}
            aria-label={s.eyebrow}
          >
            <div className="copy">
              <p className="eyebrow">{s.eyebrow}</p>
              <h1>{s.title}</h1>
              <p className="lead">{s.text}</p>
              <div className="result">
                <span className="result-lbl">Результат</span>
                <span className="result-val">{s.result}</span>
              </div>
            </div>
            <div className="widget-wrap">
              <s.Widget entered={isIn} />
            </div>
          </section>
        );
      })}
    </main>
  );
}
