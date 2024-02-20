function objMap(obj, fn) {
                return (0, _keys2.default)(obj).reduce(function(newObj, key) {
                    newObj[key] = fn(obj[key], key);
                    return newObj
                }, {})
            }