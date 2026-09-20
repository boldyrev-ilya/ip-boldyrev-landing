"use client";

import { useEffect, useRef, useState } from "react";

// ════════════════════════════════════════════════════════════════════
// Animated counter — counts up when scrolled into view
// ════════════════════════════════════════════════════════════════════

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setVal(target); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return val;
}

function Counter({
  value,
  suffix,
  prefix,
  label,
  sub,
  run,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
  run: boolean;
}) {
  const n = useCountUp(value, run);
  return (
    <div className="stat-card fade-in">
      <div className="stat-num">
        {prefix}
        {n.toLocaleString("ru-RU")}
        {suffix && <span className="stat-suffix">{suffix}</span>}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// Main About page
// ════════════════════════════════════════════════════════════════════

export default function AboutPage() {
  const [run, setRun] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <main className="about-page" ref={statsRef}>
      {/* ── Header ── */}
      <header className="masthead">
        <a className="brand" href="/" aria-label="На главную">
          <span className="brand-mark" aria-hidden="true">
            <i>Н</i>
            <b />
          </span>
          <span className="brand-name">
            <strong>Про нотариат</strong>
            <small>цифровые проекты · notary-it.pro</small>
          </span>
        </a>
        <a className="cta-nav" href="/#final">
          <span>Обсудить задачу</span>
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      {/* ── Hero ── */}
      <section className="about-hero" data-in="">
        <p className="eyebrow">о проекте</p>
        <h1 className="h-display">
          Цифровая практика для нотариальных контор
        </h1>
        <p className="lead">
          Проектируем понятные сценарии: от первого вопроса клиента до
          подготовленного визита. Не продаём услуги — показываем, как
          конкретные инструменты меняют рабочий день конторы.
        </p>
      </section>

      {/* ── Stats grid ── */}
      <section className="about-stats" data-in="" aria-label="Цифры проекта">
        <div className="stats-grid">
          <Counter value={9} label="проектов в работе" sub="от сайта до мини-приложения" run={run} />
          <Counter value={37} suffix="%" label="рост видимости" sub="целевые страницы в поиске" run={run} />
          <Counter value={7} label="дней до запуска" sub="от материалов до готового сайта" run={run} />
          <Counter value={24} suffix="/7" label="первая линия ответа" sub="чат-бот и онлайн-запись" run={run} />
          <Counter value={89} label="регионов" sub="в структуре поиска нотариусов" run={run} />
          <Counter value={320} suffix="+" label="клиентов прошли маршрут" sub="пришли подготовленными" run={run} />
        </div>
      </section>

      {/* ── What we do ── */}
      <section className="about-section" data-in="">
        <div className="about-cols">
          <div>
            <p className="eyebrow">подход</p>
            <h2 className="h-section">Сначала диагностика — затем технология</h2>
          </div>
          <div>
            <p className="lead">
              Разбираем конкретный процесс конторы, находим лишние шаги и
              создаём решение вокруг существующей работы. Не предлагаем
              «волшебную кнопку» — показываем, что изменится у человека и в
              конторе.
            </p>
            <div className="approach-list">
              <div className="approach-item">
                <span className="approach-num">01</span>
                <div>
                  <div className="approach-t">Смотрим на рабочий день</div>
                  <div className="approach-d">Где контора теряет время — звонки, уточнения, ожидание.</div>
                </div>
              </div>
              <div className="approach-item">
                <span className="approach-num">02</span>
                <div>
                  <div className="approach-t">Проектируем маршрут</div>
                  <div className="approach-d">Клиент выбирает задачу, получает список, записывается.</div>
                </div>
              </div>
              <div className="approach-item">
                <span className="approach-num">03</span>
                <div>
                  <div className="approach-t">Внедряем и поддерживаем</div>
                  <div className="approach-d">Сайт, запись, Telegram, поиск — работающие инструменты, не пилот.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section className="about-section about-tools" data-in="">
        <p className="eyebrow">инструменты</p>
        <h2 className="h-section">Что именно делаем</h2>
        <div className="tools-grid">
          {[
            { t: "Сайты нотариусов", d: "Структура по требованиям, тарифы, контакты, запись." },
            { t: "Онлайн-запись", d: "Выбор услуги, времени, подтверждение без звонка." },
            { t: "Telegram mini app", d: "Сервис внутри привычного диалога — без переходов." },
            { t: "Поисковое продвижение", d: "Страницы вокруг реальных задач, не вокруг терминов." },
            { t: "Чат-боты", d: "Типовой вопрос получает ответ без очереди." },
            { t: "Индивидуальная автоматизация", d: "Повторяемое действие становится системой." },
          ].map((tool) => (
            <div key={tool.t} className="tool-card">
              <div className="tool-t">{tool.t}</div>
              <div className="tool-d">{tool.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta on-dark" data-in="">
        <p className="eyebrow">следующий шаг</p>
        <h2 className="h-section">Расскажите, что происходит в конторе сейчас</h2>
        <p className="lead" style={{ marginTop: "24px" }}>
          Предложим конкретное решение — без лишних слов и обязательств.
        </p>
        <a href="mailto:hello@notary-it.pro" className="about-cta-btn">
          hello@notary-it.pro <span aria-hidden="true">↗</span>
        </a>
        <a href="/" className="about-back">← Вернуться на главную</a>
      </section>
    </main>
  );
}
