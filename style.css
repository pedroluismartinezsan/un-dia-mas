* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
}

body {
  font-family:
    "Segoe UI",
    Arial,
    Helvetica,
    sans-serif;

  background: #061426;
  color: white;
}


/* =====================================================
   PANTALLA DE INTRO
===================================================== */

.splash-screen {

  position: fixed;

  inset: 0;

  width: 100%;
  height: 100%;

  overflow: hidden;

  display: flex;

  align-items: center;
  justify-content: center;

  background:

    radial-gradient(
      circle at 50% 45%,
      #12365a 0%,
      #0a213c 35%,
      #061426 72%,
      #030b16 100%
    );

  z-index: 100;
}


/* =====================================================
   LUCES
===================================================== */

.ambient-light {

  position: absolute;

  border-radius: 50%;

  pointer-events: none;

  filter: blur(80px);

  opacity: 0.35;

}

.light-one {

  width: 350px;
  height: 350px;

  background: #176da5;

  top: -150px;
  left: -120px;

}

.light-two {

  width: 300px;
  height: 300px;

  background: #b48a32;

  right: -130px;
  bottom: -120px;

}


/* =====================================================
   ESTRELLAS / PARTÍCULAS
===================================================== */

.stars {

  position: absolute;

  inset: 0;

  pointer-events: none;

}

.stars span {

  position: absolute;

  width: 2px;
  height: 2px;

  border-radius: 50%;

  background: rgba(255,255,255,0.55);

  animation: twinkle 4s infinite ease-in-out;

}

.stars span:nth-child(1) {
  top: 18%;
  left: 12%;
}

.stars span:nth-child(2) {
  top: 28%;
  left: 82%;
}

.stars span:nth-child(3) {
  top: 72%;
  left: 18%;
}

.stars span:nth-child(4) {
  top: 80%;
  left: 75%;
}

.stars span:nth-child(5) {
  top: 15%;
  left: 55%;
}

.stars span:nth-child(6) {
  top: 62%;
  left: 90%;
}

.stars span:nth-child(7) {
  top: 45%;
  left: 7%;
}

.stars span:nth-child(8) {
  top: 90%;
  left: 48%;
}

.stars span:nth-child(9) {
  top: 35%;
  left: 70%;
}

.stars span:nth-child(10) {
  top: 65%;
  left: 55%;
}


/* =====================================================
   INTRO
===================================================== */

.intro {

  position: relative;

  z-index: 5;

  width: 100%;

  text-align: center;

  display: flex;

  flex-direction: column;

  align-items: center;

}


/* =====================================================
   TEXTO BIENVENIDOS
===================================================== */

.welcome-text {

  transition:
    opacity 1s ease,
    transform 1s ease;

}

.line {

  display: flex;

  justify-content: center;

  gap: 10px;

  margin-bottom: 16px;

  overflow: hidden;

}

.word {

  font-size: clamp(18px, 4vw, 25px);

  letter-spacing: 3px;

  font-weight: 300;

  color: rgba(255,255,255,0.72);

  animation: wordAppear 1.5s ease forwards;

}


/* =====================================================
   UN DÍA MÁS
===================================================== */

.main-title {

  display: flex;

  justify-content: center;

  align-items: center;

  white-space: nowrap;

}

.letter {

  display: inline-block;

  font-size: clamp(42px, 11vw, 78px);

  font-weight: 300;

  letter-spacing: 4px;

  color: white;

  opacity: 0;

  transform: translateY(30px);

  animation: letterAppear 0.8s ease forwards;

}

.letter:nth-child(1) {
  animation-delay: 0.2s;
}

.letter:nth-child(2) {
  animation-delay: 0.3s;
}

.letter:nth-child(4) {
  animation-delay: 0.4s;
}

.letter:nth-child(5) {
  animation-delay: 0.5s;
}

.letter:nth-child(6) {
  animation-delay: 0.6s;
}

.letter:nth-child(8) {
  animation-delay: 0.7s;
}

.letter:nth-child(9) {
  animation-delay: 0.8s;
}

.letter:nth-child(10) {
  animation-delay: 0.9s;
}


/* =====================================================
   LOGO UDM
===================================================== */

.udm-logo {

  position: absolute;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 0;

  opacity: 0;

  transform: scale(0.6);

  pointer-events: none;

}

.udm-letter {

  display: inline-block;

  font-size: clamp(70px, 17vw, 125px);

  font-weight: 500;

  line-height: 1;

  color: white;

  text-shadow:

    0 0 12px rgba(255,255,255,0.25),

    0 0 35px rgba(116,190,235,0.25);

  transition:

    transform 1.5s cubic-bezier(.2,.8,.2,1),

    color 1s ease;

}


/* =====================================================
   BRILLO
===================================================== */

.logo-glow {

  position: absolute;

  width: 10px;
  height: 10px;

  border-radius: 50%;

  background: #e1b85b;

  opacity: 0;

  box-shadow:

    0 0 15px #e1b85b,

    0 0 40px #e1b85b,

    0 0 80px rgba(225,184,91,0.6),

    0 0 140px rgba(225,184,91,0.35);

  pointer-events: none;

}


/* =====================================================
   MENSAJE
===================================================== */

.intro-message {

  position: absolute;

  top: calc(50% + 125px);

  width: 90%;

  max-width: 450px;

  font-size: 14px;

  letter-spacing: 1.5px;

  line-height: 1.6;

  color: rgba(255,255,255,0.55);

  opacity: 0;

  transform: translateY(15px);

  transition:

    opacity 1s ease,

    transform 1s ease;

}


/* =====================================================
   BOTÓN
===================================================== */

.enter-button {

  position: absolute;

  top: calc(50% + 180px);

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 12px;

  min-width: 150px;

  padding: 14px 25px;

  border-radius: 50px;

  border: 1px solid rgba(225,184,91,0.5);

  background: rgba(255,255,255,0.05);

  color: white;

  font-size: 15px;

  letter-spacing: 2px;

  cursor: pointer;

  opacity: 0;

  transform: translateY(20px);

  pointer-events: none;

  backdrop-filter: blur(15px);

  box-shadow:

    0 0 25px rgba(225,184,91,0.08);

  transition:

    opacity 1s ease,

    transform 1s ease,

    background 0.3s ease,

    box-shadow 0.3s ease;

}

.enter-button:hover {

  background: rgba(225,184,91,0.12);

  box-shadow:

    0 0 30px rgba(225,184,91,0.2);

}

.enter-button .arrow {

  font-size: 20px;

  transition: transform 0.3s ease;

}

.enter-button:hover .arrow {

  transform: translateX(5px);

}


/* =====================================================
   INDICADOR
===================================================== */

.loading-indicator {

  position: absolute;

  z-index: 10;

  bottom: 65px;

  width: min(75%, 330px);

  transition: opacity 0.8s ease;

}

.progress-track {

  width: 100%;

  height: 2px;

  overflow: hidden;

  background: rgba(255,255,255,0.12);

  border-radius: 5px;

}

.progress-bar {

  width: 0%;

  height: 100%;

  background: linear-gradient(
    90deg,
    #6ea9cf,
    #e1b85b
  );

  box-shadow:

    0 0 12px rgba(225,184,91,0.5);

}

.loading-info {

  display: flex;

  justify-content: space-between;

  margin-top: 10px;

  font-size: 10px;

  letter-spacing: 1.5px;

  color: rgba(255,255,255,0.35);

}


/* =====================================================
   FOOTER
===================================================== */

footer {

  position: absolute;

  bottom: 20px;

  left: 0;

  right: 0;

  text-align: center;

  font-size: 9px;

  letter-spacing: 4px;

  color: rgba(255,255,255,0.18);

}


/* =====================================================
   PANTALLA DE AUDIOS
===================================================== */

.audio-screen {

  display: none;

  min-height: 100vh;

  padding: 25px 18px 50px;

  background:

    radial-gradient(
      circle at 50% 0%,
      #12365a,
      #07182b 40%,
      #04101e 100%
    );

}


/* Header */

.audio-header {

  max-width: 600px;

  margin: 0 auto 35px;

  display: flex;

  align-items: center;

  gap: 15px;

}

.mini-logo {

  width: 50px;
  height: 50px;

  border-radius: 16px;

  display: flex;

  align-items: center;
  justify-content: center;

  border: 1px solid rgba(225,184,91,0.4);

  color: #e1b85b;

  font-size: 13px;

  letter-spacing: 2px;

  background: rgba(255,255,255,0.05);

}

.audio-header h1 {

  font-size: 23px;

  font-weight: 400;

}

.audio-header p {

  margin-top: 3px;

  font-size: 12px;

  color: rgba(255,255,255,0.45);

}


/* Tarjeta */

.today-card {

  position: relative;

  max-width: 600px;

  margin: auto;

  padding: 35px 25px;

  text-align: center;

  border-radius: 28px;

  border: 1px solid rgba(255,255,255,0.08);

  background: rgba(255,255,255,0.05);

  backdrop-filter: blur(20px);

  box-shadow:

    0 20px 60px rgba(0,0,0,0.25);

}

.audio-icon {

  width: 70px;
  height: 70px;

  margin: 0 auto 20px;

  border-radius: 50%;

  display: flex;

  align-items: center;
  justify-content: center;

  font-size: 30px;

  color: #e1b85b;

  border: 1px solid rgba(225,184,91,0.35);

  background: rgba(225,184,91,0.06);

}

.today-label {

  font-size: 10px;

  letter-spacing: 3px;

  color: #e1b85b;

}

.today-card h2 {

  margin-top: 12px;

  font-size: 28px;

  font-weight: 400;

}

.today-card > p {

  margin-top: 8px;

  color: rgba(255,255,255,0.48);

  font-size: 13px;

}


/* Player */

.player {

  margin-top: 30px;

}

.time-row {

  display: flex;

  justify-content: space-between;

  font-size: 10px;

  color: rgba(255,255,255,0.35);

}

.audio-progress {

  height: 3px;

  margin-top: 8px;

  border-radius: 10px;

  background: rgba(255,255,255,0.12);

}

.audio-progress div {

  width: 25%;

  height: 100%;

  border-radius: 10px;

  background: #e1b85b;

}

.play-button {

  width: 65px;
  height: 65px;

  margin-top: 25px;

  border: none;

  border-radius: 50%;

  cursor: pointer;

  color: #061426;

  background: #e1b85b;

  font-size: 20px;

  box-shadow:

    0 0 30px rgba(225,184,91,0.18);

}


/* =====================================================
   MENSAJES RECIENTES
===================================================== */

.recent-section {

  max-width: 600px;

  margin: 35px auto 0;

}

.section-title h2 {

  font-size: 18px;

  font-weight: 400;

  margin-bottom: 15px;

}

.audio-list {

  display: flex;

  flex-direction: column;

  gap: 10px;

}

.audio-item {

  display: flex;

  align-items: center;

  gap: 15px;

  padding: 14px;

  border-radius: 18px;

  background: rgba(255,255,255,0.04);

  border: 1px solid rgba(255,255,255,0.05);

}

.date-box {

  min-width: 52px;

  text-align: center;

  padding: 6px;

  border-radius: 12px;

  background: rgba(255,255,255,0.05);

}

.date-box strong {

  display: block;

  font-size: 8px;

  color: #e1b85b;

}

.date-box span {

  display: block;

  margin-top: 2px;

  font-size: 17px;

}

.audio-info {

  flex: 1;

}

.audio-info strong {

  display: block;

  font-size: 14px;

  font-weight: 400;

}

.audio-info span {

  display: block;

  margin-top: 4px;

  font-size: 11px;

  color: rgba(255,255,255,0.35);

}

.small-play {

  width: 38px;
  height: 38px;

  border: 1px solid rgba(225,184,91,0.3);

  border-radius: 50%;

  background: transparent;

  color: #e1b85b;

  cursor: pointer;

}


/* =====================================================
   ANIMACIONES
===================================================== */

@keyframes wordAppear {

  from {

    opacity: 0;

    transform: translateY(20px);

  }

  to {

    opacity: 1;

    transform: translateY(0);

  }

}

@keyframes letterAppear {

  from {

    opacity: 0;

    transform: translateY(30px);

  }

  to {

    opacity: 1;

    transform: translateY(0);

  }

}

@keyframes twinkle {

  0%,
  100% {

    opacity: 0.2;

  }

  50% {

    opacity: 1;

  }

}

@keyframes logoGlow {

  0% {

    transform: scale(1);

    opacity: 0.4;

  }

  50% {

    transform: scale(7);

    opacity: 0.15;

  }

  100% {

    transform: scale(1);

    opacity: 0;

  }

}


/* =====================================================
   MÓVILES
===================================================== */

@media (max-width: 600px) {

  .welcome-text {

    transform: scale(0.92);

  }

  .letter {

    font-size: clamp(35px, 11vw, 58px);

    letter-spacing: 2px;

  }

  .udm-letter {

    font-size: clamp(65px, 19vw, 105px);

  }

  .intro-message {

    top: calc(50% + 110px);

    font-size: 13px;

  }

  .enter-button {

    top: calc(50% + 165px);

  }

  .loading-indicator {

    bottom: 55px;

  }

}
