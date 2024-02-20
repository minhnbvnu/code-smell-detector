function funcify(f) {
        return isFunction(f) ? f : function() { return f; };
    }