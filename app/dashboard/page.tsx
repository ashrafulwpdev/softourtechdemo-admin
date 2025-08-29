import { Container, Card } from "@/components/ui";
import ChartLine from "@/components/ChartLine";
import { prisma } from "@/lib/prisma";

export const revalidate = 30;

export default async function Dashboard() {
  const totalLeads = await prisma.lead.count();
  const activeServices = await prisma.service.count({ where: { active: true } });

  const statuses = await prisma.lead.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  const chart = [
    { label: "New", value: statuses.find(r => r.status === "NEW")?._count.status ?? 0 },
    { label: "Contacted", value: statuses.find(r => r.status === "CONTACTED")?._count.status ?? 0 },
    { label: "Qualified", value: statuses.find(r => r.status === "QUALIFIED")?._count.status ?? 0 },
    { label: "Won", value: statuses.find(r => r.status === "WON")?._count.status ?? 0 },
    { label: "Lost", value: statuses.find(r => r.status === "LOST")?._count.status ?? 0 },
  ];

  return (
    <main>
      <section className="section">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            <Card><div className="text-sm text-slate-500">Total Leads</div><div className="mt-1 text-3xl font-bold">{totalLeads}</div></Card>
            <Card><div className="text-sm text-slate-500">Active Services</div><div className="mt-1 text-3xl font-bold">{activeServices}</div></Card>
            <Card><div className="text-sm text-slate-500">Conversion</div><div className="mt-1 text-3xl font-bold">—</div></Card>
          </div>

          <Card className="mt-6">
            <div className="mb-3 text-sm text-slate-500">Leads by status</div>
            <ChartLine data={chart} />
          </Card>
        </Container>
      </section>
    </main>
  );
}
