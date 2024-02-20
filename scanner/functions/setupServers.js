function setupServers(servers) {

    //create redirect servers that return response codes in the 300 range (from 300 to 309), and provide Location header
    for (var i = 0; i < servers.length - 1; i++) {
        servers[i].instance = http.createServer((function(j) {
            return function (req, res) {
                var location = protocol + '://' + servers[j + 1].host + ':' + servers[j + 1].port + req.url;
                res.writeHead(servers[j].status, { 'Location': location });
                res.end();
            }
        })(i)).listen(servers[i].port, servers[i].host);
    }

    // create the final server, the one that's going to return data
    servers[i].instance = http.createServer(function (req, res) {
        var file = __dirname + '/mock' + req.url;
        var stat = fs.statSync(file);
        res.writeHead(200, {
            'Content-Type':file.indexOf('.xml') >= 0 ? 'application/xml' : 'application/json',
            'Content-Length':stat.size
        });
        var readStream = fs.createReadStream(file);
        util.pump(readStream, res, function (e) {
            if (e) {
                console.log(e.stack || e);
            }
            res.end();
        });
    }).listen(servers[i].port, servers[i].host);
}