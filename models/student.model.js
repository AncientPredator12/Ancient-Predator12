const db = require("../config/db")

const getAllStudents = async () => {
  const [rows] = await db.query("SELECT * FROM tbl_student");
  return rows;
};

const getStudentById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_student WHERE id = ?",
    [id]
  );
  return rows[0]; 
};

const createStudent = async (user) => {
  const { firstname,lastname, gender,department_id } = user;
  const [result] = await db.query(
    "INSERT INTO tbl_student (firstname,lastname, gender,department_id ) VALUES (?, ?, ?, ?)",
    [firstname,lastname, gender,department_id]
  );
  return result;
};

const updateStudent  = async (id, { firstname, lastname, gender, department_id }) => {
  const [result] = await db.query(
    "UPDATE tbl_student SET firstname = ?, lastname = ?, gender = ?, department_id = ? WHERE id = ?",
    [firstname, lastname, gender, department_id, id]
  );
  return result;
};

const updateStudentStatus = async (id, status) => {
  const [result] = await db.query(
    "UPDATE tbl_student SET status = ? WHERE id = ?",
    [status, id]
  );
  return result;
};

const deleteStudent = async (id) => {
  const [result] = await db.query(
    "DELETE FROM tbl_student WHERE id = ?",
    [id]
  );
  return result;
};


module.exports = {
    getAllStudent,
    getStudentById,
    createStudent,
    updateStudent,
    updateStudentStatus,
    deleteStudent,
};