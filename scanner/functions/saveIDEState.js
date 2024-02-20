function saveIDEState() {
    // Never save in kiosk mode
    if (getQueryString('kiosk') === '1') { return; }

    const options = {
        'uiMode': uiMode,
        'backgroundPauseEnabled': backgroundPauseEnabled,
        'autoSleepEnabled': autoSleepEnabled,
        'colorScheme': colorScheme,
        'volumeLevel': '' + volumeLevel,
        'gamepadOrderMap': gamepadOrderMap.join(''),
        'showPhysicsEnabled': document.getElementById('showPhysicsEnabled').checked,
        'showEntityBoundsEnabled': document.getElementById('showEntityBoundsEnabled').checked,
        'showPrivateViewsEnabled': document.getElementById('showPrivateViewsEnabled').checked,
        'assertEnabled': document.getElementById('assertEnabled').checked,
        'todoEnabled': document.getElementById('todoEnabled').checked,
        'automathEnabled': document.getElementById('automathEnabled').checked,
        'debugWatchEnabled': document.getElementById('debugWatchEnabled').checked,
        'debugPrintEnabled': document.getElementById('debugPrintEnabled').checked,
        'prettyPrintEnabled': document.getElementById('prettyPrintEnabled').checked,
        'printTouchEnabled': document.getElementById('printTouchEnabled').checked,
        'restartOnFocusEnabled': document.getElementById('restartOnFocusEnabled').checked,
        'codeEditorFontSize': '' + codeEditorFontSize,
        'autoplayOnLoad': document.getElementById('autoplayOnLoad').checked,
        'onScreenHUDEnabled': document.getElementById('onScreenHUDEnabled').checked,
        'keyboardMappingMode': keyboardMappingMode
    };

    // Find the selected debugger tab
    {
        const array = document.getElementById('debugger').children;
        for (let i = 0; i < array.length; ++i) {
            if (array[i].tagName === 'INPUT' && array[i].checked) {
                options.activeDebuggerTab = array[i].id;
                break;
            }
        }
    }

    for (let name in options) {
        localStorage.setItem(name, options[name]);
    }
}