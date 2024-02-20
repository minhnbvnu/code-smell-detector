function removePendingSaveCallback(callback) {
    const i = pendingSaveCallbacks.indexOf(callback);
    if (i !== -1) {
        pendingSaveCallbacks.splice(i, 1);
    } else {
        console.warn('Could not find a callback to remove.');
    }
}