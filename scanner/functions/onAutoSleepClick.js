function onAutoSleepClick(event) {
    event.stopPropagation();
    autoSleepEnabled = document.getElementById('autoSleepCheckbox').checked;
    localStorage.setItem('autoSleepEnabled', autoSleepEnabled);
}