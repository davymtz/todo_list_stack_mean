# STACK MEAN APP
Esto es una aplicación hecha para poner en práctica como se realizar una aplicación con Nodejs, Angular 9, Express y Mongodb, y correrlo en algunos contenedores en docker

## Requisitos principales
 - [Docker](https://hub.docker.com/search?q=&type=edition&offering=community)
 - [docker-compose](https://docs.docker.com/compose/install/)
 - Tu IDE favorito

Los contenedores que se ejecutarán, obtendrán 1 servicio cada uno:
- Mongodb version 4.2.17
- Angular 9
- Nodejs v14.3.0 y express

## Pasos para ejecutar la aplicación:
1. Ejecutar el siguiente comando en consola:
`[sudo] docker-composer up -d`
Y nos debería de salir algo como esto, en caso de exito:
```
Creating network "stack_mean_default" with the default driver
Creating mongo_server   ... done
Creating angular-client ... done
Creating express-server ... done
```
2. Ejecutar el siguiente comando:
`[sudo] docker exec -it mongo_server bash -c "sh create_db.sh"`
si todo sale bien podiblemente se vea en consola el siguiente mensaje:
```
MongoDB shell version v4.2.7
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("ac01c62d-6bae-424a-ba8e-6e564818584f") }
MongoDB server version: 4.2.7
switched to db favorite_course
WriteResult({ "nInserted" : 1 })
favorite_course
bye
```
3. Si todo sale bien y no produce ningún error, podemos ver el proyecto funcionando en la siguiente ruta: 
[localhost:4200](http://localhost:4200)

## Contenedores y puertos:
Los contenedores exponen los siguientes puertos:
- __Nodejs__ en el puerto 3000
- __Angular__ en el puerto 4200
- __Mongodb__ en el puerto 27017

### Notas:
Para poder ver los contenedores ejecutandose, puede hacerlo con el siguiente comando en la terminal:
`[sudo] docker ps`

Una vez terminado de ejecutar las pruebas necesarias, puede detener los procesos y eliminar los contenedores con __*docker-compose*__:
`[sudo] docker-compose down`
