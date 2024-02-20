function unionWith(additionalKeys) {
        const retv = /** @type {{
            [type: string]: ReadonlyArray<string>
        }} */ (Object.assign({}, KEYS));
        for (const type of Object.keys(additionalKeys)) {
            if (Object.prototype.hasOwnProperty.call(retv, type)) {
                const keys = new Set(additionalKeys[type]);
                for (const key of retv[type]) {
                    keys.add(key);
                }
                retv[type] = Object.freeze(Array.from(keys));
            }
            else {
                retv[type] = Object.freeze(Array.from(additionalKeys[type]));
            }
        }
        return Object.freeze(retv);
    }