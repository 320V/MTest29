const cacheName = "ASME.MEB.VerileriAnalizEdiyoruz-MEB - Verileri Analiz Ediyoruz-1.0";
const contentToCache = [
    "Build/29-Verileri Analiz Ediyoruz.loader.js",
    "Build/29-Verileri Analiz Ediyoruz.framework.js",
    "Build/29-Verileri Analiz Ediyoruz.data",
    "Build/29-Verileri Analiz Ediyoruz.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
