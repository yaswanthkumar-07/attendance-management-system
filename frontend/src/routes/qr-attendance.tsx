import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, Badge } from "@/components/app-shell";
import { RefreshCcw, Timer, Users } from "lucide-react";
import { api } from "@/lib/api";

export const Route = createFileRoute("/qr-attendance")({
  head: () => ({ meta: [{ title: "QR Attendance — Presentia" }] }),
  component: QRPage,
});

function QRPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [secs, setSecs] = useState(30);

  useEffect(() => {
    const t = setInterval(() => {
      setSecs((s) => {
        if (s <= 1) {
  return 30;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sessionsRes, studentsRes, attendanceRes] =
  await Promise.all([
    api.get("/sessions"),
    api.get("/students"),
    api.get("/attendance"),
  ]);
        setSessions(sessionsRes.data.sessions || []);
        setStudents(studentsRes.data.students || []);
        setAttendance(attendanceRes.data.records || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  const active =
    sessions.find((s) => s.status === "active") ||
    sessions[0] ||
    {};

  const scannedCount = attendance.filter(
  (a) => a.session?._id === active?._id
).length;

const recent = attendance
  .filter((a) => a.student)
  .slice(-6)
  .reverse();

  return (
    <AppShell
      title="QR Attendance"
      subtitle="Generate a rotating QR code for students to scan in real-time."
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="glass-panel rounded-2xl p-6 text-center">
          <div className="flex items-center justify-between text-left mb-4">
            <div>
              <div className="text-sm font-medium">
                {active?.subject?.subjectName || "No Subject"}
              </div>

              <div className="text-xs text-muted-foreground">
                {active?.faculty?.name || "No Faculty"} ·{" "}
                {active?.startTime
                  ? new Date(active.startTime).toLocaleTimeString()
                  : "N/A"}
              </div>
            </div>

            <Badge tone="success">Live</Badge>
          </div>

          <div className="mx-auto w-64 h-64 rounded-2xl bg-white p-4 grid place-items-center">
            <img
  src={active?.qrCode}
  alt="QR Code"
  className="w-full h-full object-contain"
/>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 text-sm">
            <Timer className="h-4 w-4" />

            <span>
              Refreshing in <b>{secs}s</b>
            </span>

            <button
              onClick={() => {
  setSecs(30);
}}
            >
              <RefreshCcw className="h-3 w-3" />
            </button>
          </div>
          <div className="mt-3 text-xs font-mono">
            Session Code: {active?.sessionCode || "N/A"}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-panel rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">
                Scanned
              </div>
              <div className="text-2xl font-semibold">
  {scannedCount}
</div>
            </div>

            <div className="glass-panel rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">
                Expected
              </div>
              <div className="text-2xl font-semibold">
                {students.length}
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4" />
              <div className="text-sm font-medium">
                Live check-ins
              </div>
            </div>

            <div className="space-y-2">
              {recent.map((a, i) => (
                <div
                  key={a._id}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3"
                >
                  <img
                    src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(
                      a.student.name
                    )}`}
                    className="h-8 w-8 rounded-full"
                    alt=""
                  />

                  <div>
                    <div>{a.student.name}</div>
                    <div className="text-xs">
                      {a.student.rollNumber}
                    </div>
                  </div>

                  <Badge tone="success">
                    {i + 1}s ago
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

 

