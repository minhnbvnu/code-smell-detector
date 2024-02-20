function onFilterStateChanged(filter) {
        const { filterId } = filter;
        const { enabled } = filter;
        loadedFiltersInfo.updateEnabled(filter, enabled);
        updateCategoryFiltersInfo(filter.groupId);
        updateFilterMetadata(filter);

        const filterCheckbox = getFilterCheckbox(filterId);
        if (filterCheckbox) {
            checkboxUtils.updateCheckbox([filterCheckbox], enabled);
        }
    }