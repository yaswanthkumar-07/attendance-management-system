const mongoose = require("mongoose");
require("dotenv").config();

const Faculty = require("../models/Faculty");

mongoose.connect(process.env.MONGO_URI);

const faculties = [
{
name: "Tanil Reddy",
email: "[tanil@college.edu](mailto:tanil@college.edu)",
employeeId: "FAC001",
department: "Computer Science"
},
{
name: "Gayathri",
email: "[gayathri@college.edu](mailto:gayathri@college.edu)",
employeeId: "FAC002",
department: "Computer Science"
},
{
name: "Divakar",
email: "[divakar@college.edu](mailto:divakar@college.edu)",
employeeId: "FAC003",
department: "Electronics"
},
{
name: "CVS Sastry",
email: "[sastry@college.edu](mailto:sastry@college.edu)",
employeeId: "FAC004",
department: "Computer Science"
},
{
name: "Chandan",
email: "[chandan@college.edu](mailto:chandan@college.edu)",
employeeId: "FAC005",
department: "Cloud Computing"
},
{
name: "Bhagya Laxmi",
email: "[bhagya@college.edu](mailto:bhagya@college.edu)",
employeeId: "FAC006",
department: "Computer Science"
},
{
name: "Merry Priscilla",
email: "[merry@college.edu](mailto:merry@college.edu)",
employeeId: "FAC007",
department: "English"
},
{
name: "Vinod",
email: "[vinod@college.edu](mailto:vinod@college.edu)",
employeeId: "FAC008",
department: "Mathematics"
},
{
name: "Srinivas",
email: "[srinivas@college.edu](mailto:srinivas@college.edu)",
employeeId: "FAC009",
department: "Aptitude"
},
{
name: "SV Babji",
email: "[babji@college.edu](mailto:babji@college.edu)",
employeeId: "FAC010",
department: "Computer Science"
}
];

async function seed() {
try {
await Faculty.deleteMany({});
await Faculty.insertMany(faculties);

console.log("Faculty Inserted Successfully");
process.exit();
} catch (error) {
console.log(error);
process.exit(1);
}
}

seed();
