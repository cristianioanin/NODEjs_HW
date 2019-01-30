import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import methodoverride from "method-override";

import studentsRoutes from "./routes/api/students";
import teachersRoutes from "./routes/api/teachers";
import landingRoute from "./routes/landing";
import apiRoutes from "./routes/api/api";

const app = express();

app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));
app.use(methodoverride('_method'));

app.use("/", landingRoute);
app.use("/students", studentsRoutes);
app.use("/teachers", teachersRoutes);
app.use("/api", apiRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 501);
  res.json({
    error: {
      code: err.status || 501,
      message: err.message
    }
  });
});

module.exports = app;