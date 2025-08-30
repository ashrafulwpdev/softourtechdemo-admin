export async function callPublicRevalidate(paths: string[]) {
  const url = process.env.PUBLIC_REVALIDATE_URL
  const token = process.env.REVALIDATE_TOKEN
  if (!url || !token) return
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-revalidate-token': token },
      body: JSON.stringify({ paths }),
      cache: 'no-store'
    })
  } catch { /* ignore */ }
}
