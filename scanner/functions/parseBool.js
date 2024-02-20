function parseBool(value) {
    if (typeof value === 'boolean') {
        return value;
    }

    // True values refers to https://yaml.org/type/bool.html
    return ['on', 'true', 'yes', 'y'].includes(String(value).toLowerCase());
}