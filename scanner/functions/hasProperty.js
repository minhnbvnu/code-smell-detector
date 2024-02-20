function hasProperty(obj, property) {
        if (!obj) {
            return false;
        }

        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            return true;
        }

        return hasProperty(getPrototype(obj), property);
    }