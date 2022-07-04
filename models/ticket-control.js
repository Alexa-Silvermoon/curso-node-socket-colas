
const path = require('path');
const fs   = require('fs');

class Ticket {

    constructor( numero, escritorio ){

        this.numero     = numero;
        this.escritorio = escritorio;

    }
}

class TicketControl {

    constructor(){

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();

    }

    get toJson(){

        return{

            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4

        }
    }

    init(){

        // const data = require('../db/data.json');
        // console.log( data );

        const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');

        if ( hoy === this.hoy ){

            this.tickets  = tickets;
            this.ultimo   = ultimo;
            this.ultimos4 = ultimos4;

        } else {

            //es otro dia
            this.guardarDB();
        }

    }

    guardarDB(){

        const dbPath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) );

    }

    siguiente(){

        this.ultimo += 1;
        const ticket = new Ticket( this.ultimo, null );
        this.tickets.push( ticket );

        this.guardarDB();

        return 'Ticket ' + ticket.numero;

    }

    // ultimo(){

    //     const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');

    //     this.ultimo = ultimo;

    //     return 'Ticket ' + this.ultimo;
    // }

    atenderTicket( escritorio ){

        // Si no tenemos tickets:
        if ( this.tickets.length === 0 ){

            return null;
        }

        const ticket = this.tickets.shift(); // es lo mismo que this.tickets[0];
        ticket.escritorio = escritorio;

        this.ultimos4.unshift( ticket ); //estos son los ultimo 4 tikets que se mostraran en pantalla

        if ( this.ultimos4.length > 4 ){

            this.ultimos4.splice( -1, 1 );
            //-1 ubica al final del arreglo, 1 borra un elemento del arreglo, en este caso el ultimo
        }

        // console.log( this.ultimos4 );

        this.guardarDB();

        return ticket;

    }

}

module.exports = TicketControl;