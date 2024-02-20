function register (type, o) {
        debug('registering %s: %s', type, o[type]);
        if (type === 'transform' && typeof o[type] === 'object') {
            bundler[type](o[type].name, _.omit(o[type], 'name'));
        } else {
            bundler[type](o[type], _.omit(o, type));
        }
    }