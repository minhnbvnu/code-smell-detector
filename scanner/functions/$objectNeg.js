function $objectNeg(a) {
    if (Array.isArray(a)) { $error('Cannot use - with arrays'); }
    let c = a.constructor ? a.constructor() : $Object.create(null);
    for (let key in a) c[key] = -a[key];
    return c;
}