import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "./src/routes/web";
import hbs from "express-handlebars";
import path from "path";

const app = express();

app.use(morgan("dev"));
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

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
