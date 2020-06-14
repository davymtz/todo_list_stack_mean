'use strict'
var express=require('express');
var FavoriteController=require('../controllers/favorite');
var api=express.Router();

api.get('/prueba/:nombre?', FavoriteController.test);
api.get('/favorite/search/:id', FavoriteController.getFavorite);
api.get('/favorite/incomplete', FavoriteController.getListFavoriteIncomplete);
api.get('/favorite/complete', FavoriteController.getListFavoriteComplete);
api.post('/favorite/', FavoriteController.saveFavorite);
api.put('/favorite/:id', FavoriteController.updateFavorite);
api.put('/favorite/checked/:id', FavoriteController.updateChecked);
api.delete('/favorite/:id', FavoriteController.deleteFavorite);

module.exports=api;
