function majorFromRelease(release, definitionId) {
    const version = getVersionFromRelease(release, definitionId);

    if (version === 'dev') {
        return 'dev';
    }

    const versionParts = version.split('.');
    return versionParts[0];
}