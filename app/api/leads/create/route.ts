import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, sourceUrl, utmSource } = body || {};
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    const row = await prisma.lead.create({
      data: { name, email, message, sourceUrl, utmSource }
    });
    return NextResponse.json({ ok: true, id: row.id });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
}
