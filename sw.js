const CACHE_NAME = "pwa-test-v1";
const urlsToCache = [
 "/pwa-test/",
 "/pwa-test/index.html",
 "/pwa-test/offline.html"
];
self.addEventListener("install", event => {
 event.waitUntil(
   caches.open(CACHE_NAME)
     .then(cache => {
       return cache.addAll(urlsToCache);
     })
 );
});
self.addEventListener("fetch", event => {
 event.respondWith(
   fetch(event.request)
     .catch(() => {
       return caches.match(event.request)
         .then(response => {
           return response || caches.match("/pwa-test/offline.html");
         });
     })
 );
});