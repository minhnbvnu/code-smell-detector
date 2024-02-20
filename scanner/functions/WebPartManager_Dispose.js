function WebPartManager_Dispose() {
    for (var i = 0; i < __wpm.zones.length; i++) {
        __wpm.zones[i].Dispose();
    }
    window.detachEvent("onunload", WebPartManager_Dispose);
}