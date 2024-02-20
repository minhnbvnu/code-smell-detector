function renderCustomFilters() {
        ipcRenderer.once('getFiltersMetadataResponse', () => {
            const category = loadedFiltersInfo.categories.find((cat) => cat.groupId === CUSTOM_FILTERS_GROUP_ID);
            renderCategoryFilters(category);
            const tabId = document.location.hash;
            const tab = document.querySelector(tabId);
            if (!tab) {
                return;
            }
            tab.style.display = 'flex';
        });

        updateFiltersMetadata();
    }