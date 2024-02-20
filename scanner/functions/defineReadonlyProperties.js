function defineReadonlyProperties (obj, props, getter = null) {
    props = typeof props === 'string' ? [props] : props;
    props.forEach(function (prop) {
        let o;
        if (getter && prop in getter) {
            o = getter[prop];
        } else {
            Object.defineProperty(obj, '__' + prop, {
                enumerable: false,
                configurable: false,
                writable: true
            });
            // We must resort to this to get "get <name>" as
            //   the function `name` for proper IDL
            o = {
                get [prop] () {
                    return this['__' + prop];
                }
            };
        }

        const desc = /** @type {PropertyDescriptor} */ (
            Object.getOwnPropertyDescriptor(o, prop)
        );
        // desc.enumerable = true; // Default
        // desc.configurable = true; // Default
        Object.defineProperty(obj, prop, desc);
    });
}