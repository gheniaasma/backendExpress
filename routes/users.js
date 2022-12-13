var express = require('express');
var router = express.Router();
var db=require('../models')

router.post('/add',(req,res)=>{
  db.User.create(req.body).then((response)=>{
    res.status(200).send(response)}).catch((err)=>{
res.status(400).send(err)
    })
  });

  router.put('/update/:id',(req,res)=>{
    db.User.update(req.body,{where:{id:req.params.id}}).then((response)=>{
      res.status(200).send(response)}).catch((err)=>{
        res.status(400).send(err)
      })
    });

    router.delete('/remove/:id',(req,res)=>{
      db.User.destroy({where:{id:req.params.id}}).then((response)=>{
        res.status(200).send(response)}).catch((err)=>{
          res.status(400).send(err)
      })
    });

    router.get('/User/:id',(req,res)=>{
      db.User.findOne({where:{id: req.params.id}}).then((response)=>{
        res.status(200).send(response)}).catch((err)=>{
          res.status(400).send(err)
        })
      
      });
  router.get('/fetch',(req,res)=>{
    db.User.findAll().then((response)=>{
      res.status(200).send(response)}).catch((err)=>{
        res.status(400).send(err)
      })
    });
    module.exports = router;