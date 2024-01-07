function equalMapView(obj1, obj2) {
    if (!obj1 && !obj2) {
        return true;
    } else if (!obj1 || !obj2) {
        return false;
    }
    for (const p in obj1) {
        if (p === 'center') {
            if (!obj2[p] || !approx(obj1[p][0], obj2[p][0]) || !approx(obj1[p][1], obj2[p][1])) {
                return false;
            }
        } else if (obj1[p] !== obj2[p]) {
            return false;
        }
    }
    return true;
}