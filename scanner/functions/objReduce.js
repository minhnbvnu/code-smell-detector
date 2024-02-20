function objReduce(obj, fn) {
                return (0, _keys2.default)(obj).reduce(function(newObj, key) {
                    var res = fn(obj[key], key);
                    if (res && (typeof res === "undefined" ? "undefined" : (0, _typeof3.default)(res)) === "object")(0, _assign2.default)(newObj, res);
                    return newObj
                }, {})
            }