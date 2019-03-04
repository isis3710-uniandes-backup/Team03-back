# Team03-back

Para iniciar el programa es necesario tener instalado Node.js en el ambiente en el cual se vaya a ejecutar. <br>
Entrar al directorio llamado "proyecto" en el archivo descargado de la entrega a través de la consola del ambiente. <br>
Ejecutar el comando "npm install" para intalar los módulos requeridos para ejecutar el programa. <br>
Ejecutar el comando "npm start" para iniciar el servidor en la dirección localhost:8082. <br>
Acceder a los commandos REST por medio de postman. <br>
    Posibles rutas (todas comienzan con "/api"): <br>
    posibilidad -> {"/application", "/contract", "/contractor", "/creditcard", "/entry", "/offer", "/portfolio", "/service", "/user"} <br>
    POST posibilidad/ <br>
    GET posibilidad/ <br>
    GET posibilidad/{id: number} <br>
    PUT posibilidad/{id: number} <br>
    DELETE posibilidad/{id: number} <br><br>
    
Al ejecutar las pruebas que se encuentran en el paquete de Postman, es necesario asegurarse que lo id indicados en la ruta de la prueba existan ya que estos se generan automáticamente al crear registros.
