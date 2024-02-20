function extendWithAge(sourceObj, age) {
        var extension = { age: age };
        return Object.assign({}, sourceObj, extension);
    }