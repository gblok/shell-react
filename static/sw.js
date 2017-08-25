const
    RUNTIME = 'runtime',
    PRECACHE = 'v1',
    PRECACHE_URLS = [
        '/',
        './',
        '/assets/css/default.css',
        '/assets/js/vendor.js',
        '/assets/js/client.js'
    ]


self.addEventListener('install', e => {
    console.log('sw install', e)

    e.waitUntil(
        caches.open(PRECACHE)
            .then(c => c.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    )
})


self.addEventListener('activate', e => {
    console.log('sw activate', e)

    const allowCaches = [PRECACHE, RUNTIME]

    e.waitUntil(
        caches.keys()
            .then(c => allowCaches.filter(c => !allowCaches.includes(c)))
            .then(toDelete => Promise
                .all(toDelete.map(c => caches.delete(c)))
                .then(() => self.clients.claim()))
    )

})

self.addEventListener('fetch', e => {

    console.log('sw fetch', e)

    if (e.request.url.startsWith(self.location.origin)) {
        e.respondWith(
            caches
                .match(e.request)
                .then(r => r
                    ? r
                    : caches
                        .open(RUNTIME)
                        .then(c => fetch(e.request)
                            .then(res => c
                                .put(e.request, response.clone())
                                .then(() => response)))
                )
        )
    }

})