
/* =========================================================
   UN DÍA MÁS
   APP.JS
   Reproductor principal
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURACIÓN
       ===================================================== */

    const AUDIO_HOY = "audio/hoy.mp3";
    const AUDIO_AYER = "audio/ayer.mp3";


    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const audio = document.getElementById("audioPlayer");

    const playButton = document.getElementById("playButton");
    const playIcon = document.getElementById("playIcon");

    const rewindButton = document.getElementById("rewindButton");
    const forwardButton = document.getElementById("forwardButton");

    const progress = document.getElementById("progress");
    const progressBar = document.querySelector(".progress-bar");

    const currentTime = document.getElementById("currentTime");
    const duration = document.getElementById("duration");

    const downloadButton =
        document.getElementById("downloadButton");

    const todayTitle =
        document.getElementById("todayTitle");

    const todayDescription =
        document.getElementById("todayDescription");

    const currentDate =
        document.getElementById("currentDate");

    const audioCard =
        document.querySelector(".today-card");


    /* =====================================================
       ELEMENTOS DE AYER
       ===================================================== */

    const yesterdayAudio =
        new Audio();

    const yesterdayPlay =
        document.getElementById("yesterdayPlay");

    const yesterdayProgress =
        document.getElementById("yesterdayProgress");

    const yesterdayDuration =
        document.getElementById("yesterdayDuration");

    const yesterdayDownload =
        document.getElementById("yesterdayDownload");

    const yesterdayTitle =
        document.getElementById("yesterdayTitle");

    const yesterdayDate =
        document.getElementById("yesterdayDate");


    /* =====================================================
       CARGAR AUDIO DE HOY
       ===================================================== */

    audio.src = AUDIO_HOY;

    audio.load();

    downloadButton.href = AUDIO_HOY;


    /* =====================================================
       CARGAR AUDIO DE AYER
       ===================================================== */

    yesterdayAudio.src = AUDIO_AYER;

    yesterdayAudio.preload = "metadata";

    yesterdayDownload.href = AUDIO_AYER;


    /* =====================================================
       FECHAS
       ===================================================== */

    function actualizarFechas() {

        const ahora = new Date();

        const opcionesHoy = {
            weekday: "long",
            day: "numeric",
            month: "long"
        };

        const opcionesAyer = {
            weekday: "short",
            day: "numeric",
            month: "short"
        };

        const hoyTexto =
            ahora.toLocaleDateString(
                "es-CO",
                opcionesHoy
            );

        const ayer = new Date(ahora);

        ayer.setDate(
            ayer.getDate() - 1
        );

        const ayerTexto =
            ayer.toLocaleDateString(
                "es-CO",
                opcionesAyer
            );


        currentDate.textContent =
            hoyTexto.toUpperCase();

        yesterdayDate.textContent =
            ayerTexto;


        /* Títulos temporales */

        todayTitle.textContent =
            "Un día más";

        todayDescription.textContent =
            "Tómate un momento. Respira. Escucha.";

        yesterdayTitle.textContent =
            "Audio de ayer";
    }


    actualizarFechas();


    /* =====================================================
       FORMATO DE TIEMPO
       ===================================================== */

    function formatTime(seconds) {

        if (!Number.isFinite(seconds)) {
            return "0:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const secs =
            Math.floor(seconds % 60);

        return (
            minutes +
            ":" +
            secs.toString().padStart(2, "0")
        );
    }


    /* =====================================================
       REPRODUCIR / PAUSAR
       ===================================================== */

    playButton.addEventListener(
        "click",
        async () => {

            try {

                if (audio.paused) {

                    /* Detener audio de ayer */

                    if (!yesterdayAudio.paused) {
                        yesterdayAudio.pause();
                    }


                    await audio.play();

                } else {

                    audio.pause();

                }

            } catch (error) {

                console.error(
                    "No se pudo reproducir el audio:",
                    error
                );

            }

        }
    );


    /* =====================================================
       AUDIO INICIADO
       ===================================================== */

    audio.addEventListener(
        "play",
        () => {

            playIcon.textContent = "Ⅱ";

            audioCard.classList.add(
                "playing"
            );

        }
    );


    /* =====================================================
       AUDIO PAUSADO
       ===================================================== */

    audio.addEventListener(
        "pause",
        () => {

            playIcon.textContent = "▶";

            audioCard.classList.remove(
                "playing"
            );

        }
    );


    /* =====================================================
       AUDIO TERMINADO
       ===================================================== */

    audio.addEventListener(
        "ended",
        () => {

            playIcon.textContent = "▶";

            audioCard.classList.remove(
                "playing"
            );

            progress.style.width = "0%";

            currentTime.textContent =
                "0:00";

        }
    );


    /* =====================================================
       DURACIÓN
       ===================================================== */

    audio.addEventListener(
        "loadedmetadata",
        () => {

            duration.textContent =
                formatTime(audio.duration);

        }
    );


    /* =====================================================
       PROGRESO
       ===================================================== */

    audio.addEventListener(
        "timeupdate",
        () => {

            if (!audio.duration) {
                return;
            }

            const percentage =
                (audio.currentTime /
                    audio.duration) * 100;

            progress.style.width =
                percentage + "%";


            currentTime.textContent =
                formatTime(
                    audio.currentTime
                );

        }
    );


    /* =====================================================
       TOCAR EN LA BARRA
       ===================================================== */

    progressBar.addEventListener(
        "click",
        (event) => {

            if (!audio.duration) {
                return;
            }

            const rect =
                progressBar.getBoundingClientRect();

            const position =
                event.clientX -
                rect.left;

            const percentage =
                position /
                rect.width;

            audio.currentTime =
                percentage *
                audio.duration;

        }
    );


    /* =====================================================
       RETROCEDER 10 SEGUNDOS
       ===================================================== */

    rewindButton.addEventListener(
        "click",
        () => {

            audio.currentTime =
                Math.max(
                    0,
                    audio.currentTime - 10
                );

        }
    );


    /* =====================================================
       AVANZAR 10 SEGUNDOS
       ===================================================== */

    forwardButton.addEventListener(
        "click",
        () => {

            audio.currentTime =
                Math.min(
                    audio.duration || 0,
                    audio.currentTime + 10
                );

        }
    );


    /* =====================================================
       AUDIO DE AYER
       ===================================================== */

    yesterdayPlay.addEventListener(
        "click",
        async () => {

            try {

                /* Si está sonando el de hoy,
                   detenerlo */

                if (!audio.paused) {
                    audio.pause();
                }


                if (yesterdayAudio.paused) {

                    await yesterdayAudio.play();

                    yesterdayPlay.textContent =
                        "Ⅱ";

                } else {

                    yesterdayAudio.pause();

                    yesterdayPlay.textContent =
                        "▶";

                }

            } catch (error) {

                console.error(
                    "No se pudo reproducir el audio de ayer:",
                    error
                );

            }

        }
    );


    /* =====================================================
       METADATA DE AYER
       ===================================================== */

    yesterdayAudio.addEventListener(
        "loadedmetadata",
        () => {

            yesterdayDuration.textContent =
                formatTime(
                    yesterdayAudio.duration
                );

        }
    );


    /* =====================================================
       PROGRESO DE AYER
       ===================================================== */

    yesterdayAudio.addEventListener(
        "timeupdate",
        () => {

            if (!yesterdayAudio.duration) {
                return;
            }

            const percentage =
                (yesterdayAudio.currentTime /
                    yesterdayAudio.duration) * 100;

            yesterdayProgress.style.width =
                percentage + "%";

        }
    );


    /* =====================================================
       AYER TERMINADO
       ===================================================== */

    yesterdayAudio.addEventListener(
        "ended",
        () => {

            yesterdayPlay.textContent =
                "▶";

            yesterdayProgress.style.width =
                "0%";

        }
    );


    /* =====================================================
       CAMBIO AUTOMÁTICO DE REPRODUCTOR
       ===================================================== */

    audio.addEventListener(
        "play",
        () => {

            yesterdayPlay.textContent =
                "▶";

        }
    );


    yesterdayAudio.addEventListener(
        "play",
        () => {

            playIcon.textContent =
                "▶";

            audioCard.classList.remove(
                "playing"
            );

        }
    );


    /* =====================================================
       CONTROL DE TECLADO
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            /* Espacio */

            if (
                event.code === "Space" &&
                document.activeElement.tagName !== "BUTTON"
            ) {

                event.preventDefault();

                playButton.click();

            }


            /* Flecha izquierda */

            if (
                event.code === "ArrowLeft"
            ) {

                audio.currentTime =
                    Math.max(
                        0,
                        audio.currentTime - 5
                    );

            }


            /* Flecha derecha */

            if (
                event.code === "ArrowRight"
            ) {

                audio.currentTime =
                    Math.min(
                        audio.duration || 0,
                        audio.currentTime + 5
                    );

            }

        }
    );


    /* =====================================================
       EVITAR ERROR SI TODAVÍA NO EXISTE EL AUDIO
       ===================================================== */

    audio.addEventListener(
        "error",
        () => {

            console.warn(
                "El audio de hoy todavía no está disponible."
            );

        }
    );


    yesterdayAudio.addEventListener(
        "error",
        () => {

            console.warn(
                "El audio de ayer todavía no está disponible."
            );

        }
    );


});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => {
        console.log("UN DÍA MÁS: Service Worker activo");
      })
      .catch(error => {
        console.error("Error del Service Worker:", error);
      });
  });
}

