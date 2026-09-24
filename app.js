/* =====================================================
   UN DÍA MÁS
   Animación de entrada - 15 segundos
===================================================== */

const TOTAL_TIME = 15000;

const splashScreen = document.getElementById("splashScreen");
const audioScreen = document.getElementById("audioScreen");

const welcomeText = document.getElementById("welcomeText");
const udmLogo = document.getElementById("udmLogo");
const logoGlow = document.getElementById("logoGlow");

const introMessage = document.getElementById("introMessage");
const enterButton = document.getElementById("enterButton");

const progressBar = document.getElementById("progressBar");
const timer = document.getElementById("timer");
const loadingIndicator = document.getElementById("loadingIndicator");

const letters = document.querySelectorAll(".letter");


/* =====================================================
   INICIO
===================================================== */

let startTime = performance.now();

function animationLoop(currentTime) {

  const elapsed = currentTime - startTime;

  const progress = Math.min(
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

requestAnimationFrame(animationLoop);


/* =====================================================
   BARRA DE PROGRESO
===================================================== */

function updateProgress(progress) {

  progressBar.style.width =
    `${progress * 100}%`;

  const remaining =
    Math.ceil(
      TOTAL_TIME / 1000 -
      progress * TOTAL_TIME / 1000
    );

  timer.textContent =
    remaining > 0
      ? remaining
      : "Listo";

}


/* =====================================================
   SECUENCIA DE ANIMACIÓN
===================================================== */

function animateSequence(progress) {

  /*
    0.00 - 0.30
    Aparece "Bienvenidos a Un Día Más"
  */

  if (progress < 0.30) {

    welcomeText.style.opacity = "1";

  }


  /*
    0.30 - 0.55
    Las letras empiezan a desaparecer
  */

  if (progress >= 0.30 && progress < 0.55) {

    const disappearanceProgress =
      (progress - 0.30) / 0.25;

    letters.forEach((letter, index) => {

      /*
        Dejamos U, D y M.
      */

      const character =
        letter.dataset.letter;

      const keep =
        character === "U" ||
        character === "D" ||
        character === "M";

      if (keep) {

        letter.style.opacity = "1";

      } else {

        const delay =
          index * 0.06;

        const local =
          Math.max(
            0,
            Math.min(
              1,
              (disappearanceProgress - delay) / 0.35
            )
          );

        letter.style.opacity =
          `${1 - local}`;

        letter.style.transform =
          `translateY(${-20 * local}px) scale(${1 - local * 0.15})`;

      }

    });

  }


  /*
    0.55 - 0.70
    UDM se separa del texto
  */

  if (progress >= 0.55 && progress < 0.70) {

    welcomeText.style.opacity = "0";

    welcomeText.style.transform =
      "scale(0.8) translateY(-20px)";

    udmLogo.style.opacity = "1";

    udmLogo.style.transform =
      "scale(1)";

  }


  /*
    0.70 - 0.82
    Las letras U D M se juntan
  */

  if (progress >= 0.70 && progress < 0.82) {

    const p =
      (progress - 0.70) / 0.12;

    udmLogo.style.opacity = "1";

    udmLogo.style.transform =
      `scale(${1 + p * 0.08})`;

    const u =
      document.querySelector(".udm-u");

    const d =
      document.querySelector(".udm-d");

    const m =
      document.querySelector(".udm-m");

    u.style.transform =
      `translateX(${30 - p * 30}px)`;

    d.style.transform =
      `translateX(0)`;

    m.style.transform =
      `translateX(${-30 + p * 30}px)`;

  }


  /*
    0.82 - 0.92
    Brillo
  */

  if (progress >= 0.82 && progress < 0.92) {

    logoGlow.style.opacity = "1";

    logoGlow.style.animation =
      "logoGlow 1.5s ease forwards";

    udmLogo.style.transform =
      "scale(1.08)";

  }


  /*
    0.92 - 1.00
    Preparar botón
  */

  if (progress >= 0.92) {

    udmLogo.style.transform =
      "scale(1)";

    introMessage.style.opacity = "1";

    introMessage.style.transform =
      "translateY(0)";

  }

}


/* =====================================================
   FINAL
===================================================== */

function finishIntro() {

  progressBar.style.width = "100%";

  timer.textContent = "Listo";

  loadingIndicator.style.opacity = "0";

  enterButton.style.opacity = "1";

  enterButton.style.transform =
    "translateY(0)";

  enterButton.style.pointerEvents =
    "auto";

}


/* =====================================================
   ENTRAR
===================================================== */

enterButton.addEventListener(
  "click",
  enterApplication
);


function enterApplication() {

  enterButton.style.transform =
    "scale(0.95)";

  setTimeout(() => {

    splashScreen.style.opacity = "0";

    splashScreen.style.transition =
      "opacity 0.8s ease";

    setTimeout(() => {

      splashScreen.style.display =
        "none";

      audioScreen.style.display =
        "block";

      window.scrollTo(0, 0);

    }, 800);

  }, 150);

}
