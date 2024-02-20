function conf_dot_get (conf, key) {
        var obj = conf.data;
        key = key.split('.');
        while (key.length > 0) {
            obj = obj[key.shift()];
        }
        return obj;
    }