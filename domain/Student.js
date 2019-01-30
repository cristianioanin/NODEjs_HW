class Student {

  constructor(student) {
    const { id, firstName, lastName, gender, biology, mathematics, science, socialStudies } = student;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.grades = {
      biology,
      mathematics,
      science,
      socialStudies
    }
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get averageScore() {
    const gradesCount = Object.values(this.grades).length;
    const gradesTotal = Object.values(this.grades).reduce((a, b) => a + b);

    return (gradesTotal / gradesCount).toFixed(2);
  }

  upperFirstChar(string) {
    return string[0].toUpperCase().concat(string.substr(1));
  }

  static addStudentSQL(student) {
    let sql = `INSERT INTO students (firstName, lastName, gender)
    VALUES('${student.firstName}', '${student.lastName}', '${student.gender}')`;
    return sql;
  }

  static addStudentGradesSQL(student) {
    let sql = `INSERT INTO grades (biology, mathematics, science, socialStudies)
    VALUES(${student.biology}, ${student.mathematics}, ${student.science}, ${student.socialStudies})`;
    return sql;
  }

  static getStudentByIdSQL(id) {
    let sql = `SELECT * FROM students
    INNER JOIN grades ON students.id = grades.id
    WHERE students.id=${id}`;
    return sql;
  }

  static updateStudentByIdSQL(id, student) {
    let sql = `UPDATE students, grades 
    SET students.firstName='${student.firstName}',
    students.lastName='${student.lastName}',
    students.gender='${student.gender}',
    grades.biology=${student.biology},
    grades.mathematics=${student.mathematics},
    grades.science=${student.science},
    grades.socialStudies=${student.socialStudies}
    WHERE students.id=grades.id
    AND students.id=${id};`
    return sql;
  }

  static deleteStudentByIdSQL(id) {
    let sql = `DELETE FROM students WHERE id=${id}`;
    return sql;
  }

  static deleteStudentGradesByIdSQL(id) {
    let sql = `DELETE FROM grades WHERE id=${id}`;
    return sql;
  }

  static getAllStudentSQL() {
    let sql = `SELECT * FROM students
    INNER JOIN grades ON students.id = grades.id`;
    return sql;
  }
}

export default Student;