'use strict'
var favoriteModel = require('../models/favorite');

function test(req,res) {
  var nombre=(req.params.nombre)?req.params.nombre:"<<SIN NOMBRE>>";
  res.status(200).send({data:[1,2,4],texto: "Prueba de texto stack MEAN", nombre: "Soy "+nombre});
}

function getListFavoriteIncomplete(req,res) {
  favoriteModel.find({activity_checked:false},(err, result)=>{
    if(err){
      res.status(500).send({message:"[getListFavoriteIncomplete]: Error al devolver los  marcadores"});
    } else if(result.length==0) {
      res.status(200).send({message:"[getListFavoriteIncomplete]: No se encontraron registros", result:result});
    } else {
      res.status(200).send({result});
    }
  }).sort({created_at:1});
}

function getListFavoriteComplete(req,res) {
  favoriteModel.find({activity_checked:true},(err, result)=>{
    if(err){
        res.status(500).send({message:"[getListFavoriteComplete]: Error al devolver los  marcadores"});
    } else if(result.length==0) {
        res.status(200).send({message:"[getListFavoriteComplete]: No se encontraron registros",result:result});
    } else {
        res.status(200).send({result});
    }
  }).sort({created_at:1});
}

function getFavorite(req,res) {
    var id=req.params.id;
    favoriteModel.find({_id:id}, (err, result)=>{
        if(err) res.status(500).send({message: "[getFavorite]: Error al devolver los datos"});
        if(result.length==0){
            res.status(404).send({message:"[getFavorite]: No existe ese registro"});
        }
        res.status(200).send({result});
    });
}

function saveFavorite(req,res) {
  var favorite =  new favoriteModel();
  var params = req.body;
  favorite.activity=params.activity;
  favorite.created_at=new Date(params.created_at);
  favorite.due_date_at=params.due_date_at;
  favorite.activity_checked=params.activity_checked;
  favorite.save((err,favoriteStore)=>{
    if(err) res.status(500).send({message:"Error en el guardado"});
    res.status(200).send({favorite:favoriteStore});
  });
}

function updateFavorite(req,res) {
  var id=req.params.id;
  var params = req.body;
  favoriteModel.updateOne({_id:id},{$set:{activity: params.activity, due_date_at: params.due_date_at}},(err, result)=>{
    if(err) res.status(500).send({message:"Error al actualizar registro"});
    res.status(200).send({favorito: result});
  });
}

function updateChecked(req,res){
  var id = req.params.id;
  var params = req.body;
    favoriteModel.updateOne({_id:id},{$set:{activity_checked: params.checked}},(err, result)=>{
        if(err) res.status(500).send({message:"Error al actualizar registro"});
        res.status(200).send({favorito: result});
    });
}

function deleteFavorite(req,res) {
  var id=req.params.id;
  favoriteModel.deleteOne({_id:id},(err,result)=>{
    if(err) res.status(500).send({message:"Error al eliminar registro"});
    res.status(200).send({favorito:result});
  });
}

module.exports={
  test,
  getFavorite,
  getListFavoriteIncomplete,
  getListFavoriteComplete,
  saveFavorite,
  updateFavorite,
  updateChecked,
  deleteFavorite
};
