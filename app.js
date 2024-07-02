const express = require("express");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const app = express();

mongoose
  .connect(`${config.MONGODB_URI}`)
  .then(() => {
    logger.info("Connected to MONGODB");
  })
  .catch((err) => {
    logger.error(`Couldn't connect to MONGOBD: ${err.message}`);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestInfo);
app.use(middleware.extractToken);
app.use("/api/blogs", middleware.extractUser, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(middleware.errorHandler);

module.exports = app;
