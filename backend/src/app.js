const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Import your custom routes here
const authRoutes = require("./module/auth/auth.routes");

const app = express();

// Global Middleware Layers
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// Connect Module API Routes
app.use("/api/auth", authRoutes);

app.get("/", (req,res)=>{

    res.send("AI College ERP Backend Running");

});


module.exports = app;