function doWs(statement, escaped, compiled, debug) {
        var uri, packet;
        try {
            emitter = new EventEmitter();
            if (debug) {
                var packet = {
                    type: 'script',
                    data: '__debug__'+statement
                };
            }
            else {
                var packet = {
                    type: 'script',
                    data: statement
                };
            }
            if(socket === undefined || socket.readyState !== 1) {
                uri = 'ws://' + document.domain;
                uri = uri + ':' + (document.location.protocol === 'https:' ? 443 : document.location.port);
                var wsCtor = window['MozWebSocket'] ? MozWebSocket : WebSocket;
                socket = new wsCtor(uri, 'ql.io-console');
                socket.onopen = function () {
                    subscribe(socket);
                    socket.send(JSON.stringify(packet));
                };
            }
            else {
                socket.send(JSON.stringify(packet));
            }
            socket.onerror = function() {
                doXhr(statement, escaped, compiled);
            };
            socket.onmessage = function(e) {
                var event = JSON.parse(e.data);
                emitter.emit(event.type, event.data);
            };
            socket.onclose = function() {
            };
            wireup(emitter);
            emitter.on('script-result', function(data) {
                var contentType = data.headers && data.headers['content-type'];
                if(contentType === 'application/json') {
                    try {
                        $('#results').attr('class', 'results tree json').html(formatter.jsonToHTML(data.body));
                        $('#results').treeview();
                    }
                    catch(e) {
                        alert(e);
                    }
                }
                else if(contentType === 'text/html') {
                    $('#results').attr('class', 'results html').html(data.body);
                }
                else {
                    $('#results').attr('class', 'results code json').text(data.body);
                }
                $('#results').animate({
                    opacity: 1.0
                });
            });
        }
        catch(e) {
            alert(e);
        }
    }