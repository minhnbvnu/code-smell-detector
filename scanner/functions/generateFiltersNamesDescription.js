function generateFiltersNamesDescription(filters) {
        const namesDisplayCount = 3;
        const enabledFiltersNames = filters
            .filter((filter) => filter.enabled)
            .map((filter) => filter.name);

        let enabledFiltersNamesString;
        const { length } = enabledFiltersNames;
        switch (true) {
            case (length > namesDisplayCount): {
                const displayNamesString = enabledFiltersNames.slice(0, namesDisplayCount).join(', ');
                enabledFiltersNamesString = `${i18n.__(
                    'options_filters_enabled_and_more_divider.message',
                    displayNamesString, length - namesDisplayCount
                )}`;
                break;
            }
            case (length > 1): {
                const lastName = enabledFiltersNames[length - 1];
                const firstNames = enabledFiltersNames.slice(0, length - 1);
                enabledFiltersNamesString = `${i18n.__(
                    'options_filters_enabled_and_divider.message',
                    firstNames.join(', '), lastName
                )}`;
                break;
            }
            case (length === 1): {
                [enabledFiltersNamesString] = enabledFiltersNames;
                break;
            }
            default:
                break;
        }
        enabledFiltersNamesString = length > 0
            ? `${i18n.__('options_filters_enabled.message')} ${enabledFiltersNamesString}`
            : `${i18n.__('options_filters_no_enabled.message')}`;
        return enabledFiltersNamesString;
    }