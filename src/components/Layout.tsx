import { Bot, Home, LayoutGrid, Sprout, User } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const nav = [
  { to: '/', label: '首页', icon: Home },
  { to: '/market', label: '活动', icon: LayoutGrid },
  { to: '/profile', label: '我的', icon: User },
  { to: '/chat', label: 'AI', icon: Bot },
];

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <Sprout size={22} />
        <h1>四百盒子社区</h1>
        <a className="mini-link" href="https://www.400box.com/" target="_blank" rel="noreferrer">
          官网
        </a>
      </header>
      <main className="main-view">
        <Outlet />
      </main>
      <nav className="bottom-nav">
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={22} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
