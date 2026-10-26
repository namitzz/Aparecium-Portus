/* Aparecium Portus service worker: keeps the app usable with patchy signal (e.g. on the Tube).
   The page is always fetched fresh when online, so edits to index.html show up straight away. */
const SHELL = 'portus-shell-v1';
const MEDIA = 'portus-media-v1';
const MEDIA_LIMIT = 400;
const SHELL_FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => Promise.all(SHELL_FILES.map(f => c.add(f).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== SHELL && k !== MEDIA).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

async function trim(cache) {
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - MEDIA_LIMIT; i++) await cache.delete(keys[i]);
}
const cacheable = r => r && (r.ok || r.type === 'opaque');

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // The app itself: network first, cached copy when offline
  if (req.mode === 'navigate' || (url.origin === location.origin)) {
    e.respondWith(fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(SHELL).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: req.mode === 'navigate' }).then(r => r || caches.match('./index.html'))));
    return;
  }

  // Versioned libraries and fonts: cache first
  if (/(^|\.)unpkg\.com$|fonts\.googleapis\.com$|fonts\.gstatic\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (cacheable(res)) { const copy = res.clone(); caches.open(SHELL).then(c => c.put(req, copy)); }
      return res;
    })));
    return;
  }

  // Map tiles and photos: serve cached instantly, refresh in the background
  if (req.destination === 'image') {
    e.respondWith(caches.open(MEDIA).then(async cache => {
      const hit = await cache.match(req);
      const net = fetch(req).then(res => {
        if (cacheable(res)) { cache.put(req, res.clone()).then(() => trim(cache)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    }));
  }
});
