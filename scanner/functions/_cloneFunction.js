function _cloneFunction(original) {
        return function() {
            return original.apply(this, arguments);
        };
    }