function findAvailablePort(port, hostname, callback) {
    let server = net.createServer();
    server.listen(port, hostname, (err) => {
        server.once('close', () => {
            callback(port);
        });
        server.close();
    }).on('error', (err) => {
        // try another port sequentially
        findAvailablePort(port+1, hostname, callback);
    });
}