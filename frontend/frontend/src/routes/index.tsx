import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Sparkles, Mail, Lock, ArrowRight, ShieldCheck, ScanFace, QrCode } from "lucide-react";
import { setRole } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — Presentia AI Attendance" },
      { name: "description", content: "AI-powered attendance management for modern institutions." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@uni.edu");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("admin");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem("role", role);

if (role === "admin") {
  navigate({ to: "/dashboard" });
}

if (role === "faculty") {
  navigate({ to: "/attendance" });
}

if (role === "student") {
  navigate({ to: "/reports" });
}
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-10">
            <div className="grid h-10 w-10 place-items-center rounded-xl btn-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">Presentia</div>
              <div className="text-xs text-muted-foreground">AI Attendance Platform</div>
            </div>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your workspace to manage students, sessions and attendance.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-9 pr-3 rounded-lg bg-input/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">Password</label>
                <a className="text-xs text-primary-glow hover:underline" href="#">Forgot?</a>
              </div>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-9 pr-3 rounded-lg bg-input/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
                />
              </div>
            </div>
<select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="w-full h-11 rounded-lg border border-border bg-input/60 px-3 text-sm"
>
  <option value="admin">Admin</option>
  <option value="faculty">Faculty</option>
  <option value="student">Student</option>
</select>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-11 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? "Signing in…" : (<>Sign in <ArrowRight className="h-4 w-4" /></>)}
            </button>

            <div className="text-center text-xs text-muted-foreground">
              New here?{" "}
              <Link to="/dashboard" className="text-primary-glow hover:underline">
                Explore demo
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right: hero */}
      <div className="hidden lg:flex relative items-center justify-center p-10 border-l border-border/60 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
        <div className="relative max-w-md space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3 py-1 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> New · Face recognition v2
          </div>
          <h2 className="text-4xl font-semibold leading-tight">
            Attendance, <span className="gradient-text">re-imagined</span> with AI.
          </h2>
          <p className="text-muted-foreground">
            Run QR or face-recognition sessions in seconds. Track attendance across departments with a single source of truth.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { i: ScanFace, l: "Face ID" },
              { i: QrCode, l: "QR Mode" },
              { i: ShieldCheck, l: "Secure" },
            ].map(({ i: I, l }) => (
              <div key={l} className="glass-panel rounded-xl p-4 text-center">
                <I className="h-5 w-5 mx-auto text-primary-glow" />
                <div className="mt-2 text-xs">{l}</div>
              </div>
            ))}
          </div>
          <div className="glass-panel rounded-2xl p-5">
            <div className="text-xs text-muted-foreground">Today</div>
            <div className="mt-1 flex items-baseline gap-2">
              <div className="text-3xl font-semibold">94.2%</div>
              <div className="text-xs text-success">+2.4%</div>
            </div>
            <div className="text-xs text-muted-foreground">Average attendance across 12 active sessions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
