```javascript
/* ==========================================
   UN DÍA MÁS
   INTRO CINEMATOGRÁFICA
========================================== */

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


/* ==========================================
   FUNCIÓN SEGURA
========================================== */

function setStyle(element, property, value) {

    if (element) {
        element.style[property] = value;
    }

}


/* ==========================================
   INICIO
========================================== */

window.addEventListener("load", () => {

    /* -------------------------------
       ESTADO INICIAL
    ------------------------------- */

    setStyle(
        welcomePhase,
        "opacity",
        "1"
    );

    setStyle(
        welcomePhase,
        "transform",
        "scale(1) translateY(0)"
    );


    setStyle(
        listeningPhase,
        "opacity",
        "0"
    );


    if (mist) {
        mist.classList.remove("active");
    }


    setStyle(
        udmLogo,
        "opacity",
        "0"
    );

    setStyle(
        udmLogo,
        "transform",
        "scale(0.5)"
    );


    setStyle(
        logoGlow,
        "opacity",
        "0"
    );


    /* -------------------------------
       INICIAR ANIMACIÓN
    ------------------------------- */

    const startTime = performance.now();

    requestAnimationFrame(
        (now) => animationLoop(now, startTime)
    );

});


/* ==========================================
   ANIMACIÓN PRINCIPAL
========================================== */

function animationLoop(now, startTime) {

    const elapsed =
        now - startTime;

    const progress =
        Math.min(
            elapsed / TOTAL_TIME,
            1
        );


    updateProgress(progress);

    animateSequence(progress);


    if (progress < 1) {

        requestAnimationFrame(
            (nextNow) =>
                animationLoop(
                    nextNow,
                    startTime
                )
        );

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
            `${progress * 100}%`;

    }


    if (timer) {

        const remaining =
            Math.ceil(
                10 - progress * 10
            );


        timer.textContent =
            remaining > 0
                ? remaining
                : "Listo";

    }

}


/* ==========================================
   SECUENCIA
========================================== */

function animateSequence(progress) {


    /* ======================================
       0% - 25%

       BIENVENIDOS
    ====================================== */

    if (progress < 0.25) {

        setStyle(
            welcomePhase,
            "opacity",
            "1"
        );

        setStyle(
            welcomePhase,
            "transform",
            "scale(1) translateY(0)"
        );

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


        setStyle(
            welcomePhase,
            "opacity",
            `${1 - p}`
        );


        setStyle(
            welcomePhase,
            "transform",
            `
            scale(${1 - p * 0.12})
            translateY(${-15 * p}px)
            `
        );


        setStyle(
            listeningPhase,
            "opacity",
            `${p}`
        );


        setStyle(
            listeningPhase,
            "transform",
            `
            scale(${0.92 + p * 0.08})
            `
        );

    }


    /* ======================================
       55% - 72%

       APARECE LA NIEBLA
    ====================================== */

    if (
        progress >= 0.55 &&
        progress < 0.72
    ) {

        const p =
            (progress - 0.55) / 0.17;


        setStyle(
            listeningPhase,
            "opacity",
            `${1 - p * 0.8}`
        );


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


        setStyle(
            listeningPhase,
            "opacity",
            "0"
        );


        setStyle(
            udmLogo,
            "opacity",
            `${p}`
        );


        setStyle(
            udmLogo,
            "transform",
            `
            scale(${0.55 + p * 0.45})
            `
        );


        setStyle(
            logoGlow,
            "opacity",
            `${p * 0.8}`
        );

    }


    /* ======================================
       88% - 100%

       LOGO FINAL
    ====================================== */

    if (progress >= 0.88) {

        setStyle(
            udmLogo,
            "opacity",
            "1"
        );


        setStyle(
            udmLogo,
            "transform",
            "scale(1.05)"
        );


        setStyle(
            logoGlow,
            "opacity",
            "1"
        );


        if (logoGlow) {

            logoGlow.classList.add(
                "active"
            );

        }

    }

}


/* ==========================================
   TERMINAR INTRO
========================================== */

function finishIntro() {

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
       Dejamos el logo visible
       durante un instante.
    */

    setTimeout(() => {

        if (!splashScreen) {
            return;
        }


        splashScreen.style.transition =
            "opacity 1.2s ease";


        splashScreen.style.opacity =
            "0";


        /*
           Entrar automáticamente
           a la aplicación.
        */

        setTimeout(() => {

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
```
