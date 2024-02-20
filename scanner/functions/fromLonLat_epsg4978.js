function fromLonLat_epsg4978(point) {
    let earthRadius = 6371;

    point.x =
        earthRadius *
        1000 *
        (Math.cos(point.lat * (Math.PI / 180)) * Math.cos(point.lon * (Math.PI / 180)));
    point.y =
        earthRadius *
        1000 *
        (Math.cos(point.lat * (Math.PI / 180)) * Math.sin(point.lon * (Math.PI / 180)));
    point.z = earthRadius * 1000 * Math.sin(point.lat * (Math.PI / 180));

    return point;
}