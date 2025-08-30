import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-revalidate-token')
  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid token' } }, { status: 401 })
  }
  const { paths } = await req.json()
  // In real app: revalidate each path
  return NextResponse.json({ success: true, paths })
}
