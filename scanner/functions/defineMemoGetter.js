function defineMemoGetter(obj, prop, fn, dontDelete, dontEnum) {
    Object.defineProperty(obj, prop, {
        get: function() {
            var val = fn();
            defineProperty(obj, prop, val, dontDelete, true, dontEnum);
            return val;
        },
        configurable: true,
        enumerable: !dontEnum
    });
}