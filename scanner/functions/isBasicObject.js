function isBasicObject(obj) {
        return isObject(obj) && is_nullish(obj.constructor);
    }