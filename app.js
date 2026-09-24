/* =========================================================
   UN DÍA MÁS
   INTRO + REPRODUCTOR
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const CONFIG = {

    introDuration: 7500,

    todayAudio: "audio/hoy.mp3"

};


/* =========================================================
   ELEMENTOS
========================================================= */

const splashScreen =
    document.getElementById("splashScreen");

const audioScreen =
    document.getElementById("audioScreen");


const welcomePhase =
    document.getElementById("welcomePhase");

const mist =
    document.getElementById("mist");

const udmLogo =
    document.getElementById("udmLogo");

const logoGlow =
    document.getElementById("logoGlow");

const loadingIndicator =
    document.getElementById("loadingIndicator");

const progressBar =
    document.getElementById("progressBar");


/* AUDIO */

const audioPlayer =
    document.getElementById("audioPlayer");

const playButton =
    document.getElementById("playButton");

const playIcon =
    document.getElementById("playIcon");

const downloadButton =
    document.getElementById("downloadButton");

const audioProgress =
    document.getElementById("audioProgress");

const audioProgressValue =
    document.getElementById("audioProgressValue");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const waveform =
    document.getElementById("waveform");


/* =========================================================
   VARIABLES
========================================================= */

let startTime = null;

let introFinished = false;


/* =========================================================
   INICIO
========================================================= */

window.addEventListener(
    "load",
    function () {

        prepareIntro();

        prepareAudio();

        startIntro();

    }
);


/* =========================================================
   PREPARAR INTRO
========================================================= */

function prepareIntro() {

    if (welcomePhase) {

        welcomePhase.style.opacity = "1";

        welcomePhase.style.transform =
            "scale(1)";

    }


    if (mist) {

        mist.classList.remove(
            "active"
        );

    }


    if (udmLogo) {

        udmLogo.style.opacity = "0";

        udmLogo.style.transform =
            "scale(0.55)";

    }


    if (logoGlow) {

        logoGlow.style.opacity = "0";

    }


    if (loadingIndicator) {

        loadingIndicator.style.opacity =
            "1";

    }

}


/* =========================================================
   INICIAR INTRO
========================================================= */

function startIntro() {

    startTime =
        performance.now();

    requestAnimationFrame(
        introLoop
    );

}


/* =========================================================
   LOOP
========================================================= */

function introLoop(
    currentTime
) {

    const elapsed =
        currentTime -
        startTime;


    const progress =
        Math.min(
            elapsed /
            CONFIG.introDuration,
            1
        );


    updateIntro(
        progress
    );


    if (progress < 1) {

        requestAnimationFrame(
            introLoop
        );

    } else {

        finishIntro();

    }

}


/* =========================================================
   ANIMACIÓN
========================================================= */

function updateIntro(
    progress
) {


    /* -----------------------------------------
       0 - 35%
       BIENVENIDOS
    ----------------------------------------- */

    if (
        progress >= 0 &&
        progress < 0.35
    ) {

        if (welcomePhase) {

            welcomePhase.style.opacity =
                "1";

            welcomePhase.style.transform =
                "scale(1)";

        }

    }


    /* -----------------------------------------
       35 - 48%
       DESAPARECE BIENVENIDOS
    ----------------------------------------- */

    if (
        progress >= 0.35 &&
        progress < 0.48
    ) {

        const p =
            (progress - 0.35) /
            0.13;


        if (welcomePhase) {

            welcomePhase.style.opacity =
                String(
                    1 - p
                );

            welcomePhase.style.transform =
                "scale(" +
                String(
                    1 -
                    (p * 0.08)
                ) +
                ")";

        }


        if (mist) {

            mist.classList.add(
                "active"
            );

        }

    }


    /* -----------------------------------------
       48 - 75%
       APARECE UDM
    ----------------------------------------- */

    if (
        progress >= 0.48 &&
        progress < 0.75
    ) {

        const p =
            (progress - 0.48) /
            0.27;


        if (welcomePhase) {

            welcomePhase.style.opacity =
                "0";

        }


        if (udmLogo) {

            udmLogo.style.opacity =
                String(
                    p
                );

            udmLogo.style.transform =
                "scale(" +
                String(
                    0.55 +
                    (p * 0.45)
                ) +
                ")";

        }


        if (logoGlow) {

            logoGlow.style.opacity =
                String(
                    p * 0.8
                );

        }

    }


    /* -----------------------------------------
       75 - 100%
       UDM SE CONSOLIDA
    ----------------------------------------- */

    if (
        progress >= 0.75
    ) {

        if (welcomePhase) {

            welcomePhase.style.opacity =
                "0";

        }


        if (udmLogo) {

            udmLogo.style.opacity =
                "1";

            udmLogo.style.transform =
                "scale(1)";

        }


        if (logoGlow) {

            logoGlow.style.opacity =
                "1";

            logoGlow.classList.add(
                "active"
            );

        }

    }


    /* BARRA */

    if (progressBar) {

        progressBar.style.width =
            String(
                progress * 100
            ) + "%";

    }

}


/* =========================================================
   FINALIZAR INTRO
========================================================= */

function finishIntro() {

    if (introFinished) {

        return;

    }


    introFinished =
        true;


    if (loadingIndicator) {

        loadingIndicator.style.opacity =
            "0";

    }


    setTimeout(
        function () {

            if (!splashScreen) {

                return;

            }


            splashScreen.style.transition =
                "opacity 1s ease";


            splashScreen.style.opacity =
                "0";


            setTimeout(
                function () {

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

                },
                1000
            );

        },
        500
    );

}


/* =========================================================
   AUDIO
========================================================= */

function prepareAudio() {

    if (!audioPlayer) {

        return;

    }


    audioPlayer.src =
        CONFIG.todayAudio;

    audioPlayer.preload =
        "metadata";

    audioPlayer.load();

}


/* =========================================================
   PLAY / PAUSE
========================================================= */

if (playButton) {

    playButton.addEventListener(
        "click",
        function () {

            if (!audioPlayer) {

                return;

            }


            if (audioPlayer.paused) {

                audioPlayer.play();

            } else {

                audioPlayer.pause();

            }

        }
    );

}


/* =========================================================
   EVENTOS AUDIO
========================================================= */

if (audioPlayer) {


    audioPlayer.addEventListener(
        "play",
        function () {

            updatePlayButton(true);

            if (waveform) {

                waveform.classList.add(
                    "is-playing"
                );

            }

        }
    );


    audioPlayer.addEventListener(
        "pause",
        function () {

            updatePlayButton(false);

            if (waveform) {

                waveform.classList.remove(
                    "is-playing"
                );

            }

        }
    );


    audioPlayer.addEventListener(
        "loadedmetadata",
        function () {

            if (duration) {

                duration.textContent =
                    formatTime(
                        audioPlayer.duration
                    );

            }

        }
    );


    audioPlayer.addEventListener(
        "timeupdate",
        function () {

            updateAudioProgress();

        }
    );


    audioPlayer.addEventListener(
        "ended",
        function () {

            updatePlayButton(false);

            if (waveform) {

                waveform.classList.remove(
                    "is-playing"
                );

            }

        }
    );

}


/* =========================================================
   BOTÓN
========================================================= */

function updatePlayButton(
    playing
) {

    if (playIcon) {

        playIcon.textContent =
            playing
                ? "Ⅱ"
                : "▶";

    }


    if (playButton) {

        playButton.setAttribute(
            "aria-label",
            playing
                ? "Pausar mensaje"
                : "Reproducir mensaje"
        );

    }

}


/* =========================================================
   PROGRESO
========================================================= */

function updateAudioProgress() {

    if (!audioPlayer) {

        return;

    }


    const current =
        audioPlayer.currentTime || 0;


    const total =
        audioPlayer.duration || 0;


    if (currentTime) {

        currentTime.textContent =
            formatTime(
                current
            );

    }


    if (
        total > 0 &&
        audioProgressValue
    ) {

        audioProgressValue.style.width =
            String(
                (current / total) * 100
            ) + "%";

    }

}


/* =========================================================
   CLIC EN BARRA
========================================================= */

if (audioProgress) {

    audioProgress.addEventListener(
        "click",
        function (event) {

            if (
                !audioPlayer ||
                !audioPlayer.duration
            ) {

                return;

            }


            const rect =
                audioProgress.getBoundingClientRect();


            const position =
                event.clientX -
                rect.left;


            const percentage =
                position /
                rect.width;


            audioPlayer.currentTime =
                audioPlayer.duration *
                percentage;

        }
    );

}


/* =========================================================
   DESCARGA
========================================================= */

if (downloadButton) {

    downloadButton.addEventListener(
        "click",
        function () {

            const link =
                document.createElement(
                    "a"
                );


            link.href =
                CONFIG.todayAudio;


            link.download =
                "un-dia-mas-hoy.mp3";


            document.body.appendChild(
                link
            );


            link.click();


            document.body.removeChild(
                link
            );

        }
    );

}


/* =========================================================
   FORMATO TIEMPO
========================================================= */

function formatTime(
    seconds
) {

    if (
        !seconds ||
        !isFinite(seconds)
    ) {

        return "00:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secs =
        Math.floor(
            seconds % 60
        );


    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(secs).padStart(2, "0")
    );

}
