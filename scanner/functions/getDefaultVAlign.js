function getDefaultVAlign(markerType) {
    if (markerType === 'bar' || markerType === 'pie' || markerType === 'pin') {
        return 'top';
    } else if (markerType === 'rectangle') {
        return 'bottom';
    } else {
        return 'middle';
    }
}