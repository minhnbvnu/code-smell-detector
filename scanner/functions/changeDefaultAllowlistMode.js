function changeDefaultAllowlistMode(e) {
        e.preventDefault();

        utils.setIsAllowlistInverted(e.currentTarget.checked);
        userSettings.values[userSettings.names.DEFAULT_ALLOWLIST_MODE] = !e.currentTarget.checked;

        ipcRenderer.send('renderer-to-main', JSON.stringify({
            'type': 'changeDefaultAllowlistMode',
            enabled: !e.currentTarget.checked,
        }));

        loadAllowlistDomains();
    }