var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const http = require("http");
const db = require("./models");

var indexRouter = require("./routes/index");
var demandesRouter = require("./routes/demandes");
var typesRouter = require("./routes/types");
var usersRouter = require("./routes/users");
var profileRouter = require("./routes/profile-routes");
const cors = require('cors');

var app = express();

app.use(cors({
  origin: 'http://localhost:4200'
}));


db.sequelize.sync().then();
try {
  db.sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/demandes", demandesRouter);
app.use("/types", typesRouter);
app.use("/users", usersRouter);
app.use("/profile-routes", profileRouter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Methods", "*");
  res.setHeader("Access-Control-Allow-Header", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = http.createServer(app);
server.listen(3000, () => {
  console.log("server started en 3000");
});
