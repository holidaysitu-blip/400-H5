import { ExternalLink, Globe2, MapPin, MessageCircle, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

const websiteUrl = 'https://www.400box.com/';
const publicAccountUrl = 'https://mp.weixin.qq.com/s/jHFHgMqbwwDiezekDRUwzg';

export default function Discovery() {
  const [showServiceQr, setShowServiceQr] = useState(false);

  function openWebsite() {
    window.location.assign(websiteUrl);
  }

  function openPublicAccount() {
    window.location.assign(publicAccountUrl);
  }

  return (
    <div className="page discovery-page">
      <section className="image-strip">
        <img src="/assets/box-room.jpg" alt="400盒子独立房间样板" />
      </section>

      <section className="article-panel">
        <div className="section-title">
          <MapPin size={22} />
          <h2>住宿送算力发起社区</h2>
        </div>
        <p>随着AI提升了工作效率，工作剧烈改变的时代，越来越多的年轻人选择一人创业，却也渴望更有连接的生活。</p>
        <p>四百盒子社区应运而生，一家分布式面向全球OPC一人创业者的社区。每个居民享有独立房间，也能在开放区域自由交流、共创灵感。社区提供AI社交助手，让社交与创新自然发生。</p>
        <p>线下能够快速形成有归属感的社区，线上及时响应的协同网络，编织成一张清晰且详尽的创业者网络。</p>
        <blockquote>目前已服务3000多位OPC，20万+青年，孵化1000+场社群活动，帮助个体青年创收500万+。</blockquote>
        <p>随着AI时代的发展，全球超级个体的互联，未来全球有不同主题的四百盒子社区如音乐、艺术、舞蹈、设计、游戏社区等遍地开花。</p>
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
          <button className="primary-btn" onClick={openWebsite}>
            <ExternalLink size={18} />
            官网
          </button>
          <button className="ghost-btn" onClick={() => setShowServiceQr(true)}>
            <MessageCircle size={18} />
            微信
          </button>
          <button className="ghost-btn" onClick={openPublicAccount}>
            <MessageCircle size={18} />
            公众号
          </button>
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
