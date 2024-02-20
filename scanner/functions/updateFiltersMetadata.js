function updateFiltersMetadata() {
        ipcRenderer.send('renderer-to-main', JSON.stringify({
            'type': 'getFiltersMetadata',
        }));
    }