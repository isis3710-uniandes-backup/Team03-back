# Team03-back

## Descripcion 
Plataforma de Contratación de Freelancers que permite la auto exposición por medio de portafolios profesionales,el usuario puede ofrecer una serie de servicios predefinidos con precios o aceptar proyectos personalizados. Algunas caracteristicas adicionales: 

*   División por medio del tipo de proyectos
*   Ofertas de trabajo y contratación en proyectos de corto alcance
*   Se mediaría en temas de pago 
*   Se acuerda plazos de entregables y de los pagos

## Instrucciones de Despliegue

Para iniciar el programa es necesario tener instalado Node.js en el ambiente en el cual se vaya a ejecutar. <br>

### Pasos
1.  Entrar al directorio llamado "proyecto" en el archivo descargado de la entrega a través de la consola del ambiente. <br>
2.  Ejecutar el comando "npm install" para intalar los módulos requeridos para ejecutar el programa. <br>
3.  Ejecutar el comando "npm run webpack" para compilar el front. <br>
4.  Ejecutar el comando "npm start" para iniciar el servidor en la dirección localhost:8082. <br>
5.  Acceder a los commandos REST por medio de postman. <br>
    Posibles rutas (todas comienzan con "/api"): <br>
    posibilidad -> {"/application", "/contract", "/contractor", "/creditcard", "/entry", "/offer", "/portfolio", "/service", "/user"} <br>
    *   POST posibilidad/ <br>
    *   GET posibilidad/ <br>
    *   GET posibilidad/{id: number} <br>
    *   PUT posibilidad/{id: number} <br>
    *   DELETE posibilidad/{id: number} <br><br>
    
Al ejecutar las pruebas que se encuentran en el paquete de Postman, es necesario asegurarse que lo id indicados en la ruta de la prueba existan ya que estos se generan automáticamente al crear registros.
