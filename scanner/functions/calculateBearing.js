function calculateBearing(start, end) {
    const lon1 = toRadian(start[0]);
    const lon2 = toRadian(end[0]);
    const lat1 = toRadian(start[1]);
    const lat2 = toRadian(end[1]);
    const a = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const b =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    return toDegree(Math.atan2(a, b));
}