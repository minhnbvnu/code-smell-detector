function probeWs(socket, cb) {
        var uri;
        try {
            uri = 'ws://' + document.domain;
            uri = uri + ':' + (document.location.protocol === 'https:' ? 443 : document.location.port);
            var wsCtor = window['MozWebSocket'] ? MozWebSocket : WebSocket;
            socket = new wsCtor(uri, 'ql.io-console');
            socket.onopen = function () {
                // Send a probe
                subscribe(socket);
            };

            socket.onerror = function() {
                cb('Not supported');
            };
            socket.onmessage = function() {
                cb();
            };
            socket.onclose = function() {
                cb('Not supported');
            };
        }
        catch(e) {
            cb('Not supported');
        }
    }