/* =========================================================
   UN DÍA MÁS
   SERVICE WORKER
   ========================================================= */

const CACHE_NAME = "un-dia-mas-v1";

const ARCHIVOS_APP = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];


// =========================================================
// INSTALACIÓN
// =========================================================

self.addEventListener("install", event => {

    console.log("UN DÍA MÁS: instalando Service Worker...");

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(ARCHIVOS_APP);

            })

    );

    self.skipWaiting();

});


// =========================================================
// ACTIVACIÓN
// =========================================================

self.addEventListener("activate", event => {

    console.log("UN DÍA MÁS: Service Worker activado.");

    event.waitUntil(

        caches.keys()
            .then(nombresCaches => {

                return Promise.all(

                    nombresCaches
                        .filter(nombre => nombre !== CACHE_NAME)
                        .map(nombre => caches.delete(nombre))

                );

            })

    );

    self.clients.claim();

});


// =========================================================
// PETICIONES
// =========================================================

self.addEventListener("fetch", event => {

    const url = new URL(event.request.url);


    // =====================================================
    // LOS AUDIOS NUNCA SE GUARDAN EN CACHE
    // =====================================================

    if (
        url.pathname.endsWith("/audio/hoy.mp3") ||
        url.pathname.endsWith("/audio/ayer.mp3")
    ) {

        event.respondWith(

            fetch(event.request, {
                cache: "no-store"
            })

        );

        return;
    }


    // =====================================================
    // RESTO DE LA APLICACIÓN
    // CACHE FIRST
    // =====================================================

    event.respondWith(

        caches.match(event.request)
            .then(respuestaCache => {

                if (respuestaCache) {

                    return respuestaCache;

                }


                return fetch(event.request)
                    .then(respuesta => {

                        return respuesta;

                    });

            })

    );

});
