const CACHE_NAME = "tap-the-blob-v1";
const FILES_TO_CACHE = [
 "/pwa-test/",
 "/pwa-test/index.html",
 "/pwa-test/style.css",
 "/pwa-test/app.js",
 "/pwa-test/manifest.json",
 "/pwa-test/register-sw.js",
 "/pwa-test/icons/icon-192.png",
 "/pwa-test/icons/icon-512.png"
];
self.addEventListener("install", (event) => {
 event.waitUntil(
   caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
 );
 self.skipWaiting();
});
self.addEventListener("activate", (event) => {
 event.waitUntil(
   caches.keys().then((keys) =>
     Promise.all(
       keys
         .filter((key) => key !== CACHE_NAME)
         .map((key) => caches.delete(key))
     )
   )
 );
 self.clients.claim();
});
self.addEventListener("fetch", (event) => {
 event.respondWith(
   caches.match(event.request).then((cachedResponse) => {
     return cachedResponse || fetch(event.request);
   })
 );
});
