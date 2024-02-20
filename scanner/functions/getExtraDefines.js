function getExtraDefines(className) {

    className = className.replace(/\./g, '_');
    if (!(className in classConfigs)) {
        throw new Error('invalid class name: ' + className);
    }

    const relativePath = classConfigs[className].relativePath;

    const shared = [];
    Object.keys(classConfigs).forEach(function(key) {
        if (key[0] === '_') {
            return; // continue
        }
        const config = classConfigs[key];
        if (config.relativePath === relativePath && key !== className) {
            shared.push(key);
        }
    });
    if (shared.length > 0) {
        console.log('extra defines found: ' + shared);
    }
    return shared;
}