function renderDownloadingFilter() {
        clearActiveStep();
        document.querySelector('#add-custom-filter-step-2').classList.add(POPUP_ACTIVE_CLASS);
        document.querySelector('#custom-filter-popup-close').style.display = 'none';
    }