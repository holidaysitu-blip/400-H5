import { readFileSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(import.meta.url), '..', '..');
const qrPath = 'D:/xwechat_files/wxid_xrzpqyxl9sih22_0d11/temp/RWTemp/2026-04/92b64adf8d7d54445cd510c4cb2cc36d/28b22c5e796ff00db5651f9cea8758ee.png';
const heroPath = join(root, 'public/assets/box-poster.png');
const outPath = join(root, 'public/assets/400box-promo-qr-poster.svg');

function mime(path) {
  const ext = extname(path).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  return 'application/octet-stream';
}

function dataUri(path) {
  return `data:${mime(path)};base64,${readFileSync(path).toString('base64')}`;
}

const hero = dataUri(heroPath);
const qr = dataUri(qrPath);

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <defs>
    <style>
      .sans{font-family:"Microsoft YaHei UI","Microsoft YaHei","PingFang SC","Noto Sans CJK SC",Arial,sans-serif}
      .serif{font-family:"Microsoft YaHei UI","Microsoft YaHei","PingFang SC","Noto Serif CJK SC",serif}
      .bold{font-weight:900}
      .mid{font-weight:700}
      .small{font-size:28px}
    </style>
    <pattern id="diagonal" width="58" height="58" patternUnits="userSpaceOnUse" patternTransform="rotate(-13)">
      <rect width="58" height="58" fill="#FFD21A"/>
      <path d="M0 0H58" stroke="#E9B900" stroke-width="4" opacity=".38"/>
    </pattern>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#000" flood-opacity=".25"/>
    </filter>
  </defs>

  <rect width="1080" height="1920" fill="url(#diagonal)"/>
  <circle cx="930" cy="250" r="158" fill="#FFE36B" opacity=".42"/>
  <circle cx="104" cy="1122" r="174" fill="#FFF3B0" opacity=".32"/>

  <g class="sans bold">
    <rect x="70" y="42" width="430" height="62" rx="31" fill="#101010"/>
    <text x="285" y="83" text-anchor="middle" font-size="32" fill="#fff">五一不放假  一起互啄！</text>
    <rect x="762" y="38" width="240" height="86" rx="32" fill="#fff" stroke="#101010" stroke-width="7"/>
    <text x="882" y="99" text-anchor="middle" font-size="52" fill="#101010">2026</text>
  </g>

  <g class="serif bold" fill="#101010">
    <text x="66" y="232" font-size="96">AI 菜鸟黑客松</text>
    <text x="122" y="304" font-size="42">从0到1的起点，就在互助里！</text>
  </g>

  <g class="sans bold">
    <rect x="70" y="350" width="940" height="84" rx="16" fill="#101010"/>
    <text x="540" y="405" text-anchor="middle" font-size="36" fill="#FFD21A">苏州青苔盒子社区 · 共创 · 互助 · 成长</text>
  </g>

  <g filter="url(#softShadow)">
    <rect x="70" y="474" width="445" height="245" rx="30" fill="#FFF9E8" stroke="#101010" stroke-width="6"/>
    <rect x="565" y="474" width="445" height="245" rx="30" fill="#FFF9E8" stroke="#101010" stroke-width="6"/>
  </g>
  <g class="sans bold" fill="#101010">
    <text x="112" y="560" font-size="52">菜鸟报到！</text>
    <text x="116" y="625" font-size="31">先围观  |  我来学</text>
    <text x="610" y="560" font-size="52">互助共创！</text>
    <text x="610" y="625" font-size="29">有人陪你做第一个作品</text>
  </g>
  <g fill="#FFD21A" opacity=".95">
    <rect x="112" y="648" width="112" height="22" rx="11"/>
    <rect x="610" y="648" width="112" height="22" rx="11"/>
  </g>

  <g class="sans bold">
    <rect x="70" y="765" width="940" height="86" rx="10" fill="#101010"/>
    <text x="540" y="823" text-anchor="middle" font-size="50" fill="#fff">五一期间  2种共创活动</text>
  </g>

  <g filter="url(#softShadow)">
    <rect x="70" y="895" width="450" height="260" rx="26" fill="#FFF9E8" stroke="#101010" stroke-width="5"/>
    <rect x="560" y="895" width="450" height="260" rx="26" fill="#FFF9E8" stroke="#101010" stroke-width="5"/>
  </g>
  <g class="sans bold">
    <rect x="92" y="866" width="194" height="54" rx="27" fill="#101010"/>
    <text x="189" y="903" text-anchor="middle" font-size="29" fill="#fff">399元/2天</text>
    <rect x="784" y="866" width="194" height="54" rx="27" fill="#101010"/>
    <text x="881" y="903" text-anchor="middle" font-size="29" fill="#fff">799元/7天</text>
  </g>
  <g class="sans" fill="#101010">
    <text x="106" y="975" font-size="49" font-weight="900">小白共创营</text>
    <text x="106" y="1038" font-size="28">从工具入门到作品落地</text>
    <text x="106" y="1080" font-size="28">零基础也能完成第一个作品</text>
    <text x="596" y="975" font-size="49" font-weight="900">进阶黑客松</text>
    <text x="596" y="1038" font-size="28">AI能力实战升级</text>
    <text x="596" y="1080" font-size="28">7天高密度共创冲作品</text>
  </g>

  <image href="${hero}" x="0" y="1204" width="1080" height="390" preserveAspectRatio="xMidYMid slice"/>
  <rect x="0" y="1204" width="1080" height="390" fill="#101010" opacity=".54"/>
  <g class="sans bold">
    <rect x="96" y="1234" width="520" height="90" rx="12" fill="#101010"/>
    <text x="356" y="1295" text-anchor="middle" font-size="52" fill="#fff">多种共创礼包</text>
    <text x="96" y="1412" font-size="76" fill="#fff">等你来拿！</text>
    <text x="96" y="1488" font-size="31" fill="#fff">住宿礼包 · 算力券 · AI工具 · 咖啡社群 · 学习资料</text>
  </g>

  <rect x="0" y="1594" width="1080" height="326" fill="#103A35"/>
  <g class="sans">
    <text x="70" y="1668" font-size="58" font-weight="900" fill="#fff">扫码报名 / 领取礼包</text>
    <text x="72" y="1732" font-size="30" fill="#fff">适合刚开始一人创业、想学习AI工具、</text>
    <text x="72" y="1776" font-size="30" fill="#fff">需要工位住宿和同伴互助的你。</text>
    <text x="72" y="1844" font-size="28" font-weight="900" fill="#FFD21A">ai666-site.netlify.app</text>
  </g>

  <g filter="url(#softShadow)">
    <rect x="744" y="1618" width="282" height="264" rx="20" fill="#fff"/>
    <image href="${qr}" x="778" y="1632" width="214" height="214" preserveAspectRatio="xMidYMid meet"/>
  </g>
  <text class="sans bold" x="885" y="1868" text-anchor="middle" font-size="24" fill="#101010">长按识别二维码</text>
</svg>
`;

writeFileSync(outPath, svg, 'utf8');
console.log(outPath);
