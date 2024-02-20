function toLonLat_epsg4978(point) {
    let earthRadius = 6371;
    point.lon = Math.atan2(point.y, point.x) * (180 / Math.PI);
    point.lat = Math.asin(point.z / earthRadius / 1000) * (180 / Math.PI);

    return point;
}