const nom_cache = 'YouKnow-Cache'; // Le nom pourri, je sais...
const fichiers = [
  '/',
  '/index.html',
  '/etape1.png',
  '/etape2.png',
  '/etape3.png',
  '/etape4.png',
  '/etape5.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(nom_cache).then((cache) => {
      return cache.addAll(fichiers);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return caches.open(nom_cache).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});