const
    RUNTIME = {
        name: 'runtime',
    },
    CACHE = {
        name: 'v1',
        urls: [
            '/',
            '/manifest.json',
            '/assets/css/default.css',
            '/assets/js/vendor.js',
            '/assets/js/client.js'
        ]
    }


self.addEventListener('install', e => {
    console.log('sw install')

    e.waitUntil(
        caches
            .open(CACHE.name)
            .then(c => c.addAll(CACHE.urls))
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', e => {
    console.log('sw activate')

    const allowCaches = [CACHE.name, RUNTIME.name]

    e.waitUntil(
        caches.keys()
            .then(c => allowCaches.filter(c => !allowCaches.includes(c)))
            .then(toDelete => Promise
                .all(toDelete.map(c => caches.delete(c)))
                .then(() => self.clients.claim()))
            .catch(err => console.error(err))
    )


})


self.addEventListener('fetch', e => {

    console.log('sw fetch')

    if (e.request.url.startsWith(self.location.origin) && e.request.method === 'GET') {

        e.respondWith(
            caches
                .match(e.request)
                .then(r => r ? r : caches
                    .open(RUNTIME.name)
                    .then(c => fetch(e.request)
                        .then(res => c.put(e.request, res.clone())
                            .then(() => res)))
                    .catch(err => console.error(err))
                )
        )

    }

})