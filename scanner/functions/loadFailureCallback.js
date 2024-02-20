function loadFailureCallback(reason, url) {
    console.log(`ERROR: Failed to load "${url}". ${reason || ''}`);
}