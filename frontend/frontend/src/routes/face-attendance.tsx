import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, Badge } from "@/components/app-shell";
import { ScanFace, Camera, CheckCircle2, Loader2 } from "lucide-react";
import { students } from "@/lib/mock-data";

export const Route = createFileRoute("/face-attendance")({
  head: () => ({ meta: [{ title: "Face Attendance — Presentia" }] }),
  component: FacePage,
});

function FacePage() {
  const [scanning, setScanning] = useState(true);
  const [detected, setDetected] = useState<typeof students>([]);

  useEffect(() => {
    if (!scanning) return;
    let i = 0;
    const t = setInterval(() => {
      if (i >= students.length) { setScanning(false); clearInterval(t); return; }
      setDetected((d) => [students[i], ...d]);
      i++;
    }, 900);
    return () => clearInterval(t);
  }, [scanning]);

  return (
    <AppShell
      title="Face Recognition Attendance"
      subtitle="AI camera detects and marks present in real-time."
      actions={
        <button
          onClick={() => { setDetected([]); setScanning(true); }}
          className="btn-primary h-9 px-3 rounded-lg text-sm inline-flex items-center gap-1.5"
        >
          <Camera className="h-4 w-4" /> Restart scan
        </button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass-panel rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium">Camera feed</div>
            <Badge tone={scanning ? "success" : "default"}>
              {scanning ? <><Loader2 className="h-3 w-3 animate-spin" /> Scanning</> : "Idle"}
            </Badge>
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden border border-glass-border"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 40%, oklch(0.30 0.06 290), oklch(0.16 0.02 280))",
            }}
          >
            {/* face frame */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative h-56 w-56 rounded-full border border-primary-glow/60">
                <div className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 80px 10px oklch(0.62 0.22 290 / 0.35) inset" }} />
                <ScanFace className="absolute inset-0 m-auto h-20 w-20 text-primary-glow/70" />
                {scanning && (
                  <div className="absolute left-0 right-0 h-0.5 bg-primary-glow/80 animate-[scan_2.4s_linear_infinite]"
                    style={{ top: "20%", boxShadow: "0 0 16px var(--primary-glow)" }}
                  />
                )}
              </div>
            </div>
            {/* corners */}
            {["top-3 left-3","top-3 right-3 rotate-90","bottom-3 left-3 -rotate-90","bottom-3 right-3 rotate-180"].map((p) => (
              <div key={p} className={`absolute ${p} h-6 w-6 border-t-2 border-l-2 border-primary-glow/80`} />
            ))}
            <div className="absolute bottom-3 left-3 text-xs text-muted-foreground font-mono">
              CAM-01 · 1080p · {new Date().toLocaleTimeString()}
            </div>
          </div>

          <style>{`@keyframes scan { 0%{top:20%} 50%{top:78%} 100%{top:20%} }`}</style>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <Metric label="Detected" value={detected.length} />
            <Metric label="Confidence" value="98.4%" />
            <Metric label="Latency" value="142ms" />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <div className="text-sm font-medium mb-3">Recognised students</div>
          {detected.length === 0 && (
            <div className="text-xs text-muted-foreground py-10 text-center">Waiting for first detection…</div>
          )}
          <div className="space-y-2 max-h-[520px] overflow-auto pr-1">
            {detected.map((s) => (
              <div key={s.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-2 rounded-lg bg-background/40 border border-border/60">
                <img src={s.avatar} alt="" className="h-9 w-9 rounded-full bg-muted" />
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{s.name}</div>
                  <div className="text-xs text-muted-foreground font-mono truncate">{s.rollNo} · {s.department}</div>
                </div>
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/40 p-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}
