function loadMetadataI18n(successCallback, errorCallback) {
        log.info('Loading filters i18n metadata..');
        const { tags, groups, filters } = cache.getData();

        serviceClient.loadLocalFiltersI18Metadata((i18nMetadata) => {
            log.info('Filters i18n metadata read');

            const tagsI18n = i18nMetadata.tags;
            const filtersI18n = i18nMetadata.filters;
            const groupsI18n = i18nMetadata.groups;

            for (let i = 0; i < tags.length; i += 1) {
                applyFilterTagLocalization(tags[i], tagsI18n);
            }

            log.debug('Filters i18n metadata - tags');

            for (let j = 0; j < filters.length; j += 1) {
                applyFilterLocalization(filters[j], filtersI18n);
            }

            log.debug('Filters i18n metadata - filters');

            for (let k = 0; k < groups.length; k += 1) {
                applyGroupLocalization(groups[k], groupsI18n);
            }

            cache.setData({ tags, groups, filters });
            log.debug('Filters i18n metadata - groups');

            log.info('Filters i18n metadata loaded');
            successCallback();
        }, errorCallback);
    }