
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button'); //referencia al primer boton que encuntre por html

console.log('Nuevo Ticket HTML');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCrear.disabled = true;
});

// socket.emit( 'ultimo-ticket', null, ( ultimo ) => {

//     // console.log('Desde el server', ticket );

//     lblNuevoTicket.innerText = 'Ticket ' + ultimo;

// });

socket.on('ultimo-ticket', ( ultimo ) => {

    lblNuevoTicket.innerText = 'Ticket' + ultimo;

});


// socket.on('enviar-mensaje', (payload) => {
//     console.log( payload )
// });


btnCrear.addEventListener( 'click', () => {

    // const mensaje = txtMensaje.value;
    // const payload = {
    //     mensaje,
    //     id: '123ABC',
    //     fecha: new Date().getTime()
    // }
    
    // socket.emit( 'enviar-mensaje', payload, ( id ) => {
    //     console.log('Desde el server', id );
    // });

    socket.emit( 'siguiente-ticket', null, ( ticket ) => {

        // console.log('Desde el server', ticket );

        lblNuevoTicket.innerText = ticket;

    });

});