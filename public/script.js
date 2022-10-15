const studentsDiv = document.querySelector("#students");
const coursesDiv = document.querySelector("#courses");
const teachersDiv = document.querySelector("#teachers");
const studentsInputDiv = document.querySelector("#student-form");
const teachersInputDiv = document.querySelector("#teacher-form");
const fetchStudents = async () => {
    try {
        const response = await fetch('http://localhost:5000/students');
        const students = await response.json();
        studentsDiv.innerHTML += '<ul>'
        for (student of students) {
            studentsDiv.innerHTML += `<li>${student.name}</li>`;
        }
    } catch (error) {
        console.log(error);
    }
}
const fetchcourses = async () => {
    try {
        const response = await fetch('http://localhost:5000/courses');
        const courses = await response.json();
        coursesDiv.innerHTML += '<ul>'
        for (course of courses) {
            coursesDiv.innerHTML += `<li>${course.title}, id=${course.id}</li>`;
        }
    } catch (error) {
        console.log(error);
    }
}

const fetchteachers = async () => {
    try {
        const response = await fetch('http://localhost:5000/teachers');
        const teachers = await response.json();
        teachersDiv.innerHTML += '<ul>'
        for (teacher of teachers) {
            teachersDiv.innerHTML += `<li>${teacher.name}</li>`;
        }
    } catch (error) {
        console.log(error);
    }
}

fetchStudents()
fetchcourses()
fetchteachers()

const teacherBtn = document.querySelector("#teacher-submit-btn");
const teacherName = document.querySelector("#teacher-name");
const teacherCourses = document.querySelector("#teacher-courses");
teacherBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // prevent form from redirecting
    const newName = teacherName.value;
    const coursesIds=teacherCourses.value.split(",").map(id=> Number(id));
    try {
        const response = await fetch('http://localhost:5000/teachers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName, coursesIds: coursesIds })
        });
        const newTeacher = await response.json();
        const name = newTeacher.name;
        teachersDiv.innerHTML += `<li>${name}</li>`;
    } catch (error) {
        console.log(error);
    }
});

const studentBtn = document.querySelector("#student-submit-btn");
const studentName = document.querySelector("#student-name");
const studentCourses = document.querySelector("#student-courses");
studentBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // prevent form from redirecting
    const newName = studentName.value;
    const coursesIds=studentCourses.value.split(",").map(id=> Number(id));
    try {
        const response = await fetch('http://localhost:5000/students', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName, coursesIds: coursesIds })
        });
        const newStudent = await response.json();
        const name = newStudent.name;
        studentsDiv.innerHTML += `<li>${name}</li>`;
    } catch (error) {
        console.log(error);
    }
});
const courseBtn = document.querySelector("#course-submit-btn");
const courseTitle = document.querySelector("#title");
const courseCode = document.querySelector("#courseCode");
const courseDescription = document.querySelector("#description");
courseBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // prevent form from redirecting
    const cTitle = courseTitle.value;
    const code= courseCode.value;
    const description= courseDescription.value;
    try {
        const response = await fetch('http://localhost:5000/courses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courseCode: code, title: cTitle, description: description })
        });
        const newCourse = await response.json();
        const title = newCourse.title;
        coursesDiv.innerHTML += `<li>${title}, id=${newCourse.id}</li>`;
    } catch (error) {
        console.log(error);
    }
});