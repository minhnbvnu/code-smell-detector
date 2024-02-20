async function _getLibDependenciesInfo (dependencies) {
    const cordovaPrefix = 'cordova-';
    const versionFor = name => require(`${name}/package`).version;

    return Object.keys(dependencies)
        .filter(name => name.startsWith(cordovaPrefix))
        .map(name => ({ key: name.slice(cordovaPrefix.length), value: versionFor(name) }));
}