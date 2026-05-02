import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');
loadEnv(join(rootDir, '.env'));

const port = Number(process.env.PORT || 8787);

function loadEnv(path) {
  if (!existsSync(path)) return;
  const content = readFileSync(path, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (!process.env[key]) {
      process.env[key] = rest.join('=').trim();
    }
  }
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function requireSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase 环境变量未配置');
  }
  return { supabaseUrl, serviceRoleKey };
}

async function handleRegister(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  let input;
  try {
    input = JSON.parse(await readBody(req));
  } catch {
    return sendJson(res, 400, { error: '报名信息格式不正确' });
  }

  const programId = input.program_id?.trim();
  const programTitle = input.program_title?.trim();
  const userName = input.user_name?.trim();
  const userPhone = input.user_phone?.trim();
  const userRole = input.user_role?.trim() ?? '';

  if (!programId || !programTitle || !userName || !/^1[3-9]\d{9}$/.test(userPhone ?? '')) {
    return sendJson(res, 400, { error: '请填写完整有效的报名信息' });
  }

  try {
    const { supabaseUrl, serviceRoleKey } = requireSupabase();
    const response = await fetch(`${supabaseUrl}/rest/v1/h5_registrations`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify([
        {
          program_id: programId,
          program_title: programTitle,
          user_name: userName,
          user_phone: userPhone,
          user_role: userRole,
          status: 'pending',
        },
      ]),
    });

    if (!response.ok) {
      return sendJson(res, response.status, { error: await response.text() });
    }

    const [created] = await response.json();
    return sendJson(res, 201, { data: created });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || '报名提交失败' });
  }
}

async function handleAdminRegistrations(req, res) {
  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const suppliedPassword = req.headers.authorization?.replace(/^Bearer\s+/i, '').trim();

  if (!adminPassword) {
    return sendJson(res, 500, { error: '后台密码未配置' });
  }

  if (!suppliedPassword || suppliedPassword !== adminPassword) {
    return sendJson(res, 401, { error: '后台密码不正确' });
  }

  try {
    const { supabaseUrl, serviceRoleKey } = requireSupabase();
    const response = await fetch(
      `${supabaseUrl}/rest/v1/h5_registrations?select=id,program_id,program_title,user_name,user_phone,user_role,status,created_at&order=created_at.desc`,
      {
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
      },
    );

    if (!response.ok) {
      return sendJson(res, response.status, { error: await response.text() });
    }

    return sendJson(res, 200, { data: await response.json() });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || '后台数据读取失败' });
  }
}

const server = createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/api/register') {
    handleRegister(req, res);
    return;
  }

  if (url.pathname === '/api/admin-registrations') {
    handleAdminRegistrations(req, res);
    return;
  }

  sendJson(res, 404, { error: 'Not found' });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`400 Box H5 API server listening on http://127.0.0.1:${port}`);
});
