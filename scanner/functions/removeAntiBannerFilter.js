function removeAntiBannerFilter(filterId) {
        ipcRenderer.send('renderer-to-main', JSON.stringify({
            'type': 'removeAntiBannerFilter',
            filterId,
        }));
    }