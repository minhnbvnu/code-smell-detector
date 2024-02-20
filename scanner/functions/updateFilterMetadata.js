function updateFilterMetadata(filter) {
        const filterElements = document.querySelectorAll(`#filter${filter.filterId}`);
        filterElements.forEach((filterEl) => {
            filterEl.querySelector('.preloader').classList.remove('active');

            const timeUpdated = new Date(filter.lastUpdateTime || filter.timeUpdated);
            const timeUpdatedText = timeUpdated.toLocaleString(environmentOptions.Prefs.locale);

            filterEl.querySelector('.last-update-time')
                .textContent = `${i18n.__('options_filters_updated.message', timeUpdatedText)}`;
            filterEl.querySelector('.filter-version-desc')
                .textContent = `${i18n.__('options_filters_version.message', filter.version)}`;
            filterEl.querySelector('.title').textContent = filter.name;

            const tagTrusted = filterEl.querySelector('.tag-trusted');
            if (!filter.trusted) {
                if (tagTrusted) {
                    filterEl.querySelector('.tags-container').removeChild(tagTrusted);
                }
            } else if (!tagTrusted) {
                const tagTrusted = `<div class="opt-name__tag tag-trusted"
                                        data-tooltip="${i18n.__('options_filters_filter_trusted_tag_desc.message')}">
                                        #${i18n.__('options_filters_filter_trusted_tag.message')}
                                   </div>`;
                filterEl.querySelector('.tags-container').appendChild(utils.htmlToElement(tagTrusted));
            }
        });
    }