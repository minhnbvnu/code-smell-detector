function set_shorthand(name, options, keys) {
            if (options[name]) {
                keys.forEach(function (key) {
                    if (options[key]) {
                        if (typeof options[key] != "object")
                            options[key] = {};
                        if (!(name in options[key]))
                            options[key][name] = options[name];
                    }
                });
            }
        }