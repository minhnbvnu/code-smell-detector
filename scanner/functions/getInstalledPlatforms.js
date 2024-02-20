async function getInstalledPlatforms (projectRoot) {
    return _getInstalledPlatforms(projectRoot).then(platforms => {
        const key = 'Project Installed Platforms';
        const children = Object.entries(platforms)
            .map(([key, value]) => ({ key, value }));

        return { key, children };
    });
}