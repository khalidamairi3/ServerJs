const express = require("express");
const {courses,teachers} = require("../data");

const router = express.Router();

// HTTP methods: GET POST PUT/PATCH DELETE

// GET
router.get("/", (req, res) => {
    console.log(req.params);
  return res.status(200).json(teachers);
});

// get a single teacher by id
router.get("/:teacherId", (req, res) => {
  console.log(req.params);
  // find the teacher from the teachers array
  const teacher =teachers.find((s) => s.id === Number(req.params.teacherId));
  if (teacher) {
    // check existence
    res.status(200).json(teacher);
  } else {
    res.status(404).json({ msg: "teacher not found" });
  }
});

// // POST (Creating a resource)
// router.post("/form-example", (req, res) => {
//   console.log("body: ", req.body);
//   return res.send("post request");
// });

router.post("/", (req, res) => {
  console.log(req.body);
  // create new teacher
  const { name, coursesIds } = req.body;

  // validation, checking if name and courseids exist
  if (!name || !coursesIds) {
    return res.status(400).json({ msg: "teacher is missing some info" });
  }
  // validation, checking if course ids belong to actual courses
  if(coursesIds.some(id=> id > courses.length) || coursesIds.some(id => id <= 0)){
    return res.status(400).json({ msg: "courses don't exist" });
  }
  // mocking db save
  const newTeacher = { name: name, courses: coursesIds, id: teachers.length + 1 };
  teachers.push(newTeacher);

  return res.status(201).json(newTeacher);
});

// PUT (Updates a whole resource)
router.put("/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  // update a teacher with the id provided
  // find the teacher
  const teacher = teachers.find((s) => s.id === Number(teacherId));
  // check that teacher exists
  if (teacher) {
    const { name, coursesIds } = req.body;
    // check if course ids exist
    if(coursesIds.some(id=> id > courses.length) || coursesIds.some(id => id <= 0)){
        return res.status(400).json({ msg: "courses don't exist" });
      }
       // update teacher
    teacher.name = name;
    teacher.courses= coursesIds;
    return res.status(200).json(teacher);
  }
  return res
    .status(404)
    .json({ msg: `teacher with id ${teacherId} does not exist` });
});

// PATCH (Updates a resoruce partially)
router.patch("/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  // update a teacher with the id provided
  // find the teacher
  const teacher = teachers.find((s) => s.id === Number(teacherId));
  if (teacher) {
    // check that teacher exists
    // update teacher
    const { name, coursesIds } = req.body;
    if (name) {
      teacher.name = name;
    }
    if (coursesIds) {
    // check if course ids exist
      if(coursesIds.some(id=> id > courses.length) || coursesIds.some(id => id <= 0)){
        return res.status(400).json({ msg: "courses don't exist" });
      }
      teacher.courses = coursesIds;
    }
    return res.status(200).json(teacher);
  }
  return res
    .status(404)
    .json({ msg: `teacher with id ${teacherId} does not exist` });
});

// DELETE (Remove a resource)
router.delete("/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  // find the teacher
  const teacher = teachers.find((s) => s.id === Number(teacherId));
  if (teacher) {
    // check teacher exists
    // remove teacher from db (in our case it is an in memory db)
    const teacherIndex = teacher.id - 1;
    teachers.splice(teacherIndex, 1);
    return res.status(200).json({ msg: `Removed teacher with id ${teacherId}` });
  }
  return res
    .status(404)
    .json({ msg: `teacher with id ${teacherId} does not exist` });
});

module.exports = router;
