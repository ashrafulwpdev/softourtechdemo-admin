"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(fd: FormData) {
  const title = String(fd.get("title")||"");
  const slug = String(fd.get("slug")||"");
  const content = String(fd.get("content")||"");
  await prisma.blogPost.create({ data: { title, slug, content } });
  revalidatePath("/blog");
}

export async function updatePost(id: number, fd: FormData) {
  const title = String(fd.get("title")||"");
  const slug = String(fd.get("slug")||"");
  const content = String(fd.get("content")||"");
  await prisma.blogPost.update({ where: { id }, data: { title, slug, content } });
  revalidatePath("/blog");
}

export async function deletePost(id: number) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
}
