export default function Page(){
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="ml-auto flex gap-2">
          <button className="btn btn-ghost">7d</button>
          <button className="btn btn-ghost">30d</button>
          <button className="btn btn-ghost">90d</button>
          <button className="btn btn-ghost">Custom</button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="kpi"><div className="kpi-title">Leads Today</div><div className="kpi-value">128 <span className="kpi-delta bg-green-100 text-green-800">+12%</span></div></div>
        <div className="kpi"><div className="kpi-title">Active Services</div><div className="kpi-value">6</div></div>
        <div className="kpi"><div className="kpi-title">Conversion Rate</div><div className="kpi-value">8.4%</div></div>
        <div className="kpi"><div className="kpi-title">Projects</div><div className="kpi-value">15</div></div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="mb-2 text-sm text-textmuted">Leads per week</div>
          <div className="h-64 rounded bg-[color:var(--surface-2)]" />
        </div>
        <div className="card">
          <div className="mb-2 text-sm text-textmuted">Leads by status</div>
          <div className="h-64 rounded bg-[color:var(--surface-2)]" />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="mb-3 text-sm text-textmuted">Activity</div>
          <ul className="space-y-2 text-sm">
            <li>• Ashraful updated Hero section (2h ago)</li>
            <li>• New lead from John Doe (4h ago)</li>
            <li>• Revalidated / and /work (6h ago)</li>
          </ul>
        </div>
        <div className="card">
          <div className="mb-3 text-sm text-textmuted">System Status</div>
          <div className="space-y-2 text-sm">
            <div>Email provider: ✅ Connected (Resend, last test 3h ago)</div>
            <div>API uptime: 99.9%</div>
            <div>Last backup: Yesterday</div>
          </div>
        </div>
      </section>

      <div className="flex gap-2">
        <button className="btn btn-ghost">Export CSV</button>
        <button className="btn btn-ghost">Export PNG</button>
      </div>
    </div>
  )
}
