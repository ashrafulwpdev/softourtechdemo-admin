"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { callPublicRevalidate } from "@/lib/revalidate-public";

const SvcSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(2),
  iconKey: z.string().min(1),
  shortDesc: z.string().min(4),
  bullets: z.string().optional(),
  listOrder: z.coerce.number().default(0),
  active: z.boolean().default(true),
});

function parse(formData: FormData) {
  const obj: any = Object.fromEntries(formData as any);
  // normalize checkbox
  obj.active = formData.get("active") !== null && formData.get("active") !== "false";
  return SvcSchema.safeParse(obj);
}

function parseBullets(bullets?: string): string[] {
  return bullets
    ? bullets.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];
}

export async function createServiceAction(formData: FormData): Promise<void> {
  const parsed = parse(formData);
  if (!parsed.success) return;
  const { title, iconKey, shortDesc, bullets, listOrder, active } = parsed.data;

  await prisma.service.create({
    data: {
      title,
      iconKey,
      shortDesc,
      bullets: parseBullets(bullets),
      listOrder,
      active,
    },
  });

  revalidatePath("/services");
  await callPublicRevalidate?.(["/"]);
}

export async function updateServiceAction(formData: FormData): Promise<void> {
  const parsed = parse(formData);
  if (!parsed.success || !parsed.data.id) return;
  const { id, title, iconKey, shortDesc, bullets, listOrder, active } = parsed.data as any;

  await prisma.service.update({
    where: { id },
    data: {
      title,
      iconKey,
      shortDesc,
      bullets: parseBullets(bullets),
      listOrder,
      active,
    },
  });

  revalidatePath("/services");
  await callPublicRevalidate?.(["/"]);
}

export async function deleteServiceAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!id) return;

  await prisma.service.delete({ where: { id } });

  revalidatePath("/services");
  await callPublicRevalidate?.(["/"]);
}
