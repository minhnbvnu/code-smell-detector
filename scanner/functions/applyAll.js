function applyAll(functions, thisObj, args) {
    if ($.isFunction(functions)) {
        functions = [functions];
    }
    if (functions) {
        var i = void 0;
        var ret = void 0;
        for (i = 0; i < functions.length; i++) {
            ret = functions[i].apply(thisObj, args) || ret;
        }
        return ret;
    }
}