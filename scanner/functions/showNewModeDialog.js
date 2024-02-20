function showNewModeDialog() {
    document.getElementById('newModeDialog').classList.remove('hidden');
    document.getElementById('newModeCreateButton').disabled = true;
    const text = document.getElementById('newModeName');
    text.value = "";
    text.focus();
}