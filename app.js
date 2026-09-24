
document.addEventListener("DOMContentLoaded", function () {

    console.log("UN DÍA MÁS: aplicación iniciada");


    /* =================================================
       ELEMENTOS - HOY
    ================================================= */

    const audioHoy =
        document.getElementById("audioPlayer");

    const playHoy =
        document.getElementById("playButton");

    const iconoHoy =
        document.getElementById("playIcon");

    const progressHoy =
        document.getElementById("progress");

    const progressBarHoy =
        document.getElementById("progressBar");

    const tiempoHoy =
        document.getElementById("currentTime");

    const duracionHoy =
        document.getElementById("duration");

    const retrocederHoy =
        document.getElementById("rewindButton");

    const avanzarHoy =
        document.getElementById("forwardButton");

    const descargarHoy =
        document.getElementById("downloadButton");

    const tituloHoy =
        document.getElementById("todayTitle");

    const descripcionHoy =
        document.getElementById("todayDescription");

    const fechaHoy =
        document.getElementById("currentDate");


    /* =================================================
       ELEMENTOS - AYER
    ================================================= */

    const audioAyer =
        new Audio();

    const playAyer =
        document.getElementById("yesterdayPlay");

    const progressAyer =
        document.getElementById("yesterdayProgress");

    const progressBarAyer =
        document.getElementById("yesterdayProgressBar");

    const tiempoAyer =
        document.getElementById("yesterdayDuration");

    const tituloAyer =
        document.getElementById("yesterdayTitle");

    const fechaAyer =
        document.getElementById("yesterdayDate");

    const descargarAyer =
        document.getElementById("yesterdayDownload");


    /* =================================================
       ARCHIVOS
    ================================================= */

    const urlHoy =
        "audio/hoy.mp3";

    const urlAyer =
        "audio/ayer.mp3";


    audioHoy.src =
        urlHoy;

    audioAyer.src =
        urlAyer;

    audioHoy.preload =
        "metadata";

    audioAyer.preload =
        "metadata";


    /* =================================================
       INFORMACIÓN
    ================================================= */

    tituloHoy.textContent =
        "Un día más";

    descripcionHoy.textContent =
        "Tómate un momento. Respira. Escucha.";

    tituloAyer.textContent =
        "Mensaje de ayer";


    /* =================================================
       FECHAS
    ================================================= */

    const hoy =
        new Date();

    const ayer =
        new Date();

    ayer.setDate(
        hoy.getDate() - 1
    );


    fechaHoy.textContent =
        hoy.toLocaleDateString(
            "es-CO",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ).toUpperCase();


    fechaAyer.textContent =
        ayer.toLocaleDateString(
            "es-CO",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );


    /* =================================================
       FORMATO DE TIEMPO
    ================================================= */

    function convertirTiempo(segundos) {

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
            String(segundosRestantes)
                .padStart(2, "0")
        );
    }


    /* =================================================
       HOY - PLAY / PAUSA
    ================================================= */

    playHoy.addEventListener(
        "click",
        function () {

            /*
               Si está sonando AYER,
               detenemos AYER.
            */

            if (!audioAyer.paused) {

                audioAyer.pause();

                playAyer.textContent =
                    "▶";

            }


            if (audioHoy.paused) {

                audioHoy.play()
                    .then(function () {

                        iconoHoy.textContent =
                            "❚❚";

                    })
                    .catch(function (error) {

                        console.error(
                            "Error reproduciendo HOY:",
                            error
                        );

                    });

            } else {

                audioHoy.pause();

            }

        }
    );


    /* =================================================
       HOY - PLAY
    ================================================= */

    audioHoy.addEventListener(
        "play",
        function () {

            iconoHoy.textContent =
                "❚❚";

        }
    );


    /* =================================================
       HOY - PAUSA
    ================================================= */

    audioHoy.addEventListener(
        "pause",
        function () {

            iconoHoy.textContent =
                "▶";

        }
    );


    /* =================================================
       HOY - TERMINADO
    ================================================= */

    audioHoy.addEventListener(
        "ended",
        function () {

            iconoHoy.textContent =
                "▶";

            progressHoy.style.width =
                "0%";

            tiempoHoy.textContent =
                "0:00";

        }
    );


    /* =================================================
       HOY - DURACIÓN
    ================================================= */

    audioHoy.addEventListener(
        "loadedmetadata",
        function () {

            duracionHoy.textContent =
                convertirTiempo(
                    audioHoy.duration
                );

            console.log(
                "Duración HOY:",
                audioHoy.duration
            );

        }
    );


    /* =================================================
       HOY - PROGRESO
    ================================================= */

    audioHoy.addEventListener(
        "timeupdate",
        function () {

            if (!audioHoy.duration) {
                return;
            }

            const porcentaje =
                (
                    audioHoy.currentTime /
                    audioHoy.duration
                ) * 100;

            progressHoy.style.width =
                porcentaje + "%";

            tiempoHoy.textContent =
                convertirTiempo(
                    audioHoy.currentTime
                );

        }
    );


    /* =================================================
       HOY - BARRA
    ================================================= */

    progressBarHoy.addEventListener(
        "click",
        function (event) {

            if (!audioHoy.duration) {
                return;
            }

            const rect =
                progressBarHoy
                    .getBoundingClientRect();

            const posicion =
                event.clientX -
                rect.left;

            const porcentaje =
                posicion / rect.width;

            audioHoy.currentTime =
                porcentaje *
                audioHoy.duration;

        }
    );


    /* =================================================
       HOY - RETROCEDER
    ================================================= */

    retrocederHoy.addEventListener(
        "click",
        function () {

            audioHoy.currentTime =
                Math.max(
                    0,
                    audioHoy.currentTime - 10
                );

        }
    );


    /* =================================================
       HOY - AVANZAR
    ================================================= */

    avanzarHoy.addEventListener(
        "click",
        function () {

            if (!Number.isFinite(
                audioHoy.duration
            )) {
                return;
            }

            audioHoy.currentTime =
                Math.min(
                    audioHoy.duration,
                    audioHoy.currentTime + 10
                );

        }
    );


    /* =================================================
       HOY - DESCARGA
    ================================================= */

    descargarHoy.href =
        urlHoy;

    descargarHoy.download =
        "un-dia-mas-hoy.mp3";


    /* =================================================
       AYER - PLAY / PAUSA
    ================================================= */

    playAyer.addEventListener(
        "click",
        function () {

            /*
               Si está sonando HOY,
               detenemos HOY.
            */

            if (!audioHoy.paused) {

                audioHoy.pause();

            }


            if (audioAyer.paused) {

                audioAyer.play()
                    .then(function () {

                        playAyer.textContent =
                            "❚❚";

                    })
                    .catch(function (error) {

                        console.error(
                            "Error reproduciendo AYER:",
                            error
                        );

                    });

            } else {

                audioAyer.pause();

            }

        }
    );


    /* =================================================
       AYER - PLAY
    ================================================= */

    audioAyer.addEventListener(
        "play",
        function () {

            playAyer.textContent =
                "❚❚";

        }
    );


    /* =================================================
       AYER - PAUSA
    ================================================= */

    audioAyer.addEventListener(
        "pause",
        function () {

            playAyer.textContent =
                "▶";

        }
    );


    /* =================================================
       AYER - DURACIÓN
    ================================================= */

    audioAyer.addEventListener(
        "loadedmetadata",
        function () {

            tiempoAyer.textContent =
                convertirTiempo(
                    audioAyer.duration
                );

            console.log(
                "Duración AYER:",
                audioAyer.duration
            );

        }
    );


    /* =================================================
       AYER - PROGRESO
    ================================================= */

    audioAyer.addEventListener(
        "timeupdate",
        function () {

            if (!audioAyer.duration) {
                return;
            }

            const porcentaje =
                (
                    audioAyer.currentTime /
                    audioAyer.duration
                ) * 100;

            progressAyer.style.width =
                porcentaje + "%";

        }
    );


    /* =================================================
       AYER - BARRA
    ================================================= */

    progressBarAyer.addEventListener(
        "click",
        function (event) {

            if (!audioAyer.duration) {
                return;
            }

            const rect =
                progressBarAyer
                    .getBoundingClientRect();

            const posicion =
                event.clientX -
                rect.left;

            const porcentaje =
                posicion / rect.width;

            audioAyer.currentTime =
                porcentaje *
                audioAyer.duration;

        }
    );


    /* =================================================
       AYER - DESCARGA
    ================================================= */

    descargarAyer.href =
        urlAyer;

    descargarAyer.download =
        "un-dia-mas-ayer.mp3";


    /* =================================================
       AYER - TERMINADO
    ================================================= */

    audioAyer.addEventListener(
        "ended",
        function () {

            playAyer.textContent =
                "▶";

            progressAyer.style.width =
                "0%";

        }
    );


    /* =================================================
       ERRORES
    ================================================= */

    audioHoy.addEventListener(
        "error",
        function () {

            console.error(
                "No se pudo cargar audio/hoy.mp3"
            );

        }
    );


    audioAyer.addEventListener(
        "error",
        function () {

            console.error(
                "No se pudo cargar audio/ayer.mp3"
            );

        }
    );


    console.log(
        "UN DÍA MÁS: Hoy + Ayer preparados."
    );

});

