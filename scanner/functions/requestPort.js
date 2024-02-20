function requestPort() {
    putData('/servers', {
        "Port": document.getElementById('targetport').value
    })
        .then(function (data) {
            getHTTPServersConfig().then(function (HTTPServersConfig) {
                document.getElementById('listenports').textContent = HTTPServersConfig.ports;
                document.getElementById('targetport').value = HTTPServersConfig.ports[HTTPServersConfig.ports.length - 1];
            })
        })
        .catch(error => console.error(error))
}