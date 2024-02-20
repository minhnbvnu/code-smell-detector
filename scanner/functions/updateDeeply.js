function updateDeeply(target, override) {
        /**
         * Is hash object
         * @param {Object} value - Test value
         * @returns {boolean} Result
         */
        function isHashObject(value) {
            return typeof value === "object" && value instanceof Object && !(value instanceof Array) && !(value instanceof RegExp);
        }
        for (const key in override) {
            if (Object.prototype.hasOwnProperty.call(override, key)) {
                const val = override[key];
                if (isHashObject(val)) {
                    if (isHashObject(target[key])) {
                        updateDeeply(target[key], val);
                    }
                    else {
                        target[key] = updateDeeply({}, val);
                    }
                }
                else {
                    target[key] = val;
                }
            }
        }
        return target;
    }