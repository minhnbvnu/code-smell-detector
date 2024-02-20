function getListenerOptions() {
    if (activeListenerOptions == undefined)
        detectListenerOptionsSupport();
    return activeListenerOptions;
}