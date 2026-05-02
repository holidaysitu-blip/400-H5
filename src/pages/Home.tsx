import { ArrowRight, Box, ExternalLink, Globe2, MapPin, MessageCircle, Network, Sparkles, Users, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const websiteUrl = 'https://www.400box.com/';
const publicAccountUrl = 'https://mp.weixin.qq.com/s/jHFHgMqbwwDiezekDRUwzg';

const stats = [
  ['3000+', '已服务OPC'],
  ['20万+', '触达青年'],
  ['1000+', '社群活动'],
  ['500万+', '个体青年创收'],
];

export default function Home() {
  const [showServiceQr, setShowServiceQr] = useState(false);

  return (
    <div className="page home-page">
      <section className="hero">
        <img src="/assets/box-poster.png" alt="四百盒子社区春天远算力海报" />
        <div className="hero-copy">
          <span>2026 春季 · 苏州OPC社区</span>
          <h2>住宿送算力，发起一人创业社区</h2>
          <p>面向全球OPC一人创业者的分布式社区，让独立房间、开放共创区和AI社交助手同时发生作用。</p>
          <Link className="primary-btn" to="/market">
            查看活动
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="stat-grid">
        {stats.map(([value, label]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section className="intro-band">
        <div className="section-title">
          <Sparkles size={22} />
          <h2>为什么是四百盒子</h2>
        </div>
        <p>
          随着AI提升了工作效率，工作剧烈改变的时代，越来越多的年轻人选择一人创业，却也渴望更有连接的生活。
          “四百盒子社区”应运而生，一家分布式面向全球OPC一人创业者的社区。
        </p>
      </section>

      <section className="feature-list">
        <article>
          <Box />
          <h3>独立房间</h3>
          <p>每个居民享有独立房间，保留深度工作和休息的边界。</p>
        </article>
        <article>
          <Users />
          <h3>开放共创</h3>
          <p>在开放区域自由交流、共创灵感，让社交与创新自然发生。</p>
        </article>
        <article>
          <Network />
          <h3>线上协同</h3>
          <p>线下形成归属感社区，线上响应协同网络，编织详尽创业者网络。</p>
        </article>
      </section>

      <section className="article-panel home-community">
        <div className="section-title">
          <MapPin size={22} />
          <h2>社区介绍</h2>
        </div>
        <p>
          四百盒子社区是一家分布式面向全球OPC一人创业者的社区。每个居民享有独立房间，也能在开放区域自由交流、共创灵感。
        </p>
        <p>
          线下快速形成有归属感的社区，线上及时响应协同网络，帮助一人创业者找到同伴、资源和项目推进节奏。
        </p>
        <blockquote>
          目前已服务3000多位OPC，20万+青年，孵化1000+场社群活动，帮助个体青年创收500万+。
        </blockquote>
      </section>

      <section className="article-panel compact">
        <div className="section-title">
          <Sparkles size={22} />
          <h2>联合发起方</h2>
        </div>
        <article>
          <h3>硅署云</h3>
          <p>面向一人创业与AI时代的共创基础设施，提供算力、工具与创业者资源连接。</p>
        </article>
        <article>
          <h3>Mixlab 无界社区</h3>
          <p>跨学科、艺术、设计、商业与技术的创作者网络，推动开放式创新和项目协作。</p>
        </article>
        <article>
          <h3>flowith</h3>
          <p>一人一项目的AI协同工作流工具，帮助个体完成从灵感到产出的连续推进。</p>
        </article>
      </section>

      <section className="contact-panel">
        <Globe2 size={22} />
        <div>
          <h3>真实联系入口</h3>
          <p>官网：www.400box.com · 客服微信：四百盒子社区-小助手 · 公众号：四百盒子社区</p>
        </div>
        <div className="action-row">
          <a className="primary-btn" href={websiteUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={18} />
            官网
          </a>
          <button className="ghost-btn" onClick={() => setShowServiceQr(true)}>
            <MessageCircle size={18} />
            客服
          </button>
          <a className="ghost-btn" href={publicAccountUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            公众号
          </a>
        </div>
      </section>

      {showServiceQr && (
        <div className="modal-backdrop">
          <section className="modal-panel">
            <div className="modal-head">
              <div>
                <h2>添加客服微信</h2>
                <p>四百盒子社区-小助手</p>
              </div>
              <button className="icon-btn" onClick={() => setShowServiceQr(false)} aria-label="关闭客服二维码">
                <X size={20} />
              </button>
            </div>
            <div className="success-box qr-success">
              <img src="/assets/service-qr.png" alt="四百盒子社区小助手二维码" />
              <p>扫一扫上面的二维码图案，加我为朋友。</p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
