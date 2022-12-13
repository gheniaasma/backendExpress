var express = require("express");
var router = express.Router();
var db = require("../models");

router.post("/addprofile", (req, res) => {
  db.profile
    .create(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.put("/updateprofile/:id", (req, res) => {
  db.profile
    .update(req.body, { where: { id: req.params.id } })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.delete("/removeprofile/:id", (req, res) => {
  db.profile
    .destroy({ where: { id: req.params.id } })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/profile/:id", (req, res) => {
  db.profile
    .findOne({ where: { id: req.params.id } })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.get("/allprofiles", (req, res) => {
  db.profile
    .findAll()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
module.exports = router;
