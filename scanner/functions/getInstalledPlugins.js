async function getInstalledPlugins (projectRoot) {
    const key = 'Project Installed Plugins';
    const children = cdvPluginUtil.getInstalledPlugins(projectRoot)
        .map(plugin => ({ key: plugin.id, value: plugin.version }));

    return { key, children };
}