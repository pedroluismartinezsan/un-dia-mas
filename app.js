/* =====================================================
   UDM - UN DÍA MÁS
===================================================== */


/* =====================================================
   CONFIGURACIÓN
===================================================== */

const INTRO_TIME = 6000;


/* =====================================================
   ELEMENTOS
===================================================== */

const intro =
    document.getElementById("intro");

const app =
    document.getElementById("app");

const loadingText =
    document.getElementById("loadingText");


/* =====================================================
   INICIO
===================================================== */

window.addEventListener(
    "load",
    function () {

        console.log(
            "UDM iniciando..."
        );

        startIntro();

    }
);


/* =====================================================
   INTRO
===================================================== */

function startIntro() {

    setTimeout(
        function () {

            finishIntro();

        },
        INTRO_TIME
    );

}


/* =====================================================
   FINALIZAR
===================================================== */

function finishIntro() {

    console.log(
        "UDM cargado."
    );


    if (loadingText) {

        loadingText.textContent =
            "LISTO";

    }


    setTimeout(
        function () {

            if (intro) {

                intro.style.transition =
                    "opacity 1s ease";

                intro.style.opacity =
                    "0";

            }

        },
        400
    );


    setTimeout(
        function () {

            if (intro) {

                intro.style.display =
                    "none";

            }


            if (app) {

                app.style.transition =
                    "opacity 0.8s ease";

                app.style.opacity =
                    "1";

            }


            document.body.style.overflow =
                "auto";


        },
        1500
    );

}
