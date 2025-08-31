export type Device = {
  id: string;
  name: string;
  remember: boolean;
  lastActive: number;      // ms epoch
  signedOutAt?: number|null;
};

const DEVICES_KEY = "eduos_devices";
const ID_KEY = "eduos_device_id";
const NAME_KEY = "eduos_device_name";
const REM_KEY = "eduos_remember";

export function getDeviceId(): string {
  let id = localStorage.getItem(ID_KEY);
  if (!id) {
    id = (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2));
    localStorage.setItem(ID_KEY, id);
  }
  return id;
}
export function getDeviceName(): string {
  let name = localStorage.getItem(NAME_KEY);
  if (!name) {
    name = navigator.userAgent;
    localStorage.setItem(NAME_KEY, name);
  }
  return name;
}
export function getRemember(): boolean {
  return localStorage.getItem(REM_KEY) === "1";
}

export function getDevices(): Device[] {
  try {
    const raw = localStorage.getItem(DEVICES_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as Device[];
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}

export function saveDevices(list: Device[]) {
  localStorage.setItem(DEVICES_KEY, JSON.stringify(list));
}

export function upsertCurrentDevice(opts?: { remember?: boolean }) {
  const id = getDeviceId();
  const name = getDeviceName();
  const remember = opts?.remember ?? getRemember();
  const now = Date.now();

  const list = getDevices();
  const idx = list.findIndex(d => d.id === id);
  const base: Device = { id, name, remember, lastActive: now, signedOutAt: null };

  if (idx === -1) list.push(base);
  else list[idx] = { ...list[idx], name, remember, lastActive: now, signedOutAt: null };

  saveDevices(list);
}

export function heartbeatCurrent() {
  const id = getDeviceId();
  const list = getDevices();
  const idx = list.findIndex(d => d.id === id);
  if (idx !== -1) {
    list[idx].lastActive = Date.now();
    saveDevices(list);
  }
  // keep old per-tab heartbeat for compatibility with your existing code
  localStorage.setItem(`eduos_heartbeat_${id}`, String(Date.now()));
}

export function markCurrentSignedOut() {
  const id = getDeviceId();
  const list = getDevices();
  const idx = list.findIndex(d => d.id === id);
  if (idx !== -1) {
    list[idx].signedOutAt = Date.now();
    saveDevices(list);
  }
  // optional: clear old heartbeat keys
  Object.keys(localStorage).forEach(k => {
    if (k.startsWith("eduos_heartbeat_")) localStorage.removeItem(k);
  });
}

/** Helper to compute color for a given device */
export function colorForDevice(d: Device): string {
  const now = Date.now();
  const delta = now - (d.lastActive || 0);
  const signedOut = d.signedOutAt && (d.signedOutAt > (d.lastActive || 0));
  if (signedOut) return "#EF4444";             // red = this device signed out
  if (delta < 2 * 60_000) return "#16A34A";    // green < 2m
  if (delta < 10 * 60_000) return "#F97316";   // orange 2–10m
  return "#EF4444";                             // red >10m
}
