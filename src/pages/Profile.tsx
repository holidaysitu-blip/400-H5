import { Book, Bookmark, CalendarDays, CreditCard, Edit3, Headphones, Image as ImageIcon, Plus, Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCart, getFavorites, getNotes, getRegistrations, programs, saveNote } from '../lib/storage';
import { getSupabaseProjectRef } from '../lib/supabase';

const tabs = ['我的订单', '居民笔记', '我的预约', '我的学习', '我的收藏', '活动相册'];

export default function Profile() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [version, setVersion] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState({ title: '', content: '', topic: '' });

  useEffect(() => {
    const refresh = () => setVersion((value) => value + 1);
    window.addEventListener('box400-storage', refresh);
    return () => window.removeEventListener('box400-storage', refresh);
  }, []);

  const registrations = getRegistrations();
  const favorites = getFavorites();
  const notes = getNotes();
  const cart = getCart();
  void version;

  function submitNote() {
    if (!note.title.trim() || !note.content.trim()) {
      window.alert('请填写标题和内容');
      return;
    }
    saveNote(note);
    setNote({ title: '', content: '', topic: '' });
    setShowNote(false);
    setVersion((value) => value + 1);
  }

  return (
    <div className="page profile-page">
      <header className="profile-head">
        <div>
          <h2>盒子居民</h2>
          <span>OPC 一人创业者</span>
        </div>
        <div className="avatar">400</div>
      </header>

      <section className="supabase-hint">
        当前报名写入 Supabase project ref：<b>{getSupabaseProjectRef()}</b>
        <br />
        如果你在自己的 Supabase 组织里看不到数据，请在 `.env.local` 配置你的 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`。
      </section>

      <section className="stat-grid mini">
        <article>
          <strong>{registrations.length}</strong>
          <span>预约</span>
        </article>
        <article>
          <strong>{favorites.length}</strong>
          <span>收藏</span>
        </article>
        <article>
          <strong>{cart.length}</strong>
          <span>工具</span>
        </article>
      </section>

      <div className="tabs">
        {tabs.map((tab) => (
          <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <section className="profile-panel">
        {activeTab === '我的订单' && (
          <div className="order-icons">
            <IconText icon={<CreditCard />} label="待支付" />
            <IconText icon={<CalendarDays />} label="待入住" />
            <IconText icon={<Star />} label="已完成" />
            <IconText icon={<Headphones />} label="售后" />
          </div>
        )}

        {activeTab === '我的预约' && <RecordList items={registrations.map((item) => `${item.programTitle} · ${item.status === 'pending' ? '处理中' : '已确认'}`)} empty="暂无预约，去活动或礼包页提交报名吧" />}
        {activeTab === '我的学习' && <RecordList items={cart.map((item) => `${item.name} x ${item.count}`)} empty="暂无学习工具；当前只开放活动和礼包报名" />}
        {activeTab === '我的收藏' && <RecordList items={programs.filter((item) => favorites.includes(item.id)).map((item) => item.title)} empty="暂无收藏内容" />}
        {activeTab === '活动相册' && (
          <div className="album-grid">
            <div>
              <ImageIcon />
              <span>春天远算力</span>
            </div>
            <div>
              <img src="/assets/gift-poster.jpg" alt="一人创业大礼包长图" />
            </div>
          </div>
        )}
        {activeTab === '居民笔记' && (
          <div className="note-list">
            <button className="dashed-btn" onClick={() => setShowNote(true)}>
              <Plus size={18} />
              记录社区心得
            </button>
            <RecordList items={notes.map((item) => `${item.title} · ${item.topic || '盒子社区'}`)} empty="暂无笔记，记下你的第一次连接" />
          </div>
        )}
      </section>

      {showNote && (
        <div className="modal-backdrop">
          <section className="modal-panel">
            <div className="modal-head">
              <h2>居民笔记</h2>
              <button className="icon-btn" onClick={() => setShowNote(false)} aria-label="关闭笔记弹窗">
                <X size={20} />
              </button>
            </div>
            <input value={note.title} onChange={(event) => setNote({ ...note, title: event.target.value })} placeholder="标题" />
            <input value={note.topic} onChange={(event) => setNote({ ...note, topic: event.target.value })} placeholder="主题，如AI、项目、共创" />
            <textarea value={note.content} onChange={(event) => setNote({ ...note, content: event.target.value })} placeholder="写下你今天遇到的人和想法" rows={5} />
            <button className="primary-btn full" onClick={submitNote}>
              保存笔记
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

function IconText({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div>
      {icon}
      <span>{label}</span>
    </div>
  );
}

function RecordList({ items, empty }: { items: string[]; empty: string }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <Book size={36} />
        <p>{empty}</p>
      </div>
    );
  }
  return (
    <div className="record-list">
      {items.map((item) => (
        <article key={item}>
          <Bookmark size={16} />
          <span>{item}</span>
        </article>
      ))}
    </div>
  );
}
