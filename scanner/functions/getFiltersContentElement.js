function getFiltersContentElement(category) {
        const { filters } = category;
        const isCustomFilters = category.groupId === 0;

        const sortedFilters = filters.sort((filter) => (filter.enabled ? -1 : 1));

        if (isCustomFilters
            && filters.length === 0) {
            return utils.htmlToElement(getEmptyCustomFiltersTemplate(category));
        }

        const pageTitleEl = getPageTitleTemplate(category.groupName);

        let filtersList = '';
        for (let i = 0; i < sortedFilters.length; i += 1) {
            filtersList += getFilterTemplate(
                sortedFilters[i],
                loadedFiltersInfo.isEnabled(sortedFilters[i].filterId),
                isCustomFilters
            );
        }

        let addCustomFilterBtn = '';
        if (isCustomFilters) {
            addCustomFilterBtn = '<button class="button button--green empty-filters__btn empty-filters__btn--list">'
                + `${i18n.__('options_filters_empty_custom_add_button.message')}</button>`;
        }

        return utils.htmlToElement(`
            <div id="antibanner${category.groupId}" class="settings-content tab-pane filters-list">
                <div class="settings-content_page-title">
                    ${pageTitleEl}
                    <div class="filters-search">
                        <input
                            type="text"
                            placeholder="${i18n.__('options_filters_list_search_placeholder.message')}"
                            name="searchFiltersList"
                            tabindex="0"
                        />
                        <div class="clear-search clear-filters-search"></div>
                    </div>
                </div>
                <div class="settings-body settings-body--search">
                    <ul class="opts-list">
                        ${filtersList}
                    </ul>
                    ${addCustomFilterBtn}
                </div>
            </div>
        `);
    }