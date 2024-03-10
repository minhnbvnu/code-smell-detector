function prepareSnmpOptions(node, msg) {
        let host = node.host || msg.host;
        const sessionid = generateUUID();
        const user = {}
        const options = {};
        const compat = { "v1": "1", "v2": "2c", "v2c": "2c", "v3": "3" };
        if(compat[node.version]) {
            node.version = compat[node.version];
        } else if(["1","2c","3"].indexOf(node.version) < 0) {
            node.version = "1";
        }
        options.version = node.version;
        if (node.version === "1") {
            options.version = SNMP.Version1;
            user.community = node.community || msg.community;
        } else if (node.version === "2c") {
            options.version = SNMP.Version2c;
            user.community = node.community || msg.community;
        } else if (node.version === "3") {
            user.name = node.username || msg.username || "";
            user.level = SNMP.SecurityLevel.noAuthNoPriv;
            user.authProtocol = SNMP.AuthProtocols.none;
            user.authKey = "";
            user.privProtocol = SNMP.PrivProtocols.none;
            user.privKey = "";
            options.version = SNMP.Version3;
            if (node.auth === "authNoPriv" || node.auth === "authPriv") {
                user.level = SNMP.SecurityLevel.authNoPriv;
                user.authProtocol = (node.authprot === "SHA") ? SNMP.AuthProtocols.sha : SNMP.AuthProtocols.md5;
                user.authKey = node.authkey || msg.authkey || "";
                if (node.auth === "authPriv") {
                    user.level = SNMP.SecurityLevel.authPriv;
                    if (node.privprot === "DES" || node.privprot === "AES") {
                        user.privProtocol = (node.privprot === "AES") ? SNMP.PrivProtocols.aes : SNMP.PrivProtocols.des;
                        user.privKey = node.privkey || msg.privkey || "";
                    }
                }
            }
        }

        options.timeout = node.timeout;
        options.debug = msg.debug || undefined;
        options.port = options.port || 161;
        options.retries = options.retries || 1;

        if (msg.engineID) {
            options.engineID = msg.engineID;//The engineID used for SNMPv3 communications, given as a hex string - defaults to a system-generated engineID containing elements of random
        }
        if (msg.backoff) {
            options.backoff = msg.backoff;//The factor by which to increase the timeout for every retry, defaults to 1 for no increase
        }
        if (msg.backwardsGetNexts) {
            options.backwardsGetNexts = msg.backwardsGetNexts;//boolean to allow GetNext operations to retrieve lexicographically preceding OIDs
        }
        if (msg.idBitsSize === 16 || msg.idBitsSize === 32) {
            options.idBitsSize = msg.idBitsSize;//Either 16 or 32, defaults to 32. Used to reduce the size of the generated id for compatibility with some older devices.
        }
        const ipv = parseIP(host);
        if (ipv.version === 4) {
            host = ipv.ip;
            options.port = ipv.port || options.port;
            options.transport = 'udp4';
        } else if (ipv.version === 6) {
            host = ipv.ip;
            options.port = ipv.port || options.port;
            options.transport = 'udp6';
        } else {
            //probably a host name
            if (host.indexOf(":") > 0) {
                host = host.split(":")[0];
                options.port = host.split(":")[1];
            }
        }
        return {
            host: host,
            sessionid: sessionid,
            user: user,
            options: options,
        }
    }