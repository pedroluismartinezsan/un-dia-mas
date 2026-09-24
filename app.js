const TOTAL_TIME = 15000;

const splashScreen = document.getElementById("splashScreen");
const audioScreen = document.getElementById("audioScreen");

const welcomeText = document.getElementById("welcomeText");
const udmLogo = document.getElementById("udmLogo");
const logoGlow = document.getElementById("logoGlow");
const introMessage = document.getElementById("introMessage");

const enterButton = document.getElementById("enterButton");
const loadingIndicator = document.getElementById("loadingIndicator");
const progressBar = document.getElementById("progressBar");
const timer = document.getElementById("timer");

const letters = document.querySelectorAll(".letter");

let startTime = null;
let finished = false;


/* ==============================
   INICIO
================================ */

window.addEventListener("load", () => {

    // Estado inicial
    welcomeText.style.opacity = "1";
    welcomeText.style.transform = "scale(1)";

    udmLogo.style.opacity = "0";
    udmLogo.style.transform = "scale(0.6)";

    logoGlow.style.opacity = "0";

    introMessage.style.opacity = "0";
    introMessage.style.transform = "translateY(20px)";

    enterButton.style.opacity = "0";
    enterButton.style.transform = "translateY(20px)";
    enterButton.style.pointerEvents = "none";

    loadingIndicator.style.opacity = "1";

    startTime = performance.now();

    requestAnimationFrame(animationLoop);
});


/* ==============================
   ANIMACIÓN PRINCIPAL
================================ */

function animationLoop(now) {

    if (!startTime) {
        startTime = now;
    }

    const elapsed = now - startTime;

    const progress = Math.min(
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


/* ==============================
   PROGRESO
================================ */

function updateProgress(progress) {

    if (progressBar) {

        progressBar.style.width =
            `${progress * 100}%`;

    }

    if (timer) {

        const remaining =
            Math.ceil(
                15 - (progress * 15)
            );

        timer.textContent =
            remaining > 0
                ? remaining
                : "Listo";
    }
}


/* ==============================
   SECUENCIA
================================ */

function animateSequence(progress) {


    /* --------------------------------
       0% - 30%
       BIENVENIDOS
    -------------------------------- */

    if (progress < 0.30) {

        welcomeText.style.opacity = "1";

        welcomeText.style.transform =
            "scale(1) translateY(0)";

    }


    /* --------------------------------
       30% - 55%
       DESAPARECEN LAS LETRAS
    -------------------------------- */

    if (
        progress >= 0.30 &&
        progress < 0.55
    ) {

        const p =
            (progress - 0.30) / 0.25;

        letters.forEach((letter, index) => {

            const character =
                letter.dataset.letter;

            // U, D y M permanecen
            const keep =
                character === "U" ||
                character === "D" ||
                character === "M";

            if (keep) {

                letter.style.opacity = "1";

                letter.style.transform =
                    "translateY(0) scale(1)";

            } else {

                // desaparición progresiva
                const delay =
                    index * 0.045;

                const local =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            (p - delay) / 0.65
                        )
                    );

                letter.style.opacity =
                    `${1 - local}`;

                letter.style.transform =
                    `
                    translateY(${-30 * local}px)
                    scale(${1 - local * 0.2})
                    `;
            }

        });

    }


    /* --------------------------------
       55% - 70%
       TRANSICIÓN AL LOGO
    -------------------------------- */

    if (
        progress >= 0.55 &&
        progress < 0.70
    ) {

        const p =
            (progress - 0.55) / 0.15;

        welcomeText.style.opacity =
            `${1 - p}`;

        welcomeText.style.transform =
            `
            scale(${1 - p * 0.2})
            translateY(${-20 * p}px)
            `;

        udmLogo.style.opacity =
            `${p}`;

        udmLogo.style.transform =
            `
            scale(${0.65 + p * 0.35})
            `;
    }


    /* --------------------------------
       70% - 82%
       U D M SE JUNTAN
    -------------------------------- */

    if (
        progress >= 0.70 &&
        progress < 0.82
    ) {

        const p =
            (progress - 0.70) / 0.12;

        udmLogo.style.opacity = "1";

        udmLogo.style.transform =
            `
            scale(${1 + p * 0.08})
            `;

        const u =
            document.querySelector(".udm-u");

        const d =
            document.querySelector(".udm-d");

        const m =
            document.querySelector(".udm-m");

        if (u) {

            u.style.transform =
                `translateX(${25 - p * 25}px)`;

        }

        if (d) {

            d.style.transform =
                "translateX(0)";

        }

        if (m) {

            m.style.transform =
                `translateX(${-25 + p * 25}px)`;

        }
    }


    /* --------------------------------
       82% - 92%
       BRILLO
    -------------------------------- */

    if (
        progress >= 0.82 &&
        progress < 0.92
    ) {

        udmLogo.style.opacity = "1";

        udmLogo.style.transform =
            "scale(1.08)";

        logoGlow.style.opacity = "1";

    }


    /* --------------------------------
       92% - 100%
       MENSAJE
    -------------------------------- */

    if (progress >= 0.92) {

        udmLogo.style.opacity = "1";

        udmLogo.style.transform =
            "scale(1)";

        logoGlow.style.opacity = "1";

        introMessage.style.opacity = "1";

        introMessage.style.transform =
            "translateY(0)";
    }
}


/* ==============================
   FINAL
================================ */

function finishIntro() {

    if (finished) return;

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

    // Mostrar botón
    setTimeout(() => {

        enterButton.style.opacity = "1";

        enterButton.style.transform =
            "translateY(0)";

        enterButton.style.pointerEvents =
            "auto";

    }, 300);
}


/* ==============================
   BOTÓN ENTRAR
================================ */

enterButton.addEventListener(
    "click",
    enterApplication
);


function enterApplication() {

    enterButton.style.transform =
        "scale(0.95)";

    setTimeout(() => {

        splashScreen.style.transition =
            "opacity 0.8s ease";

        splashScreen.style.opacity =
            "0";

        setTimeout(() => {

            splashScreen.style.display =
                "none";

            audioScreen.style.display =
                "block";

            window.scrollTo(
                0,
                0
            );

        }, 800);

    }, 150);
}
