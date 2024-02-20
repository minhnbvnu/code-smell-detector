function processInitializeFrameScriptRequest() {
    const enabledFilters = Object.create(null);

    const AntiBannerFiltersId = config.get('AntiBannerFiltersId');
    const AntiBannerFilterGroupsId = config.get('AntiBannerFilterGroupsId');

    const rulesLimit = applicationApi.getRulesLimit();

    for (const key in AntiBannerFiltersId) {
        if (AntiBannerFiltersId.hasOwnProperty(key)) {
            const filterId = AntiBannerFiltersId[key];
            const enabled = filters.isFilterEnabled(filterId);
            if (enabled) {
                enabledFilters[filterId] = true;
            }
        }
    }

    return {
        userSettings: settings.getAllSettings(),
        enabledFilters,
        filtersMetadata: filters.getFilters(),
        contentBlockerInfo: antibanner.getContentBlockerInfo(),
        isProtectionRunning: antibanner.isRunning(),
        environmentOptions: {
            isMacOs: true,
            Prefs: {
                locale: app.getLocale(),
                mobile: false,
            },
            appVersion: app.getVersion(),
            buildNumber: app.getBuildNumber(),
            updatesPermitted: updater.isUpdatePermitted(),
            converterVersion: getConverterVersion(),
        },
        constants: {
            AntiBannerFiltersId,
            AntiBannerFilterGroupsId,
        },
        rulesLimit,
    };
}