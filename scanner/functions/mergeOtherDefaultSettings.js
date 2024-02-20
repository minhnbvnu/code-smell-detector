function mergeOtherDefaultSettings(otherName, settings) {
    const otherDefaultSettings = configUtils.getConfig('otherDependencyDefaultSettings', null);
    if (!otherDefaultSettings || !otherDefaultSettings[otherName] ) {
        return settings;
    }
    // Create a copy of default settings for merging
    const mergedSettings = Object.assign({}, otherDefaultSettings[otherName]);
    settings = settings || {};
    for (let settingName in settings) {
        mergedSettings[settingName] = settings[settingName];
    }
    return mergedSettings;
}