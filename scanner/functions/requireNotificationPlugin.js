function requireNotificationPlugin(config, plugin) {
    if (config.scopedPackage) {
        return require(config.scopedPackage);
    }

    return require(`screwdriver-notifications-${plugin}`);
}