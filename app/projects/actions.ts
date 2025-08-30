"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(fd: FormData) {
  const title = String(fd.get("title")||"");
  const slug = String(fd.get("slug")||"");
  const summary = String(fd.get("summary")||"");
  const tags = String(fd.get("tags")||"").split(",").map(s=>s.trim()).filter(Boolean);
  await prisma.project.create({ data: { title, slug, summary, images: [], tags } });
  revalidatePath("/projects");
  redirect("/projects");
}

export async function updateProject(id: number, fd: FormData) {
  const title = String(fd.get("title")||"");
  const slug = String(fd.get("slug")||"");
  const summary = String(fd.get("summary")||"");
  const tags = String(fd.get("tags")||"").split(",").map(s=>s.trim()).filter(Boolean);
  await prisma.project.update({ where: { id }, data: { title, slug, summary, tags } });
  revalidatePath("/projects");
}

export async function deleteProject(id: number) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projects");
}
