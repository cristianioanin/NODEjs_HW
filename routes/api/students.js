import express from "express";
import db from "../../database";
import Student from "../../domain/Student";
import axios from "axios";

const router = express.Router();

// READ Route
router.get("/", (req, res) => {
  db.query(Student.getAllStudentSQL(), (err, data) => {
    if (err) console.log(err);

    const students = data.map(student => new Student(student));
    let iterations = students.length;
    students.forEach(student => {
      axios.get(`https://randomuser.me/api/?inc=picture&gender=${student.gender}`)
        .then(response => {
          const picture = response.data.results[0].picture.large;
          student.profilePicture = picture;
          iterations--;
          if (iterations === 0) {
            res.render('students/index', { page: 'students', students });
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
});

// CREATE Route
router.get('/new', (req, res) => {
  res.render('students/new');
});

router.post('/', (req, res) => {
  const { firstName, lastName, gender, biology, mathematics, science, socialStudies } = req.body;
  const newStudent = { firstName, lastName, gender, biology, mathematics, science, socialStudies };
  db.query(Student.addStudentSQL(newStudent), (err, data) => {
    if (err) console.log(err);
    else {
      db.query(Student.addStudentGradesSQL(newStudent), (err, data) => {
        if (err) console.log(err);
        else res.redirect('/students');
      });
    }
  });
});

// UPDATE Route
router.get('/:id/edit', (req, res) => {
  db.query(Student.getStudentByIdSQL(req.params.id), (err, data) => {
    if (err) res.redirect('back');
    else {
      const student = new Student(data[0]);
      res.render('students/edit', { student, grades: student.grades });
    }
  });
});

router.put('/:id', (req, res) => {
  const { firstName, lastName, gender, biology, mathematics, science, socialStudies } = req.body;
  const updatedStudent = { firstName, lastName, gender, biology, mathematics, science, socialStudies };
  db.query(Student.updateStudentByIdSQL(req.params.id, updatedStudent), (err, data) => {
    if (err) res.redirect('back');
    else res.redirect('/students');
  });
});

// DELETE Route
router.delete('/:id', (req, res) => {
  db.query(Student.deleteStudentByIdSQL(req.params.id), (err) => {
    if (err) res.redirect('back');
    else {
      db.query(Student.deleteStudentGradesByIdSQL(req.params.id), (err) => {
        if (err) res.redirect('back');
        res.redirect('/students');
      });
    }
  });
});

module.exports = router;