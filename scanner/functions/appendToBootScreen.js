function appendToBootScreen(msg) {
    bootScreen.innerHTML += msg + '\n';
    bootScreen.scrollTop = bootScreen.scrollHeight;
}