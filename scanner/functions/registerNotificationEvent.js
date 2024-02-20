function registerNotificationEvent(config, server) {
    const notificationConfig = config.notifications || {};

    Object.keys(notificationConfig).forEach(plugin => {
        if (plugin !== 'options') {
            const Plugin = requireNotificationPlugin(notificationConfig[plugin], plugin);
            let notificationPlugin;

            if (notificationConfig[plugin].config) {
                notificationPlugin = new Plugin(notificationConfig[plugin].config);
            } else {
                notificationPlugin = new Plugin(notificationConfig[plugin]);
            }

            notificationPlugin.events.forEach(event => {
                server.events.on(event, buildData => notificationPlugin.notify(event, buildData));
            });
        }
    });
}