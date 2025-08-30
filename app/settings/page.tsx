import { prisma } from "@/lib/prisma";
import { Container, Card } from "@/components/ui/server";
import { SubmitButton } from "@/components/ui/client";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function save(formData: FormData) {
  "use server";
  const siteName = String(formData.get("siteName") || "");
  const tagline = String(formData.get("tagline") || "");
  const defaultTitle = String(formData.get("defaultTitle") || "");
  const defaultDesc = String(formData.get("defaultDesc") || "");
  const ogImageURL = String(formData.get("ogImageURL") || "");
  const twitter = String(formData.get("twitter") || "");
  const theme = String(formData.get("theme") || "auto");

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, siteName, tagline, defaultTitle, defaultDesc, ogImageURL, twitter, theme },
    update: { siteName, tagline, defaultTitle, defaultDesc, ogImageURL, twitter, theme }
  });
  revalidatePath("/settings");
}

export default async function Settings() {
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });

  return (
    <main className="py-8">
      <Container>
        <h1 className="text-2xl font-bold">Site Settings</h1>
        <Card className="mt-4">
          <form action={save} className="grid gap-3 md:grid-cols-2">
            <input name="siteName" defaultValue={s?.siteName ?? ""} placeholder="Site name" className="rounded-xl border px-3 py-2" />
            <input name="tagline" defaultValue={s?.tagline ?? ""} placeholder="Tagline" className="rounded-xl border px-3 py-2" />
            <input name="defaultTitle" defaultValue={s?.defaultTitle ?? ""} placeholder="Default meta title" className="rounded-xl border px-3 py-2 md:col-span-2" />
            <input name="defaultDesc" defaultValue={s?.defaultDesc ?? ""} placeholder="Default meta description" className="rounded-xl border px-3 py-2 md:col-span-2" />
            <input name="ogImageURL" defaultValue={s?.ogImageURL ?? ""} placeholder="OG Image URL" className="rounded-xl border px-3 py-2 md:col-span-2" />
            <input name="twitter" defaultValue={s?.twitter ?? ""} placeholder="Twitter handle" className="rounded-xl border px-3 py-2" />
            <select name="theme" defaultValue={s?.theme ?? "auto"} className="rounded-xl border px-3 py-2">
              <option value="auto">Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
            <div className="md:col-span-2"><SubmitButton>Save changes</SubmitButton></div>
          </form>
        </Card>
      </Container>
    </main>
  );
}