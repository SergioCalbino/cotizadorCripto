const criptoMonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');



const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

// Vamos a crar el promise para obtener las criptomonedas
const obtenerCriptomonedas = criptomonedas => new Promise( (resolve, reject) => {
    resolve(criptomonedas);
})

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas();

    formulario.addEventListener('submit', submitFormulario);
    criptoMonedasSelect.addEventListener('change', leerValor);
    moneda.addEventListener('change', leerValor)
});

function consultarCriptomonedas() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( response => obtenerCriptomonedas(response.Data) )
        .then( criptomonedas => selectCriptomonedas(criptomonedas) )
    
    
}

//esta funcion recibe el resultado del fetch
function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {
        const { FullName, Name } = cripto.CoinInfo;
       
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        
        criptoMonedasSelect.appendChild(option)
       
    });
};

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
    console.log(objBusqueda)
};



function submitFormulario(e) {
    e.preventDefault();
    const { moneda, criptomoneda: criptoMoneda } = objBusqueda;
    if (moneda === '' || criptoMoneda === '' ) {
        mostarAlerta('Ambos campos son obligatorios');
        return;
        
    }

    //Consultar la Api con los resultados;
    consultarApi();

};

function mostarAlerta(msg) {

    const existeError = document.querySelector('.error');

    if (!existeError) {
    
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('error');
    divMensaje.textContent = msg;
    
    formulario.appendChild(divMensaje);

        setTimeout(() => {
        divMensaje.remove();
        }, 3000);
    
    console.log(msg)
    }
    
};

function consultarApi() {
    const { moneda, criptomoneda } = objBusqueda;
    

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        mostrarSpinner();

        fetch(url)
            .then( respuesta => respuesta.json() )
            .then( cotizacion => {
                mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])
            } )
    
};

function mostrarCotizacionHTML(cotizacion) {
    limpiarHTML()
    console.log(cotizacion)

    const { PRICE, CHANGEDAY, CHANGEHOUR, CHANGEPCT24HOUR, CHANGEPCTDAY, CHANGEPCTHOUR, HIGH24HOUR, HIGHDAY ,IMAGEURL, LASTUPDATE, LOWDAY } = cotizacion;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = ` El precio es: <span>${PRICE}</span>`;
    
    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = ` Precio mas alto del día: <span>${HIGHDAY}</span>`;
    
    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = ` Precio mas bajo del día: <span>${LOWDAY}</span>`;
    
    const ultimasHoras = document.createElement('p');
    ultimasHoras.innerHTML = ` Variacion últimas 24 Hs.: <span>${CHANGEPCT24HOUR}</span>`;
   
    const ultimaActualizacion = document.createElement('p');
    ultimaActualizacion.innerHTML = `Ultima actualizacion.: <span>${LASTUPDATE}</span>`;
    
   
    

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
    resultado.appendChild(ultimaActualizacion);
    
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
    
}

function mostrarSpinner() {
    limpiarHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
    
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
   
    
    `;

    resultado.appendChild(spinner)

    
}

//CHANGE24HOUR
// : 
// "$ 68.76"
// CHANGEDAY
// : 
// "$ 53.19"
// CHANGEHOUR
// : 
// "$ 53.19"
// CHANGEPCT24HOUR
// : 
// "0.36"
// CHANGEPCTDAY
// : 
// "0.28"
// CHANGEPCTHOUR
// : 
// "0.28"
// CIRCULATINGSUPPLY
// : 
// "Ƀ 19,176,675.0"
// CIRCULATINGSUPPLYMKTCAP
// : 
// "$ 366.48 B"
// CONVERSIONSYMBOL
// : 
// ""
// CONVERSIONTYPE
// : 
// "direct"
// FROMSYMBOL
// : 
// "Ƀ"
// HIGH24HOUR
// : 
// "$ 19,264.4"
// HIGHDAY
// : 
// "$ 19,128.5"
// HIGHHOUR
// : 
// "$ 19,128.5"
// IMAGEURL
// : 
// "/media/37746251/btc.png"
// LASTMARKET
// : 
// "Coinbase"
// LASTTRADEID
// : 
// "430205773"
// LASTUPDATE
// : 
// "Just now"
// LASTVOLUME
// : 
// "Ƀ 0.01072"
// LASTVOLUMETO
// : 
// "$ 204.88"
// LOW24HOUR
// : 
// "$ 18,856.5"
// LOWDAY
// : 
// "$ 19,025.5"
// LOWHOUR
// :



