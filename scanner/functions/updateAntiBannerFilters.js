function updateAntiBannerFilters(e) {
        e.preventDefault();
        document.querySelector('#updateAntiBannerFilters').classList.add('loading');

        ipcRenderer.send('renderer-to-main', JSON.stringify({
            'type': 'checkAntiBannerFiltersUpdate',
        }));
    }