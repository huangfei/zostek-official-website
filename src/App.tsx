import { FormEvent, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Broadcast,
  CaretDown,
  Check,
  Circuitry,
  List,
  PaperPlaneTilt,
  WaveSine,
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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const viewport = { once: true, amount: 0.18 };

const navChildren: Record<string, string[]> = {
  关于琢时: ['企业介绍', '发展历程', '核心定位'],
  应用领域: ['卫星互联网', '低空经济', '基站通信', '光通信', '医疗电子'],
  联系我们: ['客户支持', '招聘信息', '联系方式'],
};

function jumpTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  window.history.pushState(null, '', href);
}

function SectionIntro({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
}) {
  return (
    <motion.div
      className={`section-intro ${align}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  const onJump = (href: string) => {
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
      >
        <span className="brand-mark">Z</span>
        <span>
          <strong>琢时科技</strong>
          <small>ZosTek</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="主导航">
        {navItems.map((item) => {
          const children = navChildren[item.label];
          return (
            <div className="nav-item" key={item.href}>
              <a
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  onJump(item.href);
                }}
              >
                {item.label}
                {children ? <CaretDown size={13} weight="bold" /> : null}
              </a>
              {children ? (
                <div className="nav-popover">
                  {children.map((child) => (
                    <button key={child} type="button" onClick={() => onJump(item.href)}>
                      {child}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <a
        className="header-cta"
        href="#contact"
        onClick={(event) => {
          event.preventDefault();
          onJump('#contact');
        }}
      >
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
            <button key={item.href} type="button" onClick={() => onJump(item.href)}>
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </header>
  );
}

function IconTile({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={`icon-tile ${className}`.trim()}>{children}</span>;
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const statIcons = [Broadcast, WaveSine, Circuitry];

  return (
    <section id="hero" className="hero-section">
      <div className="circuit-lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <motion.div
        className="hero-copy"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="hero-chip">
          <Circuitry size={16} weight="bold" />
          射频与毫米波芯片设计专家
        </div>
        <h1>以极致芯片成就客户的每一个构想</h1>
        <p>专注于射频与毫米波芯片设计，为系统厂商提供旗舰级定制化芯片与系统解决方案。</p>
        <div className="hero-actions">
          <a className="primary-button" href="#technology">
            探索更多
            <ArrowRight size={18} weight="bold" />
          </a>
          <a className="secondary-button" href="#contact">
            联系我们
          </a>
        </div>
      </motion.div>

      <motion.div
        className="hero-stats"
        initial={reduceMotion ? false : 'hidden'}
        animate={reduceMotion ? undefined : 'visible'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
        }}
      >
        {heroStats.map((stat, index) => {
          const StatIcon = statIcons[index] ?? Circuitry;
          return (
            <motion.div className="stat-item" key={stat.label} variants={fadeUp}>
              <IconTile className="hero-stat-icon">
                <StatIcon size={23} weight="bold" />
            </IconTile>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="about-stack">
        <div className="about-content">
          <SectionIntro
            eyebrow="ABOUT US"
            title="与客户共同定义价值"
            description="琢时科技始终锚定前沿技术赛道，深入客户真实使用场景与用户深度共创，依托顶尖的模拟/射频芯片研发实力，为客户量身打造兼具高性能与可量产性的定制化芯片。"
            align="left"
          />

          <div className="pillar-list">
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
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
                >
                  <IconTile>
                    <Icon size={18} weight="bold" />
                  </IconTile>
                  <div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                    <small>{pillar.detail}</small>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mission-stack">
            <article>
              <span>愿景</span>
              <p>以极致定制芯片成就客户的每一个构想</p>
            </article>
            <article>
              <span>使命</span>
              <p>于纳米间雕刻万千独特，构筑万物智联的硅基文明</p>
            </article>
            <article>
              <span>核心定位</span>
              <p>为系统厂商提供旗舰级“定制化”芯片与系统解决方案开发，不做 Pin-to-Pin 芯片销售</p>
            </article>
          </div>
        </div>

        <motion.aside
          className="timeline-panel"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
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
        </motion.aside>
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
  const [activeId, setActiveId] = useState(applications[0].id);
  const active = useMemo(
    () => applications.find((item) => item.id === activeId) ?? applications[0],
    [activeId],
  );
  const ActiveIcon = active.icon;

  return (
    <section id="applications" className="section applications-section">
      <SectionIntro
        eyebrow="APPLICATIONS"
        title="应用领域"
        description="六大应用领域覆盖卫星互联网、低空经济、基站通信、光通信、医疗电子与雷达感知。"
        align="left"
      />

      <div className="application-stage">
        <motion.article
          className="application-feature"
          key={active.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: 'easeOut' }}
        >
          <div className="application-image">
            <img src={active.image} alt={`${active.title}应用场景`} />
            <div>
              <ActiveIcon size={34} weight="bold" />
              <span>{active.subtitle}</span>
              <h3>{active.title}</h3>
            </div>
          </div>
          <div className="application-copy">
            <div className="metric-pills">
              <span>市场规模: {active.market}</span>
              <span>{active.growth}</span>
            </div>
            <p>{active.description}</p>
            <strong>核心产品</strong>
            <ul>
              {active.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </motion.article>

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
                <Icon size={22} weight={selected ? 'fill' : 'regular'} />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </span>
              </button>
            );
          })}
        </div>
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

  return (
    <section id="technology" className="section technology-section">
      <SectionIntro
        eyebrow="TECHNOLOGY"
        title="核心技术产品"
        description="依托顶尖的模拟/射频芯片研发实力，打造兼具高性能与可量产性的定制化芯片。"
      />

      <div className="tech-lab">
        <div className="product-tabs" role="tablist" aria-label="核心技术产品">
          {products.map((product) => {
            const Icon = product.icon;
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
                <Icon size={20} weight={selected ? 'fill' : 'regular'} />
                <span>
                  <strong>{product.title}</strong>
                  <small>{product.subtitle}</small>
                </span>
                <ArrowRight size={18} weight="bold" />
              </button>
            );
          })}
        </div>

        <motion.article
          className="product-panel"
          key={active.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: 'easeOut' }}
        >
          <div className="product-heading">
            <IconTile>
              <ActiveIcon size={22} weight="bold" />
            </IconTile>
            <div>
              <h3>{active.title}</h3>
              <p>{active.subtitle}</p>
            </div>
            <span>{active.highlight}</span>
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
        </motion.article>
      </div>

      <div className="direction-section">
        <h3>五大技术方向</h3>
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
                transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.04 }}
              >
                <IconTile>
                  <Icon size={18} weight="bold" />
                </IconTile>
                <h4>{direction.title}</h4>
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
      </div>
    </section>
  );
}

function News() {
  const [featured, ...rest] = newsItems;

  return (
    <section id="news" className="section news-section">
      <div className="news-heading">
        <SectionIntro
          eyebrow="NEWS & UPDATES"
          title="公司动态"
          description="围绕产业化、客户合作和核心芯片突破，持续推进射频与毫米波芯片落地。"
          align="left"
        />
        <a href="#contact">
          查看全部动态
          <ArrowRight size={18} weight="bold" />
        </a>
      </div>

      <div className="news-grid">
        <motion.article
          className="featured-news"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <time>{featured.date}</time>
          <span>{featured.category}</span>
          <h3>{featured.title}</h3>
          <p>{featured.summary}</p>
          <a href="#contact">
            阅读更多
            <ArrowRight size={17} weight="bold" />
          </a>
        </motion.article>

        <div className="news-list">
          {rest.map((item, index) => (
            <motion.article
              className="news-row"
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
              transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.05 }}
            >
              <div>
                <span>{item.category}</span>
                <time>{item.date}</time>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </motion.article>
          ))}
        </div>
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
      <SectionIntro
        eyebrow="CONTACT US"
        title="联系我们"
        description="期待与您的合作，共同定义芯片价值，构建技术护城河。"
      />

      <div className="contact-grid">
        <form className="contact-form" onSubmit={onSubmit}>
          <h3>发送消息</h3>
          <div className="form-row">
            <label>
              姓名
              <input name="name" type="text" placeholder="您的姓名" required />
            </label>
            <label>
              邮箱
              <input name="email" type="email" placeholder="your@email.com" required />
            </label>
          </div>
          <label>
            留言
            <textarea name="message" placeholder="请描述您的需求" required rows={6} />
          </label>
          <button className="primary-button" type="submit">
            {sent ? '消息已发送' : '发送消息'}
            {sent ? <Check size={18} weight="bold" /> : <PaperPlaneTilt size={18} weight="bold" />}
          </button>
          {sent ? <p className="success-text">我们会尽快与您联系</p> : null}
        </form>

        <div className="contact-side">
          <div className="contact-card-list">
            <h3>联系方式</h3>
            {contactCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <>
                  <IconTile>
                    <Icon size={18} weight="bold" />
                  </IconTile>
                  <span>
                    <small>{card.label}</small>
                    <strong>{card.value}</strong>
                  </span>
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

          <div className="quick-links">
            <h3>快速链接</h3>
            {contactEntryPoints.map((entry) => (
              <a href="#contact" key={entry.label}>
                <strong>{entry.label}</strong>
                <span>{entry.description}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <a className="brand footer-brand" href="#hero">
          <span className="brand-mark inverse">Z</span>
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
