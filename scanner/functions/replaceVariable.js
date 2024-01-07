function replaceVariable(str, props) {
    if (!isString(str)) {
        return str;
    }
    return str.replace(CONTENT_EXPRE, function (str, key) {
        if (!props) {
            return '';
        }
        const value = props[key];
        if (isNil(value)) {
            return '';
        } else if (Array.isArray(value)) {
            return value.join();
        }
        return value;
    });
}