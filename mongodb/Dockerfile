# Se creará contenedor personalizado de base de datos
#para poder arrancar nuestra base de datos y ejecutar nuestra aplicacion sin problemas
FROM mongo:4.2.7-bionic

COPY create_db.sh ./create_db.sh

RUN chmod +x ./create_db.sh
