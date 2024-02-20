function evaluateKeyPathOnValueToDecodedValue (value, keyPath, multiEntry, fullKeys) {
    if (Array.isArray(keyPath)) {
        /** @type {KeyPathEvaluateValueValueArray} */
        const result = [];
        return keyPath.some((item) => {
            const key = evaluateKeyPathOnValueToDecodedValue(value, item, multiEntry, fullKeys);
            if (key.failure) {
                return true;
            }
            result.push(key.value);
            return false;
        })
            ? {failure: true}
            : {value: result};
    }
    if (keyPath === '') {
        return {value};
    }
    const identifiers = keyPath.split('.');
    return identifiers.some((idntfr) => {
        if (idntfr === 'length' && (
            typeof value === 'string' || Array.isArray(value)
        )) {
            value = value.length;
        } else if (util.isBlob(value)) {
            switch (idntfr) {
            case 'size': case 'type':
                value = /** @type {Blob} */ (value)[idntfr];
                break;
            }
        } else if (util.isFile(value)) {
            switch (idntfr) {
            case 'name': case 'lastModified':
                value = /** @type {File} */ (value)[idntfr];
                break;
            case 'lastModifiedDate':
                value = new Date(/** @type {File} */ (value).lastModified);
                break;
            }
        } else if (!util.isObj(value) || !Object.hasOwn(value, idntfr)) {
            return true;
        } else {
            value = /** @type {{[key: string]: KeyPathEvaluateValueValue}} */ (
                value
            )[idntfr];
            return value === undefined;
        }
        return false;
    })
        ? {failure: true}
        : {value};
}