function getDefaultDependencies(dependencyType) {
    const packageManagerConfig = getConfig('commonDependencies');
    return packageManagerConfig ? packageManagerConfig[dependencyType] : null;
}