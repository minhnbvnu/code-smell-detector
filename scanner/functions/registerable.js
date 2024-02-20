function registerable (cfgObj) {
        _.forIn(cfgObj, function(value, key) {
            if (registerableCfg.indexOf(key) !== -1) {
                register(key, cfgObj);
            }
        });
    }