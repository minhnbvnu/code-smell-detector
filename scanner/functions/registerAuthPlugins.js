async function registerAuthPlugins(server, config) {
    const plugins = ['@hapi/bell', '@hapi/cookie', 'hapi-auth-bearer-token', 'hapi-auth-jwt2', '@hapi/crumb'];
    const crumbOptions = {
        '@hapi/crumb': {
            cookieOptions: {
                isSecure: config.auth && config.auth.https
            },
            restful: true,
            skip: request =>
                // Skip crumb validation when the request is authorized with jwt or the route is under webhooks
                !!request.headers.authorization ||
                !!request.route.path.includes('/webhooks') ||
                !!request.route.path.includes('/auth/')
        }
    };

    return plugins.map(async pluginName => {
        await server.register({
            plugin: require(`${pluginName}`),
            options: {
                ...(crumbOptions[pluginName] || {})
            }
        });
    });
}