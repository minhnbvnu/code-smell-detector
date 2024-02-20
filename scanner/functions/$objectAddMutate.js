function $objectAddMutate(a, b) {
    if (Array.isArray(a) || Array.isArray(b)) { $error('Cannot use += with arrays'); }
    
    if (typeof b === 'object') for (let key in a) a[key] += b[key];
    else                       for (let key in a) a[key] += b;
    return a;
}