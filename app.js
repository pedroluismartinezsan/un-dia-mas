```javascript
const TOTAL_TIME = 10000;

const splashScreen =
  document.getElementById("splashScreen");

const audioScreen =
  document.getElementById("audioScreen");

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


let startTime = null;
let finished = false;


/* =================================
   INICIO
================================= */

window.addEventListener("load", () => {

  // Estado inicial

  welcomePhase.style.opacity = "1";

  listeningPhase.style.opacity = "0";

  mist.classList.remove("active");

  udmLogo.style.opacity = "0";

  logoGlow.style.opacity = "0";


  startTime = performance.now();

  requestAnimationFrame(animationLoop);

});


/* =================================
   ANIMACIÓN
================================= */

function animationLoop(now) {

  const elapsed =
    now - startTime;

  const progress =
    Math.min(
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


/* =================================
   PROGRESO
================================= */

function updateProgress(progress) {

  progressBar.style.width =
    `${progress * 100}%`;


  const remaining =
    Math.ceil(
      10 - progress * 10
    );


  timer.textContent =
    remaining > 0
      ? remaining
      : "Listo";

}


/* =================================
   SECUENCIA CINEMATOGRÁFICA
================================= */

function animateSequence(progress) {


  /*
   * 0% - 25%
   *
   * BIENVENIDOS
   */

  if (progress < 0.25) {

    welcomePhase.style.opacity = "1";

    welcomePhase.style.transform =
      "scale(1) translateY(0)";

  }


  /*
   * 25% - 55%
   *
   * ESTÁS ESCUCHANDO
   * UN DÍA MÁS
   */

  if (
    progress >= 0.25 &&
    progress < 0.55
  ) {

    const p =
      (progress - 0.25) / 0.30;


    welcomePhase.style.opacity =
      `${1 - p}`;


    welcomePhase.style.transform =
      `
      scale(${1 - p * 0.12})
      translateY(${-15 * p}px)
      `;


    listeningPhase.style.opacity =
      `${p}`;


    listeningPhase.style.transform =
      `
      scale(${0.92 + p * 0.08})
      `;

  }


  /*
   * 55% - 72%
   *
   * COMIENZA LA NIEBLA
   */

  if (
    progress >= 0.55 &&
    progress < 0.72
  ) {

    const p =
      (progress - 0.55) / 0.17;


    listeningPhase.style.opacity =
      `${1 - p * 0.7}`;


    mist.classList.add("active");

  }


  /*
   * 72% - 88%
   *
   * APARECE UDM
   */

  if (
    progress >= 0.72 &&
    progress < 0.88
  ) {

    const p =
      (progress - 0.72) / 0.16;


    listeningPhase.style.opacity = "0";


    udmLogo.style.opacity =
      `${p}`;


    udmLogo.style.transform =
      `
      scale(${0.55 + p * 0.45})
      `;


    logoGlow.style.opacity =
      `${p * 0.8}`;

  }


  /*
   * 88% - 100%
   *
   * UDM SE CONSOLIDA
   */

  if (progress >= 0.88) {

    udmLogo.style.opacity = "1";

    udmLogo.style.transform =
      "scale(1.05)";


    logoGlow.style.opacity = "1";

    logoGlow.classList.add("active");

  }

}


/* =================================
   TERMINAR
================================= */

function finishIntro() {

  if (finished) return;

  finished = true;


  progressBar.style.width =
    "100%";

  timer.textContent =
    "Listo";


  loadingIndicator.style.opacity =
    "0";


  /*
   * Pequeña pausa para
   * apreciar el logo
   */

  setTimeout(() => {

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

    }, 1200);

  }, 700);

}
```
