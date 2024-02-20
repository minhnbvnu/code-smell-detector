async function registerDefaultPlugins(server) {
    const plugins = [
        '@hapi/inert',
        '@hapi/vision',
        '../plugins/status',
        '../plugins/versions',
        '../plugins/logging',
        '../plugins/swagger',
        '../plugins/template-validator',
        '../plugins/command-validator',
        '../plugins/promster',
        '../plugins/metrics',
        '../plugins/ratelimit'
    ].map(plugin => require(plugin));

    return plugins.map(async pluginObj =>
        server.register({
            plugin: pluginObj,
            routes: {
                prefix: '/v4'
            }
        })
    );
}