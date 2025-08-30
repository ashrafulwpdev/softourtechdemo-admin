import { NextRequest, NextResponse } from "next/server";
import { Resend } from "@resend/resend";

export async function POST(req: NextRequest) {
  const { to, subject = "Softourtech Test", html = "<p>Test OK</p>" } = await req.json();
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return NextResponse.json({ ok: false, error: "RESEND_API_KEY missing" }, { status: 400 });
  }
  const resend = new Resend(RESEND_API_KEY);
  try {
    const r = await resend.emails.send({
      from: "Softourtech <noreply@softourtech.com>",
      to: [to],
      subject,
      html
    });
    return NextResponse.json({ ok: true, id: r.data?.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
