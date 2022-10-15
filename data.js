// define data arrays
const students = [
  { id: 1, name: "Meera", courses:[1,2,3] },
  { id: 2, name: "John", courses:[2,3] },
  { id: 3, name: "James", courses:[1,3] },
]

const teachers = [
  { id: 1, name: "Alex", courses:[1,2] },
  { id: 2, name: "August", courses:[3] },
  { id: 3, name: "Cathy", courses:[1,3] },
]

const courses = [
  { id: 1, courseCode: "CS101", title:"Programming", description: "introduction programming" },
  { id: 2, courseCode: "CS102", title:"Frontend Development", description: "HTML + CSS +JS" },
  { id: 3, courseCode: "CS103", title:"Backend programming", description: "API with Node + express" },
]
module.exports = {students, teachers, courses}
