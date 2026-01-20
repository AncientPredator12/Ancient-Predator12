const express = require("express");
const router = express.Router();
const db = require("../config/db"); 

console.log("Student routes loaded");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tbl_student");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      "SELECT * FROM tbl_student WHERE id = ?",
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ message: "Student not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const { name, course, year_level, status } = req.body;
    const [result] = await db.query(
      "INSERT INTO tbl_student (name, course, year_level, status) VALUES (?, ?, ?, ?)",
      [name, course, year_level, status]
    );
    res.status(201).json({ message: "Student added", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, course, year_level, status } = req.body;
    await db.query(
      "UPDATE tbl_student SET name=?, course=?, year_level=?, status=? WHERE id=?",
      [name, course, year_level, status, id]
    );
    res.json({ message: "Student updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db.query("UPDATE tbl_student SET status=? WHERE id=?", [status, id]);
    res.json({ message: "Student status updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM tbl_student WHERE id=?", [id]);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
