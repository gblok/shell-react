const
    RUNTIME = 'runtime',
    PRECACHE = 'v1',
    OFFLINE ='offline',
    OFFLINE_URLS = [
        '/assets/css/default.css',
        '/offline.html',
    ],
    PRECACHE_URLS = [
        '/',
        '/manifest.json',
        '/assets/css/default.css',
        '/assets/js/vendor.js',
        '/assets/js/client.js'
    ]


self.addEventListener('install', e => {
    console.log('sw install', e)

    e.waitUntil(
        caches
            .open(OFFLINE)
            .then(c => c.addAll(OFFLINE_URLS))
            .then(() => self.skipWaiting())
    )
})


/*caches
    .open(OFFLINE)
    .then(c => c.addAll(OFFLINE_URLS))
    .then(() => self.skipWaiting())*/



/*self.addEventListener('activate', e => {
    console.log('sw activate', e)

    const allowCaches = [PRECACHE, RUNTIME]

    e.waitUntil(
        caches.keys()
            .then(c => allowCaches.filter(c => !allowCaches.includes(c)))
            .then(toDelete => Promise
                .all(toDelete.map(c => caches.delete(c)))
                .then(() => self.clients.claim()))
    )


})*/

self.addEventListener('fetch', function(event) {

    // Only fall back for HTML documents.
    var request = event.request
    // && request.headers.get('accept').includes('text/html')

    if (request.method === 'GET') {
        // `fetch()` will use the cache when possible, to this examples
        // depends on cache-busting URL parameter to avoid the cache.
        event.respondWith(
            fetch(request).catch(function(error) {
                // `fetch()` throws an exception when the server is unreachable but not
                // for valid HTTP responses, even `4xx` or `5xx` range.
                return caches
                    .open(OFFLINE)
                    .then(function(cache) {
                    return cache.match('offline.html')
                })
            })
        )
    }
    // Any other handlers come here. Without calls to `event.respondWith()` the
    // request will be handled without the ServiceWorker.
})

/*self.addEventListener('fetch', e => {

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
                                .put(e.request, res.clone())
                                .then(() => res)))
                )
        )
    }

})*/

/*
self.addEventListener('controllerchange', e => {

    self.controller.addEventListener('statechange', function () {
        console.warn('offlineNotification')
    })
})*/
