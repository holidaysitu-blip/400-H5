# 四百盒子社区 H5

这是四百盒子社区 H5 的完整备份，包含前端页面、活动报名、AI 对话页、独立后台、Supabase 报名表 SQL、Netlify Functions 版本，以及可平移到腾讯云服务器运行的 Node API 版本。

## 当前线上地址

- H5：<https://400-box-community-h5.netlify.app>
- 后台：<https://400-box-community-h5.netlify.app/admin>
- 后台密码通过环境变量 `ADMIN_PASSWORD` 配置。

## 目录说明

- `src/`：H5 React 源码，包含 `/admin` 后台页面。
- `public/`：图片、二维码、海报等静态资源。
- `dist/`：当前已经构建好的静态文件，可直接交给 Nginx 托管。
- `netlify/functions/`：Netlify 线上函数备份。
- `server/`：腾讯云 CVM 可运行的 Node API 服务，提供报名和后台数据接口。
- `deploy/`：腾讯云 Nginx 与 PM2 示例配置。
- `supabase_h5_registrations.sql`：Supabase 报名表结构和 RLS insert 策略。

## 环境变量

复制 `.env.example` 为 `.env`，填入真实值：

```bash
ADMIN_PASSWORD=你的后台密码
SUPABASE_URL=https://你的-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=你的 Supabase service_role key
PORT=8787
```

不要把真实 `.env` 提交到 GitHub。

## 本地开发

```bash
npm install
npm run dev
```

## 构建前端

```bash
npm run build
```

构建结果会输出到 `dist/`。

## 腾讯云 CVM 部署

假设项目放在 `/www/wwwroot/400-H5`：

```bash
cd /www/wwwroot/400-H5
npm install
cp .env.example .env
nano .env
npm run build
npm install -g pm2
pm2 start deploy/pm2.config.cjs
pm2 save
```

Nginx 配置参考 `deploy/nginx.conf.example`：

- `root` 指向 `/www/wwwroot/400-H5/dist`
- `/api/` 反向代理到 `http://127.0.0.1:8787`
- `/` 使用 `try_files $uri $uri/ /index.html`，保证 `/admin` 刷新不 404

部署后访问：

- 首页：`http://服务器IP/`
- 后台：`http://服务器IP/admin`

## 后台接口

- `POST /api/register`：H5 报名写入 Supabase `h5_registrations`。
- `GET /api/admin-registrations`：后台读取报名列表，需要请求头 `Authorization: Bearer 后台密码`。

## 安全说明

仓库只保存代码和配置模板，不保存真实 `.env`、Supabase `service_role` 密钥或报名用户数据导出。
