function toggleUserrulesState(checked) {
        ipcRenderer.send('renderer-to-main', JSON.stringify({
            'type': 'toggleUserrulesState',
            'enabled': checked,
        }));
        userSettings.values[userSettings.names.USERRULES_ENABLED] = checked;
    }