function mapHas(key) {
        return key != '__proto__' && hasOwnProperty.call(this.__data__, key);
    }