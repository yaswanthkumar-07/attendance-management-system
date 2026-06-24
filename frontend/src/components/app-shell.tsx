import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, CalendarClock,
  ClipboardCheck, FileBarChart, QrCode, ScanFace, Search, Bell,
  Menu, X, LogOut, Sparkles,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/students", label: "Students", icon: GraduationCap },
  { to: "/faculty", label: "Faculty", icon: Users },
  { to: "/subjects", label: "Subjects", icon: BookOpen },
  { to: "/sessions", label: "Sessions", icon: CalendarClock },
  { to: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/qr-attendance", label: "QR Attendance", icon: QrCode },
  { to: "/face-attendance", label: "Face Attendance", icon: ScanFace },
];

export function AppShell({ children, title, subtitle, actions }: {
  children: ReactNode; title: string; subtitle?: string; actions?: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex w-full text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky inset-y-0 left-0 z-40 w-64 shrink-0 transform border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2 px-5 border-b border-sidebar-border">
          <div className="grid h-9 w-9 place-items-center rounded-xl btn-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Presentia</div>
            <div className="text-[11px] text-muted-foreground">AI Attendance</div>
          </div>
        </div>
        <nav className="px-3 py-4 space-y-1">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_0_0_0_1px_var(--glass-border)]"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="glass-panel rounded-xl p-3 flex items-center gap-3">
            <img src="https://api.dicebear.com/9.x/notionists/svg?seed=Admin" className="h-9 w-9 rounded-full bg-muted" alt="" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium truncate">Admin User</div>
              <div className="text-[11px] text-muted-foreground truncate">admin@uni.edu</div>
            </div>
            <button
              onClick={() => navigate({ to: "/" })}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 h-16 border-b border-border/60 bg-background/60 backdrop-blur-xl">
          <div className="h-full px-4 sm:px-6 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
            <button
              className="lg:hidden grid h-9 w-9 place-items-center rounded-lg border border-border"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <div className="relative max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search students, sessions…"
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-input/60 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/60"
              />
            </div>
            <div className="sm:hidden" />
            <div className="flex items-center gap-2 justify-self-end">
              <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-accent/40">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
              </button>
              <img src="https://api.dicebear.com/9.x/notionists/svg?seed=Admin" className="h-9 w-9 rounded-full bg-muted" alt="" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>

            {actions && (
              <div className="flex items-center gap-2 shrink-0">
                {actions}
              </div>
            )}
          </div>

          {children}

          <footer className="text-center text-xs text-muted-foreground py-6">
            Developed by <span className="font-medium">Kolla Yaswanth Kumar</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
