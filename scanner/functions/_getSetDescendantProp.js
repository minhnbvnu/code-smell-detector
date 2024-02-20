function _getSetDescendantProp(obj, desc, value) {
                var arr = desc ? desc.split(".") : [];

                while (arr.length && obj) {
                    var comp = arr.shift();
                    var match = new RegExp("(.+)\\[([0-9]*)\\]").exec(comp);

                    if (value) {
                        if (obj[comp] === undefined) {
                            obj[comp] = {};
                        }

                        if (arr.length === 0) {
                            obj[comp] = value;
                        }
                    }

                    obj = obj[comp];
                }

                return obj;
            }