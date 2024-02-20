function toggleGroupState(target) {
        const groupId = target.value - 0;
        if (target.checked) {
            ipcRenderer.send('renderer-to-main', JSON.stringify({
                'type': 'enableFiltersGroup',
                'groupId': groupId,
            }));
        } else {
            ipcRenderer.send('renderer-to-main', JSON.stringify({
                'type': 'disableFiltersGroup',
                'groupId': groupId,
            }));
        }
    }