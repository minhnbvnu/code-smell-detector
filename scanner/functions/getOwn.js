function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }