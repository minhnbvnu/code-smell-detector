function zoomRatioAfter(val) {
    ipc.send('zoom-ratio-change', val);
    location.reload()
}