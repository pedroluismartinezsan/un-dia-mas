/* =========================================================
   UN DÍA MÁS
   APP.JS
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const CONFIG = {

    introDuration: 10000,

    todayAudio:
        "audio/hoy.mp3"

};


/* =========================================================
   ELEMENTOS DEL DOM
========================================================= */

const splashScreen =
    document.getElementById("splashScreen");

const audioScreen =
    document.getElementById("audioScreen");


/* INTRO */

const welcomePhase =
    document.getElementById("welcomePhase");

const listeningPhase =
    document.getElementById("listeningPhase");

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

const timer =
    document.getElementById("timer");


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
   INICIAR
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


    if (listeningPhase) {

        listeningPhase.style.opacity = "0";

        listeningPhase.style.transform =
            "scale(0.92)";

    }


    if (mist) {

        mist.classList.remove("active");

    }


    if (udmLogo) {

        udmLogo.style.opacity = "0";

        udmLogo.style.transform =
            "scale(0.5)";

    }


    if (logoGlow) {

        logoGlow.style.opacity = "0";

    }


    if (loadingIndicator) {

        loadingIndicator.style.opacity = "1";

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
   LOOP INTRO
========================================================= */

function introLoop(currentTime) {

    if (!startTime) {

        startTime =
            currentTime;

    }


    const elapsed =
        currentTime - startTime;


    const progress =
        Math.min(
            elapsed /
            CONFIG.introDuration,
            1
        );


    updateIntroProgress(
        progress
    );


    animateIntro(
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
   PROGRESO INTRO
========================================================= */

function updateIntroProgress(
    progress
) {

    if (progressBar) {

        progressBar.style.width =
            String(
                progress * 100
            ) + "%";

    }


    if (timer) {

        const remaining =
            Math.ceil(
                10 -
                (progress * 10)
            );


        if (remaining > 0) {

            timer.textContent =
                String(
                    remaining
                );

        } else {

            timer.textContent =
                "LISTO";

        }

    }

}


/* =========================================================
   ANIMACIÓN INTRO
========================================================= */

function animateIntro(
    progress
) {


    /* -----------------------------------------
       0% - 25%
    ----------------------------------------- */

    if (progress < 0.25) {

        if (welcomePhase) {

            welcomePhase.style.opacity =
                "1";

            welcomePhase.style.transform =
                "scale(1)";

        }

    }


    /* -----------------------------------------
       25% - 55%
    ----------------------------------------- */

    if (
        progress >= 0.25 &&
        progress < 0.55
    ) {

        const phase =
            (progress - 0.25) /
            0.30;


        if (welcomePhase) {

            welcomePhase.style.opacity =
                String(
                    1 - phase
                );

            welcomePhase.style.transform =
                "scale(" +
                String(
                    1 -
                    (phase * 0.12)
                ) +
                ")";

        }


        if (listeningPhase) {

            listeningPhase.style.opacity =
                String(
                    phase
                );

            listeningPhase.style.transform =
                "scale(" +
                String(
                    0.92 +
                    (phase * 0.08)
                ) +
                ")";

        }

    }


    /* -----------------------------------------
       55% - 72%
    ----------------------------------------- */

    if (
        progress >= 0.55 &&
        progress < 0.72
    ) {

        const phase =
            (progress - 0.55) /
            0.17;


        if (listeningPhase) {

            listeningPhase.style.opacity =
                String(
                    1 -
                    (phase * 0.8)
                );

        }


        if (mist) {

            mist.classList.add(
                "active"
            );

        }

    }


    /* -----------------------------------------
       72% - 88%
    ----------------------------------------- */

    if (
        progress >= 0.72 &&
        progress < 0.88
    ) {

        const phase =
            (progress - 0.72) /
            0.16;


        if (listeningPhase) {

            listeningPhase.style.opacity =
                "0";

        }


        if (udmLogo) {

            udmLogo.style.opacity =
                String(
                    phase
                );

            udmLogo.style.transform =
                "scale(" +
                String(
                    0.55 +
                    (phase * 0.45)
                ) +
                ")";

        }


        if (logoGlow) {

            logoGlow.style.opacity =
                String(
                    phase * 0.8
                );

        }

    }


    /* -----------------------------------------
       88% - 100%
    ----------------------------------------- */

    if (progress >= 0.88) {

        if (udmLogo) {

            udmLogo.style.opacity =
                "1";

            udmLogo.style.transform =
                "scale(1.05)";

        }


        if (logoGlow) {

            logoGlow.style.opacity =
                "1";

            logoGlow.classList.add(
                "active"
            );

        }

    }

}


/* =========================================================
   TERMINAR INTRO
========================================================= */

function finishIntro() {

    if (introFinished) {

        return;

    }


    introFinished =
        true;


    if (progressBar) {

        progressBar.style.width =
            "100%";

    }


    if (timer) {

        timer.textContent =
            "LISTO";

    }


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
                "opacity 1.2s ease";


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
                1200
            );

        },
        700
    );

}


/* =========================================================
   PREPARAR AUDIO
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


    updatePlayButton(
        false
    );

}


/* =========================================================
   BOTÓN PLAY
========================================================= */

if (playButton) {

    playButton.addEventListener(
        "click",
        function () {

            if (!audioPlayer) {

                return;

            }


            if (
                audioPlayer.paused
            ) {

                playAudio();

            } else {

                pauseAudio();

            }

        }
    );

}


/* =========================================================
   REPRODUCIR
========================================================= */

function playAudio() {

    if (!audioPlayer) {

        return;

    }


    const playPromise =
        audioPlayer.play();


    if (
        playPromise &&
        typeof playPromise.catch ===
        "function"
    ) {

        playPromise.catch(
            function (error) {

                console.log(
                    "No se pudo reproducir el audio:",
                    error
                );

            }
        );

    }

}


/* =========================================================
   PAUSAR
========================================================= */

function pauseAudio() {

    if (!audioPlayer) {

        return;

    }


    audioPlayer.pause();

}


/* =========================================================
   EVENTO PLAY
========================================================= */

if (audioPlayer) {

    audioPlayer.addEventListener(
        "play",
        function () {

            updatePlayButton(
                true
            );


            startWaveAnimation();

        }
    );


    audioPlayer.addEventListener(
        "pause",
        function () {

            updatePlayButton(
                false
            );


            stopWaveAnimation();

        }
    );


    audioPlayer.addEventListener(
        "ended",
        function () {

            updatePlayButton(
                false
            );


            stopWaveAnimation();


            if (audioProgressValue) {

                audioProgressValue.style.width =
                    "0%";

            }


            if (currentTime) {

                currentTime.textContent =
                    "00:00";

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
        "error",
        function () {

            console.log(
                "No se pudo cargar:",
                CONFIG.todayAudio
            );

        }
    );

}


/* =========================================================
   ACTUALIZAR PROGRESO
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

        const percentage =
            (current / total) * 100;


        audioProgressValue.style.width =
            String(
                percentage
            ) + "%";

    }

}


/* =========================================================
   BARRA CLICKEABLE
========================================================= */

if (audioProgress) {

    audioProgress.addEventListener(
        "click",
        function (event) {

            if (!audioPlayer) {

                return;

            }


            if (
                !audioPlayer.duration ||
                !isFinite(
                    audioPlayer.duration
                )
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
   ACTUALIZAR BOTÓN
========================================================= */

function updatePlayButton(
    playing
) {

    if (!playIcon) {

        return;

    }


    if (playing) {

        playIcon.textContent =
            "Ⅱ";

    } else {

        playIcon.textContent =
            "▶";

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
   ONDA
========================================================= */

function startWaveAnimation() {

    if (!waveform) {

        return;

    }


    waveform.classList.add(
        "is-playing"
    );

}


function stopWaveAnimation() {

    if (!waveform) {

        return;

    }


    waveform.classList.remove(
        "is-playing"
    );

}


/* =========================================================
   DESCARGAR
========================================================= */

if (downloadButton) {

    downloadButton.addEventListener(
        "click",
        function () {

            downloadAudio();

        }
    );

}


function downloadAudio() {

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


/* =========================================================
   FORMATO DE TIEMPO
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


    const remainingSeconds =
        Math.floor(
            seconds % 60
        );


    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );

}


/* =========================================================
   MENSAJES RECIENTES
========================================================= */

const recentButtons =
    document.querySelectorAll(
        ".recent-play"
    );


recentButtons.forEach(
    function (button, index) {

        button.addEventListener(
            "click",
            function () {

                console.log(
                    "Mensaje reciente:",
                    index + 1
                );

            }
        );

    }
);
