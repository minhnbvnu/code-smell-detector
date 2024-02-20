async function getPlatformEnvironmentData (projectRoot) {
    const installedPlatforms = await _getInstalledPlatforms(projectRoot);

    return Object.keys(installedPlatforms)
        .map(platform => {
            const platformApi = getPlatformApi(platform);

            const getPlatformInfo = platformApi && platformApi.getEnvironmentInfo
                ? () => platformApi.getEnvironmentInfo()
                : _legacyPlatformInfo[platform];

            return { platform, getPlatformInfo };
        })
        .filter(o => o.getPlatformInfo)
        .map(async ({ platform, getPlatformInfo }) => ({
            key: `${platform} Environment`,
            children: await getPlatformInfo()
        }));
}