function getPlatformInfo() {
    if (isElectron()) {
        const { release, platform } = requireNode('os');
        return `${platform()} ${release()}`;
    } else {
        return 'browser';
    }
}