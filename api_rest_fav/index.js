'use strict'
var mongoose = require('mongoose');
var app=require('./app');
var port=process.env.PORT || 3000;

mongoose.connect('mongodb://mongodb/favorite_task', { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(error => console.error(error));
var db = mongoose.connection;
db.on("error", error => {
  console.error.bind(console, "Connection error");
});
db.once("open", () => {
  console.log("- Conexión a MongoDB, correcta, mongodb://localhost:27017/favorite_task");
  app.listen(port, function (){
    console.log(`- Servidor funcionando correctamente, desde http://localhost:${port}`);
  });
});
