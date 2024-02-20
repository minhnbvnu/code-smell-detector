function clearSearchEvent(event) {
    const clearGroupSearch = (groupId) => {
        const searchInput = document.querySelector(`#antibanner${groupId} input[name="searchFiltersList"]`);
        const filters = document.querySelectorAll(`#antibanner${groupId} .opts-list li`);
        if (searchInput) {
            searchInput.value = '';
        }

        if (filters && filters.length > 0) {
            filters.forEach((filter) => {
                filter.style.display = 'flex';
            });
        }
    };

    const clearGlobalSearch = () => {
        const searchInput = document.querySelector('input[name="searchGroupsList"]');
        const antibannerList = document.querySelector('#antibanner .opts-list');
        const filters = antibannerList.querySelectorAll('li[id^="filter"]');
        const groups = antibannerList.querySelectorAll('li[id^="category"]');

        const clearSearchButton = document.querySelector('#clearGroupFiltersSearch');
        clearSearchButton.classList.remove(CLEAR_SEARCH_VISIBLE_CLASS);
        searchInput.value = '';
        clearSearch(filters);
        searchFilters('', filters, groups);
    };

    const regex = /#antibanner(\d+)/g;
    const match = regex.exec(event.oldURL);
    if (match) {
        clearGroupSearch(match[1]);
    } else {
        clearGlobalSearch();
    }
}