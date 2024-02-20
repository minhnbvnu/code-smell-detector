function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }