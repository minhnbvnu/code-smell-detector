function hideBootScreen() {
    bootScreen.innerHTML = '';
    bootScreen.style.zIndex = -100;
    bootScreen.style.visibility = 'hidden';
}