import express from "express";
import db from "../../database";
import Student from "../../domain/Student";
import Teacher from "../../domain/Teacher";

const router = express.Router();

// READ Routes
router.get("/students", (req, res) => {
  db.query(Student.getAllStudentSQL(), (err, data) => {
    res.send(data);
  });
});

router.get("/students/:id", (req, res) => {
  db.query(Student.getStudentByIdSQL(req.params.id), (err, data) => {
    res.send(data);
  });
});

router.get("/teachers", (req, res) => {
  db.query(Teacher.getAllTeacherSQL(), (err, data) => {
    res.send(data);
  });
});

router.get("/teachers/:id", (req, res) => {
  db.query(Teacher.getTeacherByIdSQL(req.params.id), (err, data) => {
    res.send(data);
  });
});

// Create Routes
router.post('/students', (req, res) => {
  const { firstName, lastName, gender, biology, mathematics, science, socialStudies } = req.body;
  const newStudent = { firstName, lastName, gender, biology, mathematics, science, socialStudies };
  db.query(Student.addStudentSQL(newStudent), (err, dataStudent) => {
    if (err) console.log(err);
    else {
      db.query(Student.addStudentGradesSQL(newStudent), (err, dataGrades) => {
        if (err) console.log(err);
        else {
          res.status(201);
          res.send({ dataStudent, dataGrades });
        }
      });
    }
  });
});

router.post('/teachers', (req, res) => {
  const { firstName, lastName, gender, title, discipline } = req.body;
  const newTeacher = { firstName, lastName, gender, title, discipline };
  db.query(Teacher.addTeacherSQL(newTeacher), (err, data) => {
    if (err) console.log(err);
    else {
      res.status(201);
      res.send(data);
    }
  });
});


export default router;