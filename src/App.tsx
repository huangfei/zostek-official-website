import { FormEvent, useEffect, useState } from 'react';
import type { Icon } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Broadcast,
  CheckCircle,
  Circuitry,
  FileText,
  List,
  Medal,
  PaperPlaneTilt,
  ShieldCheck,
  X,
} from '@phosphor-icons/react';
import {
  applications,
  contactCards,
  contactEntryPoints,
  heroStats,
  navItems,
  newsItems,
  products,
  proofStats,
  technologyDirections,
  timeline,
  valuePillars,
} from './data';

const assetPath = (fileName: string) => `${import.meta.env.BASE_URL}assets/${fileName}`;

const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

const viewport = { once: true, amount: 0.16 };

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const footerColumns = [
  {
    title: '关于琢时',
    links: [
      { label: '企业介绍', href: '#about' },
      { label: '发展历程', href: '#about' },
      { label: '核心团队', href: '#about' },
      { label: '资质证书', href: '#about' },
    ],
  },
  {
    title: '应用领域',
    links: [
      { label: '卫星互联网', href: '#applications' },
      { label: '低空经济', href: '#applications' },
      { label: '基站通信', href: '#applications' },
      { label: '光通信', href: '#applications' },
      { label: '医疗电子', href: '#applications' },
    ],
  },
  {
    title: '技术成果',
    links: [
      { label: '卫通相控阵', href: '#technology' },
      { label: '雷达阵列', href: '#technology' },
      { label: '数据转换器', href: '#technology' },
    ],
  },
  {
    title: '联系我们',
    links: [
      { label: '客户支持', href: '#contact' },
      { label: '招聘信息', href: '#contact' },
      { label: '联系方式', href: '#contact' },
    ],
  },
  {
    title: '合规链接',
    links: [
      { label: '隐私政策', href: '#' },
      { label: '使用条款', href: '#' },
    ],
  },
];

function jumpTo(href: string) {
  if (href === '#') {
    return;
  }
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  window.history.pushState(null, '', href);
}

function FrequencyBackground() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const variables = [
      '--signal-x',
      '--signal-y',
      '--signal-speed',
      '--signal-rate',
      '--signal-sweep-rate',
      '--signal-mesh-size',
      '--signal-glow',
      '--signal-glow-size',
      '--signal-wave-opacity',
      '--signal-ring-opacity',
      '--signal-grid-opacity',
      '--signal-scale',
      '--signal-angle',
      '--signal-pan-x',
      '--signal-pan-y',
    ];

    if (reduceMotion) {
      root.style.setProperty('--signal-speed', '0');
      root.style.setProperty('--signal-rate', '28s');
      root.style.setProperty('--signal-sweep-rate', '22s');

      return () => {
        variables.forEach((variable) => root.style.removeProperty(variable));
      };
    }

    let width = Math.max(window.innerWidth, 1);
    let height = Math.max(window.innerHeight, 1);
    let lastX: number | null = null;
    let lastY: number | null = null;
    let lastTime = performance.now();
    let rafId = 0;

    const state = {
      x: width * 0.72,
      y: height * 0.18,
      speed: 0,
      targetSpeed: 0,
    };

    const updateSize = () => {
      width = Math.max(window.innerWidth, 1);
      height = Math.max(window.innerHeight, 1);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const now = performance.now();
      if (lastX !== null && lastY !== null) {
        const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
        const seconds = Math.max((now - lastTime) / 1000, 0.016);
        state.targetSpeed = Math.max(state.targetSpeed, clamp(distance / seconds / 2200, 0, 1));
      }

      state.x = event.clientX;
      state.y = event.clientY;
      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
    };

    const tick = () => {
      state.speed += (state.targetSpeed - state.speed) * 0.16;
      state.targetSpeed *= 0.91;

      const signal = clamp(state.speed, 0, 1);
      const x = clamp((state.x / width) * 100, 0, 100);
      const y = clamp((state.y / height) * 100, 0, 100);

      root.style.setProperty('--signal-x', `${x.toFixed(2)}%`);
      root.style.setProperty('--signal-y', `${y.toFixed(2)}%`);
      root.style.setProperty('--signal-speed', signal.toFixed(3));
      root.style.setProperty('--signal-rate', `${(20 - signal * 14).toFixed(2)}s`);
      root.style.setProperty('--signal-sweep-rate', `${(13 - signal * 8).toFixed(2)}s`);
      root.style.setProperty('--signal-mesh-size', `${(66 - signal * 20).toFixed(2)}px`);
      root.style.setProperty('--signal-glow', (0.08 + signal * 0.17).toFixed(3));
      root.style.setProperty('--signal-glow-size', `${(26 + signal * 18).toFixed(2)}%`);
      root.style.setProperty('--signal-wave-opacity', (0.18 + signal * 0.32).toFixed(3));
      root.style.setProperty('--signal-ring-opacity', (0.2 + signal * 0.34).toFixed(3));
      root.style.setProperty('--signal-grid-opacity', (0.58 + signal * 0.24).toFixed(3));
      root.style.setProperty('--signal-scale', (1 + signal * 0.06).toFixed(4));
      root.style.setProperty('--signal-angle', `${(x * 1.8 + y * 0.7).toFixed(2)}deg`);
      root.style.setProperty('--signal-pan-x', `${((x - 50) * 0.11).toFixed(2)}px`);
      root.style.setProperty('--signal-pan-y', `${((y - 50) * 0.11).toFixed(2)}px`);

      rafId = window.requestAnimationFrame(tick);
    };

    updateSize();
    tick();
    window.addEventListener('resize', updateSize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('pointermove', handlePointerMove);
      variables.forEach((variable) => root.style.removeProperty(variable));
    };
  }, [reduceMotion]);

  return (
    <div className="frequency-background" aria-hidden="true">
      <div className="frequency-background__mesh" />
      <div className="frequency-background__wave frequency-background__wave--wide" />
      <div className="frequency-background__wave frequency-background__wave--tight" />
    </div>
  );
}

function SectionHeading({
  title,
  eyebrow,
  action,
}: {
  title: string;
  eyebrow: string;
  action?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        <span>{eyebrow}</span>
      </div>
      {action ? (
        <a href={action.includes('产品') ? '#technology' : '#applications'} className="section-action">
          {action}
          <ArrowRight size={15} weight="bold" />
        </a>
      ) : null}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#hero');

  useEffect(() => {
    const updateActiveHref = () => {
      const isAtPageEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      if (isAtPageEnd) {
        setActiveHref('#contact');
        return;
      }

      const current = navItems.reduce((active, item) => {
        const section = document.querySelector(item.href);
        if (!section) {
          return active;
        }
        return section.getBoundingClientRect().top <= 120 ? item.href : active;
      }, '#hero');
      setActiveHref(current);
    };

    updateActiveHref();
    window.addEventListener('scroll', updateActiveHref, { passive: true });
    window.addEventListener('hashchange', updateActiveHref);

    return () => {
      window.removeEventListener('scroll', updateActiveHref);
      window.removeEventListener('hashchange', updateActiveHref);
    };
  }, []);

  const onJump = (href: string) => {
    setActiveHref(href);
    jumpTo(href);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <a
        className="brand"
        href="#hero"
        onClick={(event) => {
          event.preventDefault();
          onJump('#hero');
        }}
        aria-label="琢时科技 ZosTek 首页"
      >
        <img src={assetPath('logo-zostek.png')} alt="ZosTek" />
        <span>琢时科技 / ZosTek</span>
      </a>

      <nav className="desktop-nav" aria-label="主导航">
        {navItems.map((item) => (
          <a
            key={item.href}
            className={activeHref === item.href ? 'active' : ''}
            href={item.href}
            onClick={(event) => {
              event.preventDefault();
              onJump(item.href);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? '关闭导航' : '打开导航'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} /> : <List size={22} />}
      </button>

      {open ? (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <button key={item.href} type="button" onClick={() => onJump(item.href)}>
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </header>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="blueprint-grid" />
      <div className="wave-rings">
        <span />
        <span />
        <span />
        <span />
      </div>
      <span className="hero-label label-one">mmWave 60GHz+</span>
      <span className="hero-label label-two">Phase Array</span>
      <img src={assetPath('hero-z-wafer.png')} alt="" />
    </div>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const statIcons = [Medal, FileText, ShieldCheck];

  return (
    <section id="hero" className="hero-section">
      <div className="hero-shell">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="hero-kicker">射频与毫米波芯片设计专家</p>
          <h1>
            <span>以极致芯片成就</span>
            <span>客户的每一个构想</span>
          </h1>
          <p className="hero-subtitle">
            专注于射频与毫米波芯片设计，为系统厂商提供旗舰级定制化芯片与系统解决方案
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#applications">
              探索更多
              <ArrowRight size={17} weight="bold" />
            </a>
            <a className="secondary-button" href="#contact">
              联系我们
              <ArrowRight size={17} weight="bold" />
            </a>
          </div>
          <div className="hero-stats">
            {heroStats.map((stat, index) => {
              const StatIcon = statIcons[index] ?? Medal;
              return (
                <div className="hero-stat" key={stat.label}>
                  <StatIcon size={28} weight="duotone" />
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          className="hero-art"
          initial={reduceMotion ? false : { opacity: 0, x: 30 }}
          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <SectionHeading title="关于琢时" eyebrow="ABOUT ZOSTEK" />
      <div className="about-grid">
        <motion.div
          className="about-mission"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <article>
            <CheckCircle size={22} weight="duotone" />
            <div>
              <h3>愿景</h3>
              <p>以极致定制芯片成就客户的每一个构想</p>
            </div>
          </article>
          <article>
            <Circuitry size={22} weight="duotone" />
            <div>
              <h3>使命</h3>
              <p>于纳米间雕刻万千独特，构筑万物智联的硅基文明</p>
            </div>
          </article>
          <article>
            <ShieldCheck size={22} weight="duotone" />
            <div>
              <h3>核心定位</h3>
              <p>为系统厂商提供旗舰级“定制化”芯片与系统解决方案开发，不做 Pin-to-Pin 芯片销售</p>
            </div>
          </article>
        </motion.div>

        <div className="pillar-grid">
          {valuePillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                className="pillar-card"
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                transition={{ duration: 0.48, ease: 'easeOut', delay: index * 0.05 }}
              >
                <Icon size={34} weight="duotone" />
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>

      <div className="timeline">
        {timeline.map((item) => (
          <article key={item.year}>
            <time>{item.year}</time>
            <p>{item.event}</p>
          </article>
        ))}
      </div>

      <div className="proof-strip">
        {proofStats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Applications() {
  return (
    <section id="applications" className="section applications-section">
      <SectionHeading title="应用领域" eyebrow="APPLICATION AREAS" action="探索更多应用场景" />
      <div className="application-grid">
        {applications.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              className="application-card"
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
              transition={{ duration: 0.46, ease: 'easeOut', delay: index * 0.035 }}
            >
              <Icon size={32} weight="duotone" />
              <h3>{item.title}</h3>
              <span>{item.subtitle}</span>
              <p>{item.description}</p>
              <strong>产品/方案</strong>
              <ul>
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="card-metrics">
                <span>市场规模 {item.market}</span>
                <span>{item.growth}</span>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function ChipVisual({ image }: { image: string }) {
  return (
    <div className="chip-visual">
      <img className="chip-image" src={image} alt="" loading="lazy" />
    </div>
  );
}

function Products() {
  return (
    <section id="technology" className="section technology-section">
      <SectionHeading title="技术成果" eyebrow="PRODUCTS & TECHNOLOGY" action="查看全部产品" />
      <div className="product-grid">
        {products.map((product, index) => (
          <motion.article
            className="product-card"
            key={product.id}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={{ duration: 0.46, ease: 'easeOut', delay: index * 0.04 }}
          >
            <ChipVisual image={product.image} />
            <div className="product-title-row">
              <span className="product-icon" aria-hidden="true">
                <product.icon size={21} weight="duotone" />
              </span>
              <div className="product-heading-copy">
                <h3>{product.title}</h3>
                <span className="product-subtitle">{product.subtitle}</span>
              </div>
            </div>
            <ul>
              {product.specs.map((spec) => (
                <li key={spec.label}>
                  {spec.label} <strong>{spec.value}</strong>
                </li>
              ))}
            </ul>
            <p>{product.description}</p>
            <a href="#contact">亮点：{product.highlight}</a>
          </motion.article>
        ))}
      </div>

      <div className="direction-grid">
        {technologyDirections.map((direction) => {
          const Icon = direction.icon;
          return (
            <article className="direction-card" key={direction.title}>
              <div className="direction-media">
                <img src={direction.image} alt="" loading="lazy" />
              </div>
              <div className="direction-copy">
                <div className="direction-heading">
                  <span className="direction-label" aria-hidden="true">
                    <Icon size={20} weight="duotone" />
                  </span>
                  <h3>{direction.title}</h3>
                </div>
                <p>{direction.process}</p>
                <span>{direction.items.join('、')}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function News() {
  return (
    <section id="news" className="section news-section">
      <SectionHeading title="公司动态" eyebrow="NEWS" action="查看更多动态" />
      <div className="news-grid">
        {newsItems.map((item, index) => (
          <motion.article
            className="news-card"
            key={item.title}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={{ duration: 0.46, ease: 'easeOut', delay: index * 0.04 }}
          >
            <div>
              <time>{item.date}</time>
              <span>{item.category}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <a href="#news">
              阅读更多
              <ArrowRight size={14} weight="bold" />
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="contact-section">
      <div
        className="contact-bg"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(90deg, rgb(246 250 255 / 0.12), rgb(246 250 255 / 0.88)), url(${assetPath('base-station.jpg')})`,
        }}
      />
      <div className="contact-layout">
        <div className="contact-info">
          <h2>联系我们</h2>
          <span>CONTACT US</span>
          {contactCards.map((card) => {
            const Icon = card.icon;
            const content = (
              <>
                <Icon size={28} weight="duotone" />
                <div>
                  <small>{card.label}</small>
                  <strong>{card.value}</strong>
                </div>
              </>
            );
            return card.href ? (
              <a className="contact-method" href={card.href} key={card.label}>
                {content}
              </a>
            ) : (
              <div className="contact-method" key={card.label}>
                {content}
              </div>
            );
          })}
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <label>
            姓名
            <input name="name" type="text" placeholder="您的姓名" required />
          </label>
          <label>
            邮箱
            <input name="email" type="email" placeholder="your@email.com" required />
          </label>
          <label>
            留言
            <textarea name="message" placeholder="请描述您的需求" rows={5} required />
          </label>
          <button className="primary-button" type="submit">
            {sent ? '消息已发送' : '发送消息'}
            {sent ? <CheckCircle size={18} weight="bold" /> : <PaperPlaneTilt size={18} weight="bold" />}
          </button>
          {sent ? <p className="success-text">消息已发送，我们会尽快与您联系。</p> : null}
        </form>

        <div className="quick-contact">
          <h3>快速联系</h3>
          {contactEntryPoints.map((entry) => (
            <a href="#contact" key={entry.label}>
              <Broadcast size={25} weight="duotone" />
              <span>
                <strong>{entry.label}</strong>
                <small>{entry.description}</small>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand-block">
        <a className="footer-logo" href="#hero" aria-label="返回首页">
          <img src={assetPath('logo-zostek.png')} alt="ZosTek" />
        </a>
        <p>以极致定制芯片成就客户的每一个构想。于纳米间雕刻万千独特，构筑万物智联的硅基文明。</p>
      </div>
      <div className="footer-columns">
        {footerColumns.map((column) => (
          <div key={column.title}>
            <strong>{column.title}</strong>
            {column.links.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2025 琢时科技（苏州）有限公司 ZosTek Co., Ltd. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <FrequencyBackground />
      <Header />
      <main>
        <Hero />
        <About />
        <Applications />
        <Products />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
