function removeCustomFilter(e) {
    e.preventDefault();
    e.stopPropagation();

    const filterId = e.currentTarget.getAttribute('filterId');
    ipcRenderer.send('renderer-to-main', JSON.stringify({
        'type': 'removeAntiBannerFilter',
        filterId,
    }));

    const filterElement = document.querySelector(`#filter${filterId}`);
    filterElement.parentNode.removeChild(filterElement);
}