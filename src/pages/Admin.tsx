import { Eye, LockKeyhole, RefreshCw, ShieldCheck } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';

type AdminRegistration = {
  id: string;
  program_id: string;
  program_title: string;
  user_name: string;
  user_phone: string;
  user_role: string | null;
  status: string;
  created_at: string;
};

const sessionKey = 'box400.admin.password';

function formatTime(value: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export default function Admin() {
  const [password, setPassword] = useState(() => sessionStorage.getItem(sessionKey) ?? '');
  const [input, setInput] = useState('');
  const [rows, setRows] = useState<AdminRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isLoggedIn = Boolean(password);

  async function loadData(nextPassword = password) {
    if (!nextPassword) return;
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin-registrations', {
        headers: {
          Authorization: `Bearer ${nextPassword}`,
        },
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || '后台数据读取失败');
      }

      setRows(Array.isArray(payload.data) ? payload.data : []);
      setPassword(nextPassword);
      sessionStorage.setItem(sessionKey, nextPassword);
    } catch (err) {
      const message = err instanceof Error ? err.message : '后台数据读取失败';
      setError(message);
      if (message.includes('密码')) {
        setPassword('');
        sessionStorage.removeItem(sessionKey);
      }
    } finally {
      setLoading(false);
    }
  }

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loadData(input.trim());
  }

  useEffect(() => {
    if (password) {
      loadData(password);
    }
  }, []);

  const totalToday = useMemo(() => {
    const today = new Date().toDateString();
    return rows.filter((row) => new Date(row.created_at).toDateString() === today).length;
  }, [rows]);

  if (!isLoggedIn) {
    return (
      <main className="admin-shell">
        <section className="admin-login">
          <div className="admin-brand">
            <LockKeyhole size={30} />
            <div>
              <h1>四百盒子报名后台</h1>
              <p>输入后台密码查看 H5 报名数据</p>
            </div>
          </div>
          <form onSubmit={login}>
            <label>
              后台密码
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="请输入后台密码"
                type="password"
                autoFocus
              />
            </label>
            {error && <p className="admin-error">{error}</p>}
            <button className="primary-btn full" disabled={loading || !input.trim()}>
              {loading ? '登录中...' : '进入后台'}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <section className="admin-board">
        <header className="admin-header">
          <div>
            <span>
              <ShieldCheck size={16} />
              已连接 Supabase
            </span>
            <h1>H5 报名后台</h1>
            <p>最新报名会按提交时间自动排在最上方。</p>
          </div>
          <button className="ghost-btn" onClick={() => loadData()} disabled={loading}>
            <RefreshCw size={17} />
            刷新
          </button>
        </header>

        <div className="admin-stats">
          <article>
            <strong>{rows.length}</strong>
            <span>总报名</span>
          </article>
          <article>
            <strong>{totalToday}</strong>
            <span>今日新增</span>
          </article>
          <article>
            <strong>{rows.filter((row) => row.status === 'pending').length}</strong>
            <span>待确认</span>
          </article>
        </div>

        {error && <p className="admin-error">{error}</p>}

        <section className="admin-table-card">
          <div className="admin-table-title">
            <h2>报名列表</h2>
            <span>{loading ? '更新中...' : `共 ${rows.length} 条`}</span>
          </div>
          {rows.length === 0 ? (
            <div className="admin-empty">
              <Eye size={28} />
              <strong>暂无报名数据</strong>
              <p>有用户在 H5 活动页提交报名后，会自动出现在这里。</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>时间</th>
                    <th>报名项目</th>
                    <th>姓名</th>
                    <th>电话</th>
                    <th>想做内容</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>{formatTime(row.created_at)}</td>
                      <td>{row.program_title || row.program_id}</td>
                      <td>{row.user_name}</td>
                      <td>
                        <a href={`tel:${row.user_phone}`}>{row.user_phone}</a>
                      </td>
                      <td>{row.user_role || '-'}</td>
                      <td>
                        <span className="status-pill">{row.status || 'pending'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
