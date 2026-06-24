import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";      // Update this path if necessary
import { TableShell } from "@/components/ui/table-shell"; // Update this path if necessary
import { api } from "@/lib/api";
import { Plus, BookOpen } from "lucide-react";

export const Route = createFileRoute("/subjects")({
  head: () => ({ meta: [{ title: "Subjects — Aditya Degree College" }] }),
  component: SubjectsPage,
});

function SubjectsPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get("/subjects");

        const formattedSubjects = res.data.subjects.map((s: any) => ({
          id: s._id,
          code: s.subjectCode,
          name: s.subjectName,
          department: "B.Sc Computer Science",
          faculty: s.faculty?.name || "Faculty",
          semester: s.semester,
          credits: 4,
        }));

        setSubjects(formattedSubjects);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <AppShell
      title="Subjects"
      subtitle="Course catalog with credits, faculty and semester mapping."
      actions={
        role === "admin" ? (
          <button className="btn-primary h-9 px-3 rounded-lg text-sm inline-flex items-center gap-1.5">
            <Plus className="h-4 w-4" /> New subject
          </button>
        ) : null
      }
    >
      <TableShell>
        <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="text-left px-5 py-3">Subject</th>
            <th className="text-left px-5 py-3">Code</th>
            <th className="text-left px-5 py-3">Department</th>
            <th className="text-left px-5 py-3">Faculty</th>
            <th className="text-left px-5 py-3">Sem</th>
            <th className="text-left px-5 py-3">Credits</th>
          </tr>
        </thead>

        <tbody>
          {(role === "student" ? subjects.slice(0, 5) : subjects).map((s) => (
            <tr
              key={s.id}
              className="border-t border-border/60 hover:bg-accent/20"
            >
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/60 border border-glass-border">
                    <BookOpen className="h-4 w-4 text-primary-glow" />
                  </div>

                  <div className="font-medium">{s.name}</div>
                </div>
              </td>

              <td className="px-5 py-3 font-mono text-xs">{s.code}</td>

              <td className="px-5 py-3">{s.department}</td>

              <td className="px-5 py-3">{s.faculty}</td>

              <td className="px-5 py-3">{s.semester}</td>

              <td className="px-5 py-3">
                <Badge tone="info">{s.credits} cr</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </AppShell>
  );
}