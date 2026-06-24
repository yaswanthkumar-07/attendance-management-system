import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";      // Update this path if necessary
import { TableShell } from "@/components/ui/table-shell"; // Update this path if necessary
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export const Route = createFileRoute("/attendance")({
  head: () => ({ meta: [{ title: "Attendance — Presentia" }] }),
  component: AttendancePage,
});

function AttendancePage() {
  const [attendance, setAttendance] = useState<any[]>([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get("/attendance");

        const formattedAttendance = res.data.records
          .filter((r: any) => r.student && r.session)
          .map((r: any) => ({
            id: r._id,
            student: r.student.name,
            rollNo: r.student.rollNumber,
            subject: r.session.subject.subjectName,
            date: new Date(r.timestamp).toLocaleDateString(),
            mode: r.attendanceMethod.toUpperCase(),
            status: "Present",
          }));

        setAttendance(
          role === "student"
            ? formattedAttendance.slice(0, 5)
            : formattedAttendance
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchAttendance();
  }, [role]);

  return (
    <AppShell
      title="Attendance"
      subtitle="All attendance records captured across modes."
      actions={
        role === "admin" ? (
          <button className="h-9 px-3 rounded-lg border border-border text-sm inline-flex items-center gap-1.5 hover:bg-accent/40">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        ) : null
      }
    >
      <TableShell>
        <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="text-left px-5 py-3">Student</th>
            <th className="text-left px-5 py-3">Roll</th>
            <th className="text-left px-5 py-3">Subject</th>
            <th className="text-left px-5 py-3">Date</th>
            <th className="text-left px-5 py-3">Mode</th>
            <th className="text-left px-5 py-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((a) => (
            <tr
              key={a.id}
              className="border-t border-border/60 hover:bg-accent/20"
            >
              <td className="px-5 py-3 font-medium">{a.student}</td>
              <td className="px-5 py-3 font-mono text-xs">{a.rollNo}</td>
              <td className="px-5 py-3 text-muted-foreground">{a.subject}</td>
              <td className="px-5 py-3">{a.date}</td>
              <td className="px-5 py-3">
                <Badge tone="info">{a.mode}</Badge>
              </td>
              <td className="px-5 py-3">
                <Badge tone="success">{a.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </AppShell>
  );
}