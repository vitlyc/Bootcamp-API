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

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
