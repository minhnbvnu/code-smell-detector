function initFiltersSearch(category, renderCategoryFilters) {
    const searchInput = document.querySelector(`#antibanner${category.groupId} input[name="searchFiltersList"]`);
    if (!searchInput) {
        return;
    }

    // https://github.com/AdguardTeam/AdGuardForSafari/issues/711
    // keep focus on search input if all search symbols has been deleted
    searchInput.focus();

    const filtersContainer = document.querySelector(`#antibanner${category.groupId} .opts-list`);
    const filters = filtersContainer.querySelectorAll('li');

    const SEARCH_DELAY_MS = 250;

    const resetFiltersSearch = () => {
        ipcRenderer.once('getFiltersMetadataResponse', (e, response) => {
            const updatedCategory = response.categories.find((cat) => cat.groupId === category.groupId);
            renderCategoryFilters(updatedCategory);
            const tabId = document.location.hash;
            const tab = document.querySelector(tabId);
            if (!tab) {
                return;
            }
            tab.style.display = 'flex';
            initFiltersSearch(updatedCategory, renderCategoryFilters);
        });
        ipcRenderer.send('renderer-to-main', JSON.stringify({
            'type': 'getFiltersMetadata',
        }));
    };

    const clearSearchButton = document.querySelector(`#antibanner${category.groupId} .clear-filters-search`);

    searchInput.addEventListener('input', utils.debounce((e) => {
        let searchString;
        try {
            searchString = utils.escapeRegExp(e.target.value.trim());
            clearSearchButton.classList.add(CLEAR_SEARCH_VISIBLE_CLASS);
        } catch (err) {
            /* eslint-disable-next-line no-console */
            console.log(err.message);
            return;
        }

        if (!searchString) {
            resetFiltersSearch();
            clearSearchButton.classList.remove(CLEAR_SEARCH_VISIBLE_CLASS);
            return;
        }

        filters.forEach((filter) => {
            const title = filter.querySelector('.title');
            const regexp = new RegExp(searchString, 'gi');
            if (!regexp.test(title.textContent)) {
                filter.style.display = 'none';
            } else {
                filter.style.display = 'flex';
            }
        });

        [...filters]
            .sort((filter) => (filter.className === 'active' ? -1 : 1))
            .forEach((node) => {
                filtersContainer.appendChild(node);
            });
    }, SEARCH_DELAY_MS));

    clearSearchButton
        .addEventListener('click', () => {
            if (searchInput?.value) {
                searchInput.value = '';
                resetFiltersSearch();
                clearSearchButton.classList.remove(CLEAR_SEARCH_VISIBLE_CLASS);
                searchInput.focus();
            }
        });
}