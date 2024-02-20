function isBlacklisted(ip, callback) {
    var host_lookup = reverseIp(ip) + bl_zones[current_bl];

    dns.resolve4(host_lookup, function(err, domain) {
        if (err) {
            // Not blacklisted
            callback(false);
        } else {
            // It is blacklisted
            callback(true);
        }
    });
}