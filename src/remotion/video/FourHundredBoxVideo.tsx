import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import './video.css';

type Props = {
  signupUrl: string;
  wechat: string;
};

const fps = 30;
const totalFrames = 1050;
const scenes = {
  opener: [0, 120],
  era: [120, 270],
  community: [270, 450],
  gift: [450, 630],
  stats: [630, 780],
  future: [780, 930],
  cta: [930, totalFrames],
} as const;

const musicDataUri = createMusicDataUri(totalFrames / fps);

export const FourHundredBoxVideo = ({ signupUrl, wechat }: Props) => {
  return (
    <AbsoluteFill className="video">
      <Audio src={musicDataUri} volume={0.32} />
      <Grain />
      <BeatBar />
      <Sequence from={scenes.opener[0]} durationInFrames={scenes.opener[1] - scenes.opener[0]}>
        <Opener />
      </Sequence>
      <Sequence from={scenes.era[0]} durationInFrames={scenes.era[1] - scenes.era[0]}>
        <EraShift />
      </Sequence>
      <Sequence from={scenes.community[0]} durationInFrames={scenes.community[1] - scenes.community[0]}>
        <Community />
      </Sequence>
      <Sequence from={scenes.gift[0]} durationInFrames={scenes.gift[1] - scenes.gift[0]}>
        <Gift />
      </Sequence>
      <Sequence from={scenes.stats[0]} durationInFrames={scenes.stats[1] - scenes.stats[0]}>
        <Stats />
      </Sequence>
      <Sequence from={scenes.future[0]} durationInFrames={scenes.future[1] - scenes.future[0]}>
        <Future />
      </Sequence>
      <Sequence from={scenes.cta[0]} durationInFrames={scenes.cta[1] - scenes.cta[0]}>
        <Cta signupUrl={signupUrl} wechat={wechat} />
      </Sequence>
    </AbsoluteFill>
  );
};

function Opener() {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 120], [1.12, 1.01], { extrapolateRight: 'clamp' });
  const title = spring({ frame, fps, config: { damping: 15, stiffness: 160 } });

  return (
    <AbsoluteFill className="scene opener">
      <Img className="bg-image" src={staticFile('/assets/box-poster.png')} style={{ transform: `scale(${scale})` }} />
      <div className="shade fast" />
      <div className="badge">2026 春季 · 苏州OPC社区</div>
      <div className="opener-title" style={{ transform: `translateY(${(1 - title) * 70}px)`, opacity: title }}>
        <span>400 box</span>
        <h1>一人创业大礼包</h1>
        <p>住宿送算力 · 发起社区</p>
      </div>
    </AbsoluteFill>
  );
}

function EraShift() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill className="scene light fast-scene">
      <KineticText words={['AI提升效率', '工作剧烈改变', '年轻人选择一人创业']} />
      <p className="body-copy" style={fadeUp(frame, 54)}>
        越来越多的年轻人选择一人创业，却也渴望更有连接的生活。
      </p>
      <Img className="assistant-float" src={staticFile('/assets/toto-yoyo.png')} style={float(frame, 13)} />
    </AbsoluteFill>
  );
}

function Community() {
  const frame = useCurrentFrame();
  const imageMove = interpolate(frame, [0, 180], [0, -78], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill className="scene split">
      <div className="room-mask">
        <Img className="room-image" src={staticFile('/assets/box-room.jpg')} style={{ transform: `translateY(${imageMove}px) scale(1.18)` }} />
      </div>
      <div className="copy-panel compact-copy" style={fadeUp(frame, 14)}>
        <span className="label">分布式社区</span>
        <h2>四百盒子社区应运而生</h2>
        <p>面向全球OPC一人创业者：独立房间、开放共创区、AI社交助手同时在线。</p>
        <ul>
          <li>线下快速形成归属感</li>
          <li>线上及时响应协同网络</li>
          <li>让社交与创新自然发生</li>
        </ul>
      </div>
    </AbsoluteFill>
  );
}

function Gift() {
  const frame = useCurrentFrame();
  const pop = spring({ frame, fps, config: { damping: 11, stiffness: 190 } });

  return (
    <AbsoluteFill className="scene gift">
      <Img className="poster-tall" src={staticFile('/assets/gift-poster.jpg')} />
      <div className="gift-card quick" style={{ transform: `scale(${0.9 + pop * 0.1})`, opacity: pop }}>
        <h2>领取创业大礼包</h2>
        <div className="price-row-video">
          <strong>299元 / 2日</strong>
          <span>舒适单人间 · 独立工位 · Wi-Fi水电全免</span>
        </div>
        <div className="price-row-video">
          <strong>599元 / 周</strong>
          <span>住宿 + 算力 + 社群 + AI学习工具</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

function Stats() {
  const frame = useCurrentFrame();
  const stats = [
    ['3000+', '服务OPC'],
    ['20万+', '触达青年'],
    ['1000+', '社群活动'],
    ['500万+', '帮助创收'],
  ];

  return (
    <AbsoluteFill className="scene stats">
      <h2 style={fadeUp(frame, 0)}>创业者网络已经发生</h2>
      <div className="stat-video-grid">
        {stats.map(([value, label], index) => (
          <div key={label} className="stat-video" style={fadeUp(frame, 12 + index * 8)}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p style={fadeUp(frame, 72)}>线下形成归属感，线上响应协同网络。</p>
    </AbsoluteFill>
  );
}

function Future() {
  const frame = useCurrentFrame();
  const themes = ['音乐', '艺术', '舞蹈', '设计', '游戏', 'AI产品'];

  return (
    <AbsoluteFill className="scene future">
      <h2 style={fadeUp(frame, 0)}>全球超级个体互联</h2>
      <p style={fadeUp(frame, 18)}>未来，不同主题的四百盒子社区将在全球遍地开花。</p>
      <div className="theme-cloud">
        {themes.map((theme, index) => (
          <span key={theme} style={bubble(frame, index)}>
            {theme}
          </span>
        ))}
      </div>
      <Img className="assistant-bottom" src={staticFile('/assets/toto-yoyo.png')} style={float(frame, 10)} />
    </AbsoluteFill>
  );
}

function Cta({ signupUrl, wechat }: Props) {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="scene cta">
      <div className="cta-box" style={fadeUp(frame, 4)}>
        <span className="label">400 box</span>
        <h2>现在加入四百盒子社区</h2>
        <p>适合刚一人创业，准备孵包合适城市落脚的OPC。</p>
        <div className="cta-line">报名链接：{signupUrl}</div>
        <div className="cta-line">客服微信：{wechat}</div>
      </div>
      <Img className="cta-avatar" src={staticFile('/assets/toto-yoyo.png')} style={float(frame, 9)} />
    </AbsoluteFill>
  );
}

function KineticText({ words }: { words: string[] }) {
  const frame = useCurrentFrame();
  return (
    <div className="kinetic">
      {words.map((word, index) => (
        <h2 key={word} style={fadeUp(frame, index * 14)}>
          {word}
        </h2>
      ))}
    </div>
  );
}

function Grain() {
  return <AbsoluteFill className="grain" />;
}

function BeatBar() {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, totalFrames], [0, 100], { extrapolateRight: 'clamp' });
  const pulse = 0.7 + Math.sin(frame / 4) * 0.3;
  return <div className="beat-bar" style={{ width: `${progress}%`, opacity: pulse }} />;
}

function fadeUp(frame: number, delay: number) {
  const opacity = interpolate(frame, [delay, delay + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const y = interpolate(frame, [delay, delay + 14], [34, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return { opacity, transform: `translateY(${y}px)` };
}

function float(frame: number, speed: number) {
  return { transform: `translateY(${Math.sin(frame / speed) * 12}px)` };
}

function bubble(frame: number, index: number) {
  const start = index * 9;
  const opacity = interpolate(frame, [start, start + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [start, start + 12], [0.72, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return { opacity, transform: `scale(${scale})` };
}

function createMusicDataUri(durationSeconds: number) {
  const sampleRate = 22050;
  const samples = Math.floor(durationSeconds * sampleRate);
  const bytesPerSample = 2;
  const dataSize = samples * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  const notes = [261.63, 329.63, 392, 493.88, 440, 392, 329.63, 293.66];

  writeAscii(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeAscii(view, 8, 'WAVE');
  writeAscii(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * bytesPerSample, true);
  view.setUint16(32, bytesPerSample, true);
  view.setUint16(34, 16, true);
  writeAscii(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  for (let index = 0; index < samples; index += 1) {
    const time = index / sampleRate;
    const beat = Math.floor(time * 2.8);
    const note = notes[beat % notes.length];
    const chord = notes[(beat + 2) % notes.length] / 2;
    const envelope = 0.55 + 0.45 * Math.sin((time * 2.8 * Math.PI) % Math.PI);
    const kick = Math.sin(2 * Math.PI * 58 * time) * Math.exp(-((time * 2.8) % 1) * 10);
    const tone =
      Math.sin(2 * Math.PI * note * time) * 0.28 +
      Math.sin(2 * Math.PI * chord * time) * 0.18 +
      kick * 0.3;
    const fadeIn = Math.min(1, time / 1.2);
    const fadeOut = Math.min(1, (durationSeconds - time) / 1.2);
    const sample = Math.max(-1, Math.min(1, tone * envelope * fadeIn * fadeOut));
    view.setInt16(44 + index * bytesPerSample, sample * 32767, true);
  }

  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 8192;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return `data:audio/wav;base64,${btoa(binary)}`;
}

function writeAscii(view: DataView, offset: number, value: string) {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
}
