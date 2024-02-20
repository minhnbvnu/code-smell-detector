function processNextInConnectionQueue (name, origin = getOrigin()) {
    const queueItems = connectionQueue[origin][name];
    if (!queueItems[0]) { // Nothing left to process
        return;
    }
    const {req, cb} = queueItems[0]; // Keep in queue to prevent continuation

    /**
     * @returns {void}
     */
    function removeFromQueue () {
        queueItems.shift();
        processNextInConnectionQueue(name, origin);
    }
    req.addEventListener('success', removeFromQueue);
    req.addEventListener('error', removeFromQueue);
    cb(req);
}