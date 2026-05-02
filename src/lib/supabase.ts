const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://lciwdfypdxkcptjvixce.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'sb_publishable_8Fgoevaj0Tz279g4StjiRg_2LY3Kl49';

export function getSupabaseProjectRef() {
  try {
    return new URL(supabaseUrl).hostname.split('.')[0];
  } catch {
    return 'unknown';
  }
}

export async function insertSupabase(table: string, rows: Record<string, unknown>[]) {
  if (!supabaseAnonKey) {
    throw new Error('Missing VITE_SUPABASE_ANON_KEY. Please configure the Supabase publishable key.');
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(rows),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase insert failed: ${response.status}`);
  }
}
