function trunc(a) {
    if (typeof a === 'object') {
        let c = a.constructor ? a.constructor() : $Object.create(null);
        for (let key in a) c[key] = $Math.trunc(a[key]);
        return c;
    } else {
        return $Math.trunc(a);
    }
}