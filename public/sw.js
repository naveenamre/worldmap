const CACHE_VERSION = 'world-learner-v2';
const APP_SHELL_CACHE = `${CACHE_VERSION}-shell`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;
const MAP_CACHE = `${CACHE_VERSION}-maps`;
const MAX_ASSET_ENTRIES = 80;
const MAX_MAP_ENTRIES = 50;

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './pwa-icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(APP_SHELL_CACHE).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => ![APP_SHELL_CACHE, ASSET_CACHE, MAP_CACHE].includes(key))
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

async function trimCache(cacheName, maximumEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  const overflow = keys.length - maximumEntries;
  if (overflow > 0) {
    await Promise.all(keys.slice(0, overflow).map((key) => cache.delete(key)));
  }
}

async function putIfValid(cacheName, request, response, maximumEntries) {
  if (!response || !response.ok || response.type === 'opaque') return;
  const cache = await caches.open(cacheName);
  await cache.put(request, response.clone());
  await trimCache(cacheName, maximumEntries);
}

async function cacheFirst(request, cacheName, maximumEntries) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  await putIfValid(cacheName, request, response, maximumEntries);
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    await putIfValid(APP_SHELL_CACHE, request, response, 12);
    return response;
  } catch (error) {
    return (await caches.match(request)) || (await caches.match('./index.html'));
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.pathname.includes('/maps/')) {
    event.respondWith(cacheFirst(request, MAP_CACHE, MAX_MAP_ENTRIES));
    return;
  }

  if (
    url.pathname.includes('/assets/') ||
    /\.(?:svg|png|jpg|jpeg|webp|css|js)$/.test(url.pathname)
  ) {
    event.respondWith(cacheFirst(request, ASSET_CACHE, MAX_ASSET_ENTRIES));
  }
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'CLEAR_MAP_CACHE') {
    event.waitUntil(caches.delete(MAP_CACHE));
  }
});
