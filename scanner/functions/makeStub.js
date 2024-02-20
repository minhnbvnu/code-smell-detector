function makeStub(key) {
        if (
            !(key in props) &&
            !/^(webkit|moz|ms|o)[A-Z]/.test(key) &&
            typeof gc[key] !== 'function'
        ) {
            Object.defineProperty(props, key, {
                get: function() {
                    return (values[key] = values[key] || gc[key]);
                },
                set: function(value) {
                    if (value !== values[key]) {
                        gc[key] = values[key] = value;
                    }
                }
            });
        }
    }