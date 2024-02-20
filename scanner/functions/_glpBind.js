function _glpBind(origFunc, newFunc, name) {
    return function() {
        return newFunc.apply(this, [origFunc, arguments, name]);
    }
}