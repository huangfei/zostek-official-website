import { FormEvent, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Circuitry,
  List,
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

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const viewport = { once: true, amount: 0.18 };

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="section-header"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <span className="section-rule" aria-hidden="true" />
      <h2>{title}</h2>
      <p>{description}</p>
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  const jumpTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, '', href);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <a className="brand" href="#hero" onClick={(event) => {
        event.preventDefault();
        jumpTo('#hero');
      }}>
        <span className="brand-mark">Z</span>
        <span>
          <strong>琢时科技</strong>
          <small>ZosTek</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="主导航">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(event) => {
              event.preventDefault();
              jumpTo(item.href);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="#contact" onClick={(event) => {
        event.preventDefault();
        jumpTo('#contact');
      }}>
        联系我们
      </a>

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
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                jumpTo(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const heroImage = `${import.meta.env.BASE_URL}assets/style3-chip-hero-real-qfn.png`;

  return (
    <section id="hero" className="hero-section">
      <div className="hero-shell">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 34 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1>
            <span>以极致芯片</span>
            <span>成就客户的</span>
            <span>每一个构想</span>
          </h1>
          <p>
            专注于射频与毫米波芯片设计，为系统厂商提供旗舰级定制化芯片与系统解决方案。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#technology">
              探索技术成果
              <ArrowRight size={18} weight="bold" />
            </a>
            <a className="secondary-button" href="#contact">
              联系我们
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-media"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97, x: 28 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.08 }}
        >
          <img src={heroImage} alt="射频与毫米波芯片电路视觉" />
          <div className="hero-chip-card">
            <Circuitry size={22} />
            <span>模块、芯片、整机协同优化</span>
          </div>
        </motion.div>

        <div className="hero-stats">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <SectionHeader
        title="共同定义芯片，而不是只交付器件"
        description="琢时科技始终锚定客户真实系统场景，从芯片定义、系统指标到量产质量，全链路参与关键价值创造。"
      />

      <div className="about-showcase">
        <motion.div
          className="mission-panel"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div>
            <span>愿景</span>
            <p>以极致定制芯片成就客户的每一个构想</p>
          </div>
          <div>
            <span>使命</span>
            <p>于纳米间雕刻万千独特，构筑万物智联的硅基文明</p>
          </div>
          <div>
            <span>核心定位</span>
            <p>为系统厂商提供旗舰级“定制化”芯片与系统解决方案开发，不做 Pin-to-Pin 芯片销售</p>
          </div>
        </motion.div>

        <div className="value-grid">
          {valuePillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                className="value-card"
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.06 }}
              >
                <span className="value-index">0{index + 1}</span>
                <Icon size={26} weight="duotone" />
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>

      <motion.div
        className="timeline-panel"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <h3>发展历程</h3>
        <ol>
          {timeline.map((item) => (
            <li key={item.year}>
              <time>{item.year}</time>
              <span>{item.event}</span>
            </li>
          ))}
        </ol>
      </motion.div>

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
  const [activeId, setActiveId] = useState(applications[0].id);
  const active = useMemo(
    () => applications.find((item) => item.id === activeId) ?? applications[0],
    [activeId],
  );
  const ActiveIcon = active.icon;

  return (
    <section id="applications" className="section applications-section">
      <SectionHeader
        title="六大应用领域"
        description="以射频与毫米波变频收发、相控阵芯片及时钟芯片为核心，进入卫星互联网、低空经济、通信、光互联、医疗和雷达感知场景。"
      />

      <div className="application-stage">
        <div className="application-visual">
          <motion.img
            key={active.id}
            src={active.image}
            alt={`${active.title}芯片应用场景`}
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
          <div className="signal-node node-a">{active.title}</div>
          <div className="signal-node node-b">{active.subtitle}</div>
        </div>

        <motion.article
          className="application-panel"
          key={active.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <ActiveIcon size={36} weight="duotone" />
          <span>{active.subtitle}</span>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <div className="application-metrics">
            <div>
              <small>市场规模</small>
              <strong>{active.market}</strong>
            </div>
            <div>
              <small>增长状态</small>
              <strong>{active.growth}</strong>
            </div>
          </div>
          <ul>
            {active.details.map((detail) => (
              <li key={detail}>
                <Check size={16} weight="bold" />
                {detail}
              </li>
            ))}
          </ul>
        </motion.article>
      </div>

      <div className="application-tabs" role="tablist" aria-label="应用领域">
        {applications.map((item) => {
          const Icon = item.icon;
          const selected = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={selected ? 'active' : ''}
              onClick={() => setActiveId(item.id)}
            >
              <Icon size={22} weight={selected ? 'duotone' : 'regular'} />
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Technology() {
  const [activeId, setActiveId] = useState(products[0].id);
  const active = useMemo(
    () => products.find((item) => item.id === activeId) ?? products[0],
    [activeId],
  );
  const ActiveIcon = active.icon;
  const heroImage = `${import.meta.env.BASE_URL}assets/style3-chip-hero-real-qfn.png`;

  return (
    <section id="technology" className="section technology-section">
      <SectionHeader
        title="技术成果"
        description="依托顶尖的模拟/射频芯片研发实力，打造兼具高性能与可量产性的定制化芯片。"
      />

      <div className="product-stage">
        <div className="product-visual">
          <img src={heroImage} alt="芯片产品视觉" />
          <div className="product-tabs" role="tablist" aria-label="核心技术产品">
            {products.map((product) => {
              const selected = product.id === activeId;
              return (
                <button
                  key={product.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={selected ? 'active' : ''}
                  onClick={() => setActiveId(product.id)}
                >
                  <strong>{product.title}</strong>
                  <small>{product.subtitle}</small>
                </button>
              );
            })}
          </div>
        </div>

        <motion.article
          className="product-detail"
          key={active.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="product-heading">
            <ActiveIcon size={36} weight="duotone" />
            <div>
              <h3>{active.title}</h3>
              <p>{active.subtitle}</p>
            </div>
          </div>
          <p className="product-description">{active.description}</p>
          <div className="spec-grid">
            {active.specs.map((spec) => (
              <div key={spec.label}>
                <small>{spec.label}</small>
                <strong>{spec.value}</strong>
              </div>
            ))}
          </div>
          <div className="highlight-line">{active.highlight}</div>
        </motion.article>
      </div>

      <div className="direction-grid">
        {technologyDirections.map((direction, index) => {
          const Icon = direction.icon;
          return (
            <motion.article
              className="direction-card"
              key={direction.title}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
            >
              <Icon size={26} weight="duotone" />
              <h3>{direction.title}</h3>
              <p>{direction.process}</p>
              <ul>
                {direction.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function News() {
  return (
    <section id="news" className="section news-section">
      <SectionHeader
        title="公司动态"
        description="围绕产业化、客户合作和核心芯片突破，持续推进射频与毫米波芯片落地。"
      />

      <div className="news-list">
        {newsItems.map((item, index) => (
          <motion.article
            className="news-row"
            key={item.title}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
          >
            <time>{item.date}</time>
            <span>{item.category}</span>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
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
    const form = event.currentTarget;
    setSent(true);
    window.setTimeout(() => {
      setSent(false);
      form.reset();
    }, 2600);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-grid">
        <div className="contact-copy">
          <h2>联系我们</h2>
          <p>期待与您的合作，共同定义芯片价值，构建技术护城河。</p>
          <div className="contact-cards">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <>
                  <Icon size={22} weight="duotone" />
                  <span>
                    <small>{card.label}</small>
                    <strong>{card.value}</strong>
                  </span>
                </>
              );
              return card.href ? (
                <a className="contact-card" href={card.href} key={card.label}>
                  {content}
                </a>
              ) : (
                <div className="contact-card" key={card.label}>
                  {content}
                </div>
              );
            })}
          </div>

          <div className="entry-grid">
            {contactEntryPoints.map((entry) => (
              <div key={entry.label}>
                <strong>{entry.label}</strong>
                <span>{entry.description}</span>
              </div>
            ))}
          </div>
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
            <textarea name="message" placeholder="请描述您的需求" required rows={5} />
          </label>
          <button className="primary-button" type="submit">
            {sent ? '消息已发送' : '发送消息'}
            {sent ? <Check size={18} weight="bold" /> : <ArrowRight size={18} weight="bold" />}
          </button>
          {sent ? <p className="success-text">我们会尽快与您联系</p> : null}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <a className="brand footer-brand" href="#hero">
          <span className="brand-mark">Z</span>
          <span>
            <strong>琢时科技</strong>
            <small>ZosTek Co., Ltd.</small>
          </span>
        </a>
        <p>以极致定制芯片成就客户的每一个构想。于纳米间雕刻万千独特，构筑万物智联的硅基文明。</p>
      </div>

      <div className="footer-links">
        <div>
          <strong>关于琢时</strong>
          <a href="#about">企业介绍</a>
          <a href="#about">发展历程</a>
          <a href="#about">核心团队</a>
          <a href="#about">资质证书</a>
        </div>
        <div>
          <strong>应用领域</strong>
          <a href="#applications">卫星互联网</a>
          <a href="#applications">低空经济</a>
          <a href="#applications">基站通信</a>
          <a href="#applications">光通信</a>
          <a href="#applications">医疗电子</a>
        </div>
        <div>
          <strong>技术成果</strong>
          <a href="#technology">卫通相控阵</a>
          <a href="#technology">雷达阵列</a>
          <a href="#technology">数据转换器</a>
          <a href="#technology">MEMS时钟</a>
        </div>
        <div>
          <strong>联系我们</strong>
          <a href="#contact">客户支持</a>
          <a href="#contact">招聘信息</a>
          <a href="#contact">联系方式</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 琢时科技（苏州）有限公司 ZosTek Co., Ltd. All rights reserved.</span>
        <span>隐私政策 · 使用条款</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Applications />
        <Technology />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
