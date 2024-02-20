function countEnabledFilters(filters) {
        let count = 0;
        for (let i = 0; i < filters.length; i += 1) {
            const { filterId } = filters[i];
            if (loadedFiltersInfo.isEnabled(filterId)) {
                count += 1;
            }
        }
        return count;
    }