import { Bookmark, Calendar, CheckCircle2, MapPin, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import RegistrationModal from '../components/RegistrationModal';
import { Program, getFavorites, programs, toggleFavorite } from '../lib/storage';

const categories = ['全部', '住宿礼包'];

export default function Courses() {
  const [filter, setFilter] = useState('全部');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState(getFavorites());
  const [selected, setSelected] = useState<Program | null>(null);

  const filtered = useMemo(() => {
    return programs.filter((program) => {
      const byFilter = filter === '全部' || program.category === filter;
      const byQuery = `${program.title}${program.description}${program.location}`.includes(query.trim());
      return byFilter && byQuery;
    });
  }, [filter, query]);

  function onFavorite(id: string) {
    const isSaved = toggleFavorite(id);
    setFavorites(getFavorites());
    window.alert(isSaved ? '已加入我的收藏' : '已取消收藏');
  }

  return (
    <div className="page list-page">
      <header className="page-header">
        <h2>一人创业礼包</h2>
        <p>只开放2天299和7天599两个报名套餐；提交后请添加客服微信确认名额。</p>
      </header>

      <div className="search-box">
        <Search size={17} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索2天或7天套餐" />
      </div>

      <div className="tabs">
        {categories.map((item) => (
          <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>

      <section className="program-list">
        {filtered.map((program) => (
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
                <Calendar size={14} />
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
            <div className="card-actions">
              <button className={`ghost-btn ${favorites.includes(program.id) ? 'saved' : ''}`} onClick={() => onFavorite(program.id)}>
                <Bookmark size={17} />
                {favorites.includes(program.id) ? '已收藏' : '收藏'}
              </button>
              <button className="primary-btn" onClick={() => setSelected(program)}>
                立即报名
              </button>
            </div>
          </article>
        ))}
      </section>

      <RegistrationModal isOpen={Boolean(selected)} onClose={() => setSelected(null)} program={selected} />
    </div>
  );
}
