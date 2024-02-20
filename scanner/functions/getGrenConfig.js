function getGrenConfig(path, ...args) {
    const remoteUrl = getRemoteUrl(path);
    let config;
    if (remoteUrl) {
        config = getConfigFromRemote(remoteUrl);
    }

    if (!config) {
        config = getConfigFromFile(path, ...args);
    }

    return config;
}