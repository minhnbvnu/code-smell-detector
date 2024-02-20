function applyFilterLocalization(filter, i18nMetadata) {
        const { filterId } = filter;
        const localizations = i18nMetadata[filterId];
        if (localizations) {
            const locale = i18n.normalize(localizations, app.getLocale());
            const localization = localizations[locale];
            if (localization) {
                filter.name = localization.name;
                filter.description = localization.description;
            }
        }
    }