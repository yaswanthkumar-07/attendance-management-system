import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Badge } from "@/components/app-shell";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Plus, Mail } from "lucide-react";

export const Route = createFileRoute("/faculty")({
  head: () => ({ meta: [{ title: "Faculty — Presentia" }] }),
  component: FacultyPage,
});

function FacultyPage() {
  const [faculty, setFaculty] = useState<any[]>([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.get("/faculties");

        const formattedFaculty = res.data.faculties.map((f: any) => ({
          id: f._id,
          empId: f.employeeId,
          name: f.name,
          email: f.email,
          department: f.department,
          designation: "Faculty",
          subjects: 1,
          avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(
            f.name
          )}`,
        }));

        setFaculty(formattedFaculty);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFaculty();
  }, []);

  return (
    <AppShell
      title="Faculty"
      subtitle="Manage instructors, departments and assigned subjects."
      actions={
        <button className="btn-primary h-9 px-3 rounded-lg text-sm inline-flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Add faculty
        </button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {faculty.map((f) => (
          <div key={f.id} className="glass-panel rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <img
                src={f.avatar}
                alt=""
                className="h-12 w-12 rounded-xl bg-muted shrink-0"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-medium truncate">{f.name}</div>
                </div>

                <div className="text-xs text-muted-foreground truncate">
                  {f.designation} · {f.department}
                </div>

                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1 truncate">
                  <Mail className="h-3 w-3 shrink-0" />
                  <span className="truncate">{f.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-mono">
                {f.empId}
              </span>

              <Badge tone="info">{f.subjects} subjects</Badge>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
