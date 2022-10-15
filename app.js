const express = require("express");
const path = require("path");
const studentsRoutes = require("./routes/students");
const teachersRoutes = require("./routes/teachers");
const coursesRoutes= require("./routes/courses")
var cors = require('cors')
const app = express();
app.use(cors())
// custom logger middleware that prints the method, url and time every time the server gets a request
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log("logger middleware", method, url, time);
  next(); // move to the next function (endpoint callback)
};

app.use(logger)

app.use(express.static(path.resolve(__dirname, "./public")));
// need for converting incoming form data to json (traditional html form)
app.use(express.urlencoded({ extended: false }));
// need for converting incoming request data to json
app.use(express.json());

// routes
// students, courses, teachers
app.use("/students", studentsRoutes);
app.use("/teachers",teachersRoutes);
app.use("/courses", coursesRoutes)


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
