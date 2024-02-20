function $objectMulMutate(a, b) {
    if (Array.isArray(a) || Array.isArray(b)) { $error('Cannot use *= with arrays'); }    
    if (typeof b === 'object') for (const key in a) a[key] *= b[key];
    else                       for (const key in a) a[key] *= b;
    return a;
}