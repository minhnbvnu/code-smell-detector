function updateCategoryFiltersInfo(groupId) {
        const groupFilters = getFiltersByGroupId(groupId, loadedFiltersInfo.filters);
        const enabledFiltersCount = countEnabledFilters(groupFilters);
        const filtersNamesDescription = generateFiltersNamesDescription(groupFilters);
        const groupFiltersCount = groupFilters.length;

        const element = getCategoryElement(groupId);
        const checkbox = getCategoryCheckbox(groupId);

        const descElement = element.querySelector('.desc');
        descElement.textContent = groupFiltersCount > 0
            ? filtersNamesDescription
            : i18n.__('options_filters_no_filters.message');

        const isCategoryEnabled = loadedFiltersInfo.isCategoryEnabled(groupId);
        const isCheckboxChecked = typeof isCategoryEnabled === 'undefined'
            ? enabledFiltersCount > 0
            : isCategoryEnabled;
        checkboxUtils.updateCheckbox([checkbox], isCheckboxChecked);
    }