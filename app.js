/* =========================================================
   UN DÍA MÁS
   INICIO
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const TIEMPO_CARGA = 10000;


/* =========================================================
   ELEMENTOS
========================================================= */

const splash =
    document.getElementById("splash");

const app =
    document.getElementById("app");


/* =========================================================
   INICIAR
========================================================= */

window.addEventListener(
    "load",
    function () {

        iniciarCarga();

    }
);


/* =========================================================
   CARGA DE 10 SEGUNDOS
========================================================= */

function iniciarCarga() {

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

    if (!splash) {

        return;

    }


    splash.classList.add(
        "show-brand"
    );


    setTimeout(
        function () {

            entrarAplicacion();

        },
        3000
    );

}


/* =========================================================
   ENTRAR A LA APP
========================================================= */

function entrarAplicacion() {

    if (!splash || !app) {

        return;

    }


    splash.style.transition =
        "opacity 1.5s ease";


    splash.style.opacity =
        "0";


    app.style.transition =
        "opacity 1.5s ease";


    app.style.opacity =
        "1";


    setTimeout(
        function () {

            splash.style.display =
                "none";

            document.body.style.overflow =
                "auto";

        },
        1500
    );

}
