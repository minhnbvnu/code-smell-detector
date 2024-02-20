function makePrefixer(prefix) {
        return function (name) {
            return prefix + "-" + name;
        };
    }