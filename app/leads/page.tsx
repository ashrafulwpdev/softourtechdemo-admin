import { prisma } from "@/lib/prisma";
import { Container, Card } from "@/components/ui";

export const revalidate = 0;

export default async function Leads() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 50 });

  return (
    <main className="section">
      <Container>
        <h1 className="text-2xl font-bold">Leads</h1>
        <div className="mt-4 grid gap-3">
          {leads.map(l => (
            <Card key={l.id}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{l.name} · <span className="text-sm text-slate-500">{l.email}</span></div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">{l.message}</div>
                  <div className="text-xs text-slate-500 mt-1">{l.status} · {new Date(l.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </Card>
          ))}
          {leads.length === 0 && <div className="text-slate-500">No leads yet.</div>}
        </div>
      </Container>
    </main>
  );
}
