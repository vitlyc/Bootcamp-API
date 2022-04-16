require("dotenv").config({ path: "./config/config.env" });
const path = require("path");
const express = require("express");
const logger = require("./middleware/logger");
const morgan = require("morgan");
const colors = require("colors");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middleware/error");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
connectDB();
//Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// File uploading
app.use(fileUpload());
//Set static folder
app.use(express.static(path.join(__dirname, "public")));
//Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

app.get("/test", (req, res) => {
  res.status(405).send("hi");
});
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
console.log(`${process.env.NODE_ENV} ${PORT}`);
//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`);
  //close server and exit process
  server.close(() => process.exit(1));
});
