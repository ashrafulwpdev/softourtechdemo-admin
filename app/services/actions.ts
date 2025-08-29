"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const SvcSchema = z.object({
  title: z.string().min(2),
  iconKey: z.string().min(1),
  shortDesc: z.string().min(4),
  bullets: z.string().optional(), // comma separated
  listOrder: z.coerce.number().default(0),
  active: z.coerce.boolean().default(true),
});

export async function createService(formData: FormData) {
  const parsed = SvcSchema.safeParse(Object.fromEntries(formData as any));
  if (!parsed.success) return { ok: false, error: "Invalid input" };
  const { title, iconKey, shortDesc, bullets, listOrder, active } = parsed.data;
  await prisma.service.create({
    data: {
      title, iconKey, shortDesc,
      bullets: bullets ? bullets.split(",").map(s => s.trim()).filter(Boolean) : [],
      listOrder, active
    }
  });
  revalidatePath("/services");
  return { ok: true };
}

export async function updateService(id: number, formData: FormData) {
  const parsed = SvcSchema.safeParse(Object.fromEntries(formData as any));
  if (!parsed.success) return { ok: false, error: "Invalid input" };
  const { title, iconKey, shortDesc, bullets, listOrder, active } = parsed.data;
  await prisma.service.update({
    where: { id },
    data: {
      title, iconKey, shortDesc,
      bullets: bullets ? bullets.split(",").map(s => s.trim()).filter(Boolean) : [],
      listOrder, active
    }
  });
  revalidatePath("/services");
  return { ok: true };
}

export async function deleteService(id: number) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/services");
  return { ok: true };
}
