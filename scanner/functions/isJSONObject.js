function isJSONObject(str) {
                try {
                    var o = JSON.parse(str);
                    if (o && (typeof o === "undefined" ? "undefined" : (0, _typeof3.default)(o)) === "object") {
                        return o
                    }
                } catch (e) {}
                return false
            }