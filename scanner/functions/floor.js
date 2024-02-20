function floor(a, u) {
    if (typeof a === 'object') {
        const c = a.constructor ? a.constructor() : $Object.create(null);

        if (u === undefined) {
            for (let key in a) c[key] = $Math.floor(a[key]);
        } else {
            for (let key in a) c[key] = $Math.floor(a[key] / u) * u;
        }
        return c;
    } else if (u === undefined) {
        return $Math.floor(a);
    } else {
        return $Math.floor(a / u) * u;
    }
}