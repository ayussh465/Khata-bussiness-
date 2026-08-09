// Khata service worker
// Kept intentionally minimal: the app itself already gates on a live
// internet connection (see the netGate logic in index.html), so this
// worker does not attempt offline caching of app data. Its only job is
// to satisfy the installability requirement for "Add to Home Screen" /
// desktop install prompts on Windows, iOS, and Android, and to pass
// requests straight through to the network.

const CACHE_NAME = 'khata-shell-v1';
const SHELL_ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first: always try the live network (the app needs it anyway),
// only falling back to the cached shell if the network request fails
// outright (e.g. briefly offline while the app's own net-gate is showing).
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Opportunistically refresh the shell cache for the app's own files.
        if (event.request.url.includes('index.html') || event.request.url.endsWith('/')) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
