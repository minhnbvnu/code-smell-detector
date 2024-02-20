function applyFilterTagLocalization(tag, i18nMetadata) {
        const { tagId } = tag;
        const localizations = i18nMetadata[tagId];
        if (localizations) {
            const locale = i18n.normalize(localizations, app.getLocale());
            const localization = localizations[locale];
            if (localization) {
                tag.name = localization.name;
                tag.description = localization.description;
            }
        }
    }