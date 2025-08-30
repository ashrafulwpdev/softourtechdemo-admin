"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createService(fd: FormData) {
  const title = String(fd.get("title") || "");
  const iconKey = String(fd.get("iconKey") || "");
  const shortDesc = String(fd.get("shortDesc") || "");
  const bullets = String(fd.get("bullets") || "").split(",").map(s=>s.trim()).filter(Boolean);
  const active = fd.get("active") ? true : false;
  const order = Number(fd.get("order") || 0);
  await prisma.service.create({ data: { title, iconKey, shortDesc, bullets, active, order } });
  revalidatePath("/services");
}

export async function updateService(id: number, fd: FormData) {
  const title = String(fd.get("title") || "");
  const iconKey = String(fd.get("iconKey") || "");
  const shortDesc = String(fd.get("shortDesc") || "");
  const bullets = String(fd.get("bullets") || "").split(",").map(s=>s.trim()).filter(Boolean);
  const active = fd.get("active") ? true : false;
  const order = Number(fd.get("order") || 0);
  await prisma.service.update({ where: { id }, data: { title, iconKey, shortDesc, bullets, active, order } });
  revalidatePath("/services");
}

export async function deleteService(id: number) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/services");
}
