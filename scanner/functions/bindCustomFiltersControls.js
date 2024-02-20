function bindCustomFiltersControls() {
        const emptyFiltersAddCustomButton = document.querySelector('.empty-filters__btn');
        if (emptyFiltersAddCustomButton) {
            emptyFiltersAddCustomButton.addEventListener('click', customFilters.addCustomFilter);
        }

        document.querySelectorAll('.remove-custom-filter-button').forEach((el) => {
            el.addEventListener('click', customFilters.removeCustomFilter);
        });
    }