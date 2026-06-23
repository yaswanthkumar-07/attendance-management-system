import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { AppShell, Badge, TableShell } from "@/components/app-shell";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/students")({
  head: () => ({ meta: [{ title: "Students — Presentia" }] }),
  component: StudentsPage,
});

function StudentsPage() {
  const [q, setQ] = useState("");
const [students, setStudents] = useState<any[]>([]);

useEffect(() => {
  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");

      const formattedStudents = res.data.students.map((s: any) => ({
        id: s._id,
        rollNo: s.rollNumber,
        name: s.name,
        email: s.email,
        department: s.department,
        year: s.year,
        section: s.section,
        attendance: 85,
        avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(s.name)}`
      }));

      setStudents(formattedStudents);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  fetchStudents();
}, []);

const rows = students.filter(
    (s) =>
      s.name.toLowerCase().includes(q.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(q.toLowerCase()) ||
      s.department.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AppShell
      title="Students"
      subtitle="Manage student profiles, sections and attendance status."
      actions={
        <button className="btn-primary h-9 px-3 rounded-lg text-sm inline-flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Add student
        </button>
      }
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, roll no, department…"
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-input/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
          />
        </div>
        <button className="h-10 px-3 rounded-lg border border-border text-sm inline-flex items-center gap-1.5 hover:bg-accent/40">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      <TableShell>
        <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="text-left px-5 py-3">Student</th>
            <th className="text-left px-5 py-3">Roll No</th>
            <th className="text-left px-5 py-3">Department</th>
            <th className="text-left px-5 py-3">Year/Sec</th>
            <th className="text-left px-5 py-3">Attendance</th>
            <th className="text-right px-5 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.id} className="border-t border-border/60 hover:bg-accent/20 transition">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={s.avatar} alt="" className="h-9 w-9 rounded-full bg-muted shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium truncate">{s.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{s.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3 font-mono text-xs">{s.rollNo}</td>
              <td className="px-5 py-3">{s.department}</td>
              <td className="px-5 py-3">Y{s.year} · {s.section}</td>
              <td className="px-5 py-3">
                <div className="flex items-center gap-2 min-w-[140px]">
                  <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${s.attendance}%`,
                        background: s.attendance >= 80 ? "var(--success)" : s.attendance >= 70 ? "var(--warning)" : "var(--destructive)",
                      }}
                    />
                  </div>
                  <Badge tone={s.attendance >= 80 ? "success" : s.attendance >= 70 ? "warning" : "danger"}>
                    {s.attendance}%
                  </Badge>
                </div>
              </td>
              <td className="px-5 py-3 text-right">
                <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-accent/60 ml-auto">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">No students match your search.</td></tr>
          )}
        </tbody>
      </TableShell>
    </AppShell>
  );
}