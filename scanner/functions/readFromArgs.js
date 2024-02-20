function readFromArgs(argv, config = merge({}, DEFAULT_CONFIG)) {
    if (argv.config) {
        if (!readFromFile(argv.config, config)) {
            return false;
        }
    }
    if (typeof argv.host === 'string') config.host = argv.host;
    if (typeof argv.port === 'number') config.port = argv.port;
    if (typeof argv.port === 'string') config.port = parseInt(argv.port);
    if (typeof argv.cert === 'string') config.tls.cert = argv.cert;
    if (typeof argv.key === 'string') config.tls.key = argv.key;
    if (typeof argv.protocol === 'string') config.protocol = argv.protocol;
    if (argv.dumb) {
        Log.w('The \'--dumb\' flag is deprecated, use \'--protocol=dumb\' instead.');
        config.protocol = 'dumb';
    }
    if (typeof argv.type === 'string') config.type = argv.type;
    if (argv.volatile) config.volatile = argv.volatile;
    if (typeof argv.network === 'string') config.network = argv.network;
    if (argv.passive) config.passive = true;
    if (argv.statistics) {
        config.statistics = 10;
        if (typeof argv.statistics === 'number') config.statistics = argv.statistics;
        if (typeof argv.statistics === 'string') config.statistics = parseInt(argv.statistics);
    }
    if (argv.miner) {
        config.miner.enabled = true;
        if (typeof argv.miner === 'number') config.miner.threads = argv.miner;
        if (typeof argv.miner === 'string') config.miner.threads = parseInt(argv.miner);
        if (typeof argv['extra-data'] === 'string') config.miner.extraData = argv['extra-data'];
    }
    if (argv.pool) {
        config.poolMining.enabled = true;
        if (typeof argv.pool === 'string') {
            const split = argv.pool.split(':', 2);
            config.poolMining.host = split[0];
            config.poolMining.port = parseInt(split[1]);
        }
    }
    if (argv['device-data'] && config.poolMining.enabled) {
        try {
            config.poolMining.deviceData = JSON.parse(argv['device-data']);
        } catch (e) {
            return false;
        }
    }
    if (argv.rpc) {
        config.rpcServer.enabled = true;
        if (typeof argv.rpc === 'number') config.rpcServer.port = argv.rpc;
        if (typeof argv.rpc === 'string') config.rpcServer.port = parseInt(argv.rpc);
    }
    if (argv.ui) {
        config.uiServer.enabled = true;
        if (typeof argv.ui === 'number') config.uiServer.port = argv.ui;
        if (typeof argv.ui === 'string') config.uiServer.port = parseInt(argv.ui);
    }
    if (argv.metrics) {
        config.metricsServer.enabled = true;
        if (typeof argv.metrics === 'number') config.metricsServer.port = argv.metrics;
        if (typeof argv.metrics === 'string') {
            const split = argv.metrics.split(':', 2);
            config.metricsServer.port = parseInt(split[0]);
            if (split.length === 2) config.metricsServer.password = split[1];
        }
    }
    if (typeof argv['wallet-seed'] === 'string') config.wallet.seed = argv['wallet-seed'];
    if (typeof argv['wallet-address'] === 'string') config.wallet.address = argv['wallet-address'];
    if (argv['reverse-proxy']) {
        config.reverseProxy.enabled = true;
        if (typeof argv['reverse-proxy'] === 'number') config.reverseProxy.port = argv['reverse-proxy'];
        if (typeof argv['reverse-proxy'] === 'string') {
            const split = argv['reverse-proxy'].split(',', 2);
            config.reverseProxy.port = parseInt(split[0]);
            if (split.length === 2) config.reverseProxy.addresses = [split[1]];
        }
    }
    if (argv.log || argv.verbose) {
        config.log.level = 'verbose';
        if (typeof argv.log === 'string') config.log.level = argv.log;
        if (argv.verbose) {
            Log.w('The \'--verbose\' flag is deprecated, use \'--log\' instead.');
        }
    }

    if (!validateObjectType(config)) {
        return false;
    }

    return config;
}