if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js');
    });
}

function getLiga(page, idLiga) {
    loadPage(page, idLiga);
}

function getTeamByLiga(page, idLiga) {
    loadPage(page, idLiga);
}