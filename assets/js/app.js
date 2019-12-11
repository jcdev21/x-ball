var dbPromise = idb.open('xball', 1, function (upgradeDB) {
    switch (upgradeDB.oldVersion) {
        case 0:
            if (!upgradeDB.objectStoreNames.contains('tim-favorit')) {
                upgradeDB.createObjectStore('tim-favorit', {keyPath: 'idTeam'})
            }

        case 1:
            let favtimStore = upgradeDB.transaction.objectStore('tim-favorit');
            favtimStore.createIndex('nameTeam', 'nameTeam', {unique: false});
    }
});

function setTeamFavorite(idTeam) {
    dbPromise
        .then(db => {
            let tx = db.transaction('tim-favorit', 'readwrite');
            let store = tx.objectStore('tim-favorit');

            let team = {
                idTeam: idTeam,
                created: new Date().getTime()
            };

            store.put(team);
            return tx.complete;
        })
        .then(data => {
            M.toast({html: 'Tim favorit berhasil ditambahkan!'});
            loadPage('favorit');
        });
}

function getTeamFavorite() {
    return dbPromise
        .then(db => {
            let tx = db.transaction('tim-favorit', 'readonly');
            let store = tx.objectStore('tim-favorit');
            
            return store.getAll();
        })
        .then(data => {
            if (data[0] !== undefined) {
                let boxSettings = document.querySelector('#boxSettings');
                if (boxSettings) {
                    boxSettings.classList.remove('hide');
                }
        
                let dataTeam = getTeam(data[0].idTeam);
                let dataTeamMatches = getTeamMatches(data[0].idTeam);
        
                dataTeam.then(teams => {
                    let emblem = String(teams.crestUrl);
                    emblem = emblem.replace(/^http:\/\//i, 'https://');
                    
                    document.querySelector(".title").innerHTML = `<img src="${emblem}" width="55"/> ${teams.name} (${teams.shortName})`;
                    document.querySelector(".deleteBtn").innerHTML = `<button class="waves-effect waves-light btn" onClick="deleteTeamFavorite(${teams.id})">Hapus Tim Favorit</button>`;            
                    document.querySelector(".informasi").innerHTML = `
                        <table class="responsive-table">
                            <tbody id="tbInfo">
                                <tr>
                                    <td class="t-info">Area</td>
                                    <td>${teams.area.name}</td>
                                </tr>
                                <tr>
                                    <td class="t-info">Alamat</td>
                                    <td>${teams.address}</td>
                                </tr>
                                <tr>
                                    <td class="t-info">Warna Tim</td>
                                    <td>${teams.clubColors}</td>
                                </tr>
                                <tr>
                                    <td class="t-info">Email</td>
                                    <td>${teams.email}</td>
                                </tr>
                                <tr>
                                    <td class="t-info">Telepon</td>
                                    <td>${teams.phone}</td>
                                </tr>
                                <tr>
                                    <td class="t-info">Stadium</td>
                                    <td>${teams.venue}</td>
                                </tr>
                                <tr>
                                    <td class="t-info">Website</td>
                                    <td>${teams.website}</td>
                                </tr>
                            </tbody>
                        </table>
                    `;
        
                    let squad = '';
                    let squadArray = teams.squad.reverse();
                    squadArray.forEach(sq => {
                        let position = (sq.position == null) ? 'Coach' : sq.position; 
                        squad += `
                            <tr>
                                <td>${sq.name}</td>
                                <td>${position}</td>
                            </tr>
                        `;
                    });
                    
                    document.querySelector('.squad').innerHTML = squad;
                });
        
                dataTeamMatches.then(matches => {
                    let jadwal = '';
        
                    matches.matches.forEach(match => {
                        if (match.status == 'FINISHED') {
                            let scoreHome = (match.score.fullTime.homeTeam > match.score.fullTime.awayTeam) ? `<b>${match.score.fullTime.homeTeam}</b>` : match.score.fullTime.homeTeam;
                            let scoreAway = (match.score.fullTime.awayTeam > match.score.fullTime.homeTeam) ? `<b>${match.score.fullTime.awayTeam}</b>` : match.score.fullTime.awayTeam;
                            jadwal += `
                                <tr>
                                    <td>
                                        <div class="center-align">
                                            <span style="font-size: 13px;">${match.competition.name}</span></br>
                                            <span style="font-size: 12px; color: salmon;">${match.utcDate}</span>
                                            <p>
                                                ${match.homeTeam.name} <span style="padding: 0 3px; background-color: #eee;">${scoreHome} - ${scoreAway}</span> ${match.awayTeam.name}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        } else {
                            jadwal += `
                                <tr>
                                    <td>
                                        <div class="center-align">
                                            <span style="font-size: 13px;">${match.competition.name}</span></br>
                                            <span style="font-size: 12px; color: green;">${match.utcDate}</span>
                                            <p>
                                                ${match.homeTeam.name} - ${match.awayTeam.name}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }
                    });
        
                    document.querySelector('.jadwal').innerHTML = jadwal;
                });
                
            } else {
                let boxTambah = document.querySelector('#boxTambah');
                if (boxTambah) {
                    boxTambah.classList.remove('hide');
                }
            }
        })
}

function deleteTeamFavorite(idTeam) {
    return dbPromise
        .then(db => {
            let tx = db.transaction('tim-favorit', 'readwrite');
            let store = tx.objectStore('tim-favorit');

            store.delete(idTeam);
            return tx.complete;
        })
        .then(function () {
            M.toast({html: 'Tim favorit berhasil dihapus!'});
            loadPage('favorit');
        })
}


let btnTambahFavorit = document.querySelector('#btnTambahFavorit');
if (btnTambahFavorit) {
    btnTambahFavorit.addEventListener('click', function () {
        getCompetitionsForFavorit();
    });
}