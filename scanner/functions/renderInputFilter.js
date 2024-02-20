function renderInputFilter(url) {
        clearActiveStep();
        document.querySelector('#add-custom-filter-step-1').classList.add(POPUP_ACTIVE_CLASS);

        document.querySelector('#custom-filter-popup-url').focus();

        if (onPopupCloseClicked) {
            document.querySelector('#custom-filter-popup-close').removeEventListener('click', onPopupCloseClicked);
        }

        onPopupCloseClicked = () => closePopup();
        document.querySelector('#custom-filter-popup-close').addEventListener('click', onPopupCloseClicked);

        document.querySelector('#custom-filter-popup-cancel').addEventListener('click', onPopupCloseClicked);

        if (url) {
            document.querySelector('#custom-filter-popup-url').value = url;
        }
    }