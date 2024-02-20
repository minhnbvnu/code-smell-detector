function getValueByNoCaseKey(obj, key) {
        let originalKey = String(key),
            lowerCaseKey = originalKey.toLowerCase(),
            upperCaseKey = originalKey.toUpperCase(),
            capitalizeKey = capitalize(originalKey);

        if ($.isPlainObject(obj)) {
            return obj[lowerCaseKey] || obj[capitalizeKey] || obj[upperCaseKey];
        }
    }