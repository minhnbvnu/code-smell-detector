function renderConfirmFilterData(filter) {
        clearActiveStep();
        document.querySelector('#add-custom-filter-step-4').classList.add(POPUP_ACTIVE_CLASS);
        document.querySelector('#custom-filter-popup-trusted').checked = false;

        fillLoadedFilterDetails(filter);

        if (onSubscribeClicked) {
            document.querySelector('#custom-filter-popup-added-subscribe')
                .removeEventListener('click', onSubscribeClicked);
        }
        onSubscribeClicked = (e) => {
            e.preventDefault();
            const title = document.querySelector('#custom-filter-popup-added-title').value || '';
            const trustedCheckbox = document.querySelector('#custom-filter-popup-trusted');
            ipcRenderer.send('renderer-to-main', JSON.stringify({
                'type': 'subscribeToCustomFilter',
                url: filter.customUrl,
                title: title.trim(),
                trusted: trustedCheckbox.checked,
            }));
            renderSubscribingFilter();
            ipcRenderer.once('subscribeToCustomFilterSuccessResponse', () => {
                closePopup();
            });
            ipcRenderer.once('subscribeToCustomFilterErrorResponse', () => {
                renderError();
            });
        };
        document.querySelector('#custom-filter-popup-added-subscribe')
            .addEventListener('click', onSubscribeClicked);

        if (onSubscriptionCancel) {
            document.querySelector('#custom-filter-popup-remove')
                .removeEventListener('click', onSubscriptionCancel);
        }
        onSubscriptionCancel = () => {
            removeAntiBannerFilter(filter.filterId);
            closePopup();
        };
        document.querySelector('#custom-filter-popup-remove')
            .addEventListener('click', onSubscriptionCancel);

        if (onSubscribeBackClicked) {
            document.querySelector('#custom-filter-popup-added-back')
                .removeEventListener('click', onSubscribeBackClicked);
        }
        onSubscribeBackClicked = () => {
            removeAntiBannerFilter(filter.filterId);
            renderInputFilter();
        };
        document.querySelector('#custom-filter-popup-added-back')
            .addEventListener('click', onSubscribeBackClicked);

        if (onPopupCloseClicked) {
            document.querySelector('#custom-filter-popup-close')
                .removeEventListener('click', onPopupCloseClicked);
        }
        onPopupCloseClicked = () => {
            removeAntiBannerFilter(filter.filterId);
            closePopup();
        };
        document.querySelector('#custom-filter-popup-close')
            .addEventListener('click', onPopupCloseClicked);
    }