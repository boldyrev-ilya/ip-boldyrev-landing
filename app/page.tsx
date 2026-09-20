"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Entered = { entered: boolean };

// ════════════════════════════════════════════════════════════════════
// SCREEN 1 — PROMISE: text-dominant, compact route widget as accent
// ════════════════════════════════════════════════════════════════════

const ROUTE_STEPS = [
  { label: "Выбрал задачу", sub: "Доверенность на автомобиль" },
  { label: "Получил список документов", sub: "3 пункта · 10 минут" },
  { label: "Записался на 14:30", sub: "Вт · подтверждено" },
];

function RouteMini({ entered }: Entered) {
  const [done, setDone] = useState<number[]>([]);
  useEffect(() => {
    if (!entered) return;
    const timers = ROUTE_STEPS.map((_, i) =>
      setTimeout(() => setDone((p) => [...p, i]), 600 + i * 800),
    );
    return () => timers.forEach(clearTimeout);
  }, [entered]);
  return (
    <div className="route-mini fade-in">
      <div className="route-mini-bar">
        <span>notary-it.pro</span>
        <span className="route-mini-ok">
          <span className="dot" /> маршрут активен
        </span>
      </div>
      <div className="route-mini-steps">
        {ROUTE_STEPS.map((s, i) => (
          <div key={i} className={`rmini-step${done.includes(i) ? " done" : ""}`}>
            <div className="rmini-num">{done.includes(i) ? "✓" : i + 1}</div>
            <div>
              <div className="rmini-lbl">{s.label}</div>
              <div className="rmini-sub">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="route-mini-foot">
        <span>клиент приходит подготовленным</span>
        <span className="badge b-lime">готово</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// SCREEN 2 — FRICTION: full-width call board as the main material
// ════════════════════════════════════════════════════════════════════

const CALLS = [
  { t: "09:14", n: "Иванова А.В.", s: "повторный вопрос", badge: "b-red", mark: "✕" },
  { t: "10:32", n: "Петров Д.С.", s: "уточнение документов", badge: "b-dim", mark: "?" },
  { t: "11:05", n: "Сидорова В.Н.", s: "ожидает ответа", badge: "b-dim", mark: "○" },
  { t: "11:47", n: "Козлов М.А.", s: "пропущен", badge: "b-red", mark: "✕" },
  { t: "12:20", n: "Фёдорова Л.П.", s: "перезвонить", badge: "b-dim", mark: "↻" },
];

function CallBoard({ entered }: Entered) {
  return (
    <div className="call-board fade-in">
      <div className="call-board-head">
        <span>входящие звонки · сегодня</span>
        <span className="call-board-ok">
          <span className="dot" /> без результата
        </span>
      </div>
      <div className="call-board-body stagger">
        {CALLS.map((c, i) => (
          <div key={i} className="cb-row">
            <span className="cb-time">{c.t}</span>
            <div>
              <div className="cb-name">{c.n}</div>
              <div className="cb-sub">{c.s}</div>
            </div>
            <span className={`badge ${c.badge}`}>{c.mark}</span>
          </div>
        ))}
      </div>
      <div className="cb-board-foot">
        <span>5 обращений — ни одного завершённого</span>
        <span className="badge b-red">трение</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// SCREEN 3 — ROUTE: interactive task selector, centered
// ════════════════════════════════════════════════════════════════════

const TASKS: Record<string, string[]> = {
  "Доверенность": ["Паспорт — ваш и поверенного", "Данные о полномочиях", "Запись: до 20 минут"],
  "Наследство": ["Свидетельство о смерти", "Документы на имущество", "Запись: до 40 минут"],
  "Сделка": ["Правоустанавливающие документы", "Паспорта сторон", "Выписка ЕГРН"],
  "Другое": ["Опишите задачу — уточним список", "Подберём удобное время"],
};

function RoutePanel(_: Entered) {
  const [sel, setSel] = useState("Доверенность");
  const steps = TASKS[sel] ?? [];
  return (
    <div className="route-panel fade-in">
      <div className="route-panel-bar">
        <span>выберите задачу</span>
        <span className="route-panel-ok">
          <span className="dot" /> следующий шаг
        </span>
      </div>
      <div className="route-tasks">
        {Object.keys(TASKS).map((t) => (
          <button
            key={t}
            className={`rtask${sel === t ? " sel" : ""}`}
            onClick={() => setSel(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="route-checklist">
        {steps.map((s, i) => (
          <div key={`${sel}-${i}`} className="rc-item show" style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="rc-arrow">→</span>
            <span>{s}</span>
          </div>
        ))}
      </div>
      <div className="route-panel-foot">
        <span>клиент знает, что взять с собой</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// SCREEN 4 — SITE: browser mockup dominates
// ════════════════════════════════════════════════════════════════════

function BrowserMock({ entered }: Entered) {
  return (
    <div className="browser fade-in">
      <div className="browser-chrome">
        <div className="browser-dots">
          <div className="browser-dot" />
          <div className="browser-dot" />
          <div className="browser-dot" />
        </div>
        <div className="browser-addr">notary-office.ru</div>
      </div>
      <div className="browser-body stagger">
        <div className="browser-nav">
          <span>Услуги</span>
          <span>Тарифы</span>
          <span>О конторе</span>
          <span className="browser-nav-accent">Записаться</span>
        </div>
        <div>
          <p className="browser-title">Нотариус Иванова Е.А.</p>
          <p className="browser-subline">Нотариальный округ · г. Москва</p>
          <a className="browser-cta-btn" href="#site">Записаться на приём →</a>
        </div>
        <div className="browser-tags">
          {["Доверенности", "Наследство", "Сделки", "Заверение"].map((s) => (
            <div key={s} className="browser-tag">{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// SCREEN 5 — BOOKING: full interactive calendar
// ════════════════════════════════════════════════════════════════════

const SVCS = ["Доверенность", "Наследство", "Сделка"];
const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт"];
const TIMES = ["10:00", "11:00", "12:00"];
const MATRIX: readonly (readonly (number | null)[])[] = [
  [1, 1, null, 1, 0],
  [0, 1, null, 0, 1],
  [1, 1, null, 1, 1],
];

function BookingPanel(_: Entered) {
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
      <div className="booking-panel fade-in">
        <div className="booking-confirmed">
          <div className="booking-confirmed-check">✓</div>
          <p className="booking-confirmed-label">Запись подтверждена</p>
          <span className="badge b-lime">{DAYS[slot[1]]} {TIMES[slot[0]]}</span>
          <span style={{ font: "400 11px/1 var(--f-mono)", opacity: 0.4 }}>
            уведомление отправлено
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-panel fade-in">
      <div className="booking-bar">
        <span>онлайн-запись</span>
        <span className="booking-ok">
          <span className="dot" /> доступно
        </span>
      </div>
      <div className="booking-services">
        {SVCS.map((s, i) => (
          <button key={i} className={`b-svc${svc === i ? " sel" : ""}`} onClick={() => setSvc(i)}>
            {s}
          </button>
        ))}
      </div>
      <div className="booking-slots">
        <div className="b-slot-days">
          <div />
          {DAYS.map((d) => <div key={d} className="b-slot-day">{d}</div>)}
        </div>
        {MATRIX.map((row, ri) => (
          <div key={ri} className="b-slot-row">
            <div className="b-slot-time">{TIMES[ri]}</div>
            {row.map((v, ci) => {
              const isSel = slot?.[0] === ri && slot?.[1] === ci;
              const off = v === null || v === 0;
              return (
                <button
                  key={ci}
                  className={`b-slot${isSel ? " sel" : ""}${off ? " off" : ""}`}
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
      <button className="booking-confirm-btn" onClick={confirm} disabled={!slot}>
        {slot ? `Записаться: ${DAYS[slot[1]]} ${TIMES[slot[0]]}` : "Выберите время"}
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// SCREEN 6 — TELEGRAM: phone frame as hero
// ════════════════════════════════════════════════════════════════════

function TelegramFrame({ entered }: Entered) {
  return (
    <div className={`tg-frame${entered ? " fade-in" : " fade-in"}`}>
      <div className="tg-header">
        <div className="tg-header-name">Нотариус Иванова Е.А.</div>
        <div className="tg-header-sub">✓ Официальный бот</div>
      </div>
      <div className="tg-messages stagger">
        <div className="tg-msg tg-msg-in">
          Добрый день! Хочу записаться на доверенность
        </div>
        <div className="tg-msg tg-out">
          Открой сервис — выбери время и подготовь документы заранее
        </div>
      </div>
      <button className="tg-launch">Открыть сервис записи →</button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// SCREEN 7 — SEO: search results as main content
// ════════════════════════════════════════════════════════════════════

function SearchResults({ entered }: Entered) {
  return (
    <div className="search-results fade-in">
      <div className={`sr-search${entered ? "" : ""}`}>
        <i className="sr-search-icon" aria-hidden="true">🔍</i>
        <span className="sr-search-q">нотариус доверенность москва</span>
      </div>
      <div className="sr-result">
        <div className="sr-url">notary-office.ru › uslugi › doverennost</div>
        <div className="sr-title">Доверенность у нотариуса — Иванова Е.А.</div>
        <div className="sr-snippet">
          Оформление нотариальных доверенностей. Узнайте стоимость и подготовьте
          документы заранее.
        </div>
        <a href="#seo" className="sr-action">Записаться онлайн →</a>
      </div>
      <div className="sr-flow">
        <span>↓</span>
        <span>от запроса к действию — без потерь</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// SCREEN 8 — AUTOMATION: dark, before/after toggle
// ════════════════════════════════════════════════════════════════════

const BA_DATA = {
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

function AutomationPanel(_: Entered) {
  const [view, setView] = useState<"before" | "after">("before");
  return (
    <div className="ba-panel fade-in">
      <div className="ba-panel-bar">
        <span>процесс конторы</span>
      </div>
      <div className="ba-toggle">
        <button className={`ba-tab${view === "before" ? " sel" : ""}`} onClick={() => setView("before")}>
          как было
        </button>
        <button className={`ba-tab${view === "after" ? " sel" : ""}`} onClick={() => setView("after")}>
          как стало
        </button>
      </div>
      <div className="ba-list stagger">
        {BA_DATA[view].map((s, i) => (
          <div key={`${view}-${i}`} className={`ba-row ${view === "before" ? "before-r" : "after-r"}`}>
            <i className="ba-icon">{view === "before" ? "✕" : "✓"}</i>
            <span>{s}</span>
          </div>
        ))}
      </div>
      <div className="ba-panel-foot">
        <span>{view === "before" ? "5 точек трения" : "3 шага — клиент готов"}</span>
        {view === "after" && <span className="badge b-lime">эффект</span>}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// SCREEN 9 — FINAL: centered editorial CTA
// ════════════════════════════════════════════════════════════════════

function FinalCta({ entered }: Entered) {
  return (
    <div className="final-cta-box stagger">
      <a href="mailto:hello@notary-it.pro" className="final-cta-link">
        <span>hello@notary-it.pro</span>
        <span aria-hidden="true">↗</span>
      </a>
      <div className="final-cta-note">
        Расскажите, что сейчас происходит в конторе — предложим конкретное
        решение без обязательств.
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════════

export default function Home() {
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState<Set<number>>(new Set([0]));
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-screen]"));
    const obs = new IntersectionObserver(
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
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const goTo = useCallback((idx: number) => {
    pageRef.current
      ?.querySelector<HTMLElement>(`[data-screen="${idx}"]`)
      ?.scrollIntoView({ block: "start" });
  }, []);

  const total = 9;

  return (
    <main className="page" ref={pageRef} id="top">
      {/* ── Header ── */}
      <header className="masthead">
        <a className="brand" href="#promise" aria-label="Начало — проект Про нотариат">
          <span className="brand-mark" aria-hidden="true">
            <i>Н</i>
            <b />
          </span>
          <span className="brand-name">
            <strong>Про нотариат</strong>
            <small>цифровые проекты · notary-it.pro</small>
          </span>
        </a>
        <a className="cta-nav" href="#final">
          <span>Обсудить задачу</span>
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      {/* ── Nav rail ── */}
      <nav className="rail" aria-label="Навигация по экранам">
        <span className="rail-num" aria-hidden="true">{String(active + 1).padStart(2, "0")}</span>
        <div className="rail-dots">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              className={`rail-btn${active === i ? " on" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Экран ${i + 1}`}
              aria-current={active === i ? "step" : undefined}
            />
          ))}
        </div>
        <span className="rail-num" aria-hidden="true">{String(total).padStart(2, "0")}</span>
      </nav>

      {/* ── Progress ── */}
      <div className="progress" aria-hidden="true">
        {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* ════ SCREEN 1 — PROMISE ════ */}
      <section className="screen s-promise" id="promise" data-screen={0} data-in={entered.has(0) ? "" : undefined} aria-label="Обещание">
        <div className="copy">
          <p className="eyebrow">цифровые решения для нотариата</p>
          <h1 className="h-display">Работа конторы, которая не заставляет клиента ждать</h1>
          <p className="lead" style={{ marginTop: "32px" }}>
            Клиент знает, что взять и что сделать до визита. Контора получает
            подготовленного посетителя — не очередь вопросов.
          </p>
          <div className="result-tag" style={{ marginTop: "32px" }}>
            <span className="result-tag-lbl">Результат</span>
            <span className="result-tag-val">Меньше уточняющих звонков</span>
          </div>
        </div>
        <RouteMini entered={entered.has(0)} />
      </section>

      {/* ════ SCREEN 2 — FRICTION ════ */}
      <section className="screen s-friction on-dark" id="friction" data-screen={1} data-in={entered.has(1) ? "" : undefined} aria-label="Где контора теряет время">
        <div className="friction-head">
          <div className="copy">
            <p className="eyebrow">как устроен сегодняшний день</p>
            <h2 className="h-section">Звонки, уточнения, ожидание — рабочий день без системы</h2>
          </div>
          <div className="result-tag">
            <span className="result-tag-lbl">Знакомо?</span>
            <span className="result-tag-val">Каждой конторе</span>
          </div>
        </div>
        <CallBoard entered={entered.has(1)} />
      </section>

      {/* ════ SCREEN 3 — ROUTE ════ */}
      <section className="screen s-route" id="route" data-screen={2} data-in={entered.has(2) ? "" : undefined} aria-label="Маршрут клиента">
        <div className="route-top copy">
          <p className="eyebrow">маршрут клиента</p>
          <h2 className="h-section">Клиент выбирает задачу и сразу получает следующий шаг</h2>
          <p className="lead" style={{ marginTop: "24px" }}>
            Не форма обратной связи и не «перезвоним». Понятный список: что
            взять, что проверить, как добраться — всё до визита.
          </p>
        </div>
        <RoutePanel entered={entered.has(2)} />
      </section>

      {/* ════ SCREEN 4 — SITE ════ */}
      <section className="screen s-site" id="site" data-screen={3} data-in={entered.has(3) ? "" : undefined} aria-label="Сайт нотариуса">
        <div className="copy">
          <p className="eyebrow">быстрый запуск</p>
          <h2 className="h-section">Сайт нотариуса. Всё необходимое — уже на месте</h2>
          <p className="lead" style={{ marginTop: "24px" }}>
            Готовая структура с обязательной информацией, услугами, тарифами,
            контактами и записью. Адаптируем под контору за 7 дней.
          </p>
          <div className="result-tag" style={{ marginTop: "28px" }}>
            <span className="result-tag-lbl">Результат</span>
            <span className="result-tag-val">Простой сайт по требованиям — быстро</span>
          </div>
        </div>
        <BrowserMock entered={entered.has(3)} />
      </section>

      {/* ════ SCREEN 5 — BOOKING ════ */}
      <section className="screen s-booking on-dark" id="booking" data-screen={4} data-in={entered.has(4) ? "" : undefined} aria-label="Онлайн-запись">
        <div className="copy">
          <p className="eyebrow">онлайн-запись</p>
          <h2 className="h-section">Выбрал услугу, выбрал время — визит назначен</h2>
          <p className="lead" style={{ marginTop: "24px" }}>
            Не ждать звонка и не объяснять с нуля. Клиент сам проходит путь:
            услуга → свободное время → подтверждение.
          </p>
          <div className="result-tag" style={{ marginTop: "28px" }}>
            <span className="result-tag-lbl">Результат</span>
            <span className="result-tag-val">Запись работает до вашего ответа</span>
          </div>
        </div>
        <BookingPanel entered={entered.has(4)} />
      </section>

      {/* ════ SCREEN 6 — TELEGRAM ════ */}
      <section className="screen s-telegram" id="telegram" data-screen={5} data-in={entered.has(5) ? "" : undefined} aria-label="Telegram mini app">
        <div className="copy">
          <p className="eyebrow">сервис внутри telegram</p>
          <h2 className="h-section">Не отправляем на сайт. Открываем сервис прямо в диалоге</h2>
          <p className="lead" style={{ marginTop: "24px" }}>
            Мини-приложение в Telegram: запись, подготовка документов, статус
            обращения — в одном окне без переключений.
          </p>
          <div className="result-tag" style={{ marginTop: "28px" }}>
            <span className="result-tag-lbl">Результат</span>
            <span className="result-tag-val">Меньше переходов — больше завершённых действий</span>
          </div>
        </div>
        <TelegramFrame entered={entered.has(5)} />
      </section>

      {/* ════ SCREEN 7 — SEO ════ */}
      <section className="screen s-seo" id="seo" data-screen={6} data-in={entered.has(6) ? "" : undefined} aria-label="Поиск и доверие">
        <div className="copy">
          <p className="eyebrow">поиск и доверие</p>
          <h2 className="h-section">Не просто выше в поиске. Ближе к нужному действию</h2>
          <p className="lead" style={{ marginTop: "24px" }}>
            Страницы, которые отвечают на реальные нотариальные задачи. Человек
            ищет — находит ответ — понимает следующий шаг.
          </p>
          <div className="result-tag" style={{ marginTop: "28px" }}>
            <span className="result-tag-lbl">Результат</span>
            <span className="result-tag-val">Целевые обращения из поиска</span>
          </div>
        </div>
        <SearchResults entered={entered.has(6)} />
      </section>

      {/* ════ SCREEN 8 — AUTOMATION ════ */}
      <section className="screen s-automation on-dark" id="automation" data-screen={7} data-in={entered.has(7) ? "" : undefined} aria-label="Индивидуальная автоматизация">
        <div className="copy">
          <p className="eyebrow">индивидуальная автоматизация</p>
          <h2 className="h-section">Повторяемое действие становится системой</h2>
          <p className="lead" style={{ marginTop: "24px" }}>
            Разбираем конкретный процесс конторы, убираем лишние шаги и создаём
            решение вокруг существующей работы.
          </p>
          <div className="result-tag" style={{ marginTop: "28px" }}>
            <span className="result-tag-lbl">Результат</span>
            <span className="result-tag-val">Автоматизация по фактам, не по моде</span>
          </div>
        </div>
        <AutomationPanel entered={entered.has(7)} />
      </section>

      {/* ════ SCREEN 9 — FINAL ════ */}
      <section className="screen s-final on-dark" id="final" data-screen={8} data-in={entered.has(8) ? "" : undefined} aria-label="Обсудить задачу">
        <p className="eyebrow">следующий шаг</p>
        <h1 className="h-display">Обсудить задачу</h1>
        <p className="lead">
          Расскажите, что происходит в конторе сейчас. Предложим конкретное
          решение — без лишних слов и обязательств.
        </p>
        <FinalCta entered={entered.has(8)} />
      </section>
    </main>
  );
}
