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
  const [secs, setSecs] = useState(30);
  const [token, setToken] = useState(
    () => Math.random().toString(36).slice(2, 10).toUpperCase()
  );

  useEffect(() => {
    const t = setInterval(() => {
      setSecs((s) => {
        if (s <= 1) {
          setToken(
            Math.random().toString(36).slice(2, 10).toUpperCase()
          );
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
        const [sessionsRes, studentsRes] = await Promise.all([
          api.get("/sessions"),
          api.get("/students"),
        ]);

        setSessions(sessionsRes.data.sessions || []);
        setStudents(studentsRes.data.students || []);
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

  const recent = students.slice(0, 6);

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
            <FakeQR token={token} />
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 text-sm">
            <Timer className="h-4 w-4" />

            <span>
              Refreshing in <b>{secs}s</b>
            </span>

            <button
              onClick={() => {
                setSecs(30);
                setToken(
                  Math.random()
                    .toString(36)
                    .slice(2, 10)
                    .toUpperCase()
                );
              }}
            >
              <RefreshCcw className="h-3 w-3" />
            </button>
          </div>

          <div className="mt-3 text-xs font-mono">
            Token: {token}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-panel rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">
                Scanned
              </div>
              <div className="text-2xl font-semibold">0</div>
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
              {recent.map((s, i) => (
                <div
                  key={s._id}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3"
                >
                  <img
                    src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(
                      s.name
                    )}`}
                    className="h-8 w-8 rounded-full"
                    alt=""
                  />

                  <div>
                    <div>{s.name}</div>
                    <div className="text-xs">
                      {s.rollNumber}
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

function FakeQR({ token }: { token: string }) {
  // Deterministic pseudo-QR pattern
  const size = 21;
  const cells: boolean[] = [];
  let h = 0;
  for (let i = 0; i < token.length; i++) h = (h * 31 + token.charCodeAt(i)) >>> 0;
  for (let i = 0; i < size * size; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    cells.push((h & 1) === 1);
  }
  // Corner finders
  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) =>
      r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inBox(0, 0) || inBox(0, size - 7) || inBox(size - 7, 0);
  };
  const finderFill = (r: number, c: number) => {
    const local = (br: number, bc: number) => {
      const rr = r - br, cc = c - bc;
      if (rr === 0 || rr === 6 || cc === 0 || cc === 6) return true;
      if (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4) return true;
      return false;
    };
    if (r < 7 && c < 7) return local(0, 0);
    if (r < 7 && c >= size - 7) return local(0, size - 7);
    if (r >= size - 7 && c < 7) return local(size - 7, 0);
    return false;
  };
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, width: "100%", height: "100%", gap: 1 }}
    >
      {Array.from({ length: size * size }, (_, i) => {
        const r = Math.floor(i / size), c = i % size;
        const on = isFinder(r, c) ? finderFill(r, c) : cells[i];
        return <div key={i} style={{ background: on ? "#0b0a13" : "transparent" }} />;
      })}
    </div>
  );
}

