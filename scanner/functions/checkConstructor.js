function checkConstructor(obj) {
            Object.keys(obj).forEach(function (key) {
                if (constructorKeys.indexOf(key) < 0) {
                    raise('invalid regl constructor argument "' + key + '". must be one of ' + constructorKeys);
                }
            });
        }