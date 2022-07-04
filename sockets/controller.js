const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    // console.log('Cliente conectado', socket.id );

    // socket.on('disconnect', () => {

    //     // console.log('Cliente desconectado', socket.id );
        
    // });

    // socket.on('ultimo-ticket', ( payload, callback ) => {

    //     const ultimo = ticketControl.ultimo;
    //     callback( ultimo );

    // });

    socket.emit( 'ultimo-ticket', ticketControl.ultimo );

    socket.emit( 'estado-actual', ticketControl.ultimos4 );

    // socket.emit( 'tickets-pendientes', ticketControl.tickets.length );

    // socket.emit( 'tickets-pendientes', ticketControl.tickets );  VVVVVVVVVVVVVVVVVVV

    // socket.on( 'tickets-pendientes', ( payload, callback ) => {

    //     const enCola = ticketControl.tickets;
    //     callback( enCola );

    // });  VVVVVVVVVVVVVVVVVVVVVVVVV

    // TAREA tickets-pendientes, TAREA ticketControl.tickets.length
    // TAREA mostrar " en cola " cuantos tickets estan pendietess

    socket.on('siguiente-ticket', ( payload, callback ) => {

        // socket.emit('ultimo-ticket', ticketControl.ultimo);

        // const ultimo = ticketControl.siguiente();
        // callback( ultimo );
        
        // const id = 123456789;
        // callback( id );
        // socket.broadcast.emit('enviar-mensaje', payload );

        const siguiente = ticketControl.siguiente();
        callback( siguiente );

        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length );

        // hay un nuevo ticket pendiente de asignar

    });
    
    // socket.on( 'atender-ticket', ( payload, callback ) => {
    socket.on( 'atender-ticket', ( { escritorio }, callback ) => {

        // console.log( payload );

        if ( !escritorio ){

            return callback({

                ok: false,
                msg: 'El escritorio es obligatorio'

            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        // notificar cambios en los ultimos4
        socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4 );

        socket.emit( 'tickets-pendientes', ticketControl.tickets.length );
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length );
        // broadcast re transmite los turnos a todos los escritorios

        if ( !ticket ){

            callback({

                ok: false,
                msg: 'Ya no hay tickets pendientes'

            });
            
        } else {

            callback({

                ok: true,
                ticket

            });
        }

    });

}

module.exports = {
    socketController
}
