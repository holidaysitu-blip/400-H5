type RegistrationRow = {
  id: string;
  program_id: string;
  program_title: string;
  user_name: string;
  user_phone: string;
  user_role: string | null;
  status: string;
  created_at: string;
};

declare const Netlify: {
  env?: {
    get(name: string): string | undefined;
  };
};
declare const process: {
  env: Record<string, string | undefined>;
};

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

function getEnv(name: string) {
  return Netlify.env?.get(name) ?? process.env[name];
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

export default async (req: Request) => {
  if (req.method !== 'GET') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const adminPassword = getEnv('ADMIN_PASSWORD');
  const suppliedPassword = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();

  if (!adminPassword) {
    return json({ error: '后台密码未配置' }, 500);
  }

  if (!suppliedPassword || suppliedPassword !== adminPassword) {
    return json({ error: '后台密码不正确' }, 401);
  }

  const supabaseUrl = getEnv('SUPABASE_URL');
  const serviceRoleKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !serviceRoleKey) {
    return json({ error: 'Supabase 后台读取密钥未配置' }, 500);
  }

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
    return json({ error: await response.text() }, response.status);
  }

  const data = (await response.json()) as RegistrationRow[];
  return json({ data });
};

export const config = {
  path: '/api/admin-registrations',
};
