const mongoose = require("mongoose");
require("dotenv").config();

const Student = require("../models/Student");

mongoose.connect(process.env.MONGO_URI);

const students = [
{
name: "Kolla Yaswanth Kumar",
email: "yaswanth@college.edu",
rollNumber: "CS001",
department: "Computer Science",
year: 3,
section: "A"
},
{
name: "Bharath Kumar",
email: "[bharath@college.edu](mailto:bharath@college.edu)",
rollNumber: "CS002",
department: "Computer Science",
year: 3,
section: "A"
},
{
name: "Jai Ram",
email: "[jairam@college.edu](mailto:jairam@college.edu)",
rollNumber: "CS003",
department: "Computer Science",
year: 3,
section: "A"
},
{
name: "MD Shahid",
email: "[shahid@college.edu](mailto:shahid@college.edu)",
rollNumber: "CS004",
department: "Computer Science",
year: 3,
section: "A"
},
{
name: "Siddhabattula Dine",
email: "[dine@college.edu](mailto:dine@college.edu)",
rollNumber: "CS005",
department: "Computer Science",
year: 3,
section: "A"
},
{
name: "Murali",
email: "[murali@college.edu](mailto:murali@college.edu)",
rollNumber: "CS006",
department: "Computer Science",
year: 3,
section: "A"
},
{
name: "Rishab Rai",
email: "[rishab@college.edu](mailto:rishab@college.edu)",
rollNumber: "CS007",
department: "Computer Science",
year: 3,
section: "A"
},
{
name: "Rakesh",
email: "[rakesh@college.edu](mailto:rakesh@college.edu)",
rollNumber: "CS008",
department: "Computer Science",
year: 3,
section: "A"
},
{
name: "Rahul Kumar",
email: "[rahul@college.edu](mailto:rahul@college.edu)",
rollNumber: "CS009",
department: "Computer Science",
year: 3,
section: "A"
},
{
name: "Sai Teja",
email: "[saiteja@college.edu](mailto:saiteja@college.edu)",
rollNumber: "CS010",
department: "Computer Science",
year: 3,
section: "A"
}
];

async function seed() {
try {
await Student.deleteMany({});
await Student.insertMany(students);

console.log("Students Inserted Successfully");
process.exit();
} catch (error) {
console.log(error);
process.exit(1);
}
}

seed();
