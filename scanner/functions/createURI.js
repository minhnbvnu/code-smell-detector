function createURI(options) {
    let s = '';
    if ((options.authority || options.scheme) && (options.host || options.hostpath)) {
        throw new Error('Can\'t have \'scheme\' or \'authority\' and \'host\' or \'hostpath\' option');
    }
    if (options.host && options.hostpath) {
        throw new Error('Can\'t have \'host\' and \'hostpath\' option');
    }
    if (options.path && options.hostpath) {
        throw new Error('Can\'t have \'path\' and \'hostpath\' option');
    }

    if (options.scheme) {
        s += options.scheme + ':';
    }

    if (options.authority) {
        s += '//' + options.authority;
    }

    if (options.host) {
        s += options.host;
    }

    if (options.path) {
        s += options.path;
    }

    if (options.hostpath) {
        s += options.hostpath;
    }

    if (options.query) {
        s += '?' + options.query;
    }

    if (options.fragment) {
        s += '#' + options.fragment;
    }

    return s;
}