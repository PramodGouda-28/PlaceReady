const CACHE_NAME = "placeready-v2";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./profile.html",
  "./resume.html",
  "./interview.html",
  "./aptitude.html",
  "./tracker.html",
  "./settings.html",
  "./manifest.json",
  "./css/style.css",
  "./css/responsive.css",
  "./css/print.css",
  "./js/app.js",
  "./js/resume.js",
  "./js/interview.js",
  "./js/aptitude.js",
  "./js/tracker.js"
];

// Save the main files for offline use
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// Use saved files when offline
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// Activate the new cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name.startsWith("placeready-") && name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );

  self.clients.claim();
});