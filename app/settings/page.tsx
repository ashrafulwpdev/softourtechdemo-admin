import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const revalidate = 0;

async function save(fd: FormData) {
  "use server";
  const siteName = String(fd.get("siteName")||"");
  const tagline = String(fd.get("tagline")||"");
  const defaultTitle = String(fd.get("defaultTitle")||"");
  const defaultDesc = String(fd.get("defaultDesc")||"");
  const ogImageURL = String(fd.get("ogImageURL")||"");
  const twitter = String(fd.get("twitter")||"");
  const theme = String(fd.get("theme")||"auto");
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, siteName, tagline, defaultTitle, defaultDesc, ogImageURL, twitter, theme },
    update: { siteName, tagline, defaultTitle, defaultDesc, ogImageURL, twitter, theme },
  });
  revalidatePath("/settings");
  redirect("/settings");
}

export default async function Settings() {
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return (
    <div className="grid gap-4">
      <Card>
        <h2 className="text-lg font-semibold">Site settings</h2>
        <form action={save} className="mt-3 grid gap-3 md:grid-cols-2">
          <div><label className="label">Site name</label><input name="siteName" defaultValue={s?.siteName ?? ''} className="input mt-1"/></div>
          <div><label className="label">Tagline</label><input name="tagline" defaultValue={s?.tagline ?? ''} className="input mt-1"/></div>
          <div className="md:col-span-2"><label className="label">Default title</label><input name="defaultTitle" defaultValue={s?.defaultTitle ?? ''} className="input mt-1"/></div>
          <div className="md:col-span-2"><label className="label">Default description</label><input name="defaultDesc" defaultValue={s?.defaultDesc ?? ''} className="input mt-1"/></div>
          <div className="md:col-span-2"><label className="label">OG Image URL</label><input name="ogImageURL" defaultValue={s?.ogImageURL ?? ''} className="input mt-1"/></div>
          <div><label className="label">Twitter</label><input name="twitter" defaultValue={s?.twitter ?? ''} className="input mt-1"/></div>
          <div>
            <label className="label">Theme</label>
            <select name="theme" defaultValue={s?.theme ?? 'auto'} className="input mt-1">
              <option value="auto">Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="md:col-span-2"><Button type="submit">Save</Button></div>
        </form>
      </Card>
    </div>
  );
}
