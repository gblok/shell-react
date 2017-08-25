const
    MAX_AGE = 86400000,
    CACHE = {
        name: 'v1',
        urls: [
            '/',
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
            .then(cache => cache.addAll(CACHE.urls))
    )
})

self.addEventListener('activate', e => {

    console.log('sw activate')

    const cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1']

    e.waitUntil(
        caches
            .keys()
            .then(cacheNames => Promise.all(cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1)
                        return caches.delete(cacheName)
                })
                )
            )
    )
})

self.addEventListener('fetch', e => {

    console.log('sw fetch')

    e.respondWith(
        caches
            .open('mysite-dynamic')
            .then(function (cache) {

                return cache
                    .match(e.request)
                    .then(response => {

                        const fetchPromise = fetch(e.request)
                            .then(function (networkResponse) {
                                cache.put(e.request, networkResponse.clone())
                                return networkResponse
                            })

                        return response || fetchPromise
                    })
            })
    )
})
