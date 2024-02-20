function initSnmpNode(node, config) {
        node.community = config.community;
        node.host = config.host;
        node.version = config.version;
        node.auth = config.auth;
        node.authprot = config.authprot;
        node.privprot = config.privprot;
        if (node.credentials) {
            node.username = node.credentials.username;
            node.authkey = node.credentials.authkey;
            node.privkey = node.credentials.privkey;
        }
        node.timeout = Number(config.timeout || 5) * 1000;
    }