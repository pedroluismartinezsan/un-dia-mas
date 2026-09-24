/* =========================================================
   UN DÍA MÁS
   INICIO DE LA APLICACIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    var intro = document.getElementById("intro");
    var app = document.getElementById("app");
    var loadingText = document.getElementById("loadingText");

    console.log("UN DÍA MÁS: aplicación cargada");

    if (!intro || !app) {
        console.error("UDM: no se encontraron #intro o #app");
        return;
    }

    /* La aplicación empieza oculta */
    app.style.opacity = "0";

    /*
       5 segundos de pantalla inicial
    */
    setTimeout(function () {

        console.log("UDM: mostrando nombre");

        if (loadingText) {
            loadingText.style.opacity = "0";
        }

        intro.classList.add("reveal");

    }, 5000);


    /*
       Después de mostrar UN DÍA MÁS,
       entramos a la aplicación
    */
    setTimeout(function () {

        console.log("UDM: entrando a la aplicación");

        intro.style.transition = "opacity 1s ease";
        app.style.transition = "opacity 1s ease";

        intro.style.opacity = "0";
        app.style.opacity = "1";

        setTimeout(function () {

            intro.style.display = "none";
            document.body.style.overflow = "auto";

            console.log("UDM: aplicación visible");

        }, 1000);

    }, 8000);

});
