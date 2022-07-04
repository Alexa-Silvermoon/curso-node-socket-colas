
// console.log('Escritorio HTML');

const lblEscritorio = document.querySelector('h1');//toma el primer h1 que encuntra en escritorio.html
const btnAtender = document.querySelector('button');//toma el primer boton que encuntra en escritorio.html
const lblTicket = document.querySelector('small'); // toma el primer small que encuntra en escritorio.html
const divAlaerta = document.querySelector('.alert');// toma la primera clase de alert que encuntra en escritorio.html
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams( window.location.search );
// http://localhost:8080/escritorio.html?escritorio=es

if ( !searchParams.has('escritorio')){

    window.location = 'index.html';
    // si la palabra escritorio no esta completa en la barra de busqueda, entonces el usuarios sera regresado
    // a la pantalla http://localhost:8080/index.html

    throw new Error('El escritorio es obligatorio');

}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
// console.log({ escritorio });

divAlaerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender  .disabled = true;
    
});

// socket.emit( 'ultimo-ticket', null, ( ultimo ) => {

//     // console.log('Desde el server', ticket );

//     lblNuevoTicket.innerText = 'Ticket ' + ultimo;

// });

socket.on('ultimo-ticket', ( ultimo ) => {

    // lblNuevoTicket.innerText = 'Ticket' + ultimo;

});

// socket.on('enviar-mensaje', (payload) => {
//     console.log( payload )
// });

// socket.on( 'tickets-pendientes', ( enCola ) => {

//     lblPendientes.innerText = enCola.length;

// }); vvvvvvvvvvvvvvvvvv

// socket.emit( 'tickets-pendientes', null, ( enCola ) => {

//     lblPendientes.innerText = enCola.length;

// }); VVVVVVVVVVVVVVVVVVVVVV

socket.on( 'tickets-pendientes', ( pendientes ) => {

    if ( pendientes === 0 ){

        lblPendientes.style.display = 'none';

    } else {

        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes;

    }

});

btnAtender.addEventListener( 'click', () => {

    // const mensaje = txtMensaje.value;
    // const payload = {
    //     mensaje,
    //     id: '123ABC',
    //     fecha: new Date().getTime()
    // }
    
    // socket.emit( 'enviar-mensaje', payload, ( id ) => {
    //     console.log('Desde el server', id );
    // });

    // socket.emit( 'siguiente-ticket', null, ( ticket ) => {

    //     // console.log('Desde el server', ticket );

    //     lblNuevoTicket.innerText = ticket;

    // });
    // socket.emit( 'atender-ticket', { escritorio }, ( payload ) => {
    socket.emit( 'atender-ticket', { escritorio }, ( { ok, ticket, msg } ) => {

        // console.log( payload );

        if ( !ok ){

            lblTicket.innerText = 'No hay nadie por atender';

            return divAlaerta.style.display = '';

        }

        lblTicket.innerText = 'Ticket ' + ticket.numero;

    });

    // socket.emit( 'tickets-pendientes', null, ( enCola ) => {

    //     lblPendientes.innerText = enCola.length;
    
    // }); VVVVVVVVVVVVVVVV

});