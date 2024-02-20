function getIp() {
    var ips = _.pluck(_.filter(_.flatten(_.values(os.networkInterfaces())), function (ip) {
        return ip.internal === false && ip.family === 'IPv4';
    }), 'address');

    return ips.length > 0 ? ips[0] : '127.0.0.1';
}