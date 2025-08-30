"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLead(fd: FormData) {
  const name = String(fd.get("name")||"");
  const email = String(fd.get("email")||"");
  const message = String(fd.get("message")||"");
  const serviceHint = String(fd.get("serviceHint")||"");
  await prisma.lead.create({ data: { name, email, message, serviceHint } });
  revalidatePath("/leads");
}

export async function updateLeadStatus(id: string, fd: FormData) {
  const status = String(fd.get("status")||"NEW") as any;
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/leads");
}

export async function deleteLead(id: string) {
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/leads");
}
