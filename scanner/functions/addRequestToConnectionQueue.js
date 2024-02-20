function addRequestToConnectionQueue (req, name, origin = getOrigin(), cb) {
    /* eslint-enable default-param-last */
    if (!connectionQueue[origin][name]) {
        connectionQueue[origin][name] = [];
    }
    connectionQueue[origin][name].push({req, cb});

    if (connectionQueue[origin][name].length === 1) { // If there are no items in the queue, we have to start it
        processNextInConnectionQueue(name, origin);
    }
}