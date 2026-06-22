const mongoose = require("mongoose");
require("dotenv").config();

const Subject = require("../models/Subject");

mongoose.connect(process.env.MONGO_URI);

const subjects = [
{
subjectName: "Database Management System",
subjectCode: "DBMS101",
faculty: "6a392b740228d4ab110f2d0e",
semester: 5
},
{
subjectName: "Web Development",
subjectCode: "WD102",
faculty: "6a392b740228d4ab110f2d0f",
semester: 5
},
{
subjectName: "Digital Logic Design",
subjectCode: "DLD103",
faculty: "6a392b740228d4ab110f2d10",
semester: 5
},
{
subjectName: "Software Engineering",
subjectCode: "SE104",
faculty: "6a392b740228d4ab110f2d11",
semester: 5
},
{
subjectName: "Cloud Computing",
subjectCode: "CC105",
faculty: "6a392b740228d4ab110f2d12",
semester: 5
},
{
subjectName: "Programming in C",
subjectCode: "C106",
faculty: "6a392b740228d4ab110f2d13",
semester: 5
},
{
subjectName: "Communicative English",
subjectCode: "ENG107",
faculty: "6a392b740228d4ab110f2d14",
semester: 5
},
{
subjectName: "Mathematics",
subjectCode: "MATH108",
faculty: "6a392b740228d4ab110f2d15",
semester: 5
},
{
subjectName: "Aptitude and Reasoning",
subjectCode: "APT109",
faculty: "6a392b740228d4ab110f2d16",
semester: 5
},
{
subjectName: "Object Oriented Software Engineering",
subjectCode: "OOSE110",
faculty: "6a392b740228d4ab110f2d17",
semester: 5
}
];

async function seed() {
try {
await Subject.deleteMany({});
await Subject.insertMany(subjects);

console.log("Subjects Inserted Successfully");
process.exit();
} catch (error) {
console.log(error);
process.exit(1);
}
}

seed();
