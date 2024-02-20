function getHTTPServersConfig() {
    let ports = [];
    return fetch('/servers')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJsonConfig) {

            for (let e of myJsonConfig.ServerInformation) {
                ports.push(e.Port);
            }
            promise = new Promise((resolve, reject) => {
                resolve({
                    ports: ports,
                    AllowDynamicHTTPServers: myJsonConfig.AllowDynamicHTTPServers
                });
            })
            return promise;
        })
}