
document.addEventListener("DOMContentLoaded", () => {

    console.log("UN DÍA MÁS: aplicación iniciada");

    /* ==========================================
       ELEMENTOS
    ========================================== */

    const audio = document.getElementById("audioPlayer");

    const playButton = document.getElementById("playButton");
    const playIcon = document.getElementById("playIcon");

    const rewindButton = document.getElementById("rewindButton");
    const forwardButton = document.getElementById("forwardButton");

    const progressBar = document.getElementById("progressBar");
    const progress = document.getElementById("progress");

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

    const visualizer =
        document.getElementById("visualizer");


    /* ==========================================
       AUDIO LOCAL
    ========================================== */

    const audioURL = "audio/hoy.mp3";

    audio.src = audioURL;


    /* ==========================================
       INFORMACIÓN
    ========================================== */

    todayTitle.textContent = "Un día más";

    todayDescription.textContent =
        "Tómate un momento. Respira. Escucha.";


    /* ==========================================
       FECHA
    ========================================== */

    const ahora = new Date();

    currentDate.textContent =
        ahora.toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).toUpperCase();


    /* ==========================================
       FORMATO DE TIEMPO
    ========================================== */

    function formatearTiempo(segundos) {

        if (!Number.isFinite(segundos)) {
            return "0:00";
        }

        const minutos =
            Math.floor(segundos / 60);

        const segundosRestantes =
            Math.floor(segundos % 60);

        return (
            minutos +
            ":" +
            segundosRestantes
                .toString()
                .padStart(2, "0")
        );
    }


    /* ==========================================
       PLAY / PAUSA
    ========================================== */

    playButton.addEventListener("click", () => {

        if (audio.paused) {

            audio.play()
                .then(() => {

                    playIcon.textContent = "❚❚";

                    visualizer.classList.add("playing");

                })
                .catch(error => {

                    console.error(
                        "No se pudo reproducir el audio:",
                        error
                    );

                });

        } else {

            audio.pause();

            playIcon.textContent = "▶";

            visualizer.classList.remove("playing");

        }

    });


    /* ==========================================
       AUDIO TERMINADO
    ========================================== */

    audio.addEventListener("ended", () => {

        playIcon.textContent = "▶";

        visualizer.classList.remove("playing");

        progress.style.width = "0%";

        currentTime.textContent = "0:00";

    });


    /* ==========================================
       METADATOS
    ========================================== */

    audio.addEventListener("loadedmetadata", () => {

        duration.textContent =
            formatearTiempo(audio.duration);

        console.log(
            "Duración:",
            audio.duration
        );

    });


    /* ==========================================
       ACTUALIZAR PROGRESO
    ========================================== */

    audio.addEventListener("timeupdate", () => {

        if (!audio.duration) {
            return;
        }

        const porcentaje =
            (audio.currentTime / audio.duration) * 100;

        progress.style.width =
            porcentaje + "%";

        currentTime.textContent =
            formatearTiempo(audio.currentTime);

    });


    /* ==========================================
       CLIC EN BARRA DE PROGRESO
    ========================================== */

    progressBar.addEventListener("click", event => {

        if (!audio.duration) {
            return;
        }

        const rect =
            progressBar.getBoundingClientRect();

        const posicion =
            event.clientX - rect.left;

        const porcentaje =
            posicion / rect.width;

        audio.currentTime =
            porcentaje * audio.duration;

    });


    /* ==========================================
       RETROCEDER 10 SEGUNDOS
    ========================================== */

    rewindButton.addEventListener("click", () => {

        audio.currentTime =
            Math.max(
                0,
                audio.currentTime - 10
            );

    });


    /* ==========================================
       AVANZAR 10 SEGUNDOS
    ========================================== */

    forwardButton.addEventListener("click", () => {

        if (!Number.isFinite(audio.duration)) {
            return;
        }

        audio.currentTime =
            Math.min(
                audio.duration,
                audio.currentTime + 10
            );

    });


    /* ==========================================
       DESCARGA
    ========================================== */

    downloadButton.href = audioURL;

    downloadButton.download =
        "un-dia-mas-hoy.mp3";


    /* ==========================================
       VISUALIZADOR
    ========================================== */

    const barras =
        visualizer.querySelectorAll("span");

    let animacion = null;


    function animarVisualizer() {

        if (!visualizer.classList.contains("playing")) {

            barras.forEach((barra, index) => {

                barra.style.height =
                    `${25 + (index % 5) * 8}px`;

            });

            return;
        }


        barras.forEach(barra => {

            const altura =
                Math.floor(
                    Math.random() * 75
                ) + 20;

            barra.style.height =
                altura + "px";

        });


        animacion =
            setTimeout(
                animarVisualizer,
                120
            );

    }


    /* ==========================================
       AUDIO PLAY
    ========================================== */

    audio.addEventListener("play", () => {

        visualizer.classList.add("playing");

        clearTimeout(animacion);

        animarVisualizer();

    });


    /* ==========================================
       AUDIO PAUSE
    ========================================== */

    audio.addEventListener("pause", () => {

        visualizer.classList.remove("playing");

        clearTimeout(animacion);

    });


    /* ==========================================
       ERROR
    ========================================== */

    audio.addEventListener("error", () => {

        console.error(
            "ERROR: no se pudo cargar el audio:",
            audioURL
        );

    });


    console.log(
        "UN DÍA MÁS: reproductor preparado."
    );

});

