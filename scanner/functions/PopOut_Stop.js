function PopOut_Stop() {
    if (__scrollPanel && __scrollPanel.interval) {
        window.clearInterval(__scrollPanel.interval);
    }
    Menu_RestoreInterval();
}