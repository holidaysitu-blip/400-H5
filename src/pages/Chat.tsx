import { MoreHorizontal, PlusCircle, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { askBoxAssistant } from '../lib/assistant';

type Message = {
  role: 'model' | 'user';
  text: string;
};

const assistantName = 'TOTO,YOYO';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: `欢迎来到四百盒子社区，我们是${assistantName}。你可以问我们报名、住宿、算力、活动或如何找到适合你的创业同伴。`,
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  async function send() {
    if (!input.trim() || typing) return;
    const text = input.trim();
    setInput('');
    setMessages((current) => [...current, { role: 'user', text }]);
    setTyping(true);
    const reply = await askBoxAssistant(text);
    setTyping(false);
    setMessages((current) => [...current, { role: 'model', text: reply }]);
  }

  return (
    <div className="chat-page">
      <header className="chat-head">
        <div className="assistant-title">
          <img src="/assets/toto-yoyo.png" alt="TOTO,YOYO头像" />
          <div>
            <strong>{assistantName}</strong>
            <span>盒子 AI 社交助手</span>
          </div>
        </div>
        <MoreHorizontal size={20} />
      </header>
      <div className="chat-body" ref={ref}>
        <span className="time-pill">今天 10:00</span>
        {messages.map((message, index) => (
          <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
            {message.role === 'model' && <img className="message-avatar" src="/assets/toto-yoyo.png" alt="TOTO,YOYO头像" />}
            <p>{message.text}</p>
          </div>
        ))}
        {typing && (
          <div className="typing-row">
            <img className="message-avatar" src="/assets/toto-yoyo.png" alt="TOTO,YOYO头像" />
            <div className="typing">
              <i />
              <i />
              <i />
            </div>
          </div>
        )}
      </div>
      <footer className="chat-input">
        <button className="icon-btn" onClick={() => window.alert('语音入口已就绪，H5演示版请先使用文字输入')} aria-label="更多输入">
          <PlusCircle size={22} />
        </button>
        <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && send()} placeholder={`向${assistantName}提问...`} />
        <button className="send-btn" onClick={send} disabled={!input.trim() || typing} aria-label="发送">
          <Send size={17} />
        </button>
      </footer>
    </div>
  );
}
