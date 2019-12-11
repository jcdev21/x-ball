importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    {url: '/', revision: '1'},
    {url: '/index.html', revision: '1'},
    {url: '/nav.html', revision: '1'},
    {url: '/assets/css/reset.css', revision: '1'},
    {url: '/assets/css/materialize.min.css', revision: '1'},
    {url: '/assets/css/style-pwa.css', revision: '1'},
    {url: '/assets/font/Montserrat-Regular.ttf', revision: '1'},
    {url: '/assets/icons/icon-96x96.png', revision: '1'},
    {url: '/assets/icons/icon-192x192.png', revision: '1'},
    {url: '/assets/icons/icon-512x512.png', revision: '1'},
    {url: '/assets/js/materialize.min.js', revision: '1'},
    {url: '/assets/js/idb.js', revision: '1'},
    {url: '/assets/js/api.js', revision: '1'},
    {url: '/assets/js/app.js', revision: '1'},
    {url: '/assets/js/main.js', revision: '1'},
    {url: '/assets/js/nav.js', revision: '1'},
    {url: '/assets/js/notifikasi.js', revision: '1'},
    {url: '/pages/home.html', revision: '1'},
    {url: '/pages/ligas.html', revision: '1'},
    {url: '/pages/favorit.html', revision: '1'},
    {url: '/pages/pilihFavorit.html', revision: '1'},
    {url: '/push.js', revision: '1'},
]);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    workbox.strategies.networkFirst({
        networkTimeoutSeconds: 3,
        cacheName: 'stories-api',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7
            })
        ]
    })
);

self.addEventListener('push', function (e) {
    let body = (e.data) ? e.data.text() : 'Push message no payload';
    let options = {
        body: body,
        badge: '/assets/icons/icon-96x96.png',
        icon: '/assets/icons/icon-96x96.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    e.waitUntil(
        self.registration.showNotification('Notifikasi dari X-Ball', options)
    );
});