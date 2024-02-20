async function _getInstalledPlatforms (projectRoot) {
    if (!_installedPlatformsList) {
        _installedPlatformsList = await cdvLibUtil.getInstalledPlatformsWithVersions(projectRoot);
    }
    return _installedPlatformsList;
}