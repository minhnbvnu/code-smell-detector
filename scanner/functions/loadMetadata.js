function loadMetadata(successCallback, errorCallback) {
        log.info('Loading filters metadata..');

        serviceClient.loadLocalFiltersMetadata((metadata) => {
            const tags = [];
            const groups = [];
            const groupsMap = {};
            const filters = [];
            const filtersMap = {};

            for (let i = 0; i < metadata.tags.length; i += 1) {
                tags.push(createFilterTagFromJSON(metadata.tags[i]));
            }

            for (let j = 0; j < metadata.filters.length; j += 1) {
                const filter = createSubscriptionFilterFromJSON(metadata.filters[j]);
                filters.push(filter);
                filtersMap[filter.filterId] = filter;
            }

            for (let k = 0; k < metadata.groups.length; k += 1) {
                const group = createSubscriptionGroupFromJSON(metadata.groups[k]);
                groups.push(group);
                groupsMap[group.groupId] = group;
            }

            const localizedCustomGroupName = i18.__('filters_group_custom.message');
            const customFiltersGroup = new SubscriptionGroup(
                CUSTOM_FILTERS_GROUP_ID,
                localizedCustomGroupName,
                CUSTOM_FILTERS_GROUP_DISPLAY_NUMBER
            );
            groups.push(customFiltersGroup);
            groupsMap[customFiltersGroup.groupId] = customFiltersGroup;

            // Load custom filters
            const customFiltersData = customFilters.loadCustomFilters();
            customFiltersData.forEach((f) => {
                const filter = createSubscriptionFilterFromJSON(f);
                filter.customUrl = f.customUrl;
                filter.rulesCount = f.rulesCount;
                filter.trusted = f.trusted;

                filters.push(filter);
                filtersMap[filter.filterId] = filter;
            });

            filters.sort((f1, f2) => f1.displayNumber - f2.displayNumber);
            groups.sort((f1, f2) => f1.displayNumber - f2.displayNumber);

            cache.setData({
                tags, groups, groupsMap, filters, filtersMap,
            });

            log.info('Filters metadata loaded');
            successCallback();
        }, errorCallback);
    }