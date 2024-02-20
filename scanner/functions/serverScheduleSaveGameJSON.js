function serverScheduleSaveGameJSON(delaySeconds) {
    if (gameSource.saveTimeoutID) {
        // Replace existing pending save
        removePendingSaveCallback(gameSource.saveCallback);
        clearTimeout(gameSource.saveTimeoutID);
    } else {
        ++savesPending;
    }

    const saveCallback = function () {
        // Remove the callback
        removePendingSaveCallback(saveCallback);
        // Clear the timeout in case this function was explicitly invoked
        clearTimeout(gameSource.saveTimeoutID);

        gameSource.saveTimeoutID = null;
        gameSource.saveCallback = null;
        serverSaveGameJSON(function () {
            // Wait until the actual save has occurred before reducing
            // the counter.
            --savesPending;
        });
    };
    gameSource.saveCallback = saveCallback;
    
    if (delaySeconds > 0) {
        pendingSaveCallbacks.push(saveCallback);
        gameSource.saveTimeoutID = setTimeout(saveCallback, (delaySeconds || 0) * 1000);
    } else {
        saveCallback();
    }
}