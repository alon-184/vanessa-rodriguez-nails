// ==========================================
// VANESSA RODRÍGUEZ NAILS
// COTIZADOR MULTISERVICIO
// ==========================================


// ELEMENTOS

const servicio = document.getElementById("servicio");

const largo = document.getElementById("largo");

const selectorLargo =
    document.getElementById("selectorLargo");

const decoraciones =
    document.querySelectorAll(".decoracion");

const listaServicios =
    document.getElementById("listaServicios");

const total =
    document.getElementById("total");

const botonAgregar =
    document.getElementById("agregarServicio");


// ==========================================
// PRECIOS
// ==========================================

const preciosAcrilico = {
    1: 300,
    2: 350,
    3: 400,
    4: 450,
    5: 500,
    6: 550,
    7: 600,
    8: 650
};


const preciosPolygel = {
    1: 350,
    2: 400,
    3: 450,
    4: 500,
    5: 550,
    6: 600,
    7: 650,
    8: 700
};


const preciosEsculpido = {
    1: 400,
    2: 450,
    3: 500,
    4: 550,
    5: 600,
    6: 650,
    7: 700,
    8: 750
};


const preciosFijos = {

    manicure: 150,

    spa: 200,

    ruso: 200,

    gelish: 180,

    bano: 200,

    pedicure: 200,

    "pedicure-spa": 250,

    "pedicure-gelish": 300,

    powder: 1500,

    ombre: 1800

};


// ==========================================
// SERVICIOS ELEGIDOS
// ==========================================

let serviciosElegidos = [];


// ==========================================
// MOSTRAR / OCULTAR LARGO
// ==========================================

function actualizarLargo(){

    if(
        servicio.value === "acrilico" ||
        servicio.value === "polygel" ||
        servicio.value === "esculpido"
    ){

        selectorLargo.style.display = "flex";

    }else{

        selectorLargo.style.display = "none";

    }

}


servicio.addEventListener(
    "change",
    actualizarLargo
);


// ==========================================
// OBTENER PRECIO
// ==========================================

function obtenerPrecio(){

    let precio = 0;

    const tipo = servicio.value;


    if(tipo === "acrilico"){

        precio =
            preciosAcrilico[largo.value];

    }

    else if(tipo === "polygel"){

        precio =
            preciosPolygel[largo.value];

    }

    else if(tipo === "esculpido"){

        precio =
            preciosEsculpido[largo.value];

    }

    else{

        precio =
            preciosFijos[tipo];

    }


    return precio;

}


// ==========================================
// AGREGAR SERVICIO
// ==========================================

botonAgregar.addEventListener(
    "click",
    function(){

        const tipo = servicio.value;

        const nombre =
            servicio.options[
                servicio.selectedIndex
            ].text;


        let precio =
            obtenerPrecio();


        let largoElegido = null;


        if(
            tipo === "acrilico" ||
            tipo === "polygel" ||
            tipo === "esculpido"
        ){

            largoElegido =
                largo.value;

        }


        // ==================================
        // EFECTOS SELECCIONADOS
        // ==================================

        const efectos = [];

        let precioEfectos = 0;


        decoraciones.forEach(
            function(decoracion){

                if(decoracion.checked){

                    efectos.push(
                        decoracion.dataset.nombre
                    );

                    precioEfectos += 50;

                }

            }
        );


        precio += precioEfectos;


        // ==================================
        // GUARDAR SERVICIO
        // ==================================

        serviciosElegidos.push({

            nombre: nombre,

            tipo: tipo,

            largo: largoElegido,

            efectos: efectos,

            precio: precio

        });


        mostrarServicios();


        // ==================================
        // LIMPIAR EFECTOS
        // ==================================

        decoraciones.forEach(
            function(decoracion){

                decoracion.checked = false;

            }
        );

    }
);


// ==========================================
// MOSTRAR SERVICIOS
// ==========================================

function mostrarServicios(){

    listaServicios.innerHTML = "";


    if(serviciosElegidos.length === 0){

        listaServicios.innerHTML =

            `<p class="vacio">
                Todavía no has agregado ningún servicio.
            </p>`;

        total.textContent = "$0";

        return;

    }


    let sumaTotal = 0;


    serviciosElegidos.forEach(
        function(servicioElegido, indice){

            sumaTotal +=
                servicioElegido.precio;


            const elemento =
                document.createElement("div");


            elemento.className =
                "servicio-elegido";


            let informacion =

                `<strong>
                    ${indice + 1}. 
                    ${servicioElegido.nombre}
                </strong>`;


            if(servicioElegido.largo){

                informacion +=
                    `<br>📏 Largo:
                    ${servicioElegido.largo}`;

            }


            if(
                servicioElegido.efectos.length > 0
            ){

                informacion +=

                    `<br>✨ Diseños:
                    ${servicioElegido.efectos.join(", ")}`;

            }


            informacion +=

                `<br>
                <strong>
                    💰 $${servicioElegido.precio}
                </strong>`;


            informacion +=

                `<button
                    type="button"
                    class="quitar"
                    onclick="quitarServicio(${indice})">

                    🗑️ Quitar

                </button>`;


            elemento.innerHTML =
                informacion;


            listaServicios.appendChild(
                elemento
            );

        }
    );


    total.textContent =
        "$" + sumaTotal;

}


// ==========================================
// QUITAR SERVICIO
// ==========================================

function quitarServicio(indice){

    serviciosElegidos.splice(
        indice,
        1
    );


    mostrarServicios();

}


// ==========================================
// WHATSAPP
// ==========================================

function agendarWhatsApp(){

    if(serviciosElegidos.length === 0){

        alert(
            "Primero agrega al menos un servicio 💗"
        );

        return;

    }


    let mensaje =

        "Hola Vanessa Rodríguez Nails 💖%0A%0A" +

        "Quiero agendar una cita.%0A%0A";


    serviciosElegidos.forEach(
        function(servicioElegido, indice){

            mensaje +=

                `${indice + 1}. ` +
                servicioElegido.nombre;


            if(servicioElegido.largo){

                mensaje +=

                    " - Largo " +
                    servicioElegido.largo;

            }


            if(
                servicioElegido.efectos.length > 0
            ){

                mensaje +=

                    " - Diseños: " +

                    servicioElegido.efectos.join(", ");

            }


            mensaje +=

                " - $" +
                servicioElegido.precio +

                "%0A";

        }
    );


    mensaje +=

        "%0A💰 Total estimado: " +
        total.textContent;


    window.open(

        "https://wa.me/527225714094?text=" +
        mensaje,

        "_blank"

    );

}


// ==========================================
// INICIO
// ==========================================

actualizarLargo();

mostrarServicios();
function irAlCotizador(servicioElegido) {

    // Seleccionar automáticamente el servicio
    servicio.value = servicioElegido;

    // Actualizar el largo según el servicio
    actualizarLargo();

    // Buscar el título del cotizador
    const titulos = document.querySelectorAll("h2");

    let cotizador = null;

    titulos.forEach(function(titulo) {

        if (titulo.textContent.includes("Cotiza tu servicio")) {
            cotizador = titulo;
        }

    });

    // Si encontramos el cotizador, bajar hasta él
    if (cotizador) {

        cotizador.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}