import cors from "cors";
import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import * as dotenv from "dotenv";
import noteRouter from "./routes/note";
import usersRouter from "./routes/users";
import homePage from "./routes/page"
import mongoose from "mongoose";


dotenv.config();


const app = express();
app.use(cors());

const CONNECTION_STRING = process.env.CONNECTION_STRING;

(async () => {
  mongoose.connect(CONNECTION_STRING!)
  console.log("Database connected")
})()


// const corsOptions = {
//   origin: "https://note-app-qde3.onrender.com"
// };


// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/note", noteRouter);
app.use("/users", usersRouter);
 app.use("/", homePage);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err:createError.HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development    
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page    
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 4000;

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
});
export default app;


