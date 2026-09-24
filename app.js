/* =========================================================
   UN DÍA MÁS
   FUTURE AUDIO INTERFACE
   Azul oscuro + azul eléctrico + dorado
   ========================================================= */

:root {
    --bg-1: #020711;
    --bg-2: #061225;
    --bg-3: #091a31;

    --panel: rgba(7, 19, 38, 0.78);
    --panel-light: rgba(14, 34, 62, 0.62);

    --blue: #1677ff;
    --blue-light: #55aaff;
    --blue-soft: rgba(22, 119, 255, 0.25);

    --gold: #d9b45c;
    --gold-light: #ffe6a0;
    --gold-soft: rgba(217, 180, 92, 0.25);

    --white: #f4f8ff;
    --text: #d8e5f5;
    --muted: #7890ad;

    --line: rgba(102, 156, 214, 0.16);
    --line-gold: rgba(217, 180, 92, 0.28);
}


/* =========================================================
   RESET
   ========================================================= */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}


html {
    min-height: 100%;
    scroll-behavior: smooth;
}


body {
    min-height: 100vh;

    font-family:
        Arial,
        Helvetica,
        sans-serif;

    color: var(--text);

    overflow-x: hidden;

    background:
        radial-gradient(
            circle at 50% -15%,
            rgba(24, 91, 170, 0.30),
            transparent 40%
        ),

        radial-gradient(
            circle at 0% 45%,
            rgba(16, 96, 210, 0.12),
            transparent 32%
        ),

        radial-gradient(
            circle at 100% 80%,
            rgba(217, 180, 92, 0.07),
            transparent 30%
        ),

        linear-gradient(
            145deg,
            var(--bg-1),
            var(--bg-2) 48%,
            var(--bg-3)
        );
}


/* =========================================================
   RED TECNOLÓGICA DE FONDO
   ========================================================= */

body::before {
    content: "";

    position: fixed;

    inset: 0;

    pointer-events: none;

    opacity: 0.32;

    background-image:
        linear-gradient(
            rgba(67, 133, 210, 0.035) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(67, 133, 210, 0.035) 1px,
            transparent 1px
        );

    background-size:
        55px 55px;

    mask-image:
        linear-gradient(
            to bottom,
            black,
            transparent 85%
        );

    -webkit-mask-image:
        linear-gradient(
            to bottom,
            black,
            transparent 85%
        );

    z-index: -3;
}


/* =========================================================
   HALO CENTRAL
   ========================================================= */

body::after {
    content: "";

    position: fixed;

    width: 600px;
    height: 600px;

    left: 50%;
    top: 38%;

    transform: translate(-50%, -50%);

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(16, 91, 190, 0.10),
            rgba(16, 91, 190, 0.035) 40%,
            transparent 70%
        );

    filter: blur(20px);

    pointer-events: none;

    z-index: -2;

    animation:
        ambientGlow 8s ease-in-out infinite;
}


@keyframes ambientGlow {

    0%,
    100% {
        opacity: 0.65;

        transform:
            translate(-50%, -50%)
            scale(0.95);
    }

    50% {
        opacity: 1;

        transform:
            translate(-50%, -50%)
            scale(1.08);
    }
}


/* =========================================================
   APP
   ========================================================= */

.app {
    width: 100%;

    max-width: 720px;

    margin: 0 auto;

    padding:
        25px
        18px
        40px;
}


/* =========================================================
   HEADER
   ========================================================= */

header {
    text-align: center;

    padding:
        10px
        0
        30px;
}


.brand {
    position: relative;

    display: inline-block;

    font-size: 31px;

    font-weight: 800;

    letter-spacing: 6px;

    color: var(--white);

    text-shadow:
        0 0 8px rgba(85, 170, 255, 0.20),
        0 0 25px rgba(85, 170, 255, 0.10);

    margin-bottom: 8px;
}


/* pequeña línea tecnológica */

.brand::after {
    content: "";

    display: block;

    width: 55px;

    height: 2px;

    margin:
        9px auto
        0;

    border-radius: 10px;

    background:
        linear-gradient(
            90deg,
            transparent,
            var(--gold),
            transparent
        );

    box-shadow:
        0 0 12px rgba(217, 180, 92, 0.5);
}


.subtitle {
    font-size: 13px;

    color: var(--muted);

    letter-spacing: 2px;
}


#currentDate {
    margin-top: 13px;

    color: var(--gold-light);

    font-size: 11px;

    letter-spacing: 2px;

    text-transform: uppercase;
}


/* =========================================================
   PANEL PRINCIPAL
   ========================================================= */

.today-card,
.yesterday-card {

    position: relative;

    overflow: hidden;

    background:
        linear-gradient(
            145deg,
            rgba(13, 34, 63, 0.84),
            rgba(3, 12, 25, 0.91)
        );

    border:
        1px solid var(--line);

    backdrop-filter:
        blur(20px);

    -webkit-backdrop-filter:
        blur(20px);

    box-shadow:
        0 25px 70px rgba(0, 0, 0, 0.48),
        inset 0 1px 0 rgba(255,255,255,0.035);
}


/* =========================================================
   BORDE TECNOLÓGICO
   ========================================================= */

.today-card::before,
.yesterday-card::before {

    content: "";

    position: absolute;

    inset: 0;

    border-radius: inherit;

    padding: 1px;

    background:
        linear-gradient(
            125deg,
            transparent 15%,
            rgba(85, 170, 255, 0.20),
            transparent 35%,
            transparent 65%,
            rgba(217, 180, 92, 0.20),
            transparent 85%
        );

    -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);

    -webkit-mask-composite: xor;

    mask-composite: exclude;

    pointer-events: none;
}


/* =========================================================
   REFLEJO SUPERIOR
   ========================================================= */

.today-card::after,
.yesterday-card::after {

    content: "";

    position: absolute;

    top: -120px;

    left: 10%;

    width: 80%;

    height: 180px;

    background:
        radial-gradient(
            ellipse,
            rgba(50, 132, 235, 0.11),
            transparent 70%
        );

    filter: blur(18px);

    pointer-events: none;
}


/* =========================================================
   CARD HOY
   ========================================================= */

.today-card {

    padding:
        28px
        24px
        25px;

    border-radius: 25px;

    border-color:
        rgba(85, 170, 255, 0.20);

    animation:
        panelEnter 0.7s ease both;
}


@keyframes panelEnter {

    from {
        opacity: 0;

        transform:
            translateY(18px)
            scale(0.985);
    }

    to {
        opacity: 1;

        transform:
            translateY(0)
            scale(1);
    }
}


/* =========================================================
   LABEL
   ========================================================= */

.label {

    position: relative;

    z-index: 2;

    display: flex;

    align-items: center;

    gap: 10px;

    color: var(--gold-light);

    font-size: 10px;

    font-weight: 700;

    letter-spacing: 2.5px;

    margin-bottom: 20px;
}


.label::before {

    content: "";

    width: 7px;
    height: 7px;

    flex-shrink: 0;

    border-radius: 50%;

    background: var(--gold);

    box-shadow:
        0 0 7px var(--gold),
        0 0 17px rgba(217,180,92,0.6);

    animation:
        signalPulse 2s ease-in-out infinite;
}


@keyframes signalPulse {

    0%,
    100% {
        transform: scale(0.75);

        opacity: 0.55;
    }

    50% {
        transform: scale(1.15);

        opacity: 1;
    }
}


/* =========================================================
   TITULO
   ========================================================= */

#todayTitle {

    position: relative;

    z-index: 2;

    color: var(--white);

    font-size: 26px;

    font-weight: 700;

    line-height: 1.25;

    letter-spacing: 0.2px;

    margin-bottom: 10px;

    text-shadow:
        0 0 20px rgba(85,170,255,0.08);
}


#todayDescription {

    position: relative;

    z-index: 2;

    color: var(--muted);

    font-size: 14px;

    line-height: 1.65;

    max-width: 580px;

    margin-bottom: 25px;
}


/* =========================================================
   VISUALIZADOR
   ========================================================= */

.visualizer {

    position: relative;

    z-index: 2;

    height: 58px;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 4px;

    margin:
        2px
        0
        20px;
}


.visualizer span {

    width: 3px;

    min-height: 8px;

    border-radius: 10px;

    background:
        linear-gradient(
            to top,
            var(--blue),
            var(--gold-light)
        );

    opacity: 0.65;

    box-shadow:
        0 0 7px rgba(47,137,255,0.28);

    transform-origin: center;

    transition:
        height 0.15s ease,
        opacity 0.15s ease;
}


/* =========================================================
   BARRA DE PROGRESO
   ========================================================= */

.progress-bar {

    position: relative;

    z-index: 3;

    width: 100%;

    height: 5px;

    border-radius: 20px;

    background:
        rgba(255,255,255,0.055);

    border:
        1px solid rgba(255,255,255,0.025);

    cursor: pointer;

    overflow: visible;

    margin-bottom: 9px;
}


.progress {

    position: relative;

    width: 0%;

    height: 100%;

    border-radius: inherit;

    background:
        linear-gradient(
            90deg,
            var(--blue),
            var(--gold-light)
        );

    box-shadow:
        0 0 8px rgba(44,139,255,0.55),
        0 0 15px rgba(217,180,92,0.20);

    transition:
        width 0.1s linear;
}


/* punto luminoso */

.progress::after {

    content: "";

    position: absolute;

    right: -4px;

    top: 50%;

    width: 9px;
    height: 9px;

    transform: translateY(-50%);

    border-radius: 50%;

    background: var(--gold-light);

    box-shadow:
        0 0 6px var(--gold),
        0 0 14px rgba(217,180,92,0.65);
}


/* =========================================================
   TIEMPO
   ========================================================= */

.time {

    position: relative;

    z-index: 2;

    display: flex;

    justify-content: space-between;

    color: #607893;

    font-size: 10px;

    letter-spacing: 0.5px;

    margin-bottom: 20px;
}


/* =========================================================
   CONTROLES
   ========================================================= */

.controls {

    position: relative;

    z-index: 4;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 18px;
}


.controls button {

    display: flex;

    align-items: center;

    justify-content: center;

    border: 1px solid rgba(95,143,198,0.15);

    cursor: pointer;

    color: var(--text);

    background:
        linear-gradient(
            145deg,
            rgba(28,58,94,0.65),
            rgba(8,23,42,0.85)
        );

    box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.035),
        0 8px 20px rgba(0,0,0,0.25);

    transition:
        transform 0.22s ease,
        border-color 0.22s ease,
        box-shadow 0.22s ease,
        background 0.22s ease;
}


.controls button:hover {

    transform:
        translateY(-2px);

    border-color:
        rgba(217,180,92,0.35);

    background:
        rgba(19,48,82,0.9);

    box-shadow:
        0 10px 25px rgba(0,0,0,0.32),
        0 0 15px rgba(36,124,235,0.10);
}


.controls button:active {

    transform:
        scale(0.93);
}


/* =========================================================
   BOTONES LATERALES
   ========================================================= */

#rewindButton,
#forwardButton {

    width: 45px;

    height: 45px;

    border-radius: 50%;

    font-size: 14px;
}


/* =========================================================
   BOTÓN PLAY FUTURISTA
   ========================================================= */

#playButton {

    position: relative;

    width: 74px;

    height: 74px;

    border-radius: 50%;

    color: #06101d;

    border:
        1px solid rgba(255,239,181,0.75);

    background:
        radial-gradient(
            circle at 35% 30%,
            #fff4c8,
            var(--gold-light) 35%,
            var(--gold) 68%,
            var(--gold-dark)
        );

    box-shadow:
        0 8px 25px rgba(0,0,0,0.40),
        0 0 16px rgba(217,180,92,0.35),
        0 0 40px rgba(217,180,92,0.12);

    font-size: 23px;

    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease;
}


/* anillo */

#playButton::before {

    content: "";

    position: absolute;

    inset: -7px;

    border-radius: 50%;

    border:
        1px solid rgba(217,180,92,0.20);

    box-shadow:
        0 0 16px rgba(217,180,92,0.10);

    animation:
        playRing 3s ease-in-out infinite;
}


@keyframes playRing {

    0%,
    100% {
        transform: scale(0.96);

        opacity: 0.45;
    }

    50% {
        transform: scale(1.04);

        opacity: 1;
    }
}


#playButton:hover {

    transform:
        scale(1.07);

    box-shadow:
        0 10px 30px rgba(0,0,0,0.42),
        0 0 25px rgba(217,180,92,0.55),
        0 0 55px rgba(217,180,92,0.18);
}


/* =========================================================
   DESCARGA
   ========================================================= */

#downloadButton {

    position: relative;

    z-index: 3;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 9px;

    width: 100%;

    margin-top: 22px;

    padding: 12px 15px;

    border-radius: 13px;

    color: var(--gold-light);

    text-decoration: none;

    font-size: 10px;

    font-weight: 700;

    letter-spacing: 1.7px;

    background:
        linear-gradient(
            90deg,
            rgba(217,180,92,0.035),
            rgba(217,180,92,0.08),
            rgba(217,180,92,0.035)
        );

    border:
        1px solid rgba(217,180,92,0.16);

    transition:
        background 0.25s ease,
        border-color 0.25s ease,
        box-shadow 0.25s ease;
}


#downloadButton:hover {

    background:
        rgba(217,180,92,0.10);

    border-color:
        rgba(217,180,92,0.35);

    box-shadow:
        0 0 20px rgba(217,180,92,0.08);
}


/* =========================================================
   AYER
   ========================================================= */

.yesterday-card {

    margin-top: 17px;

    padding:
        21px;

    border-radius: 21px;

    background:
        linear-gradient(
            145deg,
            rgba(9,26,48,0.72),
            rgba(3,12,25,0.82)
        );

    animation:
        panelEnter 0.8s ease 0.12s both;
}


.yesterday-card .label {

    margin-bottom: 11px;

    color: #8196b0;
}


#yesterdayDate {

    color: var(--gold);

    font-size: 10px;

    letter-spacing: 1.5px;

    margin-bottom: 6px;
}


#yesterdayTitle {

    color: var(--white);

    font-size: 16px;

    line-height: 1.4;

    margin-bottom: 17px;
}


/* =========================================================
   CONTROLES AYER
   ========================================================= */

.yesterday-controls {

    display: flex;

    align-items: center;

    gap: 13px;
}


#yesterdayPlay {

    display: flex;

    align-items: center;

    justify-content: center;

    width: 45px;

    height: 45px;

    flex-shrink: 0;

    border-radius: 50%;

    color: var(--gold-light);

    background:
        rgba(217,180,92,0.055);

    border:
        1px solid rgba(217,180,92,0.20);

    cursor: pointer;

    font-size: 14px;

    transition:
        transform 0.2s ease,
        background 0.2s ease,
        box-shadow 0.2s ease;
}


#yesterdayPlay:hover {

    transform:
        scale(1.06);

    background:
        rgba(217,180,92,0.11);

    box-shadow:
        0 0 18px rgba(217,180,92,0.12);
}


#yesterdayProgressBar {

    flex: 1;

    height: 4px;

    border-radius: 20px;

    background:
        rgba(255,255,255,0.06);

    cursor: pointer;

    overflow: visible;
}


#yesterdayProgress {

    position: relative;

    width: 0%;

    height: 100%;

    border-radius: inherit;

    background:
        linear-gradient(
            90deg,
            var(--blue),
            var(--gold)
        );

    box-shadow:
        0 0 9px rgba(22,119,255,0.35);
}


#yesterdayDuration {

    min-width: 35px;

    text-align: right;

    color: #617995;

    font-size: 10px;
}


/* =========================================================
   DESCARGA AYER
   ========================================================= */

#yesterdayDownload {

    display: block;

    margin-top: 16px;

    text-align: right;

    color: #8297b1;

    font-size: 10px;

    letter-spacing: 0.8px;

    text-decoration: none;

    transition:
        color 0.2s ease;
}


#yesterdayDownload:hover {

    color: var(--gold-light);
}


/* =========================================================
   FOOTER
   ========================================================= */

footer {

    text-align: center;

    padding-top: 27px;

    color: #52667f;

    font-size: 9px;

    letter-spacing: 1.4px;

    text-transform: uppercase;
}


/* =========================================================
   EFECTO DE LUZ SOBRE EL PANEL
   ========================================================= */

@keyframes scanningLight {

    0% {
        transform:
            translateX(-120%);
    }

    100% {
        transform:
            translateX(120%);
    }
}


.today-card {
    isolation: isolate;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 520px) {

    .app {

        padding:
            19px
            13px
            30px;
    }


    header {

        padding-bottom: 25px;
    }


    .brand {

        font-size: 25px;

        letter-spacing: 4px;
    }


    .subtitle {

        font-size: 11px;

        letter-spacing: 1.5px;
    }


    #currentDate {

        font-size: 9px;

        letter-spacing: 1.5px;
    }


    .today-card {

        padding:
            23px
            18px
            21px;

        border-radius: 22px;
    }


    #todayTitle {

        font-size: 22px;
    }


    #todayDescription {

        font-size: 13px;
    }


    .visualizer {

        height: 50px;

        gap: 3px;
    }


    .visualizer span {

        width: 3px;
    }


    .controls {

        gap: 14px;
    }


    #playButton {

        width: 67px;

        height: 67px;
    }


    #rewindButton,
    #forwardButton {

        width: 42px;

        height: 42px;
    }


    .yesterday-card {

        padding:
            19px 17px;

        border-radius: 19px;
    }
}


/* =========================================================
   DESKTOP
   ========================================================= */

@media (min-width: 900px) {

    .app {

        padding-top: 40px;
    }


    .brand {

        font-size: 34px;
    }


    .today-card {

        padding:
            31px
            28px
            28px;
    }
}
