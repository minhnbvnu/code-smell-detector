function get_open_port(callback) {
    var server  = http.createServer();
    server.listen(0);
    server.on('listening', function() {
        var port = server.address().port;
        server.close(function() {
            callback(port);
        });
    });
}