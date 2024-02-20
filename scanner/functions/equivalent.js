function equivalent(a, b) {
    switch (typeof a) {
    case 'number':
        if (is_nan(a) && is_nan(b)) {
            return true;
        }
        // fall through
        
    case 'string':
    case 'function':
    case 'boolean':
    case 'undefined':
        return a === b;
        
    default:
        if (b === undefined) { return false; }
        if (a.length !== b.length) { return false; }
        for (let key in a) if (a[key] !== b[key]) { return false; }
        return true;
    }
}