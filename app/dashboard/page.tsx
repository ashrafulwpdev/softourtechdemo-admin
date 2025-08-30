import { Container, Card } from "@/components/ui/server";
import { prisma } from "@/lib/prisma";
import Chart from "@/components/ChartLine";

export const revalidate = 30;

export default async function Dashboard() {
  const totalLeads = await prisma.lead.count();
  const activeServices = await prisma.service.count({ where: { active: true } });

  const byStatus = await prisma.lead.groupBy({ by: ["status"], _count: { status: true } });
  const chart = [
    { label: "New", value: byStatus.find(x => x.status === "NEW")?._count.status ?? 0 },
    { label: "Contacted", value: byStatus.find(x => x.status === "CONTACTED")?._count.status ?? 0 },
    { label: "Qualified", value: byStatus.find(x => x.status === "QUALIFIED")?._count.status ?? 0 },
    { label: "Won", value: byStatus.find(x => x.status === "WON")?._count.status ?? 0 },
    { label: "Lost", value: byStatus.find(x => x.status === "LOST")?._count.status ?? 0 },
  ];

  return (
    <main className="py-8">
      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          <Card><div className="text-sm text-slate-500">Total Leads</div><div className="mt-1 text-3xl font-bold">{totalLeads}</div></Card>
          <Card><div className="text-sm text-slate-500">Active Services</div><div className="mt-1 text-3xl font-bold">{activeServices}</div></Card>
          <Card><div className="text-sm text-slate-500">Conversion</div><div className="mt-1 text-3xl font-bold">—</div></Card>
        </div>

        <Card className="mt-6">
          <div className="mb-3 text-sm text-slate-500">Leads by status</div>
          <Chart data={chart} />
        </Card>
      </Container>
    </main>
  );
}