function configure(bundler, cfg) {
    if (!cfg) {
        return;
    }

    var registerableCfg = [
        'plugin',
        'external',
        'ignore',
        'exclude',
        'transform',
        'add',
        'require'
    ];

    cfg.forEach(registerable);

    // grab registerable configs and register them
    function registerable (cfgObj) {
        _.forIn(cfgObj, function(value, key) {
            if (registerableCfg.indexOf(key) !== -1) {
                register(key, cfgObj);
            }
        });
    }

    function register (type, o) {
        debug('registering %s: %s', type, o[type]);
        if (type === 'transform' && typeof o[type] === 'object') {
            bundler[type](o[type].name, _.omit(o[type], 'name'));
        } else {
            bundler[type](o[type], _.omit(o, type));
        }
    }
}