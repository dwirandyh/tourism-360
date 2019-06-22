import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "./app/routes/web";
import hbs from "express-handlebars";
import path from "path";
import multer from "multer";
const upload = multer();

const app = express();

// enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, x-auth-token");
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(morgan("dev"));
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploads", express.static(process.cwd() + "/uploads"));

app.use(router);

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "welcome",
    layoutsDir: path.join(__dirname, "/src/views")
  })
);
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "hbs");

export default app;
