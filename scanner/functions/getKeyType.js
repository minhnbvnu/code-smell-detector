function getKeyType (key) {
    if (Array.isArray(key)) { return 'array'; }
    if (util.isDate(key)) { return 'date'; }
    if (util.isBinary(key)) { return 'binary'; }
    const keyType = typeof key;
    return ['string', 'number'].includes(keyType)
        ? /** @type {"string"|"number"} */ (keyType)
        : 'invalid';
}