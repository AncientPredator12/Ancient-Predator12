const Student = require("../models/students.model");


const getStudents = async (req, res) => {
    try{
        const student = await Employee.getAllStudents();
        res.json(students);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
   
}
const getStudent = async (req, res) => {
  try {
    const student = await Employee.getStudentById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addStudent = async (req, res) => {
  try {
    const result = await Employee.createStudent(req.body);
    res.status(201).json({
      id: result.insertId,
      ...req.body,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editStudent = async (req, res) => {
  try {
    await Student.updateStudent(req.params.id, req.body);
    res.json({ message: "Student updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const changeStudentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await Student.updateStudentStatus(req.params.id, status);
    res.json({ message: "Status updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeStudent = async (req, res) => {
  try {
    await Student.deleteStudent(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    getStudent,
    getStudent,
    addStudent,
    editStudent,
    changeStudentStatus,
    removeStudent,
}