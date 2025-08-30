"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addPlan(fd: FormData) {
  const serviceId = Number(fd.get("serviceId"));
  const name = String(fd.get("name")||"");
  const currency = String(fd.get("currency")||"USD");
  const priceText = String(fd.get("priceText")||"");
  const features = String(fd.get("features")||"").split(",").map(s=>s.trim()).filter(Boolean);
  const order = Number(fd.get("order")||0);
  const popular = !!fd.get("popular");
  await prisma.servicePlan.create({ data: { serviceId, name, currency, priceText, features, order, popular } });
  revalidatePath("/pricing");
}

export async function updatePlan(id: number, fd: FormData) {
  const name = String(fd.get("name")||"");
  const currency = String(fd.get("currency")||"USD");
  const priceText = String(fd.get("priceText")||"");
  const features = String(fd.get("features")||"").split(",").map(s=>s.trim()).filter(Boolean);
  const order = Number(fd.get("order")||0);
  const popular = !!fd.get("popular");
  await prisma.servicePlan.update({ where: { id }, data: { name, currency, priceText, features, order, popular } });
  revalidatePath("/pricing");
}

export async function deletePlan(id: number) {
  await prisma.servicePlan.delete({ where: { id } });
  revalidatePath("/pricing");
}
