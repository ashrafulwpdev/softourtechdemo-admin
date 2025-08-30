import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import * as A from "./actions";

export const revalidate = 0;

export default async function Blog() {
  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: 'desc' } });

  async function updateAction(id: number, fd: FormData) { "use server"; await A.updatePost(id, fd); }
  async function deleteAction(id: number) { "use server"; await A.deletePost(id); }

  return (
    <div className="grid gap-4">
      <Card>
        <h2 className="text-lg font-semibold">New post</h2>
        <form action={A.createPost} className="grid gap-3 md:grid-cols-2 mt-3">
          <div><label className="label">Title</label><input name="title" className="input mt-1" required/></div>
          <div><label className="label">Slug</label><input name="slug" className="input mt-1" required/></div>
          <div className="md:col-span-2"><label className="label">Content</label><textarea name="content" className="input mt-1 h-40"/></div>
          <div className="md:col-span-2"><Button type="submit">Create</Button></div>
        </form>
      </Card>

      <div className="grid gap-4">
        {posts.map(p => (
          <Card key={p.id}>
            <form action={updateAction.bind(null, p.id)} className="grid gap-3 md:grid-cols-2">
              <div><label className="label">Title</label><input name="title" defaultValue={p.title} className="input mt-1"/></div>
              <div><label className="label">Slug</label><input name="slug" defaultValue={p.slug} className="input mt-1"/></div>
              <div className="md:col-span-2"><label className="label">Content</label><textarea name="content" defaultValue={p.content} className="input mt-1 h-40"/></div>
              <div className="md:col-span-2 flex gap-2">
                <Button type="submit">Save</Button>
                <form action={deleteAction.bind(null, p.id)}><Button variant="danger">Delete</Button></form>
              </div>
            </form>
          </Card>
        ))}
      </div>
    </div>
  );
}
