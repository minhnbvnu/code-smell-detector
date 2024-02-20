function conf_dot_key_exists(conf, key) {
        var obj = conf.data;
        key = key.split('.');
        while (key.length > 0) {
            var partkey = key.shift();
            if (!obj.hasOwnProperty(partkey)) {
                return false;
            }
            obj = obj[partkey];
        }
        return true;
    }