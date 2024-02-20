function getPrototype(obj) {
        if (Object.getPrototypeOf) {
            return Object.getPrototypeOf(obj);
        }

        if (obj.constructor.prototype == obj) {
            return null;
        }

        return obj.constructor.prototype;
    }