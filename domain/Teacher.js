class Teacher {

  constructor(teacher) {
    const { id, firstName, lastName, gender, title, discipline } = teacher;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.title = title;
    this.discipline = discipline;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static addTeacherSQL(teacher) {
    let sql = `INSERT INTO teachers (firstName, lastName, gender, title, discipline)
    VALUES('${teacher.firstName}', '${teacher.lastName}', '${teacher.gender}', '${teacher.title}', '${teacher.discipline}')`;
    return sql;
  }

  static getTeacherByIdSQL(id) {
    let sql = `SELECT * FROM teachers WHERE id = ${id}`;
    return sql;
  }

  static updateTeacherByIdSQL(id, teacher) {
    let sql = `UPDATE teachers 
    SET firstName='${teacher.firstName}',
    lastName='${teacher.lastName}',
    gender='${teacher.gender}',
    title='${teacher.title}',
    discipline='${teacher.discipline}'
    WHERE id=${id};`
    return sql;
  }

  static deleteTeacherByIdSQL(id) {
    let sql = `DELETE FROM teachers WHERE id = ${id}`;
    return sql;
  }

  static getAllTeacherSQL() {
    let sql = `SELECT * FROM teachers`;
    return sql;
  }
}

export default Teacher;