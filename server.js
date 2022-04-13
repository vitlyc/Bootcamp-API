require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const logger = require("./middleware/logger");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
connectDB();
const routes = require("./routes/bootcamps");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// app.use(logger);
app.use("/api/v1/bootcamps", routes);

app.use(errorHandler);

app.get("/test", (req, res) => {
  res.status(405).send("hi");
  console.log(process.env.PORT);
  console.log(process.env.MONGO_URI);
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
