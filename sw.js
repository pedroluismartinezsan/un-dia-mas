const CACHE_NAME = "un-dia-mas-v2";

const APP_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );

});


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


self.addEventListener("fetch", event => {

  const request = event.request;

  /*
   * Los audios vienen directamente desde Google Drive.
   * No los guardamos en la caché de la aplicación.
   */
  if (
    request.url.includes("/audio/") ||
    request.destination === "audio" ||
    request.url.includes("drive.google.com")
  ) {

    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );

    return;
  }


  /*
   * Archivos de la aplicación
   */
  event.respondWith(

    caches.match(request).then(cachedResponse => {

      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then(response => {

        if (
          response &&
          response.status === 200 &&
          response.type === "basic"
        ) {

          const responseClone =
            response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(request, responseClone);
            });

        }

        return response;

      });

    })

  );

});
