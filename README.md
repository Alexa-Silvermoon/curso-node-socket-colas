# Socket Server Basico de Colas - Turnos
Un servidor de Websockets usando Node, Express y Socket.io,
funciona a modo de turnos, es decir para hacer filas y esperar su turno,
usualmente esta app se le ve en bancos y EPS para hacer la fila.

Esta app cuenta con:

```
pantalla publica ( la que ve la gente mientras espera ).

pantalla generadora de tickets ( turnos ).

pantalla escritorio ( los recepcionistas que atienden los clientes ).
```

No olvidar reconstruir la carpeta node_modules con el comando:
```
npm install
```

COMANDOS PARA EJECUTAR EN EL CMD:
```
node app.js    o    nodemon app.js
```

EN GOOGLE CHROME ABRIR COMO:
```
http://localhost:8080/
```

PARA ESCUCHAR EL SONIDO DE SIGUIENTE TICKETS, EN MOZILLA ABRIR COMO:
```
http://localhost:8080/
```
y habilitar los sonidos desde la barra de navegacion