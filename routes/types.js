var express = require('express');
var router = express.Router();
var db=require('../models')

router.post('/add',(req,res)=>{
  db.Type.create(req.body).then((response)=>{
    res.status(200).send(response)}).catch((err)=>{
res.status(400).send(err)
    })
  });

  router.put('/update/:id',(req,res)=>{
    db.Type.update(req.body,{where:{id:req.params.id}}).then((response)=>{
      res.status(200).json(response)}).catch((err)=>{
        res.status(400).json(err)
      })
    });

    router.delete('/remove/:id',(req,res)=>{
      db.Type.destroy({where:{id:req.params.id}}).then((response)=>{
        res.status(200).json(response)}).catch((err)=>{
          res.status(400).json(err)
      })
    });

    router.get('/Type/:id',(req,res)=>{
      db.Type.findOne({where:{id: req.params.id}}).then((response)=>{
        res.status(200).send(response)}).catch((err)=>{
          res.status(400).send(err)
        })
      
      });
  router.get('/fetch',(req,res)=>{
    db.Type.findAll().then((response)=>{
      res.status(200).send(response)}).catch((err)=>{
        res.status(400).send(err)
      })
    });
    module.exports = router;