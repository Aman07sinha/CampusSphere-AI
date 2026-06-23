const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Import your custom routes here
const authRoutes = require("./module/auth/auth.routes");
const studentRoutes = require("./module/student/student.routes");
const subjectRoutes = require("./module/subject/subject.routes");

const app = express();

// Global Middleware Layers
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// Connect Module API Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/subject", subjectRoutes);
app.get("/", (req,res)=>{

    res.send("AI College ERP Backend Running");

});


module.exports = app;