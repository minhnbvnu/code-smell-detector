function createServer() {
    const absPath = argv.p ? resolve(__dirname, '../../../', argv.p) + '/' : join(__dirname, 'resources/sysdig/');

    serverInstance = backendServer(absPath)
    serverInstance.start((serverPort) => {
        global.serverPort = serverPort;

        if (mainWindow === null) {
            createWindow();
        }
    });
}