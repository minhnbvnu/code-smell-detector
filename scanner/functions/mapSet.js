function mapSet(key, value) {
        if (key != '__proto__') {
            this.__data__[key] = value;
        }
        return this;
    }