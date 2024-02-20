async function registerResourcePlugins(server, config) {
    const plugins = [
        'auth',
        'banners',
        'builds',
        'buildClusters',
        'collections',
        'commands',
        'events',
        'jobs',
        'pipelines',
        'templates',
        'tokens',
        'secrets',
        'users',
        'webhooks',
        'stats',
        'isAdmin',
        'shutdown',
        'release',
        'validator',
        'processHooks'
    ];

    if (hoek.reach(config, 'coverage.coveragePlugin')) {
        plugins.push('coverage');
    }

    return plugins.map(async pluginName => {
        await server.register({
            plugin: require(`../plugins/${pluginName}`),
            options: {
                ...(config[pluginName] || {})
            },
            routes: {
                prefix: '/v4'
            }
        });
    });
}