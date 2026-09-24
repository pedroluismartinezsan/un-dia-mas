const TOTAL_SECONDS = 15;

let remainingSeconds = TOTAL_SECONDS;

const secondsElement = document.getElementById("seconds");
const progressElement = document.querySelector(".loader-progress");

function updateLoading() {

  const elapsed = TOTAL_SECONDS - remainingSeconds;

  const progress = (elapsed / TOTAL_SECONDS) * 100;

  progressElement.style.width = `${progress}%`;

  secondsElement.textContent = remainingSeconds;

}

updateLoading();

const loadingTimer = setInterval(() => {

  remainingSeconds--;

  updateLoading();

  if (remainingSeconds <= 0) {

    clearInterval(loadingTimer);

    progressElement.style.width = "100%";

    secondsElement.textContent = "Listo";

    setTimeout(() => {

      showHome();

    }, 500);

  }

}, 1000);


/*
  Por ahora solamente mostramos
  un mensaje temporal.

  Después aquí cargaremos
  la pantalla principal de
  "Un día Más".
*/

function showHome() {

  document.querySelector(".welcome").innerHTML = `

    <div class="logo">
      <div class="logo-circle">
        <span>♪</span>
      </div>
    </div>

    <h1>Un día Más</h1>

    <p class="welcome-text">
      Tu mensaje está listo
    </p>

    <p class="subtitle">
      Muy pronto aquí podrás escuchar
      el mensaje de hoy.
    </p>

  `;

}
