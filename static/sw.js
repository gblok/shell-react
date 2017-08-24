const
    PRECACHE = 'v1',
    RUNTIME = 'runtime',
    PRECACHE_URLS = [
        '/',
        '/offline.html',
        '/assets/css/default.css',
        '/assets/js/vendor.js',
        '/assets/js/client.js'
    ]


self.addEventListener('install', e => {
    console.log('sw install', e)

    e.waitUntil(
        caches
            .open(PRECACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    )
})
self.addEventListener('activate', e => {
    console.log('sw activate', e)

    const currentCaches = [PRECACHE, RUNTIME]

    e.waitUntil(
        caches.keys()
            .then(cacheNames => cacheNames.filter(cacheName => !currentCaches.includes(cacheName)))
            .then(cachesToDelete => Promise
                .all(cachesToDelete.map(cacheToDelete => caches.delete(cacheToDelete)))
                .then(() => self.clients.claim()))
    )

})

self.addEventListener('fetch', e => {

    console.log('sw fetch', e)

    if (e.request.url.startsWith(self.location.origin)) {
        e.respondWith(
            caches
                .match(e.request)
                .then(cachedResponse => cachedResponse
                    ? cachedResponse
                    : caches
                        .open(RUNTIME)
                        .then(cache => fetch(e.request)
                            .then(response => cache
                                .put(e.request, response.clone())
                                .then(() => response)))
                )
        )
    }

})