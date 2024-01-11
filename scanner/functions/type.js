function type(obj) {
    if (obj === null) {
        return 'null';
    }

    const type = typeof obj;

    if (type === 'undefined' || type === 'number' || type === 'string' || type === 'boolean') {
        return type;
    }

    return _typeLookup[Object.prototype.toString.call(obj)];
}