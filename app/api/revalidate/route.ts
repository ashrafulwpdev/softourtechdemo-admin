import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-revalidate-token");
  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { paths } = await req.json();
  if (Array.isArray(paths)) {
    for (const p of paths) revalidatePath(p);
  }
  return NextResponse.json({ ok: true, revalidated: paths ?? [] });
}
