function $isSimplePyxlScriptStruct(object, fields) {
    if (typeof object !== 'object') { return; }

    let count = 0;
    for (const key in object) {
        if (key[0] !== '$' &&
            (key.length > 1 ||
             (fields && (fields.indexOf(key) === -1)) ||
             typeof object[key] !== 'number')) { return false; }
        ++count;
    }

    return ! fields || count === fields.length;
}