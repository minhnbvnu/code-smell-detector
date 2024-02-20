function conf_dot_update (conf, key, value) {
        key = key.split('.');
        var root = {};
        var curr = root;
        while (key.length > 1) {
            curr = curr[key.shift()] = {};
        }
        curr[key.shift()] = value;
        return conf.update(root);
    }