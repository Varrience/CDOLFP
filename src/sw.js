const CACHE = "precache-v1";
const ASSETS = ["/public/style.css", "/src/projectFiller.js", "/src/scaler.js", "/src/viewSources.js", "/index.html", "/favicon.ico"];

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
        // First, try to use the navigation preload response if it's supported.
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        // catch is only triggered if an exception is thrown, which is likely
        // due to a network error.
        // If fetch() returns a valid HTTP response with a response code in
        // the 4xx or 5xx range, the catch() will NOT be called.
        console.log('Fetch failed; returning offline page instead.', error);

        const cache = await caches.open(CACHE);
        const cachedResponse = await cache.match(request);
        return cachedResponse;
      });
});