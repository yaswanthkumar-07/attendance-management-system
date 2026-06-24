export type Student = {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  department: string;
  year: number;
  section: string;
  attendance: number;
  avatar: string;
};

export type Faculty = {
  id: string;
  empId: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  subjects: number;
  avatar: string;
};

export type Subject = {
  id: string;
  code: string;
  name: string;
  department: string;
  credits: number;
  faculty: string;
  semester: number;
};

export type Session = {
  id: string;
  subject: string;
  faculty: string;
  date: string;
  time: string;
  mode: "QR" | "Face" | "Manual";
  status: "Active" | "Completed" | "Scheduled";
  present: number;
  total: number;
};

export type AttendanceRecord = {
  id: string;
  student: string;
  rollNo: string;
  subject: string;
  date: string;
  status: "Present" | "Absent" | "Late";
  mode: "QR" | "Face" | "Manual";
};

const av = (seed: string) => `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}`;

export const students: Student[] = [
  ["S001","CSE21001","Aarav Sharma","aarav.sharma@uni.edu","Computer Science",3,"A",92],
  ["S002","CSE21002","Diya Patel","diya.patel@uni.edu","Computer Science",3,"A",88],
  ["S003","ECE21010","Rohan Mehta","rohan.mehta@uni.edu","Electronics",2,"B",74],
  ["S004","CSE21015","Ishita Verma","ishita.verma@uni.edu","Computer Science",3,"B",95],
  ["S005","MEC21008","Kabir Singh","kabir.singh@uni.edu","Mechanical",4,"A",69],
  ["S006","CSE21022","Ananya Iyer","ananya.iyer@uni.edu","Computer Science",2,"A",81],
  ["S007","ECE21031","Vihaan Rao","vihaan.rao@uni.edu","Electronics",4,"A",78],
  ["S008","CIV21005","Saanvi Gupta","saanvi.gupta@uni.edu","Civil",1,"C",90],
  ["S009","CSE21044","Arjun Nair","arjun.nair@uni.edu","Computer Science",3,"C",65],
  ["S010","MEC21019","Myra Kapoor","myra.kapoor@uni.edu","Mechanical",2,"B",84],
].map(([id,rollNo,name,email,department,year,section,attendance]) => ({
  id: id as string, rollNo: rollNo as string, name: name as string, email: email as string,
  department: department as string, year: year as number, section: section as string,
  attendance: attendance as number, avatar: av(name as string),
}));

export const faculty: Faculty[] = [
  ["F001","FAC1001","Dr. Priya Menon","priya.menon@uni.edu","Computer Science","Professor",4],
  ["F002","FAC1002","Dr. Rakesh Khanna","rakesh.khanna@uni.edu","Electronics","Associate Prof.",3],
  ["F003","FAC1003","Prof. Neha Bansal","neha.bansal@uni.edu","Computer Science","Assistant Prof.",2],
  ["F004","FAC1004","Dr. Aditya Joshi","aditya.joshi@uni.edu","Mechanical","Professor",3],
  ["F005","FAC1005","Dr. Sneha Reddy","sneha.reddy@uni.edu","Computer Science","Assistant Prof.",2],
  ["F006","FAC1006","Prof. Manish Tiwari","manish.tiwari@uni.edu","Civil","Associate Prof.",3],
  ["F007","FAC1007","Dr. Kavya Pillai","kavya.pillai@uni.edu","Electronics","Assistant Prof.",2],
  ["F008","FAC1008","Dr. Rahul Desai","rahul.desai@uni.edu","Mechanical","Professor",4],
  ["F009","FAC1009","Prof. Tanvi Shah","tanvi.shah@uni.edu","Computer Science","Assistant Prof.",2],
  ["F010","FAC1010","Dr. Vikram Bose","vikram.bose@uni.edu","Civil","Professor",3],
].map(([id,empId,name,email,department,designation,subjects]) => ({
  id: id as string, empId: empId as string, name: name as string, email: email as string,
  department: department as string, designation: designation as string,
  subjects: subjects as number, avatar: av(name as string),
}));

export const subjects: Subject[] = [
  ["SUB01","CS301","Data Structures & Algorithms","Computer Science",4,"Dr. Priya Menon",5],
  ["SUB02","CS302","Operating Systems","Computer Science",4,"Prof. Neha Bansal",5],
  ["SUB03","CS401","Machine Learning","Computer Science",3,"Dr. Sneha Reddy",7],
  ["SUB04","CS402","Database Systems","Computer Science",4,"Prof. Tanvi Shah",6],
  ["SUB05","EC301","Signals & Systems","Electronics",4,"Dr. Rakesh Khanna",5],
  ["SUB06","EC401","VLSI Design","Electronics",3,"Dr. Kavya Pillai",7],
  ["SUB07","ME301","Thermodynamics","Mechanical",4,"Dr. Aditya Joshi",5],
  ["SUB08","ME402","Robotics","Mechanical",3,"Dr. Rahul Desai",7],
  ["SUB09","CE201","Structural Analysis","Civil",4,"Prof. Manish Tiwari",3],
  ["SUB10","CE301","Geotechnical Engg.","Civil",3,"Dr. Vikram Bose",5],
].map(([id,code,name,department,credits,fac,semester]) => ({
  id: id as string, code: code as string, name: name as string,
  department: department as string, credits: credits as number,
  faculty: fac as string, semester: semester as number,
}));

export const sessions: Session[] = [
  ["SES01","Data Structures & Algorithms","Dr. Priya Menon","2026-06-22","09:00 AM","QR","Active",42,48],
  ["SES02","Machine Learning","Dr. Sneha Reddy","2026-06-22","10:30 AM","Face","Active",36,40],
  ["SES03","Operating Systems","Prof. Neha Bansal","2026-06-22","12:00 PM","QR","Scheduled",0,52],
  ["SES04","Database Systems","Prof. Tanvi Shah","2026-06-21","02:00 PM","Manual","Completed",45,50],
  ["SES05","Signals & Systems","Dr. Rakesh Khanna","2026-06-21","11:00 AM","Face","Completed",38,44],
  ["SES06","VLSI Design","Dr. Kavya Pillai","2026-06-21","03:30 PM","QR","Completed",29,32],
  ["SES07","Thermodynamics","Dr. Aditya Joshi","2026-06-20","09:00 AM","Face","Completed",41,46],
  ["SES08","Robotics","Dr. Rahul Desai","2026-06-20","11:30 AM","QR","Completed",24,28],
  ["SES09","Structural Analysis","Prof. Manish Tiwari","2026-06-20","02:00 PM","Manual","Completed",33,36],
  ["SES10","Geotechnical Engg.","Dr. Vikram Bose","2026-06-19","10:00 AM","Face","Completed",27,30],
].map(([id,subject,fac,date,time,mode,status,present,total]) => ({
  id: id as string, subject: subject as string, faculty: fac as string,
  date: date as string, time: time as string,
  mode: mode as Session["mode"], status: status as Session["status"],
  present: present as number, total: total as number,
}));

export const attendance: AttendanceRecord[] = students.flatMap((s, i) => [
  {
    id: `A${i}1`, student: s.name, rollNo: s.rollNo,
    subject: subjects[i % subjects.length].name, date: "2026-06-22",
    status: s.attendance > 75 ? "Present" : s.attendance > 70 ? "Late" : "Absent",
    mode: (["QR","Face","Manual"] as const)[i % 3],
  },
  {
    id: `A${i}2`, student: s.name, rollNo: s.rollNo,
    subject: subjects[(i + 3) % subjects.length].name, date: "2026-06-21",
    status: s.attendance > 70 ? "Present" : "Absent",
    mode: (["QR","Face","Manual"] as const)[(i + 1) % 3],
  },
]);

export const dashboardStats = {
  totalStudents: students.length,
  totalFaculty: faculty.length,
  totalSubjects: subjects.length,
  totalAttendance: attendance.filter((a) => a.status !== "Absent").length,
  attendanceRate: Math.round(
    (attendance.filter((a) => a.status !== "Absent").length / attendance.length) * 100,
  ),
  activeSessions: sessions.filter((s) => s.status === "Active").length,
};

export const weeklyTrend = [
  { day: "Mon", present: 412, absent: 38 },
  { day: "Tue", present: 398, absent: 52 },
  { day: "Wed", present: 425, absent: 25 },
  { day: "Thu", present: 388, absent: 62 },
  { day: "Fri", present: 402, absent: 48 },
  { day: "Sat", present: 220, absent: 30 },
  { day: "Sun", present: 0, absent: 0 },
];

export const departmentBreakdown = [
  {
    name: "Computer Science",
    value: 6,
    color: "var(--color-chart-1)",
  },
  {
    name: "Cloud Computing",
    value: 2,
    color: "var(--color-chart-2)",
  },
  {
    name: "Mathematics",
    value: 1,
    color: "var(--color-chart-3)",
  },
  {
    name: "Chemistry",
    value: 1,
    color: "var(--color-chart-4)",
  },
  {
    name: "Data Science",
    value: 1,
    color: "var(--color-chart-4)",
  },
];

export const modeDistribution = [
  { mode: "QR", count: 145 },
  { mode: "Face", count: 112 },
  { mode: "Manual", count: 58 },
];
