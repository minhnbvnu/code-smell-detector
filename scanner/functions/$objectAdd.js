function $objectAdd(a, b) {
    if (Array.isArray(a) || Array.isArray(b)) { $error('Cannot use + with arrays'); }
    
    // clone, preserving prototype
    const c = a.constructor ? a.constructor() : $Object.create(null);

    // avoid hasOwnProperty for speed
    if (typeof b === 'object') for (const key in a) c[key] = a[key] + b[key];
    else                       for (const key in a) c[key] = a[key] + b;
    
    return c;
}