export type Program = {
  id: string;
  title: string;
  description: string;
  price?: number;
  category: '住宿礼包' | '社群活动';
  dateInfo: string;
  location: string;
  tag?: string;
  includes: string[];
  note?: string;
  requireIdea?: boolean;
};

export type Registration = {
  id: string;
  programId: string;
  programTitle: string;
  name: string;
  phone: string;
  role: string;
  createdAt: string;
  status: 'pending' | 'confirmed';
  synced?: boolean;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  topic?: string;
  createdAt?: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  count: number;
};

const keys = {
  registrations: 'box400.registrations',
  favorites: 'box400.favorites',
  notes: 'box400.notes',
  cart: 'box400.cart',
};

export const programs: Program[] = [
  {
    id: 'spring-2d',
    title: '2天体验套餐',
    description: '299元短住体验，适合先到社区看看环境、认识同伴，并用两天推进一个小目标。',
    price: 299,
    category: '住宿礼包',
    dateInfo: '2天1晚',
    location: '苏州OPC社区',
    tag: '299元 / 2天',
    includes: ['舒适单人间1晚', '一人独立工位2天', '拎包入住，Wi-Fi、水电全免', '100元算力券', 'AI编程卡片书1本', '《openclaw成长书》1份'],
  },
  {
    id: 'spring-week',
    title: '7天共创套餐',
    description: '599元连续共创，适合带着项目或想法集中推进一周。',
    price: 599,
    category: '住宿礼包',
    dateInfo: '7天6晚',
    location: '苏州OPC社区',
    tag: '599元 / 7天',
    includes: ['舒适单人间6晚', '一人独立工位7天', '拎包入住，Wi-Fi、水电全免', '200元算力券'],
    note: '三选一：龙虾skills礼包 / AI工具礼包 / 算力礼包',
  },
];

function read<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event('box400-storage'));
}

export function getRegistrations() {
  return read<Registration[]>(keys.registrations, []);
}

export async function saveRegistration(input: Omit<Registration, 'id' | 'createdAt' | 'status' | 'synced'>) {
  const item: Registration = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'pending',
    synced: false,
  };

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      program_id: input.programId,
      program_title: input.programTitle,
      user_name: input.name,
      user_phone: input.phone,
      user_role: input.role || '',
    }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || 'Registration submit failed');
  }

  item.synced = true;
  write(keys.registrations, [item, ...getRegistrations()]);
  return item;
}

export function getFavorites() {
  return read<string[]>(keys.favorites, []);
}

export function toggleFavorite(id: string) {
  const current = getFavorites();
  const next = current.includes(id) ? current.filter((item) => item !== id) : [id, ...current];
  write(keys.favorites, next);
  return next.includes(id);
}

export function getNotes() {
  return read<Note[]>(keys.notes, []);
}

export function saveNote(input: Omit<Note, 'id' | 'createdAt'>) {
  const item: Note = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  write(keys.notes, [item, ...getNotes()]);
  return item;
}

export function getCart() {
  return read<CartItem[]>(keys.cart, []);
}

export function addToCart(item: Omit<CartItem, 'count'>) {
  const current = getCart();
  const existing = current.find((cartItem) => cartItem.id === item.id);
  const next = existing
    ? current.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, count: cartItem.count + 1 } : cartItem))
    : [{ ...item, count: 1 }, ...current];
  write(keys.cart, next);
  return next;
}

export function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.count, 0);
}
