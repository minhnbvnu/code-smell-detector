function fullMethodName(arrayMethodName) {
        if (["from", "of", "isArray"].includes(arrayMethodName)) {
            return "Array.".concat(arrayMethodName);
        }
        return "Array.prototype.".concat(arrayMethodName);
    }