function waitServerReady(port) {
    return new Promise((resolve) => {
        _waitServerReady(port, resolve);
    });
}