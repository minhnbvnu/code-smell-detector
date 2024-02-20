function getEmptyCustomFiltersTemplate(category) {
        return `
            <div id="antibanner${category.groupId}" class="settings-content tab-pane filters-list">
                ${getPageTitleTemplate(category.groupName)}
                <div class="settings-body">
                    <div class="empty-filters">
                        <div class="empty-filters__logo"></div>
                        <div class="empty-filters__desc">
                            ${i18n.__('options_filters_empty_custom_filters.message')}
                        </div>
                        <button class="button button--green empty-filters__btn">
                            ${i18n.__('options_filters_empty_custom_add_button.message')}
                        </button>
                    </div>
                </div>
            </div>`;
    }