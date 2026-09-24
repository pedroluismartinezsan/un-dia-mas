/*******************************************************
 * UN DÍA MÁS
 * APP.JS
 * Conexión con Google Apps Script + Google Drive
 *******************************************************/

const API_URL =
  "https://script.google.com/macros/s/AKfycbzTWEH36OvvvpLfSsa8HtUlvZWKCQ-cBEOrhyyCtH1My5xceHpNo_sVhotDDm8snukA/exec";


/* =====================================================
   ELEMENTOS
===================================================== */

const audioPlayer = document.getElementById("audioPlayer");

const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");

const rewindButton = document.getElementById("rewindButton");
const forwardButton = document.getElementById("forwardButton");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const todayTitle = document.getElementById("todayTitle");
const todayDescription = document.getElementById("todayDescription");

const yesterdayDate = document.getElementById("yesterdayDate");
const yesterdayTitle = document.getElementById("yesterdayTitle");
const yesterdayPlay = document.getElementById("yesterdayPlay");
const yesterdayProgress = document.getElementById("yesterdayProgress");
const yesterdayDuration = document.getElementById("yesterdayDuration");
const yesterdayDownload = document.getElementById("yesterdayDownload");

const downloadButton = document.getElementById("downloadButton");

const currentDate = document.getElementById("currentDate");


/* =====================================================
   VARIABLES
===================================================== */

let datosHoy = null;
let datosAyer = null;

let yesterdayAudio = new Audio();

let yesterdayPlaying = false;


/* =====================================================
   FECHA ACTUAL
===================================================== */

function mostrarFechaActual() {

    if (!currentDate) return;

    const ahora = new Date();

    const fecha = ahora.toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    currentDate.textContent =
        fecha.charAt(0).toUpperCase() + fecha.slice(1);
}


/* =====================================================
   FORMATO DE TIEMPO
===================================================== */

function formatoTiempo(segundos) {

    if (!Number.isFinite(segundos)) {
        return "0:00";
    }

    const minutos = Math.floor(segundos / 60);

    const segundosRestantes =
        Math.floor(segundos % 60)
        .toString()
        .padStart(2, "0");

    return `${minutos}:${segundosRestantes}`;
}


/* =====================================================
   URL DEL AUDIO EN GOOGLE DRIVE
===================================================== */

function obtenerUrlAudio(fileId) {

    if (!fileId) return "";

    return `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
}

/* =====================================================
   CARGAR INFORMACIÓN DESDE APPS SCRIPT
===================================================== */

async function cargarContenido() {

    try {

        console.log("UN DÍA MÁS: consultando contenido...");

        const respuesta = await fetch(API_URL, {
            method: "GET",
            cache: "no-store"
        });

        if (!respuesta.ok) {
            throw new Error(
                `Error HTTP ${respuesta.status}`
            );
        }

        const datos = await respuesta.json();

        console.log(
            "UN DÍA MÁS: contenido recibido",
            datos
        );

        if (!datos.ok) {
            throw new Error(
                datos.mensaje || "No se pudo cargar el contenido."
            );
        }

        datosHoy = datos.hoy;
        datosAyer = datos.ayer;

        cargarAudioHoy();
        cargarAudioAyer();

    } catch (error) {

        console.error(
            "UN DÍA MÁS: error cargando contenido",
            error
        );

        mostrarErrorContenido();
    }
}


/* =====================================================
   CARGAR AUDIO DE HOY
===================================================== */

function cargarAudioHoy() {

    if (!datosHoy) {

        todayTitle.textContent =
            "Todavía no hay un audio publicado.";

        if (todayDescription) {
            todayDescription.textContent =
                "Regresa pronto para escuchar el mensaje de hoy.";
        }

        return;
    }

    const urlAudio =
        obtenerUrlAudio(datosHoy.archivo);

    todayTitle.textContent =
        datosHoy.titulo || "Audio de hoy";

    if (todayDescription) {
        todayDescription.textContent =
            "Un momento para ti.";
    }

    audioPlayer.src = urlAudio;

    audioPlayer.load();

    if (downloadButton) {

        downloadButton.href = urlAudio;

        downloadButton.setAttribute(
            "download",
            `${datosHoy.titulo || "un-dia-mas"}.mp3`
        );

        downloadButton.style.display = "";
    }

    console.log(
        "Audio de hoy:",
        urlAudio
    );
}


/* =====================================================
   CARGAR AUDIO DE AYER
===================================================== */

function cargarAudioAyer() {

    if (!datosAyer) {

        yesterdayTitle.textContent =
            "No hay audio de ayer.";

        if (yesterdayDate) {
            yesterdayDate.textContent =
                "Aún no disponible";
        }

        if (yesterdayPlay) {
            yesterdayPlay.disabled = true;
            yesterdayPlay.style.opacity = "0.5";
        }

        return;
    }

    const urlAudio =
        obtenerUrlAudio(datosAyer.archivo);

    yesterdayTitle.textContent =
        datosAyer.titulo || "Audio de ayer";

    if (yesterdayDate) {

        yesterdayDate.textContent =
            formatearFecha(datosAyer.fecha);
    }

    yesterdayAudio.src = urlAudio;

    yesterdayAudio.load();

    if (yesterdayDownload) {

        yesterdayDownload.href = urlAudio;

        yesterdayDownload.setAttribute(
            "download",
            `${datosAyer.titulo || "un-dia-mas-ayer"}.mp3`
        );

        yesterdayDownload.style.display = "";
    }

    console.log(
        "Audio de ayer:",
        urlAudio
    );
}


/* =====================================================
   FORMATEAR FECHA
===================================================== */

function formatearFecha(fechaTexto) {

    if (!fechaTexto) {
        return "";
    }

    const fecha = new Date(
        `${fechaTexto}T12:00:00`
    );

    if (isNaN(fecha.getTime())) {
        return fechaTexto;
    }

    return fecha.toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });
}


/* =====================================================
   PLAY / PAUSE HOY
===================================================== */

if (playButton) {

    playButton.addEventListener(
        "click",
        async () => {

            if (audioPlayer.paused) {

                try {

                    detenerAyer();

                    await audioPlayer.play();

                    actualizarIconoPlay(true);

                } catch (error) {

                    console.error(
                        "No se pudo reproducir el audio:",
                        error
                    );
                }

            } else {

                audioPlayer.pause();

                actualizarIconoPlay(false);
            }
        }
    );
}


/* =====================================================
   ICONO PLAY / PAUSE
===================================================== */

function actualizarIconoPlay(reproduciendo) {

    if (!playIcon) return;

    if (reproduciendo) {

        playIcon.textContent = "❚❚";

    } else {

        playIcon.textContent = "▶";
    }
}


/* =====================================================
   AUDIO TERMINADO
===================================================== */

audioPlayer.addEventListener(
    "ended",
    () => {

        actualizarIconoPlay(false);

        audioPlayer.currentTime = 0;

        if (progress) {
            progress.value = 0;
        }
    }
);


/* =====================================================
   PROGRESO HOY
===================================================== */

audioPlayer.addEventListener(
    "timeupdate",
    () => {

        if (!audioPlayer.duration) return;

        const porcentaje =
            (audioPlayer.currentTime /
                audioPlayer.duration) * 100;

        if (progress) {
            progress.value = porcentaje;
        }

        if (currentTime) {
            currentTime.textContent =
                formatoTiempo(
                    audioPlayer.currentTime
                );
        }
    }
);


/* =====================================================
   DURACIÓN HOY
===================================================== */

audioPlayer.addEventListener(
    "loadedmetadata",
    () => {

        if (duration) {

            duration.textContent =
                formatoTiempo(
                    audioPlayer.duration
                );
        }
    }
);


/* =====================================================
   BARRA DE PROGRESO
===================================================== */

if (progress) {

    progress.addEventListener(
        "input",
        () => {

            if (!audioPlayer.duration) return;

            audioPlayer.currentTime =
                (progress.value / 100) *
                audioPlayer.duration;
        }
    );
}


/* =====================================================
   RETROCEDER 10 SEGUNDOS
===================================================== */

if (rewindButton) {

    rewindButton.addEventListener(
        "click",
        () => {

            audioPlayer.currentTime =
                Math.max(
                    0,
                    audioPlayer.currentTime - 10
                );
        }
    );
}


/* =====================================================
   AVANZAR 10 SEGUNDOS
===================================================== */

if (forwardButton) {

    forwardButton.addEventListener(
        "click",
        () => {

            if (!audioPlayer.duration) return;

            audioPlayer.currentTime =
                Math.min(
                    audioPlayer.duration,
                    audioPlayer.currentTime + 10
                );
        }
    );
}


/* =====================================================
   AUDIO DE AYER — PLAY / PAUSE
===================================================== */

if (yesterdayPlay) {

    yesterdayPlay.addEventListener(
        "click",
        async () => {

            if (yesterdayAudio.paused) {

                try {

                    detenerHoy();

                    await yesterdayAudio.play();

                    yesterdayPlaying = true;

                    actualizarBotonAyer(true);

                } catch (error) {

                    console.error(
                        "No se pudo reproducir el audio de ayer:",
                        error
                    );
                }

            } else {

                yesterdayAudio.pause();

                yesterdayPlaying = false;

                actualizarBotonAyer(false);
            }
        }
    );
}


/* =====================================================
   BOTÓN AYER
===================================================== */

function actualizarBotonAyer(reproduciendo) {

    if (!yesterdayPlay) return;

    if (reproduciendo) {

        yesterdayPlay.textContent =
            "❚❚";

    } else {

        yesterdayPlay.textContent =
            "▶";
    }
}


/* =====================================================
   PROGRESO AYER
===================================================== */

yesterdayAudio.addEventListener(
    "timeupdate",
    () => {

        if (!yesterdayAudio.duration) return;

        const porcentaje =
            (yesterdayAudio.currentTime /
                yesterdayAudio.duration) * 100;

        if (yesterdayProgress) {
            yesterdayProgress.value =
                porcentaje;
        }

        if (yesterdayDuration) {

            yesterdayDuration.textContent =
                `${formatoTiempo(
                    yesterdayAudio.currentTime
                )} / ${formatoTiempo(
                    yesterdayAudio.duration
                )}`;
        }
    }
);


/* =====================================================
   AYER TERMINADO
===================================================== */

yesterdayAudio.addEventListener(
    "ended",
    () => {

        yesterdayPlaying = false;

        actualizarBotonAyer(false);

        if (yesterdayProgress) {
            yesterdayProgress.value = 0;
        }
    }
);


/* =====================================================
   BARRA AYER
===================================================== */

if (yesterdayProgress) {

    yesterdayProgress.addEventListener(
        "input",
        () => {

            if (!yesterdayAudio.duration) return;

            yesterdayAudio.currentTime =
                (yesterdayProgress.value / 100) *
                yesterdayAudio.duration;
        }
    );
}


/* =====================================================
   DETENER HOY
===================================================== */

function detenerHoy() {

    if (!audioPlayer.paused) {

        audioPlayer.pause();

        actualizarIconoPlay(false);
    }
}


/* =====================================================
   DETENER AYER
===================================================== */

function detenerAyer() {

    if (!yesterdayAudio.paused) {

        yesterdayAudio.pause();

        yesterdayPlaying = false;

        actualizarBotonAyer(false);
    }
}


/* =====================================================
   ERROR DE CONTENIDO
===================================================== */

function mostrarErrorContenido() {

    if (todayTitle) {

        todayTitle.textContent =
            "No se pudo cargar el audio.";
    }

    if (todayDescription) {

        todayDescription.textContent =
            "Verifica tu conexión e inténtalo nuevamente.";
    }
}


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        // Evitar interferir cuando se está escribiendo
        if (
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA"
        ) {
            return;
        }

        // ESPACIO = Play / Pause
        if (event.code === "Space") {

            event.preventDefault();

            if (audioPlayer.paused) {

                detenerAyer();

                audioPlayer.play()
                    .then(() => {
                        actualizarIconoPlay(true);
                    })
                    .catch(() => {});

            } else {

                audioPlayer.pause();

                actualizarIconoPlay(false);
            }
        }

        // Flecha izquierda = -10 segundos
        if (event.code === "ArrowLeft") {

            audioPlayer.currentTime =
                Math.max(
                    0,
                    audioPlayer.currentTime - 10
                );
        }

        // Flecha derecha = +10 segundos
        if (event.code === "ArrowRight") {

            if (audioPlayer.duration) {

                audioPlayer.currentTime =
                    Math.min(
                        audioPlayer.duration,
                        audioPlayer.currentTime + 10
                    );
            }
        }
    }
);


/* =====================================================
   SERVICE WORKER
===================================================== */

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("./sw.js")
                .then(() => {

                    console.log(
                        "UN DÍA MÁS: Service Worker activo"
                    );
                })
                .catch(error => {

                    console.error(
                        "Error del Service Worker:",
                        error
                    );
                });
        }
    );
}


/* =====================================================
   INICIO
===================================================== */

mostrarFechaActual();

cargarContenido();
