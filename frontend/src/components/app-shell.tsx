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
      {/* Sidebar - Remains the same */}
      <aside className={`fixed lg:sticky inset-y-0 left-0 z-40 w-64 shrink-0 transform border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        {/* ... keep your existing sidebar code here ... */}
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        {/* ... keep your existing header code here ... */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight truncate">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
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