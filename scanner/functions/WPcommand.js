function WPcommand(command, postbody, callback) {
    var clientOptions = {host: config.WPurl, port: 80, path: '/xmlrpc.php'};
    var client = xmlrpc.createClient(clientOptions);
    client.methodCall(command, postbody, callback);
}