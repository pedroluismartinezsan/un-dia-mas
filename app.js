/*******************************************************
 * UN DÍA MÁS
 * APP.JS
 *******************************************************/

const API_URL =
  "https://script.google.com/macros/s/AKfycbzTWEH36OvvvpLfSsa8HtUlvZWKCQ-cBEOrhyyCtH1My5xceHpNo_sVhotDDm8snukA/exec";


/* =====================================================
   ELEMENTOS
===================================================== */

const audioPlayer =
  document.getElementById("audioPlayer");

const playButton =
  document.getElementById("playButton");

const playIcon =
  document.getElementById("playIcon");

const rewindButton =
  document.getElementById("rewindButton");

const forwardButton =
  document.getElementById("forwardButton");

const progress =
  document.getElementById("progress");

const currentTime =
  document.getElementById("currentTime");

const duration =
  document.getElementById("duration");

const todayTitle =
  document.getElementById("todayTitle");

const todayDescription =
  document.getElementById("todayDescription");

const currentDate =
  document.getElementById("currentDate");

const downloadButton =
  document.getElementById("downloadButton");

const yesterdayDate =
  document.getElementById("yesterdayDate");

const yesterdayPlay =
  document.getElementById("yesterdayPlay");

const yesterdayTitle =
  document.getElementById("yesterdayTitle");

const yesterdayProgress =
  document.getElementById("yesterdayProgress");

const yesterdayDuration =
  document.getElementById("yesterdayDuration");

const yesterdayDownload =
  document.getElementById("yesterdayDownload");


/* =====================================================
   VARIABLES
===================================================== */

let datosHoy = null;
let datosAyer = null;

let audioHoyURL = "";
let audioAyerURL = "";

let audioAyer = null;

let reproduciendoHoy = false;
let reproduciendoAyer = false;


/* =====================================================
   INICIO
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  iniciarApp
);


async function iniciarApp() {

  console.log(
    "UN DÍA MÁS: iniciando aplicación..."
  );

  mostrarFechaActual();

  configurarControles();

  await cargarContenido();

  registrarServiceWorker();

}


/* =====================================================
   FECHA ACTUAL
===================================================== */

function mostrarFechaActual() {

  if (!currentDate) return;

  const ahora = new Date();

  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  let texto =
    ahora.toLocaleDateString(
      "es-CO",
      opciones
    );

  texto =
    texto.charAt(0).toUpperCase() +
    texto.slice(1);

  currentDate.textContent =
    texto;

}


/* =====================================================
   CARGAR CONTENIDO DESDE APPS SCRIPT
===================================================== */

async function cargarContenido() {

  console.log(
    "UN DÍA MÁS: consultando contenido..."
  );

  try {

    const respuesta =
      await fetch(
        API_URL,
        {
          method: "GET",
          cache: "no-store"
        }
      );


    if (!respuesta.ok) {

      throw new Error(
        "Error HTTP " +
        respuesta.status
      );

    }


    const datos =
      await respuesta.json();


    console.log(
      "UN DÍA MÁS: contenido recibido",
      datos
    );


    if (!datos.ok) {

      throw new Error(
        datos.mensaje ||
        "El servidor no respondió correctamente."
      );

    }


    datosHoy =
      datos.hoy || null;

    datosAyer =
      datos.ayer || null;


    cargarAudioHoy();

    cargarAudioAyer();


  } catch (error) {

    console.error(
      "UN DÍA MÁS: error cargando contenido:",
      error
    );


    mostrarErrorContenido();

  }

}


/* =====================================================
   AUDIO DE HOY
===================================================== */

function cargarAudioHoy() {

  console.log("VERSION NUEVA UN DIA MAS - 24 SEPT 2026");

  if (!datosHoy) {

    console.warn(
      "UN DÍA MÁS: no hay audio de hoy."
    );

    if (todayTitle) {
      todayTitle.textContent =
        "No hay audio disponible";
    }

    if (todayDescription) {
      todayDescription.textContent =
        "Vuelve a intentarlo más tarde.";
    }

    return;

  }


  /***************************************************
   * TÍTULO
   ***************************************************/
  if (todayTitle) {

    todayTitle.textContent =
      datosHoy.titulo ||
      "Audio de hoy";

  }


  /***************************************************
   * DESCRIPCIÓN
   ***************************************************/
  if (todayDescription) {

    todayDescription.textContent =
      "Un momento para ti. Escucha el mensaje de hoy.";

  }


  /***************************************************
   * URL
   *
   * IMPORTANTE:
   * Ya NO construimos la URL manualmente.
   * Utilizamos la URL enviada por Apps Script.
   ***************************************************/
  audioHoyURL =
    datosHoy.url ||
    "";

   console.log("URL REAL HOY:", datosHoy.url);
  console.log("URL REAL AYER:", datosAyer.url);


  console.log(
    "Audio de hoy:",
    audioHoyURL
  );


  if (!audioHoyURL) {

    console.warn(
      "UN DÍA MÁS: el audio de hoy no tiene URL."
    );

    return;

  }


  /***************************************************
   * CONFIGURAR AUDIO
   ***************************************************/
  audioPlayer.src =
    audioHoyURL;

  audioPlayer.preload =
    "metadata";


  /***************************************************
   * DESCARGA
   ***************************************************/
  if (downloadButton) {

    downloadButton.href =
      audioHoyURL;

    downloadButton.setAttribute(
      "download",
      "hoy.mp3"
    );

  }


  /***************************************************
   * REINICIAR ESTADO
   ***************************************************/
  audioPlayer.load();

}


/* =====================================================
   AUDIO DE AYER
===================================================== */

function cargarAudioAyer() {

  if (!datosAyer) {

    console.log(
      "UN DÍA MÁS: no existe audio de ayer."
    );

    if (yesterdayTitle) {

      yesterdayTitle.textContent =
        "No hay audio de ayer";

    }

    return;

  }


  /***************************************************
   * TÍTULO
   ***************************************************/
  if (yesterdayTitle) {

    yesterdayTitle.textContent =
      datosAyer.titulo ||
      "Audio de ayer";

  }


  /***************************************************
   * FECHA
   ***************************************************/
  if (yesterdayDate) {

    yesterdayDate.textContent =
      formatearFecha(
        datosAyer.fecha
      );

  }


  /***************************************************
   * URL
   ***************************************************/
  audioAyerURL =
    datosAyer.url ||
    "";
    console.log("URL REAL HOY:", datosHoy.url);
  console.log("URL REAL AYER:", datosAyer.url);

  console.log(
    "Audio de ayer:",
    audioAyerURL
  );


  /***************************************************
   * DESCARGA
   ***************************************************/
  if (
    yesterdayDownload &&
    audioAyerURL
  ) {

    yesterdayDownload.href =
      audioAyerURL;

    yesterdayDownload.setAttribute(
      "download",
      "ayer.mp3"
    );

  }


  /***************************************************
   * CREAR AUDIO DE AYER
   ***************************************************/
  if (audioAyerURL) {

    audioAyer =
      new Audio();

    audioAyer.src =
      audioAyerURL;

    audioAyer.preload =
      "metadata";


    audioAyer.addEventListener(
      "loadedmetadata",
      actualizarDuracionAyer
    );


    audioAyer.addEventListener(
      "timeupdate",
      actualizarProgresoAyer
    );


    audioAyer.addEventListener(
      "ended",
      finalizarAyer
    );


    audioAyer.addEventListener(
      "error",
      errorAudioAyer
    );

  }

}


/* =====================================================
   CONTROLES
===================================================== */

function configurarControles() {


  /* PLAY HOY */

  if (playButton) {

    playButton.addEventListener(
      "click",
      alternarAudioHoy
    );

  }


  /* ATRÁS */

  if (rewindButton) {

    rewindButton.addEventListener(
      "click",
      () => {

        if (!audioPlayer) return;

        audioPlayer.currentTime =
          Math.max(
            0,
            audioPlayer.currentTime - 15
          );

      }
    );

  }


  /* ADELANTE */

  if (forwardButton) {

    forwardButton.addEventListener(
      "click",
      () => {

        if (!audioPlayer) return;

        audioPlayer.currentTime =
          Math.min(
            audioPlayer.duration || 0,
            audioPlayer.currentTime + 15
          );

      }
    );

  }


  /* PROGRESO */

  if (progress) {

    progress.addEventListener(
      "input",
      () => {

        if (
          !audioPlayer.duration ||
          isNaN(audioPlayer.duration)
        ) {
          return;
        }

        audioPlayer.currentTime =
          (
            progress.value / 100
          ) *
          audioPlayer.duration;

      }
    );

  }


  /* METADATOS */

  audioPlayer.addEventListener(
    "loadedmetadata",
    () => {

      if (duration) {

        duration.textContent =
          formatearTiempo(
            audioPlayer.duration
          );

      }

    }
  );


  /* TIEMPO */

  audioPlayer.addEventListener(
    "timeupdate",
    actualizarProgresoHoy
  );


  /* FINAL */

  audioPlayer.addEventListener(
    "ended",
    finalizarHoy
  );


  /* ERROR */

  audioPlayer.addEventListener(
    "error",
    errorAudioHoy
  );


  /* AYER */

  if (yesterdayPlay) {

    yesterdayPlay.addEventListener(
      "click",
      alternarAudioAyer
    );

  }


  /* PROGRESO AYER */

  if (yesterdayProgress) {

    yesterdayProgress.addEventListener(
      "input",
      () => {

        if (
          !audioAyer ||
          !audioAyer.duration
        ) {
          return;
        }

        audioAyer.currentTime =
          (
            yesterdayProgress.value /
            100
          ) *
          audioAyer.duration;

      }
    );

  }

}


/* =====================================================
   PLAY / PAUSA HOY
===================================================== */

async function alternarAudioHoy() {

  if (!audioHoyURL) {

    console.warn(
      "No existe URL para el audio de hoy."
    );

    return;

  }


  /* Si estaba sonando ayer, detenerlo */

  if (
    audioAyer &&
    !audioAyer.paused
  ) {

    audioAyer.pause();

    reproduciendoAyer =
      false;

    actualizarBotonAyer(false);

  }


  if (audioPlayer.paused) {

    try {

      await audioPlayer.play();

      reproduciendoHoy =
        true;

      actualizarBotonHoy(true);

      activarVisualizador();

    } catch (error) {

      console.error(
        "No se pudo reproducir el audio:",
        error
      );

    }

  } else {

    audioPlayer.pause();

    reproduciendoHoy =
      false;

    actualizarBotonHoy(false);

    detenerVisualizador();

  }

}


/* =====================================================
   PLAY / PAUSA AYER
===================================================== */

async function alternarAudioAyer() {

  if (!audioAyerURL || !audioAyer) {

    console.warn(
      "No existe audio de ayer."
    );

    return;

  }


  /* Si está sonando HOY */

  if (
    audioPlayer &&
    !audioPlayer.paused
  ) {

    audioPlayer.pause();

    reproduciendoHoy =
      false;

    actualizarBotonHoy(false);

    detenerVisualizador();

  }


  if (audioAyer.paused) {

    try {

      await audioAyer.play();

      reproduciendoAyer =
        true;

      actualizarBotonAyer(true);

    } catch (error) {

      console.error(
        "No se pudo reproducir el audio de ayer:",
        error
      );

    }

  } else {

    audioAyer.pause();

    reproduciendoAyer =
      false;

    actualizarBotonAyer(false);

  }

}


/* =====================================================
   BOTÓN HOY
===================================================== */

function actualizarBotonHoy(
  reproduciendo
) {

  if (!playIcon) return;


  if (reproduciendo) {

    playIcon.textContent =
      "❚❚";

  } else {

    playIcon.textContent =
      "▶";

  }

}


/* =====================================================
   BOTÓN AYER
===================================================== */

function actualizarBotonAyer(
  reproduciendo
) {

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
   PROGRESO HOY
===================================================== */

function actualizarProgresoHoy() {

  if (
    !audioPlayer ||
    !audioPlayer.duration
  ) {
    return;
  }


  const porcentaje =
    (
      audioPlayer.currentTime /
      audioPlayer.duration
    ) * 100;


  if (progress) {

    progress.value =
      porcentaje;

  }


  if (currentTime) {

    currentTime.textContent =
      formatearTiempo(
        audioPlayer.currentTime
      );

  }

}


/* =====================================================
   PROGRESO AYER
===================================================== */

function actualizarProgresoAyer() {

  if (
    !audioAyer ||
    !audioAyer.duration
  ) {
    return;
  }


  const porcentaje =
    (
      audioAyer.currentTime /
      audioAyer.duration
    ) * 100;


  if (yesterdayProgress) {

    yesterdayProgress.value =
      porcentaje;

  }


  if (yesterdayDuration) {

    yesterdayDuration.textContent =
      formatearTiempo(
        audioAyer.currentTime
      ) +
      " / " +
      formatearTiempo(
        audioAyer.duration
      );

  }

}


/* =====================================================
   FINALIZAR HOY
===================================================== */

function finalizarHoy() {

  reproduciendoHoy =
    false;

  actualizarBotonHoy(false);

  detenerVisualizador();


  if (progress) {

    progress.value =
      100;

  }

}


/* =====================================================
   FINALIZAR AYER
===================================================== */

function finalizarAyer() {

  reproduciendoAyer =
    false;

  actualizarBotonAyer(false);


  if (yesterdayProgress) {

    yesterdayProgress.value =
      100;

  }

}


/* =====================================================
   ERROR AUDIO HOY
===================================================== */

function errorAudioHoy() {

  console.error(
    "UN DÍA MÁS: error reproduciendo audio de hoy.",
    audioPlayer.error
  );

}


/* =====================================================
   ERROR AUDIO AYER
===================================================== */

function errorAudioAyer() {

  console.error(
    "UN DÍA MÁS: error reproduciendo audio de ayer.",
    audioAyer
      ? audioAyer.error
      : null
  );

}


/* =====================================================
   VISUALIZADOR
===================================================== */

function activarVisualizador() {

  document.body.classList.add(
    "audio-playing"
  );

}


function detenerVisualizador() {

  document.body.classList.remove(
    "audio-playing"
  );

}


/* =====================================================
   FORMATEAR TIEMPO
===================================================== */

function formatearTiempo(segundos) {

  if (
    !segundos ||
    isNaN(segundos)
  ) {

    return "0:00";

  }


  segundos =
    Math.floor(segundos);


  const minutos =
    Math.floor(
      segundos / 60
    );


  const segundosRestantes =
    segundos % 60;


  return (
    minutos +
    ":" +
    String(
      segundosRestantes
    ).padStart(2, "0")
  );

}


/* =====================================================
   FORMATEAR FECHA
===================================================== */

function formatearFecha(
  fechaTexto
) {

  if (!fechaTexto) {

    return "";

  }


  try {

    const fecha =
      new Date(
        fechaTexto +
        "T12:00:00"
      );


    return fecha.toLocaleDateString(
      "es-CO",
      {
        weekday: "long",
        day: "numeric",
        month: "long"
      }
    );


  } catch (error) {

    return fechaTexto;

  }

}


/* =====================================================
   ERROR GENERAL
===================================================== */

function mostrarErrorContenido() {

  if (todayTitle) {

    todayTitle.textContent =
      "No pudimos cargar el audio";

  }


  if (todayDescription) {

    todayDescription.textContent =
      "Comprueba tu conexión e inténtalo nuevamente.";

  }

}


/* =====================================================
   SERVICE WORKER
===================================================== */

function registrarServiceWorker() {

  if (
    !("serviceWorker" in navigator)
  ) {

    console.warn(
      "Service Worker no disponible."
    );

    return;

  }


  navigator.serviceWorker
    .register("./sw.js")
    .then(
      registration => {

        console.log(
          "UN DÍA MÁS: Service Worker activo",
          registration
        );

      }
    )
    .catch(
      error => {

        console.error(
          "UN DÍA MÁS: error Service Worker:",
          error
        );

      }
    );

}


/* =====================================================
   ATAJOS DE TECLADO
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    /*
     * No interferir con campos de texto
     */

    const tag =
      document.activeElement
        ? document.activeElement.tagName
        : "";


    if (
      tag === "INPUT" ||
      tag === "TEXTAREA"
    ) {

      return;

    }


    /* ESPACIO = PLAY */

    if (
      event.code === "Space"
    ) {

      event.preventDefault();

      alternarAudioHoy();

    }


    /* FLECHA IZQUIERDA */

    if (
      event.code === "ArrowLeft"
    ) {

      if (audioPlayer) {

        audioPlayer.currentTime =
          Math.max(
            0,
            audioPlayer.currentTime - 15
          );

      }

    }


    /* FLECHA DERECHA */

    if (
      event.code === "ArrowRight"
    ) {

      if (audioPlayer) {

        audioPlayer.currentTime =
          Math.min(
            audioPlayer.duration || 0,
            audioPlayer.currentTime + 15
          );

      }

    }

  }
);

