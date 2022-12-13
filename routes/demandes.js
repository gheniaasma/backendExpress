var express = require('express');
var router = express.Router();
var db=require('../models');
var Op = db.Sequelize.Op;
const Type = require('../models/Type');

// router.post('/add',(req,res)=>{
//   db.Demande.create(req.body).then((response)=>{
//     res.status(200).send(response)}).catch((err)=>{
// res.status(400).send(err)
//     })
//   });

router.post('/add', async (req,res,next)=>{
  console.log(req.body)
  //const TypeId = await Type.findOne({where :{TypeId:id}})
  db.Demande.create({
    situation_professionnelle:req.body.situation_professionnelle,
    Revenu_mensuel:req.body.Revenu_mensuel,
   Montant:req.body.Montant,
    objet:req.body.objet,
    garantie_propose:req.body.garantie_propose,
    periode_renbourcement:req.body.periode_renbourcement,
    statut:req.body.statut,
    date:req.body.date,
    TypeId:parseInt(req.body.nom_type),
    UserId:parseInt(req.body.nom_user)

  }).then((response)=>res.status(200).json(response))
  .catch((err)=>{
    res.status(400).json(err)
    console.log(err)
  })

        
       });


  router.put('/update/:id',(req,res)=>{
    console.log(req.body)

    db.Demande.update({ situation_professionnelle:req.body.situation_professionnelle,
      Revenu_mensuel:req.body.Revenu_mensuel,
     Montant:req.body.Montant,
      objet:req.body.objet,
      garantie_propose:req.body.garantie_propose,
      periode_renbourcement:req.body.periode_renbourcement,
      statut:req.body.statut,
      date:req.body.date,
      TypeId:parseInt(req.body.nom_type),
      UserId:req.body.UserId 
    },
      {where:{id:req.params.id}}).then((response)=>{
      res.status(200).json(response)}).catch((err)=>{
        res.status(400).json(err)
      })
    });


    //update accepté
    router.get('/refuse/:id',(req,res)=>{
      db.Demande.update({ Etat_demande:"réfusé"},
        {where:{id:req.params.id}}).then((response)=>{
        res.status(200).json(response)}).catch((err)=>{
          res.status(400).json(err)
        })
      });

    // updateréfusé//


    router.get('/accepte/:id',(req,res)=>{
      db.Demande.update({ Etat_demande:"accepté"
      },
        {where:{id:req.params.id}}).then((response)=>{
        res.status(200).json(response)}).catch((err)=>{
          res.status(400).json(err)
        })
      });
    //

    router.delete('/remove/:id',(req,res)=>{
      db.Demande.destroy({where:{id:req.params.id}}).then((response)=>{
        res.status(200).json(response)}).catch((err)=>{
          res.status(400).json(err)
      })
    });

    router.get('/Demande/:id',(req,res)=>{
      db.Demande.findOne({where:{id: req.params.id},include:[db.Type,db.User]}).then((response)=>{
        res.status(200).send(response)}).catch((err)=>{
          res.status(400).send(err)
        })
      
      });
  router.get('/fetch',(req,res)=>{
  
    db.Demande.findAll({include:[db.Type,db.User]}).then((response)=>{
      res.status(200).send(response)}).catch((err)=>{
        res.status(400).send(err)
      })
     
    });

    router.get('/filter?',(req,res,next)=>{
      const situation_professionnelle = req.query.situation_professionnelle;
    var condition = situation_professionnelle ? { situation_professionnelle: { [Op.like]: `%${situation_professionnelle}%` } } : null;
      db.Demande.findAll({where: condition ,include:[db.Type,db.User]}).then((response)=>{
        res.status(200).send(response)}).catch((err)=>{
          res.status(400).send(err)
        })
      
      });


    
    module.exports = router;
  

