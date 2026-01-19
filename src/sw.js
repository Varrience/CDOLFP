const CACHE = "precache-v1";
const ASSETS = ["public/style.css", "src/projectFiller.js", "src/scaler.js", "src/viewSources.js", "index.html", "favicon.ico"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.filter((name) => name !== CACHE).map((name) => caches.delete(name)));
    }),
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  // Apply network-first to API requests
    event.respondWith(
      fetch(request)
        .then(async response => {
          // Cache successful API responses
          if (response.ok) {
            const cache = await caches.open(CACHE);
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => {
          // Network failed, try cache
          return caches.match(request)
            .then(cached => {
              if (cached) {
                return cached;
              }
              // Both failed, return offline response
              return new Response('Offline', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            });
        })
    );
});