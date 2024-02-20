function deeplyStripKey(input, keyToStrip) {
                var predicate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function() {
                    return true
                };
                if ((typeof input === "undefined" ? "undefined" : (0, _typeof3.default)(input)) !== "object" || Array.isArray(input) || input === null || !keyToStrip) {
                    return input
                }
                var obj = (0, _assign2.default)({}, input);
                (0, _keys2.default)(obj).forEach(function(k) {
                    if (k === keyToStrip && predicate(obj[k], k)) {
                        delete obj[k];
                        return
                    }
                    obj[k] = deeplyStripKey(obj[k], keyToStrip, predicate)
                });
                return obj
            }