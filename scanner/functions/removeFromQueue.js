function removeFromQueue () {
        queueItems.shift();
        processNextInConnectionQueue(name, origin);
    }