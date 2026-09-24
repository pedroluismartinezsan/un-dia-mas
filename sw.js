const CACHE_NAME = "un-dia-mas-v3";

const APP_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];


/* =====================================================
   INSTALAR
===================================================== */

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())

  );

});


/* =====================================================
   ACTIVAR
===================================================== */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))

      );

    }).then(() => self.clients.claim())

  );

});


/* =====================================================
   PETICIONES
===================================================== */

self.addEventListener("fetch", event => {

  const request = event.request;
  const url = new URL(request.url);


  /*
   * NO INTERCEPTAR GOOGLE DRIVE
   *
   * Esto permite que el navegador maneje
   * directamente el MP3.
   */

  if (
    url.hostname === "drive.google.com" ||
    url.hostname === "drive.usercontent.google.com" ||
    url.hostname === "googleusercontent.com"
  ) {

    return;
  }


  /*
   * Ignorar extensiones del navegador
   */

  if (url.protocol === "chrome-extension:") {

    return;
  }


  /*
   * Archivos de la aplicación
   */

  event.respondWith(

    caches.match(request)
      .then(cachedResponse => {

        if (cachedResponse) {
          return cachedResponse;
        }


        return fetch(request)
          .then(response => {

            if (
              response &&
              response.status === 200 &&
              response.type === "basic"
            ) {

              const responseClone =
                response.clone();

              caches.open(CACHE_NAME)
                .then(cache => {

                  cache.put(
                    request,
                    responseClone
                  );

                })
                .catch(error => {

                  console.warn(
                    "No se pudo guardar en caché:",
                    error
                  );

                });

            }

            return response;

          });

      })

  );

});
