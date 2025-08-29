import { prisma } from "@/lib/prisma";
import { Container, Card } from "@/components/ui/server";
import { Button } from "@/components/ui/client";
import { createServiceAction, updateServiceAction, deleteServiceAction } from "./actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Services() {
  const services = await prisma.service.findMany({ orderBy: { listOrder: "asc" } });

  return (
    <main className="section">
      <Container>
        <h1 className="text-2xl font-bold">Services</h1>

        {/* Create */}
        <Card className="mt-4">
          <h2 className="text-lg font-semibold">Create new</h2>
          <form action={createServiceAction} className="mt-3 grid gap-3 md:grid-cols-2">
            <input name="title" placeholder="Title" className="rounded-xl border px-3 py-2" required />
            <input name="iconKey" placeholder="Icon key (e.g., Code2)" className="rounded-xl border px-3 py-2" required />
            <input name="shortDesc" placeholder="Short description" className="rounded-xl border px-3 py-2 md:col-span-2" required />
            <input name="bullets" placeholder="Bullets (comma separated)" className="rounded-xl border px-3 py-2 md:col-span-2" />
            <input name="listOrder" type="number" placeholder="Order" className="rounded-xl border px-3 py-2" />
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" name="active" defaultChecked /> Active
            </label>
            <div className="md:col-span-2"><Button type="submit">Add Service</Button></div>
          </form>
        </Card>

        {/* List / Edit */}
        <div className="mt-6 grid gap-4">
          {services.map(s => (
            <Card key={s.id}>
              <form action={updateServiceAction} className="grid gap-3 md:grid-cols-2">
                <input type="hidden" name="id" defaultValue={String(s.id)} />
                <input name="title" defaultValue={s.title} className="rounded-xl border px-3 py-2" />
                <input name="iconKey" defaultValue={s.iconKey} className="rounded-xl border px-3 py-2" />
                <input name="shortDesc" defaultValue={s.shortDesc} className="rounded-xl border px-3 py-2 md:col-span-2" />
                <input name="bullets" defaultValue={s.bullets.join(", ")} className="rounded-xl border px-3 py-2 md:col-span-2" />
                <input name="listOrder" type="number" defaultValue={s.listOrder} className="rounded-xl border px-3 py-2" />
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" name="active" defaultChecked={s.active} /> Active
                </label>
                <div className="flex gap-2 md:col-span-2">
                  <Button type="submit">Save</Button>
                  <form action={deleteServiceAction}>
                    <input type="hidden" name="id" value={String(s.id)} />
                    <Button type="submit" className="bg-red-600 hover:bg-red-500">Delete</Button>
                  </form>
                </div>
              </form>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}