function ensureArrayAndPush(object, key, value) {
                if (!Array.isArray(object[key])) {
                    object[key] = [];
                }
                object[key].push(value);
            }