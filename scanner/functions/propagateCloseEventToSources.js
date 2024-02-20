function propagateCloseEventToSources(streams) {
        streams.forEach((stream) => stream.emit('close'));
    }