function onFilterDownloadStarted(filter) {
        getCategoryElement(filter.groupId).querySelector('.preloader').classList.add('active');

        const filterEl = getFilterElement(filter.filterId);
        if (filterEl) {
            filterEl.querySelector('.preloader').classList.add('active');
        }
    }