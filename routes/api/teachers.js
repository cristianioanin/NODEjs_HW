import express from "express";
import db from "../../database";
import Teacher from "../../domain/Teacher";
import axios from "axios";

const router = express.Router();

// READ Route
router.get("/", (req, res) => {
  db.query(Teacher.getAllTeacherSQL(), (err, data) => {
    if (err) console.log(err);

    const teachers = data.map(teacher => new Teacher(teacher));
    let iterations = teachers.length;
    teachers.forEach(teacher => {
      axios.get(`https://randomuser.me/api/?inc=picture,email&gender=${teacher.gender}`)
        .then(response => {
          const picture = response.data.results[0].picture.large;
          const email = response.data.results[0].email;
          teacher.profilePicture = picture;
          teacher.email = email;
          iterations--;
          if (iterations === 0) {
            res.render('teachers/index', { page: 'teachers', teachers });
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
  res.render('teachers/new');
});

router.post('/', (req, res) => {
  const { firstName, lastName, gender, title, discipline } = req.body;
  const newTeacher = { firstName, lastName, gender, title, discipline };
  db.query(Teacher.addTeacherSQL(newTeacher), (err, data) => {
    if (err) console.log(err);
    else res.redirect('/teachers');
  });
});

// UPDATE Route
router.get('/:id/edit', (req, res) => {
  db.query(Teacher.getTeacherByIdSQL(req.params.id), (err, data) => {
    if (err) res.redirect('back');
    else {
      const teacher = new Teacher(data[0]);
      res.render('teachers/edit', { teacher });
    }
  });
});

router.put('/:id', (req, res) => {
  const { firstName, lastName, gender, title, discipline } = req.body;
  const updatedTeacher = { firstName, lastName, gender, title, discipline };
  db.query(Teacher.updateTeacherByIdSQL(req.params.id, updatedTeacher), (err, data) => {
    if (err) res.redirect('back');
    else res.redirect('/teachers');
  });
});

// DELETE Route
router.delete('/:id', (req, res) => {
  db.query(Teacher.deleteTeacherByIdSQL(req.params.id), (err) => {
    if (err) res.redirect('back');
    else res.redirect('/teachers');
  });
});

module.exports = router;