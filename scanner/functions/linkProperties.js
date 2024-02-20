function linkProperties(target, source, properties) {
    const props = properties.reduce((acc, prop) => {
        acc[prop] = {
            get() {
                return source[prop];
            }
        };
        return acc;
    }, {});
    Object.defineProperties(target, props);
}