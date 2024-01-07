function upgradeDataSchema(data) {
    // convert v1 and v2 to v3 font data schema
    if (data.version < 3) {
        if (data.version < 2) {
            data.info.maps = data.info.maps || [{
                width: data.info.width,
                height: data.info.height
            }];
        }
        data.chars = Object.keys(data.chars || {}).reduce(function (newChars, key) {
            const existing = data.chars[key];
            // key by letter instead of char code
            const newKey = existing.letter !== undefined ? existing.letter : string.fromCodePoint(key);
            if (data.version < 2) {
                existing.map = existing.map || 0;
            }
            newChars[newKey] = existing;
            return newChars;
        }, {});
        data.version = 3;
    }
    return data;
}