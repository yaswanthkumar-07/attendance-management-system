import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { weeklyTrend, departmentBreakdown, students } from "@/lib/mock-data";
import { Download } from "lucide-react";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, Legend,
} from "recharts";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — Presentia" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  const topStudents = [...students].sort((a, b) => b.attendance - a.attendance).slice(0, 8);
  return (
    <AppShell
      title="Reports"
      subtitle="Trends, comparisons and downloadable insights."
      actions={
        <button className="btn-primary h-9 px-3 rounded-lg text-sm inline-flex items-center gap-1.5">
          <Download className="h-4 w-4" /> Download PDF
        </button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass-panel rounded-2xl p-5">
          <div className="text-sm font-medium">Weekly attendance</div>
          <div className="text-xs text-muted-foreground mb-3">Present vs Absent</div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="present" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="absent" stroke="var(--color-chart-5)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <div className="text-sm font-medium">Top attendees</div>
          <div className="text-xs text-muted-foreground mb-3">By overall %</div>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={topStudents} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} width={120} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="attendance" fill="var(--color-chart-1)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {departmentBreakdown.map((d) => (
          <div key={d.name} className="glass-panel rounded-2xl p-5">
            <div className="text-xs text-muted-foreground">{d.name}</div>
            <div className="mt-1 text-2xl font-semibold">{d.value} faculty</div>
            <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full" style={{ width: `${d.value * 20}%`, background: d.color }} />
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
