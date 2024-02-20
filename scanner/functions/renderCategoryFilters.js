function renderCategoryFilters(category) {
        const categoryContentElement = getFiltersContentElement(category);
        const existingCategoryFiltersNode = document.querySelector(`#antibanner${category.groupId}`);
        if (existingCategoryFiltersNode) {
            document.querySelector('#antibanner').parentNode
                .replaceChild(categoryContentElement, existingCategoryFiltersNode);
        }
        document.querySelector('#antibanner').parentNode.appendChild(categoryContentElement);
        checkboxUtils.toggleCheckbox(document.querySelectorAll('.opt-state input[type=checkbox]'));
        if (category.groupId === CUSTOM_FILTERS_GROUP_ID) {
            bindCustomFiltersControls();
            search.initFiltersSearch(category, renderCategoryFilters);
        }
    }