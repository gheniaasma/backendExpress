var express = require("express");
var router = express.Router();
var db = require("../models");
const Type = require("../models/Type");

// router.post('/add',(req,res)=>{
//   db.Demande.create(req.body).then((response)=>{
//     res.status(200).send(response)}).catch((err)=>{
// res.status(400).send(err)
//     })
//   });

router.post("/add", (req, res, next) => {
  db.Demande.create({
    situation_professionnelle: req.body.situation_professionnelle,
    Revenu_mensuel: req.body.Revenu_mensuel,
    Montant: req.body.Montant,
    objet: req.body.objet,
    garantie_proposé: req.body.garantie_proposé,
    periode_renbourcement: req.body.periode_renbourcement,
    statut: req.body.statut,
    date: req.body.date,
    TypeId: req.body.TypeId,
    UserId: req.body.UserId,
  })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

router.put("/update/:id", (req, res) => {
  db.Demande.update(
    {
      situation_professionnelle: req.body.situation_professionnelle,
      Revenu_mensuel: req.body.Revenu_mensuel,
      Montant: req.body.Montant,
      objet: req.body.objet,
      garantie_proposé: req.body.garantie_proposé,
      periode_renbourcement: req.body.periode_renbourcement,
      statut: req.body.statut,
      date: req.body.date,
      TypeId: req.body.TypeId,
      UserId: req.body.UserId,
    },
    { where: { id: req.params.id } }
  )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.delete("/remove/:id", (req, res) => {
  db.Demande.destroy({ where: { id: req.params.id } })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/Demande/:id", (req, res) => {
  db.Demande.findOne({
    where: { id: req.params.id },
    include: [db.Type, db.User],
  })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.get("/fetch", (req, res) => {
  db.Demande.findAll({ include: [db.Type, db.User] })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
module.exports = router;
