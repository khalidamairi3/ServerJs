const express = require("express");
const {courses} = require("../data");

const router = express.Router();

// HTTP methods: GET POST PUT/PATCH DELETE

// GET
router.get("/", (req, res) => {
    // console.log(req.params);
  return res.status(200).json(courses);
});

// get a single course
router.get("/:courseId", (req, res) => {
  console.log(req.params);
  const course =courses.find((s) => s.id === Number(req.params.courseId));
  if (course) {
    // check existence
    res.status(200).json(course);
  } else {
    res.status(404).json({ msg: "course not found" });
  }
});

// POST (Creating a resource)
router.post("/form-example", (req, res) => {
  console.log("body: ", req.body);
  return res.send("post request");
});

router.post("/", (req, res) => {
  console.log(req.body);
  // create new course
  const { courseCode, title, description } = req.body;
  // check if name and courses ids exist
  if (!courseCode || !title || !description) {
    return res.status(400).json({ msg: "course is missing some info" });
  }
  // mocking db save
  const newcourse = {  id: courses.length + 1, courseCode: courseCode, title: title, description:description };
  courses.push(newcourse);

  return res.status(201).json(newcourse);
});

// PUT (Updates a whole resource)
router.put("/:courseId", (req, res) => {
  const { courseId } = req.params;
  // update a course with the id provided
  // find the course
  const course = courses.find((s) => s.id === Number(courseId));
  
  if (course) {
    // check that course exists
    // update course
    const { courseCode, title, description } = req.body;
    //validation, check if there is any missing info
    if (!courseCode || !title || !description) {
        return res.status(400).json({ msg: "course is missing some info" });
      }
    course.courseCode= courseCode;
    course.title= title;
    course.description= description
    return res.status(200).json(course);
  }
  return res
    .status(404)
    .json({ msg: `course with id ${courseId} does not exist` });
});

// PATCH (Updates a resoruce partially)
router.patch("/:courseId", (req, res) => {
  const { courseId } = req.params;
  // update a course with the id provided
  // find the course
  const course = courses.find((s) => s.id === Number(courseId));
  if (course) {
    // check that course exists
    // update course
    const { courseCode, title, description } = req.body;
    if (courseCode) {
      course.courseCode = courseCode;
    }
    if (title) {
      course.title = title;
    }
    if(description){
        course.description=description;
    }
    return res.status(200).json(course);
  }
  return res
    .status(404)
    .json({ msg: `course with id ${courseId} does not exist` });
});

// DELETE (Remove a resource)
router.delete("/:courseId", (req, res) => {
  const { courseId } = req.params;
  // const courseId = req.params.courseId;
  // find the course
  const course = courses.find((s) => s.id === Number(courseId));
  if (course) {
    // check course exists
    // remove course from db (in our case it is an in memory db)
    const courseIndex = course.id - 1;
    courses.splice(courseIndex, 1);
    return res.status(200).json({ msg: `Removed course with id ${courseId}` });
  }
  return res
    .status(404)
    .json({ msg: `course with id ${courseId} does not exist` });
});

module.exports = router;
