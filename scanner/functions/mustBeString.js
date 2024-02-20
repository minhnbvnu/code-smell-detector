function mustBeString(crs) {
    if (!isString(crs)) {
        throw new Error(`Crs parameter value must be a string: '${crs}'`);
    }
}