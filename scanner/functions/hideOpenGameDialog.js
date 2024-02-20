function hideOpenGameDialog() {
    saveIDEState();
    document.getElementById('openGameDialog').classList.add('hidden');
    openGameFiles = null;
}