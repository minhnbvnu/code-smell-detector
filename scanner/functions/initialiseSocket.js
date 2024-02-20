function initialiseSocket(socket, callback) {
    var request = socket.request,
        address = request.meta.remote_address,
        revdns;

    // Key/val data stored to the socket to be read later on
    // May also be synced to a redis DB to lookup clients
    socket.meta = socket.request.meta;

    // If a forwarded-for header is found, switch the source address
    if (request.headers[global.config.http_proxy_ip_header || 'x-forwarded-for']) {
        // Check we're connecting from a whitelisted proxy
        if (!global.config.http_proxies || !rangeCheck(address, global.config.http_proxies)) {
            winston.info('Unlisted proxy: %s', address);
            callback(null, false);
            return;
        }

        // We're sent from a whitelisted proxy, replace the hosts
        address = request.headers[global.config.http_proxy_ip_header || 'x-forwarded-for'];

        // Multiple reverse proxies will have a comma delimited list of IPs. We only need the first
        address = address.split(',')[0].trim();

        // Some reverse proxies (IIS) may include the port, so lets remove that (if ipv4)
        if (address.indexOf('.') > -1) {
            address = (address || '').split(':')[0];
        }
    }

    socket.meta.real_address = address;

    // If enabled, don't go over the connection limit
    if (global.config.max_client_conns && global.config.max_client_conns > 0) {
        if (global.clients.numOnAddress(address) + 1 > global.config.max_client_conns) {
            return callback(null, false);
        }
    }


    try {
        dns.reverse(address, function (err, domains) {
            if (!err && domains.length > 0) {
                revdns = _.first(domains);
            }

            if (!revdns) {
                // No reverse DNS found, use the IP
                socket.meta.revdns = address;
                callback(null, true);

            } else {
                // Make sure the reverse DNS matches the A record to use the hostname..
                dns.lookup(revdns, function (err, ip_address, family) {
                    if (!err && ip_address == address) {
                        // A record matches PTR, perfectly valid hostname
                        socket.meta.revdns = revdns;
                    } else {
                        // A record does not match the PTR, invalid hostname
                        socket.meta.revdns = address;
                    }

                    // We have all the info we need, proceed with the connection
                    callback(null, true);
                });
            }
        });

    } catch (err) {
        socket.meta.revdns = address;
        callback(null, true);
    }
}