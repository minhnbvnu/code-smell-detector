function mapGet(key) {
        return key == '__proto__' ? undefined : this.__data__[key];
    }