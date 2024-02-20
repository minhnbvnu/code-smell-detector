function modulePath(name) {
    var podPath = require.resolve(name);
    var node_modules = podPath.split(name).slice(0, -1).join(name);
    return path.join(node_modules, name);
}