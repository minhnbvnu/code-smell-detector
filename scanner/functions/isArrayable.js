function isArrayable(obj) {
        return isIterable(obj) && "length" in obj;
    }