/* =========================================================
   UDM — UN DÍA MÁS
   INTRO AUTOMÁTICO
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const CONFIG = {

    introDuration: 6000

};


/* =========================================================
   ELEMENTOS
========================================================= */

const intro =
    document.getElementById("intro");

const app =
    document.getElementById("app");

const progressCircle =
    document.getElementById("progressCircle");

const loadingText =
    document.getElementById("loadingText");

const logo =
    document.getElementById("logo");

const subtitle =
    document.getElementById("subtitle");


/* =========================================================
   VARIABLES
========================================================= */

let startTime = null;

let finished = false;


/* =========================================================
   INICIO
========================================================= */

window.addEventListener(
    "load",
    function () {

        prepareIntro();

        startIntro();

    }
);


/* =========================================================
   PREPARAR
========================================================= */

function prepareIntro() {

    if (progressCircle) {

        progressCircle.style.strokeDasharray =
            "848";

        progressCircle.style.strokeDashoffset =
            "848";

    }


    if (app) {

        app.style.opacity =
            "0";

        app.style.visibility =
            "hidden";

    }


    if (intro) {

        intro.style.opacity =
            "1";

    }

}


/* =========================================================
   INICIAR
========================================================= */

function startIntro() {

    startTime =
        performance.now();

    requestAnimationFrame(
        animationLoop
    );

}


/* =========================================================
   LOOP
========================================================= */

function animationLoop(
    currentTime
) {

    const elapsed =
        currentTime -
        startTime;


    let progress =
        elapsed /
        CONFIG.introDuration;


    if (progress > 1) {

        progress = 1;

    }


    updateProgress(
        progress
    );


    if (progress < 1) {

        requestAnimationFrame(
            animationLoop
        );

    } else {

        finishIntro();

    }

}


/* =========================================================
   ACTUALIZAR CARGA
========================================================= */

function updateProgress(
    progress
) {

    if (progressCircle) {

        const circumference =
            848;

        const offset =
            circumference -
            (
                circumference *
                progress
            );

        progressCircle.style.strokeDashoffset =
            String(
                offset
            );

    }


    /*
       Pequeños cambios de estado
       para darle sensación de
       arranque tecnológico.
    */

    if (
        loadingText &&
        progress > 0.75
    ) {

        loadingText.textContent =
            "LISTO";

    }


    if (
        logo &&
        progress > 0.85
    ) {

        logo.style.textShadow =
            "0 0 25px rgba(255,215,100,0.9)";

    }

}


/* =========================================================
   FINALIZAR INTRO
========================================================= */

function finishIntro() {

    if (finished) {

        return;

    }

    finished =
        true;


    /*
       Pequeño destello final.
    */

    if (logo) {

        logo.style.transform =
            "scale(1.08)";

        logo.style.transition =
            "transform 0.4s ease";

    }


    /*
       Esperamos un pequeño momento
       antes de entrar a la app.
    */

    setTimeout(
        function () {

            hideIntro();

        },
        450
    );

}


/* =========================================================
   OCULTAR INTRO
========================================================= */

function hideIntro() {

    if (!intro) {

        return;

    }


    intro.style.transition =
        "opacity 1.2s ease";


    intro.style.opacity =
        "0";


    setTimeout(
        function () {

            intro.style.display =
                "none";


            if (app) {

                app.style.visibility =
                    "visible";

                app.style.opacity =
                    "1";

                app.style.transition =
                    "opacity 0.8s ease";

            }


            document.body.style.overflow =
                "auto";


        },
        1200
    );

}
