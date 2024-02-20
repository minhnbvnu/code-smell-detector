function updateRulesCountInfo(info) {
        const messageFilters = i18n.__n(
            'options_antibanner_info_filters.message',
            loadedFiltersInfo.getEnabledFiltersCount()
        );
        const messageRules = i18n.__n('options_antibanner_info_rules.message', info.rulesCount || 0);
        const messageAdvancedRules = i18n.__n(
            'options_antibanner_info_adv_rules.message',
            info.advancedBlockingRulesCount || 0
        );

        document.querySelector('#filtersRulesInfo')
            .textContent = `${messageFilters}, ${messageRules}, ${messageAdvancedRules}.`;

        checkSafariContentBlockerRulesLimit(info.rulesOverLimit);
    }