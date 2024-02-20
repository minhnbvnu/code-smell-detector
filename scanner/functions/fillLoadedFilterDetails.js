function fillLoadedFilterDetails(filter) {
        const titleInputEl = document.querySelector('#custom-filter-popup-added-title');
        if (filter.name) {
            titleInputEl.value = filter.name;
        } else {
            titleInputEl.value = filter.customUrl;
        }

        document.querySelector('#custom-filter-popup-added-desc').textContent = filter.description;
        document.querySelector('#custom-filter-popup-added-version').textContent = filter.version;
        document.querySelector('#custom-filter-popup-added-rules-count').textContent = filter.rulesCount;
        document.querySelector('#custom-filter-popup-added-homepage').textContent = filter.homepage;
        document.querySelector('#custom-filter-popup-added-homepage').setAttribute('href', filter.homepage);
        document.querySelector('#custom-filter-popup-added-url').textContent = filter.customUrl;
        document.querySelector('#custom-filter-popup-added-url').setAttribute('href', filter.customUrl);
    }