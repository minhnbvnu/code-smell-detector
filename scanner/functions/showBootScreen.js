function showBootScreen() {
    bootScreen.innerHTML = BOOT_INFO;
    bootScreen.style.zIndex = 100;
    bootScreen.style.visibility = 'visible';
    bootScreen.style.fontSize = '' + Math.max(10 * SCREEN_WIDTH / 384, 4) + 'px';
}