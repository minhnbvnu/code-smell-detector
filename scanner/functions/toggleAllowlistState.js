function toggleAllowlistState(checked) {
        ipcRenderer.send('renderer-to-main', JSON.stringify({
            'type': 'toggleAllowlistState',
            'enabled': checked,
        }));
        userSettings.values[userSettings.names.ALLOWLIST_ENABLED] = checked;
    }