function checkForOpenProxies(host, callback) {
    var net = require('net');

    var ports = [80,8080,81,1080,6588,8000];
    var ports_completed = 0;

    var callback_called = false;

    var portFailed = function() {
        ports_completed++;
        this.removeAllListeners();
        this.destroy();

        if (!callback_called && ports_completed >= ports.length) {
            callback_called = true;
            callback(false);
        }
    };

    var portConnected = function() {
        var remote_port = this.remotePort;

        ports_completed++;
        this.removeAllListeners();
        this.destroy();

        if (!callback_called) {
            callback_called = true;
            callback(true, host, remote_port);
        }
    };

    var portTimeout = function() {
        ports_completed++;
        this.removeAllListeners();
        this.destroy();

        if (!callback_called && ports_completed >= ports.length) {
            callback_called = true;
            callback(false);
        }
    };

    for (var idx=0; idx< ports.length; idx++) {
        net.connect({port: ports[idx], host: host})
            .on('connect', portConnected)
            .on('error', portFailed)
            .on('close', portFailed)
            .on('timeout', portTimeout)
            .setTimeout(5000);
    }
}