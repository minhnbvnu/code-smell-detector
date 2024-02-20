function isHashObject(value) {
            return typeof value === "object" && value instanceof Object && !(value instanceof Array) && !(value instanceof RegExp);
        }