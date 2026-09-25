/* =========================================================
   UN DÍA MÁS
   APP.JS
   Reproductor Hoy + Ayer
   ========================================================= */

console.log("UN DÍA MÁS: aplicación iniciada");


// =========================================================
// ELEMENTOS - AUDIO DE HOY
// =========================================================

const audioHoy = document.getElementById("audioPlayer");

const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");

const progressBar = document.getElementById("progressBar");
const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const rewindButton = document.getElementById("rewindButton");
const forwardButton = document.getElementById("forwardButton");

const downloadButton = document.getElementById("downloadButton");

const todayTitle = document.getElementById("todayTitle");
const todayDescription = document.getElementById("todayDescription");

const currentDate = document.getElementById("currentDate");


// =========================================================
// ELEMENTOS - AUDIO DE AYER
// =========================================================

const audioAyer = new Audio();

const yesterdayPlay = document.getElementById("yesterdayPlay");

const yesterdayProgressBar =
    document.getElementById("yesterdayProgressBar");

const yesterdayProgress =
    document.getElementById("yesterdayProgress");

const yesterdayDuration =
    document.getElementById("yesterdayDuration");

const yesterdayDownload =
    document.getElementById("yesterdayDownload");

const yesterdayDate =
    document.getElementById("yesterdayDate");

const yesterdayTitle =
    document.getElementById("yesterdayTitle");


// =========================================================
// ARCHIVOS DE AUDIO
// =========================================================

const urlHoy = "audio/hoy.mp3";

const urlAyer = "audio/ayer.mp3";


// =========================================================
// CONFIGURAR AUDIO DE HOY
// =========================================================

audioHoy.src = urlHoy;

audioHoy.preload = "metadata";

downloadButton.href = urlHoy;

downloadButton.download = "un-dia-mas-hoy.mp3";


// =========================================================
// CONFIGURAR AUDIO DE AYER
// =========================================================

audioAyer.src = urlAyer;

audioAyer.preload = "metadata";

yesterdayDownload.href = urlAyer;

yesterdayDownload.download = "un-dia-mas-ayer.mp3";


// =========================================================
// TITULOS
// =========================================================

todayTitle.textContent = "Un momento para ti";

todayDescription.textContent =
    "Escucha el mensaje de hoy y tómate unos minutos para ti.";

yesterdayTitle.textContent =
    "Mensaje de ayer";


// =========================================================
// FECHA DE HOY
// =========================================================

function mostrarFecha() {

    const fecha = new Date();

    const opciones = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const texto =
        fecha.toLocaleDateString("es-CO", opciones);

    currentDate.textContent =
        texto.charAt(0).toUpperCase() +
        texto.slice(1);
}

mostrarFecha();


// =========================================================
// FECHA DE AYER
// =========================================================

function mostrarFechaAyer() {

    const fecha = new Date();

    fecha.setDate(fecha.getDate() - 1);

    const opciones = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const texto =
        fecha.toLocaleDateString("es-CO", opciones);

    yesterdayDate.textContent =
        texto.charAt(0).toUpperCase() +
        texto.slice(1);
}

mostrarFechaAyer();


// =========================================================
// FORMATEAR TIEMPO
// =========================================================

function formatoTiempo(segundos) {

    if (!isFinite(segundos)) {
        return "0:00";
    }

    const minutos =
        Math.floor(segundos / 60);

    const segundosRestantes =
        Math.floor(segundos % 60);

    return (
        minutos +
        ":" +
        String(segundosRestantes).padStart(2, "0")
    );
}


// =========================================================
// PLAY / PAUSA - HOY
// =========================================================

playButton.addEventListener("click", function () {

    if (audioHoy.paused) {

        // Si Ayer está sonando, detenerlo
        audioAyer.pause();

        audioHoy.play();

    } else {

        audioHoy.pause();
    }

});


// =========================================================
// CAMBIAR ICONO PLAY / PAUSA
// =========================================================

audioHoy.addEventListener("play", function () {

    playIcon.textContent = "❚❚";

});


audioHoy.addEventListener("pause", function () {

    playIcon.textContent = "▶";

});


audioHoy.addEventListener("ended", function () {

    playIcon.textContent = "▶";

    progress.style.width = "0%";

    currentTime.textContent = "0:00";

});


// =========================================================
// DURACIÓN HOY
// =========================================================

audioHoy.addEventListener("loadedmetadata", function () {

    duration.textContent =
        formatoTiempo(audioHoy.duration);

    console.log(
        "Duración:",
        audioHoy.duration
    );

});


// =========================================================
// PROGRESO HOY
// =========================================================

audioHoy.addEventListener("timeupdate", function () {

    if (!audioHoy.duration) {
        return;
    }

    const porcentaje =
        (audioHoy.currentTime /
            audioHoy.duration) * 100;

    progress.style.width =
        porcentaje + "%";

    currentTime.textContent =
        formatoTiempo(audioHoy.currentTime);

});


// =========================================================
// BUSCAR POSICIÓN HOY
// =========================================================

progressBar.addEventListener("click", function (evento) {

    if (!audioHoy.duration) {
        return;
    }

    const rect =
        progressBar.getBoundingClientRect();

    const posicion =
        evento.clientX - rect.left;

    const porcentaje =
        posicion / rect.width;

    audioHoy.currentTime =
        porcentaje * audioHoy.duration;

});


// =========================================================
// RETROCEDER 10 SEGUNDOS
// =========================================================

rewindButton.addEventListener("click", function () {

    audioHoy.currentTime =
        Math.max(
            0,
            audioHoy.currentTime - 10
        );

});


// =========================================================
// AVANZAR 10 SEGUNDOS
// =========================================================

forwardButton.addEventListener("click", function () {

    audioHoy.currentTime =
        Math.min(
            audioHoy.duration || 0,
            audioHoy.currentTime + 10
        );

});


// =========================================================
// AUDIO DE AYER - PLAY / PAUSA
// =========================================================

yesterdayPlay.addEventListener("click", function () {

    if (audioAyer.paused) {

        // Si Hoy está sonando, detenerlo
        audioHoy.pause();

        audioAyer.play();

    } else {

        audioAyer.pause();
    }

});


// =========================================================
// AUDIO DE AYER - ICONO
// =========================================================

audioAyer.addEventListener("play", function () {

    yesterdayPlay.textContent = "❚❚";

});


audioAyer.addEventListener("pause", function () {

    yesterdayPlay.textContent = "▶";

});


audioAyer.addEventListener("ended", function () {

    yesterdayPlay.textContent = "▶";

    yesterdayProgress.style.width =
        "0%";

});


// =========================================================
// DURACIÓN DE AYER
// =========================================================

audioAyer.addEventListener("loadedmetadata", function () {

    yesterdayDuration.textContent =
        formatoTiempo(audioAyer.duration);

});


// =========================================================
// PROGRESO DE AYER
// =========================================================

audioAyer.addEventListener("timeupdate", function () {

    if (!audioAyer.duration) {
        return;
    }

    const porcentaje =
        (audioAyer.currentTime /
            audioAyer.duration) * 100;

    yesterdayProgress.style.width =
        porcentaje + "%";

    yesterdayDuration.textContent =
        formatoTiempo(audioAyer.currentTime);

});


// =========================================================
// BUSCAR POSICIÓN EN AUDIO DE AYER
// =========================================================

yesterdayProgressBar.addEventListener(
    "click",
    function (evento) {

        if (!audioAyer.duration) {
            return;
        }

        const rect =
            yesterdayProgressBar.getBoundingClientRect();

        const posicion =
            evento.clientX - rect.left;

        const porcentaje =
            posicion / rect.width;

        audioAyer.currentTime =
            porcentaje * audioAyer.duration;

    }
);


// =========================================================
// ERRORES - HOY
// =========================================================

audioHoy.addEventListener("error", function () {

    console.error(
        "Error al cargar el audio de hoy:",
        audioHoy.error
    );

});


// =========================================================
// ERRORES - AYER
// =========================================================

audioAyer.addEventListener("error", function () {

    console.error(
        "Error al cargar el audio de ayer:",
        audioAyer.error
    );

});


// =========================================================
// DESCARGA
// =========================================================

downloadButton.addEventListener("click", function () {

    console.log(
        "Descargando audio de hoy..."
    );

});


yesterdayDownload.addEventListener(
    "click",
    function () {

        console.log(
            "Descargando audio de ayer..."
        );

    }
);


// =========================================================
// VISUALIZADOR
// =========================================================

const barras =
    document.querySelectorAll(
        ".visualizer span"
    );


let visualizadorActivo = false;


function animarVisualizador() {

    if (!visualizadorActivo) {

        barras.forEach(function (barra) {

            barra.style.height = "8px";

        });

        return;
    }


    barras.forEach(function (barra) {

        const altura =
            Math.floor(
                Math.random() * 35
            ) + 8;

        barra.style.height =
            altura + "px";

    });


    requestAnimationFrame(
        function () {

            setTimeout(
                animarVisualizador,
                100
            );

        }
    );
}


// =========================================================
// ACTIVAR VISUALIZADOR
// =========================================================

audioHoy.addEventListener("play", function () {

    visualizadorActivo = true;

    animarVisualizador();

});


audioHoy.addEventListener("pause", function () {

    visualizadorActivo = false;

});


audioHoy.addEventListener("ended", function () {

    visualizadorActivo = false;

});


// =========================================================
// INICIO
// =========================================================

console.log(
    "UN DÍA MÁS: reproductor preparado."
);
