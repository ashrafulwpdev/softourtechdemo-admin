import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";

function percent(a: number, b: number) {
  if (b === 0) return "+0%";
  const p = ((a - b) / b) * 100;
  const s = p >= 0 ? "+" : "";
  return `${s}${p.toFixed(1)}%`;
}

export default async function Dashboard() {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7*24*60*60*1000);
  const twoWeeksAgo = new Date(now.getTime() - 14*24*60*60*1000);

  const [leads7, leadsPrev, services, projects] = await Promise.all([
    prisma.lead.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.lead.count({ where: { createdAt: { gte: twoWeeksAgo, lt: weekAgo } } }),
    prisma.service.count({ where: { active: true } }),
    prisma.project.count(),
  ]);

  // simple status distribution
  const byStatus = await prisma.lead.groupBy({ by: ['status'], _count: { status: true } });
  const statusData = byStatus.map(b => ({ label: b.status, value: b._count.status }));

  // simple weekly aggregation (last 8 weeks)
  const since = new Date(now.getTime() - 56*24*60*60*1000);
  const leads = await prisma.lead.findMany({ where: { createdAt: { gte: since } }, orderBy: { createdAt: 'asc' } });
  const map = new Map<string, number>();
  const fmt = (d: Date) => {
    const year = d.getUTCFullYear();
    const firstJan = new Date(Date.UTC(year,0,1));
    const day = Math.floor((+d - +firstJan)/86400000);
    const week = Math.floor((day+firstJan.getUTCDay())/7);
    return `${year}-W${String(week).padStart(2,"0")}`;
  };
  leads.forEach(l => {
    const k = fmt(l.createdAt);
    map.set(k, (map.get(k) ?? 0) + 1);
  });
  const weekly = Array.from(map.entries()).map(([label, value]) => ({ label, value }));

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Card><div className="text-sm text-[color:var(--text-muted)]">Leads (7d)</div><div className="text-3xl font-bold">{leads7}</div><div className="text-sm mt-1">{percent(leads7, leadsPrev)}</div></Card>
        <Card><div className="text-sm text-[color:var(--text-muted)]">Active Services</div><div className="text-3xl font-bold">{services}</div></Card>
        <Card><div className="text-sm text-[color:var(--text-muted)]">Projects</div><div className="text-3xl font-bold">{projects}</div></Card>
        <Card><div className="text-sm text-[color:var(--text-muted)]">Conversion %</div><div className="text-3xl font-bold">â€“</div></Card>
      </div>

      <Card>
        <div className="text-sm text-[color:var(--text-muted)] mb-2">Leads by status (sample)</div>
        <pre className="text-xs overflow-auto">{JSON.stringify(statusData, null, 2)}</pre>
      </Card>
      <Card>
        <div className="text-sm text-[color:var(--text-muted)] mb-2">Leads per week (sample)</div>
        <pre className="text-xs overflow-auto">{JSON.stringify(weekly.slice(-10), null, 2)}</pre>
      </Card>
    </div>
  );
}
