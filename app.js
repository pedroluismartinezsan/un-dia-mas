
const TOTAL_TIME = 10000;

var splashScreen = document.getElementById("splashScreen");
var audioScreen = document.getElementById("audioScreen");

var welcomePhase = document.getElementById("welcomePhase");
var listeningPhase = document.getElementById("listeningPhase");

var mist = document.getElementById("mist");
var udmLogo = document.getElementById("udmLogo");
var logoGlow = document.getElementById("logoGlow");

var loadingIndicator = document.getElementById("loadingIndicator");
var progressBar = document.getElementById("progressBar");
var timer = document.getElementById("timer");

var startTime = null;
var finished = false;


/* ==========================================
   INICIO
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
   ANIMACIÓN
========================================== */

function animationLoop(currentTime) {

    var elapsed = currentTime - startTime;

    var progress = elapsed / TOTAL_TIME;

    if (progress > 1) {
        progress = 1;
    }


    updateProgress(progress);

    animateSequence(progress);


    if (progress < 1) {

        requestAnimationFrame(animationLoop);

    } else {

        finishIntro();

    }

}


/* ==========================================
   BARRA DE CARGA
========================================== */

function updateProgress(progress) {

    if (progressBar) {

        progressBar.style.width =
            (progress * 100) + "%";

    }


    if (timer) {

        var remaining =
            Math.ceil(10 - (progress * 10));

        if (remaining > 0) {

            timer.textContent = remaining;

        } else {

            timer.textContent = "Listo";

        }

    }

}


/* ==========================================
   SECUENCIA
========================================== */

function animateSequence(progress) {


    /* --------------------------------------
       0% - 25%
       BIENVENIDOS
    -------------------------------------- */

    if (progress < 0.25) {

        if (welcomePhase) {

            welcomePhase.style.opacity = "1";

            welcomePhase.style.transform =
                "scale(1)";

        }

    }


    /* --------------------------------------
       25% - 55%
       ESTÁS ESCUCHANDO
       UN DÍA MÁS
    -------------------------------------- */

    if (
        progress >= 0.25 &&
        progress < 0.55
    ) {

        var p1 =
            (progress - 0.25) / 0.30;


        if (welcomePhase) {

            welcomePhase.style.opacity =
                String(1 - p1);

            welcomePhase.style.transform =
                "scale(" +
                String(1 - (p1 * 0.12)) +
                ")";

        }


        if (listeningPhase) {

            listeningPhase.style.opacity =
                String(p1);

            listeningPhase.style.transform =
                "scale(" +
                String(0.92 + (p1 * 0.08)) +
                ")";

        }

    }


    /* --------------------------------------
       55% - 72%
       NIEBLA
    -------------------------------------- */

    if (
        progress >= 0.55 &&
        progress < 0.72
    ) {

        var p2 =
            (progress - 0.55) / 0.17;


        if (listeningPhase) {

            listeningPhase.style.opacity =
                String(1 - (p2 * 0.8));

        }


        if (mist) {

            mist.classList.add("active");

        }

    }


    /* --------------------------------------
       72% - 88%
       APARECE UDM
    -------------------------------------- */

    if (
        progress >= 0.72 &&
        progress < 0.88
    ) {

        var p3 =
            (progress - 0.72) / 0.16;


        if (listeningPhase) {

            listeningPhase.style.opacity =
                "0";

        }


        if (udmLogo) {

            udmLogo.style.opacity =
                String(p3);

            udmLogo.style.transform =
                "scale(" +
                String(0.55 + (p3 * 0.45)) +
                ")";

        }


        if (logoGlow) {

            logoGlow.style.opacity =
                String(p3 * 0.8);

        }

    }


    /* --------------------------------------
       88% - 100%
       UDM FINAL
    -------------------------------------- */

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
   FINAL
========================================== */

function finishIntro() {

    if (finished) {
        return;
    }

    finished = true;


    if (progressBar) {

        progressBar.style.width = "100%";

    }


    if (timer) {

        timer.textContent = "Listo";

    }


    if (loadingIndicator) {

        loadingIndicator.style.opacity = "0";

    }


    /* Esperar un momento mostrando UDM */

    setTimeout(function () {

        if (!splashScreen) {
            return;
        }


        splashScreen.style.transition =
            "opacity 1.2s ease";

        splashScreen.style.opacity =
            "0";


        /* Entrar automáticamente */

        setTimeout(function () {

            splashScreen.style.display =
                "none";


            if (audioScreen) {

                audioScreen.style.display =
                    "block";

            }


            window.scrollTo(0, 0);

        }, 1200);

    }, 700);

}

