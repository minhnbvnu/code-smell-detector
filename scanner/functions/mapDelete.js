function mapDelete(key) {
        return this.has(key) && delete this.__data__[key];
    }