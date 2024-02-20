function xz(x, z) {
    if (x === undefined) {
        $error('nil or no argument to xz()');
    }
    
    if (x.x !== undefined) { // xz(xyz)
        if (z !== undefined) { $error('xz(number, number), xz(xz), xz(xyz), or xz(array) are the only legal options'); }
        return {x:x.x, z:x.z};
    }
    if (Array.isArray(x)) { return {x:x[0], z:x[1]}; }
    if (arguments.length !== 2) { $error('xz() cannot take ' + arguments.length + ' arguments.'); }
    if (typeof z !== 'number') { $error('The second argument to xz(x, z) must be a number'); }
    return {x:x, z:z};
}