function defineGetter(obj, key, getter) {
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get: getter,
        });
    }