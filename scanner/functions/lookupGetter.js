function lookupGetter(obj, key) {
        const desc = Object.getOwnPropertyDescriptor(obj, key);
        if (typeof desc !== 'undefined') {
            return desc.get;
        }
    }