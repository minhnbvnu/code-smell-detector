function cloneFilter(filter) {
        var key, value;
        var f = {};
        f.name = filter.name;
        if (filter.options !== undefined) {
            f.options = {};
            var optionsKeys = Object.keys(filter.options);
            for (var i = 0; i < optionsKeys.length; i += 1) {
                key = optionsKeys[i];
                value = filter.options[key];
                if (Array.isArray(value)) {
                    f.options[key] = value.slice(0);
                } else {
                    f.options[key] = value;
                }
            }
        }
        return f;
    }