function searchNearby(searchCoordinates) {
    if (cancel) {
        return;
    }
    addPositionMarker(searchCoordinates);

    let c = toLonLat(searchCoordinates);
    axios
        .post('/getNearby', { lon: c[0], lat: c[1] })
        .then((res) => {
            console.log(`/test response (${res.status})`);

            // stop flashing map marker
            clearInterval(flashInterval);

            let nextPoint = ssm.getNext()[1];

            // trigger searchNearby again for next point
            setTimeout(() => searchNearby(nextPoint), searchInterval);

            // process search results
            refreshNearby(searchCoordinates, res.data);
        })
        .catch((error) => {
            alert(error);
            console.error(error);
        });
}