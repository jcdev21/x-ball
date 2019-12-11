// Activete sidebar nav
var elems = document.querySelectorAll('.sidenav');
M.Sidenav.init(elems);
loadNavigasi();

// Load Page Content
var page = window.location.hash.substr(1);
if (page == '') page = 'home';
loadPage(page);

function loadNavigasi() {
    fetch('nav.html')
        .then(response => {
            return response.text();
        })
        .then(html => {
            // muat daftar tautan menu
            document.querySelectorAll('.topnav, .sidenav').forEach(function (elm) {
                elm.innerHTML = html;
            });

            // Daftarkan event listener untuk setiap tautan menu
            document.querySelectorAll('.topnav a, .sidenav a').forEach(function (elm) {
                elm.addEventListener('click', function (event) {
                    // Tutup sidenav
                    var sidenav = document.querySelector('.sidenav');
                    M.Sidenav.getInstance(sidenav).close();

                    // Muat konten halaman yang dipanggil
                    page = event.target.getAttribute('href').substr(1);
                    loadPage(page);
                });
            });
        });
}

function loadPage(page, idLigas = '') {
    var content = document.querySelector('#body-content');

    fetch(`pages/${page}.html`)
        .then(response => {
            if (page === "home") {
                getCompetitionsPopular();
            } else if (page === "ligas") {
                getCompetitionById(idLigas);
            } else if (page === "favorit") {
                getTeamFavorite();
            } else if (page === "pilihFavorit") {
                getCompetitionByTeams(idLigas);
            }

            if (response.status == 200) {
                return response.text();
            } else if (response.status == 404) {
                return content.innerHTML =
                    `<div style="text-align: center;">
                        <h1>404</h1>
                        <h3>Page Not Found</h3>
                    </div>`;
            } else{
                return content.innerHTML = `<p>Ups.. Halaman tidak dapat diakses.</p>`;
            }
        })
        .then(html => {
            content.innerHTML = html;
        });
}