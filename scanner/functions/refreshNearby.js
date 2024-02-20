function refreshNearby(coordinates, nearbyUsers) {
    console.log(`Refresh nearby ${coordinates}`);

    if (!nearbyUsers.constructor == Object || Object.keys(nearbyUsers).length == 0) {
        console.log('Empty result...');
    }

    let now = new Date().getTime();
    for (let i in nearbyUsers) {
        let d = { time: now, coordinates: coordinates, distance: nearbyUsers[i].distance };

        if (users[i] === undefined) {
            users[i] = {};
            users[i].relId = ++userIdIndex;
            usersIndex[users[i].relId] = i;
            users[i].userId = nearbyUsers[i].userId;
            users[i].name = nearbyUsers[i].name;

            if (nearbyUsers[i].photo === undefined) {
                users[i].photo = `/no_photo.png`;
            } else {
                users[i].photo = `/photos/${nearbyUsers[i].photo}`;
            }

            users[i].distances = [d];
            users[i].locations = [];
        } else {
            users[i].distances.push(d);

            if (usersIgnored.includes(users[i].relId)) {
                continue;
            }

            // trilaterate when there are 3 distances
            if (users[i].distances.length % 3 === 0) {
                let lastDistances = users[i].distances.slice(users[i].distances.length - 3);

                let c1 = toLonLat(lastDistances[0].coordinates);
                let c2 = toLonLat(lastDistances[1].coordinates);
                let c3 = toLonLat(lastDistances[2].coordinates);

                let p1 = fromLonLat_epsg4978({ lon: c1[0], lat: c1[1] });
                let p2 = fromLonLat_epsg4978({ lon: c2[0], lat: c2[1] });
                let p3 = fromLonLat_epsg4978({ lon: c3[0], lat: c3[1] });

                p1.r = lastDistances[0].distance;
                p2.r = lastDistances[1].distance;
                p3.r = lastDistances[2].distance;

                let triP = trilaterate(p1, p2, p3, true);
                console.log(`Trilaterated point: ${triP}`);
                if (triP !== null) {
                    let triLonLat = toLonLat_epsg4978(triP);
                    let triC = fromLonLat([triLonLat.lon, triLonLat.lat]);
                    users[i].locations.push({
                        time: now,
                        coordinates: triC,
                    });

                    addUserMarker(triC, users[i].relId.toString());
                }
            }
        }
    }

    let usersSorted = [];
    for (let i in users) {
        usersSorted.push(users[i]);
    }

    usersSorted.sort(function (a, b) {
        if (a.locations > b.locations) return -1;
        if (a.locations < b.locations) return 1;

        if (a.distances > b.distances) return -1;
        if (a.distances < b.distances) return 1;

        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
    });

    let selectedRelId = $('div.active[data-user-id]').attr('data-user-id');
    let newList = $('<div></div>');
    newList.addClass('list list-row block');

    for (let i in usersSorted) {
        let user = usersSorted[i];

        if (usersIgnored.includes(user.relId)) {
            console.log(`Skipping user ${user.relId}`);
            continue;
        }

        let uHtml = `
            <div class="list-group-item list-group-item-action list-item" data-user-id="${user.relId}">
                <div><a href="#"><span class="w-48 avatar gd-primary"><img src="${user.photo}" alt="."></span></a>
                </div>
                <div class="flex user-info"><a href="#" class="item-author text-color">${user.name}</a>
                    <div class="item-except text-sm h-1x">#${user.relId} - 
                    Distances: <span class="badge badge-primary badge-pill">${user.distances.length}</span> 
                    Locations: <span class="badge badge-primary badge-pill">${user.locations.length}</span></div>
                </div>
                <div class="no-wrap">
                    <input type="button" value="Ignore" class="btn_userIgnore btn btn-primary" data-user-id="${user.relId}"/>
                </div>
            </div>`;

        uHtml = $.parseHTML(uHtml);
        newList.append(uHtml);
    }
    $('#chatList').empty();
    $('#chatList').append(newList);
    selectUserInChat(selectedRelId, true);
}