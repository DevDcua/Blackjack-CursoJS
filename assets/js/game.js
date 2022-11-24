/* 

2C = Two of Clubs
2D = Two of Diamonds
2H = Two of Hearts
2S = Two of Spades


*/

(()=>{

    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    // Referencia HTML

    const btnPedir   = document.querySelector('#btn__pedir'  ),
        btnNuevo   = document.querySelector('#btn__nuevo'  ),
        btnDetener = document.querySelector('#btn__detener');

    const scoreJugador = document.querySelector('.score__jugador'),
        scoreIa = document.querySelector('.score__computadora');

    const divCartasIa = document.querySelector('.cards__deck--computadora'),
        divCartasJugador = document.querySelector('.cards__deck');


    // Esta funcion permite crear el deck

    const crearDeck = () => {
        
        for( let i = 2; i<=10; i++ ) {
            
            for( let tipo of tipos){
                deck.push( i + tipo)
            }
            
        }
        
        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo)
            }
        }
             
        return _.shuffle( deck );
        
    };

    crearDeck();


    // Esta funcion permite tomar una carta

    const pedirCarta = () => {
        
        if( deck.length === 0 ){
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    };


    pedirCarta();

    // Funcion para pedir carta

    const valorCarta = (carta) =>{
        
        const valor = carta.substring(0, carta.length-1);
        return ( isNaN (valor) ) ?
        ( valor === 'A' ) ? 11 : 10
        : valor * 1;
        
    };


    // Turno de la computadora

    const turnoComputadora = ( puntosMinimos ) => {
        
        do{
            const carta = pedirCarta();
            
            puntosComputadora = puntosComputadora + valorCarta( carta );
            
            scoreIa.innerText = puntosComputadora
            
            //Cartas en HTML
                
            const imgCarta = document.createElement('img');
            imgCarta.src = `../blackjack-project/assets/img/${ carta }.png`;
            imgCarta.classList.add('card');    
            divCartasIa.append( imgCarta );
            
            if(puntosMinimos > 21){
                break;
            }
            
        } while ( (puntosComputadora < puntosMinimos) && (puntosComputadora <= 21));
        
        
        setTimeout(() => {
            
            if ( puntosComputadora === puntosMinimos ){
                alert('Empate :(');
            } else if ( puntosMinimos > 21 ){
                alert('Computadora Gana');
            } else if( puntosComputadora > 21 ){
                alert('Jugador Gana');
            } else{
                alert('Computadora Gana')
            }
            
            
        }, 100);
        
        
    }

    // Eventos

    btnPedir.addEventListener('click', ()=>{
        
        const carta = pedirCarta();
        
        puntosJugador = puntosJugador + valorCarta( carta );
        
        scoreJugador.innerText = puntosJugador
        
        //Cartas en HTML
        
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `../blackjack-project/assets/img/${ carta }.png`;
        imgCarta.classList.add('card');    
        divCartasJugador.append( imgCarta );
        
        
        if ( puntosJugador > 21){
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled= true;
            turnoComputadora(puntosJugador);
            
        } else if( puntosJugador === 21){
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled= true;
            turnoComputadora(puntosJugador);
        }
        
    });

    // Eventos detener

    btnDetener.addEventListener('click', ()=>{

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        
        turnoComputadora( puntosJugador );

    });


    //Evento Nuevo Juego

    btnNuevo.addEventListener('click', ()=> {

        console.clear();
        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        scoreIa.innerText = 0;
        scoreJugador.innerText = 0;


        divCartasIa.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;


    })


})()

































