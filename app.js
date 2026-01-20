const express = require("express");
const cors = require("cors");
const app = express();
const studentRoutes = require("./routes/student.routes");

app.use(cors());
app.use(express.json());
app.use("/api/student", studentRoutes);

app.get("/", (req,res)=>{
    res.send("API is running...");
});

module.exports = app;