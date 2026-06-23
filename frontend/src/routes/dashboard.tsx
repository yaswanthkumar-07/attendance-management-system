import { createFileRoute } from "@tanstack/react-router";
import { AppShell, StatCard, Badge } from "@/components/app-shell";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { weeklyTrend, departmentBreakdown, modeDistribution } from "@/lib/mock-data";
import { GraduationCap, Users, BookOpen, ClipboardCheck, Plus, Download } from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Presentia" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalSubjects: 0,
    totalAttendance: 0,
    activeSessions: 0,
  });
const [recentSessions, setRecentSessions] = useState<any[]>([]);
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [students, faculty, subjects, attendance, sessions] =
          await Promise.all([
            api.get("/students"),
            api.get("/faculties"),
            api.get("/subjects"),
            api.get("/attendance"),
            api.get("/sessions"),
          ]);

        setStats({
          totalStudents: students.data.count || 0,
          totalFaculty: faculty.data.count || 0,
          totalSubjects: subjects.data.count || 0,
          totalAttendance: attendance.data.count || 0,
          activeSessions: sessions.data.count || 0,
        });
        setRecentSessions(sessions.data.sessions || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadDashboard();
  }, []);
  return (
    <AppShell
      title="Dashboard"
      subtitle="Welcome back — here's what's happening across your institution today."
      actions={
        <>
          <button className="h-9 px-3 rounded-lg border border-border text-sm hover:bg-accent/40 inline-flex items-center gap-1.5">
            <Download className="h-4 w-4" /> Export
          </button>
          <button className="btn-primary h-9 px-3 rounded-lg text-sm inline-flex items-center gap-1.5">
            <Plus className="h-4 w-4" /> New session
          </button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Students" value={stats.totalStudents} delta="+3 this week" icon={GraduationCap} />
        <StatCard label="Total Faculty" value={stats.totalFaculty} delta="+1 this month" icon={Users}
          accent="linear-gradient(135deg, oklch(0.65 0.20 200), oklch(0.55 0.20 240))" />
        <StatCard label="Total Subjects" value={stats.totalSubjects} delta="2 new offerings" icon={BookOpen}
          accent="linear-gradient(135deg, oklch(0.72 0.18 145), oklch(0.6 0.18 175))" />
        <StatCard label="Total Attendance" value={stats.totalAttendance} delta="Live Data" icon={ClipboardCheck}
          accent="linear-gradient(135deg, oklch(0.78 0.16 75), oklch(0.65 0.20 35))" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass-panel rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-medium">Attendance trend</div>
              <div className="text-xs text-muted-foreground">Present vs Absent · last 7 days</div>
            </div>
            <Badge tone="info">This week</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={weeklyTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-5)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-5)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
                />
                <Area type="monotone" dataKey="present" stroke="var(--color-chart-1)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="absent" stroke="var(--color-chart-5)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <div className="text-sm font-medium">Departments</div>
          <div className="text-xs text-muted-foreground mb-2">Faculty distribution</div>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={departmentBreakdown} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {departmentBreakdown.map((d, i) => (
                    <Cell key={i} fill={d.color} stroke="var(--color-background)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {departmentBreakdown.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                <span className="text-muted-foreground">{d.name}</span>
                <span className="ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass-panel rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium">Recent sessions</div>
            <Badge tone="info">{stats.activeSessions} active</Badge>
          </div>
          <div className="space-y-2">
            {recentSessions.slice(0, 5).map((s) => {
              const pct = 0;
              return (
                <div key={s.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 p-3 rounded-xl border border-border/60 bg-background/40">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{s.subject?.subjectName}</span>
                      <Badge
  tone={
    s.status === "active"
      ? "success"
      : s.status === "scheduled"
      ? "warning"
      : "default"
  }
>
  {s.status}
</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {s.faculty?.name} · {new Date(s.startTime).toLocaleDateString()} · {new Date(s.startTime).toLocaleTimeString()} · {s.mode}
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full btn-primary" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold">0/0</div>
                    <div className="text-xs text-muted-foreground">{pct}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <div className="text-sm font-medium">Attendance mode</div>
          <div className="text-xs text-muted-foreground mb-2">This week</div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={modeDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="mode" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="count" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
