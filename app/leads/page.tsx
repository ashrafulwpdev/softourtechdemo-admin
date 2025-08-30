import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import * as A from "./actions";

export const revalidate = 0;

export default async function Leads() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });

  async function statusAction(id: string, fd: FormData) { "use server"; await A.updateLeadStatus(id, fd); }
  async function deleteAction(id: string) { "use server"; await A.deleteLead(id); }

  return (
    <div className="grid gap-4">
      <Card>
        <h2 className="text-lg font-semibold">New lead</h2>
        <form action={A.createLead} className="grid gap-3 md:grid-cols-2 mt-3">
          <div><label className="label">Name</label><input name="name" className="input mt-1" required/></div>
          <div><label className="label">Email</label><input name="email" type="email" className="input mt-1" required/></div>
          <div className="md:col-span-2"><label className="label">Message</label><input name="message" className="input mt-1"/></div>
          <div><label className="label">Service hint</label><input name="serviceHint" className="input mt-1"/></div>
          <div className="md:col-span-2"><Button type="submit">Add Lead</Button></div>
        </form>
      </Card>

      <div className="grid gap-3">
        {leads.map(l => (
          <Card key={l.id}>
            <div className="grid md:grid-cols-4 gap-3">
              <div><div className="text-sm text-[color:var(--text-muted)]">Name</div><div className="font-semibold">{l.name}</div></div>
              <div><div className="text-sm text-[color:var(--text-muted)]">Email</div><div>{l.email}</div></div>
              <div><div className="text-sm text-[color:var(--text-muted)]">Service</div><div>{l.serviceHint || "—"}</div></div>
              <form action={statusAction.bind(null, l.id)} className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="label">Status</label>
                  <select name="status" defaultValue={l.status} className="input mt-1">
                    <option>NEW</option>
                    <option>CONTACTED</option>
                    <option>QUALIFIED</option>
                    <option>WON</option>
                    <option>LOST</option>
                  </select>
                </div>
                <Button type="submit">Update</Button>
                <form action={deleteAction.bind(null, l.id)}><Button variant="danger">Delete</Button></form>
              </form>
            </div>
            {l.message ? <div className="mt-2 text-sm text-[color:var(--text-muted)]">“{l.message}”</div> : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
