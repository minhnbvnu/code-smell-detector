function bindToState(obj, state) {
                var newObj = {};
                (0, _keys2.default)(obj).filter(function(key) {
                    return typeof obj[key] === "function"
                }).forEach(function(key) {
                    return newObj[key] = obj[key].bind(null, state)
                });
                return newObj
            }