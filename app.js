
const TOTAL_TIME = 10000;

const splashScreen = document.getElementById("splashScreen");
const audioScreen = document.getElementById("audioScreen");

const welcomePhase = document.getElementById("welcomePhase");
const listeningPhase = document.getElementById("listeningPhase");

const mist = document.getElementById("mist");

const udmLogo = document.getElementById("udmLogo");
const logoGlow = document.getElementById("logoGlow");

const loadingIndicator =
    document.getElementById("loadingIndicator");

const progressBar =
    document.getElementById("progressBar");

const timer =
    document.getElementById("timer");


let startTime = null;
let finished = false;


/* ==========================================
   CUANDO CARGA LA PÁGINA
========================================== */

window.addEventListener("load", function () {

    startTime = performance.now();

    if (welcomePhase) {
        welcomePhase.style.opacity = "1";
        welcomePhase.style.transform = "scale(1)";
    }

    if (listeningPhase) {
        listeningPhase.style.opacity = "0";
        listeningPhase.style.transform = "scale(0.92)";
    }

    if (mist) {
        mist.classList.remove("active");
    }

    if (udmLogo) {
        udmLogo.style.opacity = "0";
        udmLogo.style.transform = "scale(0.5)";
    }

    if (logoGlow) {
        logoGlow.style.opacity = "0";
    }

    requestAnimationFrame(animationLoop);

});


/* ==========================================
   ANIMACIÓN PRINCIPAL
========================================== */

function animationLoop(currentTime) {

    const elapsed =
        currentTime - startTime;

    const progress =
        Math.min(
            elapsed / TOTAL_TIME,
            1
        );


    updateProgress(progress);

    animateSequence(progress);


    if (progress < 1) {

        requestAnimationFrame(animationLoop);

    } else {

        finishIntro();

    }

}


/* ==========================================
   PROGRESO
========================================== */

function updateProgress(progress) {

    if (progressBar) {

        progressBar.style.width =
            (progress * 100) + "%";

    }


    if (timer) {

        const remaining =
            Math.ceil(
                10 - (progress * 10)
            );


        timer.textContent =
            remaining > 0
                ? remaining
                : "Listo";

    }

}


/* ==========================================
   SECUENCIA CINEMATOGRÁFICA
========================================== */

function animateSequence(progress) {


    /* ======================================
       0% - 25%

       BIENVENIDOS
    ====================================== */

    if (progress < 0.25) {

        if (welcomePhase) {

            welcomePhase.style.opacity = "1";

            welcomePhase.style.transform =
                "scale(1)";

        }

    }


    /* ======================================
       25% - 55%

       ESTÁS ESCUCHANDO
       UN DÍA MÁS
    ====================================== */

    if (
        progress >= 0.25 &&
        progress < 0.55
    ) {

        const p =
            (progress - 0.25) / 0.30;


        if (welcomePhase) {

            welcomePhase.style.opacity =
                String(1 - p);

            welcomePhase.style.transform =
                "scale(" +
                (1 - (p * 0.12)) +
                ")";

        }


        if (listeningPhase) {

            listeningPhase.style.opacity =
                String(p);

            listeningPhase.style.transform =
                "scale(" +
                (0.92 + (p * 0.08)) +
                ")";

        }

    }


    /* ======================================
       55% - 72%

       COMIENZA LA NIEBLA
    ====================================== */

    if (
        progress >= 0.55 &&
        progress < 0.72
    ) {

        const p =
            (progress - 0.55) / 0.17;


        if (listeningPhase) {

            listeningPhase.style.opacity =
                String(1 - (p * 0.8));

        }


        if (mist) {

            mist.classList.add("active");

        }

    }


    /* ======================================
       72% - 88%

       APARECE UDM
    ====================================== */

    if (
        progress >= 0.72 &&
        progress < 0.88
    ) {

        const p =
            (progress - 0.72) / 0.16;


        if (listeningPhase) {

            listeningPhase.style.opacity =
                "0";

        }


        if (udmLogo) {

            udmLogo.style.opacity =
                String(p);

            udmLogo.style.transform =
                "scale(" +
                (0.55 + (p * 0.45)) +
                ")";

        }


        if (logoGlow) {

            logoGlow.style.opacity =
                String(p * 0.8);

        }

    }


    /* ======================================
       88% - 100%

       LOGO FINAL
    ====================================== */

    if (progress >= 0.88) {

        if (udmLogo) {

            udmLogo.style.opacity = "1";

            udmLogo.style.transform =
                "scale(1.05)";

        }


        if (logoGlow) {

            logoGlow.style.opacity = "1";

            logoGlow.classList.add("active");

        }

    }

}


/* ==========================================
   TERMINAR INTRO
========================================== */

function finishIntro() {

    if (finished) {
        return;
    }

    finished = true;


    if (progressBar) {

        progressBar.style.width =
            "100%";

    }


    if (timer) {

        timer.textContent =
            "Listo";

    }


    if (loadingIndicator) {

        loadingIndicator.style.opacity =
            "0";

    }


    /*
       Dejamos UDM visible
       durante un instante.
    */

    setTimeout(function () {

        if (!splashScreen) {
            return;
        }


        splashScreen.style.opacity =
            "0";


        /*
           Entrada automática
           a la aplicación.
        */

        setTimeout(function () {

            splashScreen.style.display =
                "none";


            if (audioScreen) {

                audioScreen.style.display =
                    "block";

            }


            window.scrollTo(
                0,
                0
            );

        }, 1200);

    }, 700);

}

