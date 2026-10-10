// Generated at build time. Makes DueRadar open and work with no network.
const CACHE = "dueradar-73fd2e3cf3";
const FILES = ["/","/manifest.webmanifest","/icon.svg","/icon-192.png","/assets/index-DZW2wg8m.js","/assets/atkinson-hyperlegible-mono-latin-wght-normal-CoA7y8X5.woff2","/assets/atkinson-hyperlegible-next-latin-wght-normal-BcXVPD7q.woff2","/assets/index-6ZReCMAf.css"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(names.filter((n) => n.startsWith('dueradar-') && n !== CACHE).map((n) => caches.delete(n)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Only this site's own files. Requests to school systems are never intercepted or cached.
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    // Newest page when online, the saved one when not.
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put('/', copy));
          }
          return response;
        })
        .catch(() => caches.match('/', { cacheName: CACHE }).then((hit) => hit || Response.error())),
    );
    return;
  }
  event.respondWith(caches.match(request, { cacheName: CACHE }).then((hit) => hit || fetch(request)));
});
