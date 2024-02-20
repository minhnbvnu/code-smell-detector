function getFilterTemplate(filter, enabled, showDeleteButton) {
        const timeUpdated = new Date(filter.lastUpdateTime || filter.timeUpdated);
        const timeUpdatedText = timeUpdated.toLocaleString(environmentOptions.Prefs.locale);

        let tagDetails = '';
        filter.tagsDetails.forEach((tag) => {
            tagDetails += `<div class="opt-name__tag" data-tooltip='${tag.description}'>#${tag.keyword}</div>`;
        });

        if (filter.trusted) {
            tagDetails += `<div class="opt-name__tag tag-trusted"
                                data-tooltip="${i18n.__('options_filters_filter_trusted_tag_desc.message')}">
                                <!-- https://jira.adguard.com/browse/AG-9225 don't translate the tag name -->
                                #${i18n.__({ phrase: 'options_filters_filter_trusted_tag.message', locale: 'en' })}
                           </div>`;
        }

        let deleteButton = '';
        if (showDeleteButton) {
            deleteButton = `<a href="#" filterid="${filter.filterId}" class="remove-custom-filter-button">
                                ${i18n.__('options_filters_custom_remove.message')}
                            </a>`;
        }
        let homeButton = '';
        if (filter.homepage) {
            homeButton = `<a target="_blank" href="${filter.homepage}">`
                + `${i18n.__('options_filters_homepage.message')}</a>`;
        }

        return `
            <li id="filter${filter.filterId}">
                <div class="opts-desc-filter">
                    <div class="opt-name">
                        <div class="title">${filter.name}</div>
                        <div class="desc">
                            ${filter.description}
                            ${homeButton}
                        </div>
                        <div class="opt-name__info">
                            <div class="opt-name__info-labels">
                                <div class="opt-name__info-item filter-version-desc">
                                    ${i18n.__('options_filters_version.message', filter.version)} 
                                </div>
                                <div class="opt-name__info-item last-update-time">
                                    ${i18n.__('options_filters_updated.message', timeUpdatedText)}
                                </div>
                            </div>
                            <div class="opt-name__info-labels opt-name__info-labels--tags tags-container">
                                ${tagDetails}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="opt-state single-opt">
                    <div class="preloader"></div>
                    ${deleteButton}
                    <input
                        type="checkbox"
                        name="filterId"
                        value="${filter.filterId}"
                        ${enabled ? 'checked="checked"' : ''}
                    >
                </div>
            </li>`;
    }