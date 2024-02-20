function $objectDiv(a, b) {
    if (Array.isArray(a) || Array.isArray(b)) { $error('Cannot use / with arrays'); }    
    const c = a.constructor ? a.constructor() : $Object.create(null);

    if (typeof b === 'object') for (const key in a) c[key] = a[key] / b[key];
    else {
        b = 1 / b;
        for (const key in a) c[key] = a[key] * b;
    }
    
    return c;
}