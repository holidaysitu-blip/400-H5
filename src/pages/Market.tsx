import { CalendarDays, CheckCircle2, MapPin } from 'lucide-react';
import { useState } from 'react';
import RegistrationModal from '../components/RegistrationModal';
import { Program, programs } from '../lib/storage';

type EventCard = Program & {
  slogan: string;
  subNote?: string;
  blocks: Array<{
    no: string;
    title: string;
    lines: string[];
  }>;
};

const events: EventCard[] = [
  {
    id: 'rookie-camp',
    title: '小白共创营',
    slogan: '从工具入门到作品落地，零基础也能完成第一个作品。',
    description: '菜鸟报到！一起成长！不管没关系，这里有人陪你做好第一个作品。',
    price: 399,
    category: '社群活动',
    tag: '399元/2天',
    dateInfo: '五一期间 · 2种共创活动',
    location: '苏州青苔盒子社区',
    requireIdea: true,
    includes: [],
    blocks: [
      {
        no: '01',
        title: '组队共创（2天）',
        lines: ['专注2天，和大家一起完成一个作品', '工具入门 + 实操 + 小组互助', '零基础友好，完成就有成就感', '只需2天，收获满满'],
      },
      {
        no: '02',
        title: '工位礼包（2天）',
        lines: ['一人独立工位'],
      },
      {
        no: '03',
        title: '学习礼包',
        lines: ['AI编程 / 设计 / 手工等', '《openclaw成长书》1份', '更多AI / 手工学习资料'],
      },
    ],
  },
  {
    id: 'advanced-hackathon',
    title: '进阶黑客松',
    slogan: 'AI能力实战升级，冲击更酷的作品。',
    description: 'AI能力实战升级，冲击更酷的作品；从想法到作品，完成一次7天共创闭环。',
    price: 799,
    category: '社群活动',
    tag: '799元/7天',
    subNote: '三选一：龙虾skills礼包 / AI工具礼包 / 算力礼包',
    dateInfo: '五一期间 · 7天共创营',
    location: '苏州青苔盒子社区',
    requireIdea: true,
    includes: [],
    blocks: [
      {
        no: '01',
        title: '7天共创营',
        lines: ['深入学习 + 项目实践', '有目标、有方向地完成作品', '社群互助，导师陪跑', '从想法到作品，完整闭环'],
      },
      {
        no: '02',
        title: '工位礼包（7天）',
        lines: ['一人独立工位'],
      },
      {
        no: '03',
        title: '算力礼包',
        lines: ['200元算力券', '最高约等于7140万token'],
      },
      {
        no: '04',
        title: '龙虾skills礼包',
        lines: ['教你独立开发自己的第一个Skill', '迈向AI Agent架构师的第一步'],
      },
      {
        no: '05',
        title: 'AI工具礼包',
        lines: ['flowith Pro - 创作者版月会员', '智械40+摄模模型', '图片与视频批量处理'],
      },
      {
        no: '06',
        title: '学习礼包',
        lines: ['AI编程卡片书1本', '《openclaw成长书》1份', '更多AI学习资料'],
      },
      {
        no: '07',
        title: '住宿礼包（+599元）',
        lines: ['舒适单人间7晚', '拎包入住，Wi-Fi、水电全免'],
      },
    ],
  },
];

export default function Market() {
  const [selected, setSelected] = useState<Program | null>(null);

  return (
    <div className="page market-page">
      <header className="page-header">
        <h2>活动</h2>
        <p>共创营、黑客松和住宿礼包统一在这里报名；提交后会进入后台数据库。</p>
      </header>

      <section className="event-poster">
        <img src="/assets/ai-hackathon-poster.jpg" alt="AI菜鸟黑客松活动海报" />
        <div>
          <span className="tag">2026 五一特别企划</span>
          <h3>菜鸟报到！互助共创！</h3>
          <p>从0到1的起点，就在互助里。</p>
        </div>
      </section>

      <section className="product-grid event-only-grid">
        {events.map((event) => (
          <article className="product-card featured-event" key={event.id}>
            <div className="event-card-head">
              <span className="tag">{event.tag}</span>
              <h3>{event.title}</h3>
              <strong>¥{event.price}</strong>
            </div>
            <p>{event.slogan}</p>
            {event.subNote && <p className="event-sub-note">{event.subNote}</p>}
            <div className="activity-meta">
              <span>
                <CalendarDays size={15} />
                {event.dateInfo}
              </span>
            </div>
            <div className="event-block-grid">
              {event.blocks.map((block) => (
                <section className="event-block" key={`${event.id}-${block.no}`}>
                  <div className="event-block-title">
                    <span>{block.no}</span>
                    <b>{block.title}</b>
                  </div>
                  <ul>
                    {block.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <button className="primary-btn full" onClick={() => setSelected(event)}>
              立即报名
            </button>
          </article>
        ))}
      </section>

      <section className="activity-packages">
        <div className="section-title">
          <CheckCircle2 size={22} />
          <h2>住宿活动套餐</h2>
        </div>
        <div className="program-list">
          {programs.map((program) => (
            <article className="program-card" key={program.id}>
              <div className="card-top">
                <div>
                  {program.tag && <span className="tag">{program.tag}</span>}
                  <h3>{program.title}</h3>
                </div>
                {typeof program.price === 'number' && <strong>¥{program.price}</strong>}
              </div>
              <p>{program.description}</p>
              <div className="meta">
                <span>
                  <CalendarDays size={14} />
                  {program.dateInfo}
                </span>
                <span>
                  <MapPin size={14} />
                  {program.location}
                </span>
              </div>
              <ul className="benefit-list package">
                {program.includes.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={14} />
                    {item}
                  </li>
                ))}
              </ul>
              {program.note && <p className="package-note">{program.note}</p>}
              <button className="primary-btn full" onClick={() => setSelected(program)}>
                立即报名
              </button>
            </article>
          ))}
        </div>
      </section>

      <RegistrationModal isOpen={Boolean(selected)} onClose={() => setSelected(null)} program={selected} />
    </div>
  );
}
