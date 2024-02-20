function renderCategories() {
        const { categories } = loadedFiltersInfo;
        for (let j = 0; j < categories.length; j += 1) {
            const category = categories[j];
            renderCategory(category);
        }
        search.initGroupsSearch(loadedFiltersInfo, getFilterTemplate);
        setSearchPlaceholder();
        checkboxUtils.toggleCheckbox(document.querySelectorAll('.opt-state input[type=checkbox]'));
    }