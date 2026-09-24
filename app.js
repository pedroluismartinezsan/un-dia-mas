/* =========================================================
   UN DÍA MÁS
   SISTEMA DE INICIO + REPRODUCTOR DE AUDIO
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

var TIEMPO_CARGA = 5000;


/*
   AUDIO DE PRUEBA

   Cambia esta dirección por la ubicación real
   de tu archivo MP3 cuando lo tengas.

   Por ahora puedes colocar un MP3 dentro de tu
   proyecto y escribir aquí su nombre.
*/
var AUDIO_HOY = "audio/hoy.mp3";


/* =========================================================
   ELEMENTOS DEL INTRO
========================================================= */

var intro = document.getElementById("intro");
var app = document.getElementById("app");
var loadingText = document.getElementById("loadingText");


/* =========================================================
   ELEMENTOS DEL REPRODUCTOR
========================================================= */

var audioPlayer = document.getElementById("audioPlayer");

var playButton = document.getElementById("playButton");
var mainPlayButton = document.getElementById("mainPlayButton");
var mainPlayIcon = document.getElementById("mainPlayIcon");

var backButton = document.getElementById("backButton");
var forwardButton = document.getElementById("forwardButton");

var progressBar = document.getElementById("progressBar");
var progressFill = document.getElementById("progressFill");
var progressDot = document.getElementById("progressDot");

var currentTimeElement = document.getElementById("currentTime");
var durationElement = document.getElementById("duration");

var downloadButton = document.getElementById("downloadButton");

var audioTitle = document.getElementById("audioTitle");
var audioDescription = document.getElementById("audioDescription");

var audioPlayerContainer =
    document.querySelector(".audio-player");

var audioVisualizer =
    document.querySelector(".audio-visualizer");


/* =========================================================
   INICIO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "UN DÍA MÁS: aplicación cargada"
        );

        iniciarUDM();
        prepararReproductor();

    }
);


/* =========================================================
   INTRO DE 5 SEGUNDOS
========================================================= */

function iniciarUDM() {

    if (!intro || !app) {

        console.error(
            "UDM: no se encontraron #intro o #app"
        );

        return;
    }


    /*
       La aplicación empieza oculta
    */

    app.style.opacity = "0";


    /*
       Esperamos 5 segundos
    */

    setTimeout(
        function () {

            console.log(
                "UDM: mostrando nombre"
            );


            if (loadingText) {

                loadingText.style.opacity = "0";

            }


            intro.classList.add(
                "reveal"
            );

        },
        TIEMPO_CARGA
    );


    /*
       Después de mostrar el nombre
       entramos a la aplicación.
    */

    setTimeout(
        function () {

            console.log(
                "UDM: entrando a la aplicación"
            );


            intro.style.transition =
                "opacity 1s ease";

            app.style.transition =
                "opacity 1s ease";


            intro.style.opacity =
                "0";

            app.style.opacity =
                "1";


            setTimeout(
                function () {

                    intro.style.display =
                        "none";

                    document.body.style.overflow =
                        "auto";


                    console.log(
                        "UDM: aplicación visible"
                    );

                },
                1000
            );

        },
        8000
    );

}


/* =========================================================
   PREPARAR REPRODUCTOR
========================================================= */

function prepararReproductor() {

    if (!audioPlayer) {

        console.error(
            "UDM: no existe #audioPlayer"
        );

        return;
    }


    /*
       Cargar audio de hoy
    */

    audioPlayer.src = AUDIO_HOY;

    audioPlayer.load();


    /*
       Información inicial
    */

    if (audioTitle) {

        audioTitle.textContent =
            "Mensaje de hoy";

    }


    if (audioDescription) {

        audioDescription.textContent =
            "Un mensaje para este día.";

    }


    /*
       Eventos
    */

    audioPlayer.addEventListener(
        "loadedmetadata",
        actualizarDuracion
    );


    audioPlayer.addEventListener(
        "timeupdate",
        actualizarProgreso
    );


    audioPlayer.addEventListener(
        "play",
        reproductorIniciado
    );


    audioPlayer.addEventListener(
        "pause",
        reproductorPausado
    );


    audioPlayer.addEventListener(
        "ended",
        reproductorTerminado
    );


    /*
       Botón principal grande
    */

    if (playButton) {

        playButton.addEventListener(
            "click",
            alternarReproduccion
        );

    }


    /*
       Botón Play inferior
    */

    if (mainPlayButton) {

        mainPlayButton.addEventListener(
            "click",
            alternarReproduccion
        );

    }


    /*
       Retroceder 15 segundos
    */

    if (backButton) {

        backButton.addEventListener(
            "click",
            function () {

                cambiarTiempo(
                    -15
                );

            }
        );

    }


    /*
       Adelantar 15 segundos
    */

    if (forwardButton) {

        forwardButton.addEventListener(
            "click",
            function () {

                cambiarTiempo(
                    15
                );

            }
        );

    }


    /*
       Barra de progreso
    */

    if (progressBar) {

        progressBar.addEventListener(
            "click",
            buscarEnAudio
        );

    }


    /*
       Descargar audio
    */

    if (downloadButton) {

        downloadButton.addEventListener(
            "click",
            descargarAudio
        );

    }


    console.log(
        "UDM: reproductor preparado"
    );

}


/* =========================================================
   PLAY / PAUSA
========================================================= */

function alternarReproduccion() {

    if (!audioPlayer) {
        return;
    }


    if (audioPlayer.paused) {

        reproducirAudio();

    } else {

        pausarAudio();

    }

}


/* =========================================================
   REPRODUCIR
========================================================= */

function reproducirAudio() {

    var promesa =
        audioPlayer.play();


    /*
       Algunos navegadores devuelven
       una promesa al intentar reproducir.
    */

    if (promesa !== undefined) {

        promesa.catch(
            function (error) {

                console.error(
                    "UDM: no se pudo reproducir el audio",
                    error
                );

            }
        );

    }

}


/* =========================================================
   PAUSAR
========================================================= */

function pausarAudio() {

    if (!audioPlayer) {
        return;
    }

    audioPlayer.pause();

}


/* =========================================================
   EVENTO PLAY
========================================================= */

function reproductorIniciado() {

    console.log(
        "UDM: reproduciendo audio"
    );


    actualizarIcono(
        true
    );


    if (audioPlayerContainer) {

        audioPlayerContainer.classList.add(
            "is-playing"
        );

    }


    if (audioVisualizer) {

        audioVisualizer.classList.add(
            "is-playing"
        );

    }

}


/* =========================================================
   EVENTO PAUSA
========================================================= */

function reproductorPausado() {

    console.log(
        "UDM: audio pausado"
    );


    actualizarIcono(
        false
    );


    if (audioPlayerContainer) {

        audioPlayerContainer.classList.remove(
            "is-playing"
        );

    }


    if (audioVisualizer) {

        audioVisualizer.classList.remove(
            "is-playing"
        );

    }

}


/* =========================================================
   AUDIO TERMINADO
========================================================= */

function reproductorTerminado() {

    console.log(
        "UDM: audio terminado"
    );


    actualizarIcono(
        false
    );


    if (audioPlayerContainer) {

        audioPlayerContainer.classList.remove(
            "is-playing"
        );

    }


    if (audioVisualizer) {

        audioVisualizer.classList.remove(
            "is-playing"
        );

    }


    if (progressFill) {

        progressFill.style.width =
            "100%";

    }


    if (progressDot) {

        progressDot.style.left =
            "100%";

    }

}


/* =========================================================
   CAMBIAR ICONO PLAY / PAUSA
========================================================= */

function actualizarIcono(
    reproduciendo
) {

    if (!mainPlayIcon) {
        return;
    }


    if (reproduciendo) {

        /*
           Icono de pausa
        */

        mainPlayIcon.textContent =
            "❚❚";

    } else {

        /*
           Icono de Play
        */

        mainPlayIcon.textContent =
            "▶";

    }

}


/* =========================================================
   DURACIÓN
========================================================= */

function actualizarDuracion() {

    if (!audioPlayer) {
        return;
    }


    if (!isFinite(audioPlayer.duration)) {
        return;
    }


    if (durationElement) {

        durationElement.textContent =
            formatearTiempo(
                audioPlayer.duration
            );

    }


    actualizarProgreso();

}


/* =========================================================
   ACTUALIZAR PROGRESO
========================================================= */

function actualizarProgreso() {

    if (!audioPlayer) {
        return;
    }


    var duracion =
        audioPlayer.duration;

    var actual =
        audioPlayer.currentTime;


    if (!isFinite(duracion) || duracion <= 0) {
        return;
    }


    var porcentaje =
        (actual / duracion) * 100;


    if (progressFill) {

        progressFill.style.width =
            porcentaje + "%";

    }


    if (progressDot) {

        progressDot.style.left =
            porcentaje + "%";

    }


    if (currentTimeElement) {

        currentTimeElement.textContent =
            formatearTiempo(
                actual
            );

    }

}


/* =========================================================
   BUSCAR EN LA BARRA
========================================================= */

function buscarEnAudio(
    evento
) {

    if (!audioPlayer || !progressBar) {
        return;
    }


    if (!isFinite(audioPlayer.duration)) {
        return;
    }


    var rect =
        progressBar.getBoundingClientRect();


    var posicion =
        evento.clientX - rect.left;


    var porcentaje =
        posicion / rect.width;


    if (porcentaje < 0) {
        porcentaje = 0;
    }


    if (porcentaje > 1) {
        porcentaje = 1;
    }


    audioPlayer.currentTime =
        porcentaje *
        audioPlayer.duration;

}


/* =========================================================
   ADELANTAR / RETROCEDER
========================================================= */

function cambiarTiempo(
    segundos
) {

    if (!audioPlayer) {
        return;
    }


    if (!isFinite(audioPlayer.duration)) {
        return;
    }


    var nuevoTiempo =
        audioPlayer.currentTime +
        segundos;


    if (nuevoTiempo < 0) {

        nuevoTiempo = 0;

    }


    if (
        nuevoTiempo >
        audioPlayer.duration
    ) {

        nuevoTiempo =
            audioPlayer.duration;

    }


    audioPlayer.currentTime =
        nuevoTiempo;

}


/* =========================================================
   FORMATO DE TIEMPO
========================================================= */

function formatearTiempo(
    segundos
) {

    if (!isFinite(segundos)) {

        return "0:00";

    }


    segundos =
        Math.floor(
            segundos
        );


    var minutos =
        Math.floor(
            segundos / 60
        );


    var segundosRestantes =
        segundos % 60;


    if (segundosRestantes < 10) {

        segundosRestantes =
            "0" +
            segundosRestantes;

    }


    return (
        minutos +
        ":" +
        segundosRestantes
    );

}


/* =========================================================
   DESCARGAR AUDIO
========================================================= */

function descargarAudio() {

    if (!audioPlayer) {
        return;
    }


    var url =
        audioPlayer.currentSrc ||
        audioPlayer.src;


    if (!url) {

        console.error(
            "UDM: no existe audio para descargar"
        );

        return;

    }


    var enlace =
        document.createElement(
            "a"
        );


    enlace.href =
        url;

    enlace.download =
        "un-dia-mas.mp3";

    enlace.target =
        "_blank";

    enlace.rel =
        "noopener";


    document.body.appendChild(
        enlace
    );


    enlace.click();


    document.body.removeChild(
        enlace
    );

}


/* =========================================================
   TECLADO
   Opcional: controles rápidos
========================================================= */

document.addEventListener(
    "keydown",
    function (evento) {

        /*
           No activar mientras se escribe
           en un campo de texto.
        */

        var elemento =
            document.activeElement;


        if (
            elemento &&
            (
                elemento.tagName === "INPUT" ||
                elemento.tagName === "TEXTAREA"
            )
        ) {

            return;

        }


        /*
           Barra espaciadora
        */

        if (
            evento.code ===
            "Space"
        ) {

            evento.preventDefault();

            alternarReproduccion();

        }


        /*
           Flecha izquierda
        */

        if (
            evento.code ===
            "ArrowLeft"
        ) {

            cambiarTiempo(
                -15
            );

        }


        /*
           Flecha derecha
        */

        if (
            evento.code ===
            "ArrowRight"
        ) {

            cambiarTiempo(
                15
            );

        }

    }
);
