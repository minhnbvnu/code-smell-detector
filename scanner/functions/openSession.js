function openSession(sessionid, host, user, options) {
        // SNMPv3 call
        if (options.version === SNMP.Version3) {
            sessions[sessionid] = SNMP.createV3Session(host, user, options);
        }
        // SNMPv1 or SNMPv2c call
        else {
            sessions[sessionid] = SNMP.createSession(host, user.community, options);
        }
        return sessions[sessionid];
    }