var express = require("express");
var router = express.Router();
var db = require("../models");
var bcrypt = require('bcrypt');

const User = require("../models/User");
const usercontroller = require("../controllers/usercontroller");
const { authJwt } = require("../middleware");
const { response } = require("express");
const { token } = require("morgan");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};

router.post("/register", (req, res) => {
  usercontroller
    .register(req.body.username, req.body.cin, req.body.datenaiss, req.body.rib, req.body.email, req.body.password)
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(400).json(err));
});

router.post("/login", (req, res) => {
  usercontroller
    .login(req.body.email, req.body.password)
    .then((token) => res.status(200).json({ token: token }))
    .catch((err) => res.status(400).json({ err: err }));
});

router.get("/current", (req, res) => {
  usercontroller
    .current()
    .then((data) => res.status(200).json({ data: data }))
    .catch((err) => res.status(400).json({ err: err }));
});

router.put("/updateuser/:id", (req, res) => {
  db.User.update(req.body, { where: { id: req.params.id } })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.delete("/removeuser/:id", (req, res) => {
  db.User.destroy({ where: { id: req.params.id } })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/User/:id", (req, res) => {
  db.User.findOne({ where: { id: req.params.id } })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/allusers", [authJwt.verifyToken], (req, res) => {
  db.User.findAll()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
