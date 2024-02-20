function _waitServerReady(port, resolve) {
    const client = net.createConnection({ port }, () => {
        resolve(port);
    });
    client.on('error', () => {
        setTimeout(() => {
            _waitServerReady(port, resolve);
        }, 100);
    });
}