function defineGetterSetter(obj, prop, getter, setter, dontDelete, dontEnum) {
    Object.defineProperty(obj, prop, {
        get: getter,
        set: setter,
        configurable: !dontDelete,
        enumerable: !dontEnum
    });
}