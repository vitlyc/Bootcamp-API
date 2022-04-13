require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const bootcamps = require("./routes/bootcamps");
const PORT = process.env.PORT || 5000;
const logger = require("./middleware/logger");
const morgan = require("morgan");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// app.use(logger);

app.use("/api/v1/bootcamps", bootcamps);

app.get("/test", (req, res) => {
  res.status(405).send("hi");
  console.log("hi");
});
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`);
  //close server and exit process
  server.close(() => process.exit(1));
});
