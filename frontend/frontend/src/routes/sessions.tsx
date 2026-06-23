import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, Badge, TableShell } from "@/components/app-shell";
import { api } from "@/lib/api";
import { Plus, Play } from "lucide-react";

export const Route = createFileRoute("/sessions")({
  head: () => ({ meta: [{ title: "Sessions — Aditya Degree College" }] }),
  component: SessionsPage,
});

function SessionsPage() {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
  const fetchSessions = async () => {
    try {
      const res = await api.get("/sessions");

      console.log("SESSIONS RESPONSE:", res.data);
      console.log("SESSIONS ARRAY:", res.data.sessions);

      const formattedSessions = res.data.sessions.map((s: any) => ({
        id: s._id,
        subject: s.subject?.subjectName || "Subject",
        faculty: s.faculty?.name || "Faculty",
        date: new Date(s.startTime).toLocaleDateString(),
        time: new Date(s.startTime).toLocaleTimeString(),
        mode: "QR",
        status: s.status === "active" ? "Active" : "Completed",
        present: 0,
        total: 10,
        sessionCode: s.sessionCode,
      }));

      console.log("FORMATTED:", formattedSessions);

      setSessions(formattedSessions);
    } catch (err) {
      console.error("SESSION ERROR:", err);
    }
  };

  fetchSessions();
}, []);

  return (
    <AppShell
      title="Attendance Sessions"
      subtitle="Live and scheduled sessions across departments."
      actions={
        <button className="btn-primary h-9 px-3 rounded-lg text-sm inline-flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Start Session
        </button>
      }
    >
      <TableShell>
        <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="text-left px-5 py-3">Session Code</th>
            <th className="text-left px-5 py-3">Subject</th>
            <th className="text-left px-5 py-3">Faculty</th>
            <th className="text-left px-5 py-3">Date / Time</th>
            <th className="text-left px-5 py-3">Mode</th>
            <th className="text-left px-5 py-3">Status</th>
            <th className="text-left px-5 py-3">Attendance</th>
            <th className="text-right px-5 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {sessions.map((s) => {
            const pct = Math.round((s.present / s.total) * 100) || 0;

            return (
              <tr
                key={s.id}
                className="border-t border-border/60 hover:bg-accent/20"
              >
                <td className="px-5 py-3 font-mono text-xs">
                  {s.sessionCode}
                </td>

                <td className="px-5 py-3 font-medium">
                  {s.subject}
                </td>

                <td className="px-5 py-3 text-muted-foreground">
                  {s.faculty}
                </td>

                <td className="px-5 py-3">
                  {s.date} · {s.time}
                </td>

                <td className="px-5 py-3">
                  <Badge tone="info">{s.mode}</Badge>
                </td>

                <td className="px-5 py-3">
                  <Badge
                    tone={
                      s.status === "Active"
                        ? "success"
                        : "default"
                    }
                  >
                    {s.status}
                  </Badge>
                </td>

                <td className="px-5 py-3">
                  <div className="flex items-center gap-2 min-w-[140px]">
                    <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full btn-primary"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {s.present}/{s.total}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-3 text-right">
                  <button className="h-8 px-3 rounded-lg border border-border text-xs hover:bg-accent/40 inline-flex items-center gap-1.5">
                    <Play className="h-3 w-3" />
                    Open
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableShell>
    </AppShell>
  );
}