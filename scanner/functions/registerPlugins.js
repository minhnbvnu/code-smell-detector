async function registerPlugins(server, config) {
    try {
        await registerDefaultPlugins(server);

        await registerAuthPlugins(server, config);

        await registerResourcePlugins(server, config);

        registerNotificationEvent(config, server);
    } catch (err) {
        logger.error(`Failed to register plugins: ${err.message}`);
        throw err;
    }
}