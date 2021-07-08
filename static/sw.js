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

    //let timeStamp = Date.now()
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
    )


})


self.addEventListener('fetch', e => {

    console.log('sw fetch')

    if (req.url.startsWith(self.location.origin)) {
        const req = e.request.clone()
        e.respondWith(
            caches
                .match(req)
                .then(res => res
                    ? res
                    : caches
                        .open(RUNTIME.name)
                        .then(cache => fetch(req).then(res => cache.put(req, res.clone())))
                )
        )
    }

})