import type { Icon } from '@phosphor-icons/react';
import {
  AirplaneTilt,
  Broadcast,
  CellSignalFull,
  Cpu,
  EnvelopeSimple,
  Gauge,
  GlobeHemisphereWest,
  Graph,
  Heartbeat,
  Lightning,
  MapPin,
  Phone,
  Pulse,
  Radio,
  ShareNetwork,
  ShieldCheck,
  Sparkle,
  WaveSine,
} from '@phosphor-icons/react';

export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type ValuePillar = {
  title: string;
  description: string;
  detail: string;
  icon: Icon;
};

export type TimelineItem = {
  year: string;
  event: string;
};

export type ApplicationArea = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  image: string;
  market: string;
  growth: string;
  icon: Icon;
};

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  specs: { label: string; value: string }[];
  description: string;
  highlight: string;
  icon: Icon;
};

export type TechnologyDirection = {
  title: string;
  process: string;
  items: string[];
  image: string;
  icon: Icon;
};

export type NewsItem = {
  date: string;
  category: string;
  title: string;
  summary: string;
};

const assetPath = (fileName: string) => `${import.meta.env.BASE_URL}assets/${fileName}`;

export const navItems: NavItem[] = [
  { label: '首页', href: '#hero' },
  { label: '关于琢时', href: '#about' },
  { label: '应用领域', href: '#applications' },
  { label: '技术成果', href: '#technology' },
  { label: '公司动态', href: '#news' },
  { label: '联系我们', href: '#contact' },
];

export const heroStats: Stat[] = [
  { value: '16+', label: '年研发经验' },
  { value: '90+', label: '顶刊论文' },
  { value: '25+', label: '授权专利' },
];

export const proofStats: Stat[] = [
  { value: '16+', label: '年研发经验' },
  { value: '90+', label: '顶刊论文' },
  { value: '25+', label: '授权专利' },
  { value: '6+', label: '大应用领域' },
  { value: '300万+', label: '芯片累计销售' },
  { value: '195亿美元', label: '2029年可触达市场' },
  { value: '11%', label: '年复合增长率' },
];

export const valuePillars: ValuePillar[] = [
  {
    title: '与客户共同定义芯片',
    description:
      '针对系统厂商应用场景，配合需求进行核心芯片指标定义，满足细分领域极致需求，形成系统的差异化优势。',
    detail:
      '我们深入理解客户应用场景，从芯片定义阶段就与客户紧密合作，确保最终产品完美匹配客户需求。',
    icon: ShareNetwork,
  },
  {
    title: '对系统应用指标负责',
    description:
      '运用自身芯片设计经验，针对客户应用需求，从模块、芯片、整机三个维度配合客户提升产品指标。',
    detail:
      '从射频前端到数字基带，从芯片设计到系统集成，全流程参与，确保系统指标达到最优。',
    icon: Gauge,
  },
  {
    title: '对客户产品质量负责',
    description:
      '以量产芯片交付为目标，从设计和生产角度保证客户芯片良率，提升客户产品质量，降低系统成本。',
    detail:
      '严格的质量控制体系，从设计验证到量产测试，确保每颗芯片都符合高质量标准。',
    icon: ShieldCheck,
  },
];

export const timeline: TimelineItem[] = [
  { year: '2021', event: '核心团队组建，启动射频/毫米波芯片技术产业化工作' },
  { year: '2022', event: '首款卫通相控阵芯片研发成功；W波段雷达阵列芯片完成开发' },
  { year: '2023', event: 'Ka多通道相控阵芯片完成开发' },
  { year: '2024', event: '主体公司成立；自有产品矩阵规划落地，多款芯片进入样品阶段' },
  { year: '2025', event: '完成天使轮融资；合作案例覆盖6大领域' },
];

export const applications: ApplicationArea[] = [
  {
    id: 'satellite',
    title: '卫星互联网',
    subtitle: 'Satellite Internet',
    description:
      '面向低轨卫星组网、Ka/Ku 波段相控阵芯片需求，为星载/地面射频单元提供高性能芯片解决方案。',
    details: ['Ka波段多通道相控阵芯片', 'Ku波段变频收发芯片', '星载导航射频单元', '地面站信号处理'],
    image: assetPath('app-satellite-flagship.jpg'),
    market: '30亿美元',
    growth: '高速增长',
    icon: GlobeHemisphereWest,
  },
  {
    id: 'low-altitude',
    title: '低空经济',
    subtitle: 'Low Altitude Economy',
    description:
      '面向低空经济、变频收发机、相控阵规模化应用，以及无人机通感一体场景。',
    details: ['无人机图传芯片', '通感一体射频方案', '避障雷达系统', '智能物流网络'],
    image: assetPath('app-low-altitude-flagship.jpg'),
    market: '25亿美元',
    growth: '爆发增长',
    icon: AirplaneTilt,
  },
  {
    id: 'base-station',
    title: '基站通信',
    subtitle: 'Base Station Communication',
    description:
      '面向 5G/6G 建设中的时钟发生、同步、分发芯片需求，为基站系统提供核心射频与时钟解决方案。',
    details: ['5G毫米波收发芯片', '时钟发生与同步芯片', '信号分发系统', '基站射频前端'],
    image: assetPath('app-base-station-flagship.jpg'),
    market: '15亿美元',
    growth: '稳定增长',
    icon: Broadcast,
  },
  {
    id: 'optical',
    title: '光通信',
    subtitle: 'Optical Communication',
    description:
      '面向数据中心扩建，为光模块提供高性能时钟与数据转换解决方案。',
    details: ['高速数据转换器', '光模块时钟方案', '数据中心互联'],
    image: assetPath('app-optical-flagship.jpg'),
    market: '20亿美元',
    growth: '快速增长',
    icon: WaveSine,
  },
  {
    id: 'medical',
    title: '医疗电子',
    subtitle: 'Medical Electronics',
    description:
      '面向神经刺激、感知芯片和高分辨率闭环神经调控，覆盖芯片设计到临床研究服务。',
    details: ['神经刺激芯片', '肌电探测芯片', '闭环神经调控', '便携化治疗设备'],
    image: assetPath('app-medical-flagship.jpg'),
    market: '新兴市场',
    growth: '潜力无限',
    icon: Pulse,
  },
  {
    id: 'radar',
    title: '雷达感知',
    subtitle: 'Radar Sensing',
    description:
      '面向安防、避障、检测等毫米波雷达应用，突出 W 波段四发四收雷达阵列芯片能力。',
    details: ['W波段雷达芯片', 'FMCW调频源', '相控阵雷达', '成像雷达系统'],
    image: assetPath('app-radar-flagship.jpg'),
    market: '工业应用',
    growth: '持续扩展',
    icon: CellSignalFull,
  },
];

export const products: Product[] = [
  {
    id: 'phased-array',
    title: '卫通相控阵芯片',
    subtitle: 'ZTW29924 / ZTW29942',
    image: assetPath('product-phased-array-flagship.jpg'),
    specs: [
      { label: '工作频段', value: '27.0-31.0 GHz' },
      { label: '通道数量', value: '16通道移相衰减' },
      { label: '移相精度', value: 'RMS ≤3°' },
      { label: '衰减范围', value: '0-31.5 dB' },
    ],
    description:
      '毫米波 Ka/K 波段四波束/双波束相控阵芯片，高度集成功分器、合路器，支持 6Bit 移相控制。',
    highlight: '大幅领先国际竞品',
    icon: Cpu,
  },
  {
    id: 'radar-array',
    title: 'W波段雷达阵列',
    subtitle: '4发4收毫米波雷达',
    image: assetPath('product-w-band-radar-flagship.jpg'),
    specs: [
      { label: '发射链路', value: '4通道' },
      { label: '接收链路', value: '4通道' },
      { label: '信号发生', value: 'FMCW调频' },
      { label: '控制接口', value: 'SPI' },
    ],
    description:
      '体现幅相一致性、通道自干扰消除、本振信号同步等关键设计能力，以及 4 发 4 收毫米波雷达阵列芯片开发成果。',
    highlight: '系统集成度高',
    icon: WaveSine,
  },
  {
    id: 'receiver',
    title: '宽带抗阻塞接收机',
    subtitle: 'Sub-6GHz射频接收',
    image: assetPath('product-sub6-receiver-flagship.jpg'),
    specs: [
      { label: '频率范围', value: '0.4-2.6 GHz' },
      { label: '带外抑制', value: '53 dB' },
      { label: '带外 IIP3', value: '+15.4 dB' },
      { label: '最低功耗', value: '5.35 mW' },
    ],
    description:
      '面向 Sub-6GHz 新一代 5G/IoT 通信感知系统，采用混频优先接收机架构，突出抗阻塞性能。',
    highlight: '国际领先水平',
    icon: Graph,
  },
  {
    id: 'converter',
    title: '高速数据转换器',
    subtitle: 'ADC / DAC',
    image: assetPath('product-adc-dac-flagship.jpg'),
    specs: [
      { label: 'ADC采样率', value: '250 MSps' },
      { label: 'ADC精度', value: '14 bit' },
      { label: 'DAC采样率', value: '1 GSps' },
      { label: 'DAC精度', value: '16 bit' },
    ],
    description: '高采样率、高精度 ADC/DAC 设计，适用于通信系统、仪器仪表等应用场景。',
    highlight: '高性能低功耗',
    icon: Lightning,
  },
];

export const technologyDirections: TechnologyDirection[] = [
  {
    title: '毫米波与太赫兹',
    process: '40-180nm CMOS/SOI, SiGe, GaN工艺',
    items: ['宽带FMCW调频源', 'W波段四发四收雷达芯片'],
    image: assetPath('direction-mmwave-thz.webp'),
    icon: Sparkle,
  },
  {
    title: 'Sub-6GHz变频收发',
    process: '28-180nm CMOS/SOI, SiGe, GaAs工艺',
    items: ['0.4-2.6GHz抗阻塞接收机', '面向可穿戴低功耗射频收发机'],
    image: assetPath('direction-sub6-transceiver.webp'),
    icon: Radio,
  },
  {
    title: '脑机芯片',
    process: 'TSMC 180nm Bulk CMOS工艺',
    items: ['高电压高精度非植入神经刺激芯片'],
    image: assetPath('direction-neural-chip.webp'),
    icon: Heartbeat,
  },
];

export const newsItems: NewsItem[] = [
  {
    date: '2025-03-01',
    category: '公司新闻',
    title: '琢时科技完成天使轮融资，加速射频芯片产业化布局',
    summary:
      '本轮融资将主要用于研发团队扩充、产品线拓展及市场开拓，进一步巩固公司在射频与毫米波芯片领域的领先地位。',
  },
  {
    date: '2025-02-15',
    category: '业务进展',
    title: '合作案例覆盖六大领域，客户价值显著提升',
    summary:
      '从卫星互联网到医疗电子，琢时科技的定制化芯片解决方案已在多个战略领域实现落地应用。',
  },
  {
    date: '2025-01-20',
    category: '技术突破',
    title: 'Ka波段相控阵芯片性能大幅领先国际竞品',
    summary:
      '琢时科技自主研发的Ka波段多通道相控阵芯片在发射功率和移相精度上均实现重大突破。',
  },
  {
    date: '2025-01-08',
    category: '合作动态',
    title: '与行业龙头企业达成战略合作',
    summary:
      '双方将在卫星通信、低空经济等领域展开深度合作，共同推动国产化芯片替代进程。',
  },
];

export const contactCards = [
  {
    label: '电子邮箱',
    value: 'info@zostek.com',
    href: 'mailto:info@zostek.com',
    icon: EnvelopeSimple,
  },
  {
    label: '联系电话',
    value: '敬请期待',
    href: undefined,
    icon: Phone,
  },
  {
    label: '公司地址',
    value: '江苏省苏州市长三角国际研发社区启动区10号楼',
    href: undefined,
    icon: MapPin,
  },
];

export const contactEntryPoints = [
  { label: '技术支持', description: '获取产品技术文档与支持' },
  { label: '商务合作', description: '探讨定制化芯片合作方案' },
  { label: '人才招聘', description: '加入琢时科技核心团队' },
  { label: '媒体咨询', description: '品牌与媒体合作事宜' },
];
