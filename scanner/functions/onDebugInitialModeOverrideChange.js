function onDebugInitialModeOverrideChange(checkbox) {
    const dropdown = document.getElementById('debugOverrideInitialMode');
    dropdown.disabled = ! checkbox.checked;
    onProjectDebugInitialModeChange(checkbox.checked ? dropdown.value : '');
}