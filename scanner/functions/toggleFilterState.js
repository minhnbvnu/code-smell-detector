function toggleFilterState(target) {
        const filterId = target.value - 0;
        if (target.checked) {
            ipcRenderer.send('renderer-to-main', JSON.stringify({
                'type': 'addAndEnableFilter',
                'filterId': filterId,
            }));
        } else {
            ipcRenderer.send('renderer-to-main', JSON.stringify({
                'type': 'disableFilter',
                'filterId': filterId,
            }));
        }
    }