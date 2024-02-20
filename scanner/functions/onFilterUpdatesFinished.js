function onFilterUpdatesFinished(updatedFilters, filtersUpdateLastCheck) {
        // set timeout to let the update button animation turn around
        setTimeout(() => {
            document.querySelector('#updateAntiBannerFilters').classList.remove('loading');
        }, ANIMATION_DELAY);
        if (Array.isArray(updatedFilters)) {
            updatedFilters.forEach((filter) => {
                updateFilterMetadata(filter);
            });
        }
        if (filtersUpdateLastCheck) {
            setLastUpdatedTimeText(filtersUpdateLastCheck);
        }
    }