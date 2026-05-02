import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Program, saveRegistration } from '../lib/storage';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  program: Program | null;
};

export default function RegistrationModal({ isOpen, onClose, program }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setPhone('');
      setRole('');
      setDone(false);
      setLoading(false);
    }
  }, [isOpen, program?.id]);

  useEffect(() => {
    if (done && program?.category === '住宿礼包') {
      navigator.clipboard?.writeText('_400box_').catch(() => {
        // Clipboard may be blocked in some embedded browsers; the visible code remains available.
      });
    }
  }, [done, program?.category]);

  if (!isOpen || !program) return null;

  const currentProgram = program;

  async function submit() {
    if (!name.trim() || !/^1[3-9]\d{9}$/.test(phone.trim())) {
      window.alert('请填写姓名，并输入有效的中国大陆手机号');
      return;
    }
    if (currentProgram.requireIdea && !role.trim()) {
      window.alert('请填写你想要做什么内容');
      return;
    }

    setLoading(true);
    try {
      await saveRegistration({
        programId: currentProgram.id,
        programTitle: currentProgram.title,
        name: name.trim(),
        phone: phone.trim(),
        role: role.trim(),
      });
      setDone(true);
    } catch (error) {
      console.error(error);
      window.alert('报名提交到后台失败，请稍后再试，或直接扫码联系。');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <section className="modal-panel">
        <div className="modal-head">
          <div>
            <h2>{done ? '报名成功，请加客服微信' : '快速报名'}</h2>
            <p>{currentProgram.title}</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="关闭报名弹窗">
            <X size={20} />
          </button>
        </div>

        {done ? (
          currentProgram.category === '住宿礼包' ? (
            <div className="success-box wechat-success">
              <strong>已提交报名，请添加客服微信</strong>
              <p>客服微信已自动复制：<b>_400box_</b></p>
              <button
                className="primary-btn full"
                onClick={() => {
                  navigator.clipboard?.writeText('_400box_');
                  window.location.href = 'weixin://';
                }}
              >
                打开微信添加 _400box_
              </button>
              <button className="ghost-btn full" onClick={() => navigator.clipboard?.writeText('_400box_')}>
                复制客服微信
              </button>
            </div>
          ) : (
            <div className="success-box qr-success">
              <strong>已提交报名</strong>
              <p>请扫码添加客服微信，确认名额、到达时间和套餐选择。</p>
              <img src="/assets/contact-qr.jpg" alt="报名成功后添加客服微信二维码" />
            </div>
          )
        ) : (
          <>
            <label>
              姓名
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="请输入姓名" />
            </label>
            <label>
              电话
              <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="用于报名确认" />
            </label>
            <label>
              想要做什么内容
              <textarea value={role} onChange={(event) => setRole(event.target.value)} placeholder="例如：想做一个AI小工具、个人作品集、游戏Demo、设计项目..." rows={4} />
            </label>
            <button className="primary-btn full" onClick={submit} disabled={loading}>
              {loading ? '提交中...' : '确认报名'}
            </button>
            <p className="form-tip">提交成功后会弹出客服微信二维码，请添加后确认名额。</p>
          </>
        )}
      </section>
    </div>
  );
}
