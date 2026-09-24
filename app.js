```javascript
/* =========================================================
   UDM - UN DÍA MÁS
   SISTEMA DE INICIO
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const TIEMPO_CARGA = 5000;

const TIEMPO_NOMBRE = 3000;


/* =========================================================
   ELEMENTOS
========================================================= */

const intro =
    document.getElementById("intro");

const app =
    document.getElementById("app");

const loadingText =
    document.getElementById("loadingText");


/* =========================================================
   INICIO
========================================================= */

window.addEventListener(
    "load",
    function () {

        iniciarUDM();

    }
);


/* =========================================================
   INICIAR UDM
========================================================= */

function iniciarUDM() {


    console.log(
        "UDM: iniciando aplicación"
    );


    setTimeout(
        function () {

            mostrarNombre();

        },
        TIEMPO_CARGA
    );

}


/* =========================================================
   MOSTRAR UN DÍA MÁS
========================================================= */

function mostrarNombre() {


    console.log(
        "UDM: mostrando nombre"
    );


    if (loadingText) {

        loadingText.style.opacity =
            "0";

    }


    if (intro) {

        intro.classList.add(
            "reveal"
        );

    }


    setTimeout(
        function () {

            entrarAplicacion();

        },
        TIEMPO_NOMBRE
    );

}


/* =========================================================
   ENTRAR A LA APLICACIÓN
========================================================= */

function entrarAplicacion() {


    console.log(
        "UDM: entrando a la aplicación"
    );


    if (!intro || !app) {

        return;

    }


    app.style.transition =
        "opacity 1.5s ease";


    intro.style.transition =
        "opacity 1.5s ease";


    app.style.opacity =
        "1";


    intro.style.opacity =
        "0";


    setTimeout(
        function () {

            intro.style.display =
                "none";

            document.body.style.overflow =
                "auto";

        },
        1500
    );

}
```
