```javascript
const CACHE_NAME = "un-dia-mas-v1";

const APP_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

// Instalar la aplicación
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

// Activar y eliminar versiones anteriores
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Interceptar solicitudes
self.addEventListener("fetch", event => {
  const request = event.request;

  // Los audios SIEMPRE se buscan primero en Internet.
  // Esto evita que mañana se siga reproduciendo
  // accidentalmente el audio viejo.
  if (
    request.url.includes("/audio/") ||
    request.destination === "audio"
  ) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
    return;
  }

  // Para la aplicación usamos caché primero.
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then(response => {

        // Solo guardamos respuestas válidas.
        if (
          response &&
          response.status === 200 &&
          response.type === "basic"
        ) {
          const responseClone = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
        }

        return response;
      });
    })
  );
});
```
