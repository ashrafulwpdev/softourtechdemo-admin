import { NextResponse } from 'next/server'

export async function POST() {
  // Stub test; in real app call provider and measure latency
  return NextResponse.json({ success: true, latencyMs: 120 })
}
