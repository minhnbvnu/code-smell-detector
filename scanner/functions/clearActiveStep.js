function clearActiveStep() {
        const steps = document.querySelectorAll('[id^="add-custom-filter-step-"]');
        steps.forEach((el) => el.classList.remove(POPUP_ACTIVE_CLASS));

        document.querySelector('#custom-filter-popup-close').style.display = 'block';
    }