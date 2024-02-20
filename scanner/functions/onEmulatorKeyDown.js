function onEmulatorKeyDown(event) {
    event.stopPropagation();
    event.preventDefault();

    // On browsers that support it, ignore
    // synthetic repeat events
    if (event.repeat) { return; }

    wake();

    const key = event.code;
    if (useIDE && ((key === 'KeyP') && (event.ctrlKey || event.metaKey))) {
        // Ctrl+P is pause the IDE, not in-game pause
        onPauseButton();
        return;
    }

    // This test is needed to work around a bug that appeared on Chromium
    // 97.0.4692.99 (Edge/Chrome/Brave) on Windows, where the browser
    // sends extra repeat down events that are not flagged as `repeat` for
    // keys that are already down at the time that some other key is released.
    if (! emulatorKeyState[key]) {
        emulatorKeyJustPressed[key] = true;
    }
    emulatorKeyState[key] = true;

    // Pass event to the main IDE
    onDocumentKeyDown(event);
}