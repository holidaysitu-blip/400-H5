type RegistrationInput = {
  program_id?: string;
  program_title?: string;
  user_name?: string;
  user_phone?: string;
  user_role?: string;
};

declare const Netlify: {
  env?: {
    get(name: string): string | undefined;
  };
};
declare const process: {
  env: Record<string, string | undefined>;
};

function getEnv(name: string) {
  return Netlify.env?.get(name) ?? process.env[name];
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const input = (await req.json().catch(() => null)) as RegistrationInput | null;

  if (!input) {
    return json({ error: '报名信息格式不正确' }, 400);
  }

  const programId = input.program_id?.trim();
  const programTitle = input.program_title?.trim();
  const userName = input.user_name?.trim();
  const userPhone = input.user_phone?.trim();
  const userRole = input.user_role?.trim() ?? '';

  if (!programId || !programTitle || !userName || !/^1[3-9]\d{9}$/.test(userPhone ?? '')) {
    return json({ error: '请填写完整有效的报名信息' }, 400);
  }

  const supabaseUrl = getEnv('SUPABASE_URL');
  const serviceRoleKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !serviceRoleKey) {
    return json({ error: 'Supabase 写入密钥未配置' }, 500);
  }

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
    return json({ error: await response.text() }, response.status);
  }

  const [created] = await response.json();
  return json({ data: created }, 201);
};

export const config = {
  path: '/api/register',
};
