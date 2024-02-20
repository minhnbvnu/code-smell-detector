function updateLoadedFiltersInfo(data) {
        loadedFiltersInfo.initLoadedFilters(data.filters, data.categories);
        updateRulesCountInfo(data.rulesInfo);
        setLastUpdatedTimeText(data.filtersUpdateLastCheck || loadedFiltersInfo.lastUpdateTime);
        utils.setUserrulesNum(contentBlockerInfo.userRulesNum);
        utils.setIsAllowlistInverted(!userSettings.values[userSettings.names.DEFAULT_ALLOWLIST_MODE]);
        utils.setAllowlistInfo(contentBlockerInfo.allowlistedNum);
    }