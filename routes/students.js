const express = require("express");
const {courses,students} = require("../data");

const router = express.Router();

// HTTP methods: GET POST PUT/PATCH DELETE

// GET
router.get("/", (req, res) => {
    // console.log(req.params);
  return res.status(200).json(students);
});

// get a single student
router.get("/:studentId", (req, res) => {
  console.log(req.params);
  const student =students.find((s) => s.id === Number(req.params.studentId));
  if (student) {
    // check existence
    res.status(200).json(student);
  } else {
    res.status(404).json({ msg: "student not found" });
  }
});

// POST (Creating a resource)
router.post("/form-example", (req, res) => {
  console.log("body: ", req.body);
  return res.send("post request");
});

router.post("/", (req, res) => {
  console.log(req.body);
  // create new student
  const { name, coursesIds } = req.body;
  // check if name and courses ids exist
  if (!name || !coursesIds) {
    return res.status(400).json({ msg: "student is missing some info" });
  }
  // check if courses ids exist
  if(coursesIds.some(id=> id > courses.length) || coursesIds.some(id => id <= 0)){
    return res.status(400).json({ msg: "courses don't exist" });
  }
  // mocking db save
  const newStudent = { name: name, courses: coursesIds, id: students.length + 1 };
  students.push(newStudent);

  return res.status(201).json(newStudent);
});

// PUT (Updates a whole resource)
router.put("/:studentId", (req, res) => {
  const { studentId } = req.params;
  // update a student with the id provided
  // find the student
  const student = students.find((s) => s.id === Number(studentId));
  
  if (student) {
    // check that student exists
    // update student
    const { name, coursesIds } = req.body;
    // check if courses ids exist
    if(coursesIds.some(id=> id > courses.length) || coursesIds.some(id => id <= 0)){
        return res.status(400).json({ msg: "courses don't exist" });
      }
    student.name = name;
    student.courses= coursesIds;
    return res.status(200).json(student);
  }
  return res
    .status(404)
    .json({ msg: `student with id ${studentId} does not exist` });
});

// PATCH (Updates a resoruce partially)
router.patch("/:studentId", (req, res) => {
  const { studentId } = req.params;
  // update a student with the id provided
  // find the student
  const student = students.find((s) => s.id === Number(studentId));
  if (student) {
    // check that student exists
    // update student
    const { name, coursesIds } = req.body;
    if (name) {
      student.name = name;
    }
    // check if courses ids exist
    if (coursesIds) {
      if(coursesIds.some(id=> id > courses.length) || coursesIds.some(id => id <= 0)){
        return res.status(400).json({ msg: "courses don't exist" });
      }
      student.courses = coursesIds;
    }
    return res.status(200).json(student);
  }
  return res
    .status(404)
    .json({ msg: `student with id ${studentId} does not exist` });
});

// DELETE (Remove a resource)
router.delete("/:studentId", (req, res) => {
  const { studentId } = req.params;
  // const studentId = req.params.studentId;
  // find the student
  const student = students.find((s) => s.id === Number(studentId));
  if (student) {
    // check student exists
    // remove student from db (in our case it is an in memory db)
    const studentIndex = student.id - 1;
    students.splice(studentIndex, 1);
    return res.status(200).json({ msg: `Removed student with id ${studentId}` });
  }
  return res
    .status(404)
    .json({ msg: `student with id ${studentId} does not exist` });
});

module.exports = router;
