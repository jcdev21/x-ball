const base_url_FD = 'https://api.football-data.org/';

var myHeaders = new Headers();
myHeaders.append('X-Auth-Token', 'd94638a39d074e5ba4d0c81dfac38d0e');

// Check status fetch
function status(response) {
    if (response.status != 200) {
        return Promise.reject(new Error(response.statusText))
    } else {
        return Promise.resolve(response);
    }
}

// Memparsing json menjadi array
function json(response) {
    return response.json();
}

// Blok kode yg dipanggil jika status reject
function error(error) {
    console.log('Error : ', error);
}

function getCompetitionsPopular() {
    if ('caches' in window) {
        caches.match(`${base_url_FD}v2/competitions`)
            .then(response => {
                if (response) {
                    response.json()
                        .then(data => {
                            const newData = data.competitions.filter(function (league) {
                                return  league.id == 2002 ||
                                        league.id == 2003 ||
                                        league.id == 2021 ||
                                        league.id == 2014 ||
                                        league.id == 2015 ||
                                        league.id == 2019;
                            });

                            let content = '';

                            newData.forEach(data => {
                                content += `
                                    <div class="col s12 m6">
                                        <div class="card">
                                            <a href="#ligas" onClick="getLiga('ligas', ${data.id})">
                                                <div class="card-content valign center">
                                                    <span class="card-title">${data.name}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                `;

                                document.querySelector("#body-content").innerHTML = content;
                            });
                        })
                }
            });
    }

    fetch(`${base_url_FD}v2/competitions`, { headers: myHeaders })
        .then(status)
        .then(json)
        .then(data => {
            const newData = data.competitions.filter(function (league) {
                return  league.id == 2002 ||
                        league.id == 2003 ||
                        league.id == 2021 ||
                        league.id == 2014 ||
                        league.id == 2015 ||
                        league.id == 2019;
            });

            let content = '';

            newData.forEach(data => {
                content += `
                    <div class="col s12 m6">
                        <div class="card">
                            <a href="#ligas" onClick="getLiga('ligas', ${data.id})">
                                <div class="card-content valign center">
                                    <span class="card-title">${data.name}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                `;

                document.querySelector("#body-content").innerHTML = content;
            });
        })
        .catch(error);
}

function getCompetitionsForFavorit() {
    if ('caches' in window) {
        caches.match(`${base_url_FD}v2/competitions`)
            .then(response => {
                if (response) {
                    response.json()
                        .then(data => {
                            const newData = data.competitions.filter(function (league) {
                                return  league.id == 2002 ||
                                        league.id == 2003 ||
                                        league.id == 2021 ||
                                        league.id == 2014 ||
                                        league.id == 2015 ||
                                        league.id == 2019;
                            });

                            let content = '<h4 class="center-align">Pilih Liga</h4>';

                            newData.forEach(data => {
                                content += `
                                    <div class="col s12 m6">
                                        <div class="card">
                                            <a href="#pilihFavorit" onClick="getTeamByLiga('pilihFavorit', ${data.id})">
                                                <div class="card-content valign center">
                                                    <span class="card-title">${data.name}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                `;

                                document.querySelector("#body-content").innerHTML = content;
                            });
                        })
                }
            });
    }

    fetch(`${base_url_FD}v2/competitions`, { headers: myHeaders })
        .then(status)
        .then(json)
        .then(data => {
            const newData = data.competitions.filter(function (league) {
                return  league.id == 2002 ||
                        league.id == 2003 ||
                        league.id == 2021 ||
                        league.id == 2014 ||
                        league.id == 2015 ||
                        league.id == 2019;
            });

            let content = '<h4 class="center-align">Pilih Liga</h4>';

            newData.forEach(data => {
                content += `
                    <div class="col s12 m6">
                        <div class="card">
                            <a href="#pilihFavorit" onClick="getTeamByLiga('pilihFavorit', ${data.id})">
                                <div class="card-content valign center">
                                    <span class="card-title">${data.name}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                `;

                document.querySelector("#body-content").innerHTML = content;
            });
        })
        .catch(error);
}

function getCompetitionById(idParams) {

    let standings = getCompetitionsStandings(idParams);
    standings.then(data => {

        const startDate = `'${data.season.startDate}'`;
        const endDate = `'${data.season.endDate}'`;
        const optionDate = { year: 'numeric', month: 'long', day: 'numeric' };

        document.querySelector(".title").innerHTML = `${data.competition.name} (${data.competition.code})`;
        document.querySelector(".informasi").innerHTML = `
            <table class="responsive-table">
                <tbody id="tbInfo">
                    <tr>
                        <td class="t-info">Area</td>
                        <td>${data.competition.area.name}</td>
                    </tr>
                    <tr>
                        <td class="t-info">Dimulai</td>
                        <td>${new Date(startDate).toLocaleDateString('id-ID', optionDate)}</td>
                    </tr>
                    <tr>
                        <td class="t-info">Selesai</td>
                        <td>${new Date(endDate).toLocaleDateString('id-ID', optionDate)}</td>
                    </tr>
                    <tr>
                        <td class="t-info">Pertandingan Ke</td>
                        <td>(${data.season.currentMatchday})</td>
                    </tr>
                </tbody>
            </table>
        `;

        let standings = '';
        data.standings[0].table.forEach(function (d) {
            let emblem = String(d.team.crestUrl);
            emblem = emblem.replace(/^http:\/\//i, 'https://');

            standings += `
                <tr>
                    <td>${d.position}</td>
                    <td>
                        <img src="${emblem}" width="17.5">
                        ${d.team.name}
                    </td>
                    <td>${d.playedGames}</td>
                    <td>${d.won}</td>
                    <td>${d.draw}</td>
                    <td>${d.lost}</td>
                    <td>${d.goalsFor}</td>
                    <td>${d.goalsAgainst}</td>
                    <td>${d.goalDifference}</td>
                    <td>${d.points}</td>
                </tr>
            `;
        });

        document.querySelector("#standing").innerHTML = standings;

        let teams = getCompetitionsTeams(idParams);
        teams.then(dataTeams => {
            // Memasukkan jumlah team ke dalam tabel
            let elCountTeam = document.createElement('tr');
            let countTeam = `
                <td class="t-info">Jumlah Tim</td>
                <td>${dataTeams.count} Tim</td>
            `;
            elCountTeam.innerHTML = countTeam;
            document.querySelector("#tbInfo").appendChild(elCountTeam);
        });
        
    });
}

function getCompetitionByTeams(idParams) {

    let teams = getCompetitionsTeams(idParams);
        teams.then(dataTeams => {
            let content = '';

            dataTeams.teams.forEach(team => {
                let emblem = String(team.crestUrl);
                emblem = emblem.replace(/^http:\/\//i, 'https://');

                content += `
                    <tr>
                        <td>
                            <img src="${emblem}" width="17.5">
                            ${team.name}
                        </td>
                        <td>
                            <button onClick="setTeamFavorite(${team.id})" class="waves-effect waves-light btn-small pilihTeamnya">Pilih</button>
                        </td>
                    </tr>
                `;
            });

            document.querySelector('#tim-content').innerHTML = content;
        });
}

function getCompetitionsTeams(ligaID) {
    if ('caches' in window) {
        return caches.match(`${base_url_FD}v2/competitions/${ligaID}/teams`)
            .then(response => {
                if (response) {
                    return response.json();
                }

                return fetch(`${base_url_FD}v2/competitions/${ligaID}/teams`, { headers: myHeaders })
                    .then(status)
                    .then(json)
                    .catch(error);
            });
    }
}

function getCompetitionsStandings(ligaID) {
    if ('caches' in window) {
        return caches.match(`${base_url_FD}v2/competitions/${ligaID}/standings?standingType=TOTAL`)
            .then(response => {
                if (response) {
                    return response.json();
                }

                return fetch(`${base_url_FD}v2/competitions/${ligaID}/standings?standingType=TOTAL`, { headers: myHeaders })
                    .then(status)
                    .then(json)
                    .catch(error);
            });
    }
}

function getCompetitionsMatches(ligaID) {
    if ('caches' in window) {
        return caches.match(`${base_url_FD}v2/competitions/${ligaID}/matches`)
            .then(response => {
                if (response) {
                    return response.json();
                }

                return fetch(`${base_url_FD}v2/competitions/${ligaID}/matches`, { headers: myHeaders })
                    .then(status)
                    .then(json)
                    .catch(error);
            });
    }
}

function getTeam(idTeam) {
    if ('caches' in window) {
        return caches.match(`${base_url_FD}v2/teams/${idTeam}`)
            .then(response => {
                if (response) {
                    return response.json();
                }

                return fetch(`${base_url_FD}v2/teams/${idTeam}`, { headers: myHeaders })
                    .then(status)
                    .then(json)
                    .catch(error);
            });
    }
}

function getTeamMatches(idTeam) {
    if ('caches' in window) {
        return caches.match(`${base_url_FD}v2/teams/${idTeam}/matches/`)
            .then(response => {
                if (response) {
                    return response.json();
                }

                return fetch(`${base_url_FD}v2/teams/${idTeam}/matches/`, { headers: myHeaders })
                    .then(status)
                    .then(json)
                    .catch(error);
            });
    }
}