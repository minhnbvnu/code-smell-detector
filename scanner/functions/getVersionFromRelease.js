function getVersionFromRelease(release, definitionId) {
    definitionId = definitionId || 'NOT SPECIFIED';

    // Is a release string
    if (release.charAt(0) === 'v' && !isNaN(parseInt(release.charAt(1)))) {
        return config.definitionVersions[definitionId];
    }

    // Is a branch
    return 'dev';
}