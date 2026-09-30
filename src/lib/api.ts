const API = import.meta.env.VITE_API_URL as string | undefined
export async function load<T>(path: string, fallback: T): Promise<T> {
  if (!API) return fallback
  try { const r = await fetch(API + path); if (!r.ok) throw new Error(); return (await r.json()) as T } catch { return fallback }
}
export async function sendAppointment(data: Record<string, string>) {
  if (!API) throw new Error('no-api')
  const r = await fetch(API + '/appointments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  if (!r.ok) throw new Error('failed')
}
