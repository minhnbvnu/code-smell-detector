function hookErrorHandler() {
    isHooked = true;
    window.onerror = onErrorHandler;
}